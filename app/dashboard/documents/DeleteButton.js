"use client";

import { deleteDocument } from "./actions";

export default function DeleteButton({ id }) {
  return <button onClick={() => deleteDocument(id)}>Delete document</button>;
}
