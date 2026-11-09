"use client";
import { useState } from "react";
import type { MoodEntry } from "@/generated/prisma/client";
import { saveMood } from "./actions";

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

export function MoodView({ mood, moods, selectedDate }: MoodViewProps) {
  const [isEditing, setIsEditing] = useState(!mood);

  const monday = new Date(selectedDate);
  const daysSinceMonday = (monday.getDay() + 6) % 7;

  monday.setDate(monday.getDate() - daysSinceMonday);

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });

  const weekStrip = (
    <section>
      <div className="grid grid-cols-7 gap-1">
        {weekDates.map((date) => {
          const moodForDay = moods.find((entry) => isSameDay(entry.date, date));

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
            <div
              key={date.toISOString()}
              className={`rounded-2xl border border-border p-2 text-center ${
                isSelected
                  ? "bg-accent text-background"
                  : "bg-surface text-foreground"
              }`}
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
            </div>
          );
        })}
      </div>
    </section>
  );

  if (isEditing || !mood)
    return (
      <>
        {weekStrip}
        <form action={saveMood}>
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
