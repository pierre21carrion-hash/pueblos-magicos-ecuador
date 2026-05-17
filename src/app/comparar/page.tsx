import type { Metadata } from "next";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { getPuebloBySlug, getPueblosCards } from "@/src/data/pueblos-magicos";
import type { PuebloMagico } from "@/src/types";
import CompararClient from "./CompararClient";

const SITE_URL = "https://pueblosmagicos.ecuador.travel";

interface Props {
  searchParams: Promise<{ ids?: string }>;
}

function parseSlugs(idsParam: string | undefined): string[] {
  return (idsParam ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { ids } = await searchParams;
  const slugs = parseSlugs(ids);
  const pueblos = slugs
    .map(getPuebloBySlug)
    .filter((p): p is PuebloMagico => Boolean(p));

  const title =
    pueblos.length >= 2
      ? `${pueblos.map((p) => p.nombreCorto).join(" vs ")} — Comparación | Pueblos Mágicos`
      : "Comparar Destinos | Pueblos Mágicos del Ecuador";

  const description =
    pueblos.length >= 2
      ? `Compara ${pueblos.map((p) => p.nombre).join(", ")} lado a lado: altitud, clima, gastronomía, biodiversidad y más.`
      : "Compara hasta 3 Pueblos Mágicos del Ecuador lado a lado y elige tu próximo destino.";

  const canonicalUrl =
    slugs.length > 0
      ? `${SITE_URL}/comparar?ids=${slugs.join(",")}`
      : `${SITE_URL}/comparar`;

  const ogImage =
    pueblos.length > 0
      ? (pueblos[0].seo.ogImage ?? pueblos[0].multimedia.heroImage)
      : `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CompararPage({ searchParams }: Props) {
  const { ids } = await searchParams;
  const slugs = parseSlugs(ids);

  const initialPueblos = slugs
    .map(getPuebloBySlug)
    .filter((p): p is PuebloMagico => Boolean(p));

  const allCards = getPueblosCards();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparación de Pueblos Mágicos del Ecuador",
    description: "Comparativa detallada de destinos mágicos certificados del Ecuador",
    numberOfItems: initialPueblos.length,
    itemListElement: initialPueblos.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nombre,
      url: `${SITE_URL}/pueblos/${p.seo.slug}`,
      description: p.seo.descripcionMeta,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <CompararClient initialPueblos={initialPueblos} allCards={allCards} />
      <Footer />
    </>
  );
}
