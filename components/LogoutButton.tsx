"use client";

import { logoutUser } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button type="submit" className="cursor-pointer">
        Log Out
      </button>
    </form>
  );
}
