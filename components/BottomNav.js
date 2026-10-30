"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/medications", label: "Meds" },
  { href: "/dashboard/appointments", label: "Visits" },
  { href: "/dashboard/documents", label: "Docs" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-forest">
      <ul className="mx-auto flex max-w-md justify-around py-3">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={active ? "font-semibold text-rose" : "text-cream"}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
