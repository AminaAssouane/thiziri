"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CompactThemeSwitcher from "./CompactThemeSwitcher";
import LogoutButton from "./LogoutButton";
import { House, CircleUserRound } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 bg-lagoon text-white md:hidden">
      <ul className="mx-auto flex max-w-md justify-around py-3 items-center">
        <li>
          <Link
            href="/dashboard"
            className="flex flex-col items-center text-xs"
          >
            <House className="size-7" />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/health-profile"
            className="flex flex-col items-center text-xs"
          >
            <CircleUserRound className="size-7" />
            <p>Profile</p>
          </Link>
        </li>
        <li key="theme">
          <CompactThemeSwitcher />
        </li>
        <li>
          <LogoutButton device="mobile" />
        </li>
      </ul>
    </nav>
  );
}
