"use client";
import { useState } from "react";
import type { Prisma, Severity } from "@/generated/prisma/client";
import { saveHealthProfile } from "./actions";

type Profile = Prisma.HealthProfileGetPayload<{
  include: { allergies: true; chronicIllnesses: true };
}>;

type ProfileViewProps = { profile: Profile | null };

type EditableAllergy = {
  name: string;
  severity: Severity;
  reactionDescription: string;
};

type EditableChronicIllness = {
  name: string;
  diagnosisDate: string;
  notes: string;
};

function isSeverity(value: string): value is Severity {
  return value === "MILD" || value === "MODERATE" || value === "SEVERE";
}

export default function ProfileView({ profile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(!profile);

  const [allergies, setAllergies] = useState<EditableAllergy[]>(
    profile?.allergies?.map((a) => ({
      name: a.name,
      severity: a.severity,
      reactionDescription: a.reactionDescription ?? "",
    })) ?? [],
  );

  const [chronicIllnesses, setChronicIllnesses] = useState<
    EditableChronicIllness[]
  >(
    profile?.chronicIllnesses?.map((c) => ({
      name: c.name,
      diagnosisDate: c.diagnosisDate
        ? new Date(c.diagnosisDate).toISOString().slice(0, 10)
        : "",
      notes: c.notes ?? "",
    })) ?? [],
  );

  // HELPER FUNCTIONS FOR ALLERGIES MANAGEMENT
  function addAllergy() {
    setAllergies([
      ...allergies,
      { name: "", severity: "MILD", reactionDescription: "" },
    ]);
  }

  function removeAllergy(index: number) {
    setAllergies(allergies.filter((_, i) => i !== index));
  }

  function updateAllergy<K extends keyof EditableAllergy>(
    index: number,
    field: K,
    value: EditableAllergy[K],
  ) {
    setAllergies(
      allergies.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    );
  }

  // HELPER FUNCTIONS FOR CHRONIC ILLNESSES MANAGEMENT
  function addChronicIllness() {
    setChronicIllnesses([
      ...chronicIllnesses,
      { name: "", diagnosisDate: "", notes: "" },
    ]);
  }

  function removeChronicIllness(index: number) {
    setChronicIllnesses(chronicIllnesses.filter((_, i) => i !== index));
  }

  function updateChronicIllnesses<K extends keyof EditableChronicIllness>(
    index: number,
    field: K,
    value: EditableChronicIllness[K],
  ) {
    setChronicIllnesses(
      chronicIllnesses.map((c, i) =>
        i === index ? { ...c, [field]: value } : c,
      ),
    );
  }

  if (!isEditing && profile)
    return (
      <div>
        <h1>Health Profile</h1>
        <p>Blood type : {profile.bloodType ?? "Not set"}</p>

        <h2>Allergies : </h2>
        {profile.allergies.length === 0 ? (
          <p>No allergies recorded.</p>
        ) : (
          <ul>
            {profile.allergies.map((a) => (
              <li key={a.id}>
                <p>Name : {a.name}</p>
                <p>Severity : {a.severity}</p>
                <p>
                  Reaction description :{" "}
                  {a.reactionDescription ?? "No reaction description."}
                </p>
              </li>
            ))}
          </ul>
        )}

        <h2>Chronic illnesses : </h2>
        {profile.chronicIllnesses.length === 0 ? (
          <p>No chronic illnesses recorded.</p>
        ) : (
          <ul>
            {profile.chronicIllnesses.map((c) => (
              <li key={c.id}>
                <p>Name : {c.name}</p>
                <p>
                  Diagnosis date :{" "}
                  {c.diagnosisDate
                    ? c.diagnosisDate.toISOString().slice(0, 10)
                    : "No date recorded"}
                </p>
                <p>Notes : {c.notes ?? "No notes recorded."} </p>
              </li>
            ))}
          </ul>
        )}
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
                required
              />
            </label>

            <label>
              Severity :{" "}
              <select
                value={a.severity}
                onChange={(e) => {
                  if (isSeverity(e.target.value)) {
                    updateAllergy(i, "severity", e.target.value);
                  }
                }}
                required
              >
                <option value="MILD">Mild</option>
                <option value="MODERATE">Moderate</option>
                <option value="SEVERE">Severe</option>
              </select>
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

        <button type="button" onClick={addAllergy}>
          Add Allergy
        </button>

        <input
          type="hidden"
          name="allergies"
          value={JSON.stringify(allergies)}
        />

        <h2>Chronic Illnesses</h2>
        {chronicIllnesses.map((c, i) => (
          <div key={i}>
            <label>
              Name :{" "}
              <input
                type="text"
                placeholder="Name"
                value={c.name}
                onChange={(e) =>
                  updateChronicIllnesses(i, "name", e.target.value)
                }
                required
              />
            </label>

            <label>
              Date of diagnosis :{" "}
              <input
                type="date"
                placeholder="Date of diagnosis"
                value={c.diagnosisDate}
                onChange={(e) =>
                  updateChronicIllnesses(i, "diagnosisDate", e.target.value)
                }
              />
            </label>

            <label>
              Notes :{" "}
              <input
                type="text"
                placeholder="Notes"
                value={c.notes}
                onChange={(e) =>
                  updateChronicIllnesses(i, "notes", e.target.value)
                }
              />
            </label>

            <button type="button" onClick={() => removeChronicIllness(i)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addChronicIllness}>
          Add chronic illness
        </button>

        <input
          type="hidden"
          name="chronicIllnesses"
          value={JSON.stringify(chronicIllnesses)}
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
