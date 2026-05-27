import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Heart,
  HandHeart,
  Target,
  ArrowRight,
  Sparkles,
  Quote,
  Stethoscope,
  GraduationCap,
  Users,
  Leaf,
  LifeBuoy,
  Wheat,
  Award,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import founderImg from "@/assets/founder.jpg";
import causeWomen from "@/assets/cause-women.jpg";
import causeEnv from "@/assets/cause-environment.jpg";
import causeHealth from "@/assets/cause-health.jpg";
import causeRelief from "@/assets/cause-relief.jpg";
import { Link } from "@/components/AppLink";
import { Counter } from "@/components/Counter";
import { SectionHeader } from "@/components/SectionHeader";

const createFileRoute = (_path: string) => (config: unknown) => config;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. A.G.S.S.T Trust — Together We Can Transform Lives" },
      {
        name: "description",
        content:
          "Join Dr. Anilkumar Gaikwad Samajik Sevakund Trust in transforming lives through healthcare, education, women empowerment and disaster relief across Maharashtra.",
      },
      { property: "og:title", content: "Dr. A.G.S.S.T Trust — Transforming Lives" },
      {
        property: "og:description",
        content: "Healthcare · Education · Women Empowerment · Disaster Relief",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <CausesSection />
      <FounderHighlight />
      <DonationCTA />
      <TestimonialsSection />
      <GalleryPreview />
    </>
  );
}

/* HERO */
const slides = [
  { img: hero1, key: "relief" as const },
  { img: hero2, key: "blood" as const },
  { img: hero3, key: "education" as const },
];

function HeroSection() {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[idx].img}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 gradient-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.06_250/0.7)] via-[oklch(0.18_0.06_250/0.3)] to-transparent" />

      <div className="relative h-full container-x mx-auto max-w-7xl flex flex-col justify-end pb-20 md:pb-32 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-6">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> {t("hero.eyebrow")}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-base md:text-xl text-white/85 max-w-2xl">{t("hero.subtitle")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 gradient-accent rounded-full px-7 py-3.5 font-bold text-accent-foreground shadow-glow-orange hover:scale-105 transition"
            >
              <Heart className="h-4 w-4 fill-current" /> {t("hero.cta1")}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 glass rounded-full px-7 py-3.5 font-bold hover:bg-white/20 transition"
            >
              <HandHeart className="h-4 w-4" /> {t("hero.cta2")}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white/90 hover:text-white"
            >
              <Target className="h-4 w-4" /> {t("hero.cta3")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* slide dots */}
          <div className="mt-10 flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-accent" : "w-5 bg-white/40"}`}
              />
            ))}
            <span className="ml-3 text-xs uppercase tracking-widest text-white/70">
              {t(`hero.slides.${slides[idx].key}` as const)}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* STATS */
function StatsSection() {
  const { t } = useTranslation();
  const stats = [
    { end: 20000, suffix: "+", label: t("stats.lives") },
    { end: 150, suffix: "+", label: t("stats.blood") },
    { end: 120, suffix: "+", label: t("stats.villages") },
    { end: 5000, suffix: "+", label: t("stats.students") },
    { end: 800, suffix: "+", label: t("stats.volunteers") },
  ];
  return (
    <section className="py-16 md:py-24 bg-cream relative">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeader title={t("stats.title")} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-6 md:p-8 text-center shadow-soft border border-border/50 hover:shadow-elevated transition"
            >
              <div className="font-display text-3xl md:text-5xl font-bold text-gradient-primary">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ABOUT PREVIEW */
function AboutPreview() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-32">
      <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            {t("about.eyebrow")}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            {t("about.title")}
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            {t("about.body")}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { t: t("about.vision"), d: t("about.visionBody"), Icon: Target },
              { t: t("about.mission"), d: t("about.missionBody"), Icon: HandHeart },
              { t: t("about.values"), d: t("about.valuesBody"), Icon: ShieldCheck },
            ].map(({ t: title, d, Icon }) => (
              <div key={title} className="rounded-2xl p-5 bg-secondary border border-border/50">
                <Icon className="h-5 w-5 text-accent mb-2" />
                <div className="font-bold text-sm">{title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:text-accent transition"
          >
            {t("about.learnMore")} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <img
              src={causeHealth}
              loading="lazy"
              width={1200}
              height={900}
              alt="Healthcare"
              className="rounded-3xl shadow-elevated h-64 md:h-80 w-full object-cover"
            />
            <img
              src={causeWomen}
              loading="lazy"
              width={1200}
              height={900}
              alt="Women"
              className="rounded-3xl shadow-elevated h-48 md:h-60 w-full object-cover mt-12"
            />
            <img
              src={causeEnv}
              loading="lazy"
              width={1200}
              height={900}
              alt="Environment"
              className="rounded-3xl shadow-elevated h-48 md:h-60 w-full object-cover -mt-4"
            />
            <img
              src={causeRelief}
              loading="lazy"
              width={1200}
              height={900}
              alt="Relief"
              className="rounded-3xl shadow-elevated h-64 md:h-80 w-full object-cover -mt-8"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block bg-card rounded-2xl p-4 shadow-elevated border border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full gradient-accent grid place-items-center">
                <BadgeCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">80G · 12A</div>
                <div className="text-sm font-bold">Tax Exempt Certified</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* CAUSES */
function CausesSection() {
  const { t } = useTranslation();
  const causes = [
    { key: "health", Icon: Stethoscope, img: causeHealth },
    { key: "education", Icon: GraduationCap, img: hero3 },
    { key: "women", Icon: Users, img: causeWomen },
    { key: "environment", Icon: Leaf, img: causeEnv },
    { key: "relief", Icon: LifeBuoy, img: causeRelief },
    { key: "agri", Icon: Wheat, img: hero1 },
  ] as const;
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeader eyebrow={t("causes.subtitle")} title={t("causes.title")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-3xl overflow-hidden bg-card shadow-soft hover:shadow-elevated transition cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 left-4 h-11 w-11 rounded-full glass grid place-items-center">
                  <c.Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{t(`causes.items.${c.key}.t`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t(`causes.items.${c.key}.d`)}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FOUNDER */
function FounderHighlight() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-0 left-1/3 w-[40rem] h-[40rem] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="container-x mx-auto max-w-7xl relative grid lg:grid-cols-5 gap-10 lg:gap-16 items-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <div className="relative">
            <div className="absolute -inset-6 gradient-gold rounded-3xl blur-2xl opacity-40" />
            <img
              src={founderImg}
              alt="Dr. Anilkumar Gaikwad"
              width={1024}
              height={1280}
              className="relative rounded-3xl shadow-elevated w-full max-w-md mx-auto"
            />
            <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-4 py-3 shadow-glow-orange">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            {t("founder.eyebrow")}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            {t("founder.name")}
          </h2>
          <p className="mt-2 text-white/70 font-semibold">{t("founder.title")}</p>
          <p className="mt-6 text-white/80 leading-relaxed">{t("founder.bio")}</p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {(
              t("founder.awards", { returnObjects: true }) as Array<{
                y: string;
                t: string;
                d: string;
              }>
            )
              .slice(0, 4)
              .map((a) => (
                <div key={a.t} className="glass rounded-xl p-4 flex gap-3">
                  <Award className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60 font-mono">{a.y}</div>
                    <div className="text-sm font-bold">{a.t}</div>
                  </div>
                </div>
              ))}
          </div>

          <Link
            to="/founder"
            className="mt-8 inline-flex items-center gap-2 gradient-accent text-accent-foreground rounded-full px-6 py-3 font-bold shadow-glow-orange"
          >
            View Founder's Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* DONATION CTA */
function DonationCTA() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-32 relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 rounded-full bg-accent blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-primary-glow blur-3xl" />
      </div>
      <div className="container-x mx-auto max-w-5xl relative text-center text-white">
        <Heart className="h-12 w-12 mx-auto text-accent fill-current" />
        <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-tight">
          {t("cta.title")}
        </h2>
        <p className="mt-5 text-lg text-white/80 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 gradient-accent rounded-full px-8 py-4 font-bold text-accent-foreground shadow-glow-orange hover:scale-105 transition text-base"
          >
            <Heart className="h-4 w-4 fill-current" /> {t("cta.donateMonthly")}
          </Link>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 glass rounded-full px-8 py-4 font-bold hover:bg-white/20 transition text-base"
          >
            {t("cta.donateOnce")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIALS */
function TestimonialsSection() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) as Array<{ q: string; a: string }>;
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeader title={t("testimonials.title")} />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-3xl p-8 shadow-soft border border-border/50 relative"
            >
              <Quote className="absolute -top-3 -left-3 h-10 w-10 text-accent fill-accent/20" />
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 italic">
                "{it.q}"
              </p>
              <footer className="mt-5 text-sm font-bold text-primary">— {it.a}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* GALLERY PREVIEW */
function GalleryPreview() {
  const imgs = [hero1, causeHealth, hero3, causeWomen, causeEnv, hero2, causeRelief, hero1];
  return (
    <section className="py-20 md:py-32">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeader eyebrow="Moments from the field" title="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {imgs.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`overflow-hidden rounded-2xl shadow-soft group ${i % 3 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
