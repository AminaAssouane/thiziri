"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Mood } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveMood(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;

  const dateValue = formData.get("date");

  if (typeof dateValue !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    throw new Error("Invalid mood date");
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  const moodDate = new Date(year, month - 1, day);

  if (
    moodDate.getFullYear() !== year ||
    moodDate.getMonth() !== month - 1 ||
    moodDate.getDate() !== day
  ) {
    throw new Error("Invalid mood date");
  }

  moodDate.setHours(0, 0, 0, 0);

  const mood = formData.get("mood") as Mood;
  const note = formData.get("note") as string | null;

  await prisma.moodEntry.upsert({
    where: { userId_date: { userId, date: moodDate } },
    update: { mood, note },
    create: { userId, mood, date: moodDate, note },
  });

  revalidatePath("/dashboard/mood");
  redirect(`/dashboard/mood?date=${dateValue}`);
}
