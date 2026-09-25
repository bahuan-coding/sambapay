import { isSecureRequest } from './auth';
import { consumeMagicLink } from './magic-link';
import { createSession, sessionCookieHeader } from './session';

export async function verifyMagicLink(request: Request, token: string | undefined): Promise<Response> {
  const loginPath = new URL(request.url).pathname.startsWith('/pt/') ? '/pt/login' : '/login';

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
  const accountPath = merchant.preferredLocale === 'pt' ? '/pt/conta' : '/account';

  return new Response(null, {
    status: 302,
    headers: {
      Location: accountPath,
      'Set-Cookie': sessionCookieHeader(sessionToken, isSecureRequest(request)),
    },
  });
}
