# Pueblos Mágicos del Ecuador — Arquitectura de Datos
### Programa "4 Mundos" · Ministerio de Turismo · desde 2019

---

## Estructura del proyecto

```
src/
├── types/
│   ├── index.ts            → Sistema de tipos TypeScript completo
│   └── components.ts       → Props de todos los componentes UI
├── data/
│   └── pueblos-magicos.ts  → Base de datos oficial + utilidades de acceso
├── config/
│   └── design-system.ts    → Paleta, tokens, animaciones, tipografía
├── lib/
│   ├── seo.ts              → Generadores de metadata y Schema.org
│   └── pages.ts            → Rutas dinámicas y utilidades Next.js
└── index.ts                → Barrel exports (importación limpia)
```

---

## Base de datos actual

| # | Pueblo | Provincia | Región | Altitud | Dist. Quito |
|---|--------|-----------|--------|---------|-------------|
| 1 | Rumiñahui / Sangolquí | Pichincha | Sierra | 2.535m | 33 km |
| 2 | Cayambe | Pichincha | Sierra | 2.830m | 75 km |
| 3 | San Antonio de Ibarra | Imbabura | Sierra | 2.360m | 120 km |
| 4 | Cotacachi | Imbabura | Sierra | 2.418m | 107 km |
| 5 | Patate | Tungurahua | Sierra | 2.200m | 157 km |
| 6 | Guano | Chimborazo | Sierra | 2.720m | 196 km |
| 7 | Alausí | Chimborazo | Sierra | 2.340m | 283 km |
| 8 | Zaruma | El Oro | Costa | 1.200m | 650 km |

---

## Importaciones

```typescript
// Datos y utilidades
import {
  pueblosMagicosDB,
  getPuebloBySlug,
  getPueblosCards,
  getPueblosMapMarkers,
  getPueblosComparables,
  filtrarPueblos,
  getAllSlugs,
  getEstadisticasGlobales,
} from "@/src/data/pueblos-magicos";

// Tipos
import type { PuebloMagico, PuebloCard, FiltrosPueblos } from "@/src/types";

// Design system
import { paleta, animaciones, coloresPorRegion } from "@/src/config/design-system";

// SEO
import { generarMetadataPueblo, generarSchemaJsonLd } from "@/src/lib/seo";

// Todo desde el barrel
import { pueblosMagicosDB, paleta, generarMetadataPueblo } from "@/src";
```

---

## Casos de uso

### Mapa Leaflet — markers

```typescript
const markers = getPueblosMapMarkers();
// Cada marker contiene: id, nombre, region, coordenadas, colorAcento,
// tagline, altitud, distanciaKm, slug
markers.forEach((m) => {
  L.circleMarker([m.coordenadas.lat, m.coordenadas.lng], {
    color: m.colorAcento,
    radius: 8,
  })
  .bindPopup(`<b>${m.nombre}</b><br>${m.tagline}`)
  .addTo(map);
});
```

### Explorador con filtros

```typescript
const pueblosFiltrados = filtrarPueblos({
  region: ["Sierra"],
  dificultad: ["Fácil", "Moderado"],
  distanciaMaxKm: 300,
  tipoActividad: ["aventura", "naturaleza"],
});
```

### Página individual — Next.js App Router

```typescript
// app/pueblos/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const pueblo = getPuebloBySlug(params.slug);
  if (!pueblo) return {};
  return generarMetadataPueblo(pueblo);
}
```

### Comparador de destinos

```typescript
const comparables = getPueblosComparables();
// Cada comparable contiene datos clave para comparar:
// nombre, región, altitud, distancia, clima, temperatura,
// atractivos imprescindibles, gastronomía patrimonial
```

### Estadísticas globales

```typescript
const stats = getEstadisticasGlobales();
// { total: 8, porRegion: { Sierra: 7, Costa: 1 },
//   altitudPromedio: 2288, distanciaPromedio: 252,
//   masCercano: "Rumiñahui / Sangolquí",
//   masLejano: "Zaruma", masAlto: "Cayambe" }
```

---

## Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| `verde` / `paramo` | `#3F7D44` | Sierra, naturaleza, senderismo |
| `terracota` / `colonial` | `#C76139` | Arquitectura, historia, artesanía |
| `azul` / `andino` | `#3D8BCD` | Costa, cielo, agua |
| `oro` / `zaruma` | `#E8B040` | Destaque, dorado, gastronomía |
| `carbon` | `#0F1115` | Fondo oscuro cinematográfico |

---

## Escalar la base de datos

Para agregar nuevos pueblos:

1. Agregar el objeto `PuebloMagico` al array `pueblosMagicosDB` en `data/pueblos-magicos.ts`
2. El objeto debe cumplir la interfaz `PuebloMagico` definida en `types/index.ts`
3. Generar el slug en `seo.slug` (ej: `"loja"`, `"zaruma"`)
4. Todas las utilidades de acceso se actualizan automáticamente

---

## Componentes necesarios (próxima fase)

- `<MapaInteractivo />` — Leaflet + markers dinámicos
- `<PuebloCard />` — Card con hover cinematográfico
- `<CardGrid />` — Grid filtrable y animado
- `<FiltrosPanel />` — Panel de filtros multi-criterio
- `<PuebloHero />` — Hero de página individual
- `<PuebloInfoGrid />` — Grid de estadísticas
- `<PuebloAtractivos />` — Lista de atractivos
- `<Comparador />` — Tabla comparativa side-by-side
- `<RecomendadorViaje />` — Sugerencias inteligentes

---

*Pueblos Mágicos del Ecuador · Ministerio de Turismo · Programa "4 Mundos" · 2019–presente*
