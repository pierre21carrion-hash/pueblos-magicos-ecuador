// Server Component
import Link from "next/link";
import type { PuebloCard } from "@/src/types";
import BadgeRegion from "@/src/components/ui/BadgeRegion";
import HeroImage from "@/src/components/ui/HeroImage";
import SelectButton from "@/src/components/comparar/SelectButton";
import { IMAGE_SIZES } from "@/src/lib/images";

interface PuebloCardProps {
  pueblo: PuebloCard;
  /**
   * Mark true for the first 1–4 cards visible above the fold.
   * Triggers next/image priority preload for LCP improvement.
   */
  priority?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  "Fácil":        "#3F7D44",
  "Moderado":     "#E8B040",
  "Difícil":      "#C76139",
  "Muy difícil":  "#8B1A1A",
};

export default function PuebloCard({ pueblo, priority = false }: PuebloCardProps) {
  const { id, nombre, provincia, region, topografia, ruta, narrativa, colorAcento, seo } = pueblo;

  return (
    <article
      className="group flex flex-col rounded-lg border border-white/8 overflow-hidden
                 bg-carbon-light hover:border-white/20 transition-all duration-300
                 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/60"
    >
      {/* ── Thumbnail image ─────────────────────────────────── */}
      {/*
        HeroImage renders next/image with fill — needs a parent with
        explicit dimensions. aspect-[16/10] gives a cinematic 1.6:1 ratio.
        The "card" sizes string prevents the browser downloading a full
        1920px image when only 400px of screen real estate is available.
      */}
      <Link
        href={`/pueblos/${seo.slug}`}
        className="block aspect-[16/10] relative overflow-hidden rounded-t-lg"
        tabIndex={-1}
        aria-hidden="true"
      >
        <HeroImage
          slug={seo.slug}
          priority={priority}
          overlay="minimal"
          objectPosition="center 40%"
          sizes={IMAGE_SIZES.card}
          className="absolute inset-0"
        >
          {/* Overlaid badges */}
          <div className="flex flex-col justify-between h-full p-3">
            <div className="flex items-start justify-between">
              <BadgeRegion region={region} size="sm" />
              <span className="text-[10px] text-white/60 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded font-medium">
                {topografia.altitudMsnm.toLocaleString("es")} m
              </span>
            </div>
            <div className="flex justify-end">
              <SelectButton id={id} nombre={nombre} />
            </div>
          </div>
        </HeroImage>

        {/* Accent rule at bottom of image */}
        <div
          className="absolute bottom-0 inset-x-0 h-0.5"
          style={{ backgroundColor: colorAcento }}
          aria-hidden="true"
        />
      </Link>

      {/* ── Card body ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Province + Name */}
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">
            {provincia}
          </p>
          <h2 className="font-display text-xl font-medium text-white leading-tight">
            <Link
              href={`/pueblos/${seo.slug}`}
              className="hover:text-white/80 transition-colors"
            >
              {nombre}
            </Link>
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-white/50 text-xs leading-relaxed italic line-clamp-2">
          {narrativa.tagline}
        </p>

        {/* Stats row */}
        <dl className="flex items-center gap-3 text-[11px] text-white/30 mt-auto pt-1 border-t border-white/5">
          <div className="flex items-center gap-1">
            <dt className="sr-only">Altitud</dt>
            <span aria-hidden="true" className="text-white/20">↑</span>
            <dd>{topografia.altitudMsnm.toLocaleString("es")} m</dd>
          </div>
          <div className="flex items-center gap-1">
            <dt className="sr-only">Distancia desde Quito</dt>
            <span aria-hidden="true" className="text-white/20">⊙</span>
            <dd>{ruta.distanciaKm} km</dd>
          </div>
          <div className="ml-auto">
            <dt className="sr-only">Dificultad</dt>
            <dd
              className="text-[10px] font-medium"
              style={{ color: DIFFICULTY_COLORS[ruta.nivelDificultad] ?? "#E8B040" }}
            >
              {ruta.nivelDificultad}
            </dd>
          </div>
        </dl>

        {/* CTA */}
        <Link
          href={`/pueblos/${seo.slug}`}
          className="group/cta inline-flex items-center gap-1 text-[11px] font-medium transition-colors mt-1"
          style={{ color: colorAcento }}
          aria-label={`Explorar ${nombre}`}
        >
          Explorar destino
          <span
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
