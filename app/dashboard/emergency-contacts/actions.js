"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getEmergencyContacts() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const contacts = await prisma.emergencyContact.findMany({
    where: { userId: session.user.id },
  });

  return contacts;
}
