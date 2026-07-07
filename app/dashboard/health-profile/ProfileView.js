"use client";
import { useState } from "react";
import { saveHealthProfile } from "./actions";

export default function ProfileView({ profile }) {
  const [isEditing, setIsEditing] = useState(!profile);

  if (!isEditing)
    return (
      <div>
        <h1>Health Profile</h1>
        <p>Blood type : {profile.bloodType}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );

  return (
    <div>
      <h1>Health Profile</h1>
      <form action={saveHealthProfile}>
        <label>
          Blood Type :{" "}
          <input
            type="text"
            name="bloodType"
            defaultValue={profile?.bloodType ?? ""}
          />
        </label>
        <button type="submit">Save</button>
        {profile && (
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
