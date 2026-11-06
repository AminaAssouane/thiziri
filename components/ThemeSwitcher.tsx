"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeSwitcher() {
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

    return () => window.clearTimeout(timer);
  }, []);

  function handleSwitch(nextTheme: Theme) {
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => handleSwitch("light")}
        className="text-background"
      >
        <Sun size={20} />
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("dark")}
        className="text-background"
      >
        <Moon size={20} />
      </button>
    </div>
  );
}
