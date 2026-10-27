"use client";

import { deleteMedLog } from "./actions";

export default function DeleteButton({ id }) {
  return <button onClick={() => deleteMedLog(id)}>Delete</button>;
}
