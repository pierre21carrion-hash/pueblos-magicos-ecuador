// ============================================================
// PUEBLOS MÁGICOS DEL ECUADOR — Sistema de Imágenes Final
// Archivo: src/data/images.ts
//
// 32 imágenes totales:
// - 18 imágenes Unsplash verificadas
// - 8 imágenes Gemini generadas (local)
// - 6 imágenes Unsplash adicionales para completar galerías
// ============================================================

export type ImageAttribution = {
  author: string
  authorUrl: string
  source: "Unsplash" | "Pexels" | "Gemini" | "Generated"
  license: string
  commercialUse: boolean
  originalUrl?: string
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
  ogImage?: string
}

export const destinationImages: Record<string, DestinationImages> = {

  // ── 1. RUMIÑAHUI / SANGOLQUÍ ─────────────────────────────
  "ruminahui-sangolqui": {
    hero: "https://images.unsplash.com/photo-1501684691657-cf3012635478?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Volcán Cotopaxi nevado al amanecer sobre el Valle de los Chillos, Sangolquí",
    ogImage: "https://images.unsplash.com/photo-1501684691657-cf3012635478?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1638709434603-347adbdf7721?w=900&auto=format&fit=crop&q=80",
        alt: "Cotopaxi sobre pasto seco de páramo ecuatoriano",
      },
      {
        url: "https://images.unsplash.com/photo-1606591808963-8fc3c63fa6a2?w=900&auto=format&fit=crop&q=80",
        alt: "Volcán Cotopaxi blanco y negro bajo cielo azul",
      },
      {
        url: "https://images.unsplash.com/photo-1643302408853-a0171accc39b?w=900&auto=format&fit=crop&q=80",
        alt: "Caballos pastando con Cotopaxi nevado al fondo",
      },
    ],
    attribution: [
      {
        author: "César Viteri",
        authorUrl: "https://unsplash.com/@srviteri",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/zcyiFpt0E_E",
      },
    ],
  },

  // ── 2. CAYAMBE ───────────────────────────────────────────
  "cayambe": {
    hero: "https://images.unsplash.com/photo-1587325840195-f66867235911?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Paisaje de montañas andinas verdes en la región de Cayambe",
    ogImage: "https://images.unsplash.com/photo-1587325840195-f66867235911?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1546702005-7f8e5aeab4a6?w=900&auto=format&fit=crop&q=80",
        alt: "Sacos de granos y hierbas medicinales en mercado andino de Otavalo",
      },
      {
        url: "https://images.unsplash.com/photo-1729197083804-a2bbf29ee8d6?w=900&auto=format&fit=crop&q=80",
        alt: "Mujeres en traje tradicional indígena del norte ecuatoriano",
      },
      {
        url: "https://images.unsplash.com/photo-1576071034086-7e49b8c786d4?w=900&auto=format&fit=crop&q=80",
        alt: "Volcán nevado en paisaje andino ecuatoriano",
      },
    ],
    attribution: [
      {
        author: "Clayton Manche",
        authorUrl: "https://unsplash.com/@claymanche",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/gxKibd6RCYI",
      },
    ],
  },

  // ── 3. SAN ANTONIO DE IBARRA ─────────────────────────────
  "san-antonio-de-ibarra": {
    hero: "https://images.unsplash.com/photo-1587325978140-6c7217f5c74d?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Pueblo andino al pie del volcán Imbabura en San Antonio de Ibarra",
    ogImage: "https://images.unsplash.com/photo-1587325978140-6c7217f5c74d?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "/images/gemini/Gemini_Generated_Image_qea9kaqea9kaqea9.png",
        alt: "Taller artesanal de tallado en madera en San Antonio de Ibarra",
      },
      {
        url: "/images/gemini/Gemini_Generated_Image_sda8yysda8yysda8.png",
        alt: "Artesano ecuatoriano tallando madera con cincel y martillo",
      },
      {
        url: "/images/gemini/Gemini_Generated_Image_ut8yc1ut8yc1ut8y.png",
        alt: "Galería de esculturas de madera religiosas en San Antonio de Ibarra",
      },
    ],
    attribution: [
      {
        author: "Gemini AI",
        authorUrl: "https://gemini.google.com",
        source: "Generated",
        license: "Generated for Commercial Use",
        commercialUse: true,
      },
    ],
  },

  // ── 4. COTACACHI ─────────────────────────────────────────
  "cotacachi": {
    hero: "https://images.unsplash.com/photo-1748013298733-0ae693a25de9?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Bote flotando en lago andino de Cotacachi",
    ogImage: "https://images.unsplash.com/photo-1748013298733-0ae693a25de9?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1580918860823-f0072f5a6719?w=900&auto=format&fit=crop&q=80",
        alt: "Lagos de cráter volcánico con montañas al fondo",
      },
      {
        url: "https://images.unsplash.com/photo-1694206078595-460a3ec27772?w=900&auto=format&fit=crop&q=80",
        alt: "Montaña andina con lago en las faldas",
      },
      {
        url: "/images/gemini/Gemini_Generated_Image_and0znand0znand0.png",
        alt: "Taller artesanal de cuero en Cotacachi, Ecuador",
      },
    ],
    attribution: [
      {
        author: "Cabadiaz",
        authorUrl: "https://unsplash.com/@cabadiaz",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/XpLMco8_XfU",
      },
    ],
  },

  // ── 5. PATATE ────────────────────────────────────────────
  "patate": {
    hero: "https://images.unsplash.com/photo-1728052375405-f0117f1d03cd?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Volcán andino con nubes sobre el valle de Patate",
    ogImage: "https://images.unsplash.com/photo-1728052375405-f0117f1d03cd?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1643302406901-7b6a366f69a5?w=900&auto=format&fit=crop&q=80",
        alt: "Volcán nevado distante sobre páramo ecuatoriano",
      },
      {
        url: "https://images.unsplash.com/photo-1697497315202-1af707416c0b?w=900&auto=format&fit=crop&q=80",
        alt: "Vista aérea de montaña andina desde avión",
      },
      {
        url: "https://images.unsplash.com/photo-1695167849032-9428bc6bec09?w=900&auto=format&fit=crop&q=80",
        alt: "Casa rural sobre colina con montaña al fondo",
      },
    ],
    attribution: [
      {
        author: "Paul Jacome",
        authorUrl: "https://unsplash.com/@ankalago",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/ZRe4vXIaflY",
      },
    ],
  },

  // ── 6. GUANO ─────────────────────────────────────────────
  "guano": {
    hero: "https://images.unsplash.com/photo-1641312961118-eda4b3512f43?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Volcán Chimborazo nevado dominando el horizonte de Guano",
    ogImage: "https://images.unsplash.com/photo-1641312961118-eda4b3512f43?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1541388810897-3964fe779a8f?w=900&auto=format&fit=crop&q=80",
        alt: "Montaña cubierta de nieve — Chimborazo",
      },
      {
        url: "https://images.unsplash.com/photo-1677857387449-723b91ffd0e3?w=900&auto=format&fit=crop&q=80",
        alt: "Manada de llamas en páramo con montaña al fondo",
      },
      {
        url: "https://images.unsplash.com/photo-1649286184088-0b99e8afd509?w=900&auto=format&fit=crop&q=80",
        alt: "Chimborazo con nube sobre paisaje andino",
      },
    ],
    attribution: [
      {
        author: "Jorge Orozco",
        authorUrl: "https://unsplash.com/@jorgeoandres",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/1fM_hvPSf0U",
      },
    ],
  },

  // ── 7. ALAUSÍ ────────────────────────────────────────────
  "alausi": {
    hero: "https://images.unsplash.com/photo-1504038154755-752b537dddd0?w=1600&auto=format&fit=crop&q=85",
    heroAlt: "Tren histórico en la ruta del Nariz del Diablo descendiendo por las montañas de Alausí",
    ogImage: "https://images.unsplash.com/photo-1504038154755-752b537dddd0?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1641312961118-eda4b3512f43?w=900&auto=format&fit=crop&q=80",
        alt: "Volcán Chimborazo nevado — montaña icónica de la región",
      },
      {
        url: "https://images.unsplash.com/photo-1675991016722-72e5d467b1c0?w=900&auto=format&fit=crop&q=80",
        alt: "Camino en entorno de Chimborazo",
      },
      {
        url: "https://images.unsplash.com/photo-1578580896025-a6ab6881d54f?w=900&auto=format&fit=crop&q=80",
        alt: "Afloramiento rocoso andino en región de Alausí",
      },
    ],
    attribution: [
      {
        author: "Fernando Tapia",
        authorUrl: "https://unsplash.com/@ezekiel",
        source: "Unsplash",
        license: "Unsplash License",
        commercialUse: true,
        originalUrl: "https://unsplash.com/photos/qP2bR5Ky3JE",
      },
    ],
  },

  // ── 8. ZARUMA ────────────────────────────────────────────
  "zaruma": {
    hero: "/images/gemini/Gemini_Generated_Image_f646bf646bf646bf.png",
    heroAlt: "Casas coloniales de madera policromada en Zaruma al atardecer",
    ogImage: "/images/gemini/Gemini_Generated_Image_f646bf646bf646bf.png",
    gallery: [
      {
        url: "/images/gemini/Gemini_Generated_Image_mn4bfmn4bfmn4bfm.png",
        alt: "Iglesia colonial de Zaruma con campanario blanco",
      },
      {
        url: "/images/gemini/Gemini_Generated_Image_n9d63on9d63on9d6.png",
        alt: "Calle empedrada del centro histórico de Zaruma",
      },
      {
        url: "/images/gemini/Gemini_Generated_Image_p01ibgp01ibgp01i.png",
        alt: "Vista panorámica aérea de Zaruma sobre colinas boscosas",
      },
    ],
    attribution: [
      {
        author: "Gemini AI",
        authorUrl: "https://gemini.google.com",
        source: "Generated",
        license: "Generated for Commercial Use",
        commercialUse: true,
      },
    ],
  },
}

// ============================================================
// HELPERS
// ============================================================

export function getImagesBySlug(slug: string): DestinationImages | null {
  return destinationImages[slug] ?? null
}

export function getHeroBySlug(slug: string): string {
  return destinationImages[slug]?.hero ?? "/images/fallback.jpg"
}

export function getHeroAltBySlug(slug: string): string {
  return destinationImages[slug]?.heroAlt ?? "Imagen de pueblo mágico del Ecuador"
}

export function getSlugsWithImages(): string[] {
  return Object.keys(destinationImages)
}
