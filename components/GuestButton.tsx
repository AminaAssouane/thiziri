"use client";

import { loginAsGuest } from "@/app/actions/auth";
import { useState } from "react";

export default function GuestButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await loginAsGuest();
    } catch (error) {
      // Handled via redirect or error state
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-full px-8 py-3 font-bold text-center border-none bg-linear-to-r from-[#c87035] via-[#d21fbe] to-[#1356ea] text-background hover:bg-none hover:bg-foreground"
    >
      {isLoading ? "Entering..." : "Try as guest"}
    </button>
  );
}
