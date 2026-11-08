import { notFound } from "next/navigation";
import { getMedication } from "../../../actions";
import { createMedLog } from "../actions";

type NewMedLogProps = { params: Promise<{ id: string }> };

export default async function NewMedLog({ params }: NewMedLogProps) {
  const { id } = await params;
  const med = await getMedication(id);

  if (!med) notFound();

  return (
    <div>
      <div className="uppercase font-bold text-sm tracking-widest text-foreground/70 mb-1">
        {med.name}
      </div>
      <h1 className="font-bold text-4xl font-display mb-1">New log</h1>
      <div className="text-sm">Add a check-in to your care record.</div>
      <form
        action={createMedLog.bind(null, id)}
        className="bg-card-bg p-5 rounded-2xl  mt-5"
      >
        <label htmlFor="takenAt" className="font-bold">
          Date and time{" "}
        </label>
        <input
          type="datetime-local"
          id="takenAt"
          name="takenAt"
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
          className="bg-surface border border-border shadow-sm rounded-2xl p-4 text-sm w-full h-35 mt-2"
          placeholder="Add a note if you'd like..."
        ></textarea>
        <button
          type="submit"
          className="w-full p-4 bg-accent text-surface cursor-pointer rounded-full mt-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
