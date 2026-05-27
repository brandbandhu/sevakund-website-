import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  Send,
} from "lucide-react";
import { Logo } from "./Logo";
import { useState } from "react";

const NGO = {
  address:
    "Office 301, Swami Kripa Building, Survey No. 4/2b/1b/1/1b, NDA Road, Warje, Pune, Maharashtra – 411058",
  phones: ["8788390876", "7219028550"],
  email: "sevakund01@gmail.com",
  reg: "E-0013603(THN)",
  pan: "AAETD6438K",
  darpan: "MH/2024/0409169",
};

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative gradient-dark text-white pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-glow blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container-x mx-auto max-w-7xl relative">
        {/* Top CTA strip */}
        <div className="glass rounded-3xl p-6 md:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-1">{t("cta.title")}</h3>
            <p className="text-white/80 text-sm md:text-base">{t("cta.subtitle")}</p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 gradient-accent rounded-full px-6 py-3 font-bold text-accent-foreground shadow-glow-orange whitespace-nowrap"
          >
            <Heart className="h-4 w-4 fill-current" /> {t("nav.donateNow")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white/70 leading-relaxed">{t("footer.tagline")}</p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent transition"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              {["home", "about", "founder", "activities", "donate", "contact"].map((k) => (
                <li key={k}>
                  <Link to={k === "home" ? "/" : `/${k}`} className="hover:text-accent transition">
                    {t(`nav.${k}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {NGO.address}
              </li>
              {NGO.phones.map((p) => (
                <li key={p} className="flex gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-accent" />{" "}
                  <a href={`tel:${p}`} className="hover:text-accent">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-accent" />{" "}
                <a href={`mailto:${NGO.email}`} className="hover:text-accent">
                  {NGO.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">{t("footer.newsletter")}</h4>
            <p className="text-sm text-white/70 mb-3">{t("footer.newsletterBody")}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) {
                  setSubscribed(true);
                  setEmail("");
                }
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPh")}
                className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="gradient-accent rounded-full px-3 py-2 text-accent-foreground"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-accent-glow">✓ Subscribed</p>}

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                t("certifications.eighty"),
                t("certifications.twelveA"),
                t("certifications.darpan"),
              ].map((c) => (
                <span
                  key={c}
                  className="text-[10px] font-bold uppercase tracking-wide bg-white/10 border border-white/20 rounded-full px-2.5 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} Dr. Anilkumar Gaikwad Samajik Sevakund Trust.{" "}
            {t("footer.rights")}
          </p>
          <p>
            {t("footer.regNo")}: {NGO.reg} · {t("footer.pan")}: {NGO.pan} · {t("footer.ngoId")}:{" "}
            {NGO.darpan}
          </p>
        </div>
      </div>
    </footer>
  );
}
