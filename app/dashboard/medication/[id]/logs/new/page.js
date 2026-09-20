import { createMedLog } from "../actions";

export default async function NewMedLog({ params }) {
  const { id } = await params;

  return (
    <div>
      <h1>New medication log : </h1>
      <form action={(formData) => createMedLog(id, formData)}>
        <label>
          Medication taken at : <input type="datetime-local" name="takenAt" />
        </label>
        <label>
          Did you skip it ? : <input type="checkbox" name="skipped" />
        </label>
        <label>
          Notes : <textarea name="notes"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
