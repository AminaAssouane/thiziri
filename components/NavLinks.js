export const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/medications", label: "Meds" },
  { href: "/dashboard/appointments", label: "Visits" },
  { href: "/dashboard/documents", label: "Docs" },
];

export function isActive(pathname, href) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}
