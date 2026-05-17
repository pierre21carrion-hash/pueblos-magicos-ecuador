// Server Component — no "use client" needed.
// Fallback is handled via CSS background-color under the <Image>,
// so no JS error handler is required.
import Image from "next/image";
import { getHeroImage, IMAGE_SIZES } from "@/src/lib/images";
import type { HeroOverlay } from "@/src/types/images";

// ─── Overlay presets ─────────────────────────────────────────
// "cinematic" — strong bottom gradient: text sits on dark base, sky stays visible
// "dark"      — uniform semi-transparent veil: for modals / overlapping UI
// "premium"   — dual gradient: dark top bar + dark bottom, transparent middle
// "minimal"   — very light gradient: image is the star, text is secondary
// "none"      — no overlay: image rendered clean

const OVERLAY_CLASSES: Record<HeroOverlay, string> = {
  cinematic: "bg-gradient-to-t from-[#0F1115]/95 via-[#0F1115]/35 to-[#0F1115]/10",
  dark:      "bg-black/60",
  premium:   "bg-gradient-to-b from-[#0F1115]/60 via-transparent to-[#0F1115]/90",
  minimal:   "bg-gradient-to-t from-[#0F1115]/25 via-transparent to-transparent",
  none:      "",
};

// ─── Props ───────────────────────────────────────────────────

interface HeroImageProps {
  /** Pueblo slug — used to look up the manifest */
  slug: string;
  /**
   * Set true for the first above-the-fold image on a page.
   * Tells the browser to preload this image — critical for LCP.
   * Only one image per page should be priority=true.
   */
  priority?: boolean;
  /** Overlay style applied above the photograph */
  overlay?: HeroOverlay;
  /** Extra CSS classes applied to the root container */
  className?: string;
  /** Content rendered above the image (hero text, badges, etc.) */
  children?: React.ReactNode;
  /**
   * CSS object-position for cinematic framing.
   * Default "center 40%" keeps subjects above center, skies cropped.
   */
  objectPosition?: string;
  /**
   * sizes attribute — controls which srcset entry the browser picks.
   * Defaults to hero (100vw). Use IMAGE_SIZES.card for thumbnails.
   */
  sizes?: string;
}

// ─── Component ───────────────────────────────────────────────

export default function HeroImage({
  slug,
  priority = false,
  overlay = "cinematic",
  className = "",
  children,
  objectPosition = "center 40%",
  sizes = IMAGE_SIZES.hero,
}: HeroImageProps) {
  const image = getHeroImage(slug);

  // ── Fallback: no image in manifest ───────────────────────
  // Renders a color gradient matching the pueblo's palette.
  // Structurally identical to the image path so layout never shifts.
  if (!image) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ background: "linear-gradient(160deg, #0F1115 0%, #1A2418 50%, #0A1508 100%)" }}
      >
        {overlay !== "none" && (
          <div className={`absolute inset-0 ${OVERLAY_CLASSES[overlay]}`} aria-hidden="true" />
        )}
        {children && <div className="relative z-10 h-full flex flex-col">{children}</div>}
      </div>
    );
  }

  // ── Image path ────────────────────────────────────────────
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      // CSS background-color under the image — visible instantly.
      // If the image 404s or takes too long, this color shows through.
      style={{ backgroundColor: image.dominantColor }}
    >
      {/*
        next/image with fill + absolute positioning.
        - placeholder="blur" shows blurDataURL (color SVG) while loading
        - priority=true sets <link rel="preload"> in the <head> for LCP images
        - sizes tells the browser which srcset entry to use per viewport
        - quality=85 — visually lossless but ~35% smaller than quality=100
      */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        sizes={sizes}
        quality={85}
        style={{ objectFit: "cover", objectPosition }}
      />

      {/* Cinematic gradient veil — rendered above the image */}
      {overlay !== "none" && (
        <div
          className={`absolute inset-0 ${OVERLAY_CLASSES[overlay]}`}
          aria-hidden="true"
        />
      )}

      {/* Content slot — rendered above overlay */}
      {children && (
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      )}

      {/* Photo credit — bottom-right, ultra-subtle */}
      {image.credit && (
        <p
          className="absolute bottom-1.5 right-2 text-[9px] text-white/20 z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          {image.credit}
        </p>
      )}
    </div>
  );
}
