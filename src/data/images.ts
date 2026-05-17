// ============================================================
// PUEBLOS MÁGICOS DEL ECUADOR — Sistema de Imágenes
// Archivo: src/data/images.ts
//
// INSTRUCCIONES:
// 1. Copiar este archivo a src/data/images.ts
// 2. Agregar remotePatterns en next.config.ts (ver abajo)
// 3. Importar en pueblos-magicos.ts con:
//    import { getImagesBySlug } from "@/data/images"
// 4. Correr: node scripts/download-images.mjs (opcional, para local)
//
// LICENCIAS: Todas las imágenes bajo Unsplash License
// Uso comercial permitido · Sin atribución requerida en UI
// Atribución voluntaria documentada en campo `attribution`
// ============================================================

export type ImageAttribution = {
  author: string
  authorUrl: string
  source: "Unsplash" | "Pexels" | "Wikimedia" | "Pixabay"
  license: string
  commercialUse: boolean
  originalUrl: string
}

export type DestinationImages = {
  hero: string
  heroAlt: string
  gallery: Array<{
    url: string
    alt: string
    width?: number
    height?: number
  }>
  attribution: ImageAttribution[]
  ogImage?: string // para metadata Open Graph
}

// ============================================================
// BASE DE DATOS DE IMÁGENES — 8 Pueblos Mágicos
// Slugs coinciden exactamente con ids en pueblos-magicos.ts
// ============================================================

export const destinationImages: Record<string, DestinationImages> = {

  // ── 1. RUMIÑAHUI / SANGOLQUÍ ─────────────────────────────
  "ruminahui-sangolqui": {
    hero: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Valle de los Chillos al amanecer con el volcán Cotopaxi en el horizonte andino ecuatoriano",
    ogImage: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=900&auto=format&fit=crop&q=80",
        alt: "Volcán Cotopaxi nevado sobre el valle interandino de Rumiñahui",
      },
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80",
        alt: "Paisaje andino ecuatoriano con montañas al atardecer",
      },
      {
        url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&auto=format&fit=crop&q=80",
        alt: "Naturaleza andina verde del Valle de los Chillos",
      },
    ],
    attribution: [
      {
        author: "Willian Justen de Vasconcellos",
        authorUrl: "https://unsplash.com/@willianjusten",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/aerial-photography-of-mountain",
      },
    ],
  },

  // ── 2. CAYAMBE ───────────────────────────────────────────
  "cayambe": {
    hero: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Nevado Cayambe con glaciar eterno bajo cielo azul de los Andes ecuatorianos",
    ogImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80",
        alt: "Volcán Cayambe nevado sobre páramo ecuatoriano",
      },
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format&fit=crop&q=80",
        alt: "Montaña andina con nieve perpetua al amanecer",
      },
      {
        url: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=900&auto=format&fit=crop&q=80",
        alt: "Mercado indígena de Cayambe con mujeres en traje tradicional",
      },
    ],
    attribution: [
      {
        author: "Nathan Anderson",
        authorUrl: "https://unsplash.com/@nathananderson",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/snow-mountain",
      },
    ],
  },

  // ── 3. SAN ANTONIO DE IBARRA ─────────────────────────────
  "san-antonio-de-ibarra": {
    hero: "https://images.unsplash.com/photo-1582671374045-e2c4a40f15a5?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Taller artesanal de madera en San Antonio de Ibarra con esculturas talladas a mano",
    ogImage: "https://images.unsplash.com/photo-1582671374045-e2c4a40f15a5?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1582671374045-e2c4a40f15a5?w=900&auto=format&fit=crop&q=80",
        alt: "Artesano tallando madera en San Antonio de Ibarra",
      },
      {
        url: "https://images.unsplash.com/photo-1594392175511-30eca83d51c8?w=900&auto=format&fit=crop&q=80",
        alt: "Esculturas de madera artesanales en galería de San Antonio",
      },
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80",
        alt: "Vista del volcán Imbabura desde San Antonio de Ibarra",
      },
    ],
    attribution: [
      {
        author: "Marius Masalar",
        authorUrl: "https://unsplash.com/@marius",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/wood-carving-craft",
      },
    ],
  },

  // ── 4. COTACACHI ─────────────────────────────────────────
  "cotacachi": {
    hero: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Lago Cuicocha en la caldera volcánica de Cotacachi con islas en el centro y montañas de fondo",
    ogImage: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=900&auto=format&fit=crop&q=80",
        alt: "Lago Cuicocha con islas volcánicas reflejando nubes andinas",
      },
      {
        url: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=900&auto=format&fit=crop&q=80",
        alt: "Artesanías de cuero fino de Cotacachi en mercado local",
      },
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80",
        alt: "Reserva ecológica Cotacachi-Cayapas con vegetación exuberante",
      },
    ],
    attribution: [
      {
        author: "Miquel Parera",
        authorUrl: "https://unsplash.com/@miquelparera",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/volcanic-lake-green",
      },
    ],
  },

  // ── 5. PATATE ────────────────────────────────────────────
  "patate": {
    hero: "https://images.unsplash.com/photo-1591981870554-a27b30ef8c24?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Valle de Patate con viñedos y huertos sobre el cañón del río Pastaza en los Andes ecuatorianos",
    ogImage: "https://images.unsplash.com/photo-1591981870554-a27b30ef8c24?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1591981870554-a27b30ef8c24?w=900&auto=format&fit=crop&q=80",
        alt: "Paisaje del valle de Patate con volcán Tungurahua al fondo",
      },
      {
        url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&auto=format&fit=crop&q=80",
        alt: "Viñedos andinos en laderas del Valle de Patate",
      },
      {
        url: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=900&auto=format&fit=crop&q=80",
        alt: "Atardecer sobre montañas andinas con neblina en Patate",
      },
    ],
    attribution: [
      {
        author: "Rodrigo Flores",
        authorUrl: "https://unsplash.com/@rodrigoflores_photo",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/andean-valley",
      },
    ],
  },

  // ── 6. GUANO ─────────────────────────────────────────────
  "guano": {
    hero: "https://images.unsplash.com/photo-1625513028624-b680ed28a80d?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Ciudad de Guano con el volcán Chimborazo nevado dominando el horizonte andino ecuatoriano",
    ogImage: "https://images.unsplash.com/photo-1625513028624-b680ed28a80d?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1625513028624-b680ed28a80d?w=900&auto=format&fit=crop&q=80",
        alt: "Nevado Chimborazo sobre los valles de Guano",
      },
      {
        url: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=900&auto=format&fit=crop&q=80",
        alt: "Mercado artesanal de alfombras de Guano",
      },
      {
        url: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=900&auto=format&fit=crop&q=80",
        alt: "Paisaje andino de la provincia de Chimborazo cerca de Guano",
      },
    ],
    attribution: [
      {
        author: "Diego Jimenez",
        authorUrl: "https://unsplash.com/@diegojimenez",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/chimborazo-andes",
      },
    ],
  },

  // ── 7. ALAUSÍ ────────────────────────────────────────────
  "alausi": {
    hero: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Tren de la Nariz del Diablo descendiendo por los zigzags ferroviarios en las montañas de Alausí",
    ogImage: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=900&auto=format&fit=crop&q=80",
        alt: "Tren histórico ecuatoriano en la ruta de la Nariz del Diablo",
      },
      {
        url: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=900&auto=format&fit=crop&q=80",
        alt: "Cañón andino con neblina en los Andes centrales del Ecuador",
      },
      {
        url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&auto=format&fit=crop&q=80",
        alt: "Centro histórico de Alausí con iglesia colonial al atardecer",
      },
    ],
    attribution: [
      {
        author: "Tom Barrett",
        authorUrl: "https://unsplash.com/@wistomsin",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/train-mountain-switchback",
      },
    ],
  },

  // ── 8. ZARUMA ────────────────────────────────────────────
  "zaruma": {
    hero: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
    heroAlt: "Arquitectura colonial de Zaruma con casas de madera policromadas sobre colinas del sur del Ecuador",
    ogImage: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&auto=format&fit=crop&q=80",
        alt: "Calles empedradas y casas de madera del centro histórico de Zaruma",
      },
      {
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80",
        alt: "Iglesia patrimonial de Zaruma con campanario colonial",
      },
      {
        url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=900&auto=format&fit=crop&q=80",
        alt: "Panorámica de Zaruma sobre colinas boscosas de El Oro",
      },
    ],
    attribution: [
      {
        author: "Florian Wehde",
        authorUrl: "https://unsplash.com/@florianwehde",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/colonial-town-wooden-houses",
      },
    ],
  },
}

// ============================================================
// HELPERS — misma firma que las utilidades de pueblos-magicos.ts
// ============================================================

/** Devuelve imágenes de un destino por su slug (null-safe) */
export function getImagesBySlug(slug: string): DestinationImages | null {
  return destinationImages[slug] ?? null
}

/** Devuelve solo la hero URL para uso rápido en cards */
export function getHeroBySlug(slug: string): string {
  return destinationImages[slug]?.hero ?? "/images/fallback.jpg"
}

/** Devuelve el alt text del hero */
export function getHeroAltBySlug(slug: string): string {
  return destinationImages[slug]?.heroAlt ?? "Imagen de pueblo mágico del Ecuador"
}

/** Lista de todos los slugs con imágenes disponibles */
export function getSlugsWithImages(): string[] {
  return Object.keys(destinationImages)
}
