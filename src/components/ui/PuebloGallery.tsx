// Server Component
import Image from "next/image";
import { getPuebloImages, IMAGE_SIZES } from "@/src/lib/images";
import type { PuebloImageData } from "@/src/types/images";

// ─── Sub-components ──────────────────────────────────────────

interface GalleryImageProps {
  image: PuebloImageData;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

function GalleryImage({ image, priority = false, sizes, className = "" }: GalleryImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ backgroundColor: image.dominantColor }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        sizes={sizes}
        quality={85}
        style={{ objectFit: "cover", objectPosition: "center 45%" }}
        className="transition-transform duration-700 hover:scale-105"
      />
      {/* Subtle bottom gradient for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div
      className="relative rounded-lg border border-white/5 bg-white/2 flex items-center justify-center"
      aria-hidden="true"
    >
      <p className="text-white/15 text-xs text-center px-4">{label}</p>
    </div>
  );
}

// ─── Main gallery ────────────────────────────────────────────

interface PuebloGalleryProps {
  slug: string;
  nombrePueblo: string;
}

export default function PuebloGallery({ slug, nombrePueblo }: PuebloGalleryProps) {
  const images = getPuebloImages(slug);

  if (!images) {
    return null;
  }

  const { hero, gallery } = images;
  const hasGallery = gallery.length > 0;

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 pb-16"
      aria-labelledby="gallery-heading"
    >
      <h2
        id="gallery-heading"
        className="font-display text-2xl sm:text-3xl font-light text-white mb-6"
      >
        Galería fotográfica
      </h2>

      {/*
        Layout:
        - Desktop: 2/3 featured + 1/3 column with 2 smaller images
        - Mobile: stacked single column

        The featured image (hero) has priority=false here since it was already
        rendered with priority=true in PuebloHero — avoid double preload.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

        {/* Featured slot — hero image, 2/3 width */}
        <div className="lg:col-span-2">
          <GalleryImage
            image={hero}
            sizes={IMAGE_SIZES.galleryFeature}
            className="aspect-[16/10]"
          />
          <p className="mt-1.5 text-white/25 text-[10px] text-right">
            {hero.alt}
          </p>
        </div>

        {/* Secondary column — 2 stacked images, 1/3 width */}
        <div className="flex flex-col gap-3">
          {hasGallery ? (
            gallery.slice(0, 2).map((img, i) => (
              <div key={img.src} className="flex-1 min-h-0">
                <GalleryImage
                  image={img}
                  sizes={IMAGE_SIZES.galleryThumb}
                  className="h-full min-h-[180px]"
                />
                {i === 1 && img.alt && (
                  <p className="mt-1 text-white/20 text-[10px] line-clamp-1">{img.alt}</p>
                )}
              </div>
            ))
          ) : (
            <>
              <EmptySlot label={`Próximamente · ${nombrePueblo}`} />
              <EmptySlot label="Fotografías en proceso" />
            </>
          )}
        </div>
      </div>

      {/* Extra gallery row if more than 2 gallery images */}
      {hasGallery && gallery.length > 2 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
          {gallery.slice(2).map((img) => (
            <GalleryImage
              key={img.src}
              image={img}
              sizes={IMAGE_SIZES.galleryThumb}
              className="aspect-video"
            />
          ))}
        </div>
      )}

      {/* Attribution footer */}
      <p className="mt-3 text-white/15 text-[10px]">
        Fotografías: {hero.credit ?? "Unsplash / Picsum License"} · {nombrePueblo}, Ecuador
      </p>
    </section>
  );
}
