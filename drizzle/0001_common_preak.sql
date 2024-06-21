ALTER TABLE "todo" RENAME COLUMN "full_name" TO "title";--> statement-breakpoint
ALTER TABLE "todo" RENAME COLUMN "phone" TO "description";--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "done" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "createdAt" date DEFAULT '2024-06-21T21:28:48.725Z';--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "updatedAt" date DEFAULT '2024-06-21T21:28:48.727Z';