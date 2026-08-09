"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMedLogs(medicationId) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const logs = await prisma.medicationLog.findMany({
    where: { userId: session.user.id, medicationId },
  });

  return logs;
}
