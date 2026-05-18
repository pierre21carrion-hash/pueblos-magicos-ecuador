// ============================================================
// PUEBLOS MAGICOS DEL ECUADOR - SISTEMA CENTRAL DE IMAGENES
// ============================================================
//
// Todas las imagenes son locales y provienen de Wikimedia Commons.
// Licencias: CC BY / CC BY-SA, validas para uso comercial con atribucion.
// Cambios aplicados: descarga local, redimensionado para web y encuadre
// responsivo via CSS object-fit en Next.js.
// ============================================================

export type ImageAttribution = {
  author: string;
  source: "Wikimedia Commons";
  license: string;
  licenseUrl: string;
  url: string;
  originalFile: string;
  commercialUse: true;
  changes: string;
};

export type DestinationImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  dominantColor: string;
  attribution: ImageAttribution;
};

export type DestinationImages = {
  hero: DestinationImage;
  gallery: DestinationImage[];
  ogImage?: string;
};

const changes = "Redimensionada para web; encuadre responsivo con CSS object-fit.";

function commonsAttribution(
  author: string,
  license: string,
  licenseUrl: string,
  url: string,
  originalFile: string,
): ImageAttribution {
  return {
    author,
    source: "Wikimedia Commons",
    license,
    licenseUrl,
    url,
    originalFile,
    commercialUse: true,
    changes,
  };
}

export const destinationImages: Record<string, DestinationImages> = {
  "ruminahui-sangolqui": {
    hero: {
      src: "/images/pueblos/ruminahui-sangolqui/hero.jpg",
      alt: "Volcan Ruminahui visto desde el paramo del Cotopaxi, paisaje andino asociado al canton Ruminahui",
      width: 2000,
      height: 1337,
      dominantColor: "#2D4A1E",
      attribution: commonsAttribution(
        "Dallas Krentzel",
        "CC BY 2.0",
        "https://creativecommons.org/licenses/by/2.0",
        "https://commons.wikimedia.org/wiki/File:Rumi%C3%B1ahui,_an_old_dormant_volcano_seen_from_the_slopes_of_Cotopaxi_(7429229278).jpg",
        "Rumiñahui, an old dormant volcano seen from the slopes of Cotopaxi (7429229278).jpg",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/ruminahui-sangolqui/1.jpg",
        alt: "Rio Pita entre vegetacion andina, corredor natural de Ruminahui y Sangolqui",
        width: 1400,
        height: 936,
        dominantColor: "#3A5828",
        attribution: commonsAttribution(
          "Diego Tirira",
          "CC BY-SA 2.0",
          "https://creativecommons.org/licenses/by-sa/2.0",
          "https://commons.wikimedia.org/wiki/File:P_R%C3%ADo_Pita_1004_(20)_(17198495958).jpg",
          "P Río Pita 1004 (20) (17198495958).jpg",
        ),
      },
      {
        src: "/images/pueblos/ruminahui-sangolqui/2.jpg",
        alt: "Centro de Sangolqui con arquitectura cotidiana del valle de Los Chillos",
        width: 1400,
        height: 1050,
        dominantColor: "#243E18",
        attribution: commonsAttribution(
          "Diego Tirira",
          "CC BY-SA 2.0",
          "https://creativecommons.org/licenses/by-sa/2.0",
          "https://commons.wikimedia.org/wiki/File:Centro_de_Sangolqu%C3%AD.jpg",
          "Centro de Sangolquí.jpg",
        ),
      },
    ],
  },

  cayambe: {
    hero: {
      src: "/images/pueblos/cayambe/hero.jpg",
      alt: "Nevado Cayambe cubierto de hielo sobre roca volcanica en la linea ecuatorial",
      width: 2000,
      height: 1333,
      dominantColor: "#1A2E3A",
      attribution: commonsAttribution(
        "Natalia Cartolini",
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0",
        "https://commons.wikimedia.org/wiki/File:Nevado_Cayambe_Ecuador.jpg",
        "Nevado Cayambe Ecuador.jpg",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/cayambe/1.jpg",
        alt: "Pueblo Kayambi transportando la Rama de Gallos durante una celebracion comunitaria",
        width: 1400,
        height: 1050,
        dominantColor: "#1E3545",
        attribution: commonsAttribution(
          "TupakAmaruIshkay",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Kayambis_transportan_la_Rama_de_Gallos.jpg",
          "Kayambis transportan la Rama de Gallos.jpg",
        ),
      },
      {
        src: "/images/pueblos/cayambe/2.jpg",
        alt: "Bizcochos de Cayambe, oficio gastronomico tradicional del norte andino",
        width: 787,
        height: 1400,
        dominantColor: "#152530",
        attribution: commonsAttribution(
          "David C. S.",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Bizcochos_de_Cayambe.jpg",
          "Bizcochos de Cayambe.jpg",
        ),
      },
    ],
  },

  "san-antonio-de-ibarra": {
    hero: {
      src: "/images/pueblos/san-antonio-de-ibarra/hero.jpg",
      alt: "Plaza principal de San Antonio de Ibarra con talleres artesanales al fondo",
      width: 2000,
      height: 1355,
      dominantColor: "#3A2010",
      attribution: commonsAttribution(
        "Diego Delso",
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0",
        "https://commons.wikimedia.org/wiki/File:Plaza_de_armas,_San_Antonio_de_Ibarra,_Ecuador,_2015-07-21,_DD_16.JPG",
        "Plaza de armas, San Antonio de Ibarra, Ecuador, 2015-07-21, DD 16.JPG",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/san-antonio-de-ibarra/1.jpg",
        alt: "Esculturas de madera en el parque central de San Antonio de Ibarra",
        width: 1400,
        height: 787,
        dominantColor: "#432515",
        attribution: commonsAttribution(
          "David C. S.",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Esculturas_de_San_Antonio_-_Ibarra.jpg",
          "Esculturas de San Antonio - Ibarra.jpg",
        ),
      },
      {
        src: "/images/pueblos/san-antonio-de-ibarra/2.jpg",
        alt: "Iglesia de San Antonio de Ibarra, arquitectura patrimonial de Imbabura",
        width: 1400,
        height: 997,
        dominantColor: "#2E1A0C",
        attribution: commonsAttribution(
          "Diego Delso",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Iglesia_de_la_Catedral,_San_Antonio_de_Ibarra,_Ecuador,_2015-07-21,_DD_21.JPG",
          "Iglesia de la Catedral, San Antonio de Ibarra, Ecuador, 2015-07-21, DD 21.JPG",
        ),
      },
    ],
  },

  cotacachi: {
    hero: {
      src: "/images/pueblos/cotacachi/hero.jpg",
      alt: "Laguna de Cuicocha en la Reserva Ecologica Cotacachi-Cayapas",
      width: 2000,
      height: 1333,
      dominantColor: "#0D2B3A",
      attribution: commonsAttribution(
        "Bernard Gagnon",
        "CC BY-SA 3.0",
        "https://creativecommons.org/licenses/by-sa/3.0",
        "https://commons.wikimedia.org/wiki/File:Laguna_de_Cuicocha_02.jpg",
        "Laguna de Cuicocha 02.jpg",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/cotacachi/1.jpg",
        alt: "Taller de cuero en Cotacachi, oficio artesanal de la ciudad",
        width: 1400,
        height: 1050,
        dominantColor: "#0F3040",
        attribution: commonsAttribution(
          "JOJOtheWhale.bronxtale",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Cotacachi-Cayapasm.Leather_Shop.jpg",
          "Cotacachi-Cayapasm.Leather Shop.jpg",
        ),
      },
      {
        src: "/images/pueblos/cotacachi/2.jpg",
        alt: "Comunidad rural cerca de Cotacachi entre montanas de Imbabura",
        width: 1400,
        height: 933,
        dominantColor: "#0A2230",
        attribution: commonsAttribution(
          "Arabsalam",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Cotacachi_Ecuador_789.JPG",
          "Cotacachi Ecuador 789.JPG",
        ),
      },
    ],
  },

  patate: {
    hero: {
      src: "/images/pueblos/patate/hero.jpg",
      alt: "Volcan Tungurahua visto desde Patate entre nubes del valle interandino",
      width: 2000,
      height: 1500,
      dominantColor: "#2A1A08",
      attribution: commonsAttribution(
        "HenrikKarhu",
        "CC BY 3.0",
        "https://creativecommons.org/licenses/by/3.0",
        "https://commons.wikimedia.org/wiki/File:Tungurahua_desde_patate.JPG",
        "Tungurahua desde patate.JPG",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/patate/1.jpg",
        alt: "Parque Simon Bolivar en el centro cantonal de Patate",
        width: 1400,
        height: 788,
        dominantColor: "#30200A",
        attribution: commonsAttribution(
          "Jfbeltranr",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Parque_Bol%C3%ADvar_en_Patate.jpg",
          "Parque Bolívar en Patate.jpg",
        ),
      },
      {
        src: "/images/pueblos/patate/2.jpg",
        alt: "Valle de Patate visto desde las laderas de Tungurahua",
        width: 1400,
        height: 1045,
        dominantColor: "#221506",
        attribution: commonsAttribution(
          "DIOHER_PAVAL",
          "CC BY 3.0",
          "https://creativecommons.org/licenses/by/3.0",
          "https://commons.wikimedia.org/wiki/File:VALLE_DEL_PATATE_-_panoramio.jpg",
          "VALLE DEL PATATE - panoramio.jpg",
        ),
      },
    ],
  },

  guano: {
    hero: {
      src: "/images/pueblos/guano/hero.jpg",
      alt: "Redondel de la Tejedora en Guano, simbolo del oficio textil artesanal",
      width: 2000,
      height: 1125,
      dominantColor: "#1A1A2A",
      attribution: commonsAttribution(
        "David C. S.",
        "CC BY-SA 3.0",
        "https://creativecommons.org/licenses/by-sa/3.0",
        "https://commons.wikimedia.org/wiki/File:Redondel_de_la_Tejedora,_Guano.jpg",
        "Redondel de la Tejedora, Guano.jpg",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/guano/1.jpg",
        alt: "Venta de artesanias en el Parque Central de Guano",
        width: 1400,
        height: 787,
        dominantColor: "#1E1E30",
        attribution: commonsAttribution(
          "David C. S.",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Artesan%C3%ADas_en_Parque_Central_de_Guano.jpg",
          "Artesanías en Parque Central de Guano.jpg",
        ),
      },
      {
        src: "/images/pueblos/guano/2.jpg",
        alt: "Edificio del Gobierno Municipal de Guano en el centro historico",
        width: 1400,
        height: 787,
        dominantColor: "#161622",
        attribution: commonsAttribution(
          "David C. S.",
          "CC BY-SA 3.0",
          "https://creativecommons.org/licenses/by-sa/3.0",
          "https://commons.wikimedia.org/wiki/File:GAD_Municipal_de_Guano.jpg",
          "GAD Municipal de Guano.jpg",
        ),
      },
    ],
  },

  alausi: {
    hero: {
      src: "/images/pueblos/alausi/hero.jpg",
      alt: "Tren de la Nariz del Diablo avanzando entre montanas verdes de Alausi",
      width: 2000,
      height: 1324,
      dominantColor: "#1A0A05",
      attribution: commonsAttribution(
        "Emanuel Agustin Lorenzoni Macchi",
        "CC BY 2.0",
        "https://creativecommons.org/licenses/by/2.0",
        "https://commons.wikimedia.org/wiki/File:Alaus%C3%AD_-_Tren_Nariz_del_Diablo.jpg",
        "Alausí - Tren Nariz del Diablo.jpg",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/alausi/1.jpg",
        alt: "Panoramica urbana de Alausi desde la carretera E35",
        width: 1400,
        height: 933,
        dominantColor: "#200E08",
        attribution: commonsAttribution(
          "Ymblanter",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Alaus%C3%AD_Panorama_of_the_city_from_E35_at_the_northeast.jpg",
          "Alausí Panorama of the city from E35 at the northeast.jpg",
        ),
      },
      {
        src: "/images/pueblos/alausi/2.jpg",
        alt: "Recorrido ferroviario de la Nariz del Diablo entre quebradas andinas",
        width: 1400,
        height: 1050,
        dominantColor: "#150A04",
        attribution: commonsAttribution(
          "Arabsalam",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Bahnfahrt_auf_dem_Nariz_del_Diablo_Ecuador20.jpg",
          "Bahnfahrt auf dem Nariz del Diablo Ecuador20.jpg",
        ),
      },
    ],
  },

  zaruma: {
    hero: {
      src: "/images/pueblos/zaruma/hero.jpg",
      alt: "Vista panoramica de Zaruma sobre colinas y techos patrimoniales de El Oro",
      width: 2000,
      height: 1505,
      dominantColor: "#2A1500",
      attribution: commonsAttribution(
        "Martin Vasco",
        "CC BY-SA 4.0",
        "https://creativecommons.org/licenses/by-sa/4.0",
        "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Zaruma,_Ecuador.jpg",
        "Panoramic view of Zaruma, Ecuador.jpg",
      ),
    },
    gallery: [
      {
        src: "/images/pueblos/zaruma/1.jpg",
        alt: "Iglesia y plaza de la Independencia de Zaruma durante una celebracion local",
        width: 1400,
        height: 940,
        dominantColor: "#311800",
        attribution: commonsAttribution(
          "Danny Arevalo",
          "CC BY-SA 3.0",
          "https://creativecommons.org/licenses/by-sa/3.0",
          "https://commons.wikimedia.org/wiki/File:Castillo,_Iglesia,_Plaza_de_la_Independencia.jpg",
          "Castillo, Iglesia, Plaza de la Independencia.jpg",
        ),
      },
      {
        src: "/images/pueblos/zaruma/2.jpg",
        alt: "Desfile en Zaruma entre balcones y arquitectura tradicional de madera",
        width: 1400,
        height: 1050,
        dominantColor: "#211100",
        attribution: commonsAttribution(
          "Arabsalam",
          "CC BY-SA 4.0",
          "https://creativecommons.org/licenses/by-sa/4.0",
          "https://commons.wikimedia.org/wiki/File:Zaruma_Ecuador619.jpg",
          "Zaruma Ecuador619.jpg",
        ),
      },
    ],
  },
};

export function getImagesBySlug(slug: string): DestinationImages | null {
  return destinationImages[slug] ?? null;
}

export function getHeroBySlug(slug: string): string {
  return destinationImages[slug]?.hero.src ?? destinationImages["ruminahui-sangolqui"].hero.src;
}

export function getHeroAltBySlug(slug: string): string {
  return destinationImages[slug]?.hero.alt ?? "Imagen de pueblo magico del Ecuador";
}

export function getSlugsWithImages(): string[] {
  return Object.keys(destinationImages);
}

export function getImageCredit(image: DestinationImage): string {
  return `${image.attribution.author} · ${image.attribution.source} · ${image.attribution.license}`;
}

export function getImageCreditsBySlug(slug: string): string[] {
  const images = getImagesBySlug(slug);
  if (!images) return [];

  return Array.from(
    new Set([images.hero, ...images.gallery].map((image) => getImageCredit(image))),
  );
}
