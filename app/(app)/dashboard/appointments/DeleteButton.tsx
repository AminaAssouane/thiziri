"use client";
import { removeAppointment } from "./actions";

type DeleteButtonProps = {
  id: string;
};

export function DeleteButton({ id }: DeleteButtonProps) {
  return <button onClick={() => removeAppointment(id)}>Delete</button>;
}
