// Global route loading — shown while a new page's JS chunk loads.

function Pulse({ className }: { className: string }) {
  return <div className={`rounded-lg bg-white/4 animate-pulse ${className}`} aria-hidden="true" />;
}

function CardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="rounded-xl border border-white/5 overflow-hidden bg-white/[0.015]"
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    >
      <div className="aspect-[16/10] bg-white/5 animate-pulse" />
      <div className="p-5 space-y-3">
        <Pulse className="h-2.5 w-16" />
        <Pulse className="h-5 w-44" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-3/4" />
        <div className="flex gap-3 pt-1">
          <Pulse className="h-2.5 w-16" />
          <Pulse className="h-2.5 w-14" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen" role="status" aria-label="Cargando página">
      {/* Navbar placeholder */}
      <div className="fixed top-0 inset-x-0 z-50 h-14 border-b border-white/5 bg-carbon/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header skeleton */}
        <div className="mb-10 space-y-3" aria-hidden="true">
          <Pulse className="h-2.5 w-36" />
          <Pulse className="h-9 w-64 sm:w-80" />
          <Pulse className="h-3.5 w-80 sm:w-[28rem]" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} delay={i * 55} />
          ))}
        </div>
      </div>

      {/* Bottom-right spinner */}
      <div
        className="fixed bottom-6 right-6 w-6 h-6 border-2
          border-white/8 border-t-oro/50 rounded-full animate-spin"
        aria-hidden="true"
      />
    </div>
  );
}
