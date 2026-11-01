"use client";

import { deleteEmergencyContact } from "./actions";

type DeleteButtonProps = { id: string };

export default function DeleteButton({ id }: DeleteButtonProps) {
  return <button onClick={() => deleteEmergencyContact(id)}>Delete</button>;
}
