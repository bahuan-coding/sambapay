import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/index';
import { merchantDocuments, merchants, onboardingEvents } from '../../../db/schema';
import { getSessionMerchant } from '../../lib/auth';
import { holdsUploadToken } from '../../lib/session';

export const prerender = false;

const MAX = 10 * 1024 * 1024; // 10 MB

/** The four company documents plus one per owner, keyed as ownerDoc_<n>. */
const COMPANY_DOC_TYPES = ['companyDoc', 'ownerDoc', 'addressDoc', 'contractDoc'];
const OWNER_DOC_TYPE = /^ownerDoc_\d{1,3}$/;

function isAllowedDocType(docType: string): boolean {
  return COMPANY_DOC_TYPES.includes(docType) || OWNER_DOC_TYPE.test(docType);
}

/** The file's real signature, never the client's word for it. */
function sniff(bytes: Uint8Array): string | null {
  const b = bytes;
  if (b.length >= 5 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return 'application/pdf';
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47
    && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return 'image/png';
  return null;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'invalid_form' }, { status: 400 });
  }

  const merchantId = Number(form.get('merchantId'));
  const docType = String(form.get('docType') ?? '').trim();
  const file = form.get('file');

  if (!Number.isFinite(merchantId) || merchantId <= 0) {
    return Response.json({ error: 'merchant' }, { status: 400 });
  }
  if (!isAllowedDocType(docType)) {
    return Response.json({ error: 'doc_type' }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ error: 'file' }, { status: 400 });
  }
  if (file.size > MAX) {
    return Response.json({ error: 'file_size' }, { status: 400 });
  }

  // Only the merchant itself may attach documents: a live session, or the
  // one-time upload token issued at signup.
  const sessionMerchant = await getSessionMerchant(cookies);
  const uploadToken = String(form.get('uploadToken') ?? '');
  const owns = sessionMerchant?.id === merchantId
    || (await holdsUploadToken(merchantId, uploadToken || undefined));
  if (!owns) {
    return Response.json({ error: 'forbidden' }, { status: 403 });
  }

  const [merchant] = await db
    .select({ id: merchants.id })
    .from(merchants)
    .where(eq(merchants.id, merchantId))
    .limit(1);
  if (!merchant) {
    return Response.json({ error: 'merchant' }, { status: 404 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = sniff(buffer);
  if (!detected) {
    return Response.json({ error: 'file_type' }, { status: 400 });
  }

  const key = `merchant-${merchantId}/${docType}-${Date.now()}`;

  const [row] = await db
    .insert(merchantDocuments)
    .values({
      merchantId,
      docType,
      fileName: file.name,
      blobKey: key,
      contentType: detected,
      fileSize: file.size,
      data: buffer,
      status: 'received',
    })
    .returning({ id: merchantDocuments.id });

  await db.insert(onboardingEvents).values({
    merchantId,
    eventType: 'document.received',
    payload: { docType, fileSize: file.size, contentType: detected },
  });

  return Response.json({ ok: true, id: row.id });
};
