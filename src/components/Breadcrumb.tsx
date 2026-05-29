import { ChevronRight, Home } from "lucide-react";
import { Link } from "./AppLink";

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  image,
}: {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
}) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 gradient-hero text-white overflow-hidden">
      {image && (
        <img
          src={image}
          alt=""
          loading="eager"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/15" />
      <div className="container-x mx-auto max-w-7xl relative">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-4">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{breadcrumb}</span>
        </nav>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
