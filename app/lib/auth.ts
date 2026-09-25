import type { APIContext } from 'astro';
import type { Merchant } from '../../db/schema';
import { SESSION_COOKIE, getMerchantFromToken } from './session';

export async function getSessionMerchant(cookies: APIContext['cookies']): Promise<Merchant | null> {
  const token = cookies.get(SESSION_COOKIE)?.value;
  return getMerchantFromToken(token);
}

export function isSecureRequest(request: Request): boolean {
  return new URL(request.url).protocol === 'https:';
}
