import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session.user.id;

  const [user, medications, nextAppointment] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.medication.findMany({ where: { userId, isActive: true } }),
    prisma.appointment.findFirst({
      where: { userId, status: "UPCOMING" },
      orderBy: { date: "asc" },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-800 mb-6">
        Hello, {user.firstName}
      </h1>

      <section className="rounded-2xl bg-white p-4 shadow-sm mb-6">
        <h2 className="mb-2 font-medium">Today's medications</h2>
        {medications.length === 0 ? (
          <p className="text-sm text-stone-500">No active medications.</p>
        ) : (
          <ul className="space-y-1">
            {medications.map((m) => (
              <li key={m.id}>
                <Link href={`/dashboard/medications/${m.id}/logs`}>
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-sm mb-6">
        <h2 className="mb-2 font-medium">Next appointment</h2>
        {nextAppointment ? (
          <p>{nextAppointment.specialty}</p> // adjust to your fields
        ) : (
          <p className="text-sm text-stone-500">Nothing scheduled.</p>
        )}
      </section>
    </div>
  );
}
