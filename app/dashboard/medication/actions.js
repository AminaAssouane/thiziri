"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMedications() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const medications = await prisma.medication.findMany({
    where: { userId },
    orderBy: [{ isActive: "desc" }, { startDate: "desc" }],
  });

  return medications;
}
