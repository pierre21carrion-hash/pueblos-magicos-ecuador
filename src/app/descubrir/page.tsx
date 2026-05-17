import type { Metadata } from "next";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import DescubrirClient from "./DescubrirClient";

const SITE_URL = "https://pueblosmagicos.ecuador.travel";

export const metadata: Metadata = {
  title: "Descubre tu Destino Ideal | Pueblos Mágicos del Ecuador",
  description:
    "Responde nuestro quiz inteligente y descubre qué Pueblos Mágicos del Ecuador se adaptan mejor a tus preferencias de aventura, clima, gastronomía y más.",
  alternates: {
    canonical: `${SITE_URL}/descubrir`,
  },
  openGraph: {
    title: "Descubre tu Destino Ideal | Pueblos Mágicos del Ecuador",
    description:
      "Quiz personalizado para encontrar tu Pueblo Mágico ideal según tus preferencias de viaje.",
    url: `${SITE_URL}/descubrir`,
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Recomendador de Pueblos Mágicos del Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Descubre tu Destino Ideal | Pueblos Mágicos del Ecuador",
    description: "Quiz personalizado para encontrar tu Pueblo Mágico ideal.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
};

// JSON-LD for the interactive tool
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Recomendador de Pueblos Mágicos del Ecuador",
  description:
    "Herramienta interactiva para descubrir Pueblos Mágicos del Ecuador según preferencias personales de viaje.",
  url: `${SITE_URL}/descubrir`,
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    name: "Pueblos Mágicos del Ecuador",
    url: SITE_URL,
  },
};

export default function DescubrirPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <DescubrirClient />
      <Footer />
    </>
  );
}
