import { Resend } from 'resend';
import type { Lang } from '../i18n';
import { magicLinkEmailCopy } from '../i18n/magic-link-email';
import { getOptionalEnv } from './env';

export async function sendMagicLinkEmail(to: string, verifyUrl: string, lang: Lang) {
  const key = getOptionalEnv('RESEND_API_KEY');
  const from = getOptionalEnv('RESEND_FROM');
  if (!key || !from) throw new Error('email_not_configured');

  const copy = magicLinkEmailCopy(lang);
  const html = `<!DOCTYPE html>
<html lang="${lang}">
  <body style="font-family: Inter, system-ui, sans-serif; line-height: 1.5; color: #1C3D4A; background: #F4EFE4; padding: 24px;">
    <div style="max-width: 480px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E6DFD2; border-radius: 8px; padding: 32px 28px;">
      <p style="margin: 0 0 12px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; color: #1351B4; font-weight: 700;">SambaPay</p>
      <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 700; color: #1C3D4A;">${copy.heading}</h1>
      <p style="margin: 0 0 24px; color: #5A6A72;">${copy.body}</p>
      <a href="${verifyUrl}" style="display: inline-block; background: #1351B4; color: #FFFFFF; text-decoration: none; font-weight: 600; padding: 12px 20px; border-radius: 8px;">${copy.cta}</a>
      <p style="margin: 24px 0 0; font-size: 13px; color: #5A6A72;">${copy.footer}</p>
    </div>
  </body>
</html>`;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: copy.subject,
    html,
    text: `${copy.body}\n\n${copy.cta}: ${verifyUrl}\n\n${copy.footer}`,
  });

  if (error) throw new Error(error.message);
}
