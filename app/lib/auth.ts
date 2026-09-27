import type { APIContext } from 'astro';
import type { Merchant } from '../../db/schema';
import { SESSION_COOKIE, getMerchantFromToken } from './session';

export async function getSessionMerchant(cookies: APIContext['cookies']): Promise<Merchant | null> {
  const token = cookies.get(SESSION_COOKIE)?.value;
  return getMerchantFromToken(token);
}

/**
 * Whether the cookie should carry `Secure`. Behind the Netlify proxy the
 * request URL can read as plain http, so trust the forwarded protocol and the
 * host instead of the socket: only an explicit localhost http stays insecure.
 */
export function isSecureRequest(request: Request): boolean {
  if (new URL(request.url).protocol === 'https:') return true;
  const forwarded = request.headers.get('x-forwarded-proto');
  if (forwarded) return forwarded.split(',')[0]!.trim() === 'https';
  const host = request.headers.get('host') ?? new URL(request.url).hostname;
  return !/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
}
