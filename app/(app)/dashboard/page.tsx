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
      <section className="rounded-3xl bg-forest p-5 text-background">
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

      <section className="rounded-3xl bg-surface-muted p-5 text-foreground">
        <p className="uppercase text-xs mb-2 font-medium tracking-wider text-foreground/60">
          Small moments add up
        </p>
        <h2 className="font-display text-2xl">Mood garden</h2>
      </section>

      <section className="bg-surface rounded-3xl p-5 text-foreground">
        <p className="text-xs mb-2 tracking-wider uppercase text-foreground/60 font-medium">
          One step at a time
        </p>
        <h2 className="font-display text-2xl">Medication</h2>
      </section>

      <section className="bg-accent rounded-3xl p-5 text-background">
        <p className="uppercase text-xs tracking-wider font-medium mb-2 text-background/60">
          Keep in your orbit
        </p>
        <h2 className="font-display text-2xl">Next appointment</h2>
      </section>

      <section className="rounded-3xl bg-surface text-foreground p-5">
        <p className="uppercase text-xs text-foreground/60 tracking-wider font-medium mb-2">
          When you need a hand
        </p>
        <h2 className="font-display text-2xl">Emergency contacts</h2>
      </section>

      <LogoutButton />
    </div>
  );
}
