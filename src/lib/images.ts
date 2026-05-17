// ============================================================
// IMAGE HELPERS — PUEBLOS MÁGICOS DEL ECUADOR
// ============================================================

import { IMAGE_MANIFEST } from "@/src/config/images";
import type { PuebloImageData, PuebloImagesManifest } from "@/src/types/images";

// ─── Manifest queries ────────────────────────────────────────

/** Full image set (hero + gallery) for a pueblo. Returns null if missing. */
export function getPuebloImages(slug: string): PuebloImagesManifest | null {
  return IMAGE_MANIFEST[slug] ?? null;
}

/** Hero image only — most common access pattern */
export function getHeroImage(slug: string): PuebloImageData | null {
  return IMAGE_MANIFEST[slug]?.hero ?? null;
}

/** Gallery images for a pueblo. Returns empty array if none available. */
export function getGalleryImages(slug: string): PuebloImageData[] {
  return IMAGE_MANIFEST[slug]?.gallery ?? [];
}

/** Whether a pueblo has registered images in the manifest */
export function hasImages(slug: string): boolean {
  return slug in IMAGE_MANIFEST;
}

// ─── Blur placeholder generator ──────────────────────────────

/**
 * Generates a base64 SVG data URI for use as `blurDataURL` in next/image.
 * The SVG is a 1×1 pixel rectangle filled with the given color.
 *
 * Next.js Image scales it and applies a CSS blur filter automatically,
 * producing a smooth color-matched placeholder that prevents CLS.
 */
export function generateBlurDataURL(hex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${hex}"/></svg>`;
  if (typeof Buffer !== "undefined") {
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  }
  // Fallback for any non-Node environment (should not be reached in SSR)
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// ─── sizes string builder ────────────────────────────────────

/**
 * Returns the `sizes` attribute string for next/image.
 *
 * Correct sizes are critical for LCP: they tell the browser how large
 * the image will be at each breakpoint, allowing it to select the right
 * srcset entry — preventing oversized downloads on mobile.
 */
export const IMAGE_SIZES = {
  /** Full viewport hero — used in page heroes and landing */
  hero: "100vw",

  /** 4-column grid (default card layout) */
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",

  /** 3-column grid */
  cardLg: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",

  /** 2-column grid (gallery primary) */
  galleryFeature: "(max-width: 768px) 100vw, 66vw",

  /** 2-column small grid (gallery secondary) */
  galleryThumb: "(max-width: 640px) 50vw, 33vw",
} as const;
