"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links, isActive } from "./NavLinks";
import ThemeSwitcher from "./ThemeSwitcher";

export default function TopBar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-10 hidden bg-linear-to-r from-[#00181C] to-lagoon md:block">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-10 py-4">
        <p className="text-2xl font-display moon-title">Thiziri</p>
        <ul className="flex gap-8 items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                className={
                  isActive(pathname, href)
                    ? "font-semibold text-lightblue"
                    : "text-background"
                }
              >
                {label}
              </Link>
            </li>
          ))}
          <li key="theme">
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
