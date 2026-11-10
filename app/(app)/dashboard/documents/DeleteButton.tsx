"use client";

import { deleteDocument } from "./actions";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => deleteDocument(id)}
      className="text-red-800 font-bold cursor-pointer text-center mt-4 ml-auto"
    >
      Delete document
    </button>
  );
}
