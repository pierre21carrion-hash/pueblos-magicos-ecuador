import { Suspense } from "react";
import type { Metadata } from "next";
import { getPueblosCards, pueblosMagicosDB, getEstadisticasGlobales } from "@/src/data/pueblos-magicos";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import ExploradorClient from "@/src/components/pueblos/ExploradorClient";

export const metadata: Metadata = {
  title: "Explorador de Destinos",
  description:
    "Filtra y explora los Pueblos Mágicos del Ecuador por región, dificultad, clima, altitud y tipo de actividad.",
  alternates: { canonical: "https://pueblosmagicos.ecuador.travel/pueblos" },
};

// Skeleton shown while useSearchParams() initializes on the client
function ExploradorSkeleton() {
  return (
    <div className="flex gap-8 animate-pulse">
      {/* Sidebar skeleton */}
      <div className="hidden lg:block w-52 xl:w-60 shrink-0 space-y-4">
        <div className="h-8 rounded-lg bg-white/4" />
        <div className="h-24 rounded-lg bg-white/4" />
        <div className="h-20 rounded-lg bg-white/4" />
        <div className="h-16 rounded-lg bg-white/4" />
      </div>
      {/* Cards skeleton */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] rounded-lg bg-white/4" />
        ))}
      </div>
    </div>
  );
}

export default function ExploradorPage() {
  const pueblos = getPueblosCards();
  const stats = getEstadisticasGlobales();

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">

          {/* Header */}
          <header className="mb-10">
            <p className="text-paramo text-xs uppercase tracking-[0.2em] mb-3 font-medium">
              {stats.total} destinos certificados
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-white mb-3">
              Explorador
            </h1>
            <p className="text-white/40 text-sm max-w-xl">
              Encuentra tu próximo destino filtrando por región, clima, altitud, actividades y más.
              Los filtros se sincronizan con la URL para que puedas compartir tu búsqueda.
            </p>
          </header>

          {/*
            Suspense is required because ExploradorClient uses useSearchParams().
            The skeleton renders during SSR and the brief client-side hydration window,
            preventing hydration mismatch while keeping the page statically renderable.
          */}
          <Suspense fallback={<ExploradorSkeleton />}>
            <ExploradorClient pueblos={pueblos} db={pueblosMagicosDB} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
