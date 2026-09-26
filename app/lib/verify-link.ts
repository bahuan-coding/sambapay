import { asLang, pathForLang } from '../i18n';
import { isSecureRequest } from './auth';
import { consumeMagicLink } from './magic-link';
import { createSession, sessionCookieHeader } from './session';

export async function verifyMagicLink(request: Request, token: string | undefined): Promise<Response> {
  const pathname = new URL(request.url).pathname;
  const requestLang = pathname.startsWith('/pt/') ? 'pt' : pathname.startsWith('/es/') ? 'es' : 'en';
  const loginPath = pathForLang('/login', requestLang);

  if (!token) {
    return new Response(null, {
      status: 302,
      headers: { Location: `${loginPath}?link=invalid` },
    });
  }

  const merchant = await consumeMagicLink(token);
  if (!merchant) {
    return new Response(null, {
      status: 302,
      headers: { Location: `${loginPath}?link=invalid` },
    });
  }

  const sessionToken = await createSession(merchant.id);
  const accountPath = pathForLang('/account', asLang(merchant.preferredLocale));

  return new Response(null, {
    status: 302,
    headers: {
      Location: accountPath,
      'Set-Cookie': sessionCookieHeader(sessionToken, isSecureRequest(request)),
    },
  });
}
