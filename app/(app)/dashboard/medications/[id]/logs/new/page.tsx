import { createMedLog } from "../actions";

type NewMedLogProps = { params: Promise<{ id: string }> };

export default async function NewMedLog({ params }: NewMedLogProps) {
  const { id } = await params;

  return (
    <div>
      <h1>New medication log : </h1>
      <form action={createMedLog.bind(null, id)}>
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
