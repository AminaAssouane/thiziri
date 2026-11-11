export function MoonLogoIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Crisp Crescent Body */}
      <path d="M12 3a9 9 0 1 0 9 9 7 7 0 1 1-9-9z" />

      {/* Subtle 4-point Sparkles (scaled to stay sharp at small sizes) */}
      <path d="M19 3v4m-2-2h4" strokeWidth="1.2" />
      <path d="M15 11v2m-1-1h2" strokeWidth="1.2" />
    </svg>
  );
}
