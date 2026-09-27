/**
 * The KYB status machine. The states live here once, so the account page, the
 * copy, and any future reviewer console agree. `merchants.status` is free text
 * with no migration needed; the stored value wins, except that an application
 * whose documents are complete is promoted from `commercial_fit` to
 * `docs_received` at read time — derived, never written twice.
 */
export const KYB_STATUSES = [
  'commercial_fit',
  'docs_received',
  'in_review',
  'needs_info',
  'approved',
  'rejected',
] as const;

export type KybStatus = (typeof KYB_STATUSES)[number];

export const DEFAULT_KYB_STATUS: KybStatus = 'commercial_fit';

export function isKybStatus(value: string | null | undefined): value is KybStatus {
  return !!value && (KYB_STATUSES as readonly string[]).includes(value);
}

/** The status a merchant shows, promoting a documented application one step. */
export function resolveKybStatus(
  stored: string | null | undefined,
  documentsComplete: boolean,
): KybStatus {
  const current = isKybStatus(stored) ? stored : DEFAULT_KYB_STATUS;
  if (current === 'commercial_fit' && documentsComplete) return 'docs_received';
  return current;
}

/** True once the company and the owners are all on file. */
export function documentsAreComplete(hasCompanyDocs: boolean, hasOwnerDocs: boolean): boolean {
  return hasCompanyDocs && hasOwnerDocs;
}
