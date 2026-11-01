import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updateHealthStatus } from "../../actions";

type EditHealthStatusPageProps = { params: Promise<{ id: string }> };

export default async function EditHealthStatusPage({
  params,
}: EditHealthStatusPageProps) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const currentStatus = await prisma.healthStatus.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!currentStatus) notFound();

  return (
    <form action={updateHealthStatus}>
      <h1>Update Health Status</h1>

      <input type="hidden" name="id" value={currentStatus.id} />

      <label>
        Weight (kg)
        <input
          type="number"
          step="0.1"
          name="weight"
          defaultValue={currentStatus.weight ?? ""}
        />
      </label>

      <label>
        Blood Pressure
        <input
          type="text"
          name="bloodPressure"
          defaultValue={currentStatus.bloodPressure ?? ""}
        />
      </label>

      <label>
        Blood Sugar
        <input
          type="number"
          step="0.1"
          name="bloodSugar"
          defaultValue={currentStatus.bloodSugar ?? ""}
        />
      </label>

      <label>
        Temperature (°C)
        <input
          type="number"
          step="0.1"
          name="temperature"
          defaultValue={currentStatus.temperature ?? ""}
        />
      </label>

      <label>
        Condition / Notes
        <textarea
          name="condition"
          defaultValue={currentStatus.condition ?? ""}
        ></textarea>
      </label>

      <button type="submit">Edit Entry</button>
    </form>
  );
}
