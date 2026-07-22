"use client";

import { deleteEmergencyContact } from "./actions";

export default function DeleteButton({ id }) {
  return <button onClick={() => deleteEmergencyContact(id)}>Delete</button>;
}
