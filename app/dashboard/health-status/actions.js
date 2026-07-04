"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHealthStatus(formData) {
  const session = await auth();
  console.log("SESSION:", session);

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
    revalidatePath("/dashboard/health-status");
  } catch (error) {
    console.error("Failed to add health status", error);
  }
  redirect("/dashboard/health-status");
}
