"use client";
import { useState } from "react";
import { saveHealthProfile } from "./actions";

export default function ProfileView({ profile }) {
  const [isEditing, setIsEditing] = useState(!profile);
  const [allergies, setAllergies] = useState(
    profile?.allergies?.map((a) => ({
      name: a.name,
      severity: a.severity,
      reactionDescription: a.reactionDescription,
    })) ?? [],
  );

  function addAllergy() {
    setAllergies([
      ...allergies,
      { name: "", severity: "", reactionDescription: "" },
    ]);
  }

  function removeAllergy(index) {
    setAllergies(allergies.filter((_, i) => i !== index));
  }

  function updateAllergy(index, field, value) {
    setAllergies(
      allergies.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    );
  }

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
        <h2>Allergies</h2>
        {allergies.map((a, i) => (
          <div key={i}>
            <label>
              Name :{" "}
              <input
                type="text"
                value={a.name}
                placeholder="Name"
                onChange={(e) => updateAllergy(i, "name", e.target.value)}
              />
            </label>

            <label>
              Severity :{" "}
              <input
                type="text"
                placeholder="Severity"
                value={a.severity}
                onChange={(e) => updateAllergy(i, "severity", e.target.value)}
              />
            </label>

            <label>
              Reaction description :{" "}
              <input
                type="text"
                placeholder="Reaction description"
                value={a.reactionDescription}
                onChange={(e) =>
                  updateAllergy(i, "reactionDescription", e.target.value)
                }
              />
            </label>

            <button type="button" onClick={() => removeAllergy(i)}>
              Remove
            </button>
          </div>
        ))}

        <input
          type="hidden"
          name="allergies"
          value={JSON.stringify(allergies)}
        />

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
