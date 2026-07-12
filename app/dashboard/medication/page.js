import { getMedications } from "./actions";

export default async function MedicationPage() {
  const medications = await getMedications();
  return (
    <div>
      <h1>Medications : </h1>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
