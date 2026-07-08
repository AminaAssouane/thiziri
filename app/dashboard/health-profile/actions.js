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

  const bloodType = formData.get("bloodType");
  const allergies = JSON.parse(formData.get("allergies"));
  const chronicIllnesses = JSON.parse(formData.get("chronicIllnesses")).map(
    (c) => ({
      ...c,
      diagnosisDate: new Date(c.diagnosisDate),
    }),
  );

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
