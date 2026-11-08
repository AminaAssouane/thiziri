import { addAppointment } from "../actions";

export default async function NewAppointmentPage() {
  return (
    <form action={addAppointment}>
      <div className="uppercase tracking-wider font-bold text-xs">
        Your care, in one place
      </div>
      <h1 className="text-4xl font-bold font-display my-1">New appointment</h1>
      <div className="text-xs text-foreground/70">
        Add the details so it's easy to find later.
      </div>
      <div className="flex items-center bg-accent rounded-3xl p-5 gap-3 my-5">
        <div className="flex items-center justify-center bg-background text-foreground rounded-full w-10 h-10 text-3xl font-bold">
          +
        </div>
        <div className="text-surface text-xs">
          <p className="font-bold mb-2">A little preparation</p>
          <p className="text-surface/70">
            You can add notes or update this visit later.
          </p>
        </div>
      </div>
      <div className="font-bold text-2xl my-3 font-display">Visit details</div>
      <label htmlFor="doctorName" className="font-bold text-sm">
        Doctor name{" "}
      </label>
      <input
        type="text"
        id="doctorName"
        name="doctorName"
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="specialty" className="font-bold text-sm">
        Specialty{" "}
      </label>
      <input
        type="text"
        name="specialty"
        id="specialty"
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="date" className="font-bold text-sm">
        Date{" "}
      </label>
      <input
        type="date"
        id="date"
        name="date"
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="time" className="font-bold text-sm">
        Time{" "}
      </label>
      <input
        type="time"
        id="time"
        name="time"
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="location" className="font-bold text-sm">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="reason" className="font-bold text-sm">
        Reason{" "}
      </label>
      <input
        type="text"
        id="reason"
        name="reason"
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />

      <label htmlFor="notes" className="font-bold text-sm">
        Notes
      </label>
      <textarea
        id="notes"
        name="notes"
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      ></textarea>

      <label htmlFor="status" className="font-bold text-sm">
        Status :{" "}
      </label>
      <select
        id="status"
        name="status"
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      >
        <option value="UPCOMING">Upcoming</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <button
        type="submit"
        className="text-center bg-accent text-surface font-bold w-full p-4 rounded-4xl mt-3 cursor-pointer"
      >
        Save appointment
      </button>
    </form>
  );
}
