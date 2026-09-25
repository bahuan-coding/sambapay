import type { APIRoute } from 'astro';
import { isSecureRequest } from '../../../lib/auth';
import { SESSION_COOKIE, clearSessionCookieHeader, destroySession } from '../../../lib/session';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  await destroySession(token);
  cookies.delete(SESSION_COOKIE, { path: '/' });

  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') === 'pt' ? 'pt' : 'en';
  const dest = lang === 'pt' ? '/pt/' : '/';

  return new Response(null, {
    status: 302,
    headers: {
      Location: dest,
      'Set-Cookie': clearSessionCookieHeader(isSecureRequest(request)),
    },
  });
};
