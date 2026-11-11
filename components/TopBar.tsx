"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoutButton from "./LogoutButton";
import { House, CircleUserRound } from "lucide-react";

export default function TopBar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-10 hidden bg-lagoon text-white md:block">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-10 py-4">
        <p className="text-2xl font-display moon-title">Thiziri</p>
        <ul className="flex gap-8 items-center text-foreground">
          <li key="theme">
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
