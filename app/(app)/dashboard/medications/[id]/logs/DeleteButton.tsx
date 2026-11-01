"use client";

import { deleteMedLog } from "./actions";

type DeleteButtonProps = { id: string };

export default function DeleteButton({ id }: DeleteButtonProps) {
  return <button onClick={() => deleteMedLog(id)}>Delete</button>;
}
