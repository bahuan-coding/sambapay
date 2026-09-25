import type { APIRoute } from 'astro';
import { z } from 'zod';
import type { Lang } from '../../../i18n';
import { sendMagicLinkEmail } from '../../../lib/email';
import { getAppUrl } from '../../../lib/env';
import { createMagicLink, findMerchantByEmail, normalizeEmail } from '../../../lib/magic-link';

export const prerender = false;

const bodySchema = z.object({
  email: z.string().trim().email(),
  locale: z.enum(['en', 'pt']).optional(),
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

  const email = normalizeEmail(parsed.data.email);
  const merchant = await findMerchantByEmail(email);

  if (merchant) {
    const lang: Lang = parsed.data.locale ?? (merchant.preferredLocale === 'pt' ? 'pt' : 'en');
    try {
      const token = await createMagicLink(merchant.id);
      const prefix = lang === 'pt' ? '/pt' : '';
      const verifyUrl = `${getAppUrl()}${prefix}/auth/verify/${encodeURIComponent(token)}`;
      await sendMagicLinkEmail(email, verifyUrl, lang);
    } catch {
      return Response.json({ error: 'email_send_failed' }, { status: 502 });
    }
  }

  return Response.json({ ok: true });
};
