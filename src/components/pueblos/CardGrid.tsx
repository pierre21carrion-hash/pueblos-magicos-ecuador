import { memo } from "react";
import type { PuebloCard } from "@/src/types";
import PuebloCardComponent from "./PuebloCard";

interface CardGridProps {
  pueblos: PuebloCard[];
  className?: string;
}

function CardGrid({ pueblos, className = "" }: CardGridProps) {
  if (pueblos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
        <p className="text-white/30 text-lg font-display mb-2">Sin resultados</p>
        <p className="text-white/20 text-sm">Ajusta los filtros para ver más destinos.</p>
      </div>
    );
  }

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ${className}`}
      role="list"
      aria-label={`${pueblos.length} destino${pueblos.length !== 1 ? "s" : ""}`}
    >
      {pueblos.map((pueblo, i) => (
        <li key={pueblo.id}>
          <PuebloCardComponent pueblo={pueblo} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}

// Wrapped in memo: avoids re-rendering when sidebar open/closed or view toggled
// while the filtered pueblos array reference is unchanged.
export default memo(CardGrid);
