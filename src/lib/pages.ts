// ============================================================
// NEXT.JS APP ROUTER — UTILS DE PÁGINAS
// Pueblos Mágicos del Ecuador
// ============================================================

import {
  getAllSlugs,
  getPueblosMapMarkers,
  getPueblosCards,
  getEstadisticasGlobales,
} from "../data/pueblos-magicos";

/** Todas las rutas estáticas generadas — para verificación de integridad */
export const rutasEstaticas = getAllSlugs().map((slug) => ({
  path: `/pueblos/${slug}`,
  slug,
}));

/** Verifica integridad de la base de datos en tiempo de build */
export function verificarIntegridad(): { ok: boolean; errores: string[] } {
  const errores: string[] = [];
  const markers = getPueblosMapMarkers();
  const cards = getPueblosCards();

  markers.forEach((m) => {
    if (!m.coordenadas.lat || !m.coordenadas.lng)
      errores.push(`${m.nombre}: coordenadas inválidas`);
    if (!m.slug)
      errores.push(`${m.nombre}: slug faltante`);
  });

  cards.forEach((c) => {
    if (!c.narrativa.tagline)
      errores.push(`${c.nombre}: tagline faltante`);
    if (!c.ruta.distanciaKm)
      errores.push(`${c.nombre}: distancia faltante`);
  });

  return { ok: errores.length === 0, errores };
}

export { getAllSlugs, getPueblosMapMarkers, getPueblosCards, getEstadisticasGlobales };
