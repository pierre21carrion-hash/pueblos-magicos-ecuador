// Analytics abstraction — SSR-safe, tree-shakeable, zero console noise.
// Supports: Vercel Analytics, PostHog, Plausible, GA4.
// Install providers independently; this layer calls whichever is present.

// ─── Global provider declarations ────────────────────────────

declare global {
  interface Window {
    // Vercel Analytics (script-tag or @vercel/analytics package)
    va?: (command: string, payload?: Record<string, unknown>) => void;
    // PostHog
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string, traits?: Record<string, unknown>) => void;
    };
    // Plausible
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean> },
    ) => void;
    // GA4
    gtag?: (...args: unknown[]) => void;
    // Datadog RUM
    DD_RUM?: { addAction: (name: string, context?: Record<string, unknown>) => void };
  }
}

// ─── Event schema ─────────────────────────────────────────────

export type AnalyticsEvent =
  | { name: "quiz_step_view";      step: number }
  | { name: "quiz_step_complete";  step: number; time_ms: number; value: string }
  | { name: "quiz_step_back";      from_step: number }
  | { name: "quiz_abandoned";      step: number; total_time_ms: number }
  | { name: "quiz_complete";       total_time_ms: number; tipo_viaje: string; clima: string; distancia: string }
  | { name: "quiz_reset" }
  | { name: "recommendation_view"; count: number; top_score: number }
  | { name: "recommendation_click"; pueblo_id: string; pueblo_nombre: string; rank: number; score: number }
  | { name: "comparison_add";      pueblo_id: string; pueblo_nombre: string; total_in_bar: number }
  | { name: "comparison_remove";   pueblo_id: string }
  | { name: "comparison_clear" }
  | { name: "comparison_view";     pueblo_ids: string; count: number }
  | { name: "filter_apply";        filter_key: string; filter_value: string }
  | { name: "filter_reset" }
  | { name: "map_marker_click";    pueblo_id: string; pueblo_nombre: string }
  | { name: "pueblo_page_view";    pueblo_id: string; slug: string; region: string }
  | { name: "gallery_open";        pueblo_id: string; image_index: number }
  | { name: "cta_click";           label: string; destination: string };

// ─── Core dispatcher ──────────────────────────────────────────

function dispatch(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const { name, ...props } = event;

  // Vercel Analytics
  if (typeof window.va === "function") {
    window.va("event", { name, ...props });
  }

  // PostHog
  if (window.posthog?.capture) {
    window.posthog.capture(name, props);
  }

  // Plausible (only string/number/boolean props)
  if (typeof window.plausible === "function") {
    const safeProps = Object.fromEntries(
      Object.entries(props).filter(([, v]) =>
        typeof v === "string" || typeof v === "number" || typeof v === "boolean",
      ),
    ) as Record<string, string | number | boolean>;
    window.plausible(name, { props: safeProps });
  }

  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", name, props);
  }

  // Datadog RUM
  if (window.DD_RUM?.addAction) {
    window.DD_RUM.addAction(name, props as Record<string, unknown>);
  }

  // Dev logging (non-intrusive, gated behind NODE_ENV)
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${name}`, props);
  }
}

// ─── Typed helpers ────────────────────────────────────────────

export const analytics = {
  // Quiz
  quizStepView:     (step: number) =>
    dispatch({ name: "quiz_step_view", step }),

  quizStepComplete: (step: number, timeMs: number, value: string) =>
    dispatch({ name: "quiz_step_complete", step, time_ms: timeMs, value }),

  quizStepBack:     (fromStep: number) =>
    dispatch({ name: "quiz_step_back", from_step: fromStep }),

  quizAbandoned:    (step: number, totalTimeMs: number) =>
    dispatch({ name: "quiz_abandoned", step, total_time_ms: totalTimeMs }),

  quizComplete:     (totalTimeMs: number, tipoViaje: string, clima: string, distancia: string) =>
    dispatch({ name: "quiz_complete", total_time_ms: totalTimeMs, tipo_viaje: tipoViaje, clima, distancia }),

  quizReset:        () =>
    dispatch({ name: "quiz_reset" }),

  // Recommendations
  recommendationView:  (count: number, topScore: number) =>
    dispatch({ name: "recommendation_view", count, top_score: topScore }),

  recommendationClick: (puebloId: string, puebloNombre: string, rank: number, score: number) =>
    dispatch({ name: "recommendation_click", pueblo_id: puebloId, pueblo_nombre: puebloNombre, rank, score }),

  // Comparison
  comparisonAdd:    (puebloId: string, puebloNombre: string, total: number) =>
    dispatch({ name: "comparison_add", pueblo_id: puebloId, pueblo_nombre: puebloNombre, total_in_bar: total }),

  comparisonRemove: (puebloId: string) =>
    dispatch({ name: "comparison_remove", pueblo_id: puebloId }),

  comparisonClear:  () =>
    dispatch({ name: "comparison_clear" }),

  comparisonView:   (puebloIds: string[], count: number) =>
    dispatch({ name: "comparison_view", pueblo_ids: puebloIds.join(","), count }),

  // Filters
  filterApply:      (filterKey: string, filterValue: string) =>
    dispatch({ name: "filter_apply", filter_key: filterKey, filter_value: filterValue }),

  filterReset:      () =>
    dispatch({ name: "filter_reset" }),

  // Map
  mapMarkerClick:   (puebloId: string, puebloNombre: string) =>
    dispatch({ name: "map_marker_click", pueblo_id: puebloId, pueblo_nombre: puebloNombre }),

  // Content
  puebloPageView:   (puebloId: string, slug: string, region: string) =>
    dispatch({ name: "pueblo_page_view", pueblo_id: puebloId, slug, region }),

  galleryOpen:      (puebloId: string, imageIndex: number) =>
    dispatch({ name: "gallery_open", pueblo_id: puebloId, image_index: imageIndex }),

  ctaClick:         (label: string, destination: string) =>
    dispatch({ name: "cta_click", label, destination }),
} as const;
