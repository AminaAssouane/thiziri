import Link from "next/link";
import { getMedications } from "./actions";
import { DeleteButton } from "./DeleteButton";

export default async function MedicationPage() {
  const medications = await getMedications();
  return (
    <div>
      <h1>Medications : </h1>
      <Link href="/dashboard/medication/new">+ New medication</Link>

      {medications.length === 0 ? (
        <div>No medications added yet.</div>
      ) : (
        <ul>
          {medications.map((medication) => (
            <li key={medication.id}>
              <p>Name : {medication.name}</p>
              <p>Dosage : {medication.dosage}</p>
              <p>Frequency : {medication.frequency}</p>
              <p>startDate : {medication.startDate.toLocaleDateString()}</p>
              <p>
                endDate :{" "}
                {medication.endDate
                  ? medication.endDate.toLocaleDateString()
                  : "No end date"}
              </p>
              <p>Notes : {medication.notes ?? "No notes"}</p>
              <DeleteButton id={medication.id} />
              <Link href={`/dashboard/medication/${medication.id}/edit`}>
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
