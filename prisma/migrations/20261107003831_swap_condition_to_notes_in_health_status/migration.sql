/*
  Warnings:

  - You are about to drop the column `condition` on the `HealthStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HealthStatus" DROP COLUMN "condition",
ADD COLUMN     "notes" TEXT;
