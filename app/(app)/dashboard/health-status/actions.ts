"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHealthStatus(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const weightRaw = formData.get("weight");
  const weight =
    typeof weightRaw === "string" && weightRaw ? Number(weightRaw) : null;

  const bloodPressureRaw = formData.get("bloodPressure");
  const bloodPressure =
    typeof bloodPressureRaw === "string" ? bloodPressureRaw || null : null;

  const bloodSugarRaw = formData.get("bloodSugar");
  const bloodSugar =
    typeof bloodSugarRaw === "string" && bloodSugarRaw
      ? Number(bloodSugarRaw)
      : null;

  const temperatureRaw = formData.get("temperature");
  const temperature =
    typeof temperatureRaw === "string" && temperatureRaw
      ? Number(temperatureRaw)
      : null;

  const notesRaw = formData.get("notes");
  const notes = typeof notesRaw === "string" ? notesRaw || null : null;

  try {
    await prisma.healthStatus.create({
      data: {
        userId: session.user.id,
        weight,
        bloodPressure,
        bloodSugar,
        temperature,
        notes,
      },
    });
    revalidatePath("/dashboard/health-status"); // to refresh the data, as nextjs might just show the cached version with the new entry not added in
  } catch (error) {
    console.error("Failed to add health status", error);
  }
  redirect("/dashboard/health-status");
}

export async function deleteHealthStatus(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await prisma.healthStatus.delete({ where: { id, userId: session.user.id } });

  revalidatePath("/dashboard/health-status");
}

export async function updateHealthStatus(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const weightRaw = formData.get("weight");
  const weight =
    typeof weightRaw === "string" && weightRaw ? Number(weightRaw) : null;

  const bloodPressureRaw = formData.get("bloodPressure");
  const bloodPressure =
    typeof bloodPressureRaw === "string" ? bloodPressureRaw || null : null;

  const bloodSugarRaw = formData.get("bloodSugar");
  const bloodSugar =
    typeof bloodSugarRaw === "string" && bloodSugarRaw
      ? Number(bloodSugarRaw)
      : null;

  const temperatureRaw = formData.get("temperature");
  const temperature =
    typeof temperatureRaw === "string" && temperatureRaw
      ? Number(temperatureRaw)
      : null;

  const notesRaw = formData.get("notes");
  const notes = typeof notesRaw === "string" ? notesRaw || null : null;

  const id = formData.get("id") as string;

  try {
    await prisma.healthStatus.update({
      data: {
        weight,
        bloodPressure,
        bloodSugar,
        temperature,
        notes,
      },
      where: { id, userId: session.user.id },
    });
    revalidatePath("/dashboard/health-status"); // to refresh the data, as nextjs might just show the cached version with the new entry not added in
  } catch (error) {
    console.error("Failed to update health status", error);
  }
  redirect("/dashboard/health-status");
}
