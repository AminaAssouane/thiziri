"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getRequiredString(formData: FormData, name: string): string {
  const value = formData.get(name);
  if (typeof value !== "string") {
    throw new Error(`Missing or invalid form field: ${name}`);
  }
  return value;
}

function getOptionalString(formData: FormData, name: string): string | null {
  const value = formData.get(name);
  if (value === null) return null;
  if (typeof value !== "string") {
    throw new Error(`Invalid form field: ${name}`);
  }
  return value || null;
}

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

export async function addMedication(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const name = getRequiredString(formData, "name");
  const dosage = getRequiredString(formData, "dosage");
  const frequency = getRequiredString(formData, "frequency");
  const startDate = new Date(getRequiredString(formData, "startDate"));
  const isActive = formData.get("isActive") === "on";

  const endDateRaw = getOptionalString(formData, "endDate");
  const endDate = endDateRaw ? new Date(endDateRaw) : null;

  const notes = getOptionalString(formData, "notes");

  try {
    const medication = await prisma.medication.create({
      data: {
        userId,
        name,
        dosage,
        frequency,
        startDate,
        endDate,
        notes,
        isActive,
      },
    });
  } catch (error) {
    console.error("Could not add medication. Error : ", error);
    throw error;
  }

  revalidatePath("/dashboard/medications");
  redirect("/dashboard/medications");
}

export async function editMedication(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const name = getRequiredString(formData, "name");
  const dosage = getRequiredString(formData, "dosage");
  const frequency = getRequiredString(formData, "frequency");
  const startDate = new Date(getRequiredString(formData, "startDate"));
  const isActive = formData.get("isActive") === "on";

  const endDateRaw = getOptionalString(formData, "endDate");
  const endDate = endDateRaw ? new Date(endDateRaw) : null;

  const notes = getOptionalString(formData, "notes");
  const id = getRequiredString(formData, "id");

  try {
    await prisma.medication.update({
      where: { id, userId },
      data: { name, dosage, frequency, startDate, endDate, notes, isActive },
    });
  } catch (error) {
    console.error("Couldn't edit the medication. Error : ", error);
    throw new Error();
  }

  revalidatePath("/dashboard/medications");
  redirect("/dashboard/medications");
}

export async function removeMedication(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  try {
    await prisma.medication.delete({ where: { id, userId: session.user.id } });
  } catch (error) {
    console.error("Couldn't delete the medication. Error : ", error);
  }

  revalidatePath("/dashboard/medications");
}
