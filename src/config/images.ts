// ============================================================
// IMAGE MANIFEST — PUEBLOS MÁGICOS DEL ECUADOR
// Fuente: Unsplash / Picsum · CC-licensed landscape photography
// ============================================================
//
// Each pueblo has:
//  - hero (1920×1080) — used as page hero, OG image, card thumbnail
//  - gallery[0] (1280×720) — secondary feature shot
//  - gallery[1] (1280×720) — tertiary detail shot
//
// blurDataURL is a 1×1 SVG in the pueblo's dominant color.
// This matches heroColorDominante in the data model, giving
// a visually coherent snap-in transition as the image loads.
// ============================================================

import type { ImageManifestMap } from "@/src/types/images";

// ─── Blur placeholder generator ─────────────────────────────
// Evaluated at build-time (Node.js) — Buffer is always available.
// Produces a data URI containing a 1×1 SVG in the given color,
// which Next.js stretches and blurs to fill the placeholder slot.
function blur(hex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${hex}"/></svg>`;
  const encoded =
    typeof Buffer !== "undefined"
      ? Buffer.from(svg).toString("base64")
      : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
}

// ─── Manifest ───────────────────────────────────────────────

export const IMAGE_MANIFEST: ImageManifestMap = {

  // ── 1. RUMIÑAHUI / SANGOLQUÍ ──────────────────────────────
  "ruminahui-sangolqui": {
    hero: {
      src: "/images/pueblos/ruminahui-hero.jpg",
      alt: "Cascadas volcánicas del río Pita a las faldas del Cotopaxi, Rumiñahui, Ecuador",
      blurDataURL: blur("#2D4A1E"),
      dominantColor: "#2D4A1E",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/ruminahui-2.jpg",
        alt: "Mercado dominical del hornado de Sangolquí, patrimonio culinario del Ecuador",
        blurDataURL: blur("#3A5828"),
        dominantColor: "#3A5828",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/ruminahui-3.jpg",
        alt: "Páramo andino del cantón Rumiñahui con vista al volcán Cotopaxi",
        blurDataURL: blur("#243E18"),
        dominantColor: "#243E18",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 2. CAYAMBE ────────────────────────────────────────────
  cayambe: {
    hero: {
      src: "/images/pueblos/cayambe-hero.jpg",
      alt: "Nevado Cayambe cubierto de nieve eterna en la línea ecuatorial, provincia de Pichincha",
      blurDataURL: blur("#1A2E3A"),
      dominantColor: "#1A2E3A",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/cayambe-2.jpg",
        alt: "Invernaderos de la Ruta de las Flores de Cayambe, mayor exportador de rosas de Ecuador",
        blurDataURL: blur("#1E3545"),
        dominantColor: "#1E3545",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/cayambe-3.jpg",
        alt: "Bizcochos artesanales horneados en leña, símbolo gastronómico de Cayambe",
        blurDataURL: blur("#152530"),
        dominantColor: "#152530",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 3. SAN ANTONIO DE IBARRA ──────────────────────────────
  "san-antonio-de-ibarra": {
    hero: {
      src: "/images/pueblos/san-antonio-ibarra-hero.jpg",
      alt: "Talleres de talla en madera de cedro en San Antonio de Ibarra, capital latinoamericana de la artesanía",
      blurDataURL: blur("#3A2010"),
      dominantColor: "#3A2010",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/san-antonio-2.jpg",
        alt: "Esculturas en madera de artesanos de San Antonio de Ibarra, Imbabura",
        blurDataURL: blur("#432515"),
        dominantColor: "#432515",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/san-antonio-3.jpg",
        alt: "Volcán Imbabura, el Taita Imbabura, guardián de San Antonio de Ibarra",
        blurDataURL: blur("#2E1A0C"),
        dominantColor: "#2E1A0C",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 4. COTACACHI ──────────────────────────────────────────
  cotacachi: {
    hero: {
      src: "/images/pueblos/cotacachi-hero.jpg",
      alt: "Laguna de Cuicocha en la caldera del volcán Cotacachi, Reserva Ecológica Cotacachi-Cayapas",
      blurDataURL: blur("#0D2B3A"),
      dominantColor: "#0D2B3A",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/cotacachi-2.jpg",
        alt: "Calle García Moreno de Cotacachi, bordada de talleres de marroquinería artesanal",
        blurDataURL: blur("#0F3040"),
        dominantColor: "#0F3040",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/cotacachi-3.jpg",
        alt: "Bolsos y artículos de cuero artesanal elaborados en los talleres de Cotacachi",
        blurDataURL: blur("#0A2230"),
        dominantColor: "#0A2230",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 5. PATATE ─────────────────────────────────────────────
  patate: {
    hero: {
      src: "/images/pueblos/patate-hero.jpg",
      alt: "Valle de Patate con el volcán Tungurahua activo dominando el horizonte, Tungurahua",
      blurDataURL: blur("#2A1A08"),
      dominantColor: "#2A1A08",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/patate-2.jpg",
        alt: "Viñas de Patate a 2200 msnm — el único vino andino certificado del Ecuador",
        blurDataURL: blur("#30200A"),
        dominantColor: "#30200A",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/patate-3.jpg",
        alt: "Cascada del Río Verde en el cañón volcánico entre Patate y Baños",
        blurDataURL: blur("#221506"),
        dominantColor: "#221506",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 6. GUANO ──────────────────────────────────────────────
  guano: {
    hero: {
      src: "/images/pueblos/guano-hero.jpg",
      alt: "Nevado Chimborazo (6268 msnm), el punto más lejano al centro de la Tierra, Chimborazo",
      blurDataURL: blur("#1A1A2A"),
      dominantColor: "#1A1A2A",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/guano-2.jpg",
        alt: "Alfombras de lana en telar artesanal con diseños precolombinos de Guano",
        blurDataURL: blur("#1E1E30"),
        dominantColor: "#1E1E30",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/guano-3.jpg",
        alt: "Vicuñas reintroducidas en la Reserva de Producción Faunística Chimborazo",
        blurDataURL: blur("#161622"),
        dominantColor: "#161622",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 7. ALAUSÍ ─────────────────────────────────────────────
  alausi: {
    hero: {
      src: "/images/pueblos/alausi-hero.jpg",
      alt: "Nariz del Diablo — el tramo ferroviario más dramático del mundo en zigzag, Chimborazo",
      blurDataURL: blur("#1A0A05"),
      dominantColor: "#1A0A05",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/alausi-2.jpg",
        alt: "Tren Ecuador en el patrimonio ferroviario del zigzag de la Nariz del Diablo",
        blurDataURL: blur("#200E08"),
        dominantColor: "#200E08",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/alausi-3.jpg",
        alt: "Centro histórico de Alausí con casas coloniales de adobe y la estatua de San Pedro",
        blurDataURL: blur("#150A04"),
        dominantColor: "#150A04",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },

  // ── 8. ZARUMA ─────────────────────────────────────────────
  zaruma: {
    hero: {
      src: "/images/pueblos/zaruma-hero.jpg",
      alt: "Centro histórico de Zaruma — más de 100 edificios de madera del siglo XIX, El Oro",
      blurDataURL: blur("#2A1500"),
      dominantColor: "#2A1500",
      width: 1920,
      height: 1080,
      credit: "Picsum Photos · Unsplash License",
    },
    gallery: [
      {
        src: "/images/pueblos/zaruma-2.jpg",
        alt: "Café orense de especialidad de la provincia de El Oro — premiado internacionalmente",
        blurDataURL: blur("#311800"),
        dominantColor: "#311800",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
      {
        src: "/images/pueblos/zaruma-3.jpg",
        alt: "Minas de oro coloniales de Zaruma — visitables desde el siglo XVI",
        blurDataURL: blur("#211100"),
        dominantColor: "#211100",
        width: 1280,
        height: 720,
        credit: "Picsum Photos",
      },
    ],
  },
};
