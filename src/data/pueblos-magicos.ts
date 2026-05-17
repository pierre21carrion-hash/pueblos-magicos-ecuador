// ============================================================
// PUEBLOS MÁGICOS DEL ECUADOR — BASE DE DATOS OFICIAL
// Programa "4 Mundos" · Ministerio de Turismo · desde 2019
// Fuente: datos oficiales proporcionados por el programa
// ============================================================

import type {
  PuebloMagico,
  PueblosMagicosDB,
  PuebloCard,
  PuebloMapMarker,
  PuebloComparable,
  FiltrosPueblos,
} from "../types";

// ─── REGISTRO COMPLETO ──────────────────────────────────────

export const pueblosMagicosDB: PueblosMagicosDB = [

  // ── 1. RUMIÑAHUI / SANGOLQUÍ ─────────────────────────────
  {
    id: "ruminahui-sangolqui",
    nombre: "Rumiñahui / Sangolquí",
    nombreCorto: "Sangolquí",
    provincia: "Pichincha",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: -0.3325,
      lng: -78.4519,
      zoom: 14,
      dms: "0°19′57″S · 78°27′7″O",
    },
    topografia: {
      altitudMsnm: 2535,
      relieve: "Valle interandino",
      referenciaGeografica: "Volcán Cotopaxi / Río Pita",
      cuencaHidrografica: "Río San Pedro",
    },
    ruta: {
      distanciaKm: 33,
      tiempoEstimado: "25 min",
      nivelDificultad: "Fácil",
      via: "Autopista General Rumiñahui",
      indicaciones: [
        "Desde Quito sur tomar la Autopista General Rumiñahui hacia Sangolquí",
        "Ingreso directo al centro cantonal sin peaje",
        "Ruta completamente pavimentada y señalizada",
      ],
      transporte: [
        {
          tipo: "auto",
          descripcion: "Ruta directa por autopista desde el sur de Quito",
          frecuencia: "Acceso permanente",
        },
        {
          tipo: "bus",
          descripcion: "Terminal Quitumbe → Sangolquí, servicio frecuente",
          precio: "USD 0.50 – 1.00",
          frecuencia: "Cada 15 minutos",
        },
      ],
    },
    narrativa: {
      tagline: "Hornado sagrado y cascadas volcánicas a 25 minutos de Quito",
      descripcionCorta:
        "El cantón más cercano a Quito guarda un secreto dual: el hornado más legendario del Ecuador y las cascadas bravas del río Pita, nacidas en las faldas del Cotopaxi.",
      descripcionLarga:
        "Sangolquí no necesita distancia para ser mágico. A apenas 33 kilómetros de Quito, el cantón Rumiñahui condensa en un solo territorio dos experiencias que raramente conviven: la feria más concurrida del hornado tradicional en los Andes ecuatorianos y un sistema de cascadas salvajes esculpidas por el río Pita en su descenso desde las faldas volcánicas del Cotopaxi. El mercado de Sangolquí, declarado patrimonio intangible, es un ritual dominical donde el olor a carne asada en leña anuncia desde cuadras de distancia el centro de esta pequeña capital. Afuera, el paisaje se transforma en una antesala de aventura: la Reserva Ecológica Los Ilinizas y el Parque Nacional Cotopaxi encuadran un horizonte de páramo y nieve eterna.",
      historia:
        "El cantón lleva el nombre del último general inca, Rumiñahui — 'ojo de piedra' en kichwa — quien resistió la conquista española y según la leyenda ocultó el rescate de Atahualpa antes de su ejecución. Su espíritu de resistencia se siente aún en la tierra volcánica que atraviesa el río Pita.",
      curiosidad:
        "La Feria de Sangolquí se realiza todos los domingos desde hace más de tres siglos y es considerada la feria de hornado más antigua y concurrida de todo Ecuador.",
    },
    atractivos: [
      {
        nombre: "Cascadas del Río Pita",
        tipo: "naturaleza",
        descripcion:
          "Sistema de cuatro cascadas sucesivas en un cañón de roca volcánica negra, nacidas del deshielo del Cotopaxi. La cascada principal cae 80 metros en un salto vertical.",
        duracionHoras: 4,
        costoUSD: "USD 2 – 5",
        prioridad: "imprescindible",
      },
      {
        nombre: "Feria del Hornado de Sangolquí",
        tipo: "gastronómica",
        descripcion:
          "Mercado dominical centenario donde familias cocineras preparan cerdos enteros asados en hornos de leña. Patrimonio culinario intangible.",
        duracionHoras: 2,
        costoUSD: "USD 4 – 8",
        prioridad: "imprescindible",
      },
      {
        nombre: "Parque Nacional Cotopaxi",
        tipo: "trekking",
        descripcion:
          "Desde Sangolquí se accede en 45 min al parque. Ascenso al refugio del Cotopaxi a 4.800 msnm, laguna de Limpiopungo y fauna de páramo.",
        duracionHoras: 8,
        costoUSD: "USD 2 ingreso extranjeros",
        prioridad: "imprescindible",
      },
      {
        nombre: "Reserva Ecológica Los Ilinizas",
        tipo: "aventura",
        descripcion:
          "Escalada técnica y trekking a los volcanes gemelos Iliniza Norte (5.126m) e Iliniza Sur (5.248m), con glaciar.",
        duracionHoras: 10,
        costoUSD: "USD 5 – 20",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Hornado de Sangolquí",
        descripcion:
          "Cerdo entero asado lentamente en horno de leña, servido con mote, tortillas de papa, encurtido y ají. El más reconocido del Ecuador.",
        esPatrimonial: true,
        dondeProbarla: "Mercado central de Sangolquí, especialmente los domingos",
      },
      {
        nombre: "Caldo de patas",
        descripcion:
          "Caldo tradicional de patas de res con maíz, maní y hierbas andinas. Desayuno ritual en la sierra ecuatoriana.",
        esPatrimonial: true,
        dondeProbarla: "Mercado de Sangolquí y restaurantes del centro",
      },
      {
        nombre: "Choclos con queso",
        descripcion:
          "Mazorca tierna cocida servida con queso fresco artesanal de la zona, infaltable en ferias y mercados.",
        esPatrimonial: false,
      },
    ],
    festividades: [
      {
        nombre: "Inti Raymi en el cantón Rumiñahui",
        mes: "Junio",
        descripcion:
          "Fiesta del sol kichwa con danzas, música andina y rituales de agradecimiento a la Pachamama en las comunidades del cantón.",
        esPatrimonioNacional: false,
      },
      {
        nombre: "Fiestas de Cantonización",
        mes: "Mayo",
        descripcion:
          "Celebración anual con desfiles, ferias artesanales y corridas de toros tradicionales en Sangolquí.",
        esPatrimonioNacional: false,
      },
    ],
    hospedaje: [
      {
        categoria: "Boutique",
        descripcion: "Hostales y haciendas boutique en los valles circundantes con vista al Cotopaxi",
        precioReferencia: "USD 50 – 120 / noche",
      },
      {
        categoria: "Económico",
        descripcion: "Hostales locales en el centro de Sangolquí, funcionales y accesibles",
        precioReferencia: "USD 20 – 40 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Kichwa del Valle de los Chillos"],
      artesaniaIconica: ["Tejidos de lana", "Cuero trabajado"],
      patrimonioDeclarado: ["Feria del Hornado — Patrimonio Culinario Intangible"],
    },
    biodiversidad: {
      especiesIconicas: ["Cóndor andino", "Lobo de páramo", "Venado de cola blanca", "Curiquingue"],
      habitatPrincipal: "Páramo andino y bosque montano",
      areaProtegida: "Parque Nacional Cotopaxi / Reserva Los Ilinizas",
    },
    clima: "Templado andino",
    temperaturaRango: "10–18°C",
    temporadaIdeal: "Todo el año",
    mejorEpocaVisitar:
      "Todo el año. Las cascadas tienen mayor caudal en época de lluvias (oct–feb). Feria del hornado: domingos todo el año.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#2D4A1E",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=900&auto=format&fit=crop&q=80", alt: "Volcán Cotopaxi nevado sobre el valle interandino de Rumiñahui" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80", alt: "Paisaje andino ecuatoriano con montañas al atardecer" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&auto=format&fit=crop&q=80", alt: "Naturaleza andina verde del Valle de los Chillos" },
      ],
    },
    colorAcento: "#3F7D44",
    seo: {
      slug: "ruminahui-sangolqui",
      titulo: "Rumiñahui / Sangolquí — Hornado y Cascadas Volcánicas | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Descubre Sangolquí, el Pueblo Mágico más cercano a Quito: la feria de hornado más icónica del Ecuador y las cascadas del río Pita entre volcanes andinos.",
      keywords: [
        "Sangolquí hornado",
        "cascadas río Pita",
        "Rumiñahui turismo",
        "Cotopaxi desde Quito",
        "Pueblos Mágicos Ecuador",
        "Pichincha turismo",
      ],
      schemaType: "City",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 2. CAYAMBE ───────────────────────────────────────────
  {
    id: "cayambe",
    nombre: "Cayambe",
    nombreCorto: "Cayambe",
    provincia: "Pichincha",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: 0.0402,
      lng: -78.145,
      zoom: 13,
      dms: "0°2′25″N · 78°8′42″O",
    },
    topografia: {
      altitudMsnm: 2830,
      relieve: "Sierra alta",
      referenciaGeografica: "Nevado Cayambe (5.790 msnm) — único nevado en la línea ecuatorial",
      cuencaHidrografica: "Río Pisque",
    },
    ruta: {
      distanciaKm: 75,
      tiempoEstimado: "1h 30min",
      nivelDificultad: "Fácil",
      via: "E35 (Panamericana Norte)",
      indicaciones: [
        "Desde Quito tomar la E35 dirección norte hacia Calderón",
        "Continuar por la Panamericana Norte pasando Guayllabamba",
        "Ingreso directo a Cayambe ciudad por la vía principal",
      ],
      transporte: [
        {
          tipo: "bus",
          descripcion: "Terminal Carcelén → Cayambe, buses frecuentes",
          precio: "USD 1.50 – 2.50",
          frecuencia: "Cada 20 minutos",
        },
        {
          tipo: "auto",
          descripcion: "Panamericana Norte, vía rápida bien señalizada",
          frecuencia: "Acceso permanente",
        },
      ],
    },
    narrativa: {
      tagline: "El único nevado sobre la línea ecuatorial y los bizcochos más famosos del mundo",
      descripcionCorta:
        "Cayambe existe en un punto imposible: un volcán nevado cruzado por la línea del ecuador, donde la ruta de las flores y los bizcochos artesanales forman una experiencia única en el planeta.",
      descripcionLarga:
        "La ciudad de Cayambe vive bajo la sombra luminosa del tercer volcán más alto del Ecuador: el Cayambe (5.790 msnm), el único nevado del mundo atravesado exactamente por la línea del ecuador. Esta singularidad geográfica extrema convierte al territorio en un laboratorio natural: en sus pendientes superiores nieva todo el año mientras en sus faldas florece la industria florícola más importante de Latinoamérica. El viaje desde Quito es una transición paulatina de alturas, aromas y paisajes: primero el valle de Guayllabamba con sus chirimoyas, luego el cambio de temperatura al ascender hacia los 2.830 metros y finalmente el horizonte dominado por el casquete glaciar del Cayambe. En el corazón de la ciudad, las panaderías artesanales hornean bizcochos con una receta que data del siglo XVII, convirtiéndolos en el souvenir gastronómico ineludible del norte ecuatoriano.",
      historia:
        "El nombre Cayambe proviene del kichwa 'Cayanpi', que significa 'mañana'. Los Cayambes, pueblo indígena de gran resistencia, fueron de los últimos en ser incorporados al Imperio Inca y después al dominio español. La famosa Batalla de Yahuarcocha, donde el Inca Huayna Cápac masacró a miles de guerreros Cayambes, marcó el fin de esa resistencia.",
      curiosidad:
        "El punto exacto donde la línea del Ecuador cruza el nevado Cayambe tiene 0 grados de latitud pero está cubierto de hielo eterno. Es el único lugar del mundo donde la nieve perpetua existe exactamente en el ecuador geográfico.",
    },
    atractivos: [
      {
        nombre: "Nevado Cayambe",
        tipo: "aventura",
        descripcion:
          "Tercer volcán más alto del Ecuador (5.790 msnm). Ascenso técnico con glaciar. El refugio Ruales-Oleas-Berge a 4.600m es base para montañistas. Única montaña nevada sobre la línea ecuatorial del planeta.",
        duracionHoras: 12,
        costoUSD: "USD 30 – 80 con guía",
        prioridad: "imprescindible",
      },
      {
        nombre: "Reserva Ecológica Cayambe-Coca",
        tipo: "naturaleza",
        descripcion:
          "Una de las reservas más biodiversas del Ecuador, que abarca desde páramo andino hasta selva amazónica. Hogar del cóndor andino, el oso de anteojos y el tapir andino.",
        duracionHoras: 6,
        costoUSD: "USD 5",
        prioridad: "imprescindible",
      },
      {
        nombre: "Ruta de las Flores",
        tipo: "fotografía",
        descripcion:
          "Recorrido por haciendas florícolas que producen millones de rosas de exportación anual. Las fincas abren sus invernaderos para visitas guiadas y degustaciones.",
        duracionHoras: 3,
        costoUSD: "USD 10 – 15",
        prioridad: "recomendado",
      },
      {
        nombre: "Taller de Bizcochos Artesanales",
        tipo: "cultural",
        descripcion:
          "Visita a panaderías tradicionales del centro de Cayambe para ver la elaboración de los bizcochos desde el amasado hasta el horno de leña.",
        duracionHoras: 1,
        costoUSD: "USD 5 – 10",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Bizcochos de Cayambe",
        descripcion:
          "Galletas artesanales horneadas en leña, ligeras y crujientes, elaboradas con una receta colonial del siglo XVII. Símbolo gastronómico del norte ecuatoriano.",
        esPatrimonial: true,
        dondeProbarla: "Panaderías tradicionales del centro de Cayambe — Calle Sucre y alrededores",
      },
      {
        nombre: "Manjar de leche",
        descripcion:
          "Dulce cremoso de leche entera con panela y especias, acompañante tradicional de los bizcochos cayambeños.",
        esPatrimonial: true,
        dondeProbarla: "Mercados y panaderías de Cayambe",
      },
      {
        nombre: "Caldo de gallina de campo",
        descripcion:
          "Caldo espeso de gallina criolla con papas andinas, hierbas y especias. Comida reconfortante de los valles serranos.",
        esPatrimonial: false,
      },
    ],
    festividades: [
      {
        nombre: "Inti Raymi de Cayambe",
        mes: "Junio",
        descripcion:
          "Una de las celebraciones del Inti Raymi más auténticas y multitudinarias del Ecuador. Las comunidades Kayambi bailan, cantan y ofrendan durante días en honor al sol.",
        esPatrimonioNacional: true,
      },
      {
        nombre: "Fiesta de la Virgen del Quinche",
        mes: "Noviembre",
        descripcion:
          "Peregrinación religiosa masiva al Santuario de El Quinche, uno de los más importantes de Ecuador.",
        esPatrimonioNacional: false,
      },
    ],
    hospedaje: [
      {
        categoria: "Boutique",
        descripcion: "Haciendas históricas convertidas en hoteles boutique con vista al Cayambe",
        precioReferencia: "USD 80 – 200 / noche",
      },
      {
        categoria: "Comunitario",
        descripcion: "Turismo comunitario en comunidades Kayambi con experiencias de inmersión cultural",
        precioReferencia: "USD 25 – 50 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Pueblo Kayambi"],
      idiomasLocales: ["Kichwa", "Español"],
      artesaniaIconica: ["Bordados de Zuleta", "Tejidos de lana de borrego"],
      patrimonioDeclarado: ["Inti Raymi Kayambi — Patrimonio Cultural Nacional"],
      reconocimientos: ["Pueblo Kayambi — Pueblo originario con territorio reconocido"],
    },
    biodiversidad: {
      especiesIconicas: [
        "Cóndor andino",
        "Oso de anteojos",
        "Tapir andino",
        "Puma",
        "Colibrí estrella del ecuador",
      ],
      habitatPrincipal: "Páramo andino alto y bosque montano",
      areaProtegida: "Reserva Ecológica Cayambe-Coca",
      especiesAves: 850,
    },
    clima: "Frío de páramo",
    temperaturaRango: "4–16°C",
    temporadaIdeal: "Jun–Sep",
    mejorEpocaVisitar:
      "Junio a septiembre para ascensos al nevado (menor precipitación). Junio para Inti Raymi. Todo el año para gastronomía y flores.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#1A2E3A",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80", alt: "Volcán Cayambe nevado sobre páramo ecuatoriano" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format&fit=crop&q=80", alt: "Montaña andina con nieve perpetua al amanecer" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=900&auto=format&fit=crop&q=80", alt: "Mercado indígena de Cayambe con mujeres en traje tradicional" },
      ],
    },
    colorAcento: "#3D8BCD",
    seo: {
      slug: "cayambe",
      titulo: "Cayambe — Nevado en la Línea Ecuatorial y Bizcochos Artesanales | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Explora Cayambe: el único nevado del mundo cruzado por la línea del Ecuador, la Ruta de las Flores y los bizcochos más famosos de los Andes.",
      keywords: [
        "Cayambe nevado",
        "nevado línea ecuatorial",
        "bizcochos Cayambe",
        "ruta flores Ecuador",
        "Inti Raymi Cayambe",
        "Pueblos Mágicos Ecuador",
      ],
      schemaType: "City",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 3. SAN ANTONIO DE IBARRA ──────────────────────────────
  {
    id: "san-antonio-de-ibarra",
    nombre: "San Antonio de Ibarra",
    nombreCorto: "San Antonio",
    provincia: "Imbabura",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: 0.3334,
      lng: -78.17,
      zoom: 15,
      dms: "0°20′0″N · 78°10′12″O",
    },
    topografia: {
      altitudMsnm: 2360,
      relieve: "Valle interandino",
      referenciaGeografica: "Volcán Imbabura (4.621 msnm)",
      cuencaHidrografica: "Río Tahuando",
    },
    ruta: {
      distanciaKm: 120,
      tiempoEstimado: "2h 15min",
      nivelDificultad: "Fácil",
      via: "E35 Panamericana Norte → Ibarra → San Antonio",
      indicaciones: [
        "Desde Quito tomar E35 Panamericana Norte hasta Ibarra",
        "Desde Ibarra, ruta de 6 km hacia el suroeste por la vía a San Antonio",
        "Pueblo totalmente señalizado como destino artesanal",
      ],
      transporte: [
        {
          tipo: "bus",
          descripcion: "Quito → Ibarra, luego bus local a San Antonio",
          precio: "USD 2.50 – 3.50",
          frecuencia: "Frecuente desde Terminal Carcelén",
        },
        {
          tipo: "auto",
          descripcion: "Panamericana Norte hasta Ibarra, luego desvío a San Antonio",
          frecuencia: "Acceso permanente",
        },
      ],
    },
    narrativa: {
      tagline: "La capital latinoamericana del arte en madera",
      descripcionCorta:
        "En este pequeño pueblo donde cada familia tiene un taller, el cedro y el nogal se transforman en esculturas que pueblan iglesias, museos y colecciones del mundo entero.",
      descripcionLarga:
        "San Antonio de Ibarra es una anomalía artística: un pueblo de apenas 25.000 habitantes donde más del 70% de la economía gira en torno a la talla de madera. Desde que en 1868 el escultor Daniel Reyes fundó la primera escuela de bellas artes del norte ecuatoriano, este rincón de Imbabura se convirtió en un polo de creación plástica que exporta arte a más de 30 países. Caminar por sus calles es recorrer una galería infinita: talleres abiertos donde los artesanos tallan desde santos barrocos hasta piezas de diseño contemporáneo, con el volcán Imbabura como telón de fondo permanente. Las maderas más usadas — cedro, nogal, eucalipto — llenan el aire con un aroma característico que define la identidad olfativa del pueblo.",
      historia:
        "La tradición talladora de San Antonio surge del mestizaje cultural entre la destreza manual de los pueblos Karanqui precolombinos y la iconografía religiosa colonial española. Daniel Reyes, el gran maestro fundador, estudió en Quito y regresó a su pueblo para crear una escuela que transformó para siempre su destino.",
      curiosidad:
        "Las obras de artesanos de San Antonio de Ibarra decoran la Casa Blanca en Washington D.C., la ONU en Nueva York y múltiples catedrales en Europa y América Latina.",
    },
    atractivos: [
      {
        nombre: "Talleres artesanales abiertos",
        tipo: "artesanía",
        descripcion:
          "Más de 300 talleres de talla en madera que se pueden visitar libremente. Los artesanos trabajan en cedro, nogal, polyester y balsa creando desde arte religioso hasta piezas de diseño contemporáneo.",
        duracionHoras: 3,
        costoUSD: "Gratuito (compras opcionales)",
        prioridad: "imprescindible",
      },
      {
        nombre: "Museo y Galería Luis Potosí",
        tipo: "cultural",
        descripcion:
          "Galería principal del pueblo con obras de los maestros fundadores y artistas contemporáneos de San Antonio. Referencia del arte en madera latinoamericano.",
        duracionHoras: 1,
        costoUSD: "USD 2",
        prioridad: "recomendado",
      },
      {
        nombre: "Plaza Central y Parque 27 de Septiembre",
        tipo: "cultural",
        descripcion:
          "Centro neurálgico del pueblo con la iglesia parroquial y esculturas monumentales en espacios públicos, reflejo de la vocación artística comunitaria.",
        duracionHoras: 1,
        costoUSD: "Gratuito",
        prioridad: "recomendado",
      },
      {
        nombre: "Cerro Imbabura",
        tipo: "trekking",
        descripcion:
          "Ascenso al volcán Imbabura (4.621 msnm), el Taita Imbabura de la cosmovisión kichwa. Vistas panorámicas sobre los cuatro cantones de la provincia.",
        duracionHoras: 8,
        costoUSD: "USD 5 – 20 con guía",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Fritada con mote",
        descripcion:
          "Carne de cerdo frita en su propia manteca, servida con mote, choclo, maduro y ensalada. Plato emblemático de la sierra norte.",
        esPatrimonial: true,
        dondeProbarla: "Restaurantes del centro de San Antonio y mercado parroquial",
      },
      {
        nombre: "Arrope de mora",
        descripcion:
          "Jarabe denso de mora silvestre andina con panela, típico de Ibarra y sus alrededores. Infaltable en postres y bebidas locales.",
        esPatrimonial: true,
        dondeProbarla: "Mercados y tiendas del centro de Ibarra",
      },
    ],
    festividades: [
      {
        nombre: "Festival de Arte y Artesanía",
        mes: "Septiembre",
        descripcion:
          "Feria anual donde los artesanos de San Antonio exhiben y venden sus obras. Demostraciones en vivo de técnicas de talla y pintura en madera.",
        esPatrimonioNacional: false,
      },
      {
        nombre: "Semana Santa de San Antonio",
        mes: "Abril",
        descripcion:
          "Procesiones religiosas únicas donde las esculturas talladas en el pueblo protagonizan los recorridos litúrgicos.",
        esPatrimonioNacional: false,
      },
    ],
    hospedaje: [
      {
        categoria: "Mediogama",
        descripcion: "Hostales confortables en San Antonio y Ibarra ciudad, a 6 km",
        precioReferencia: "USD 30 – 70 / noche",
      },
      {
        categoria: "Boutique",
        descripcion: "Hoteles boutique en Ibarra con decoración artesanal local",
        precioReferencia: "USD 60 – 120 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Pueblo Karanqui"],
      artesaniaIconica: [
        "Talla en cedro",
        "Talla en nogal",
        "Escultura religiosa barroca",
        "Arte contemporáneo en madera",
      ],
      patrimonioDeclarado: ["Arte en madera de San Antonio — Patrimonio Cultural Nacional"],
      reconocimientos: [
        "Capital latinoamericana de la artesanía en madera (denominación reconocida internacionalmente)",
      ],
    },
    biodiversidad: {
      especiesIconicas: ["Cóndor andino", "Gavilán de páramo", "Mirlo ecuatoriano"],
      habitatPrincipal: "Valle interandino y bosque montano",
      areaProtegida: "Bosque protector Imbabura",
    },
    clima: "Templado andino",
    temperaturaRango: "14–20°C",
    temporadaIdeal: "Todo el año",
    mejorEpocaVisitar:
      "Todo el año para artesanías. Septiembre para el Festival de Arte. Diciembre para compras navideñas artesanales.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1582671374045-e2c4a40f15a5?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#3A2010",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1582671374045-e2c4a40f15a5?w=900&auto=format&fit=crop&q=80", alt: "Artesano tallando madera en San Antonio de Ibarra" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1594392175511-30eca83d51c8?w=900&auto=format&fit=crop&q=80", alt: "Esculturas de madera artesanales en galería de San Antonio" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80", alt: "Vista del volcán Imbabura desde San Antonio de Ibarra" },
      ],
    },
    colorAcento: "#C76139",
    seo: {
      slug: "san-antonio-de-ibarra",
      titulo: "San Antonio de Ibarra — Capital del Arte en Madera | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Visita San Antonio de Ibarra, la capital latinoamericana de la talla en madera: 300 talleres abiertos, arte que viaja a museos del mundo y el Taita Imbabura como guardián.",
      keywords: [
        "San Antonio de Ibarra artesanía",
        "talla en madera Ecuador",
        "artesanía Imbabura",
        "esculturas madera Ecuador",
        "Pueblos Mágicos Ecuador",
      ],
      schemaType: "City",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 4. COTACACHI ─────────────────────────────────────────
  {
    id: "cotacachi",
    nombre: "Cotacachi",
    nombreCorto: "Cotacachi",
    provincia: "Imbabura",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: 0.3017,
      lng: -78.2667,
      zoom: 14,
      dms: "0°18′6″N · 78°16′0″O",
    },
    topografia: {
      altitudMsnm: 2418,
      relieve: "Valle interandino",
      referenciaGeografica: "Volcán Cotacachi (4.939 msnm) / Laguna de Cuicocha",
      cuencaHidrografica: "Río Intag",
    },
    ruta: {
      distanciaKm: 107,
      tiempoEstimado: "2h",
      nivelDificultad: "Fácil",
      via: "E35 Panamericana Norte → Otavalo → Cotacachi",
      indicaciones: [
        "Desde Quito tomar E35 Panamericana Norte",
        "Pasar Otavalo y tomar desvío a Cotacachi (12 km desde Otavalo)",
        "Ruta pavimentada y señalizada desde Otavalo",
      ],
      transporte: [
        {
          tipo: "bus",
          descripcion: "Quito → Otavalo, luego bus local a Cotacachi",
          precio: "USD 2 – 4",
          frecuencia: "Frecuente",
        },
        {
          tipo: "auto",
          descripcion: "Panamericana Norte, desvío desde Otavalo",
          frecuencia: "Acceso permanente",
        },
      ],
    },
    narrativa: {
      tagline: "El cuero artesanal y la laguna sagrada del volcán",
      descripcionCorta:
        "Cotacachi guarda dos tesoros que raramente conviven: una calle entera dedicada al cuero trabajado a mano con técnicas centenarias y la Laguna de Cuicocha, azul profundo en la caldera de un volcán dormido.",
      descripcionLarga:
        "Cotacachi vive entre dos mundos: en la ciudad, la calle García Moreno es un desfile interminable de marroquinería artesanal — bolsos, chaquetas, sandalias y accesorios en cuero trabajado con técnicas heredadas de generación en generación. Fuera de la ciudad, a apenas 15 minutos, la Laguna de Cuicocha emerge como una aparición: agua azul-esmeralda oscuro encerrada en la caldera de un volcán dormido, con dos islotes cubiertos de vegetación que en la cosmovisión kichwa representan a los dioses. La Reserva Ecológica Cotacachi-Cayapas, que desciende desde los páramos andinos hasta los bosques húmedos de la costa, es una de las más biodiversas del Ecuador.",
      historia:
        "El nombre Cotacachi viene del kichwa 'Cota' (lago) y 'Cachi' (sal): 'el lago de la sal'. La laguna de Cuicocha fue considerada sagrada por los pueblos indígenas locales, quienes creían que en sus profundidades vivían los dioses protectores. Hoy el cantón es conocido por ser el primer municipio ecológico del Ecuador.",
      curiosidad:
        "Cotacachi fue declarado primer municipio ecológico del Ecuador y tiene una ordenanza que prohíbe el uso de agroquímicos en toda su jurisdicción. Además, la Laguna de Cuicocha tiene 3.5 km de diámetro y una profundidad de 204 metros.",
    },
    atractivos: [
      {
        nombre: "Laguna de Cuicocha",
        tipo: "naturaleza",
        descripcion:
          "Laguna cratérica de 3.5 km de diámetro y 204 m de profundidad dentro de la caldera del volcán Cotacachi. Ruta de senderismo de 6 km alrededor del cráter con vistas espectaculares.",
        duracionHoras: 4,
        costoUSD: "USD 2",
        prioridad: "imprescindible",
      },
      {
        nombre: "Calle del Cuero — Marroquinería Artesanal",
        tipo: "artesanía",
        descripcion:
          "Toda la calle García Moreno está bordada de talleres y tiendas de cuero artesanal. Bolsos, chaquetas, billeteras, botas y accesorios trabajados a mano.",
        duracionHoras: 2,
        costoUSD: "Variable — compras desde USD 15",
        prioridad: "imprescindible",
      },
      {
        nombre: "Reserva Ecológica Cotacachi-Cayapas",
        tipo: "naturaleza",
        descripcion:
          "Una de las reservas más grandes y biodiversas del Ecuador, que va del páramo andino hasta el bosque húmedo costero. Hogar del oso de anteojos y el cóndor.",
        duracionHoras: 6,
        costoUSD: "USD 5",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Fritada de Cotacachi",
        descripcion:
          "Cerdo frito en manteca propia con mote, tostado, maduro y ají. Una de las mejores fritadas de la sierra norte ecuatoriana.",
        esPatrimonial: true,
        dondeProbarla: "Mercado central de Cotacachi y restaurantes del centro",
      },
      {
        nombre: "Chicha de jora",
        descripcion:
          "Bebida fermentada de maíz germinado, bebida ritual kichwa presente en todas las festividades andinas.",
        esPatrimonial: true,
        dondeProbarla: "Comunidades indígenas y mercados locales",
      },
    ],
    festividades: [
      {
        nombre: "Jora Raymi — Fiesta de la Chicha",
        mes: "Septiembre",
        descripcion:
          "Celebración kichwa de la cosecha del maíz con elaboración comunitaria de chicha, danza y música andina tradicional.",
        esPatrimonioNacional: false,
      },
      {
        nombre: "Inti Raymi de las Comunidades",
        mes: "Junio",
        descripcion:
          "Celebración del solsticio de verano con rituales de agradecimiento al sol en las comunidades de la reserva.",
        esPatrimonioNacional: true,
      },
    ],
    hospedaje: [
      {
        categoria: "Boutique",
        descripcion: "La Casa Sol y hostales boutique locales con decoración artesanal cotacacheña",
        precioReferencia: "USD 60 – 150 / noche",
      },
      {
        categoria: "Comunitario",
        descripcion: "Alojamiento en comunidades de la Reserva Cotacachi-Cayapas",
        precioReferencia: "USD 20 – 40 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Pueblo Cotacachi-Kichwa", "Pueblo Awá (zona de amortiguamiento)"],
      artesaniaIconica: ["Marroquinería en cuero", "Bordados de la zona andina"],
      patrimonioDeclarado: ["Municipio Ecológico — primera declaratoria en Ecuador"],
    },
    biodiversidad: {
      especiesIconicas: ["Oso de anteojos", "Cóndor andino", "Puma", "Colibrí gigante del Chimborazo"],
      habitatPrincipal: "Páramo andino a bosque nublado",
      areaProtegida: "Reserva Ecológica Cotacachi-Cayapas",
      especiesAves: 700,
    },
    clima: "Templado andino",
    temperaturaRango: "12–18°C",
    temporadaIdeal: "Todo el año",
    mejorEpocaVisitar:
      "Todo el año para artesanías y Cuicocha. Junio para Inti Raymi. Septiembre para Jora Raymi.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#0D2B3A",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=900&auto=format&fit=crop&q=80", alt: "Lago Cuicocha con islas volcánicas reflejando nubes andinas" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=900&auto=format&fit=crop&q=80", alt: "Artesanías de cuero fino de Cotacachi en mercado local" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80", alt: "Reserva ecológica Cotacachi-Cayapas con vegetación exuberante" },
      ],
    },
    colorAcento: "#3D8BCD",
    seo: {
      slug: "cotacachi",
      titulo: "Cotacachi — Laguna de Cuicocha y Cuero Artesanal | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Descubre Cotacachi: la laguna azul de un volcán dormido, la tradición del cuero artesanal y la primera municipalidad ecológica del Ecuador.",
      keywords: [
        "Cotacachi Laguna Cuicocha",
        "cuero artesanal Cotacachi",
        "Imbabura turismo",
        "Reserva Cotacachi-Cayapas",
        "Pueblos Mágicos Ecuador",
      ],
      schemaType: "City",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 5. PATATE ────────────────────────────────────────────
  {
    id: "patate",
    nombre: "Patate",
    nombreCorto: "Patate",
    provincia: "Tungurahua",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: -1.305,
      lng: -78.5036,
      zoom: 14,
      dms: "1°18′18″S · 78°30′13″O",
    },
    topografia: {
      altitudMsnm: 2200,
      relieve: "Valle interandino",
      referenciaGeografica: "Volcán Tungurahua (5.023 msnm)",
      cuencaHidrografica: "Río Patate",
    },
    ruta: {
      distanciaKm: 157,
      tiempoEstimado: "3h",
      nivelDificultad: "Moderado",
      via: "E35 Sur → Ambato → Patate",
      indicaciones: [
        "Desde Quito tomar E35 sur hacia Ambato (2h aprox.)",
        "Desde Ambato tomar la vía a Pelileo-Patate (30 min adicionales)",
        "Ruta panorámica con vistas al Tungurahua",
      ],
      transporte: [
        {
          tipo: "bus",
          descripcion: "Quito → Ambato, luego bus local a Patate",
          precio: "USD 3 – 5",
          frecuencia: "Frecuente desde Terminal Quitumbe",
        },
        {
          tipo: "auto",
          descripcion: "Autopista sur hacia Ambato, luego vía regional a Patate",
          frecuencia: "Acceso permanente",
        },
      ],
    },
    narrativa: {
      tagline: "El jardín de frutos tropicales a la sombra del volcán activo",
      descripcionCorta:
        "Patate es una paradoja climática: mientras el Tungurahua ruge a pocos kilómetros, sus laderas abrigadas producen las mejores frutas de clima templado-cálido de los Andes, con un microclima idílico conocido como 'la eterna primavera'.",
      descripcionLarga:
        "El cantón Patate goza de uno de los microclimas más benignos de toda la sierra ecuatoriana: encerrado en el cálido valle del río Patate y protegido de los vientos por las montañas circundantes, produce uva, durazno, chirimoya, uvilla y frutilla en abundancia mientras el volcán Tungurahua, activo y visible, añade una tensión dramática incomparable al paisaje. Las cascadas de la zona — especialmente las del Río Verde — son el destino natural por excelencia, con sus aguas azul turquesa y paredes de roca volcánica negra. El pueblo mismo conserva una arquitectura colonial en adobe y teja que le da un carácter íntimo y auténtico.",
      historia:
        "Patate fue uno de los pueblos más afectados por la actividad del volcán Tungurahua, que ha tenido múltiples erupciones desde 1999. Sin embargo, sus habitantes han resistido y reconstruido el territorio con una resiliencia que se ha convertido en parte de la identidad local.",
      curiosidad:
        "Patate produce el único vino artesanal andino certificado del Ecuador, elaborado con uva cultivada a 2.200 msnm en condiciones climáticas únicas. Las viñas del Valle de Patate son las más altas de Ecuador.",
    },
    atractivos: [
      {
        nombre: "Mirador del Volcán Tungurahua",
        tipo: "fotografía",
        descripcion:
          "Puntos de observación desde los cuales se puede apreciar el volcán activo Tungurahua (5.023 msnm) en toda su magnitud, especialmente al amanecer cuando emite fumarolas.",
        duracionHoras: 2,
        costoUSD: "Gratuito",
        prioridad: "imprescindible",
      },
      {
        nombre: "Cascadas del Río Verde",
        tipo: "naturaleza",
        descripcion:
          "Las cascadas más visitadas de la zona central del Ecuador: Pailón del Diablo, Novia, Manto de la Novia y Fantasma, todas accesibles por un sendero de cañón de roca negra.",
        duracionHoras: 5,
        costoUSD: "USD 2 – 3",
        prioridad: "imprescindible",
      },
      {
        nombre: "Ruta de las Viñas de Patate",
        tipo: "gastronómica",
        descripcion:
          "Visita a las viñas artesanales donde se cultiva uva a 2.200 msnm y se produce el único vino andino certificado del Ecuador. Cata incluida.",
        duracionHoras: 3,
        costoUSD: "USD 15 – 25 cata",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Frutas del Valle de Patate",
        descripcion:
          "Durazno, uva, uvilla, chirimoya y frutilla cultivadas en el microclima templado-cálido del valle. Las mejores frutas andinas del Ecuador central.",
        esPatrimonial: false,
        dondeProbarla: "Mercado local de Patate y puestos de carretera",
      },
      {
        nombre: "Vino artesanal de Patate",
        descripcion:
          "Vino producido con uva Isabella cultivada a 2.200 msnm. Único vino andino del Ecuador, de sabor peculiar y origen irrepetible.",
        esPatrimonial: true,
        dondeProbarla: "Viñas y bodegas locales — se puede visitar con degustación",
      },
      {
        nombre: "Trucha del río",
        descripcion:
          "Trucha arcoíris criada en los ríos andinos locales, preparada a la plancha, al vapor o en ceviche. Fresca y de sabor intenso.",
        esPatrimonial: false,
        dondeProbarla: "Restaurantes locales a orillas del río Patate",
      },
    ],
    festividades: [
      {
        nombre: "Festival de la Uva y el Vino",
        mes: "Octubre",
        descripcion:
          "Celebración anual de la cosecha de uva con catas, procesión de la vendimia y música típica del cantón.",
        esPatrimonioNacional: false,
      },
    ],
    hospedaje: [
      {
        categoria: "Boutique",
        descripcion: "Hosterías boutique en el valle con jardines y vista al Tungurahua",
        precioReferencia: "USD 50 – 100 / noche",
      },
      {
        categoria: "Económico",
        descripcion: "Hostales locales sencillos en el centro del cantón",
        precioReferencia: "USD 20 – 35 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Comunidades Kichwa del Tungurahua"],
      artesaniaIconica: ["Tejidos en telar de cintura"],
      patrimonioDeclarado: ["Vino artesanal andino — Producto patrimonial local"],
    },
    biodiversidad: {
      especiesIconicas: ["Pava andina", "Oso de anteojos", "Colibrí de Juan"],
      habitatPrincipal: "Valle templado cálido y bosque montano",
    },
    clima: "Templado andino",
    temperaturaRango: "16–22°C",
    temporadaIdeal: "Todo el año",
    mejorEpocaVisitar:
      "Todo el año. Octubre para el Festival de la Uva. Época seca (jun-ago) para mejores vistas al volcán.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1591981870554-a27b30ef8c24?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#2A1A08",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1591981870554-a27b30ef8c24?w=900&auto=format&fit=crop&q=80", alt: "Paisaje del valle de Patate con volcán Tungurahua al fondo" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&auto=format&fit=crop&q=80", alt: "Viñedos andinos en laderas del Valle de Patate" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=900&auto=format&fit=crop&q=80", alt: "Atardecer sobre montañas andinas con neblina en Patate" },
      ],
    },
    colorAcento: "#E8B040",
    seo: {
      slug: "patate",
      titulo: "Patate — Viñas Andinas y Cascadas a la Sombra del Tungurahua | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Patate: el microclima de eterna primavera, el único vino andino del Ecuador, las cascadas del Río Verde y el volcán Tungurahua activo como protagonista del horizonte.",
      keywords: [
        "Patate Ecuador",
        "vino andino Ecuador",
        "cascadas Río Verde",
        "volcán Tungurahua",
        "Pueblos Mágicos Ecuador",
        "Tungurahua turismo",
      ],
      schemaType: "City",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 6. GUANO ─────────────────────────────────────────────
  {
    id: "guano",
    nombre: "Guano",
    nombreCorto: "Guano",
    provincia: "Chimborazo",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: -1.6097,
      lng: -78.6342,
      zoom: 14,
      dms: "1°36′35″S · 78°38′3″O",
    },
    topografia: {
      altitudMsnm: 2720,
      relieve: "Sierra alta",
      referenciaGeografica: "Nevado Chimborazo (6.268 msnm) — el más alto del Ecuador",
      cuencaHidrografica: "Río Guano",
    },
    ruta: {
      distanciaKm: 196,
      tiempoEstimado: "3h 30min",
      nivelDificultad: "Fácil",
      via: "E35 → Riobamba → Guano",
      indicaciones: [
        "Desde Quito tomar E35 sur hasta Riobamba (3h aprox.)",
        "Desde Riobamba, ruta de 8 km hacia el norte a Guano",
        "Carretera asfaltada y bien señalizada",
      ],
      transporte: [
        {
          tipo: "bus",
          descripcion: "Quito → Riobamba, luego bus local a Guano",
          precio: "USD 3.50 – 5",
          frecuencia: "Frecuente",
        },
        {
          tipo: "auto",
          descripcion: "E35 hasta Riobamba, desvío norte a Guano",
          frecuencia: "Acceso permanente",
        },
      ],
    },
    narrativa: {
      tagline: "La ciudad de las alfombras y el coloso nevado del mundo",
      descripcionCorta:
        "Guano teje alfombras de lana con diseños precolombinos mientras el Chimborazo —el punto más lejano al centro de la Tierra— domina el horizonte con sus 6.268 metros de nieve perpetua.",
      descripcionLarga:
        "Guano es un pueblo que vive mirando hacia arriba, inevitablemente, porque el Chimborazo lo domina todo. El volcán más alto del Ecuador (6.268 msnm) y, por su posición en el ecuador geográfico, el punto de la superficie terrestre más alejado del centro de la Tierra, es el telón de fondo permanente de esta ciudad artesanal. En sus calles, decenas de talleres de alfombras de lana producen piezas con diseños inspirados en la iconografía precolombina: cóndores, chakanas, serpientes, montañas. La artesanía guaneña viaja a colecciones en Europa, Norteamérica y Asia. El museo arqueológico local exhibe la momia de un fraile colonial descubierta en el convento de la ciudad.",
      historia:
        "Guano fue un importante centro textil durante la colonia. La industria de alfombras de lana se estableció en el siglo XVIII con la llegada de telares europeos adaptados por los tejedores locales, quienes fusionaron técnicas europeas con diseños de la iconografía andina precolombina.",
      curiosidad:
        "El punto de la superficie terrestre más alejado del centro de la Tierra no es el Everest sino el Chimborazo, visible desde Guano, porque la Tierra está abultada en el ecuador geográfico. Desde la cima del Chimborazo estás a 6.384 km del centro de la Tierra.",
    },
    atractivos: [
      {
        nombre: "Nevado Chimborazo",
        tipo: "aventura",
        descripcion:
          "El volcán más alto del Ecuador y el punto más lejano al centro de la Tierra. Ascenso técnico a refugio Whymper (5.000m) y cumbre principal (6.268m). Hábitat de la vicuña reintroducida.",
        duracionHoras: 14,
        costoUSD: "USD 50 – 150 con guía",
        prioridad: "imprescindible",
      },
      {
        nombre: "Talleres de Alfombras de Guano",
        tipo: "artesanía",
        descripcion:
          "Visita a talleres donde se elaboran alfombras de lana en telar artesanal con diseños precolombinos. Se puede participar en el proceso de tejido.",
        duracionHoras: 2,
        costoUSD: "Gratuito (compras desde USD 30)",
        prioridad: "imprescindible",
      },
      {
        nombre: "Museo Arqueológico y Momia Colonial",
        tipo: "historia",
        descripcion:
          "Museo que exhibe la momia de un fraile del siglo XVIII encontrada en estado de conservación natural en el convento de Guano. Piezas arqueológicas de culturas precolombinas.",
        duracionHoras: 1,
        costoUSD: "USD 1",
        prioridad: "recomendado",
      },
      {
        nombre: "Reserva de Producción Faunística Chimborazo",
        tipo: "naturaleza",
        descripcion:
          "Reserva donde se reintrodujo con éxito la vicuña en Ecuador. Hoy la población supera las 5.000 vicuñas. Además hay pumas, cóndores y llamas.",
        duracionHoras: 4,
        costoUSD: "USD 5",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Chorizo de Guano",
        descripcion:
          "Embutido artesanal de carne de res y cerdo con especias andinas, ahumado en leña. El más reconocido de la provincia de Chimborazo.",
        esPatrimonial: true,
        dondeProbarla: "Mercado central de Guano y charcuterías locales",
      },
      {
        nombre: "Caldo de gallina criolla",
        descripcion:
          "Caldo tradicional andino con gallina de campo, papas, hierbas y especias. Comida de restauración serrana.",
        esPatrimonial: false,
        dondeProbarla: "Restaurantes del mercado de Guano",
      },
    ],
    festividades: [
      {
        nombre: "Carnaval de Guano",
        mes: "Febrero/Marzo",
        descripcion:
          "Carnaval tradicional con juego de agua y harina, comparsas coloridas y música folclórica. Uno de los carnavales más concurridos de Chimborazo.",
        esPatrimonioNacional: false,
      },
      {
        nombre: "Festival de la Alfombra",
        mes: "Noviembre",
        descripcion:
          "Exposición y venta de alfombras artesanales con concurso de diseños. Las mejores piezas se exhiben en el parque central.",
        esPatrimonioNacional: false,
      },
    ],
    hospedaje: [
      {
        categoria: "Mediogama",
        descripcion: "Hostales locales en Guano y hoteles en Riobamba (8 km)",
        precioReferencia: "USD 25 – 60 / noche",
      },
      {
        categoria: "Boutique",
        descripcion: "Hostería San Andrés y establecimientos boutique con vista al Chimborazo",
        precioReferencia: "USD 60 – 140 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Pueblo Puruhá"],
      artesaniaIconica: ["Alfombras de lana en telar", "Tejidos en lana de borrego", "Embutidos artesanales"],
      patrimonioDeclarado: ["Artesanía en alfombras — Patrimonio Artesanal Nacional"],
    },
    biodiversidad: {
      especiesIconicas: ["Vicuña", "Cóndor andino", "Puma", "Curiquingue", "Lobo de páramo"],
      habitatPrincipal: "Páramo de altura y glaciar",
      areaProtegida: "Reserva de Producción Faunística Chimborazo",
    },
    clima: "Frío de páramo",
    temperaturaRango: "6–14°C",
    temporadaIdeal: "Jun–Sep",
    mejorEpocaVisitar:
      "Junio a septiembre para el Chimborazo (menor precipitación). Todo el año para artesanías. Noviembre para el Festival de la Alfombra.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1625513028624-b680ed28a80d?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#1A1A2A",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1625513028624-b680ed28a80d?w=900&auto=format&fit=crop&q=80", alt: "Nevado Chimborazo sobre los valles de Guano" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=900&auto=format&fit=crop&q=80", alt: "Mercado artesanal de alfombras de Guano" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=900&auto=format&fit=crop&q=80", alt: "Paisaje andino de la provincia de Chimborazo cerca de Guano" },
      ],
    },
    colorAcento: "#E8B040",
    seo: {
      slug: "guano",
      titulo: "Guano — Alfombras Andinas y el Chimborazo Eterno | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Descubre Guano: talleres de alfombras precolombinas, la momia colonial y el Chimborazo —el punto más lejano al centro de la Tierra— como horizonte permanente.",
      keywords: [
        "Guano Chimborazo",
        "alfombras artesanales Guano",
        "Chimborazo turismo",
        "vicuñas Ecuador",
        "Pueblos Mágicos Ecuador",
      ],
      schemaType: "City",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 7. ALAUSÍ ─────────────────────────────────────────────
  {
    id: "alausi",
    nombre: "Alausí",
    nombreCorto: "Alausí",
    provincia: "Chimborazo",
    categoria: "Pueblo Mágico",
    region: "Sierra",
    coordenadas: {
      lat: -2.2033,
      lng: -78.8486,
      zoom: 14,
      dms: "2°12′12″S · 78°50′55″O",
    },
    topografia: {
      altitudMsnm: 2340,
      relieve: "Valle interandino",
      referenciaGeografica: "Nariz del Diablo — espolón rocoso del sistema ferroviario",
      cuencaHidrografica: "Río Chanchán",
    },
    ruta: {
      distanciaKm: 283,
      tiempoEstimado: "4h 30min",
      nivelDificultad: "Moderado",
      via: "E35 → Riobamba → Alausí",
      indicaciones: [
        "Desde Quito tomar E35 sur hasta Riobamba (3h aprox.)",
        "Continuar por la E35 hacia el sur hasta Alausí (1.5h adicionales)",
        "Ruta panorámica por el corredor interandino",
      ],
      transporte: [
        {
          tipo: "bus",
          descripcion: "Quito → Alausí directo desde Terminal Quitumbe",
          precio: "USD 5 – 7",
          frecuencia: "Varias salidas diarias",
        },
        {
          tipo: "tren",
          descripcion: "Tren Ecuador: ruta Riobamba → Nariz del Diablo → Alausí (turístico)",
          precio: "USD 22 – 33",
          frecuencia: "Según disponibilidad de Ferrocarriles del Ecuador",
        },
        {
          tipo: "auto",
          descripcion: "E35 sur, ruta panorámica con vistas al corredor interandino",
          frecuencia: "Acceso permanente",
        },
      ],
    },
    narrativa: {
      tagline: "El tren más difícil del mundo y el abismo que lo hace posible",
      descripcionCorta:
        "Alausí es la puerta de la Nariz del Diablo: el tramo ferroviario más dramático y técnicamente desafiante del planeta, donde el tren desciende en zigzag por la cara de una montaña de roca vertical.",
      descripcionLarga:
        "Alausí existe porque el tren llegó. A finales del siglo XIX, el ingeniero norteamericano John Harman diseñó la solución más audaz de la ingeniería ferroviaria de su época: el zigzag de la Nariz del Diablo, donde la locomotora avanza y retrocede en tres movimientos para descender 800 metros de desnivel en apenas 12 kilómetros. El pueblo construido al pie de este tramo conserva una arquitectura colonial serrana de gran autenticidad: casas de adobe y teja roja, iglesias del siglo XVIII y una plaza dominada por la estatua de San Pedro. El entorno natural es igualmente dramático: el cañón del río Chanchán, los paisajes de transición sierra-costa y los horizontes infinitos de los páramos de Chimborazo.",
      historia:
        "El ferrocarril Transandino, construido entre 1897 y 1908, fue la obra de ingeniería más ambiciosa del Ecuador. La Nariz del Diablo era el obstáculo infranqueable hasta que el sistema de zigzag permitió su conquista. Más de 4.000 obreros —muchos de Jamaica— dieron su vida construyendo este tramo.",
      curiosidad:
        "La Nariz del Diablo fue votada en 2013 como una de las rutas ferroviarias más espectaculares del mundo por la revista National Geographic Traveler, y el ferrocarril ecuatoriano fue declarado Patrimonio Cultural de la Nación en 2008.",
    },
    atractivos: [
      {
        nombre: "Nariz del Diablo — Experiencia Ferroviaria",
        tipo: "aventura",
        descripcion:
          "El tramo ferroviario más famoso de Ecuador: zigzag técnico por la cara de un espolón de roca vertical con 800 m de desnivel en 12 km. Operado por Ferrocarriles del Ecuador como experiencia turística.",
        duracionHoras: 4,
        costoUSD: "USD 22 – 33",
        prioridad: "imprescindible",
      },
      {
        nombre: "Centro Histórico de Alausí",
        tipo: "historia",
        descripcion:
          "Plaza central con iglesia del siglo XVIII, casas coloniales de adobe y teja, calles empedradas y la estatua de San Pedro en el promontorio rocoso sobre el pueblo.",
        duracionHoras: 2,
        costoUSD: "Gratuito",
        prioridad: "imprescindible",
      },
      {
        nombre: "Cañón del Río Chanchán",
        tipo: "naturaleza",
        descripcion:
          "Cañón profundo de transición sierra-costa con paisajes dramáticos de roca y vegetación seca. Punto de encuentro entre los dos mundos climáticos ecuatorianos.",
        duracionHoras: 3,
        costoUSD: "Gratuito",
        prioridad: "recomendado",
      },
      {
        nombre: "Comunidades Indígenas Alausí",
        tipo: "cultural",
        descripcion:
          "Visitas a comunidades Puruhá en el entorno del cantón con textiles, gastronomía y rituales andinos ancestrales.",
        duracionHoras: 4,
        costoUSD: "USD 10 – 30 tour comunitario",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Cuy asado de Chimborazo",
        descripcion:
          "Cobayo asado en leña o carbón, servido con papas, mote y ají. El plato más representativo de la provincia de Chimborazo para ocasiones especiales.",
        esPatrimonial: true,
        dondeProbarla: "Restaurantes del mercado y del centro de Alausí",
      },
      {
        nombre: "Chicha de jora",
        descripcion: "Bebida fermentada de maíz germinado, ritual en toda la sierra ecuatoriana.",
        esPatrimonial: true,
        dondeProbarla: "Comunidades indígenas del cantón",
      },
    ],
    festividades: [
      {
        nombre: "Fiesta de San Pedro de Alausí",
        mes: "Junio",
        descripcion:
          "Celebración patronal con procesiones, juegos pirotécnicos y la famosa cucaña en la plaza central. Tradición de más de 300 años.",
        esPatrimonioNacional: false,
      },
      {
        nombre: "Inti Raymi Alausí",
        mes: "Junio",
        descripcion:
          "Festejo del solsticio con danzas y rituales de las comunidades Puruhá de los alrededores del cantón.",
        esPatrimonioNacional: true,
      },
    ],
    hospedaje: [
      {
        categoria: "Boutique",
        descripcion: "Hotel Americano y hosterías locales con arquitectura colonial restaurada",
        precioReferencia: "USD 40 – 100 / noche",
      },
      {
        categoria: "Económico",
        descripcion: "Hostales locales funcionales en el centro histórico de Alausí",
        precioReferencia: "USD 15 – 35 / noche",
      },
    ],
    cultura: {
      pueblosIndigenas: ["Pueblo Puruhá"],
      artesaniaIconica: ["Tejidos en telar de cintura", "Sombreros de paja toquilla de la zona"],
      patrimonioDeclarado: [
        "Ferrocarril Transandino — Patrimonio Cultural del Ecuador (2008)",
        "Nariz del Diablo — ruta ferroviaria patrimonial",
      ],
      reconocimientos: ["National Geographic Traveler — una de las rutas ferroviarias más espectaculares del mundo (2013)"],
    },
    biodiversidad: {
      especiesIconicas: ["Cóndor andino", "Gavilán variable", "Loro de alas de bronce"],
      habitatPrincipal: "Valle interandino seco y bosque montano",
      areaProtegida: "Páramos de Chimborazo",
    },
    clima: "Templado andino",
    temperaturaRango: "12–20°C",
    temporadaIdeal: "Todo el año",
    mejorEpocaVisitar:
      "Todo el año para la Nariz del Diablo. Junio para festividades de San Pedro. Verificar disponibilidad del tren con Ferrocarriles del Ecuador antes de viajar.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#1A0A05",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=900&auto=format&fit=crop&q=80", alt: "Tren histórico ecuatoriano en la ruta de la Nariz del Diablo" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=900&auto=format&fit=crop&q=80", alt: "Cañón andino con neblina en los Andes centrales del Ecuador" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&auto=format&fit=crop&q=80", alt: "Centro histórico de Alausí con iglesia colonial al atardecer" },
      ],
    },
    colorAcento: "#C76139",
    seo: {
      slug: "alausi",
      titulo: "Alausí — La Nariz del Diablo y el Tren Patrimonial | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Viaja a Alausí para vivir la experiencia de la Nariz del Diablo: el zigzag ferroviario más dramático del mundo en los Andes ecuatorianos, declarado Patrimonio Cultural.",
      keywords: [
        "Alausí Nariz del Diablo",
        "tren Ecuador patrimonio",
        "ferrocarril andino Ecuador",
        "Chimborazo turismo",
        "Pueblos Mágicos Ecuador",
      ],
      schemaType: "LandmarksOrHistoricalBuildings",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },

  // ── 8. ZARUMA ─────────────────────────────────────────────
  {
    id: "zaruma",
    nombre: "Zaruma",
    nombreCorto: "Zaruma",
    provincia: "El Oro",
    categoria: "Pueblo Mágico",
    region: "Costa",
    coordenadas: {
      lat: -3.6926,
      lng: -79.6147,
      zoom: 14,
      dms: "3°41′33″S · 79°36′53″O",
    },
    topografia: {
      altitudMsnm: 1200,
      relieve: "Ceja de selva",
      referenciaGeografica: "Cordillera Occidental — estribaciones sureñas",
      cuencaHidrografica: "Río Amarillo",
    },
    ruta: {
      distanciaKm: 650,
      tiempoEstimado: "10–12h",
      nivelDificultad: "Difícil",
      via: "E35 → Riobamba → Cuenca → Machala → Zaruma (o vuelo a Machala)",
      indicaciones: [
        "Opción terrestre: E35 sur hasta Cuenca (5h), luego Cuenca-Machala (3h), Machala-Zaruma (2h)",
        "Opción aérea: vuelo Quito → Machala (1h) + bus/auto a Zaruma (2h) — RECOMENDADO",
        "La última hora desde Piñas a Zaruma es por carretera de montaña con curvas pronunciadas",
      ],
      transporte: [
        {
          tipo: "avión",
          descripcion: "Vuelo Quito-Machala + transfer terrestre a Zaruma. Opción más eficiente",
          precio: "USD 80 – 150 vuelo + USD 10 transfer",
          frecuencia: "Vuelos diarios a Machala",
        },
        {
          tipo: "bus",
          descripcion: "Bus directo Quito → Zaruma vía Machala (servicio nocturno disponible)",
          precio: "USD 12 – 18",
          frecuencia: "Salidas nocturnas desde Terminal Quitumbe",
        },
        {
          tipo: "auto",
          descripcion: "Ruta larga por carretera andina. No recomendado en un día",
          frecuencia: "Acceso permanente — dividir el viaje en dos días",
        },
      ],
    },
    narrativa: {
      tagline: "La ciudad de madera dorada y el café más premiado del Ecuador",
      descripcionCorta:
        "Zaruma es una joya arquitectónica olvidada en las montañas del sur: sus casas de madera polícroma del siglo XIX sobreviven intactas, y en sus entrañas, las minas de oro coloniales aún guardan los secretos de tres siglos de extracción.",
      descripcionLarga:
        "Zaruma es quizás la ciudad más auténticamente preservada del Ecuador: sus calles empinadas y serpenteantes están bordeadas de casas de madera pintadas en colores pastel brillantes, con balcones trabajados en madera que se asoman sobre el abismo de las quebradas. Fundada en 1549 por orden de Felipe II para explotar el oro de sus montañas, Zaruma vivió siglos de bonanza y declive que dejaron una arquitectura colonial singular, distinta a cualquier otra ciudad del Ecuador. El café orense, cultivado en las laderas a entre 800 y 1.800 msnm, ha ganado múltiples premios internacionales y es considerado uno de los mejores cafés de especialidad de Sudamérica. El centro histórico fue declarado Patrimonio Cultural del Estado ecuatoriano.",
      historia:
        "Zaruma fue fundada el 8 de diciembre de 1549 como Real Minas de San Antonio del Cerro de Zaruma, por orden de Felipe II de España. Su nombre proviene del kichwa 'sara-uma' que significa 'cabeza de maíz'. La explotación aurífera colonial transformó el paisaje y la demografía de toda la región de El Oro, provincia que también lleva el nombre del metal que la fundó.",
      curiosidad:
        "El centro histórico de Zaruma conserva más de 100 edificios de madera de los siglos XIX y XX en estado casi original. En 1998 fue declarado Patrimonio Cultural del Estado. Sus minas de oro coloniales aún son visitables y algunas siguen siendo explotadas artesanalmente.",
    },
    atractivos: [
      {
        nombre: "Centro Histórico Colonial de Zaruma",
        tipo: "historia",
        descripcion:
          "Más de 100 edificios de madera del siglo XIX en estado original, calles empedradas y empinadas, iglesia colonial y plaza central. Declarado Patrimonio Cultural del Ecuador en 1998.",
        duracionHoras: 3,
        costoUSD: "Gratuito",
        prioridad: "imprescindible",
      },
      {
        nombre: "Minas de Oro Coloniales — Visita Subterránea",
        tipo: "aventura",
        descripcion:
          "Recorrido por las minas de oro coloniales, algunas en operación artesanal desde el siglo XVI. Experiencia subterránea única en Ecuador.",
        duracionHoras: 2,
        costoUSD: "USD 5 – 15",
        prioridad: "imprescindible",
      },
      {
        nombre: "Ruta del Café Orense",
        tipo: "gastronómica",
        descripcion:
          "Visita a fincas cafetaleras en las laderas de la cordillera donde se cultiva el café de especialidad premiado internacionalmente. Proceso de beneficio y cata incluidos.",
        duracionHoras: 4,
        costoUSD: "USD 15 – 30",
        prioridad: "recomendado",
      },
      {
        nombre: "Mirador El Calvario",
        tipo: "fotografía",
        descripcion:
          "Punto panorámico sobre el centro histórico de Zaruma con vistas hacia los valles cafeteros y las montañas de El Oro.",
        duracionHoras: 1,
        costoUSD: "Gratuito",
        prioridad: "recomendado",
      },
    ],
    gastronomia: [
      {
        nombre: "Café orense de especialidad",
        descripcion:
          "Café arábica de altura cultivado entre 800 y 1.800 msnm en las laderas de la provincia de El Oro. Perfil de taza con notas de frutos rojos, cacao y caramelo. Premiado internacionalmente.",
        esPatrimonial: true,
        dondeProbarla: "Cafeterías del centro histórico de Zaruma y fincas visitables",
      },
      {
        nombre: "Tigrillo zarumeño",
        descripcion:
          "Desayuno típico de huevo frito con plátano verde machacado y frito. El desayuno más característico de la región de El Oro.",
        esPatrimonial: true,
        dondeProbarla: "Restaurantes y fondas del mercado central de Zaruma",
      },
      {
        nombre: "Pan de casa en horno de leña",
        descripcion:
          "Pan artesanal horneado en hornos de leña de las panaderías del centro histórico. Masa madre y técnicas del siglo XIX.",
        esPatrimonial: false,
        dondeProbarla: "Panaderías del centro histórico",
      },
    ],
    festividades: [
      {
        nombre: "Festival del Café Orense",
        mes: "Agosto",
        descripcion:
          "Festival anual del café con concursos de barismo, catas guiadas, visitas a fincas y exposición de los cafés premiados de la región.",
        esPatrimonioNacional: false,
      },
      {
        nombre: "Fundación de Zaruma",
        mes: "Diciembre",
        descripcion:
          "Celebración de la fundación colonial con desfiles, música, gastronomía y actividades culturales en el centro histórico.",
        esPatrimonioNacional: false,
      },
    ],
    hospedaje: [
      {
        categoria: "Boutique",
        descripcion: "Hotel Zaruma Colonial y hostal Cerro de Oro — alojamientos en edificios restaurados del siglo XIX",
        precioReferencia: "USD 40 – 90 / noche",
      },
      {
        categoria: "Económico",
        descripcion: "Hostales locales sencillos en el centro histórico",
        precioReferencia: "USD 15 – 30 / noche",
      },
    ],
    cultura: {
      artesaniaIconica: ["Trabajos en madera", "Orfebrería local", "Café de especialidad"],
      patrimonioDeclarado: ["Centro histórico de Zaruma — Patrimonio Cultural del Estado Ecuatoriano (1998)"],
      reconocimientos: [
        "Café orense — múltiples premios internacionales de cafés de especialidad",
        "Arquitectura colonial de madera — única en Ecuador",
      ],
    },
    biodiversidad: {
      especiesIconicas: ["Loro ecuatoriano", "Colibrí de vientre rufo", "Pájaro paraguas"],
      habitatPrincipal: "Bosque montano bajo y ceja de selva",
    },
    clima: "Cálido húmedo",
    temperaturaRango: "20–28°C",
    temporadaIdeal: "Jun–Sep",
    mejorEpocaVisitar:
      "Junio a septiembre (estación seca de la costa). Agosto para el Festival del Café. Evitar temporada de lluvias (enero-mayo) por la carretera de montaña.",
    multimedia: {
      heroImage: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1600&auto=format&fit=crop&q=85&crop=focalpoint",
      heroColorDominante: "#2A1500",
      imagenes: [
        { tipo: "foto", url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=900&auto=format&fit=crop&q=80", alt: "Calles empedradas y casas de madera del centro histórico de Zaruma" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80", alt: "Iglesia patrimonial de Zaruma con campanario colonial" },
        { tipo: "foto", url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=900&auto=format&fit=crop&q=80", alt: "Panorámica de Zaruma sobre colinas boscosas de El Oro" },
      ],
    },
    colorAcento: "#E8B040",
    seo: {
      slug: "zaruma",
      titulo: "Zaruma — Ciudad de Madera Dorada y Café de Especialidad | Pueblos Mágicos Ecuador",
      descripcionMeta:
        "Zaruma: el centro histórico de madera más preservado del Ecuador, minas de oro coloniales visitables y el mejor café de especialidad del país en las montañas de El Oro.",
      keywords: [
        "Zaruma Ecuador patrimonio",
        "café orense El Oro",
        "centro histórico Zaruma",
        "minas oro Ecuador",
        "Pueblos Mágicos Ecuador",
        "El Oro turismo",
      ],
      schemaType: "LandmarksOrHistoricalBuildings",
    },
    anioIngreso: 2019,
    certificadoPor: "Ministerio de Turismo del Ecuador",
  },
];

// ─── UTILIDADES DE ACCESO ────────────────────────────────────

/** Obtener pueblo por slug */
export const getPuebloBySlug = (slug: string): PuebloMagico | undefined =>
  pueblosMagicosDB.find((p) => p.seo.slug === slug);

/** Obtener pueblo por id */
export const getPuebloById = (id: string): PuebloMagico | undefined =>
  pueblosMagicosDB.find((p) => p.id === id);

/** Transformar a formato ligero para cards */
export const getPueblosCards = (): PuebloCard[] =>
  pueblosMagicosDB.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    nombreCorto: p.nombreCorto,
    provincia: p.provincia,
    categoria: p.categoria,
    region: p.region,
    coordenadas: p.coordenadas,
    topografia: p.topografia,
    ruta: p.ruta,
    clima: p.clima,
    temperaturaRango: p.temperaturaRango,
    colorAcento: p.colorAcento,
    multimedia: p.multimedia,
    seo: p.seo,
    narrativa: {
      tagline: p.narrativa.tagline,
      descripcionCorta: p.narrativa.descripcionCorta,
    },
    atractivoDestacado: p.atractivos.find((a) => a.prioridad === "imprescindible")?.nombre ?? "",
  }));

/** Transformar a marcadores para el mapa */
export const getPueblosMapMarkers = (): PuebloMapMarker[] =>
  pueblosMagicosDB.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    region: p.region,
    coordenadas: p.coordenadas,
    colorAcento: p.colorAcento,
    tagline: p.narrativa.tagline,
    altitud: p.topografia.altitudMsnm,
    distanciaKm: p.ruta.distanciaKm,
    slug: p.seo.slug,
  }));

/** Transformar a formato comparable */
export const getPueblosComparables = (): PuebloComparable[] =>
  pueblosMagicosDB.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    region: p.region,
    topografia: p.topografia,
    ruta: p.ruta,
    clima: p.clima,
    temperaturaRango: p.temperaturaRango,
    colorAcento: p.colorAcento,
    multimedia: p.multimedia,
    tagline: p.narrativa.tagline,
    atractivos: p.atractivos.filter((a) => a.prioridad === "imprescindible").map((a) => a.nombre),
    gastronomia: p.gastronomia.filter((g) => g.esPatrimonial).map((g) => g.nombre),
  }));

/** Returns true if a pueblo matches a single experience/biodiversity tag */
export function matchesTag(p: PuebloMagico, tag: string): boolean {
  switch (tag) {
    case "Artesanías":
      return (p.cultura.artesaniaIconica?.length ?? 0) > 0;
    case "Patrimonio declarado":
      return (p.cultura.patrimonioDeclarado?.length ?? 0) > 0;
    case "Comunidades indígenas":
      return (p.cultura.pueblosIndigenas?.length ?? 0) > 0;
    case "Gastronomía patrimonial":
      return p.gastronomia.some((g) => g.esPatrimonial);
    case "Volcán o nevado":
      return /volcán|nevado/i.test(p.topografia.referenciaGeografica ?? "");
    case "Arquitectura colonial":
      return p.seo.schemaType === "LandmarksOrHistoricalBuildings";
    case "Ferrocarril patrimonial":
      return p.ruta.transporte.some((t) => t.tipo === "tren");
    case "Área protegida":
      return !!p.biodiversidad.areaProtegida;
    case "Alta avifauna":
      return (p.biodiversidad.especiesAves ?? 0) > 0;
    case "Fauna andina":
      return (p.biodiversidad.especiesIconicas?.length ?? 0) > 0;
    default:
      return true;
  }
}

/** Filtrar pueblos con criterios múltiples */
export const filtrarPueblos = (
  filtros: FiltrosPueblos,
  db: PueblosMagicosDB = pueblosMagicosDB
): PueblosMagicosDB => {
  return db.filter((p) => {
    // Text search across key fields
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      const haystack = [
        p.nombre,
        p.nombreCorto,
        p.provincia,
        p.region,
        p.clima,
        p.narrativa.tagline,
        p.narrativa.descripcionCorta,
      ].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filtros.region?.length && !filtros.region.includes(p.region)) return false;
    if (filtros.dificultad?.length && !filtros.dificultad.includes(p.ruta.nivelDificultad)) return false;
    if (filtros.clima?.length && !filtros.clima.includes(p.clima)) return false;
    if (filtros.altitudMin != null && p.topografia.altitudMsnm < filtros.altitudMin) return false;
    if (filtros.altitudMax != null && p.topografia.altitudMsnm > filtros.altitudMax) return false;
    if (filtros.distanciaMaxKm != null && p.ruta.distanciaKm > filtros.distanciaMaxKm) return false;

    if (filtros.tipoActividad?.length) {
      const tieneActividad = p.atractivos.some((a) => filtros.tipoActividad!.includes(a.tipo));
      if (!tieneActividad) return false;
    }

    // Tags: all selected tags must match (AND logic)
    if (filtros.tags?.length) {
      if (!filtros.tags.every((tag) => matchesTag(p, tag))) return false;
    }

    if (filtros.temporada && p.temporadaIdeal !== filtros.temporada && p.temporadaIdeal !== "Todo el año")
      return false;
    if (filtros.categoria && p.categoria !== filtros.categoria) return false;
    return true;
  });
};

/** Obtener todos los slugs — para Next.js generateStaticParams */
export const getAllSlugs = (): string[] => pueblosMagicosDB.map((p) => p.seo.slug);

/** Obtener pueblos por región */
export const getPueblosByRegion = (region: string) =>
  pueblosMagicosDB.filter((p) => p.region === region);

/** Ordenar pueblos por distancia desde Quito */
export const getPueblosByDistancia = () =>
  [...pueblosMagicosDB].sort((a, b) => a.ruta.distanciaKm - b.ruta.distanciaKm);

/** Obtener estadísticas globales */
export const getEstadisticasGlobales = () => {
  const porDistancia = getPueblosByDistancia();
  const porAltitud = [...pueblosMagicosDB].sort(
    (a, b) => b.topografia.altitudMsnm - a.topografia.altitudMsnm
  );
  return {
    total: pueblosMagicosDB.length,
    porRegion: {
      Sierra: pueblosMagicosDB.filter((p) => p.region === "Sierra").length,
      Costa: pueblosMagicosDB.filter((p) => p.region === "Costa").length,
      Amazonía: pueblosMagicosDB.filter((p) => p.region === "Amazonía").length,
      Galápagos: pueblosMagicosDB.filter((p) => p.region === "Galápagos").length,
    },
    altitudPromedio: Math.round(
      pueblosMagicosDB.reduce((acc, p) => acc + p.topografia.altitudMsnm, 0) / pueblosMagicosDB.length
    ),
    distanciaPromedio: Math.round(
      pueblosMagicosDB.reduce((acc, p) => acc + p.ruta.distanciaKm, 0) / pueblosMagicosDB.length
    ),
    masCercano: porDistancia[0]?.nombre,
    masLejano: porDistancia[pueblosMagicosDB.length - 1]?.nombre,
    masAlto: porAltitud[0]?.nombre,
  };
};
