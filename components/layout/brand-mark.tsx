type BrandMarkProps = { className?: string };

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 36 36"
    >
      <path d="M8 8h8v8H8zM20 8h8v8h-8zM14 20h8v8h-8z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 12h4M12 16v4m12-4v4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M17 23h2v2h-2z" fill="var(--accent)" stroke="none" />
    </svg>
  );
}
