"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveMood(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const mood = formData.get("mood");
  const note = formData.get("note");

  await prisma.moodEntry.upsert({
    where: { userId_date: { userId, date: todayDate } },
    update: { mood, note },
    create: { userId, mood, date: todayDate, note },
  });

  revalidatePath("/dashboard/mood");
  redirect("/dashboard/mood");
}
