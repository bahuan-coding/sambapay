ALTER TABLE "merchant_documents" ADD COLUMN "data" bytea;--> statement-breakpoint
ALTER TABLE "merchant_documents" ADD COLUMN "status" text DEFAULT 'received' NOT NULL;--> statement-breakpoint
ALTER TABLE "merchants" ADD COLUMN "countries" jsonb;--> statement-breakpoint
ALTER TABLE "merchants" ADD COLUMN "tax_id_type" text;