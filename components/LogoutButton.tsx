"use client";

import { logoutUser } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton({ device }: { device: string }) {
  return (
    <form action={logoutUser}>
      {device === "mobile" ? (
        <button
          type="submit"
          className="flex flex-col items-center text-xs cursor-pointer"
        >
          <LogOut className="size-7" />
          <p>Log Out</p>
        </button>
      ) : (
        <button
          type="submit"
          className="flex items-center gap-2 cursor-pointer text-white hover:text-white/60"
        >
          <LogOut className="size-7" />
          <p>Log Out</p>
        </button>
      )}
    </form>
  );
}
