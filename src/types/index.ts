// ============================================================
// PUEBLOS MÁGICOS DEL ECUADOR — TYPE SYSTEM
// Ministerio de Turismo · Programa "4 Mundos" · desde 2019
// ============================================================

// ─── ENUMERATIONS ───────────────────────────────────────────

export type Region = "Sierra" | "Costa" | "Amazonía" | "Galápagos";

export type Categoria = "Pueblo Mágico" | "Rincón Mágico";

export type NivelDificultad = "Fácil" | "Moderado" | "Difícil" | "Muy difícil";

export type Clima =
  | "Frío de páramo"
  | "Templado andino"
  | "Cálido húmedo"
  | "Cálido seco"
  | "Tropical";

export type TemporadaIdeal = "Todo el año" | "Jun–Sep" | "Oct–Feb" | "Mar–May" | "Jun–Aug";

export type TipoActividad =
  | "aventura"
  | "cultural"
  | "gastronómica"
  | "naturaleza"
  | "trekking"
  | "fotografía"
  | "historia"
  | "artesanía"
  | "espiritual"
  | "deportes acuáticos";

// ─── GPS & GEOGRAFÍA ────────────────────────────────────────

export interface Coordenadas {
  lat: number;
  lng: number;
  zoom: number;
  /** Coordenadas en formato DMS para display */
  dms?: string;
}

export interface Topografia {
  altitudMsnm: number;
  relieve: "Costa plana" | "Valle interandino" | "Sierra alta" | "Páramo" | "Ceja de selva" | "Selva baja";
  /** Volcán, nevado o accidente geográfico icónico más cercano */
  referenciaGeografica?: string;
  cuencaHidrografica?: string;
}

export interface RutaDesdeQuito {
  distanciaKm: number;
  tiempoEstimado: string;
  nivelDificultad: NivelDificultad;
  /** Ruta principal recomendada */
  via: string;
  /** Instrucciones clave de ruta */
  indicaciones: string[];
  /** Alternativas de transporte */
  transporte: TransporteOpcion[];
}

export interface TransporteOpcion {
  tipo: "auto" | "bus" | "tren" | "avión" | "lancha";
  descripcion: string;
  precio?: string;
  frecuencia?: string;
}

// ─── CONTENIDO NARRATIVO ────────────────────────────────────

export interface DescripcionNarrativa {
  /** Frase poética corta — usada en hero y cards */
  tagline: string;
  /** Párrafo principal — tono cinematográfico */
  descripcionCorta: string;
  /** Texto expandido — usado en página individual */
  descripcionLarga: string;
  /** Historia/leyenda icónica del lugar */
  historia?: string;
  /** Dato curioso o poco conocido */
  curiosidad?: string;
}

// ─── EXPERIENCIAS ───────────────────────────────────────────

export interface AtractivoPrincipal {
  nombre: string;
  tipo: TipoActividad;
  descripcion: string;
  /** Tiempo recomendado de visita en horas */
  duracionHoras?: number;
  /** Costo aproximado en USD */
  costoUSD?: string;
  /** Imprescindible / recomendado / opcional */
  prioridad: "imprescindible" | "recomendado" | "opcional";
}

export interface ExperienciaGastronomica {
  nombre: string;
  descripcion: string;
  esPatrimonial: boolean;
  /** Dónde encontrarla */
  dondeProbarla?: string;
}

export interface FestividadCultural {
  nombre: string;
  mes: string;
  descripcion: string;
  esPatrimonioUNESCO?: boolean;
  esPatrimonioNacional?: boolean;
}

export interface OpcionHospedaje {
  categoria: "Lujo" | "Boutique" | "Mediogama" | "Económico" | "Comunitario";
  descripcion: string;
  precioReferencia?: string;
}

// ─── CONTEXTO CULTURAL ──────────────────────────────────────

export interface ContextoCultural {
  pueblosIndigenas?: string[];
  idiomasLocales?: string[];
  artesaniaIconica?: string[];
  patrimonioDeclarado?: string[];
  /** UNESCO, Ministerio de Cultura, etc. */
  reconocimientos?: string[];
}

// ─── BIODIVERSIDAD ──────────────────────────────────────────

export interface Biodiversidad {
  especiesIconicas?: string[];
  habitatPrincipal?: string;
  areaProtegida?: string;
  /** Número aprox. de especies de aves registradas */
  especiesAves?: number;
}

// ─── MULTIMEDIA ─────────────────────────────────────────────

export interface RecursoMultimedia {
  tipo: "foto" | "video" | "panorámica" | "drone";
  url: string;
  alt: string;
  credito?: string;
}

export interface GaleriaMultimedia {
  /** Imagen principal — hero de la página individual */
  heroImage: string;
  /** Color dominante del hero para overlays */
  heroColorDominante?: string;
  imagenes?: RecursoMultimedia[];
  videoHero?: string;
}

// ─── SEO & METADATA ─────────────────────────────────────────

export interface MetadataSEO {
  slug: string;
  titulo: string;
  descripcionMeta: string;
  keywords: string[];
  ogImage?: string;
  /** Datos estructurados Schema.org */
  schemaType: "TouristAttraction" | "City" | "LandmarksOrHistoricalBuildings";
}

// ─── ENTIDAD PRINCIPAL ──────────────────────────────────────

export interface PuebloMagico {
  // Identificadores
  id: string;
  nombre: string;
  nombreCorto: string;
  provincia: string;
  categoria: Categoria;
  region: Region;

  // Geografía
  coordenadas: Coordenadas;
  topografia: Topografia;
  ruta: RutaDesdeQuito;

  // Contenido
  narrativa: DescripcionNarrativa;
  atractivos: AtractivoPrincipal[];
  gastronomia: ExperienciaGastronomica[];
  festividades: FestividadCultural[];
  hospedaje: OpcionHospedaje[];
  cultura: ContextoCultural;
  biodiversidad: Biodiversidad;

  // Información práctica
  clima: Clima;
  temperaturaRango: string;
  temporadaIdeal: TemporadaIdeal;
  mejorEpocaVisitar: string;

  // Visual
  multimedia: GaleriaMultimedia;
  /** Color de acento del pueblo — para cards y markers */
  colorAcento: string;

  // SEO
  seo: MetadataSEO;

  // Metadatos del programa
  anioIngreso: number;
  certificadoPor: string;
}

// ─── TIPOS DE COLECCIÓN ─────────────────────────────────────

export type PueblosMagicosDB = PuebloMagico[];

/** Versión reducida para cards y mapa — sin contenido expandido */
export type PuebloCard = Pick<
  PuebloMagico,
  | "id"
  | "nombre"
  | "nombreCorto"
  | "provincia"
  | "categoria"
  | "region"
  | "coordenadas"
  | "topografia"
  | "ruta"
  | "clima"
  | "temperaturaRango"
  | "colorAcento"
  | "multimedia"
  | "seo"
> & {
  narrativa: Pick<DescripcionNarrativa, "tagline" | "descripcionCorta">;
  atractivoDestacado: string;
};

/** Para el mapa Leaflet — solo lo necesario para markers */
export type PuebloMapMarker = Pick<
  PuebloMagico,
  "id" | "nombre" | "region" | "coordenadas" | "colorAcento"
> & {
  tagline: string;
  altitud: number;
  distanciaKm: number;
  slug: string;
};

/** Para el comparador de destinos */
export type PuebloComparable = Pick<
  PuebloMagico,
  | "id"
  | "nombre"
  | "region"
  | "topografia"
  | "ruta"
  | "clima"
  | "temperaturaRango"
  | "colorAcento"
  | "multimedia"
> & {
  tagline: string;
  atractivos: string[];
  gastronomia: string[];
};

// ─── FILTROS ────────────────────────────────────────────────

export interface FiltrosPueblos {
  busqueda?: string;
  region?: Region[];
  dificultad?: NivelDificultad[];
  clima?: Clima[];
  altitudMin?: number;
  altitudMax?: number;
  distanciaMaxKm?: number;
  tipoActividad?: TipoActividad[];
  /** Tags de experiencia + biodiversidad, ver EXPERIENCE_TAGS / BIODIVERSIDAD_TAGS */
  tags?: string[];
  temporada?: TemporadaIdeal;
  categoria?: Categoria;
}

// ─── CONFIGURACIÓN DE PALETA ────────────────────────────────

export interface PaletaColor {
  verde: string;
  terracota: string;
  azul: string;
  oro: string;
  blanco: string;
  carbon: string;
  mist: string;
  bark: string;
}
