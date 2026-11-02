"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getEmergencyContacts() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const contacts = await prisma.emergencyContact.findMany({
    where: { userId: session.user.id },
  });

  return contacts;
}

export async function createEmergencyContact(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = (formData.get("email") || null) as string | null;
  const relationship = (formData.get("relationship") || null) as string | null;

  await prisma.emergencyContact.create({
    data: { userId, name, phone, email, relationship },
  });

  revalidatePath("/dashboard/emergency-contacts");
  redirect("/dashboard/emergency-contacts");
}

export async function deleteEmergencyContact(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.emergencyContact.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard/emergency-contacts");
}

export async function editEmergencyContact(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = (formData.get("email") || null) as string | null;
  const relationship = (formData.get("relationship") || null) as string | null;
  const id = formData.get("id") as string;

  await prisma.emergencyContact.update({
    where: { id, userId },
    data: { name, phone, email, relationship },
  });

  revalidatePath("/dashboard/emergency-contacts");
  redirect("/dashboard/emergency-contacts");
}
