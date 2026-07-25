-- AddForeignKey
ALTER TABLE "MedicationLog" ADD CONSTRAINT "MedicationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
