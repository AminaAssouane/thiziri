"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function CompactThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initialTheme: Theme = saved === "dark" ? "dark" : "light";

    const timer = window.setTimeout(() => {
      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark",
      );
    }, 0);
  }, []);

  function handleToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex cursor-pointer items-center justify-center rounded-full text-white"
    >
      {theme === "light" ? (
        <div className="flex flex-col items-center text-xs">
          <Moon className="size-7" />
          <p>Theme</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-xs">
          <Sun className="size-7" />
          <p>Theme</p>
        </div>
      )}
    </button>
  );
}
