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
    <div className="flex items-center gap-[2px] rounded-full border border-surface text-surface">
      <button
        type="button"
        onClick={() => handleSwitch("light")}
        className={`flex items-center justify-center rounded-l-full border-0 px-2.5 py-1.5 cursor-pointer ${
          theme === "light" ? "bg-background text-foreground" : ""
        }`}
      >
        <Sun size={20} />
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("dark")}
        className={`flex items-center justify-center cursor-pointer rounded-r-full border-0 px-2.5 py-1.5 ${theme === "dark" ? "bg-background text-foreground" : ""} `}
      >
        <Moon size={20} />
      </button>
    </div>
  );
}

/** .themeSwitcher {
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 999px;
}

.themeSwitcher button {
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  color: var(--foreground);
}

.themeSwitcher button.active {
  background-color: var(--active-background);
}

.moon {
  border-radius: 999px 0 0 999px;
}

.sun {
  border-radius: 0 999px 999px 0;
}

.moon,
.sun {
  display: flex;
  align-items: center;
  justify-content: center;
}
 */
