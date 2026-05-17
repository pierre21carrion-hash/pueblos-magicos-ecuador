import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pueblos Mágicos del Ecuador",
    short_name: "Pueblos Mágicos",
    description:
      "Explora los Pueblos Mágicos y Rincones Mágicos del Ecuador certificados por el Ministerio de Turismo.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0F1115",
    theme_color: "#0F1115",
    lang: "es",
    categories: ["travel", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Explorador de Pueblos Mágicos — escritorio",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "390x844",
        type: "image/png",
        label: "Explorador de Pueblos Mágicos — móvil",
      },
    ],
    shortcuts: [
      {
        name: "Explorador",
        url: "/pueblos",
        description: "Busca y filtra destinos",
      },
      {
        name: "Descubrir",
        url: "/descubrir",
        description: "Quiz de recomendación personalizada",
      },
      {
        name: "Mapa",
        url: "/mapa",
        description: "Ver todos los destinos en el mapa",
      },
    ],
  };
}
