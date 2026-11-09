"use client";
import { useState } from "react";
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
  const [isEditing, setIsEditing] = useState(!mood);

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
    <section className="relative left-1/2 -ml-[50vw] -mt-6 w-screen bg-linear-to-br from-forest to-lagoon text-background p-6">
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => moveWeek(-1)}
            className="cursor-pointer"
          >
            ‹
          </button>

          <p>
            {monday.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <button
            type="button"
            onClick={() => moveWeek(1)}
            className="cursor-pointer"
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
                    : "";

            return (
              <button
                key={date.toISOString()}
                className={`cursor-pointer rounded-2xl border border-border p-2 text-center ${
                  isSelected
                    ? "bg-accent text-background"
                    : "bg-surface text-foreground"
                }`}
                onClick={() => goToDate(date)}
              >
                <p className="text-xs">
                  {date.toLocaleDateString("en", { weekday: "short" })}
                </p>

                <p className="font-semibold">{date.getDate()}</p>

                {moodForDay && (
                  <span
                    className={`mx-auto mt-1 block h-2.5 w-2.5 rounded-full ${moodColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );

  if (isEditing || !mood)
    return (
      <>
        {weekStrip}
        <form action={saveMood}>
          <input
            type="hidden"
            name="date"
            value={formatDateParam(selectedDate)}
          />
          <label>
            Mood :
            <select name="mood" required defaultValue={mood?.mood ?? ""}>
              <option value="">Select...</option>
              <option value="BAD">Bad</option>
              <option value="AVERAGE">Average</option>
              <option value="GOOD">Good</option>
            </select>
          </label>
          <label>Notes : </label>
          <textarea
            name="note"
            rows={4}
            cols={50}
            defaultValue={mood?.note ?? ""}
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </>
    );
  else
    return (
      <>
        {weekStrip}
        <div>
          <p>Mood : {mood.mood}</p>
          <p>Note : {mood.note}</p>
          <p>Date : {mood.date.toISOString().slice(0, 10)}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </>
    );
}
