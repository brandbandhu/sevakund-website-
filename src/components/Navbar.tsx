import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "@/lib/navigation";
import { Link } from "./AppLink";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { to: "/", key: "home" as const },
  { to: "/about", key: "about" as const },
  { to: "/founder", key: "founder" as const },
  { to: "/activities", key: "activities" as const },
  { to: "/donate", key: "donate" as const },
  { to: "/contact", key: "contact" as const },
];

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-soft transition-all duration-300">
      <div className="container-x mx-auto max-w-7xl flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="shrink-0">
          <Logo className="h-10 w-10 md:h-11 md:w-11" variant="dark" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 rounded-md text-sm font-semibold text-foreground/80 hover:text-foreground transition relative"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher variant="dark" />
          <Link
            to="/donate"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full gradient-accent px-4 py-2 text-xs md:text-sm font-bold text-accent-foreground shadow-glow-orange hover:scale-105 transition-transform"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            {t("nav.donateNow")}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-x mx-auto max-w-7xl py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-3 rounded-md text-base font-semibold text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "text-accent bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
