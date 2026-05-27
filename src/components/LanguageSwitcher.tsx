import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export function LanguageSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("mr") ? "mr" : "en";
  const toggle = () => {
    const next = current === "en" ? "mr" : "en";
    i18n.changeLanguage(next);
    if (typeof document !== "undefined") document.documentElement.lang = next;
  };
  const base =
    variant === "light"
      ? "text-white border-white/30 hover:bg-white/15"
      : "text-foreground border-border hover:bg-secondary";
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${base}`}
      aria-label="Switch language"
    >
      <Languages className="h-3.5 w-3.5" />
      <span>{current === "en" ? "मराठी" : "English"}</span>
    </button>
  );
}
