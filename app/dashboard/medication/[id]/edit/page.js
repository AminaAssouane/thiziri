import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { editMedication } from "../../actions";

export default async function EditMedication({ params }) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const medication = await prisma.medication.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!medication) notFound();

  return (
    <form action={editMedication}>
      <h1>Edit medication : </h1>

      <input type="hidden" name="id" value={medication.id} />

      <label>
        Name :{" "}
        <input
          name="name"
          type="text"
          defaultValue={medication.name}
          required
        />
      </label>

      <label>
        Dosage :{" "}
        <input
          name="dosage"
          type="text"
          defaultValue={medication.dosage}
          required
        />
      </label>

      <label>
        Frequency :{" "}
        <input
          name="frequency"
          type="text"
          defaultValue={medication.frequency}
          required
        />
      </label>

      <label>
        Start date :{" "}
        <input
          name="startDate"
          type="date"
          defaultValue={medication.startDate.toISOString().split("T")[0]}
          required
        />
      </label>

      <label>
        End date :{" "}
        <input
          name="endDate"
          type="date"
          defaultValue={
            medication.endDate
              ? medication.endDate.toISOString().split("T")[0]
              : ""
          }
        />
      </label>

      <label>
        Notes :{" "}
        <textarea name="notes" defaultValue={medication.notes ?? ""}></textarea>
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
