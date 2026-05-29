import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { PageHero } from "@/components/Breadcrumb";
import { SectionHeader } from "@/components/SectionHeader";
import { galleryHeroImage, pdfGalleryImages } from "@/lib/pdf-gallery";

const createFileRoute = (_path: string) => (config: unknown) => config;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery - Dr. A.G.S.S.T Trust" },
      {
        name: "description",
        content:
          "Photo gallery extracted from the Sevakund and Dr. Anilkumar Gaikwad profile documents.",
      },
      { property: "og:title", content: "Gallery - Dr. A.G.S.S.T Trust" },
      { property: "og:description", content: "Field moments, awards and profile images." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from the trust profile and Dr. Anilkumar Gaikwad profile documents."
        breadcrumb="Gallery"
        image={galleryHeroImage}
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader eyebrow="Images from the documents" title="Photo Archive" />

          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-muted-foreground">
            <Images className="h-4 w-4 text-accent" />
            {pdfGalleryImages.length} images added from the PDFs
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
            {pdfGalleryImages.map((image, index) => (
              <motion.figure
                key={`${image.collection}-${image.fileName}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{ delay: Math.min(index * 0.01, 0.12) }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-card shadow-soft border border-border group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 8 ? "eager" : "lazy"}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/80">{image.collection}</span>
                  <span>{image.fileName}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
