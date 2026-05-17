"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecommendation } from "@/src/hooks/useRecommendation";
import RecommendationQuiz from "@/src/components/recommendation/RecommendationQuiz";
import ResultsSection from "@/src/components/recommendation/ResultsSection";
import { analytics } from "@/src/lib/analytics";
import { heroReveal, staggerBase, fadeUp } from "@/src/lib/motion";

export default function DescubrirClient() {
  const api = useRecommendation();

  // ── Analytics timing ────────────────────────────────────────
  const quizStartMs  = useRef<number>(Date.now());
  const stepStartMs  = useRef<number>(Date.now());
  const hasTracked   = useRef(false);

  // Track step views
  useEffect(() => {
    if (api.isComplete) return;
    analytics.quizStepView(api.step);
    stepStartMs.current = Date.now();
  }, [api.step, api.isComplete]);

  // Track quiz completion
  useEffect(() => {
    if (!api.isComplete || hasTracked.current) return;
    hasTracked.current = true;
    const totalMs = Date.now() - quizStartMs.current;
    analytics.quizComplete(
      totalMs,
      api.prefs.tiposViaje.join(","),
      api.prefs.climaPreferido,
      api.prefs.distancia,
    );
    analytics.recommendationView(api.results.length, api.results[0]?.pct ?? 0);
  }, [api.isComplete, api.results, api.prefs]);

  // Track reset
  const handleReset = () => {
    analytics.quizReset();
    quizStartMs.current = Date.now();
    stepStartMs.current = Date.now();
    hasTracked.current  = false;
    api.reset();
  };

  // Track back from results
  const handlePrev = () => {
    if (api.isComplete) {
      hasTracked.current = false;
    } else {
      const ms = Date.now() - stepStartMs.current;
      analytics.quizStepBack(api.step);
      // Re-use step_complete timing for the back action
      void ms;
    }
    api.prev();
  };

  // Expose patched api to children (replace reset + prev)
  const patchedApi = { ...api, reset: handleReset, prev: handlePrev };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Page header */}
        <motion.header
          className="mb-14"
          initial="hidden"
          animate="visible"
          variants={staggerBase}
        >
          <motion.p
            variants={fadeUp}
            className="text-paramo text-xs uppercase tracking-[0.2em] mb-3 font-medium"
          >
            Recomendador inteligente · Algoritmo ponderado
          </motion.p>
          <motion.h1
            variants={heroReveal}
            className="font-display text-4xl sm:text-5xl font-light text-white mb-3"
          >
            Descubre tu destino ideal
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/40 text-sm max-w-xl"
          >
            Responde unas preguntas y nuestro algoritmo de scoring ponderado
            encontrará los Pueblos Mágicos del Ecuador que mejor se adaptan a ti.
          </motion.p>
        </motion.header>

        {/* Quiz ↔ Results with cinematic transition */}
        <AnimatePresence mode="wait">
          {!api.isComplete ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <RecommendationQuiz api={patchedApi} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResultsSection api={patchedApi} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
