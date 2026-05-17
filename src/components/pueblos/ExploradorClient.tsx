"use client";

import { memo, useMemo, useState } from "react";
import type { PuebloCard, PuebloMapMarker, PueblosMagicosDB } from "@/src/types";
import { filtrarPueblos } from "@/src/data/pueblos-magicos";
import { contarFiltrosActivos, hayFiltrosActivos } from "@/src/lib/filter-params";
import {
  EXPLORER_SORT_OPTIONS,
  type ExplorerSort,
  sortPuebloCards,
} from "@/src/lib/explorer";
import { usePuebloFilters } from "@/src/hooks/usePuebloFilters";
import CardGrid from "./CardGrid";
import FiltrosPanel from "./FiltrosPanel";
import MapaClientWrapper from "@/src/components/mapa/MapaClientWrapper";

// ─── Types ───────────────────────────────────────────────────

interface ExploradorClientProps {
  pueblos: PuebloCard[];
  db: PueblosMagicosDB;
}

type ViewMode = "cards" | "map";

// ─── Helpers ─────────────────────────────────────────────────

function cardsToMarkers(cards: PuebloCard[]): PuebloMapMarker[] {
  return cards.map((c) => ({
    id: c.id,
    nombre: c.nombre,
    region: c.region,
    coordenadas: c.coordenadas,
    colorAcento: c.colorAcento,
    tagline: c.narrativa.tagline,
    altitud: c.topografia.altitudMsnm,
    distanciaKm: c.ruta.distanciaKm,
    slug: c.seo.slug,
  }));
}

// ─── View toggle ─────────────────────────────────────────────

const ViewToggle = memo(function ViewToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
}) {
  return (
    <div
      className="flex gap-0.5 p-0.5 rounded-full border border-white/10"
      role="radiogroup"
      aria-label="Modo de vista"
    >
      {(["cards", "map"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          role="radio"
          aria-checked={viewMode === mode}
          onClick={() => setViewMode(mode)}
          className={`px-3 py-1 text-[11px] rounded-full transition-all ${
            viewMode === mode
              ? "bg-white/10 text-white"
              : "text-white/30 hover:text-white/55"
          }`}
        >
          {mode === "cards" ? "Tarjetas" : "Mapa"}
        </button>
      ))}
    </div>
  );
});

const SortControl = memo(function SortControl({
  sortMode,
  setSortMode,
}: {
  sortMode: ExplorerSort;
  setSortMode: (v: ExplorerSort) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-[11px] text-white/30">
      <span className="hidden sm:inline uppercase tracking-[0.18em]">Orden</span>
      <select
        value={sortMode}
        onChange={(event) => setSortMode(event.target.value as ExplorerSort)}
        className="rounded-full border border-white/10 bg-carbon-light px-3 py-1.5 text-[11px] text-white/60 outline-none transition-colors hover:border-white/20 focus:border-oro"
        aria-label="Ordenar destinos"
      >
        {EXPLORER_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-carbon text-white">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
});

// ─── Main component ───────────────────────────────────────────

export default function ExploradorClient({ pueblos, db }: ExploradorClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortMode, setSortMode] = useState<ExplorerSort>("editorial");

  const api = usePuebloFilters();
  const { filtros, isPending } = api;

  const filtrosEfectivos = useMemo(
    () => ({
      ...filtros,
      busqueda: api.searchInput.trim() || undefined,
    }),
    [filtros, api.searchInput]
  );

  const hayFiltros = useMemo(
    () => hayFiltrosActivos(filtrosEfectivos),
    [filtrosEfectivos]
  );

  // ── Filtered results ───────────────────────────────────────
  const pueblosFiltrados = useMemo(() => {
    if (!hayFiltros) return pueblos;
    const ids = new Set(filtrarPueblos(filtrosEfectivos, db).map((p) => p.id));
    return pueblos.filter((p) => ids.has(p.id));
  }, [filtrosEfectivos, hayFiltros, pueblos, db]);

  const pueblosOrdenados = useMemo(
    () => sortPuebloCards(pueblosFiltrados, sortMode),
    [pueblosFiltrados, sortMode]
  );

  // Only compute markers when in map view (lazy)
  const markers = useMemo(
    () => (viewMode === "map" ? cardsToMarkers(pueblosOrdenados) : []),
    [viewMode, pueblosOrdenados]
  );

  // ── Filter panel props (stable reference via spread) ───────
  const panelProps = {
    filtros:             api.filtros,
    searchInput:         api.searchInput,
    hayFiltros,
    altitudPreset:       api.altitudPreset,
    isPending:           api.isPending,
    resetFilters:        api.resetFilters,
    toggleRegion:        api.toggleRegion,
    toggleDificultad:    api.toggleDificultad,
    toggleClima:         api.toggleClima,
    toggleActividad:     api.toggleActividad,
    toggleTag:           api.toggleTag,
    setAltitudPreset:    api.setAltitudPreset,
    setDistanciaMax:     api.setDistanciaMax,
    handleSearchChange:  api.handleSearchChange,
    totalResultados:     pueblosFiltrados.length,
  };

  const activeCount = contarFiltrosActivos(filtrosEfectivos);

  return (
    <div>
      {/* ── Mobile toolbar ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-expanded={sidebarOpen}
          aria-controls="filtros-mobile"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60 transition-all"
        >
          <span aria-hidden="true">⊟</span>
          Filtros
          {activeCount > 0 && (
            <span
              className="ml-0.5 min-w-[16px] h-4 px-1 rounded-full bg-oro/80 text-[9px] text-carbon font-bold flex items-center justify-center"
              aria-label={`${activeCount} filtros activos`}
            >
              {activeCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <SortControl sortMode={sortMode} setSortMode={setSortMode} />
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      {/* ── Mobile collapsible sidebar ─────────────────────── */}
      {sidebarOpen && (
        <div
          id="filtros-mobile"
          className="lg:hidden mb-6 p-4 rounded-lg border border-white/8 bg-white/2"
        >
          <FiltrosPanel {...panelProps} />
        </div>
      )}

      {/* ── Desktop layout (sidebar + content) ─────────────── */}
      <div className="flex gap-8 items-start">

        {/* Sticky sidebar — desktop only */}
        <aside
          className="hidden lg:block w-52 xl:w-60 shrink-0 sticky top-24 max-h-[calc(100svh-8rem)] overflow-y-auto scrollbar-thin"
          aria-label="Panel de filtros"
        >
          <FiltrosPanel {...panelProps} />
        </aside>

        {/* Main content area */}
        <div className="flex-1 min-w-0">

          {/* Desktop view toggle + result count */}
          <div className="hidden lg:flex items-center justify-between mb-5">
            <p
              className={`text-xs transition-opacity ${isPending ? "text-white/20" : "text-white/30"}`}
              aria-live="polite"
            >
              {pueblosOrdenados.length} destino{pueblosOrdenados.length !== 1 ? "s" : ""}
              {hayFiltros && " · filtrado"}
            </p>
            <div className="flex items-center gap-3">
              <SortControl sortMode={sortMode} setSortMode={setSortMode} />
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>

          {/* Content with pending dim */}
          <div
            className={`transition-opacity duration-150 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}
            aria-busy={isPending}
          >
            {viewMode === "cards" ? (
              <CardGrid pueblos={pueblosOrdenados} />
            ) : (
              <MapaClientWrapper markers={markers} altura="62svh" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
