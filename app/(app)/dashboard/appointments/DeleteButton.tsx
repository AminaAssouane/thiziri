"use client";
import { removeAppointment } from "./actions";

type DeleteButtonProps = {
  id: string;
};

export function DeleteButton({ id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => removeAppointment(id)}
      className="cursor-pointer text-red-900"
    >
      Delete
    </button>
  );
}
