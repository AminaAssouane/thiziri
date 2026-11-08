import { getMedLog, editMedicationLog } from "../../actions";
import { getMedication } from "../../../../actions";
import { notFound } from "next/navigation";

type EditMedicationLogPageProps = {
  params: Promise<{ id: string; logId: string }>;
};

export default async function EditMedLogPage({
  params,
}: EditMedicationLogPageProps) {
  const { id, logId } = await params;
  const log = await getMedLog(logId);
  const med = await getMedication(id);

  if (!log || !med || log.medicationId !== id) notFound();

  return (
    <div>
      <div className="uppercase font-bold text-sm tracking-widest text-foreground/70 mb-1">
        {med.name}
      </div>
      <h1 className="font-bold text-4xl font-display mb-1">Edit log</h1>
      <div className="text-sm">Update this check-in in your care record.</div>
      <form
        action={editMedicationLog.bind(null, logId)}
        className="bg-card-bg p-5 rounded-2xl  mt-5"
      >
        <label htmlFor="takenAt" className="font-bold">
          Date and time{" "}
        </label>
        <input
          type="datetime-local"
          id="takenAt"
          name="takenAt"
          defaultValue={log.takenAt.toISOString().slice(0, 16)}
          required
          className="bg-surface border border-border p-3 rounded-2xl w-full mt-2 mb-8"
        />
        <fieldset>
          <legend className="font-bold">What happened?</legend>
          <div className="flex gap-4 mt-3 w-full">
            <label className="flex-1 bg-surface p-5 rounded-2xl border border-border">
              <input
                type="radio"
                name="status"
                value="taken"
                defaultChecked={!log.skipped}
                className="accent-moss mr-2"
                required
              />
              Taken
            </label>
            <label className="flex-1 bg-surface p-5 rounded-2xl border border-border">
              <input
                type="radio"
                name="status"
                value="skipped"
                defaultChecked={log.skipped}
                className="accent-moss mr-2"
              />
              Skipped
            </label>
          </div>
        </fieldset>
        <label htmlFor="notes" className="block font-bold mt-8">
          Notes{" "}
        </label>{" "}
        <textarea
          id="notes"
          name="notes"
          defaultValue={log.notes ?? ""}
          className="bg-surface border border-border shadow-sm rounded-2xl p-4 text-sm w-full h-35 mt-2"
          placeholder="Add a note if you'd like..."
        ></textarea>
        <button
          type="submit"
          className="w-full p-4 bg-accent text-surface cursor-pointer rounded-full mt-5"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
