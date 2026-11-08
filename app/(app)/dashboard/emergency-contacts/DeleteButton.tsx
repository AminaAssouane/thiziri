"use client";

import { deleteEmergencyContact } from "./actions";

type DeleteButtonProps = { id: string };

export default function DeleteButton({ id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => deleteEmergencyContact(id)}
      className="cursor-pointer text-red-900 font-bold"
    >
      Delete
    </button>
  );
}
