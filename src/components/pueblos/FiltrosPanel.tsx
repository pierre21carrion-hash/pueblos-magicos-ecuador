"use client";

import type { Clima, NivelDificultad, Region, TipoActividad } from "@/src/types";
import type { AltitudPreset } from "@/src/lib/filter-params";
import {
  ALTITUD_PRESETS,
  BIODIVERSIDAD_TAGS,
  DISTANCIA_PRESETS,
  EXPERIENCE_TAGS,
} from "@/src/lib/filter-params";
import type { PuebloFiltersAPI } from "@/src/hooks/usePuebloFilters";

// ─── Static option lists ──────────────────────────────────────

const REGIONES: Region[] = ["Sierra", "Costa", "Amazonía", "Galápagos"];

const DIFICULTADES: NivelDificultad[] = ["Fácil", "Moderado", "Difícil", "Muy difícil"];

const CLIMAS: Clima[] = [
  "Frío de páramo",
  "Templado andino",
  "Cálido húmedo",
  "Cálido seco",
  "Tropical",
];

const ACTIVIDADES: TipoActividad[] = [
  "aventura",
  "trekking",
  "naturaleza",
  "cultural",
  "historia",
  "artesanía",
  "gastronómica",
  "fotografía",
  "espiritual",
  "deportes acuáticos",
];

const REGION_COLORS: Record<string, string> = {
  Sierra:    "#3F7D44",
  Costa:     "#E8B040",
  Amazonía:  "#3D8BCD",
  Galápagos: "#2D8BA0",
};

const DIFICULTAD_COLORS: Record<string, string> = {
  "Fácil":       "#3F7D44",
  "Moderado":    "#E8B040",
  "Difícil":     "#C76139",
  "Muy difícil": "#8B1A1A",
};

// ─── Sub-components ───────────────────────────────────────────

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

function Section({ label, children }: SectionProps) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2 font-medium">
        {label}
      </p>
      {children}
    </div>
  );
}

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}

function Chip({ label, active, onClick, color }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-2.5 py-1 text-[11px] rounded-full border transition-all duration-150 whitespace-nowrap ${
        active
          ? "text-white border-transparent"
          : "text-white/35 border-white/8 hover:border-white/20 hover:text-white/60"
      }`}
      style={
        active && color
          ? { backgroundColor: color + "28", borderColor: color + "55", color }
          : active
          ? { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }
          : {}
      }
    >
      {label}
    </button>
  );
}

// ─── Props ────────────────────────────────────────────────────

type FiltrosPanelProps = Pick<
  PuebloFiltersAPI,
  | "filtros"
  | "searchInput"
  | "hayFiltros"
  | "altitudPreset"
  | "isPending"
  | "resetFilters"
  | "toggleRegion"
  | "toggleDificultad"
  | "toggleClima"
  | "toggleActividad"
  | "toggleTag"
  | "setAltitudPreset"
  | "setDistanciaMax"
  | "handleSearchChange"
> & { totalResultados: number };

// ─── Main component ───────────────────────────────────────────

export default function FiltrosPanel({
  filtros,
  searchInput,
  hayFiltros,
  altitudPreset,
  isPending,
  resetFilters,
  toggleRegion,
  toggleDificultad,
  toggleClima,
  toggleActividad,
  toggleTag,
  setAltitudPreset,
  setDistanciaMax,
  handleSearchChange,
  totalResultados,
}: FiltrosPanelProps) {
  const distanciaActiva = filtros.distanciaMaxKm ?? null;

  return (
    <div className="space-y-5" role="search" aria-label="Filtros de destinos">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Filtros</p>
        <div className="flex items-center gap-3">
          {hayFiltros && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[10px] text-white/30 hover:text-white/60 transition-colors underline-offset-2 hover:underline"
            >
              Limpiar
            </button>
          )}
          <span
            className={`text-[10px] transition-opacity ${isPending ? "opacity-40" : "text-white/30"}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {totalResultados} destino{totalResultados !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Search ─────────────────────────────────────────── */}
      <div className="relative">
        <span
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20 text-xs pointer-events-none select-none"
          aria-hidden="true"
        >
          ⌕
        </span>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar destino…"
          className="w-full bg-white/4 border border-white/8 rounded-lg pl-7 pr-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
          aria-label="Buscar destinos por nombre, provincia o descripción"
        />
      </div>

      <div className="h-px bg-white/5" aria-hidden="true" />

      {/* ── Región ─────────────────────────────────────────── */}
      <Section label="Región">
        <div className="flex flex-wrap gap-1.5">
          {REGIONES.map((r) => (
            <Chip
              key={r}
              label={r}
              active={!!filtros.region?.includes(r)}
              onClick={() => toggleRegion(r)}
              color={REGION_COLORS[r]}
            />
          ))}
        </div>
      </Section>

      {/* ── Dificultad ─────────────────────────────────────── */}
      <Section label="Dificultad de acceso">
        <div className="flex flex-wrap gap-1.5">
          {DIFICULTADES.map((d) => (
            <Chip
              key={d}
              label={d}
              active={!!filtros.dificultad?.includes(d)}
              onClick={() => toggleDificultad(d)}
              color={DIFICULTAD_COLORS[d]}
            />
          ))}
        </div>
      </Section>

      {/* ── Clima ──────────────────────────────────────────── */}
      <Section label="Clima">
        <div className="flex flex-wrap gap-1.5">
          {CLIMAS.map((c) => (
            <Chip
              key={c}
              label={c}
              active={!!filtros.clima?.includes(c)}
              onClick={() => toggleClima(c)}
            />
          ))}
        </div>
      </Section>

      {/* ── Actividades ────────────────────────────────────── */}
      <Section label="Actividades">
        <div className="flex flex-wrap gap-1.5">
          {ACTIVIDADES.map((act) => (
            <Chip
              key={act}
              label={act.charAt(0).toUpperCase() + act.slice(1)}
              active={!!filtros.tipoActividad?.includes(act)}
              onClick={() => toggleActividad(act)}
            />
          ))}
        </div>
      </Section>

      <div className="h-px bg-white/5" aria-hidden="true" />

      {/* ── Distancia ──────────────────────────────────────── */}
      <Section label="Distancia desde Quito">
        <div className="flex flex-wrap gap-1.5">
          {DISTANCIA_PRESETS.map((km) => (
            <Chip
              key={km}
              label={`< ${km} km`}
              active={distanciaActiva === km}
              onClick={() => setDistanciaMax(distanciaActiva === km ? null : km)}
            />
          ))}
        </div>
      </Section>

      {/* ── Altitud ────────────────────────────────────────── */}
      <Section label="Altitud">
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(ALTITUD_PRESETS) as [AltitudPreset, { label: string }][]).map(
            ([preset, { label }]) => (
              <Chip
                key={preset}
                label={label}
                active={altitudPreset === preset}
                onClick={() => setAltitudPreset(altitudPreset === preset ? null : preset)}
              />
            )
          )}
        </div>
      </Section>

      <div className="h-px bg-white/5" aria-hidden="true" />

      {/* ── Experiencias ───────────────────────────────────── */}
      <Section label="Experiencias">
        <div className="flex flex-wrap gap-1.5">
          {EXPERIENCE_TAGS.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              active={!!filtros.tags?.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </Section>

      {/* ── Biodiversidad ──────────────────────────────────── */}
      <Section label="Biodiversidad">
        <div className="flex flex-wrap gap-1.5">
          {BIODIVERSIDAD_TAGS.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              active={!!filtros.tags?.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

