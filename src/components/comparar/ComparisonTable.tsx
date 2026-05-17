"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import type { PuebloMagico, PuebloCard } from "@/src/types";
import { EXPERIENCE_TAGS, BIODIVERSIDAD_TAGS } from "@/src/lib/filter-params";
import { matchesTag } from "@/src/data/pueblos-magicos";
import ComparisonCard from "./ComparisonCard";

// ─── Constants ───────────────────────────────────────────────

const MAX = 3;

const DIFICULTAD_ORDER = ["Fácil", "Moderado", "Difícil", "Muy difícil"] as const;
const DIFICULTAD_COLORS: Record<string, string> = {
  "Fácil":       "#3F7D44",
  "Moderado":    "#E8B040",
  "Difícil":     "#C76139",
  "Muy difícil": "#8B1A1A",
};

// ─── Highlight logic ──────────────────────────────────────────

type Highlight = "best" | "worst" | "equal" | "none";

function highlightNums(
  values: (number | null)[],
  lowerIsBetter: boolean
): Highlight[] {
  const nums = values.filter((v): v is number => v !== null);
  if (nums.length < 2) return values.map(() => "none");
  if (new Set(nums).size === 1) return values.map((v) => (v !== null ? "equal" : "none"));
  const sorted = [...nums].sort((a, b) => a - b);
  const best  = lowerIsBetter ? sorted[0] : sorted[sorted.length - 1];
  const worst = lowerIsBetter ? sorted[sorted.length - 1] : sorted[0];
  return values.map((v) => {
    if (v === null) return "none";
    if (v === best) return "best";
    if (v === worst) return "worst";
    return "none";
  });
}

const HL_TEXT: Record<Highlight, string> = {
  best:  "text-verde",
  worst: "text-terracota",
  equal: "text-white/50",
  none:  "text-white/70",
};

const HL_BAR: Record<Highlight, string> = {
  best:  "#3F7D44",
  worst: "#C76139",
  equal: "rgba(255,255,255,0.25)",
  none:  "rgba(255,255,255,0.2)",
};

// ─── Sub-components ───────────────────────────────────────────

const SectionRow = memo(function SectionRow({ label }: { label: string }) {
  return (
    <div
      className="col-span-full flex items-center gap-3 px-3 sm:px-4 py-2
        bg-white/2 border-y border-white/5"
    >
      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-medium">
        {label}
      </p>
    </div>
  );
});

function NumericCell({
  value,
  unit,
  max,
  highlight,
}: {
  value: number | null;
  unit: string;
  max: number;
  highlight: Highlight;
}) {
  if (value === null) return <span className="text-white/20">—</span>;
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <p className={`text-sm font-light ${HL_TEXT[highlight]}`}>
        {value.toLocaleString("es")}{" "}
        <span className="text-[10px] text-white/30">{unit}</span>
      </p>
      <div className="mt-1.5 h-0.5 bg-white/6 rounded-full overflow-hidden w-full">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: HL_BAR[highlight] }}
        />
      </div>
    </div>
  );
}

function DificultadBadge({ nivel }: { nivel: string }) {
  const color = DIFICULTAD_COLORS[nivel] ?? "#E8B040";
  return (
    <span
      className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider"
      style={{
        color,
        backgroundColor: color + "18",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: color + "45",
      }}
    >
      {nivel}
    </span>
  );
}

function Chips({ items, color }: { items: string[]; color?: string }) {
  if (!items.length) return <span className="text-white/20 text-xs">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span
          key={item}
          className="px-1.5 py-0.5 text-[10px] rounded border border-white/8 text-white/45"
          style={color ? { borderColor: color + "30", color: color + "cc" } : {}}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ListItems({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-white/20 text-xs">—</span>;
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item} className="text-xs text-white/55 flex items-start gap-1">
          <span className="text-white/20 mt-0.5 shrink-0">·</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Add slot (empty column) ──────────────────────────────────

function AddSlot({ allPueblos, current, onAdd }: {
  allPueblos: PuebloCard[];
  current: PuebloMagico[];
  onAdd: (slug: string) => void;
}) {
  const available = allPueblos.filter((c) => !current.some((p) => p.id === c.id));

  if (!available.length) return null;

  return (
    <div className="flex flex-col min-w-0">
      <div className="aspect-[3/2] rounded-lg border border-dashed border-white/10
        flex flex-col items-center justify-center gap-2 mb-3 bg-white/1">
        <span className="text-white/20 text-xs text-center px-2">
          + Añadir destino
        </span>
        <div className="flex flex-wrap gap-1 px-2 justify-center max-h-28 overflow-y-auto">
          {available.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onAdd(c.seo.slug)}
              className="px-2 py-0.5 text-[10px] rounded-full border border-white/10
                text-white/35 hover:text-white/60 hover:border-white/20 transition-colors"
            >
              {c.nombreCorto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main table ───────────────────────────────────────────────

interface ComparisonTableProps {
  pueblos: PuebloMagico[];
  allCards: PuebloCard[];
  onRemove: (id: string) => void;
  onAdd: (slug: string) => void;
}

const SECTIONS = [
  { id: "geo",    label: "Ubicación y geografía" },
  { id: "acceso", label: "Acceso desde Quito" },
  { id: "exp",    label: "Experiencias" },
  { id: "nat",    label: "Naturaleza y biodiversidad" },
  { id: "ctx",    label: "Contexto" },
] as const;

const ALL_TAGS = [...EXPERIENCE_TAGS, ...BIODIVERSIDAD_TAGS] as string[];

export default memo(function ComparisonTable({
  pueblos,
  allCards,
  onRemove,
  onAdd,
}: ComparisonTableProps) {
  const n = pueblos.length;
  const showAddSlot = n < MAX;

  // ── Pre-computed numeric arrays for highlighting ────────────
  const altitudes  = useMemo(() => pueblos.map((p) => p.topografia.altitudMsnm), [pueblos]);
  const distancias = useMemo(() => pueblos.map((p) => p.ruta.distanciaKm), [pueblos]);
  const aves       = useMemo(() => pueblos.map((p) => p.biodiversidad.especiesAves ?? null), [pueblos]);

  const hlAlt  = useMemo(() => highlightNums(altitudes,  false), [altitudes]);
  const hlDist = useMemo(() => highlightNums(distancias, true),  [distancias]);
  const hlAves = useMemo(() => highlightNums(aves,       false), [aves]);

  const maxAlt  = useMemo(() => Math.max(...altitudes),         [altitudes]);
  const maxDist = useMemo(() => Math.max(...distancias),        [distancias]);
  const maxAves = useMemo(() => Math.max(...(aves.filter((v): v is number => v !== null)), 1), [aves]);

  const dificultadRanks = useMemo(
    () => pueblos.map((p) => DIFICULTAD_ORDER.indexOf(p.ruta.nivelDificultad as typeof DIFICULTAD_ORDER[number])),
    [pueblos]
  );
  const hlDif = useMemo(() => highlightNums(dificultadRanks, true), [dificultadRanks]);

  // Tags derived per pueblo
  const puebloTags = useMemo(
    () => pueblos.map((p) => ALL_TAGS.filter((tag) => matchesTag(p, tag))),
    [pueblos]
  );

  // ── Grid layout: [label] [p1] [p2] [p3?] ──────────────────
  // Each column has min-w to ensure horizontal scrollability on mobile
  const gridCols = showAddSlot ? `grid-cols-[120px_repeat(${n + 1},minmax(140px,1fr))]`
                               : `grid-cols-[120px_repeat(${n},minmax(140px,1fr))]`;

  function cellsFor(render: (p: PuebloMagico, i: number) => React.ReactNode) {
    const cells = pueblos.map((p, i) => (
      <div key={p.id} className="px-3 sm:px-4 py-3 border-l border-white/5 min-w-0">
        {render(p, i)}
      </div>
    ));
    if (showAddSlot) {
      cells.push(
        <div key="empty" className="px-3 sm:px-4 py-3 border-l border-white/5 opacity-20">
          —
        </div>
      );
    }
    return cells;
  }

  function RowLabel({ label }: { label: string }) {
    return (
      <div className="px-3 sm:px-4 py-3 flex items-center sticky left-0 bg-[#0F1115]/90 backdrop-blur-sm z-10">
        <p className="text-[10px] text-white/35 leading-tight">{label}</p>
      </div>
    );
  }

  function Row({
    label,
    render,
    alt = false,
  }: {
    label: string;
    render: (p: PuebloMagico, i: number) => React.ReactNode;
    alt?: boolean;
  }) {
    return (
      <div className={`grid ${gridCols} ${alt ? "bg-white/1" : ""}`}>
        <RowLabel label={label} />
        {cellsFor(render)}
      </div>
    );
  }

  if (n === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <p className="font-display text-2xl font-light text-white/40">
          Sin destinos seleccionados
        </p>
        <p className="text-white/25 text-sm max-w-xs">
          Selecciona al menos 2 Pueblos Mágicos desde el explorador para compararlos.
        </p>
        <Link
          href="/pueblos"
          className="mt-2 px-5 py-2 rounded-full border border-white/15 text-sm text-white/50
            hover:text-white hover:border-white/30 transition-all"
        >
          Ir al explorador →
        </Link>
      </div>
    );
  }

  const headerCols = showAddSlot ? n + 1 : n;

  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
      <div style={{ minWidth: `${120 + headerCols * 160}px` }}>

        {/* ── Sticky header row (pueblo cards) ─────────────── */}
        <div
          className={`grid ${gridCols} sticky top-16 z-20
            bg-[#0F1115]/97 backdrop-blur-md border-b border-white/8 pb-4 pt-3 mb-0`}
        >
          {/* Corner */}
          <div className="px-3 sm:px-4 pt-1 sticky left-0 bg-[#0F1115]/97 z-20" />

          {/* Pueblo headers */}
          {pueblos.map((p) => (
            <div key={p.id} className="px-3 sm:px-4 border-l border-white/5">
              <ComparisonCard
                pueblo={p}
                onRemove={n > 1 ? () => onRemove(p.id) : undefined}
              />
            </div>
          ))}

          {/* Add slot header */}
          {showAddSlot && (
            <div className="px-3 sm:px-4 border-l border-white/5">
              <AddSlot
                allPueblos={allCards}
                current={pueblos}
                onAdd={onAdd}
              />
            </div>
          )}
        </div>

        {/* ── Data rows ─────────────────────────────────────── */}

        {/* Section: Ubicación */}
        <div className={`grid ${gridCols}`}>
          <SectionRow label={SECTIONS[0].label} />
        </div>

        <Row label="Región" render={(p) => (
          <span className="text-xs text-white/65">{p.region}</span>
        )} />
        <Row alt label="Provincia" render={(p) => (
          <span className="text-xs text-white/50">{p.provincia}</span>
        )} />
        <Row label="Altitud" render={(p, i) => (
          <NumericCell
            value={altitudes[i]}
            unit="m s.n.m."
            max={maxAlt}
            highlight={hlAlt[i]}
          />
        )} />
        <Row alt label="Clima" render={(p) => (
          <span className="text-xs text-white/65">{p.clima}</span>
        )} />
        <Row label="Temperatura" render={(p) => (
          <span className="text-xs text-white/55">{p.temperaturaRango}</span>
        )} />

        {/* Section: Acceso */}
        <div className={`grid ${gridCols}`}>
          <SectionRow label={SECTIONS[1].label} />
        </div>

        <Row label="Dificultad" render={(p, i) => (
          <div>
            <DificultadBadge nivel={p.ruta.nivelDificultad} />
            {hlDif[i] === "best" && (
              <p className="text-[10px] text-verde/60 mt-1">más accesible</p>
            )}
          </div>
        )} />
        <Row alt label="Distancia" render={(p, i) => (
          <NumericCell
            value={distancias[i]}
            unit="km"
            max={maxDist}
            highlight={hlDist[i]}
          />
        )} />
        <Row label="Tiempo de viaje" render={(p) => (
          <span className="text-xs text-white/60">{p.ruta.tiempoEstimado}</span>
        )} />
        <Row alt label="Vía principal" render={(p) => (
          <span className="text-[11px] text-white/40 leading-tight">{p.ruta.via}</span>
        )} />

        {/* Section: Experiencias */}
        <div className={`grid ${gridCols}`}>
          <SectionRow label={SECTIONS[2].label} />
        </div>

        <Row label="Actividades" render={(p) => {
          const acts = [...new Set(p.atractivos.map((a) => a.tipo))];
          return <Chips items={acts} />;
        }} />
        <Row alt label="Gastronomía patrimonial" render={(p) => {
          const names = p.gastronomia.filter((g) => g.esPatrimonial).map((g) => g.nombre);
          return <ListItems items={names} />;
        }} />
        <Row label="Tags" render={(p, i) => (
          <Chips items={puebloTags[i]} />
        )} />
        <Row alt label="Artesanía" render={(p) => (
          <ListItems items={p.cultura.artesaniaIconica ?? []} />
        )} />

        {/* Section: Naturaleza */}
        <div className={`grid ${gridCols}`}>
          <SectionRow label={SECTIONS[3].label} />
        </div>

        <Row label="Área protegida" render={(p) => (
          <span className="text-[11px] text-white/55 leading-tight">
            {p.biodiversidad.areaProtegida ?? <span className="text-white/20">—</span>}
          </span>
        )} />
        <Row alt label="Fauna icónica" render={(p) => (
          <ListItems items={(p.biodiversidad.especiesIconicas ?? []).slice(0, 3)} />
        )} />
        <Row label="Especies de aves" render={(p, i) => (
          <NumericCell
            value={aves[i]}
            unit="sp."
            max={maxAves}
            highlight={hlAves[i]}
          />
        )} />
        <Row alt label="Hábitat" render={(p) => (
          <span className="text-[11px] text-white/45">{p.biodiversidad.habitatPrincipal ?? "—"}</span>
        )} />

        {/* Section: Contexto */}
        <div className={`grid ${gridCols}`}>
          <SectionRow label={SECTIONS[4].label} />
        </div>

        <Row label="Categoría" render={(p) => (
          <span className="px-2 py-0.5 text-[10px] rounded border border-white/10 text-white/50">
            {p.categoria}
          </span>
        )} />
        <Row alt label="Mejor época" render={(p) => (
          <span className="text-xs text-white/55">{p.temporadaIdeal}</span>
        )} />
        <Row label="Año ingreso" render={(p) => (
          <span className="text-xs text-white/45">{p.anioIngreso}</span>
        )} />

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </div>
  );
});
