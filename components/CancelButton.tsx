"use client";

import { useRouter } from "next/navigation";

export default function CancelButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="text-center text-accent bg-transparent border-2 border-accent hover:bg-accent hover:text-surface font-bold w-full p-4 rounded-4xl mt-5 cursor-pointer"
    >
      Cancel
    </button>
  );
}
