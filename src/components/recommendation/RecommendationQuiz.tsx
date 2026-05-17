"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { TipoActividad, Clima, NivelDificultad } from "@/src/types";
import type {
  TipoViaje,
  DistanciaPreferida,
  PresupuestoViaje,
} from "@/src/lib/recommendation.service";
import type { UseRecommendationReturn } from "@/src/hooks/useRecommendation";
import { TOTAL_STEPS } from "@/src/hooks/useRecommendation";

// ─── Static option data ───────────────────────────────────────

interface Option<T> {
  value: T;
  icon: string;
  label: string;
  sub?: string;
}

const TIPO_VIAJE_OPTIONS: Option<TipoViaje>[] = [
  { value: "aventura",    icon: "🏔️", label: "Aventura",    sub: "Adrenalina y exploración" },
  { value: "naturaleza",  icon: "🌿", label: "Naturaleza",  sub: "Fauna, flora, paisajes" },
  { value: "gastronomia", icon: "🍽️", label: "Gastronomía", sub: "Sabores y tradición" },
  { value: "fotografia",  icon: "📷", label: "Fotografía",  sub: "Paisajes únicos" },
  { value: "descanso",    icon: "🌅", label: "Descanso",    sub: "Paz y bienestar" },
  { value: "romantico",   icon: "💫", label: "Romántico",   sub: "Escapada en pareja" },
  { value: "familiar",    icon: "🏡", label: "Familiar",    sub: "Para toda la familia" },
  { value: "premium",     icon: "⭐", label: "Premium",     sub: "Lujo y exclusividad" },
];

const CLIMA_OPTIONS: Option<Clima | "cualquiera">[] = [
  { value: "Frío de páramo",  icon: "❄️", label: "Frío de páramo",  sub: "< 10 °C · Páramos y nevados" },
  { value: "Templado andino", icon: "🌤️", label: "Templado andino", sub: "10–20 °C · Ideal todo el año" },
  { value: "Cálido seco",     icon: "☀️", label: "Cálido seco",     sub: "20–30 °C · Soleado y árido" },
  { value: "Cálido húmedo",   icon: "🌿", label: "Cálido húmedo",   sub: "22–28 °C · Verde y tropical" },
  { value: "cualquiera",      icon: "🌈", label: "Sin preferencia", sub: "Sorpréndeme con cualquier clima" },
];

const DISTANCIA_OPTIONS: Option<DistanciaPreferida>[] = [
  { value: "corta",      icon: "⚡", label: "Cerca",         sub: "< 100 km · Excursión de día" },
  { value: "media",      icon: "🗓️", label: "Fin de semana", sub: "100–250 km · Escapada de 2–3 días" },
  { value: "larga",      icon: "🌍", label: "Aventura larga", sub: "250+ km · Viaje completo" },
  { value: "cualquiera", icon: "🎲", label: "Sin restricción", sub: "Me adapto a cualquier distancia" },
];

const ACTIVIDAD_OPTIONS: Option<TipoActividad>[] = [
  { value: "aventura",          icon: "🧗", label: "Aventura" },
  { value: "trekking",          icon: "🥾", label: "Trekking" },
  { value: "fotografía",        icon: "📸", label: "Fotografía" },
  { value: "gastronómica",      icon: "🍱", label: "Gastronomía" },
  { value: "naturaleza",        icon: "🦅", label: "Naturaleza" },
  { value: "cultural",          icon: "🏛️", label: "Cultura" },
  { value: "historia",          icon: "📜", label: "Historia" },
  { value: "artesanía",         icon: "🧶", label: "Artesanías" },
];

const DIFICULTAD_OPTIONS: Option<NivelDificultad | "cualquiera">[] = [
  { value: "Fácil",      icon: "🟢", label: "Fácil",      sub: "Accesible para todos" },
  { value: "Moderado",   icon: "🟡", label: "Moderado",   sub: "Algo de esfuerzo físico" },
  { value: "Difícil",    icon: "🔴", label: "Difícil",    sub: "Para aventureros" },
  { value: "cualquiera", icon: "⚡", label: "Cualquiera", sub: "Sin límites" },
];

const PRESUPUESTO_OPTIONS: Option<PresupuestoViaje>[] = [
  { value: "economico", icon: "💚", label: "Económico", sub: "< $40 / noche" },
  { value: "moderado",  icon: "💛", label: "Moderado",  sub: "$40–120 / noche" },
  { value: "premium",   icon: "⭐", label: "Premium",   sub: "$120+ / noche" },
];

// ─── Option card ──────────────────────────────────────────────

interface OptionCardProps {
  icon: string;
  label: string;
  sub?: string;
  selected: boolean;
  compact?: boolean;
  onClick: () => void;
}

function OptionCard({ icon, label, sub, selected, compact = false, onClick }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border
        transition-colors duration-200 text-center cursor-pointer select-none
        ${compact ? "p-3" : "p-4 sm:p-5"}
        ${selected
          ? "border-oro/60 bg-oro/8 text-white shadow-lg shadow-oro/10"
          : "border-white/10 bg-white/2 text-white/55 hover:border-white/22 hover:bg-white/5 hover:text-white/80"
        }`}
    >
      <span className={compact ? "text-2xl" : "text-3xl sm:text-4xl"}>{icon}</span>
      <span className={`font-medium leading-tight ${compact ? "text-[11px]" : "text-xs sm:text-sm"}`}>
        {label}
      </span>
      {sub && !compact && (
        <span className="text-[10px] opacity-50 leading-tight">{sub}</span>
      )}
    </motion.button>
  );
}

// ─── Step content ─────────────────────────────────────────────

interface StepProps {
  prefs: UseRecommendationReturn["prefs"];
  setTiposViaje: UseRecommendationReturn["setTiposViaje"];
  setClima: UseRecommendationReturn["setClima"];
  setDistancia: UseRecommendationReturn["setDistancia"];
  setActividades: UseRecommendationReturn["setActividades"];
  setDificultad: UseRecommendationReturn["setDificultad"];
  setPresupuesto: UseRecommendationReturn["setPresupuesto"];
}

function Step1({ prefs, setTiposViaje }: StepProps) {
  const toggle = (v: TipoViaje) =>
    setTiposViaje(
      prefs.tiposViaje.includes(v)
        ? prefs.tiposViaje.filter((t) => t !== v)
        : [...prefs.tiposViaje, v],
    );
  return (
    <div>
      <StepHeader
        step={1}
        question="¿Qué tipo de experiencia buscas?"
        hint="Selecciona una o varias"
        required
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {TIPO_VIAJE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            {...opt}
            selected={prefs.tiposViaje.includes(opt.value)}
            onClick={() => toggle(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Step2({ prefs, setClima }: StepProps) {
  return (
    <div>
      <StepHeader step={2} question="¿Qué clima prefieres?" hint="Elige uno" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
        {CLIMA_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            {...opt}
            selected={prefs.climaPreferido === opt.value}
            onClick={() => setClima(opt.value as Clima | "cualquiera")}
          />
        ))}
      </div>
    </div>
  );
}

function Step3({ prefs, setDistancia }: StepProps) {
  return (
    <div>
      <StepHeader step={3} question="¿Cuánto tiempo tienes para viajar?" hint="Elige uno" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {DISTANCIA_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            {...opt}
            selected={prefs.distancia === opt.value}
            onClick={() => setDistancia(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Step4({ prefs, setActividades }: StepProps) {
  const toggle = (v: TipoActividad) =>
    setActividades(
      prefs.actividades.includes(v)
        ? prefs.actividades.filter((a) => a !== v)
        : [...prefs.actividades, v],
    );
  return (
    <div>
      <StepHeader step={4} question="¿Qué actividades te apasionan?" hint="Elige las que quieras" />
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 mt-8">
        {ACTIVIDAD_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            {...opt}
            compact
            selected={prefs.actividades.includes(opt.value)}
            onClick={() => toggle(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Step5({ prefs, setDificultad, setPresupuesto }: StepProps) {
  return (
    <div className="space-y-8">
      <div>
        <StepHeader step={5} question="¿Cuál es tu nivel de aventura?" hint="Elige uno" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {DIFICULTAD_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              {...opt}
              selected={prefs.dificultadMax === opt.value}
              onClick={() =>
                setDificultad(opt.value as NivelDificultad | "cualquiera")
              }
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-white/40 text-sm font-medium mb-4">¿Y tu presupuesto por noche?</p>
        <div className="grid grid-cols-3 gap-3">
          {PRESUPUESTO_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              {...opt}
              selected={prefs.presupuesto === opt.value}
              onClick={() => setPresupuesto(opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepHeader({
  step,
  question,
  hint,
  required = false,
}: {
  step: number;
  question: string;
  hint: string;
  required?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-paramo text-[10px] uppercase tracking-[0.2em] font-medium">
          Paso {step} de {TOTAL_STEPS}
        </span>
        {required && (
          <span className="text-[10px] text-white/25 border border-white/10 px-2 py-0.5 rounded-full">
            Requerido
          </span>
        )}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-light text-white leading-tight">
        {question}
      </h2>
      <p className="text-white/35 text-sm mt-2">{hint}</p>
    </div>
  );
}

// ─── Main quiz ────────────────────────────────────────────────

interface RecommendationQuizProps {
  api: UseRecommendationReturn;
}

const STEP_DIR = { initial: { opacity: 0, x: 32, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit:    { opacity: 0, x: -32, filter: "blur(4px)" },
};

export default function RecommendationQuiz({ api }: RecommendationQuizProps) {
  const {
    step, prefs, canPrev,
    setTiposViaje, setClima, setDistancia,
    setActividades, setDificultad, setPresupuesto,
    next, prev, goToResults,
  } = api;

  const stepProps: StepProps = {
    prefs,
    setTiposViaje,
    setClima,
    setDistancia,
    setActividades,
    setDificultad,
    setPresupuesto,
  };

  const isStep1Required = step === 1 && prefs.tiposViaje.length === 0;
  const progressPct = ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="h-px bg-white/6 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-oro rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor: i < step
                  ? "rgba(201,168,76,0.9)"
                  : i === step - 1
                  ? "rgba(201,168,76,0.5)"
                  : "rgba(255,255,255,0.08)",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Step content with slide transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={STEP_DIR.initial}
          animate={STEP_DIR.animate}
          exit={STEP_DIR.exit}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 1 && <Step1 {...stepProps} />}
          {step === 2 && <Step2 {...stepProps} />}
          {step === 3 && <Step3 {...stepProps} />}
          {step === 4 && <Step4 {...stepProps} />}
          {step === 5 && <Step5 {...stepProps} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/6">
        {/* Back */}
        {canPrev ? (
          <motion.button
            type="button"
            onClick={prev}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-sm text-white/35 hover:text-white/65
              transition-colors"
          >
            ← Anterior
          </motion.button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          {/* Skip (optional steps 2-4) */}
          {step > 1 && step < TOTAL_STEPS && (
            <motion.button
              type="button"
              onClick={next}
              whileTap={{ scale: 0.97 }}
              className="text-[11px] text-white/25 hover:text-white/50 transition-colors px-3 py-1.5
                border border-white/8 rounded-full hover:border-white/15"
            >
              Saltar
            </motion.button>
          )}

          {/* Skip to results (from step 2+) */}
          {step >= 2 && (
            <motion.button
              type="button"
              onClick={goToResults}
              whileTap={{ scale: 0.97 }}
              className="text-[11px] text-white/35 hover:text-white/60 transition-colors"
            >
              Ver resultados →
            </motion.button>
          )}

          {/* Next / Submit */}
          <motion.button
            type="button"
            onClick={next}
            disabled={isStep1Required}
            whileHover={isStep1Required ? {} : { scale: 1.03 }}
            whileTap={isStep1Required ? {} : { scale: 0.97 }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
              ${isStep1Required
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-oro text-carbon hover:bg-oro/90 shadow-lg shadow-oro/20"
              }`}
          >
            {step === TOTAL_STEPS ? "Ver mis recomendaciones" : "Siguiente →"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
