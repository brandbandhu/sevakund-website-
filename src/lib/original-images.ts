const pageModules = import.meta.glob("../assets/pdf-original-hd/**/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const curatedModules = import.meta.glob("../assets/original-curated/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function image(fileName: string, modules = pageModules) {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${fileName}`));
  if (!entry) {
    throw new Error(`Missing original PDF image: ${fileName}`);
  }

  return entry[1];
}

function curatedImage(fileName: string) {
  return image(fileName, curatedModules);
}

export type OriginalDocumentImage = {
  src: string;
  fileName: string;
  collection: "Founder Profile" | "Sevakund Profile";
  alt: string;
};

export const originalDocumentImages: OriginalDocumentImage[] = Object.entries(pageModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? path;
    const collection = path.includes("/founder/") ? "Founder Profile" : "Sevakund Profile";

    return {
      src,
      fileName,
      collection,
      alt: `${collection} ${fileName.replace(".jpg", "").replaceAll("-", " ")}`,
    } satisfies OriginalDocumentImage;
  })
  .sort((a, b) => a.collection.localeCompare(b.collection) || a.fileName.localeCompare(b.fileName));

export const curatedGalleryImages: OriginalDocumentImage[] = Object.entries(curatedModules)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? path;

    return {
      src,
      fileName,
      collection: "Sevakund Profile",
      alt: `Sevakund field photo ${fileName.replace(".jpg", "").replaceAll("-", " ")}`,
    } satisfies OriginalDocumentImage;
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

export const originalImages = {
  heroRelief: curatedImage("community-relief.jpg"),
  heroBlood: curatedImage("programs-collage.jpg"),
  heroEducation: curatedImage("education-support.jpg"),
  founder: curatedImage("anil-kumar-portrait.jpg"),
  founderHero: curatedImage("founder-awards.jpg"),
  about: curatedImage("programs-collage.jpg"),
  activities: curatedImage("community-relief.jpg"),
  donate: curatedImage("programs-collage.jpg"),
  contact: curatedImage("community-relief.jpg"),
  health: curatedImage("field-work.jpg"),
  education: curatedImage("education-support.jpg"),
  women: curatedImage("women-event.jpg"),
  environment: curatedImage("media-coverage.jpg"),
  relief: curatedImage("community-relief.jpg"),
  agriculture: curatedImage("agriculture-community.jpg"),
};
