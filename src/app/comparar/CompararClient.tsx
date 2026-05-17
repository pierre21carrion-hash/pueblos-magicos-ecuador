"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { PuebloMagico, PuebloCard } from "@/src/types";
import { getPuebloBySlug } from "@/src/data/pueblos-magicos";
import { useComparison } from "@/src/hooks/useComparison";
import ComparisonTable from "@/src/components/comparar/ComparisonTable";

interface Props {
  initialPueblos: PuebloMagico[];
  allCards: PuebloCard[];
}

export default function CompararClient({ initialPueblos, allCards }: Props) {
  const router = useRouter();
  const [pueblos, setPueblos] = useState<PuebloMagico[]>(initialPueblos);
  const { set: setComparisonIds, remove: removeComparisonId } = useComparison();

  // Sync comparison state with server-resolved pueblos on mount.
  useEffect(() => {
    setComparisonIds(initialPueblos.map((p) => p.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncUrl = useCallback(
    (next: PuebloMagico[]) => {
      const slugs = next.map((p) => p.seo.slug);
      const url = slugs.length > 0 ? `/comparar?ids=${slugs.join(",")}` : "/comparar";
      router.replace(url, { scroll: false });
    },
    [router],
  );

  const handleRemove = useCallback(
    (id: string) => {
      setPueblos((prev) => {
        const next = prev.filter((p) => p.id !== id);
        removeComparisonId(id);
        syncUrl(next);
        return next;
      });
    },
    [removeComparisonId, syncUrl],
  );

  const handleAdd = useCallback(
    (slug: string) => {
      const pueblo = getPuebloBySlug(slug);
      if (!pueblo) return;
      setPueblos((prev) => {
        if (prev.some((p) => p.id === pueblo.id) || prev.length >= 3) return prev;
        const next = [...prev, pueblo];
        setComparisonIds(next.map((p) => p.id));
        syncUrl(next);
        return next;
      });
    },
    [setComparisonIds, syncUrl],
  );

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Page header */}
        <header className="mb-10">
          <p className="text-paramo text-xs uppercase tracking-[0.2em] mb-3 font-medium">
            Hasta 3 destinos lado a lado
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-white mb-3">
            Comparación
          </h1>
          <p className="text-white/40 text-sm max-w-xl">
            {pueblos.length === 0
              ? "Selecciona al menos 2 Pueblos Mágicos desde el explorador para comenzar."
              : pueblos.length === 1
              ? "Añade un destino más para poder comparar."
              : `Comparando ${pueblos.length} destino${pueblos.length > 1 ? "s" : ""}. Puedes añadir ${3 - pueblos.length} más.`}
          </p>
        </header>

        {/* Comparison table */}
        <ComparisonTable
          pueblos={pueblos}
          allCards={allCards}
          onRemove={handleRemove}
          onAdd={handleAdd}
        />
      </div>
    </main>
  );
}
