/*
  Warnings:

  - Made the column `time` on table `Todos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Todos" ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "time" SET DEFAULT CURRENT_TIMESTAMP;
