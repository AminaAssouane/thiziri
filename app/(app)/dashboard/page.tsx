import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [user, medications, nextAppointment] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.medication.findMany({ where: { userId, isActive: true } }),
    prisma.appointment.findFirst({
      where: { userId, status: "UPCOMING" },
      orderBy: { date: "asc" },
    }),
  ]);

  if (!user) redirect("/login");
  return (
    <div className="space-y-4">
      <section className="rounded-3xl bg-forest p-5 text-lightgreen">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-lightgreen/70">
          A small moment for you
        </p>
        <h1 className="font-display text-3xl">
          A little care, {user.firstName}
        </h1>
        <p className="mt-2 text-sm text-lightgreen/80">
          For the days that feel darker, let this be a small light.
        </p>
      </section>

      <section className="rounded-3xl bg-surface p-5 text-foreground">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/60">
          Your recent readings
        </p>
        <h2 className="font-display text-2xl">Latest health status</h2>
      </section>

      <LogoutButton />
    </div>
  );
}
