import {
  boolean,
  customType,
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return 'bytea';
  },
});

export const merchants = pgTable('merchants', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  name: text('name').notNull(),
  phone: text('phone'),
  companyName: text('company_name').notNull(),
  country: varchar('country', { length: 2 }).notNull(),
  countries: jsonb('countries'),
  documentNumber: text('document_number'),
  taxIdType: text('tax_id_type'),
  website: text('website'),
  businessType: text('business_type'),
  operationType: text('operation_type'),
  monthlyVolume: text('monthly_volume'),
  merchantType: text('merchant_type').notNull().default('direct'),
  preferredLocale: varchar('preferred_locale', { length: 5 }).default('en'),
  status: text('status').notNull().default('commercial_fit'),
  // A short-lived token issued at signup, so the applicant can upload the
  // documents before any session exists. The raw token never touches the DB.
  uploadTokenHash: text('upload_token_hash'),
  uploadTokenExpiresAt: timestamp('upload_token_expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const magicLinkTokens = pgTable('magic_link_tokens', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const authSessions = pgTable('auth_sessions', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const merchantCompany = pgTable('merchant_company', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .unique()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  legalName: text('legal_name'),
  tradeName: text('trade_name'),
  taxId: text('tax_id'),
  taxIdType: text('tax_id_type'),
  registrationNumber: text('registration_number'),
  registrationDate: text('registration_date'),
  entityType: text('entity_type'),
  legalStructure: text('legal_structure'),
  addressStreet: text('address_street'),
  addressNumber: text('address_number'),
  addressComplement: text('address_complement'),
  addressNeighborhood: text('address_neighborhood'),
  addressCity: text('address_city'),
  addressState: text('address_state'),
  addressZip: text('address_zip'),
  addressCountry: text('address_country'),
  mcc: text('mcc'),
  cnaePrimary: text('cnae_primary'),
  industry: text('industry'),
  // Country-specific identity fields, one column each, with a jsonb reserve.
  taxRegime: text('tax_regime'),
  giro: text('giro'),
  comuna: text('comuna'),
  ciuu: text('ciuu'),
  condicionIva: text('condicion_iva'),
  camaraComercio: text('camara_comercio'),
  countryDetails: jsonb('country_details'),
  annualRevenue: real('annual_revenue'),
  annualRevenueCurrency: text('annual_revenue_currency').default('USD'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const merchantContacts = pgTable('merchant_contacts', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  contactType: text('contact_type').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  roleTitle: text('role_title'),
  isPrimary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const merchantOperations = pgTable('merchant_operations', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .unique()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  monthlyVolumeUsd: real('monthly_volume_usd'),
  averageTicketUsd: real('average_ticket_usd'),
  wantsCreditCard: boolean('wants_credit_card').default(false),
  wantsDebitCard: boolean('wants_debit_card').default(false),
  wantsPix: boolean('wants_pix').default(false),
  wantsBoleto: boolean('wants_boleto').default(false),
  countries: jsonb('countries'),
  currencies: jsonb('currencies'),
  settlementCurrency: text('settlement_currency'),
  settlementFrequency: text('settlement_frequency'),
  businessDescription: text('business_description'),
  productType: text('product_type'),
  deliveryModel: text('delivery_model'),
  recurringBilling: boolean('recurring_billing').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const merchantOwners = pgTable('merchant_owners', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  documentType: text('document_type'),
  documentNumber: text('document_number'),
  nationality: text('nationality'),
  dateOfBirth: text('date_of_birth'),
  ownershipPct: real('ownership_pct'),
  role: text('role'),
  isPep: boolean('is_pep').default(false),
  pepDetails: text('pep_details'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  country: text('country'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const merchantCompliance = pgTable('merchant_compliance', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .unique()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  pciCompliant: boolean('pci_compliant').default(false),
  pciLevel: text('pci_level'),
  hasAntifraud: boolean('has_antifraud').default(false),
  has3ds: boolean('has_3ds').default(false),
  hasPrivacyPolicy: boolean('has_privacy_policy').default(false),
  hasDpo: boolean('has_dpo').default(false),
  dpoName: text('dpo_name'),
  dpoEmail: text('dpo_email'),
  hasAmlProgram: boolean('has_aml_program').default(false),
  hasKycProcess: boolean('has_kyc_process').default(false),
  riskCategory: text('risk_category'),
  riskNotes: text('risk_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const merchantDocuments = pgTable('merchant_documents', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  docType: text('doc_type').notNull(),
  fileName: text('file_name').notNull(),
  blobKey: text('blob_key').notNull(),
  contentType: text('content_type'),
  fileSize: integer('file_size'),
  data: bytea('data'),
  status: text('status').notNull().default('received'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const onboardingEvents = pgTable('onboarding_events', {
  id: serial('id').primaryKey(),
  merchantId: integer('merchant_id')
    .notNull()
    .references(() => merchants.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  payload: jsonb('payload'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Merchant = typeof merchants.$inferSelect;
export type NewMerchant = typeof merchants.$inferInsert;
