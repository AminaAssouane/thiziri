"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function addMedication(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const name = formData.get("name");
  const dosage = formData.get("dosage");
  const frequency = formData.get("frequency");
  const startDate = new Date(formData.get("startDate"));

  const endDateRaw = formData.get("endDate");
  const endDate = endDateRaw ? new Date(formData.get("endDate")) : null;

  const notes = formData.get("notes") || null;

  try {
    const medication = await prisma.medication.create({
      data: { userId, name, dosage, frequency, startDate, endDate, notes },
    });
  } catch (error) {
    console.error("Could not add medication. Error : ", error);
    return { error: "Could not add medication." };
  }

  revalidatePath("/dashboard/medication");
  redirect("/dashboard/medication");
}
