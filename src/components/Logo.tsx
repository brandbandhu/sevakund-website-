// Placeholder logo — replace with PDF-extracted artwork.
// Orange / Blue / White brand theme.
export function Logo({
  className = "h-10 w-10",
  showText = true,
  variant = "dark",
}: {
  className?: string;
  showText?: boolean;
  variant?: "dark" | "light";
}) {
  const text = variant === "light" ? "text-white" : "text-[var(--ink)]";
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
        {/* Teardrop generator: pointed top, rounded bottom — concentric rings */}
        {/* Outer orange teardrop */}
        <path
          d="M50 4 C 78 38, 96 60, 96 78 A 46 46 0 1 1 4 78 C 4 60, 22 38, 50 4 Z"
          fill="#F2A640"
        />
        {/* Blue ring */}
        <path
          d="M50 20 C 72 48, 84 64, 84 78 A 34 34 0 1 1 16 78 C 16 64, 28 48, 50 20 Z"
          fill="#6FA8DC"
        />
        {/* Orange ring */}
        <path
          d="M50 34 C 66 56, 74 68, 74 78 A 24 24 0 1 1 26 78 C 26 68, 34 56, 50 34 Z"
          fill="#F2A640"
        />
        {/* Inner blue teardrop */}
        <path
          d="M50 50 C 60 64, 64 72, 64 78 A 14 14 0 1 1 36 78 C 36 72, 40 64, 50 50 Z"
          fill="#6FA8DC"
        />
      </svg>
      {showText && (
        <div className="leading-tight">
          <div className={`font-display font-bold text-base md:text-lg ${text}`}>Sevakund sanstha</div>
        </div>
      )}
    </div>
  );
}
