"use client";
import { useState } from "react";
import type { MoodEntry } from "@/generated/prisma/client";
import { saveMood } from "./actions.js";

type MoodViewProps = {
  mood: MoodEntry | null;
};

export function MoodView({ mood }: MoodViewProps) {
  const [isEditing, setIsEditing] = useState(!mood);

  if (isEditing || !mood)
    return (
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
    );
  else
    return (
      <div>
        <p>Mood : {mood.mood}</p>
        <p>Note : {mood.note}</p>
        <p>Date : {mood.date.toISOString().slice(0, 10)}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
}
