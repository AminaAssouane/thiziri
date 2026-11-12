import { createHealthStatus } from "../actions";
import { Plus } from "lucide-react";

const todayDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}).format();

export default function NewHealthStatusPage() {
  return (
    <div>
      <h1 className="text-foreground text-4xl font-display font-bold mb-3 text-center">
        A little check-in
      </h1>
      <section className="bg-card-bg text-foreground rounded-3xl p-5">
        <div className="flex items-center gap-4 border-b border-border pb-5">
          <div className="text-3xl text-foreground bg-background rounded-full w-10 h-10 flex items-center justify-center">
            <Plus />
          </div>
          <div>
            <h2 className="font-bold text-[1.2rem] mb-1">Today's health</h2>
            <p className="text-xs text-foreground/60">{todayDate}</p>
          </div>
        </div>

        <form
          action={createHealthStatus}
          className="grid grid-cols-1 mt-5 md:grid-cols-2 md:gap-x-10"
        >
          <div>
            <label htmlFor="weight" className="block font-bold text-sm my-2">
              Weight (kg){" "}
            </label>
            <input
              type="number"
              step="0.1"
              id="weight"
              name="weight"
              className="block bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
              placeholder="e.g. 68.5 kg"
            />
          </div>
          <div>
            <label htmlFor="bloodP" className="block font-bold text-sm my-2">
              Blood Pressure{" "}
            </label>
            <input
              type="text"
              id="bloodP"
              name="bloodPressure"
              placeholder="e.g. 120/80"
              className="block bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
            />
          </div>

          <div>
            <label htmlFor="bloodS" className="block font-bold text-sm my-2">
              Blood Sugar
            </label>
            <input
              type="number"
              id="bloodS"
              step="0.1"
              name="bloodSugar"
              placeholder="Add today's reading"
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm block w-full"
            />
          </div>

          <div>
            <label htmlFor="temp" className="block font-bold text-sm my-2">
              Temperature (°C){" "}
            </label>
            <input
              type="number"
              id="temp"
              step="0.1"
              name="temperature"
              placeholder="e.g. 36.8 °C"
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm block w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block font-bold text-sm my-2">
              Notes{" "}
              <span className="text-foreground/60 font-medium">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Anything to remember about today?"
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm block w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-foreground text-background rounded-2xl font-bold p-4 cursor-pointer w-full md:col-span-2"
          >
            Save today's check-in →
          </button>
        </form>
      </section>
    </div>
  );
}
