"use client";
import { removeAppointment } from "./actions";

export function DeleteButton({ id }) {
  return <button onClick={() => removeAppointment(id)}>Delete</button>;
}
