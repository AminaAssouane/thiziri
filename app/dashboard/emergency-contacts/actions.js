"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEmergencyContacts() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const contacts = await prisma.emergencyContact.findMany({
    where: { userId: session.user.id },
  });

  return contacts;
}

export async function createEmergencyContact(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email") || null;
  const relationship = formData.get("relationship") || null;

  await prisma.emergencyContact.create({
    data: { userId, name, phone, email, relationship },
  });

  revalidatePath("/dashboard/emergency-contacts");
  redirect("/dashboard/emergency-contacts");
}
