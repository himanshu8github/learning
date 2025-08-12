/*
  Warnings:

  - Made the column `age` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "mobileNumber" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "age" SET NOT NULL;
