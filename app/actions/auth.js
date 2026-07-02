"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser({ email, password, firstName, lastName }) {
  if (!email || !password || !firstName || !lastName) {
    return { error: "All fields are required" };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
    },
  });

  return { success: true };
}
