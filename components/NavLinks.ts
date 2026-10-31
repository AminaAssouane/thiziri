export const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/medications", label: "Meds" },
  { href: "/dashboard/appointments", label: "Visits" },
  { href: "/dashboard/documents", label: "Docs" },
] as const;

export function isActive(pathname: string, href: string): boolean {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}
