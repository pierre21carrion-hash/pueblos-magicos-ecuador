// ============================================================
// IMAGE TYPE SYSTEM — PUEBLOS MÁGICOS DEL ECUADOR
// ============================================================

/** Single optimized image with all metadata needed by next/image */
export interface PuebloImageData {
  /** Absolute path from /public — served by Next.js Image optimizer */
  src: string;
  /** Descriptive alt text — required for accessibility */
  alt: string;
  /**
   * Base64 SVG data URI derived from the pueblo's dominant color.
   * Used as placeholder="blur" while the real image loads.
   * Prevents CLS during hydration.
   */
  blurDataURL: string;
  /** Natural width in pixels — prevents layout shift */
  width: number;
  /** Natural height in pixels — prevents layout shift */
  height: number;
  /**
   * Dominant color hex — used as CSS background fallback
   * if the image fails to load entirely.
   */
  dominantColor: string;
  /** Photo credit / source attribution */
  credit?: string;
}

/** Full image set for a pueblo: hero + optional gallery */
export interface PuebloImagesManifest {
  /** Hero image — used in page hero and OG image */
  hero: PuebloImageData;
  /** Gallery images — empty array if not yet available */
  gallery: PuebloImageData[];
}

/** Map of pueblo slug → full image manifest */
export type ImageManifestMap = Record<string, PuebloImagesManifest>;

/** Overlay variants for HeroImage */
export type HeroOverlay = "cinematic" | "dark" | "premium" | "minimal" | "none";

/** Card image aspect ratios */
export type CardImageRatio = "video" | "cinema" | "square";
