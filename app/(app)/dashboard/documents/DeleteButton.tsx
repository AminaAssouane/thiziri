"use client";

import { deleteDocument } from "./actions";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => deleteDocument(id)}
      className="cursor-pointer rounded-full px-3 py-2 text-sm font-bold text-red-800 hover:bg-red-50"
    >
      Delete document
    </button>
  );
}
