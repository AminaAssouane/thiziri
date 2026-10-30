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
      <h1 className="text-3xl font-semibold text-stone-800 md:text-5xl">
        Welcome, {user.firstName}
      </h1>

      <div className="mt-8 md:mt-14 md:grid md:grid-cols-3 md:gap-16">
        <section className="md:col-span-2">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Today's medications
          </h2>
          {medications.length === 0 ? (
            <p className="text-stone-500">No active medications.</p>
          ) : (
            <ul className="divide-y divide-stone-200">
              {medications.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/dashboard/medications/${m.id}/logs`}
                    className="block py-4 text-lg"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10 border-t border-stone-200 pt-8 md:mt-0 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-stone-500">
            Next appointment
          </h2>
          {nextAppointment ? (
            <p className="text-lg">{nextAppointment.specialty}</p>
          ) : (
            <p className="text-stone-500">Nothing scheduled.</p>
          )}
        </section>
      </div>
    </div>
  );
}
