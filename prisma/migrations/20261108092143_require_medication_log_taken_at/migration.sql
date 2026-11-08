/*
  Warnings:

  - Made the column `takenAt` on table `MedicationLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MedicationLog" ALTER COLUMN "takenAt" SET NOT NULL;
