"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links, isActive } from "./NavLinks";
import ThemeSwitcher from "./ThemeSwitcher";

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 bg-linear-to-r from-[#00181C] to-lagoon md:hidden">
      <ul className="mx-auto flex max-w-md justify-around py-3">
        {links.map(({ href, label }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className={
                  isActive(pathname, href)
                    ? "font-semibold text-lightblue"
                    : "text-background"
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
        <li key="theme">
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
}
