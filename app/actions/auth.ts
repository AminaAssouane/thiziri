"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signOut, signIn } from "@/auth";

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

export async function registerUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{ error: string } | { success: true }> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password || !firstName.trim() || !lastName.trim()) {
    return { error: "All fields are required" };
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: { equals: normalizedEmail, mode: "insensitive" } },
  });
  if (existingUser) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    },
  });

  return { success: true };
}

export async function loginAsGuest() {
  try {
    await signIn("credentials", {
      email: "guest@user.com",
      password: "guest",
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if ((error as Error).message?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: "Failed to sign in as guest" };
  }
}
