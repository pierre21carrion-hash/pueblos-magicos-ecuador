"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { RecommendationResult } from "@/src/lib/recommendation.service";
import BadgeRegion from "@/src/components/ui/BadgeRegion";
import MatchScoreRing from "./MatchScoreRing";
import { analytics } from "@/src/lib/analytics";

interface RecommendationCardProps {
  result: RecommendationResult;
  rank: number;
  index: number;
}

const RANK_LABELS: Record<number, string> = {
  1: "✦ Mejor coincidencia",
  2: "Muy recomendado",
  3: "Excelente opción",
};

export default function RecommendationCard({ result, rank, index }: RecommendationCardProps) {
  const { pueblo, pct, reasons, badges, breakdown } = result;
  const { nombre, provincia, region, colorAcento, seo, multimedia, ruta } = pueblo;

  const isTop = rank === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group flex flex-col rounded-2xl overflow-hidden border transition-colors duration-300
        ${isTop
          ? "border-oro/30 shadow-xl shadow-oro/5"
          : "border-white/8 hover:border-white/18"
        }`}
      style={{
        background: isTop
          ? "linear-gradient(160deg, rgba(201,168,76,0.06) 0%, rgba(15,17,21,1) 50%)"
          : undefined,
        backgroundColor: isTop ? undefined : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={multimedia.heroImage}
          alt={nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Rank chip */}
        {rank <= 3 && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full
                ${rank === 1
                  ? "bg-oro text-carbon"
                  : "bg-white/12 text-white/75 backdrop-blur-sm border border-white/15"
                }`}
            >
              {RANK_LABELS[rank]}
            </span>
          </div>
        )}

        {/* Score ring */}
        <div className="absolute top-2.5 right-3">
          <MatchScoreRing pct={pct} size={60} strokeWidth={4} />
        </div>

        {/* Region badge */}
        <div className="absolute bottom-3 left-3">
          <BadgeRegion region={region} size="sm" />
        </div>

        {/* Distance pill */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] text-white/55 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded font-medium">
            {ruta.distanciaKm} km · {ruta.nivelDificultad}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Name */}
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">{provincia}</p>
          <h3 className="font-display text-2xl font-medium text-white leading-tight">
            <Link
              href={`/pueblos/${seo.slug}`}
              className="hover:text-white/80 transition-colors"
            >
              {nombre}
            </Link>
          </h3>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <span
                key={badge}
                className="text-[10px] px-2 py-0.5 rounded-full border border-white/10
                  text-white/45 bg-white/3"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Score breakdown mini-bars */}
        <div className="space-y-1.5">
          {(
            [
              { label: "Experiencia", value: breakdown.tipoViaje, max: 30 },
              { label: "Clima", value: breakdown.clima, max: 20 },
              { label: "Distancia", value: breakdown.distancia, max: 20 },
              { label: "Actividades", value: breakdown.actividades, max: 20 },
              { label: "Afinidad", value: breakdown.tagAfinidad, max: 8 },
            ] as const
          ).map(({ label, value, max }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[9px] text-white/30 w-16 shrink-0">{label}</span>
              <div className="flex-1 h-0.5 rounded-full bg-white/6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: colorAcento }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / max) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.09 + 0.3, ease: "easeOut" }}
                />
              </div>
              <span className="text-[9px] text-white/25 w-6 text-right tabular-nums">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Reasons */}
        {reasons.length > 0 && (
          <ul className="space-y-1.5 mt-auto">
            {reasons.slice(0, 3).map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-[11px] text-white/50 leading-snug">
                <span className="text-verde shrink-0 mt-px font-bold">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/6 mt-auto">
          <div
            className="h-0.5 w-8 rounded-full"
            style={{ backgroundColor: colorAcento }}
            aria-hidden="true"
          />
          <Link
            href={`/pueblos/${seo.slug}`}
            onClick={() => analytics.recommendationClick(pueblo.id, nombre, rank, pct)}
            className="inline-flex items-center gap-1 text-[11px] font-medium transition-colors
              hover:opacity-80 group/cta"
            style={{ color: colorAcento }}
            aria-label={`Explorar ${nombre}`}
          >
            Explorar destino
            <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
