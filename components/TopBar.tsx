"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoutButton from "./LogoutButton";
import { CircleUserRound } from "lucide-react";
import { MoonLogoIcon } from "./MoonLogoIcon";

export default function TopBar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-10 hidden bg-darkest-lagoon text-white md:block">
      <nav className="mx-auto flex max-w-6xl items-center justify-between  px-10 py-4 ">
        <Link href="/dashboard" className="flex gap-2 items-center">
          <MoonLogoIcon className="w-7 h-7 text-teal" />
          <p className="text-3xl font-display moon-title">Thiziri</p>
        </Link>
        <ul className="flex gap-8 items-center text-foreground">
          <li>
            <Link
              href="/dashboard/health-profile"
              className="flex items-center gap-2 text-white hover:text-white/60"
            >
              <CircleUserRound className="size-7" />
              <p>Profile</p>
            </Link>
          </li>

          <li key="theme">
            <ThemeSwitcher />
          </li>

          <li>
            <LogoutButton device="desktop" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
