import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Droplet,
  Eye,
  BookOpen,
  LifeBuoy,
  Home,
  Heart,
  Utensils,
  TreePine,
  Building2,
} from "lucide-react";
import { PageHero } from "@/components/Breadcrumb";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import causeWomen from "@/assets/cause-women.jpg";
import causeEnv from "@/assets/cause-environment.jpg";
import causeHealth from "@/assets/cause-health.jpg";
import causeRelief from "@/assets/cause-relief.jpg";

const createFileRoute = (_path: string) => (config: unknown) => config;

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Our Activities — Dr. A.G.S.S.T Trust" },
      {
        name: "description",
        content:
          "Blood donation drives, cataract surgeries, flood relief, village adoption and more — programs across Maharashtra.",
      },
      { property: "og:title", content: "Our Activities" },
      { property: "og:description", content: "Programs across districts in Maharashtra." },
      { property: "og:url", content: "/activities" },
    ],
    links: [{ rel: "canonical", href: "/activities" }],
  }),
  component: ActivitiesPage,
});

const ICONS = [Droplet, Eye, BookOpen, LifeBuoy, Home, Heart, Utensils, TreePine, Building2];
const IMAGES = [
  hero2,
  causeHealth,
  hero3,
  causeRelief,
  hero1,
  causeHealth,
  hero1,
  causeEnv,
  causeWomen,
];

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const items = t("activities.list", { returnObjects: true }) as Array<{ t: string; d: string }>;

  return (
    <>
      <PageHero
        title={t("activities.title")}
        subtitle={t("activities.subtitle")}
        breadcrumb={t("nav.activities")}
        image={hero2}
      />

      <section className="py-20 md:py-28">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it, i) => {
              const Icon = ICONS[i];
              return (
                <motion.article
                  key={it.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elevated transition"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={IMAGES[i]}
                      alt=""
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 h-11 w-11 rounded-full gradient-accent grid place-items-center shadow-glow-orange">
                      <Icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold text-white">
                      {it.t}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
