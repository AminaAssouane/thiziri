/*
  Warnings:

  - A unique constraint covering the columns `[mainContactId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mainContactId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_mainContactId_key" ON "User"("mainContactId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_mainContactId_fkey" FOREIGN KEY ("mainContactId") REFERENCES "EmergencyContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
