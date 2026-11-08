"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMedName(medicationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const medication = await prisma.medication.findUnique({
    where: { userId: session.user.id, id: medicationId },
    select: { name: true },
  });
  return medication?.name ?? null;
}

export async function getMedLogs(medicationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const logs = await prisma.medicationLog.findMany({
    where: { userId: session.user.id, medicationId },
  });

  return logs;
}

export async function getMedLog(logId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const log = await prisma.medicationLog.findFirst({
    where: { id: logId, userId: session.user.id },
  });

  return log;
}

export async function createMedLog(medicationId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const takenAtInitial = formData.get("takenAt");
  const takenAt =
    typeof takenAtInitial === "string" && takenAtInitial
      ? new Date(takenAtInitial)
      : null;

  const skipped = formData.get("skipped") === "on";
  const notesValue = formData.get("notes");
  const notes = typeof notesValue === "string" ? notesValue || null : null;

  // Checking if the user has the medication we want to add a log to
  const medication = await prisma.medication.findFirst({
    where: { id: medicationId, userId: session.user.id },
  });
  if (!medication) throw new Error("Not found");

  // Adding a log to the medication
  await prisma.medicationLog.create({
    data: { userId: session.user.id, medicationId, takenAt, skipped, notes },
  });

  revalidatePath(`/dashboard/medications/${medicationId}/logs`);
  redirect(`/dashboard/medications/${medicationId}/logs`);
}

export async function editMedicationLog(logId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const takenAtInitial = formData.get("takenAt");
  const takenAt =
    typeof takenAtInitial === "string" && takenAtInitial
      ? new Date(takenAtInitial)
      : null;

  const skipped = formData.get("skipped") === "on";
  const notesValue = formData.get("notes");
  const notes = typeof notesValue === "string" ? notesValue || null : null;

  // Ownership check: does this log belong to this user?
  const log = await prisma.medicationLog.findFirst({
    where: { id: logId, userId: session.user.id },
  });
  if (!log) throw new Error("Log not found");

  await prisma.medicationLog.update({
    where: { id: logId },
    data: { takenAt, skipped, notes },
  });

  revalidatePath(`/dashboard/medications/${log.medicationId}/logs`);
  redirect(`/dashboard/medications/${log.medicationId}/logs`);
}

export async function deleteMedLog(logId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const log = await prisma.medicationLog.findFirst({
    where: { userId: session.user.id, id: logId },
  });

  if (!log) throw new Error("Log not found");

  await prisma.medicationLog.delete({ where: { id: logId } });

  revalidatePath(`/dashboard/medications/${log.medicationId}/logs`);
}
