import type { PuebloCard } from "@/src/types";

export type ExplorerSort =
  | "editorial"
  | "distance-asc"
  | "distance-desc"
  | "altitude-desc"
  | "altitude-asc"
  | "name-asc";

export const EXPLORER_SORT_OPTIONS: Array<{ value: ExplorerSort; label: string }> = [
  { value: "editorial", label: "Orden editorial" },
  { value: "distance-asc", label: "Más cerca de Quito" },
  { value: "distance-desc", label: "Más lejos de Quito" },
  { value: "altitude-desc", label: "Mayor altitud" },
  { value: "altitude-asc", label: "Menor altitud" },
  { value: "name-asc", label: "Nombre A-Z" },
];

export function sortPuebloCards(pueblos: PuebloCard[], sort: ExplorerSort): PuebloCard[] {
  if (sort === "editorial") return pueblos;

  return pueblos
    .map((pueblo, index) => ({ pueblo, index }))
    .sort((a, b) => {
      let result = 0;

      if (sort === "distance-asc") {
        result = a.pueblo.ruta.distanciaKm - b.pueblo.ruta.distanciaKm;
      } else if (sort === "distance-desc") {
        result = b.pueblo.ruta.distanciaKm - a.pueblo.ruta.distanciaKm;
      } else if (sort === "altitude-desc") {
        result = b.pueblo.topografia.altitudMsnm - a.pueblo.topografia.altitudMsnm;
      } else if (sort === "altitude-asc") {
        result = a.pueblo.topografia.altitudMsnm - b.pueblo.topografia.altitudMsnm;
      } else if (sort === "name-asc") {
        result = a.pueblo.nombre.localeCompare(b.pueblo.nombre, "es");
      }

      return result || a.index - b.index;
    })
    .map(({ pueblo }) => pueblo);
}
