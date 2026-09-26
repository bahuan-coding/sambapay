import type { APIRoute } from 'astro';
import { z } from 'zod';
import { db } from '../../../db/index';
import { merchants, onboardingEvents } from '../../../db/schema';
import { langPrefix, type Lang } from '../../i18n';
import { sendMagicLinkEmail } from '../../lib/email';
import { getAppUrl } from '../../lib/env';
import { createMagicLink, findMerchantByEmail, normalizeEmail } from '../../lib/magic-link';

export const prerender = false;

function normalizeWebsite(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

const bodySchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(30),
  terms: z.literal(true),
  companyName: z.string().trim().min(2).max(300),
  country: z.string().trim().length(2),
  website: z.preprocess(normalizeWebsite, z.union([z.literal(''), z.string().url()])),
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
      website: data.website || null,
      merchantType: 'direct',
      preferredLocale: lang,
      status: 'commercial_fit',
    })
    .returning();

  await db.insert(onboardingEvents).values({
    merchantId: merchant.id,
    eventType: 'signup.completed',
    payload: { merchantType: 'direct', country },
  });

  try {
    const token = await createMagicLink(merchant.id);
    const prefix = langPrefix(lang);
    const verifyUrl = `${getAppUrl()}${prefix}/auth/verify/${encodeURIComponent(token)}`;
    await sendMagicLinkEmail(email, verifyUrl, lang);
  } catch {
    return Response.json({ ok: true, emailSent: false });
  }

  return Response.json({ ok: true, emailSent: true });
};
