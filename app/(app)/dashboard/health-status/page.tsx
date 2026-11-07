import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { redirect } from "next/navigation";

export default async function HealthStatusPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const entries = await prisma.healthStatus.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  type entry = {
    id: string;
    weight: number | null;
    bloodPressure: string | null;
    bloodSugar: number | null;
    temperature: number | null;
    notes: string | null;
    createdAt: Date;
  };

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function HealthStatusCardEntry(entry: entry) {
    return (
      <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
        <p className="uppercase tracking-widest text-xs font-bold">Check-in</p>
        <p className="font-bold text-2xl font-display my-2">
          {date.format(entry.createdAt)}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background rounded-2xl p-4">
            <p className="text-xs">Weight</p>{" "}
            <p className="font-bold text-xl">{entry.weight} kg</p>
          </div>
          <div className="bg-background rounded-2xl p-4">
            <p className="text-xs">Blood Pressure</p>{" "}
            <p className="font-bold text-xl">{entry.bloodPressure}</p>
          </div>
          <div className="bg-background rounded-2xl p-4">
            <p className="text-xs">Blood Sugar</p>{" "}
            <p className="font-bold text-xl">{entry.bloodSugar}</p>
          </div>
          <div className="bg-background rounded-2xl p-4">
            <p className="text-xs">Temperature</p>{" "}
            <p className="font-bold text-xl">{entry.temperature}</p>
          </div>
        </div>
        <div className="bg-surface-muted  mt-3 mb-5 p-4 rounded-2xl">
          <p className="tracking-widest uppercase font-bold text-xs">Notes</p>{" "}
          <p className="text-sm mt-1">{entry.notes ?? "No notes"}</p>
        </div>
        <div className="flex justify-end gap-3 mt-3 font-bold border-t border-border pt-4">
          <Link href={`/dashboard/health-status/${entry.id}/edit`}>Edit</Link>
          <DeleteButton id={entry.id} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="tracking-widest uppercase text-xs font-bold text-foreground/70 mb-2">
        Your personal record
      </p>
      <h1 className="text-4xl font-display font-bold mb-2">Health history</h1>
      <p className="text-sm text-foreground/90">
        A timeline of your check-ins.
      </p>
      <Link
        href="/dashboard/health-status/new"
        className="block text-center bg-foreground text-background rounded-full p-4 my-4 font-bold"
      >
        + New check-in
      </Link>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-display font-bold">Past check-ins</h2>
        <p className="text-xs font-bold">{entries.length} entries</p>
      </div>

      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {entries.map((entry: entry) => (
            <li key={entry.id}>{HealthStatusCardEntry(entry)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
