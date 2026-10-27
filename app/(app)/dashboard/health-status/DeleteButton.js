"use client";
import { deleteHealthStatus } from "./actions";

export function DeleteButton({ id }) {
  return <button onClick={() => deleteHealthStatus(id)}>Delete</button>;
}
