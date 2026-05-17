import type { PuebloMagico, TipoActividad, Clima, NivelDificultad } from "@/src/types";
import { matchesTag } from "@/src/data/pueblos-magicos";

// ─── Preference types ─────────────────────────────────────────

export type TipoViaje =
  | "aventura"
  | "naturaleza"
  | "gastronomia"
  | "fotografia"
  | "descanso"
  | "romantico"
  | "familiar"
  | "premium";

export type DistanciaPreferida = "corta" | "media" | "larga" | "cualquiera";
export type PresupuestoViaje = "economico" | "moderado" | "premium";

export interface UserPreferences {
  tiposViaje: TipoViaje[];
  climaPreferido: Clima | "cualquiera";
  distancia: DistanciaPreferida;
  actividades: TipoActividad[];
  dificultadMax: NivelDificultad | "cualquiera";
  presupuesto: PresupuestoViaje;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  tiposViaje: [],
  climaPreferido: "cualquiera",
  distancia: "cualquiera",
  actividades: [],
  dificultadMax: "cualquiera",
  presupuesto: "moderado",
};

export interface ScoreBreakdown {
  tipoViaje: number;     // 0-30
  clima: number;         // 0-20
  distancia: number;     // 0-20
  actividades: number;   // 0-20
  accesibilidad: number; // 0-10
  tagAfinidad: number;   // 0-8  bonus dimension (tag similarity)
}

export interface RecommendationResult {
  pueblo: PuebloMagico;
  score: number;
  pct: number;
  breakdown: ScoreBreakdown;
  reasons: string[];
  badges: string[];
}

// ─── Helpers ──────────────────────────────────────────────────

const DIFF_ORDER: NivelDificultad[] = ["Fácil", "Moderado", "Difícil", "Muy difícil"];
const SCENIC_RELIEVES = ["Páramo", "Sierra alta", "Ceja de selva"] as const;

function hasActividad(pueblo: PuebloMagico, tipo: TipoActividad): boolean {
  return pueblo.atractivos.some((a) => a.tipo === tipo);
}

function hasHospedaje(pueblo: PuebloMagico, ...cats: string[]): boolean {
  return pueblo.hospedaje.some((h) => cats.includes(h.categoria));
}

// ─── TipoViaje scoring (0-30 per tipo) ───────────────────────

function scoreTipoOne(pueblo: PuebloMagico, tipo: TipoViaje): number {
  const { atractivos, gastronomia, ruta, topografia, biodiversidad, cultura } = pueblo;

  switch (tipo) {
    case "aventura": {
      let s = 0;
      if (hasActividad(pueblo, "aventura"))  s += 10;
      if (hasActividad(pueblo, "trekking"))  s += 8;
      const dr = DIFF_ORDER.indexOf(ruta.nivelDificultad);
      if (dr >= 2) s += 7;
      else if (dr === 1) s += 3;
      if (SCENIC_RELIEVES.some((r) => r === topografia.relieve)) s += 5;
      return Math.min(s, 30);
    }
    case "naturaleza": {
      let s = 0;
      if (biodiversidad.areaProtegida) s += 10;
      const aves = biodiversidad.especiesAves ?? 0;
      if (aves > 100) s += 10;
      else if (aves > 50) s += 7;
      else if (aves > 0)  s += 4;
      if ((biodiversidad.especiesIconicas?.length ?? 0) > 0) s += 6;
      if (hasActividad(pueblo, "naturaleza")) s += 4;
      return Math.min(s, 30);
    }
    case "gastronomia": {
      let s = 0;
      const pats = gastronomia.filter((g) => g.esPatrimonial);
      if (pats.length > 0)                     s += 10;
      if (gastronomia.length > 4)              s += 8;
      else if (gastronomia.length > 2)         s += 5;
      if (hasActividad(pueblo, "gastronómica")) s += 7;
      if ((cultura.artesaniaIconica?.length ?? 0) > 0) s += 5;
      return Math.min(s, 30);
    }
    case "fotografia": {
      let s = 0;
      if (hasActividad(pueblo, "fotografía"))  s += 10;
      if (SCENIC_RELIEVES.some((r) => r === topografia.relieve)) s += 8;
      if (topografia.referenciaGeografica)     s += 7;
      if (biodiversidad.areaProtegida)         s += 5;
      return Math.min(s, 30);
    }
    case "descanso": {
      let s = 0;
      if (hasHospedaje(pueblo, "Boutique"))           s += 10;
      if (ruta.nivelDificultad === "Fácil")            s += 8;
      if (pueblo.clima === "Templado andino")          s += 6;
      if (gastronomia.length > 2)                      s += 6;
      return Math.min(s, 30);
    }
    case "romantico": {
      let s = 0;
      if (hasHospedaje(pueblo, "Lujo"))               s += 12;
      else if (hasHospedaje(pueblo, "Boutique"))       s += 10;
      if (topografia.referenciaGeografica)             s += 7;
      if (pueblo.clima === "Templado andino")          s += 6;
      if (gastronomia.some((g) => g.esPatrimonial))   s += 5;
      return Math.min(s, 30);
    }
    case "familiar": {
      let s = 0;
      if (ruta.nivelDificultad === "Fácil")            s += 12;
      if (ruta.transporte.some((t) => t.tipo === "bus")) s += 8;
      if (hasHospedaje(pueblo, "Económico", "Mediogama")) s += 5;
      if (atractivos.length > 3)                       s += 5;
      return Math.min(s, 30);
    }
    case "premium": {
      let s = 0;
      if (hasHospedaje(pueblo, "Lujo"))               s += 15;
      if (hasHospedaje(pueblo, "Boutique"))            s += 10;
      const pats = gastronomia.filter((g) => g.esPatrimonial);
      if (pats.length > 1)                            s += 5;
      return Math.min(s, 30);
    }
  }
}

function scoreTipoViaje(pueblo: PuebloMagico, tipos: TipoViaje[]): number {
  if (!tipos.length) return 15;
  const scores = tipos.map((t) => scoreTipoOne(pueblo, t));
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

// ─── Clima scoring (0-20) ─────────────────────────────────────

const CLIMA_ADJACENT: Partial<Record<Clima, Clima[]>> = {
  "Frío de páramo":  ["Templado andino"],
  "Templado andino": ["Frío de páramo", "Cálido seco"],
  "Cálido seco":     ["Templado andino", "Cálido húmedo"],
  "Cálido húmedo":   ["Cálido seco", "Tropical"],
  "Tropical":        ["Cálido húmedo"],
};

function scoreClima(pueblo: PuebloMagico, pref: Clima | "cualquiera"): number {
  if (pref === "cualquiera") return 15;
  if (pueblo.clima === pref) return 20;
  if (CLIMA_ADJACENT[pref]?.includes(pueblo.clima)) return 10;
  return 2;
}

// ─── Distancia scoring (0-20) ─────────────────────────────────

function scoreDistancia(pueblo: PuebloMagico, pref: DistanciaPreferida): number {
  const km = pueblo.ruta.distanciaKm;
  switch (pref) {
    case "corta":
      if (km <= 80)  return 20;
      if (km <= 130) return 14;
      if (km <= 200) return 7;
      return 2;
    case "media":
      if (km >= 80 && km <= 250) return 20;
      if (km < 80)               return 12;
      if (km <= 320)             return 10;
      return 4;
    case "larga":
      if (km >= 220) return 20;
      if (km >= 160) return 14;
      if (km >= 100) return 7;
      return 2;
    case "cualquiera":
      return 15;
  }
}

// ─── Actividades scoring (0-20) ───────────────────────────────

function scoreActividades(pueblo: PuebloMagico, acts: TipoActividad[]): number {
  if (!acts.length) return 10;
  let total = 0;
  for (const act of acts) {
    const match = pueblo.atractivos.find((a) => a.tipo === act);
    if (match) total += match.prioridad === "imprescindible" ? 5 : 4;
  }
  return Math.min(total, 20);
}

// ─── Accesibilidad scoring (0-10) ────────────────────────────

function scoreAccesibilidad(
  pueblo: PuebloMagico,
  dificultadMax: NivelDificultad | "cualquiera",
  presupuesto: PresupuestoViaje,
): number {
  // Difficulty (0-6)
  let diffScore = 6;
  if (dificultadMax !== "cualquiera") {
    const userRank   = DIFF_ORDER.indexOf(dificultadMax);
    const puebloRank = DIFF_ORDER.indexOf(pueblo.ruta.nivelDificultad);
    if (puebloRank <= userRank)            diffScore = 6;
    else if (puebloRank === userRank + 1)  diffScore = 2;
    else                                    diffScore = 0;
  }

  // Presupuesto (0-4)
  let presScore = 2;
  switch (presupuesto) {
    case "economico":
      presScore = hasHospedaje(pueblo, "Económico", "Comunitario") ? 4
                : hasHospedaje(pueblo, "Mediogama") ? 2 : 1;
      break;
    case "moderado":
      presScore = hasHospedaje(pueblo, "Mediogama") ? 4
                : hasHospedaje(pueblo, "Económico", "Boutique") ? 3 : 2;
      break;
    case "premium":
      presScore = hasHospedaje(pueblo, "Lujo") ? 4
                : hasHospedaje(pueblo, "Boutique") ? 3 : 1;
      break;
  }

  return diffScore + presScore;
}

// ─── Tag affinity scoring (0-8 bonus) ────────────────────────
// Maps each TipoViaje to experience/biodiversity tags that signal alignment.

const TIPO_TAG_AFFINITY: Partial<Record<TipoViaje, string[]>> = {
  aventura:    ["Volcán o nevado"],
  naturaleza:  ["Área protegida", "Alta avifauna", "Fauna andina"],
  gastronomia: ["Gastronomía patrimonial", "Artesanías"],
  fotografia:  ["Volcán o nevado", "Patrimonio declarado"],
  descanso:    ["Gastronomía patrimonial"],
  romantico:   ["Arquitectura colonial", "Patrimonio declarado"],
  familiar:    ["Artesanías", "Comunidades indígenas"],
  premium:     ["Patrimonio declarado", "Arquitectura colonial"],
};

function scoreTagAffinity(pueblo: PuebloMagico, tipos: TipoViaje[]): number {
  if (!tipos.length) return 4; // Neutral
  const relevantTags = [...new Set(tipos.flatMap((t) => TIPO_TAG_AFFINITY[t] ?? []))];
  const matched = relevantTags.filter((tag) => matchesTag(pueblo, tag)).length;
  return Math.min(matched * 2, 8);
}

// ─── Reasons ─────────────────────────────────────────────────

function generateReasons(
  pueblo: PuebloMagico,
  prefs: UserPreferences,
  breakdown: ScoreBreakdown,
): string[] {
  const { tiposViaje, distancia, actividades } = prefs;
  const { gastronomia, biodiversidad, cultura, topografia, hospedaje, ruta } = pueblo;
  const reasons: string[] = [];

  // Climate match
  if (breakdown.clima === 20) {
    reasons.push(`Clima ${pueblo.clima.toLowerCase()} — exactamente lo que buscas`);
  } else if (breakdown.clima >= 10) {
    reasons.push(`Clima ${pueblo.clima.toLowerCase()} (${pueblo.temperaturaRango})`);
  }

  // Distance match with exact km
  if (breakdown.distancia >= 18) {
    const km = ruta.distanciaKm;
    if (distancia === "corta")  reasons.push(`${km} km de Quito — excursión de día en ${ruta.tiempoEstimado}`);
    if (distancia === "media")  reasons.push(`${km} km · ${ruta.tiempoEstimado} — ideal para un fin de semana`);
    if (distancia === "larga")  reasons.push(`${km} km · ${ruta.tiempoEstimado} — aventura completa`);
  }

  // TipoViaje specific reasons with real data
  if (tiposViaje.includes("aventura")) {
    if (topografia.referenciaGeografica) {
      reasons.push(`Referencia geográfica: ${topografia.referenciaGeografica}`);
    } else if (hasActividad(pueblo, "aventura")) {
      reasons.push(`Actividades de aventura disponibles en ${pueblo.ruta.nivelDificultad.toLowerCase()}`);
    }
  }
  if (tiposViaje.includes("naturaleza")) {
    if (biodiversidad.areaProtegida) {
      reasons.push(`Dentro de ${biodiversidad.areaProtegida}`);
    } else if ((biodiversidad.especiesAves ?? 0) > 0) {
      reasons.push(`${biodiversidad.especiesAves} especies de aves registradas`);
    } else if ((biodiversidad.especiesIconicas?.length ?? 0) > 0) {
      reasons.push(`Fauna: ${biodiversidad.especiesIconicas!.slice(0, 2).join(", ")}`);
    }
  }
  if (tiposViaje.includes("gastronomia")) {
    const pats = gastronomia.filter((g) => g.esPatrimonial);
    if (pats.length > 0) {
      reasons.push(`${pats.length === 1 ? pats[0].nombre : `${pats.length} platos patrimoniales`} — gastronomía declarada`);
    }
  }
  if (tiposViaje.includes("fotografia")) {
    if (topografia.referenciaGeografica) {
      reasons.push(`Paisaje: ${topografia.referenciaGeografica} — fotografía excepcional`);
    } else if (topografia.relieve === "Páramo" || topografia.relieve === "Sierra alta") {
      reasons.push(`Relieve de ${topografia.relieve.toLowerCase()} — escenarios únicos`);
    }
  }
  if (tiposViaje.includes("romantico")) {
    const suite = hospedaje.find((h) => h.categoria === "Lujo" || h.categoria === "Boutique");
    if (suite) reasons.push(`Hospedaje ${suite.categoria.toLowerCase()} disponible`);
  }
  if (tiposViaje.includes("familiar") && ruta.nivelDificultad === "Fácil") {
    reasons.push(`Acceso ${ruta.nivelDificultad.toLowerCase()} — apto para todas las edades`);
  }
  if (tiposViaje.includes("premium") && hasHospedaje(pueblo, "Lujo")) {
    reasons.push("Alojamiento de lujo disponible");
  }

  // Activity-specific reasons
  for (const act of actividades) {
    if (hasActividad(pueblo, act)) {
      const label = act.charAt(0).toUpperCase() + act.slice(1);
      if (!reasons.some((r) => r.toLowerCase().includes(act.toLowerCase()))) {
        reasons.push(`${label} — actividad confirmada en este destino`);
      }
    }
  }

  // Tag-based bonus reasons
  if (breakdown.tagAfinidad >= 4) {
    if (cultura.patrimonioDeclarado?.length && !reasons.some((r) => r.includes("patrimon"))) {
      reasons.push(`Patrimonio: ${cultura.patrimonioDeclarado[0]}`);
    }
  }

  return reasons.slice(0, 4);
}

// ─── Badges ───────────────────────────────────────────────────

function generateBadges(
  pueblo: PuebloMagico,
  prefs: UserPreferences,
  pct: number,
): string[] {
  const { gastronomia, biodiversidad, ruta, cultura } = pueblo;
  const badges: string[] = [];

  if (pct >= 85)      badges.push("Coincidencia perfecta");
  else if (pct >= 72) badges.push("Muy recomendado");

  if (prefs.tiposViaje.includes("aventura") && ruta.nivelDificultad !== "Fácil") {
    badges.push("Aventura activa");
  }
  if (biodiversidad.areaProtegida) badges.push("Área protegida");
  if (gastronomia.some((g) => g.esPatrimonial)) badges.push("Patrimonio gastronómico");
  if ((biodiversidad.especiesAves ?? 0) > 100)  badges.push("Paraíso ornitológico");
  if (hasHospedaje(pueblo, "Lujo"))             badges.push("Alojamiento de lujo");
  if (hasHospedaje(pueblo, "Boutique"))         badges.push("Hospedaje boutique");
  if (ruta.nivelDificultad === "Fácil")         badges.push("Fácil acceso");
  if ((cultura.pueblosIndigenas?.length ?? 0) > 0) badges.push("Cultura indígena viva");

  return badges.slice(0, 3);
}

// ─── Public API ───────────────────────────────────────────────

export function computeScore(
  pueblo: PuebloMagico,
  prefs: UserPreferences,
): RecommendationResult {
  const breakdown: ScoreBreakdown = {
    tipoViaje:    scoreTipoViaje(pueblo, prefs.tiposViaje),
    clima:        scoreClima(pueblo, prefs.climaPreferido),
    distancia:    scoreDistancia(pueblo, prefs.distancia),
    actividades:  scoreActividades(pueblo, prefs.actividades),
    accesibilidad: scoreAccesibilidad(pueblo, prefs.dificultadMax, prefs.presupuesto),
    tagAfinidad:  scoreTagAffinity(pueblo, prefs.tiposViaje),
  };

  const raw   = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const score = Math.min(raw, 100);
  const pct   = Math.round(score);

  return {
    pueblo,
    score,
    pct,
    breakdown,
    reasons: generateReasons(pueblo, prefs, breakdown),
    badges:  generateBadges(pueblo, prefs, pct),
  };
}

export function getRecommendations(
  prefs: UserPreferences,
  db: PuebloMagico[],
): RecommendationResult[] {
  return db
    .map((pueblo) => computeScore(pueblo, prefs))
    .sort((a, b) => b.score - a.score);
}
