// Server Component
import Link from "next/link";
import type { PuebloMagico } from "@/src/types";
import BadgeRegion from "@/src/components/ui/BadgeRegion";
import HeroImage from "@/src/components/ui/HeroImage";

interface PuebloHeroProps {
  pueblo: PuebloMagico;
}

export default function PuebloHero({ pueblo }: PuebloHeroProps) {
  const { nombre, provincia, region, narrativa, colorAcento, categoria, seo } = pueblo;

  return (
    <section
      aria-label={`Hero de ${nombre}`}
      className="min-h-[75svh]"
    >
      <HeroImage
        slug={seo.slug}
        priority={true}        // This is always the LCP element on pueblo pages
        overlay="cinematic"
        objectPosition="center 35%"
        className="min-h-[75svh]"
      >
        {/* ── Content rendered above the image ──────────────── */}
        <div className="flex min-h-[75svh] flex-col justify-between px-4 sm:px-6 pt-24 pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-white/30" role="list">
              <li>
                <Link href="/" className="hover:text-white/60 transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link href="/pueblos" className="hover:text-white/60 transition-colors">
                  Pueblos Mágicos
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li aria-current="page" className="text-white/60">
                {nombre}
              </li>
            </ol>
          </nav>

          {/* Main hero content — anchored to the bottom */}
          <div className="max-w-4xl mt-auto">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <BadgeRegion region={region} size="sm" />
              <span className="inline-flex items-center border border-white/10 rounded-full px-1.5 py-0.5 text-[10px] text-white/40 uppercase tracking-wide">
                {categoria}
              </span>
              <span className="inline-flex items-center border border-white/10 rounded-full px-1.5 py-0.5 text-[10px] text-white/35">
                {provincia}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight mb-5">
              {nombre}
            </h1>

            {/* Tagline */}
            <p
              className="text-base sm:text-xl font-serif italic leading-relaxed max-w-2xl text-white/82"
            >
              {narrativa.tagline}
            </p>

            {/* Accent rule */}
            <div
              className="mt-6 w-12 h-0.5 rounded-full"
              style={{ backgroundColor: colorAcento }}
              aria-hidden="true"
            />
          </div>
        </div>
      </HeroImage>
    </section>
  );
}
