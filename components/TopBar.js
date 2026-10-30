"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links, isActive } from "./NavLinks";

export default function TopBar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-10 hidden border-b border-stone-200 bg-forest md:block">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between px-10 py-4"
      >
        <p className="text-xl font-semibold text-rose">Thiziri</p>
        <ul className="flex gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                className={
                  isActive(pathname, href)
                    ? "font-semibold text-rose"
                    : "text-cream"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
