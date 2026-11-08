import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const lastHealthStatus = await prisma.healthStatus.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  const activeMeds = await prisma.medication.findMany({
    where: { userId, isActive: true },
  });
  const nextAppointment = await prisma.appointment.findFirst({
    where: { userId, status: "UPCOMING", date: { gte: new Date() } },
    orderBy: { date: "asc" },
  });
  const firstEmergencyContact = await prisma.emergencyContact.findFirst({
    where: { userId },
    orderBy: { name: "asc" },
  });

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
        <Link
          href="/dashboard/health-status/new"
          className="inline-block bg-background text-forest rounded-full px-5 py-3 mt-5 font-bold cursor-pointer"
        >
          Log today's check-in →
        </Link>
      </section>

      <section className="rounded-3xl bg-surface p-5 text-foreground">
        <p className="font-medium mb-2 text-xs uppercase tracking-wider text-foreground/60">
          Your recent readings
        </p>
        <div className="flex justify-between items-center">
          <h2 className="font-display text-2xl">Latest health status</h2>{" "}
          <Link
            href="/dashboard/health-status"
            className="text-xs font-bold text-foreground/70"
          >
            History →
          </Link>{" "}
        </div>
        <p className="text-xs pt-1 pb-3 text-foreground/60">
          Last updated{" "}
          {lastHealthStatus
            ? new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(lastHealthStatus.createdAt)
            : ": never"}
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="bg-background rounded-3xl p-4">
            <p className="text-xs text-foreground/60">Weight</p>
            <p className="font-bold">
              {lastHealthStatus?.weight != null
                ? lastHealthStatus.weight + " kg"
                : "No log yet."}
            </p>
          </div>
          <div className="bg-background rounded-3xl p-4">
            <p className="text-xs text-foreground/60">Temperature</p>
            <p className="font-bold">
              {lastHealthStatus?.temperature != null
                ? lastHealthStatus.temperature + "°C"
                : "No log yet."}
            </p>
          </div>
          <div className="bg-background rounded-3xl p-4">
            <p className="text-xs text-foreground/60">Blood Pressure</p>
            <p className="font-bold">
              {lastHealthStatus?.bloodPressure != null
                ? lastHealthStatus.bloodPressure
                : "No log yet."}
            </p>
          </div>
          <div className="bg-background rounded-3xl p-4">
            <p className="text-xs text-foreground/60">Blood Sugar</p>
            <p className="font-bold">
              {lastHealthStatus?.bloodSugar != null
                ? lastHealthStatus?.bloodSugar
                : "No log yet."}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-surface-muted p-5 text-foreground">
        <p className="uppercase text-xs mb-2 font-medium tracking-wider text-foreground/60">
          Small moments add up
        </p>
        <h2 className="font-display text-2xl">Mood Garden</h2>
      </section>

      <section className="bg-surface rounded-3xl p-5 text-foreground">
        <p className="text-xs mb-2 tracking-wider uppercase text-foreground/60 font-medium">
          One step at a time
        </p>
        <div className="flex justify-between items-center py-2">
          <h2 className="font-display text-2xl">Medication</h2>
          <Link
            href="/dashboard/medications"
            className="text-xs font-bold text-accent/70"
          >
            All meds →
          </Link>
        </div>
        <ul>
          {activeMeds.length === 0 ? (
            <li className="border-t border-border py-2 text-sm text-foreground/60">
              No active medications.
            </li>
          ) : (
            activeMeds.map((m) => (
              <li key={m.id} className="border-t border-border py-2">
                <p className="font-bold text-sm pb-1">{m.name}</p>
                <p className="text-xs text-foreground/60">
                  {m.dosage} · {m.frequency}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="bg-accent rounded-3xl p-5 text-background">
        <p className="uppercase text-xs tracking-wider font-medium mb-2 text-background/60">
          Keep in your orbit
        </p>
        <h2 className="font-display text-2xl">Next appointment</h2>
        {nextAppointment ? (
          <div className="flex gap-4 items-center">
            <div className="bg-background text-foreground rounded-2xl p-4 mt-2 text-center font-bold">
              <p className="text-xs">
                {nextAppointment.date
                  .toLocaleDateString("en-US", {
                    month: "short",
                  })
                  .toUpperCase()}
              </p>
              <p>{nextAppointment.date.getDate()}</p>
            </div>

            <div className="flex flex-col">
              <p className="font-bold">{nextAppointment.specialty}</p>
              <p className="text-background/90 text-xs mt-1">
                {nextAppointment.date.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                · {nextAppointment.doctorName}
              </p>
              <p className="text-xs mt-1 text-background/70">
                {nextAppointment.location}
              </p>
            </div>

            <Link
              href="/dashboard/appointments"
              className="text-background text-xs font-bold ml-auto"
            >
              All appointments →
            </Link>
          </div>
        ) : (
          <div className="flex">
            <p className="text-sm text-background/60">
              No upcoming appointment.
            </p>
            <Link
              href="/dashboard/appointments"
              className="text-background text-xs font-bold ml-auto"
            >
              All appointments →
            </Link>
          </div>
        )}
      </section>

      <section className="flex items-center gap-4 rounded-3xl bg-surface text-foreground p-5">
        <div className="grid place-items-center h-12 w-12 font-extrabold text-red-600 bg-red-200 rounded-full">
          {" "}
          <Heart className=" fill-red-600" />
        </div>

        <div>
          <p className="uppercase text-xs text-foreground/60 tracking-wider font-medium mb-2">
            When you need a hand
          </p>

          <h2 className="font-display text-2xl">Emergency contacts</h2>
          <p className="text-sm text-foreground/60">
            {firstEmergencyContact?.name ??
              "No main emergency contact recorded."}
          </p>
        </div>
      </section>

      <LogoutButton />
    </div>
  );
}
