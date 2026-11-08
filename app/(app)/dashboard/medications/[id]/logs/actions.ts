"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getRequiredDateTime(formData: FormData) {
  const value = formData.get("takenAt");

  if (typeof value !== "string" || !value) {
    throw new Error("Date and time are required");
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Enter a valid date and time");
  }

  return date;
}

function getSkippedStatus(formData: FormData) {
  const status = formData.get("status");

  if (status !== "taken" && status !== "skipped") {
    throw new Error("Choose Taken or Skipped");
  }

  return status === "skipped";
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

  const takenAt = getRequiredDateTime(formData);

  const skipped = getSkippedStatus(formData);

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

  const takenAt = getRequiredDateTime(formData);

  const skipped = getSkippedStatus(formData);

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
