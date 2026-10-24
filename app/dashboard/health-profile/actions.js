"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveHealthProfile(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  const existing = await prisma.healthProfile.findUnique({ where: { userId } });

  const bloodType = formData.get("bloodType") || null;
  const chronicIllnesses = JSON.parse(formData.get("chronicIllnesses"));
  let rawAllergies;
  try {
    rawAllergies = JSON.parse(formData.get("allergies"));
  } catch {
    throw new Error("Invalid form data");
  }

  const VALID = ["MILD", "MODERATE", "SEVERE"];
  if (rawAllergies.some((a) => !VALID.includes(a.severity))) {
    throw new Error("Invalid severity");
  }

  const allergies = rawAllergies.map((a) => ({
    name: a.name.trim(),
    severity: a.severity,
    reactionDescription: a.reactionDescription?.trim() || null,
  }));

  if (existing) {
    await prisma.healthProfile.update({
      where: { userId },
      data: {
        bloodType,
        allergies: { deleteMany: {}, create: allergies },
        chronicIllnesses: { deleteMany: {}, create: chronicIllnesses },
      },
    });
  } else {
    await prisma.healthProfile.create({
      data: {
        userId,
        bloodType,
        allergies: { create: allergies },
        chronicIllnesses: { create: chronicIllnesses },
      },
    });
  }
  revalidatePath("/dashboard/health-profile");
  redirect("/dashboard/health-profile");
}
