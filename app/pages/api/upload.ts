import type { APIRoute } from 'astro';
import { db } from '../../../db/index';
import { merchantDocuments, onboardingEvents } from '../../../db/schema';

export const prerender = false;

const MAX = 10 * 1024 * 1024; // 10 MB
const OK = ['application/pdf', 'image/jpeg', 'image/png'];

export const POST: APIRoute = async ({ request }) => {
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
  if (!docType) {
    return Response.json({ error: 'doc_type' }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ error: 'file' }, { status: 400 });
  }
  if (!OK.includes(file.type)) {
    return Response.json({ error: 'file_type' }, { status: 400 });
  }
  if (file.size > MAX) {
    return Response.json({ error: 'file_size' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `merchant-${merchantId}/${docType}-${Date.now()}`;

  const [row] = await db
    .insert(merchantDocuments)
    .values({
      merchantId,
      docType,
      fileName: file.name,
      blobKey: key,
      contentType: file.type,
      fileSize: file.size,
      data: buffer,
      status: 'received',
    })
    .returning({ id: merchantDocuments.id });

  await db.insert(onboardingEvents).values({
    merchantId,
    eventType: 'document.received',
    payload: { docType, fileSize: file.size },
  });

  return Response.json({ ok: true, id: row.id });
};
