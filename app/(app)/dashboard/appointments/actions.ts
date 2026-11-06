"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Status } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAppointments() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "asc" },
  });

  return appointments;
}

export async function addAppointment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const doctorName = formData.get("doctorName") as string;
  const specialty = formData.get("specialty") as string;

  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const appointmentDate = new Date(`${date}T${time}`);

  const location = formData.get("location") as string;
  const reason = formData.get("reason") as string;
  const notes = (formData.get("notes") || null) as string | null;
  const status = formData.get("status") as Status;

  await prisma.appointment.create({
    data: {
      userId,
      doctorName,
      specialty,
      date: appointmentDate,
      location,
      reason,
      notes,
      status,
    },
  });

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}

export async function removeAppointment(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.appointment.delete({ where: { id, userId: session.user.id } });

  revalidatePath("/dashboard/appointments");
}

export async function editAppointment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const doctorName = formData.get("doctorName") as string;
  const specialty = formData.get("specialty") as string;

  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const appointmentDate = new Date(`${date}T${time}`);

  const location = formData.get("location") as string;
  const reason = formData.get("reason") as string;
  const notes = (formData.get("notes") || null) as string | null;
  const status = formData.get("status") as Status;
  const id = formData.get("id") as string;

  await prisma.appointment.update({
    where: { id, userId },
    data: {
      doctorName,
      specialty,
      date: appointmentDate,
      location,
      reason,
      notes,
      status,
    },
  });

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}
