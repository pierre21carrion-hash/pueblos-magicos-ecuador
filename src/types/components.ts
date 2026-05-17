// ============================================================
// COMPONENT PROP TYPES — PUEBLOS MÁGICOS DEL ECUADOR
// Define las interfaces de todos los componentes UI
// ============================================================

import type {
  PuebloMagico,
  PuebloCard,
  PuebloMapMarker,
  PuebloComparable,
  FiltrosPueblos,
  AtractivoPrincipal,
  ExperienciaGastronomica,
  FestividadCultural,
  RutaDesdeQuito,
  Biodiversidad,
} from "./index";

// ─── HERO LANDING ────────────────────────────────────────────

export interface HeroLandingProps {
  /** Título principal animado */
  titulo?: string;
  subtitulo?: string;
  /** URL del video de fondo */
  videoUrl?: string;
  /** Imagen de fallback si no hay video */
  imagenFallback?: string;
  /** Función al hacer clic en el CTA */
  onExplorar?: () => void;
}

// ─── MAPA INTERACTIVO ────────────────────────────────────────

export interface MapaInteractivoProps {
  markers: PuebloMapMarker[];
  /** Centro inicial del mapa */
  centroInicial?: { lat: number; lng: number; zoom: number };
  /** Altura del mapa en CSS */
  altura?: string;
  /** Pueblo activo/seleccionado */
  puebloActivo?: string | null;
  /** Callback cuando se selecciona un marcador */
  onMarkerClick?: (id: string) => void;
  /** Estilo del mapa — 'dark' | 'satellite' | 'terrain' */
  estiloMapa?: "dark" | "satellite" | "terrain";
  /** Filtro de región activo */
  filtroRegion?: string | null;
}

export interface MapaMarkerProps {
  marker: PuebloMapMarker;
  activo: boolean;
  onClick: (id: string) => void;
}

export interface TooltipMapaProps {
  pueblo: PuebloMapMarker;
  visible: boolean;
}

// ─── CARDS ──────────────────────────────────────────────────

export interface PuebloCardProps {
  pueblo: PuebloCard;
  /** Vista: 'grid' muestra más detalle, 'list' es horizontal */
  vista?: "grid" | "list" | "compact";
  /** Si está activo/seleccionado */
  activo?: boolean;
  /** Callback al hacer clic */
  onClick?: (id: string) => void;
  /** Mostrar distancia desde Quito */
  mostrarDistancia?: boolean;
  /** Mostrar badge de región */
  mostrarRegion?: boolean;
  /** Animación de entrada con index para stagger */
  animacionIndex?: number;
}

export interface CardGridProps {
  pueblos: PuebloCard[];
  filtros?: FiltrosPueblos;
  vista?: "grid" | "list";
  onPuebloClick?: (id: string) => void;
  puebloActivo?: string | null;
  isLoading?: boolean;
}

// ─── EXPLORADOR / FILTROS ────────────────────────────────────

export interface FiltrosPanelProps {
  filtrosActivos: FiltrosPueblos;
  onChange: (filtros: FiltrosPueblos) => void;
  onReset: () => void;
  totalResultados: number;
}

export interface FiltroChipProps {
  label: string;
  activo: boolean;
  color?: string;
  onClick: () => void;
}

export interface RangoAltitudProps {
  min: number;
  max: number;
  valorMin: number;
  valorMax: number;
  onChange: (min: number, max: number) => void;
}

// ─── PÁGINA INDIVIDUAL ──────────────────────────────────────

export interface PuebloHeroProps {
  pueblo: PuebloMagico;
  /** Mostrar video de fondo o imagen */
  conVideo?: boolean;
}

export interface PuebloInfoGridProps {
  pueblo: PuebloMagico;
}

export interface StatCardProps {
  icono: string;
  valor: string;
  label: string;
  colorAcento?: string;
}

export interface PuebloAtractivosProps {
  atractivos: AtractivoPrincipal[];
  colorAcento?: string;
}

export interface AtractivoItemProps {
  atractivo: AtractivoPrincipal;
  colorAcento?: string;
  index?: number;
}

export interface PuebloGastronomiaProps {
  gastronomia: ExperienciaGastronomica[];
  nombrePueblo: string;
}

export interface PuebloFestividadesProps {
  festividades: FestividadCultural[];
  colorAcento?: string;
}

export interface PuebloRutaProps {
  ruta: RutaDesdeQuito;
  nombrePueblo: string;
  coordenadas: { lat: number; lng: number };
}

export interface PuebloBiodiversidadProps {
  biodiversidad: Biodiversidad;
  colorAcento?: string;
}

// ─── COMPARADOR ─────────────────────────────────────────────

export interface ComparadorProps {
  pueblos: PuebloComparable[];
  seleccionados?: string[];
  maxSeleccion?: number;
  onSeleccionCambio?: (ids: string[]) => void;
}

export interface TablaComparacionProps {
  pueblosSeleccionados: PuebloComparable[];
  onRemover: (id: string) => void;
}

// ─── NAVEGACIÓN ─────────────────────────────────────────────

export interface NavbarProps {
  transparente?: boolean;
  pueblosCount?: number;
}

export interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

// ─── MULTIMEDIA ─────────────────────────────────────────────

export interface GaleriaProps {
  imagenes: Array<{ url: string; alt: string; credito?: string }>;
  nombrePueblo: string;
  /** Número de columnas en el grid */
  columnas?: 2 | 3 | 4;
}

export interface VideoHeroProps {
  videoUrl: string;
  posterUrl?: string;
  overlay?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}

// ─── FOOTER ─────────────────────────────────────────────────

export interface FooterProps {
  pueblosDestacados?: PuebloCard[];
}

// ─── LOADING / SKELETON ─────────────────────────────────────

export interface SkeletonCardProps {
  count?: number;
}

export interface LoadingMapaProps {
  mensaje?: string;
}

// ─── BADGES / INDICADORES ───────────────────────────────────

export interface BadgeRegionProps {
  region: string;
  size?: "sm" | "md" | "lg";
}

export interface BadgeDificultadProps {
  nivel: string;
  size?: "sm" | "md";
}

export interface IndicadorAltitudProps {
  altitudMsnm: number;
  mostrarIcono?: boolean;
}

// ─── RECOMENDADOR ───────────────────────────────────────────

export interface RecomendadorProps {
  pueblos: PuebloCard[];
  /** Pueblo actual — para sugerir similares */
  puebloActual?: string;
  /** Número de recomendaciones a mostrar */
  cantidad?: number;
}
