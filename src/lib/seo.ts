// ============================================================
// SEO METADATA GENERATOR — PUEBLOS MÁGICOS DEL ECUADOR
// Genera metadata dinámica para Next.js App Router
// Compatible con: generateMetadata(), JSON-LD Schema.org
// ============================================================

import type { PuebloMagico } from "../types";

const SITE_URL = "https://pueblosmagicos.ecuador.travel";
const SITE_NAME = "Pueblos Mágicos del Ecuador";
const DEFAULT_OG = `${SITE_URL}/og-default.jpg`;

function absoluteUrl(url: string | undefined): string {
  if (!url) return DEFAULT_OG;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

// ─── METADATA POR PÁGINA INDIVIDUAL ─────────────────────────

export function generarMetadataPueblo(pueblo: PuebloMagico) {
  const title = pueblo.seo.titulo;
  const description = pueblo.seo.descripcionMeta;
  const ogImage = absoluteUrl(pueblo.seo.ogImage ?? pueblo.multimedia.heroImage);
  const canonicalUrl = `${SITE_URL}/pueblos/${pueblo.seo.slug}`;

  return {
    title,
    description,
    keywords: pueblo.seo.keywords,
    authors: [{ name: "Ministerio de Turismo del Ecuador" }],
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${pueblo.nombre} — Pueblo Mágico del Ecuador`,
        },
      ],
      locale: "es_EC",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── JSON-LD SCHEMA.ORG ──────────────────────────────────────

export function generarSchemaJsonLd(pueblo: PuebloMagico): object {
  const base = {
    "@context": "https://schema.org",
    "@type": pueblo.seo.schemaType,
    name: pueblo.nombre,
    description: pueblo.narrativa.descripcionCorta,
    url: `${SITE_URL}/pueblos/${pueblo.seo.slug}`,
    image: absoluteUrl(pueblo.multimedia.heroImage),
    geo: {
      "@type": "GeoCoordinates",
      latitude: pueblo.coordenadas.lat,
      longitude: pueblo.coordenadas.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EC",
      addressRegion: pueblo.provincia,
    },
    touristType: pueblo.atractivos.map((a) => a.tipo),
    keywords: pueblo.seo.keywords.join(", "),
  };

  // Enriquecer según tipo de schema
  if (pueblo.seo.schemaType === "TouristAttraction") {
    return {
      ...base,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
    };
  }

  return base;
}

// ─── BREADCRUMBS SCHEMA ──────────────────────────────────────

export function generarBreadcrumbSchema(pueblo: PuebloMagico): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pueblos Mágicos",
        item: `${SITE_URL}/pueblos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pueblo.nombre,
        item: `${SITE_URL}/pueblos/${pueblo.seo.slug}`,
      },
    ],
  };
}

// ─── METADATA GLOBAL DEL SITIO ───────────────────────────────

export const metadataGlobal = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Explora los 21 Pueblos Mágicos y 2 Rincones Mágicos del Ecuador: destinos con valor cultural, histórico, arquitectónico y natural, certificados por el Ministerio de Turismo.",
  keywords: [
    "Pueblos Mágicos Ecuador",
    "turismo Ecuador",
    "destinos Ecuador",
    "patrimonio cultural Ecuador",
    "Ministerio de Turismo Ecuador",
    "viaje Ecuador",
    "4 Mundos Ecuador",
  ],
  openGraph: {
    type: "website" as const,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_EC",
    images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" as const },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
