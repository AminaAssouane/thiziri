/*
  Warnings:

  - Made the column `relationship` on table `EmergencyContact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmergencyContact" ALTER COLUMN "relationship" SET NOT NULL;
