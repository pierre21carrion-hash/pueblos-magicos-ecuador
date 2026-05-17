"use client";

import { useState, useMemo, useCallback } from "react";
import type { TipoActividad, Clima, NivelDificultad } from "@/src/types";
import {
  DEFAULT_PREFERENCES,
  getRecommendations,
  type UserPreferences,
  type TipoViaje,
  type DistanciaPreferida,
  type PresupuestoViaje,
  type RecommendationResult,
} from "@/src/lib/recommendation.service";
import { pueblosMagicosDB } from "@/src/data/pueblos-magicos";

// Evaluated once on the client — static DB array transform
const DB = pueblosMagicosDB;

export const TOTAL_STEPS = 5;

export interface UseRecommendationReturn {
  step: number;
  prefs: UserPreferences;
  results: RecommendationResult[];
  isComplete: boolean;
  canNext: boolean;
  canPrev: boolean;
  setTiposViaje: (tipos: TipoViaje[]) => void;
  setClima: (clima: Clima | "cualquiera") => void;
  setDistancia: (d: DistanciaPreferida) => void;
  setActividades: (acts: TipoActividad[]) => void;
  setDificultad: (d: NivelDificultad | "cualquiera") => void;
  setPresupuesto: (p: PresupuestoViaje) => void;
  next: () => void;
  prev: () => void;
  goToResults: () => void;
  reset: () => void;
}

export function useRecommendation(): UseRecommendationReturn {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isComplete, setIsComplete] = useState(false);

  const results = useMemo(
    () => (isComplete ? getRecommendations(prefs, DB) : []),
    [isComplete, prefs],
  );

  const setTiposViaje = useCallback(
    (tipos: TipoViaje[]) => setPrefs((p) => ({ ...p, tiposViaje: tipos })),
    [],
  );
  const setClima = useCallback(
    (c: Clima | "cualquiera") => setPrefs((p) => ({ ...p, climaPreferido: c })),
    [],
  );
  const setDistancia = useCallback(
    (d: DistanciaPreferida) => setPrefs((p) => ({ ...p, distancia: d })),
    [],
  );
  const setActividades = useCallback(
    (acts: TipoActividad[]) => setPrefs((p) => ({ ...p, actividades: acts })),
    [],
  );
  const setDificultad = useCallback(
    (d: NivelDificultad | "cualquiera") =>
      setPrefs((p) => ({ ...p, dificultadMax: d })),
    [],
  );
  const setPresupuesto = useCallback(
    (ps: PresupuestoViaje) => setPrefs((p) => ({ ...p, presupuesto: ps })),
    [],
  );

  const next = useCallback(() => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else setIsComplete(true);
  }, [step]);

  const prev = useCallback(() => {
    if (isComplete) setIsComplete(false);
    else if (step > 1) setStep((s) => s - 1);
  }, [step, isComplete]);

  const goToResults = useCallback(() => setIsComplete(true), []);

  const reset = useCallback(() => {
    setStep(1);
    setPrefs(DEFAULT_PREFERENCES);
    setIsComplete(false);
  }, []);

  return {
    step,
    prefs,
    results,
    isComplete,
    canNext: step <= TOTAL_STEPS,
    canPrev: step > 1 || isComplete,
    setTiposViaje,
    setClima,
    setDistancia,
    setActividades,
    setDificultad,
    setPresupuesto,
    next,
    prev,
    goToResults,
    reset,
  };
}
