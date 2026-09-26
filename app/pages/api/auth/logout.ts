import type { APIRoute } from 'astro';
import { asLang, pathForLang } from '../../../i18n';
import { isSecureRequest } from '../../../lib/auth';
import { SESSION_COOKIE, clearSessionCookieHeader, destroySession } from '../../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  await destroySession(token);
  cookies.delete(SESSION_COOKIE, { path: '/' });

  const url = new URL(request.url);
  const lang = asLang(url.searchParams.get('lang'));
  const dest = pathForLang('/', lang);

  return new Response(null, {
    status: 302,
    headers: {
      Location: dest,
      'Set-Cookie': clearSessionCookieHeader(isSecureRequest(request)),
    },
  });
};
