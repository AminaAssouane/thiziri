/*
  Warnings:

  - Added the required column `userId` to the `MedicationLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicationLog" ADD COLUMN     "userId" TEXT NOT NULL;
