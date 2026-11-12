"use client";
import type { MoodEntry } from "@/generated/prisma/client";
import { saveMood } from "./actions";
import { useRouter } from "next/navigation";

type MoodViewProps = {
  mood: MoodEntry | null;
  moods: MoodEntry[];
  selectedDate: Date;
};

function isSameDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatDateParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function MoodView({ mood, moods, selectedDate }: MoodViewProps) {
  const router = useRouter();

  function goToDate(date: Date) {
    router.push(`/dashboard/mood?date=${formatDateParam(date)}`, {
      scroll: false,
    });
  }

  function moveWeek(amount: number) {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + amount * 7);
    goToDate(nextDate);
  }

  const monday = new Date(selectedDate);
  const daysSinceMonday = (monday.getDay() + 6) % 7;

  monday.setDate(monday.getDate() - daysSinceMonday);

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });

  const weekStrip = (
    <section className="relative left-1/2 -ml-[50vw] -mt-6 w-screen bg-lagoon text-white p-6">
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => moveWeek(-1)}
            className="cursor-pointer text-3xl font-bold"
          >
            ‹
          </button>

          <p className="text-xl font-bold">
            {monday.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <button
            type="button"
            onClick={() => moveWeek(1)}
            className="cursor-pointer text-3xl font-bold"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDates.map((date) => {
            const moodForDay = moods.find((entry) =>
              isSameDay(entry.date, date),
            );

            const isSelected = isSameDay(date, selectedDate);

            const moodColor =
              moodForDay?.mood === "BAD"
                ? "bg-red-600"
                : moodForDay?.mood === "AVERAGE"
                  ? "bg-yellow-500"
                  : moodForDay?.mood === "GOOD"
                    ? "bg-green-700"
                    : null;

            return (
              <button
                key={date.toISOString()}
                className={`cursor-pointer flex flex-col items-center justify-center rounded-2xl p-2 text-center text-white ${
                  isSelected
                    ? "bg-background/20 border border-background"
                    : "bg-transparent"
                }`}
                onClick={() => goToDate(date)}
              >
                <p className="text-xs mb-1">
                  {date.toLocaleDateString("en", { weekday: "short" })}
                </p>

                <p
                  className={`flex items-center justify-center font-semibold rounded-full h-7 w-7 md:h-10 md:w-10 ${moodColor ?? "bg-transparent"}`}
                >
                  {date.getDate()}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );

  return (
    <div className="">
      {weekStrip}
      <div className="font-bold text-xl md:text-2xl mt-8 mb-4">
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <form
        key={formatDateParam(selectedDate)}
        action={saveMood}
        className="flex flex-col bg-card-bg rounded-3xl p-5"
      >
        <p className="text-2xl font-bold mt-3">How are you feeling?</p>
        <p className="text-foreground/60 text-sm">Choose a mood for this day</p>
        <input
          type="hidden"
          name="date"
          value={formatDateParam(selectedDate)}
        />

        <fieldset className="grid grid-cols-3 gap-4 mt-5">
          <label className="text-xl flex flex-col gap-2 justify-center items-center flex-1 p-5 rounded-2xl border border-border cursor-pointer has-[:checked]:border-red-800 has-[:checked]:text-red-800 has-[:checked]:border-2 has-[:checked]:font-bold">
            <input
              type="radio"
              name="mood"
              value="BAD"
              className="size-5 accent-red-600"
              required
              defaultChecked={mood?.mood === "BAD"}
            />
            <p>Bad</p>
          </label>

          <label className="text-xl flex flex-col gap-2 justify-center items-center flex-1 p-5 rounded-2xl border border-border cursor-pointer has-[:checked]:border-[#D5AD26] has-[:checked]:text-[#D5AD26] has-[:checked]:border-2 has-[:checked]:font-bold">
            <input
              type="radio"
              name="mood"
              value="AVERAGE"
              className="size-5 accent-[#D5AD26]"
              required
              defaultChecked={mood?.mood === "AVERAGE"}
            />
            Average
          </label>

          <label className="text-xl flex flex-col gap-2 justify-center items-center flex-1 p-5 rounded-2xl border border-border cursor-pointer has-[:checked]:border-green-700 has-[:checked]:text-green-700 has-[:checked]:border-2 has-[:checked]:font-bold">
            <input
              type="radio"
              name="mood"
              value="GOOD"
              className="size-5 accent-green-700"
              required
              defaultChecked={mood?.mood === "GOOD"}
            />
            Good
          </label>
        </fieldset>

        <label className="font-bold mt-8">Note (optional)</label>
        <textarea
          name="note"
          rows={4}
          cols={50}
          defaultValue={mood?.note ?? ""}
          className="bg-surface rounded-3xl p-4 mt-2 border border-border"
        ></textarea>
        <button
          type="submit"
          className="bg-foreground text-background rounded-full font-bold p-4 w-full mt-4 cursor-pointer"
        >
          Save mood
        </button>
      </form>
    </div>
  );
}
