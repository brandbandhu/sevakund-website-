import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, MessageCircle, Check } from "lucide-react";
import { PageHero } from "@/components/Breadcrumb";
import hero3 from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dr. A.G.S.S.T Trust" },
      {
        name: "description",
        content:
          "Get in touch with Dr. Anilkumar Gaikwad Samajik Sevakund Trust. Office in Warje, Pune.",
      },
      { property: "og:title", content: "Contact Us" },
      { property: "og:description", content: "Reach our team in Pune, Maharashtra." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const NGO = {
  address:
    "Office No. 301, Swami Kripa Building, Survey No. 4/2b/1b/1/1b, In Front of Mumbai-Bangalore Flyover, NDA Road, Warje, Pune, Maharashtra – 411058",
  phones: ["8788390876", "7219028550"],
  email: "sevakund01@gmail.com",
};

function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.info("[contact:mock]", f);
    setSent(true);
  }

  return (
    <>
      <PageHero
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        breadcrumb={t("nav.contact")}
        image={hero3}
      />

      <section className="py-16 md:py-24">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-3 gap-6">
          {[
            { Icon: MapPin, t: t("contact.address"), d: NGO.address },
            { Icon: Phone, t: t("contact.phone"), d: NGO.phones.join(" · ") },
            { Icon: Mail, t: t("contact.email"), d: NGO.email },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-6 bg-card border border-border shadow-soft hover:shadow-elevated transition"
            >
              <div className="h-12 w-12 rounded-2xl gradient-accent grid place-items-center text-accent-foreground shadow-glow-orange">
                <c.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 rounded-3xl p-6 md:p-10 bg-card border border-border shadow-soft">
            {sent ? (
              <div className="text-center py-10">
                <div className="h-16 w-16 mx-auto rounded-full gradient-accent grid place-items-center">
                  <Check className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">Message received</h3>
                <p className="mt-2 text-muted-foreground">{t("contact.sent")}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h2 className="font-display text-2xl font-bold">{t("contact.formTitle")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <CField
                    label={t("contact.fields.name")}
                    v={f.name}
                    on={(v) => setF({ ...f, name: v })}
                    required
                  />
                  <CField
                    label={t("contact.fields.email")}
                    v={f.email}
                    on={(v) => setF({ ...f, email: v })}
                    type="email"
                    required
                  />
                  <CField
                    label={t("contact.fields.phone")}
                    v={f.phone}
                    on={(v) => setF({ ...f, phone: v })}
                    type="tel"
                  />
                  <CField
                    label={t("contact.fields.subject")}
                    v={f.subject}
                    on={(v) => setF({ ...f, subject: v })}
                    required
                  />
                </div>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {t("contact.fields.message")}
                  </span>
                  <textarea
                    required
                    value={f.message}
                    onChange={(e) => setF({ ...f, message: e.target.value })}
                    rows={5}
                    className="mt-1.5 w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition resize-none"
                  />
                </label>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 gradient-primary rounded-full px-6 py-3 font-bold text-primary-foreground shadow-glow-blue"
                  >
                    <Send className="h-4 w-4" /> {t("contact.send")}
                  </button>
                  <a
                    href="https://wa.me/918788390876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3 font-bold hover:border-accent transition"
                  >
                    <MessageCircle className="h-4 w-4" /> {t("contact.whatsapp")}
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-border shadow-soft min-h-[400px]">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps?q=Warje,Pune,Maharashtra&output=embed"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function CField({
  label,
  v,
  on,
  type = "text",
  required,
}: {
  label: string;
  v: string;
  on: (s: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={v}
        onChange={(e) => on(e.target.value)}
        required={required}
        className="mt-1.5 w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition"
      />
    </label>
  );
}
