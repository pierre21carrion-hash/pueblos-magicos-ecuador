"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  Clima,
  FiltrosPueblos,
  NivelDificultad,
  Region,
  TipoActividad,
} from "@/src/types";
import {
  AltitudPreset,
  altitudPresetToFilters,
  getAltitudPreset,
  hayFiltrosActivos,
  parseSearchParams,
  serializeFilters,
} from "@/src/lib/filter-params";

// ─── Exported return type ────────────────────────────────────

export interface PuebloFiltersAPI {
  /** Filter state derived from URL — single source of truth */
  filtros: FiltrosPueblos;
  /** Instant text input value (debounced to URL at 300 ms) */
  searchInput: string;
  /** Whether any filter is active */
  hayFiltros: boolean;
  /** Active altitude preset, or null if none */
  altitudPreset: AltitudPreset | null;
  /** True while the URL transition is pending (router.replace) */
  isPending: boolean;
  /** Replace any subset of filters and push to URL */
  updateFilters: (updates: Partial<FiltrosPueblos>) => void;
  /** Clear all filters and reset URL */
  resetFilters: () => void;
  /** Toggle a single value in a multi-select filter array */
  toggleRegion: (v: Region) => void;
  toggleDificultad: (v: NivelDificultad) => void;
  toggleClima: (v: Clima) => void;
  toggleActividad: (v: TipoActividad) => void;
  toggleTag: (v: string) => void;
  /** Set altitude preset (null clears it) */
  setAltitudPreset: (preset: AltitudPreset | null) => void;
  /** Set max distance in km (null clears it) */
  setDistanciaMax: (km: number | null) => void;
  /** Update the search input (debounced URL write) */
  handleSearchChange: (value: string) => void;
}

// ─── Hook ────────────────────────────────────────────────────

export function usePuebloFilters(): PuebloFiltersAPI {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // ── Derived state from URL ─────────────────────────────────
  const filtros = useMemo(() => parseSearchParams(searchParams), [searchParams]);

  // ── Local search input (instant) ──────────────────────────
  // Kept separate so the <input> is responsive while the URL update is debounced.
  const [searchInput, setSearchInput] = useState(filtros.busqueda ?? "");

  // Tracks whether the user is actively typing to prevent URL back-nav from
  // overwriting the in-progress input.
  const isTypingRef = useRef(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync searchInput when URL changes externally (browser back/forward).
  useEffect(() => {
    if (!isTypingRef.current) {
      setSearchInput(filtros.busqueda ?? "");
    }
  }, [filtros.busqueda]);

  // ── Core URL writer ────────────────────────────────────────
  const pushParams = useCallback(
    (next: FiltrosPueblos) => {
      const qs = serializeFilters(next).toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router]
  );

  // ── Generic update ─────────────────────────────────────────
  const updateFilters = useCallback(
    (updates: Partial<FiltrosPueblos>) => pushParams({ ...filtros, ...updates }),
    [filtros, pushParams]
  );

  // ── Reset ──────────────────────────────────────────────────
  const resetFilters = useCallback(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    isTypingRef.current = false;
    setSearchInput("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  // ── Multi-select toggle helpers ────────────────────────────
  const makeToggle = useCallback(
    <T extends string>(key: keyof FiltrosPueblos, currentArr: T[] | undefined) =>
      (value: T) => {
        const current = currentArr ?? [];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        updateFilters({ [key]: next.length ? next : undefined });
      },
    [updateFilters]
  );

  const toggleRegion = useMemo(
    () => makeToggle<Region>("region", filtros.region),
    [makeToggle, filtros.region]
  );
  const toggleDificultad = useMemo(
    () => makeToggle<NivelDificultad>("dificultad", filtros.dificultad),
    [makeToggle, filtros.dificultad]
  );
  const toggleClima = useMemo(
    () => makeToggle<Clima>("clima", filtros.clima),
    [makeToggle, filtros.clima]
  );
  const toggleActividad = useMemo(
    () => makeToggle<TipoActividad>("tipoActividad", filtros.tipoActividad),
    [makeToggle, filtros.tipoActividad]
  );
  const toggleTag = useMemo(
    () => makeToggle<string>("tags", filtros.tags),
    [makeToggle, filtros.tags]
  );

  // ── Altitude preset ────────────────────────────────────────
  const altitudPreset = useMemo(() => getAltitudPreset(filtros), [filtros]);

  const setAltitudPreset = useCallback(
    (preset: AltitudPreset | null) =>
      updateFilters(altitudPresetToFilters(preset)),
    [updateFilters]
  );

  // ── Distance ───────────────────────────────────────────────
  const setDistanciaMax = useCallback(
    (km: number | null) => updateFilters({ distanciaMaxKm: km ?? undefined }),
    [updateFilters]
  );

  // ── Debounced search ───────────────────────────────────────
  const handleSearchChange = useCallback(
    (value: string) => {
      isTypingRef.current = true;
      setSearchInput(value);
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      searchTimerRef.current = setTimeout(() => {
        isTypingRef.current = false;
        pushParams({ ...filtros, busqueda: value || undefined });
      }, 300);
    },
    // pushParams and filtros are memoized; this is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtros.region, filtros.dificultad, filtros.clima, filtros.tipoActividad,
     filtros.tags, filtros.altitudMin, filtros.altitudMax, filtros.distanciaMaxKm,
     filtros.temporada, filtros.categoria, pushParams]
  );

  const hayFiltros = useMemo(() => hayFiltrosActivos(filtros), [filtros]);

  return {
    filtros,
    searchInput,
    hayFiltros,
    altitudPreset,
    isPending,
    updateFilters,
    resetFilters,
    toggleRegion,
    toggleDificultad,
    toggleClima,
    toggleActividad,
    toggleTag,
    setAltitudPreset,
    setDistanciaMax,
    handleSearchChange,
  };
}
