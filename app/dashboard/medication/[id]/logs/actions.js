"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMedLogs(medicationId) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const logs = await prisma.medicationLog.findMany({
    where: { userId: session.user.id, medicationId },
  });

  return logs;
}

export async function createMedLog(medicationId, formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const takenAtInitial = formData.get("takenAt");
  const takenAt = takenAtInitial ? new Date(takenAtInitial) : null;

  const skipped = formData.get("skipped") === "on";
  const notes = formData.get("notes") || null;

  // Checking if the user has the medication we want to add a log to
  const medication = await prisma.medication.findFirst({
    where: { id: medicationId, userId: session.user.id },
  });
  if (!medication) throw new Error("Not found");

  // Adding a log to the medication
  await prisma.medicationLog.create({
    data: { userId: session.user.id, medicationId, takenAt, skipped, notes },
  });

  revalidatePath(`/dashboard/medication/${medicationId}/logs`);
  redirect(`/dashboard/medication/${medicationId}/logs`);
}
