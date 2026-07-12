import { addMedication } from "../actions";

export default function NewMedicationPage() {
  return (
    <form action={addMedication}>
      <h1>Add new medication</h1>
      <label>
        Name: <input type="text" name="name" required />
      </label>

      <label>
        Dosage: <input type="text" name="dosage" required />
      </label>

      <label>
        Frequency: <input type="text" name="frequency" required />
      </label>

      <label>
        Start date: <input type="date" name="startDate" required />
      </label>

      <label>
        End date: <input type="date" name="endDate" />
      </label>

      <label>
        Notes: <textarea name="notes"></textarea>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
