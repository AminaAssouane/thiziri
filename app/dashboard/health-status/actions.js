"use server";
import { auth } from "@/auth";

export async function createHealthStatus() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
}
