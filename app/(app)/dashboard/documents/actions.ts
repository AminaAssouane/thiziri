"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const fileUrl = formData.get("fileUrl");
  const category = formData.get("category");
  const notes = formData.get("notes");

  if (
    typeof fileUrl !== "string" ||
    typeof category !== "string" ||
    !fileUrl.trim() ||
    !category.trim()
  ) {
    throw new Error("File and category are required");
  }

  await prisma.document.create({
    data: {
      userId: session.user.id,
      fileUrl,
      category: category.trim(),
      notes: typeof notes === "string" && notes.trim() ? notes.trim() : null,
    },
  });

  revalidatePath("/dashboard/documents");
}

export async function deleteDocument(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.document.delete({
    where: { userId: session.user.id, id },
  });

  revalidatePath("/dashboard/documents");
}
