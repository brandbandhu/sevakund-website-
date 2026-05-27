import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, Sparkles } from "lucide-react";
import { PageHero } from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder — Dr. Anilkumar Baliram Gaikwad" },
      {
        name: "description",
        content:
          "The journey, awards and contributions of Dr. Anilkumar Baliram Gaikwad — engineer, public servant and founder of the Trust.",
      },
      { property: "og:title", content: "Dr. Anilkumar Baliram Gaikwad — Founder" },
      { property: "og:description", content: "Engineer · Public Servant · Social Reformer" },
      { property: "og:url", content: "/founder" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "/founder" }],
  }),
  component: FounderPage,
});

function FounderPage() {
  const { t } = useTranslation();
  const awards = t("founder.awards", { returnObjects: true }) as Array<{
    y: string;
    t: string;
    d: string;
  }>;
  const timeline = t("founder.timeline", { returnObjects: true }) as Array<{
    y: string;
    t: string;
    d: string;
  }>;

  return (
    <>
      <PageHero
        title={t("founder.name")}
        subtitle={t("founder.title")}
        breadcrumb={t("nav.founder")}
        image={founderImg}
      />

      {/* Bio */}
      <section className="py-20 md:py-28">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 sticky top-24"
          >
            <div className="relative">
              <div className="absolute -inset-4 gradient-gold rounded-3xl blur-2xl opacity-40" />
              <img
                src={founderImg}
                alt="Dr. Anilkumar Gaikwad"
                width={1024}
                height={1280}
                className="relative rounded-3xl shadow-elevated w-full"
              />
            </div>
            <div className="mt-6 rounded-2xl p-5 bg-card border border-border shadow-soft">
              <div className="text-xs font-bold uppercase tracking-widest text-accent">
                Quick Facts
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-bold">Founder & Chairman</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Profession</span>
                  <span className="font-bold">Engineer</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Awards</span>
                  <span className="font-bold">{awards.length}+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Years of Service</span>
                  <span className="font-bold">40+</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
                {t("founder.bioTitle")}
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">{t("founder.intro")}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                {t("founder.bio")}
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="mt-14">
              <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> {t("founder.journeyTitle")}
              </h3>
              <div className="relative pl-8 border-l-2 border-dashed border-border space-y-6">
                {timeline.map((m, i) => (
                  <motion.div
                    key={m.y + m.t}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <div className="absolute -left-[2.4rem] top-1 h-4 w-4 rounded-full gradient-accent ring-4 ring-background" />
                    <div className="text-xs font-mono text-accent font-bold">{m.y}</div>
                    <div className="font-display text-lg font-bold mt-0.5">{m.t}</div>
                    <p className="text-sm text-muted-foreground mt-1">{m.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader eyebrow="Recognition" title={t("founder.awardsTitle")} />
          <div className="grid md:grid-cols-2 gap-5">
            {awards.map((a, i) => (
              <motion.div
                key={a.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl p-6 bg-card border border-border shadow-soft hover:shadow-elevated transition flex gap-5"
              >
                <div className="h-14 w-14 shrink-0 rounded-2xl gradient-gold grid place-items-center text-white">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-xs font-mono text-accent font-bold">{a.y}</div>
                  <h3 className="font-display text-xl font-bold mt-0.5">{a.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
