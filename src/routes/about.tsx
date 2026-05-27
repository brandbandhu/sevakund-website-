import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Target,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Users,
  Leaf,
} from "lucide-react";
import { PageHero } from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";
import causeHealth from "@/assets/cause-health.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Dr. A.G.S.S.T Trust" },
      {
        name: "description",
        content:
          "Learn about Dr. Anilkumar Gaikwad Samajik Sevakund Trust — our vision, mission, values and story.",
      },
      { property: "og:title", content: "About Dr. A.G.S.S.T Trust" },
      {
        property: "og:description",
        content: "Vision, mission and story of our work across Maharashtra.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const pillars = t("about.pillars", { returnObjects: true }) as Array<{ t: string; d: string }>;
  const pillarIcons = [Stethoscope, GraduationCap, Users, Leaf];

  return (
    <>
      <PageHero
        title={t("about.title")}
        subtitle={t("about.body")}
        breadcrumb={t("nav.about")}
        image={causeHealth}
      />

      {/* VMV cards */}
      <section className="py-20 md:py-28">
        <div className="container-x mx-auto max-w-7xl grid md:grid-cols-3 gap-6">
          {[
            { t: t("about.vision"), d: t("about.visionBody"), Icon: Target },
            { t: t("about.mission"), d: t("about.missionBody"), Icon: HandHeart },
            { t: t("about.values"), d: t("about.valuesBody"), Icon: ShieldCheck },
          ].map((v, i) => (
            <motion.div
              key={v.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-8 bg-card border border-border shadow-soft hover:shadow-elevated transition"
            >
              <div className="h-12 w-12 rounded-2xl gradient-primary grid place-items-center text-white shadow-glow-blue">
                <v.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">{v.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader eyebrow="Foundations" title={t("about.pillarsTitle")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? Sparkles;
              return (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-3xl p-6 bg-card border border-border text-center"
                >
                  <div className="h-14 w-14 mx-auto rounded-full gradient-accent grid place-items-center text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold">{p.t}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src={causeHealth}
            alt="Story"
            width={1200}
            height={900}
            loading="lazy"
            className="rounded-3xl shadow-elevated w-full"
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
              Heritage
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              {t("about.storyTitle")}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              {t("about.storyBody")}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "20K+", l: "Lives" },
                { n: "120+", l: "Villages" },
                { n: "800+", l: "Volunteers" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="text-center p-4 rounded-2xl bg-secondary border border-border"
                >
                  <div className="font-display text-2xl font-bold text-gradient-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
