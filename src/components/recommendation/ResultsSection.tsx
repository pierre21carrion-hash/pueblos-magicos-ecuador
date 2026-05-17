"use client";

import { motion } from "framer-motion";
import type { UseRecommendationReturn } from "@/src/hooks/useRecommendation";
import type { TipoViaje, DistanciaPreferida, PresupuestoViaje } from "@/src/lib/recommendation.service";
import RecommendationCard from "./RecommendationCard";

// ─── Preference summary labels ────────────────────────────────

const TIPO_LABELS: Record<TipoViaje, string> = {
  aventura:    "Aventura",
  naturaleza:  "Naturaleza",
  gastronomia: "Gastronomía",
  fotografia:  "Fotografía",
  descanso:    "Descanso",
  romantico:   "Romántico",
  familiar:    "Familiar",
  premium:     "Premium",
};

const DISTANCIA_LABELS: Record<DistanciaPreferida, string | null> = {
  corta:      "Cerca de Quito",
  media:      "Fin de semana",
  larga:      "Aventura larga",
  cualquiera: null,
};

const PRESUPUESTO_LABELS: Record<PresupuestoViaje, string | null> = {
  economico: "Presupuesto económico",
  moderado:  null,
  premium:   "Presupuesto premium",
};

// ─── Component ───────────────────────────────────────────────

interface ResultsSectionProps {
  api: UseRecommendationReturn;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

export default function ResultsSection({ api }: ResultsSectionProps) {
  const { results, prefs, reset, prev } = api;

  // Build preference chips from what the user actually selected
  const chips: string[] = [
    ...prefs.tiposViaje.map((t) => TIPO_LABELS[t]),
    ...(prefs.climaPreferido !== "cualquiera" ? [prefs.climaPreferido] : []),
    ...(DISTANCIA_LABELS[prefs.distancia] ? [DISTANCIA_LABELS[prefs.distancia]!] : []),
    ...prefs.actividades.map((a) => a.charAt(0).toUpperCase() + a.slice(1)),
    ...(prefs.dificultadMax !== "cualquiera" ? [`Dificultad ${prefs.dificultadMax}`] : []),
    ...(PRESUPUESTO_LABELS[prefs.presupuesto] ? [PRESUPUESTO_LABELS[prefs.presupuesto]!] : []),
  ];

  const top = results[0];
  const rest = results.slice(1);

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <p className="text-paramo text-xs uppercase tracking-[0.2em] font-medium mb-3">
          {results.length} destinos analizados
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-4">
          Tus recomendaciones
        </h2>
        <p className="text-white/40 text-sm max-w-xl">
          Ordenados por coincidencia con tus preferencias. Cada puntaje refleja
          cuán bien el destino encaja con lo que buscas.
        </p>

        {/* Preference chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-[11px] text-white/50 border border-white/10 px-3 py-1
                  rounded-full bg-white/3"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Featured top result */}
      {top && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-oro/70 font-medium mb-4">
            ✦ Coincidencia principal
          </p>
          <div className="max-w-2xl">
            <RecommendationCard result={top} rank={1} index={0} />
          </div>
        </motion.div>
      )}

      {/* Rest of results */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/6" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
              Más destinos
            </p>
            <div className="h-px flex-1 bg-white/6" />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {rest.map((result, i) => (
              <RecommendationCard
                key={result.pueblo.id}
                result={result}
                rank={i + 2}
                index={i + 1}
              />
            ))}
          </motion.div>
        </>
      )}

      {/* Footer actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="flex items-center gap-4 mt-12 pt-8 border-t border-white/6"
      >
        <button
          type="button"
          onClick={prev}
          className="text-sm text-white/35 hover:text-white/65 transition-colors
            flex items-center gap-2"
        >
          ← Ajustar preferencias
        </button>
        <button
          type="button"
          onClick={reset}
          className="text-sm text-white/25 hover:text-white/50 transition-colors
            border border-white/8 px-4 py-1.5 rounded-full hover:border-white/18"
        >
          Reiniciar quiz
        </button>
      </motion.div>
    </div>
  );
}
