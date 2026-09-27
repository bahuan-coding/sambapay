import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db/index';
import { merchants, merchantOwners, merchantCompany, merchantOperations, onboardingEvents } from '../../../db/schema';
import { langPrefix, type Lang } from '../../i18n';
import { sendMagicLinkEmail } from '../../lib/email';
import { getAppUrl } from '../../lib/env';
import { createMagicLink, findMerchantByEmail, normalizeEmail } from '../../lib/magic-link';
import { identityFor } from '../../data/identity';

export const prerender = false;

function normalizeWebsite(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

const ownerSchema = z.object({
  fullName: z.string().trim().min(2).max(200),
  documentNumber: z.string().trim().max(60).optional().default(''),
  role: z.enum(['director', 'ubo', 'shareholder']).optional().default('director'),
  ownershipPct: z.number().min(0).max(100).optional().default(0),
  isPep: z.boolean().optional().default(false),
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
  owners: z.array(ownerSchema).optional().default([]),
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

  // Server-side check digit on the tax identifier when the country defines one.
  const identity = identityFor(country);
  if (identity.taxId.validate && data.documentNumber && !identity.taxId.validate(data.documentNumber)) {
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

  await db.insert(merchantCompany).values({
    merchantId: merchant.id,
    legalName: data.companyName,
    taxId: data.documentNumber || null,
    taxIdType: identity.taxId.name,
    industry: data.industry || null,
    addressCountry: country,
  });

  if (data.owners.length > 0) {
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
  }

  await db.insert(onboardingEvents).values({
    merchantId: merchant.id,
    eventType: 'kyb.declaration.signed',
    payload: data.declaration ? { ...data.declaration } : {},
  });

  await db.insert(merchantOperations).values({
    merchantId: merchant.id,
    countries,
    businessDescription: data.extras.description ?? null,
  });

  await db.insert(onboardingEvents).values({
    merchantId: merchant.id,
    eventType: 'signup.completed',
    payload: { merchantType: data.merchantType, country, countries, owners: data.owners.length },
  });

  try {
    const token = await createMagicLink(merchant.id);
    const prefix = langPrefix(lang);
    const verifyUrl = `${getAppUrl()}${prefix}/auth/verify/${encodeURIComponent(token)}`;
    await sendMagicLinkEmail(email, verifyUrl, lang);
  } catch {
    return Response.json({ ok: true, merchantId: merchant.id, emailSent: false });
  }

  return Response.json({ ok: true, merchantId: merchant.id, emailSent: true });
};
