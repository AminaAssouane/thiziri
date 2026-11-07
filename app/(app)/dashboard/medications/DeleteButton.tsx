"use client";
import { removeMedication } from "./actions";

type DeleteButtonProps = { id: string };

export function DeleteButton({ id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => removeMedication(id)}
      className="hover:cursor-pointer"
    >
      Delete
    </button>
  );
}
