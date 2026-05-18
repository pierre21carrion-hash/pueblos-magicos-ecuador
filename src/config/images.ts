// ============================================================
// IMAGE MANIFEST - PUEBLOS MAGICOS DEL ECUADOR
// ============================================================
//
// The canonical image data lives in src/data/images.ts.
// This file adapts that editorial manifest to the next/image shape
// consumed by HeroImage and PuebloGallery.
// ============================================================

import { destinationImages, getImageCredit } from "@/src/data/images";
import type { ImageManifestMap, PuebloImageData } from "@/src/types/images";
import type { DestinationImage } from "@/src/data/images";

function blur(hex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${hex}"/></svg>`;
  const encoded =
    typeof Buffer !== "undefined"
      ? Buffer.from(svg).toString("base64")
      : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
}

function toPuebloImage(image: DestinationImage): PuebloImageData {
  return {
    src: image.src,
    alt: image.alt,
    blurDataURL: blur(image.dominantColor),
    dominantColor: image.dominantColor,
    width: image.width,
    height: image.height,
    credit: getImageCredit(image),
  };
}

export const IMAGE_MANIFEST: ImageManifestMap = Object.fromEntries(
  Object.entries(destinationImages).map(([slug, images]) => [
    slug,
    {
      hero: toPuebloImage(images.hero),
      gallery: images.gallery.map(toPuebloImage),
    },
  ]),
) as ImageManifestMap;
