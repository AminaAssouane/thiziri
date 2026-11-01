"use client";

import { deleteDocument } from "./actions";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  return <button onClick={() => deleteDocument(id)}>Delete document</button>;
}
