import { and, eq, gt } from 'drizzle-orm';
import { db } from '../../db/index';
import { magicLinkTokens, merchants } from '../../db/schema';
import { hashToken, randomToken } from './tokens';

const MAGIC_LINK_MINUTES = 15;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function findMerchantByEmail(email: string) {
  const normalized = normalizeEmail(email);
  const [merchant] = await db
    .select()
    .from(merchants)
    .where(eq(merchants.email, normalized))
    .limit(1);
  return merchant ?? null;
}

export async function createMagicLink(merchantId: number): Promise<string> {
  const token = randomToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + MAGIC_LINK_MINUTES);

  await db.insert(magicLinkTokens).values({
    merchantId,
    tokenHash,
    expiresAt,
  });

  return token;
}

export async function consumeMagicLink(rawToken: string) {
  const tokenHash = await hashToken(rawToken);
  const now = new Date();

  const [row] = await db
    .select({ token: magicLinkTokens, merchant: merchants })
    .from(magicLinkTokens)
    .innerJoin(merchants, eq(magicLinkTokens.merchantId, merchants.id))
    .where(and(eq(magicLinkTokens.tokenHash, tokenHash), gt(magicLinkTokens.expiresAt, now)))
    .limit(1);

  if (!row) return null;

  await db.delete(magicLinkTokens).where(eq(magicLinkTokens.id, row.token.id));
  return row.merchant;
}
