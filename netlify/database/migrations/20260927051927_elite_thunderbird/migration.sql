ALTER TABLE "merchants" ADD COLUMN "upload_token_hash" text;--> statement-breakpoint
ALTER TABLE "merchants" ADD COLUMN "upload_token_expires_at" timestamp with time zone;