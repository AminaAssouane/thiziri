import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";

export default async function HealthStatusPage() {
  const session = await auth();

  const entries = await prisma.healthStatus.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Health Status Log</h1>
      <Link href="/dashboard/health-status/new">+ New Entry</Link>

      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <p>Weight: {entry.weight}</p>
              <p>Blood Pressure: {entry.bloodPressure}</p>
              <p>Blood Sugar: {entry.bloodSugar}</p>
              <p>Temperature: {entry.temperature}</p>
              <p>Condition: {entry.condition}</p>
              <p>Date: {entry.createdAt.toLocaleDateString()}</p>
              <DeleteButton id={entry.id} />
              <Link href={`/dashboard/health-status/${entry.id}/edit`}>
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
