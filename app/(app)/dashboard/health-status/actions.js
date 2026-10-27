"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHealthStatus(formData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const weightRaw = formData.get("weight");
  const weight = weightRaw ? Number(weightRaw) : null;

  const bloodPressure = formData.get("bloodPressure") || null;

  const bloodSugarRaw = formData.get("bloodSugar");
  const bloodSugar = bloodSugarRaw ? Number(bloodSugarRaw) : null;

  const temperatureRaw = formData.get("temperature");
  const temperature = temperatureRaw ? Number(temperatureRaw) : null;

  const condition = formData.get("condition") || null;

  try {
    await prisma.healthStatus.create({
      data: {
        userId: session.user.id,
        weight,
        bloodPressure,
        bloodSugar,
        temperature,
        condition,
      },
    });
    revalidatePath("/dashboard/health-status"); // to refresh the data, as nextjs might just show the cached version with the new entry not added in
  } catch (error) {
    console.error("Failed to add health status", error);
  }
  redirect("/dashboard/health-status");
}

export async function deleteHealthStatus(id) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await prisma.healthStatus.delete({ where: { id, userId: session.user.id } });

  revalidatePath("/dashboard/health-status");
}

export async function updateHealthStatus(formData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const weightRaw = formData.get("weight");
  const weight = weightRaw ? Number(weightRaw) : null;

  const bloodPressure = formData.get("bloodPressure") || null;

  const bloodSugarRaw = formData.get("bloodSugar");
  const bloodSugar = bloodSugarRaw ? Number(bloodSugarRaw) : null;

  const temperatureRaw = formData.get("temperature");
  const temperature = temperatureRaw ? Number(temperatureRaw) : null;

  const condition = formData.get("condition") || null;

  try {
    await prisma.healthStatus.update({
      data: {
        weight,
        bloodPressure,
        bloodSugar,
        temperature,
        condition,
      },
      where: { id: formData.get("id"), userId: session.user.id },
    });
    revalidatePath("/dashboard/health-status"); // to refresh the data, as nextjs might just show the cached version with the new entry not added in
  } catch (error) {
    console.error("Failed to update health status", error);
  }
  redirect("/dashboard/health-status");
}
