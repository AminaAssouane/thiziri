"use client";
import { removeMedication } from "./actions";

export function DeleteButton({ id }) {
  return <button onClick={() => removeMedication(id)}>Delete</button>;
}
