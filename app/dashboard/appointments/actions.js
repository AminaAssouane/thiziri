import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

export async function addAppointment(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const doctorName = formData.get("doctorName");
  const specialty = formData.get("specialty");
  const date = new Date(formData.get("date"));
  const location = formData.get("location");
  const reason = formData.get("reason");
  const notes = formData.get("notes") || null;
  const status = formData.get("status");

  await prisma.appointment.create({
    data: {
      userId,
      doctorName,
      specialty,
      date,
      location,
      reason,
      notes,
      status,
    },
  });

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}

export async function removeAppointment(id) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.appointment.delete({ where: { id, userId: session.user.id } });

  revalidatePath("/dashboard/appointments");
}
