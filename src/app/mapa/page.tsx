import type { Metadata } from "next";
import { getPueblosMapMarkers } from "@/src/data/pueblos-magicos";
import Navbar from "@/src/components/layout/Navbar";
import MapaClientWrapper from "@/src/components/mapa/MapaClientWrapper";

export const metadata: Metadata = {
  title: "Mapa Interactivo",
  description:
    "Explora los Pueblos Mágicos del Ecuador sobre un mapa interactivo. Geolocalización precisa de los 8 destinos certificados.",
  alternates: { canonical: "https://pueblosmagicos.ecuador.travel/mapa" },
};

export default function MapaPage() {
  const markers = getPueblosMapMarkers();

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8"
      >
        <header className="mb-4 flex items-baseline justify-between">
          <h1 className="font-display text-2xl sm:text-3xl font-light text-white">
            Mapa de destinos
          </h1>
          <p className="text-white/30 text-xs">
            {markers.length} pueblos · Ecuador
          </p>
        </header>

        <MapaClientWrapper markers={markers} />

        <p className="mt-3 text-white/20 text-xs text-center">
          Haz clic en cada marcador para ver información del destino.
        </p>
      </main>
    </>
  );
}
