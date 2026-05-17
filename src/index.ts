// ============================================================
// BARREL EXPORTS — PUEBLOS MÁGICOS DEL ECUADOR
// Importaciones limpias desde cualquier parte del proyecto:
//
// import { pueblosMagicosDB, getPuebloBySlug } from "@/data"
// import type { PuebloMagico, PuebloCard } from "@/types"
// import { paleta, animaciones } from "@/config/design-system"
// import { generarMetadataPueblo } from "@/lib/seo"
// ============================================================

// ─── TIPOS ──────────────────────────────────────────────────
export type {
  // Entidades principales
  PuebloMagico,
  PueblosMagicosDB,
  PuebloCard,
  PuebloMapMarker,
  PuebloComparable,

  // Sub-entidades
  Coordenadas,
  Topografia,
  RutaDesdeQuito,
  TransporteOpcion,
  DescripcionNarrativa,
  AtractivoPrincipal,
  ExperienciaGastronomica,
  FestividadCultural,
  OpcionHospedaje,
  ContextoCultural,
  Biodiversidad,
  RecursoMultimedia,
  GaleriaMultimedia,
  MetadataSEO,

  // Filtros
  FiltrosPueblos,

  // Enums
  Region,
  Categoria,
  NivelDificultad,
  Clima,
  TemporadaIdeal,
  TipoActividad,

  // Design system
  PaletaColor,
} from "./types/index";

export type {
  // Props de componentes
  HeroLandingProps,
  MapaInteractivoProps,
  PuebloCardProps,
  CardGridProps,
  FiltrosPanelProps,
  PuebloHeroProps,
  ComparadorProps,
  RecomendadorProps,
} from "./types/components";

// ─── BASE DE DATOS ───────────────────────────────────────────
export {
  pueblosMagicosDB,
  getPuebloBySlug,
  getPuebloById,
  getPueblosCards,
  getPueblosMapMarkers,
  getPueblosComparables,
  filtrarPueblos,
  getAllSlugs,
  getPueblosByRegion,
  getPueblosByDistancia,
  getEstadisticasGlobales,
} from "./data/pueblos-magicos";

// ─── DESIGN SYSTEM ──────────────────────────────────────────
export {
  paleta,
  coloresTailwind,
  coloresPorRegion,
  coloresPorDificultad,
  tipografia,
  animaciones,
  tailwindExtend,
} from "./config/design-system";

// ─── SEO & METADATA ─────────────────────────────────────────
export {
  generarMetadataPueblo,
  generarSchemaJsonLd,
  generarBreadcrumbSchema,
  metadataGlobal,
} from "./lib/seo";

// ─── RUTAS & PÁGINAS ────────────────────────────────────────
export { rutasEstaticas, verificarIntegridad } from "./lib/pages";
