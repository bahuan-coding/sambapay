DROP TABLE "merchant_compliance";--> statement-breakpoint
DROP TABLE "merchant_contacts";--> statement-breakpoint
ALTER TABLE "merchants" DROP COLUMN "password_hash";--> statement-breakpoint
ALTER TABLE "merchants" DROP COLUMN "operation_type";--> statement-breakpoint
ALTER TABLE "merchants" DROP COLUMN "monthly_volume";