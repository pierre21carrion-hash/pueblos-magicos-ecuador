"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getPueblosCards } from "@/src/data/pueblos-magicos";
import type { PuebloCard } from "@/src/types";

const MAX_COMPARISON = 3;

const allCards: PuebloCard[] = getPueblosCards();

interface ComparisonContextValue {
  ids: readonly string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  set: (ids: string[]) => void;
  clear: () => void;
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

export interface ComparisonAPI {
  ids: readonly string[];
  count: number;
  max: number;
  isSelected: (id: string) => boolean;
  canAdd: boolean;
  canCompare: boolean;
  selectedCards: PuebloCard[];
  compareUrl: string;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  set: (ids: string[]) => void;
  clear: () => void;
}

function normalizeIds(ids: string[]): string[] {
  return Array.from(new Set(ids)).slice(0, MAX_COMPARISON);
}

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  const add = useCallback((id: string) => {
    setIds((current) => {
      if (current.includes(id) || current.length >= MAX_COMPARISON) return current;
      return [...current, id];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((current) => current.filter((item) => item !== id));
  }, []);

  const set = useCallback((nextIds: string[]) => {
    setIds(normalizeIds(nextIds));
  }, []);

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= MAX_COMPARISON) return current;
      return [...current, id];
    });
  }, []);

  const value = useMemo(
    () => ({ ids, add, remove, toggle, set, clear }),
    [ids, add, remove, toggle, set, clear]
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison(): ComparisonAPI {
  const context = useContext(ComparisonContext);

  if (!context) {
    throw new Error("useComparison must be used inside ComparisonProvider");
  }

  const { ids, add, remove, toggle, set, clear } = context;

  return useMemo(() => {
    const selectedCards = ids
      .map((id) => allCards.find((pueblo) => pueblo.id === id))
      .filter((pueblo): pueblo is PuebloCard => Boolean(pueblo));

    const slugs = selectedCards.map((pueblo) => pueblo.seo.slug);

    return {
      ids,
      count: ids.length,
      max: MAX_COMPARISON,
      isSelected: (id: string) => ids.includes(id),
      canAdd: ids.length < MAX_COMPARISON,
      canCompare: ids.length >= 2,
      selectedCards,
      compareUrl: slugs.length > 0 ? `/comparar?ids=${slugs.join(",")}` : "/comparar",
      add,
      remove,
      toggle,
      set,
      clear,
    };
  }, [ids, add, remove, toggle, set, clear]);
}
