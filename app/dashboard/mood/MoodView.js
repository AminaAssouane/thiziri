"use client";
import { useState } from "react";
import { saveMood } from "./actions.js";

export function MoodView({ mood }) {
  const [isEditing, setIsEditing] = useState(!mood);

  if (isEditing)
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
          rows="4"
          cols="50"
          defaultValue={mood?.note ?? ""}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    );
  else
    return (
      <div>
        Mood : {mood.mood}
        Note : {mood.note}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
}
