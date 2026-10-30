"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links, isActive } from "./NavLinks";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-stone-200 bg-forest p-8 md:block">
      <p className="mb-10 text-xl font-semibold text-rose">Thiziri</p>
      <ul className="space-y-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
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
    </aside>
  );
}
