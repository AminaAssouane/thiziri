import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getAppointments() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "asc" },
  });

  return appointments;
}
