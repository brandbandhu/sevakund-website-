import { curatedGalleryImages, originalDocumentImages } from "@/lib/original-images";

export const pdfGalleryImages = [...curatedGalleryImages, ...originalDocumentImages];
export const galleryHeroImage = curatedGalleryImages[0]?.src ?? originalDocumentImages[0]?.src;
