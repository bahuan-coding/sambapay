import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db/index';
import { merchants, merchantOwners, merchantCompany, merchantOperations, onboardingEvents } from '../../../db/schema';
import { langPrefix, type Lang } from '../../i18n';
import { sendMagicLinkEmail } from '../../lib/email';
import { getAppUrl } from '../../lib/env';
import { createMagicLink, findMerchantByEmail, normalizeEmail } from '../../lib/magic-link';
import { createUploadToken } from '../../lib/session';
import { identityFor, normalizeWebsite as canonicalWebsite } from '../../data/identity';

export const prerender = false;

function normalizeWebsite(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';
  return canonicalWebsite(raw) ?? '';
}

const ownerSchema = z.object({
  fullName: z.string().trim().min(2).max(200),
  documentNumber: z.string().trim().min(2).max(60),
  role: z.enum(['director', 'ubo']).optional().default('director'),
  ownershipPct: z.number().min(0).max(100).optional().default(0),
  isPep: z.boolean().optional().default(false),
});

/** The registry profile the client fetched at lookup time, if any. Only the
 *  fields that map to a column are kept; everything else is stripped. */
const lookupSchema = z.object({
  tradeName: z.string().trim().max(300).optional(),
  registrationNumber: z.string().trim().max(60).optional(),
  registrationDate: z.string().trim().max(40).optional(),
  legalStructure: z.string().trim().max(200).optional(),
  addressStreet: z.string().trim().max(300).optional(),
  addressNumber: z.string().trim().max(40).optional(),
  addressComplement: z.string().trim().max(200).optional(),
  addressNeighborhood: z.string().trim().max(200).optional(),
  addressCity: z.string().trim().max(200).optional(),
  addressState: z.string().trim().max(200).optional(),
  addressZip: z.string().trim().max(40).optional(),
  source: z.string().trim().max(60).optional().default(''),
});

const declarationSchema = z.object({
  accurate: z.boolean(),
  authorized: z.boolean(),
  updates: z.boolean(),
  signer: z.string().trim().max(200).optional().default(''),
  signerTitle: z.string().trim().max(200).optional().default(''),
});

const bodySchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(30),
  terms: z.literal(true),
  merchantType: z.enum(['direct', 'psp']).optional().default('direct'),
  companyName: z.string().trim().min(2).max(300),
  country: z.string().trim().length(2),
  countries: z.array(z.string().trim().length(2)).min(1),
  documentNumber: z.string().trim().max(60).optional().default(''),
  website: z.preprocess(normalizeWebsite, z.union([z.literal(''), z.string().url()])),
  industry: z.string().trim().max(200).optional().default(''),
  extras: z.record(z.string(), z.string()).optional().default({}),
  lookup: lookupSchema.optional(),
  owners: z.array(ownerSchema).min(1).max(20),
  declaration: declarationSchema.optional(),
  locale: z.enum(['en', 'pt', 'es']).optional(),
});

export const POST: APIRoute = async ({ request }) => {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: 'validation' }, { status: 400 });
  }

  const data = parsed.data;
  const email = normalizeEmail(data.email);
  const lang: Lang = data.locale ?? 'en';
  const country = data.country.toUpperCase();
  const countries = [...new Set(data.countries.map((c) => c.toUpperCase()))];

  // The tax identifier is required, and its check digit is verified when the
  // country defines one.
  const identity = identityFor(country);
  if (!data.documentNumber) {
    return Response.json({ error: 'tax_id' }, { status: 400 });
  }
  if (identity.taxId.validate && !identity.taxId.validate(data.documentNumber)) {
    return Response.json({ error: 'tax_id' }, { status: 400 });
  }

  const existing = await findMerchantByEmail(email);
  if (existing) {
    return Response.json({ error: 'email_taken' }, { status: 409 });
  }

  const [merchant] = await db
    .insert(merchants)
    .values({
      email,
      name: data.name,
      phone: data.phone,
      companyName: data.companyName,
      country,
      countries,
      documentNumber: data.documentNumber || null,
      taxIdType: identity.taxId.name,
      website: data.website || null,
      businessType: data.industry || null,
      merchantType: data.merchantType,
      preferredLocale: lang,
      status: 'commercial_fit',
    })
    .returning();

  const extras = data.extras ?? {};
  const known: Record<string, string> = {};
  const reserved: Record<string, string> = {};
  const map: Record<string, 'taxRegime' | 'giro' | 'comuna' | 'ciuu' | 'condicionIva' | 'camaraComercio'> = {
    regimenFiscal: 'taxRegime',
    giro: 'giro',
    comuna: 'comuna',
    actividadCIIU: 'ciuu',
    condicionIVA: 'condicionIva',
    camaraComercio: 'camaraComercio',
  };
  for (const [key, value] of Object.entries(extras)) {
    if (!value) continue;
    const column = map[key];
    if (column) known[column] = value;
    else reserved[key] = value;
  }

  const lookup = data.lookup;
  await db.insert(merchantCompany).values({
    merchantId: merchant.id,
    legalName: data.companyName,
    tradeName: lookup?.tradeName ?? null,
    taxId: data.documentNumber,
    taxIdType: identity.taxId.name,
    registrationNumber: lookup?.registrationNumber ?? null,
    registrationDate: lookup?.registrationDate ?? null,
    legalStructure: lookup?.legalStructure ?? null,
    addressStreet: lookup?.addressStreet ?? null,
    addressNumber: lookup?.addressNumber ?? null,
    addressComplement: lookup?.addressComplement ?? null,
    addressNeighborhood: lookup?.addressNeighborhood ?? null,
    addressCity: lookup?.addressCity ?? null,
    addressState: lookup?.addressState ?? null,
    addressZip: lookup?.addressZip ?? null,
    industry: data.industry || null,
    addressCountry: country,
    taxRegime: known.taxRegime ?? null,
    giro: known.giro ?? null,
    comuna: known.comuna ?? null,
    ciuu: known.ciuu ?? null,
    condicionIva: known.condicionIva ?? null,
    camaraComercio: known.camaraComercio ?? null,
    countryDetails: Object.keys(reserved).length > 0 ? reserved : null,
  });

  if (lookup) {
    const { source, ...fields } = lookup;
    await db.insert(onboardingEvents).values({
      merchantId: merchant.id,
      eventType: 'company.enriched',
      payload: {
        source: source || '',
        fields: Object.entries(fields).filter(([, v]) => v).map(([k]) => k),
      },
    });
  }

  await db.insert(merchantOwners).values(
    data.owners.map((o) => ({
      merchantId: merchant.id,
      fullName: o.fullName,
      documentNumber: o.documentNumber || null,
      ownershipPct: o.ownershipPct,
      role: o.role,
      isPep: o.isPep,
    })),
  );

  await db.insert(onboardingEvents).values({
    merchantId: merchant.id,
    eventType: 'kyb.declaration.signed',
    payload: data.declaration ? { ...data.declaration } : {},
  });

  await db.insert(merchantOperations).values({
    merchantId: merchant.id,
    countries,
  });

  await db.insert(onboardingEvents).values({
    merchantId: merchant.id,
    eventType: 'signup.completed',
    payload: { merchantType: data.merchantType, country, countries, owners: data.owners.length },
  });

  // The applicant finishes the documents before any session exists, so issue
  // a short-lived upload token bound to this merchant.
  const uploadToken = await createUploadToken(merchant.id);

  try {
    const token = await createMagicLink(merchant.id);
    const prefix = langPrefix(lang);
    const verifyUrl = `${getAppUrl()}${prefix}/auth/verify/${encodeURIComponent(token)}`;
    await sendMagicLinkEmail(email, verifyUrl, lang);
  } catch {
    return Response.json({ ok: true, merchantId: merchant.id, uploadToken, emailSent: false });
  }

  return Response.json({ ok: true, merchantId: merchant.id, uploadToken, emailSent: true });
};
