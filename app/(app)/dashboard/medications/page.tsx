import Link from "next/link";
import { getMedications } from "./actions";
import { DeleteButton } from "./DeleteButton";
import { Circle } from "lucide-react";

export default async function MedicationPage() {
  const medications = await getMedications();
  const activeMeds = medications.filter((med) => med.isActive).length;

  type medication = {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate: Date | null;
    notes: string | null;
    isActive: boolean;
  };

  const date = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function medicationCard(medication: medication, index: number) {
    const iconColor = index % 2 === 0 ? "bg-surface-muted" : "bg-lightblue";
    return (
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-sm">
        <div className="md:flex md:gap-4 md:items-center md:border-b md:border-gray-300 md:pb-4">
          <div className="flex gap-4 items-center">
            <div
              className={`flex items-center justify-center font-bold text-xl ${iconColor} rounded-xl h-10 w-10`}
            >
              ✚
            </div>
            <div>
              <p className="font-bold">{medication.name}</p>
              <p className="text-xs">
                {medication.dosage} · {medication.frequency}
              </p>
            </div>
          </div>
          {medication.isActive ? (
            <div className="bg-background text-moss font-bold p-2 text-xs rounded-2xl my-4 w-20 text-center">
              Active
            </div>
          ) : (
            <div className="bg-red-200 text-red-700 font-bold p-2 text-xs rounded-2xl my-4 w-20 text-center">
              Inactive
            </div>
          )}
        </div>
        <div className="text-xs text-foreground/60 md:pt-5">
          Started {date.format(medication.startDate)}
        </div>
        <div className="text-sm text-foreground/90 mt-1">
          {medication.notes ?? ""}
        </div>
        <Link
          href={`/dashboard/medications/${medication.id}/logs`}
          className="flex justify-center font-bold text-center text-xs bg-accent text-surface mt-3 p-2 rounded-full"
        >
          View logs
        </Link>{" "}
        <div className="font-bold flex justify-end gap-4 mt-3">
          <Link href={`/dashboard/medications/${medication.id}/edit`}>
            Edit
          </Link>
          <DeleteButton id={medication.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 -mt-6 -mb-24 pt-6 pb-24 md:-mt-28 md:-mb-10 md:pt-28 md:pb-10 bg-background">
      <div className="mx-auto max-w-md px-4 md:max-w-5xl md:px-10">
        <h1 className="text-4xl font-display font-bold mb-2">Medications</h1>
        <p className="text-sm text-foreground/70">
          Your current treatment plan
        </p>
        <Link
          href="/dashboard/medications/new"
          className="block bg-foreground text-background p-4 my-4 rounded-full text-center w-auto font-bold"
        >
          + Add medication
        </Link>

        {medications.length === 0 ? (
          <div>No medications added yet.</div>
        ) : (
          <>
            <div className="flex gap-2 bg-background p-4 rounded-2xl items-center mb-5">
              <Circle className="fill-current text-moss" />
              <p className="font-bold text-sm">
                {activeMeds} active medications
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {medications.map((medication, index) => (
                <li key={medication.id}>{medicationCard(medication, index)}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
