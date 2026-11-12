import { addMedication } from "../actions";

export default function NewMedicationPage() {
  return (
    <>
      <h1 className="text-4xl font-bold font-display text-center ">
        Add new medication
      </h1>
      <p className="text-sm text-center text-foreground/70">
        Add details from your care plan.
      </p>
      <form
        action={addMedication}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 mt-5 bg-card-bg text-foreground rounded-3xl p-5"
      >
        <div className="md:col-span-2">
          <label htmlFor="name" className="block font-bold text-sm my-2">
            Name{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g. Doliprane"
            className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="dosage" className="font-bold text-sm my-2 block">
            Dosage{" "}
          </label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            required
            placeholder="e.g. 10 mg"
            className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="frequency" className="font-bold text-sm my-2 block">
            Frequency
          </label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            required
            placeholder="e.g. Once daily"
            className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="font-bold text-sm my-2 block">
            Start date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            required
            className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3 w-full"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="font-bold text-sm my-2 block">
            End date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3 w-full"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="notes" className="font-bold text-sm my-2 block">
            Notes{" "}
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Instructions or reminders"
            className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3 w-full"
          ></textarea>
        </div>

        <div className="flex gap-4 items-center mb-4">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            defaultChecked
            className="h-5 w-5 accent-foreground"
          />
          <label htmlFor="isActive" className="font-bold text-sm">
            This medication is active
          </label>
        </div>

        <button
          type="submit"
          className="bg-foreground text-background rounded-2xl font-bold p-4 mt-2 cursor-pointer md:col-span-2"
        >
          Save medication →
        </button>
      </form>{" "}
    </>
  );
}
