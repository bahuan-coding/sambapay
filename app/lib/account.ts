import { eq } from 'drizzle-orm';
import { db } from '../../db/index';
import {
  merchantCompany,
  merchantDocuments,
  merchantOwners,
  type Merchant,
} from '../../db/schema';
import { documentsAreComplete, resolveKybStatus, type KybStatus } from './kyb-status';

/** The document types a complete application carries, one per owner plus the
 *  company set. Kept in one place so the page and the count never drift. */
const REQUIRED_COMPANY_DOCS = ['companyDoc'];
const REQUIRED_OWNER_DOC = /^ownerDoc(_\d+)?$/;

export interface AccountDocument {
  docType: string;
  fileName: string;
  status: string;
}

export interface AccountOwner {
  fullName: string;
  role: string | null;
  ownershipPct: number | null;
}

export interface AccountOverview {
  documents: AccountDocument[];
  owners: AccountOwner[];
  legalName: string | null;
  /** How many owners have an identification document on file. */
  ownersWithDoc: number;
  ownerCount: number;
  /** 0–4: account, business, owners, documents. */
  completedSteps: number;
  status: KybStatus;
}

/**
 * Everything the account page shows, loaded once. The progress is derived,
 * never stored twice: a step counts when its data exists.
 */
export async function getAccountOverview(merchant: Merchant): Promise<AccountOverview> {
  const [company, owners, documents] = await Promise.all([
    db.select().from(merchantCompany).where(eq(merchantCompany.merchantId, merchant.id)).limit(1),
    db.select().from(merchantOwners).where(eq(merchantOwners.merchantId, merchant.id)),
    db
      .select({
        docType: merchantDocuments.docType,
        fileName: merchantDocuments.fileName,
        status: merchantDocuments.status,
      })
      .from(merchantDocuments)
      .where(eq(merchantDocuments.merchantId, merchant.id)),
  ]);

  const hasCompanyDocs = documents.some((d) => REQUIRED_COMPANY_DOCS.includes(d.docType));
  // The client labels owner documents by their position in the list (ownerDoc_1,
  // ownerDoc_2…), so match on order, not on the database id.
  const ownersWithDoc = owners.filter((_, i) =>
    documents.some((d) => d.docType === `ownerDoc_${i + 1}` || d.docType === 'ownerDoc'),
  ).length;
  const ownerDocsOnFile = documents.filter((d) => REQUIRED_OWNER_DOC.test(d.docType)).length;
  const hasOwnerDocs = owners.length > 0 && ownerDocsOnFile >= owners.length;

  const docsComplete = documentsAreComplete(hasCompanyDocs, hasOwnerDocs);
  let completedSteps = 1; // the account exists
  if (company.length > 0) completedSteps = 2;
  if (owners.length > 0) completedSteps = 3;
  if (docsComplete) completedSteps = 4;

  return {
    documents: documents.map((d) => ({ docType: d.docType, fileName: d.fileName, status: d.status })),
    owners: owners.map((o) => ({ fullName: o.fullName, role: o.role, ownershipPct: o.ownershipPct })),
    legalName: company[0]?.legalName ?? null,
    ownersWithDoc,
    ownerCount: owners.length,
    completedSteps,
    status: resolveKybStatus(merchant.status, docsComplete),
  };
}
