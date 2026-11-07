import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { editMedication } from "../../actions";

type EditMedicationPageProps = { params: Promise<{ id: string }> };

export default async function EditMedication({
  params,
}: EditMedicationPageProps) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const medication = await prisma.medication.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!medication) notFound();

  return (
    <>
      <h1 className="text-4xl font-bold font-display text-center">
        Edit medication
      </h1>
      <p className="text-center text-sm text-foreground/70">
        Update medication details
      </p>

      <form
        action={editMedication}
        className="flex flex-col mt-5 bg-card-bg text-foreground rounded-3xl p-5"
      >
        <input type="hidden" name="id" value={medication.id} />

        <label htmlFor="name" className="font-bold text-sm my-2">
          Name{" "}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={medication.name}
          placeholder="e.g. Doliprane"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="dosage" className="font-bold text-sm my-2">
          Dosage{" "}
        </label>
        <input
          type="text"
          id="dosage"
          name="dosage"
          required
          defaultValue={medication.dosage}
          placeholder="e.g. 10 mg"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="frequency" className="font-bold text-sm my-2">
          Frequency
        </label>
        <input
          type="text"
          id="frequency"
          name="frequency"
          required
          defaultValue={medication.frequency}
          placeholder="e.g. Once daily"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="startDate" className="font-bold text-sm my-2">
          Start date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          defaultValue={medication.startDate.toISOString().split("T")[0]}
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="endDate" className="font-bold text-sm my-2">
          End date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          defaultValue={
            medication.endDate
              ? medication.endDate.toISOString().split("T")[0]
              : ""
          }
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="notes" className="font-bold text-sm my-2">
          Notes{" "}
        </label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Instructions or reminders"
          defaultValue={medication.notes ?? ""}
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        ></textarea>

        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            defaultChecked={medication.isActive}
            className="h-5 w-5 accent-foreground"
          />
          <label htmlFor="isActive" className="font-bold text-sm my-2">
            Medication is active
          </label>
        </div>

        <button
          type="submit"
          className="bg-foreground text-background rounded-2xl font-bold p-4 mt-2 cursor-pointer"
        >
          Update medication →
        </button>
      </form>
    </>
  );
}
