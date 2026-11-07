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
        className="flex flex-col mt-5 bg-card-bg text-foreground rounded-3xl p-5"
      >
        <label htmlFor="name" className="font-bold text-sm my-2">
          Name{" "}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="e.g. Doliprane"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="dosage" className="font-bold text-sm my-2">
          Dosage{" "}
        </label>
        <input
          type="text"
          id="dosage"
          name="dosage"
          required
          placeholder="e.g. 10 mg"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="frequency" className="font-bold text-sm my-2">
          Frequency
        </label>
        <input
          type="text"
          id="frequency"
          name="frequency"
          required
          placeholder="e.g. Once daily"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="startDate" className="font-bold text-sm my-2">
          Start date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          required
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="endDate" className="font-bold text-sm my-2">
          End date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        />

        <label htmlFor="notes" className="font-bold text-sm my-2">
          Notes{" "}
        </label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Instructions or reminders"
          className="bg-surface border border-border text-sm rounded-2xl mb-4 p-3"
        ></textarea>

        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            defaultChecked
            className="h-5 w-5 accent-foreground"
          />
          <label htmlFor="isActive" className="font-bold text-sm my-2">
            Medication is active
          </label>
        </div>

        <button
          type="submit"
          className="bg-foreground text-background rounded-2xl font-bold p-4 mt-2"
        >
          Save medication →
        </button>
      </form>{" "}
    </>
  );
}
