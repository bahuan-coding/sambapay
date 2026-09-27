import { and, eq, gt } from 'drizzle-orm';
import { db } from '../../db/index';
import { authSessions, merchants } from '../../db/schema';
import { hashToken, randomToken } from './tokens';

const SESSION_COOKIE = 'sp_session';
const SESSION_DAYS = 30;

export { SESSION_COOKIE };

export async function createSession(merchantId: number): Promise<string> {
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await db.insert(authSessions).values({
    merchantId,
    tokenHash,
    expiresAt,
  });

  return token;
}

export async function getMerchantFromToken(token: string | undefined) {
  if (!token) return null;
  const tokenHash = await hashToken(token);
  const now = new Date();

  const [row] = await db
    .select({ merchant: merchants })
    .from(authSessions)
    .innerJoin(merchants, eq(authSessions.merchantId, merchants.id))
    .where(and(eq(authSessions.tokenHash, tokenHash), gt(authSessions.expiresAt, now)))
    .limit(1);

  return row?.merchant ?? null;
}

const UPLOAD_TOKEN_MINUTES = 60;

/**
 * The applicant has no session yet while finishing the signup, so the server
 * hands out a one-time upload token bound to the merchant. It lets the freshly
 * created merchant attach its own documents and nothing else.
 */
export async function createUploadToken(merchantId: number): Promise<string> {
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + UPLOAD_TOKEN_MINUTES);

  await db
    .update(merchants)
    .set({ uploadTokenHash: tokenHash, uploadTokenExpiresAt: expiresAt })
    .where(eq(merchants.id, merchantId));

  return token;
}

/** True when the token is the merchant's live upload credential. */
export async function holdsUploadToken(merchantId: number, token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const tokenHash = await hashToken(token);
  const now = new Date();
  const [row] = await db
    .select({ id: merchants.id })
    .from(merchants)
    .where(
      and(
        eq(merchants.id, merchantId),
        eq(merchants.uploadTokenHash, tokenHash),
        gt(merchants.uploadTokenExpiresAt, now),
      ),
    )
    .limit(1);
  return !!row;
}

export async function destroySession(token: string | undefined) {
  if (!token) return;
  const tokenHash = await hashToken(token);
  await db.delete(authSessions).where(eq(authSessions.tokenHash, tokenHash));
}

export function sessionCookieHeader(token: string, secure: boolean): string {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function clearSessionCookieHeader(secure: boolean): string {
  const parts = [`${SESSION_COOKIE}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}
