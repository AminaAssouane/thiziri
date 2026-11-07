"use client";
import { deleteHealthStatus } from "./actions";

type DeleteButtonProps = { id: string };

export function DeleteButton({ id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => deleteHealthStatus(id)}
      className="hover:cursor-pointer"
    >
      Delete
    </button>
  );
}
