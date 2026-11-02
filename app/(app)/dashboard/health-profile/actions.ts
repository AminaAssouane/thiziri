"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Severity } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AllergyFormEntry = {
  name: string;
  severity: Severity;
  reactionDescription?: string | null;
};

type ChronicIllnessFormEntry = {
  name: string;
  diagnosisDate?: string | null;
  notes?: string | null;
};

export async function saveHealthProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  const existing = await prisma.healthProfile.findUnique({ where: { userId } });

  const bloodType = (formData.get("bloodType") || null) as string | null;
  let rawChronicIllnesses: ChronicIllnessFormEntry[];
  try {
    rawChronicIllnesses = JSON.parse(
      formData.get("chronicIllnesses") as string,
    ) as ChronicIllnessFormEntry[];
  } catch {
    throw new Error("Invalid form data");
  }
  let rawAllergies: AllergyFormEntry[];
  try {
    rawAllergies = JSON.parse(formData.get("allergies") as string) as AllergyFormEntry[];
  } catch {
    throw new Error("Invalid form data");
  }

  const VALID: Severity[] = ["MILD", "MODERATE", "SEVERE"];
  if (rawAllergies.some((a) => !VALID.includes(a.severity))) {
    throw new Error("Invalid severity");
  }

  const allergies = rawAllergies.map((a) => ({
    name: a.name.trim(),
    severity: a.severity,
    reactionDescription: a.reactionDescription?.trim() || null,
  }));

  const chronicIllnesses = rawChronicIllnesses.map((c) => ({
    name: c.name.trim(),
    diagnosisDate: c.diagnosisDate ? new Date(c.diagnosisDate) : null,
    notes: c.notes?.trim() || null,
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
