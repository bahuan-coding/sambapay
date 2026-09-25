CREATE TABLE "auth_sessions" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL,
	"token_hash" text NOT NULL UNIQUE,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "magic_link_tokens" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL,
	"token_hash" text NOT NULL UNIQUE,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_company" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL UNIQUE,
	"legal_name" text,
	"trade_name" text,
	"tax_id" text,
	"tax_id_type" text,
	"registration_number" text,
	"registration_date" text,
	"entity_type" text,
	"legal_structure" text,
	"address_street" text,
	"address_number" text,
	"address_complement" text,
	"address_neighborhood" text,
	"address_city" text,
	"address_state" text,
	"address_zip" text,
	"address_country" text,
	"mcc" text,
	"cnae_primary" text,
	"industry" text,
	"annual_revenue" real,
	"annual_revenue_currency" text DEFAULT 'USD',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_compliance" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL UNIQUE,
	"pci_compliant" boolean DEFAULT false,
	"pci_level" text,
	"has_antifraud" boolean DEFAULT false,
	"has_3ds" boolean DEFAULT false,
	"has_privacy_policy" boolean DEFAULT false,
	"has_dpo" boolean DEFAULT false,
	"dpo_name" text,
	"dpo_email" text,
	"has_aml_program" boolean DEFAULT false,
	"has_kyc_process" boolean DEFAULT false,
	"risk_category" text,
	"risk_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_contacts" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL,
	"contact_type" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"role_title" text,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_documents" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL,
	"doc_type" text NOT NULL,
	"file_name" text NOT NULL,
	"blob_key" text NOT NULL,
	"content_type" text,
	"file_size" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_operations" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL UNIQUE,
	"monthly_volume_usd" real,
	"average_ticket_usd" real,
	"wants_credit_card" boolean DEFAULT false,
	"wants_debit_card" boolean DEFAULT false,
	"wants_pix" boolean DEFAULT false,
	"wants_boleto" boolean DEFAULT false,
	"countries" jsonb,
	"currencies" jsonb,
	"settlement_currency" text,
	"settlement_frequency" text,
	"business_description" text,
	"product_type" text,
	"delivery_model" text,
	"recurring_billing" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchant_owners" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL,
	"full_name" text NOT NULL,
	"document_type" text,
	"document_number" text,
	"nationality" text,
	"date_of_birth" text,
	"ownership_pct" real,
	"role" text,
	"is_pep" boolean DEFAULT false,
	"pep_details" text,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "merchants" (
	"id" serial PRIMARY KEY,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" text,
	"name" text NOT NULL,
	"phone" text,
	"company_name" text NOT NULL,
	"country" varchar(2) NOT NULL,
	"document_number" text,
	"website" text,
	"business_type" text,
	"operation_type" text,
	"monthly_volume" text,
	"merchant_type" text DEFAULT 'direct' NOT NULL,
	"preferred_locale" varchar(5) DEFAULT 'en',
	"status" text DEFAULT 'commercial_fit' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_events" (
	"id" serial PRIMARY KEY,
	"merchant_id" integer NOT NULL,
	"event_type" text NOT NULL,
	"payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "magic_link_tokens" ADD CONSTRAINT "magic_link_tokens_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "merchant_company" ADD CONSTRAINT "merchant_company_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "merchant_compliance" ADD CONSTRAINT "merchant_compliance_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "merchant_contacts" ADD CONSTRAINT "merchant_contacts_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "merchant_documents" ADD CONSTRAINT "merchant_documents_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "merchant_operations" ADD CONSTRAINT "merchant_operations_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "merchant_owners" ADD CONSTRAINT "merchant_owners_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "onboarding_events" ADD CONSTRAINT "onboarding_events_merchant_id_merchants_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE CASCADE;