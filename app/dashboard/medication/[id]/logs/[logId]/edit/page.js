import { getMedLog, editMedicationLog } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditMedLogPage({ params }) {
  const { logId } = await params;
  const log = await getMedLog(logId);

  if (!log) notFound();

  return (
    <div>
      <form action={(formData) => editMedicationLog(logId, formData)}>
        <label>
          Taken at :{" "}
          <input
            defaultValue={
              log.takenAt ? log.takenAt.toISOString().slice(0, 16) : ""
            }
            name="takenAt"
            type="datetime-local"
          />
        </label>

        <label>
          Skipped :{" "}
          <input defaultChecked={log.skipped} type="checkbox" name="skipped" />
        </label>

        <label>
          Notes :{" "}
          <textarea defaultValue={log.notes ?? ""} name="notes"></textarea>
        </label>

        <button type="submit">Edit log</button>
      </form>
    </div>
  );
}
