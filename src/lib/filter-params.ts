// ─── Filter URL serialization — pure functions, no browser/React deps ──────────
// Safe to import from Server Components or Client Components alike.

import type {
  FiltrosPueblos,
  Region,
  NivelDificultad,
  Clima,
  TipoActividad,
  TemporadaIdeal,
  Categoria,
} from "@/src/types";

// ─── Tag vocabularies ────────────────────────────────────────

export const EXPERIENCE_TAGS = [
  "Artesanías",
  "Patrimonio declarado",
  "Comunidades indígenas",
  "Gastronomía patrimonial",
  "Volcán o nevado",
  "Arquitectura colonial",
  "Ferrocarril patrimonial",
] as const;

export const BIODIVERSIDAD_TAGS = [
  "Área protegida",
  "Alta avifauna",
  "Fauna andina",
] as const;

export type ExperienceTag = (typeof EXPERIENCE_TAGS)[number];
export type BiodiversidadTag = (typeof BIODIVERSIDAD_TAGS)[number];
export type TagPueblo = ExperienceTag | BiodiversidadTag;

// ─── Altitude presets ────────────────────────────────────────

export type AltitudPreset = "low" | "mid" | "high";

export const ALTITUD_PRESETS: Record<AltitudPreset, { label: string; min?: number; max?: number }> = {
  low: { label: "< 1.500 m",      max: 1500 },
  mid: { label: "1.500–2.500 m",  min: 1500, max: 2500 },
  high: { label: "> 2.500 m",     min: 2500 },
};

export function getAltitudPreset(f: FiltrosPueblos): AltitudPreset | null {
  if (!f.altitudMin && f.altitudMax === 1500) return "low";
  if (f.altitudMin === 1500 && f.altitudMax === 2500) return "mid";
  if (f.altitudMin === 2500 && !f.altitudMax) return "high";
  return null;
}

export function altitudPresetToFilters(
  preset: AltitudPreset | null
): Pick<FiltrosPueblos, "altitudMin" | "altitudMax"> {
  if (!preset) return { altitudMin: undefined, altitudMax: undefined };
  const { min, max } = ALTITUD_PRESETS[preset];
  return { altitudMin: min, altitudMax: max };
}

// ─── Distance presets ────────────────────────────────────────

export const DISTANCIA_PRESETS = [100, 200, 400] as const;
export type DistanciaPreset = (typeof DISTANCIA_PRESETS)[number];

// ─── URL key map (short keys for clean URLs) ─────────────────

const K = {
  busqueda:       "q",
  region:         "r",
  dificultad:     "d",
  clima:          "c",
  tipoActividad:  "act",
  tags:           "t",
  altitudMin:     "alt_min",
  altitudMax:     "alt_max",
  distanciaMaxKm: "dist",
  temporada:      "tmp",
  categoria:      "cat",
} as const;

// ─── Parse ───────────────────────────────────────────────────

type SearchParamsLike = { get(k: string): string | null; getAll(k: string): string[] };

export function parseSearchParams(params: SearchParamsLike): FiltrosPueblos {
  const multi = <T extends string>(key: string) => {
    const vals = params.getAll(key) as T[];
    return vals.length > 0 ? vals : undefined;
  };
  const num = (key: string) => {
    const v = params.get(key);
    if (!v) return undefined;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  };
  const str = (key: string) => params.get(key) ?? undefined;

  return {
    busqueda:       str(K.busqueda),
    region:         multi<Region>(K.region),
    dificultad:     multi<NivelDificultad>(K.dificultad),
    clima:          multi<Clima>(K.clima),
    tipoActividad:  multi<TipoActividad>(K.tipoActividad),
    tags:           multi<string>(K.tags),
    altitudMin:     num(K.altitudMin),
    altitudMax:     num(K.altitudMax),
    distanciaMaxKm: num(K.distanciaMaxKm),
    temporada:      str(K.temporada) as TemporadaIdeal | undefined,
    categoria:      str(K.categoria) as Categoria | undefined,
  };
}

// ─── Serialize ───────────────────────────────────────────────

export function serializeFilters(f: FiltrosPueblos): URLSearchParams {
  const p = new URLSearchParams();
  const appendAll = (key: string, vals?: string[]) =>
    vals?.forEach((v) => p.append(key, v));

  if (f.busqueda) p.set(K.busqueda, f.busqueda);
  appendAll(K.region,        f.region);
  appendAll(K.dificultad,    f.dificultad);
  appendAll(K.clima,         f.clima);
  appendAll(K.tipoActividad, f.tipoActividad);
  appendAll(K.tags,          f.tags);
  if (f.altitudMin)     p.set(K.altitudMin,     String(f.altitudMin));
  if (f.altitudMax)     p.set(K.altitudMax,     String(f.altitudMax));
  if (f.distanciaMaxKm) p.set(K.distanciaMaxKm, String(f.distanciaMaxKm));
  if (f.temporada)      p.set(K.temporada,      f.temporada);
  if (f.categoria)      p.set(K.categoria,      f.categoria);

  return p;
}

// ─── Helpers ─────────────────────────────────────────────────

export function hayFiltrosActivos(f: FiltrosPueblos): boolean {
  return !!(
    f.busqueda ||
    (f.region?.length ?? 0) > 0 ||
    (f.dificultad?.length ?? 0) > 0 ||
    (f.clima?.length ?? 0) > 0 ||
    (f.tipoActividad?.length ?? 0) > 0 ||
    (f.tags?.length ?? 0) > 0 ||
    f.altitudMin != null ||
    f.altitudMax != null ||
    f.distanciaMaxKm != null ||
    f.temporada ||
    f.categoria
  );
}

export function contarFiltrosActivos(f: FiltrosPueblos): number {
  let n = 0;
  if (f.busqueda) n++;
  n += f.region?.length ?? 0;
  n += f.dificultad?.length ?? 0;
  n += f.clima?.length ?? 0;
  n += f.tipoActividad?.length ?? 0;
  n += f.tags?.length ?? 0;
  if (f.altitudMin != null || f.altitudMax != null) n++;
  if (f.distanciaMaxKm != null) n++;
  if (f.temporada) n++;
  if (f.categoria) n++;
  return n;
}
