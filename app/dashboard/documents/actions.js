"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDocument(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const fileUrl = formData.get("fileUrl");
  const category = formData.get("category");
  const notes = formData.get("notes") || null;

  if (!fileUrl || !category) throw new Error("File and category are required");

  await prisma.document.create({ data: { userId, fileUrl, category, notes } });

  revalidatePath("/dashboard/documents");
}
