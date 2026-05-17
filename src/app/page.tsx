import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getEstadisticasGlobales,
  getPueblosCards,
  pueblosMagicosDB,
} from "@/src/data/pueblos-magicos";
import { metadataGlobal } from "@/src/lib/seo";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import HeroImage from "@/src/components/ui/HeroImage";
import ExploradorClient from "@/src/components/pueblos/ExploradorClient";

export const metadata: Metadata = {
  ...metadataGlobal,
  alternates: { canonical: "https://pueblosmagicos.ecuador.travel" },
};

const WORLDS = [
  {
    region: "Sierra",
    slug: "cayambe",
    title: "La altura como memoria",
    text:
      "Volcanes, mercados, oficios de madera, lagunas sagradas y caminos que ascienden hacia el páramo.",
  },
  {
    region: "Costa",
    slug: "zaruma",
    title: "Oro, café y balcones",
    text:
      "La costa aparece como arquitectura viva: madera, minería histórica, humedad tropical y cocina de territorio.",
  },
  {
    region: "Amazonía",
    slug: "patate",
    title: "Bosque y agua por incorporar",
    text:
      "El programa también mira hacia territorios de selva, ríos y comunidades que esperan ser documentados aquí.",
  },
  {
    region: "Galápagos",
    slug: "cotacachi",
    title: "Islas en el horizonte editorial",
    text:
      "Un mundo oceánico que el proyecto deja señalado como parte de la geografía emocional del Ecuador.",
  },
] as const;

const STORY_POINTS = [
  "preservación cultural",
  "memoria histórica",
  "gastronomía patrimonial",
  "biodiversidad",
  "rutas vivas",
  "identidad local",
];

function ExplorerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-8 animate-pulse">
      <div className="hidden lg:block space-y-4">
        <div className="h-10 rounded-lg bg-white/5" />
        <div className="h-28 rounded-lg bg-white/5" />
        <div className="h-24 rounded-lg bg-white/5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[4/5] rounded-lg bg-white/5" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const stats = getEstadisticasGlobales();
  const pueblos = getPueblosCards();

  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <HeroImage
          slug="cayambe"
          priority
          overlay="premium"
          objectPosition="center 42%"
          className="min-h-[94svh]"
        >
          <section
            className="min-h-[94svh] flex flex-col justify-end px-4 sm:px-6 pb-12 pt-28"
            aria-labelledby="hero-heading"
          >
            <div className="max-w-7xl w-full mx-auto">
              <p className="text-oro text-xs uppercase tracking-[0.24em] mb-5 font-semibold">
                Ecuador · programa Pueblos Mágicos
              </p>
              <h1
                id="hero-heading"
                className="font-display max-w-5xl text-6xl sm:text-8xl lg:text-9xl font-light leading-[0.86] text-white"
              >
                Pueblos Mágicos del Ecuador
              </h1>
              <p className="mt-7 max-w-2xl text-lg sm:text-2xl font-serif leading-relaxed text-white/78">
                21 destinos donde la memoria, la montaña y la identidad ecuatoriana siguen vivas.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#explorador"
                  className="inline-flex items-center justify-center px-6 py-3 bg-oro text-carbon text-sm font-semibold rounded-sm hover:bg-oro-light transition-colors"
                >
                  Explorar destinos
                </Link>
                <Link
                  href="/mapa"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/25 text-white text-sm font-semibold rounded-sm hover:bg-white/10 transition-colors"
                >
                  Ver mapa interactivo
                </Link>
              </div>

              <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Documentados
                  </dt>
                  <dd className="mt-1 font-display text-3xl text-white">{stats.total}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Altitud media
                  </dt>
                  <dd className="mt-1 font-display text-3xl text-white">
                    {stats.altitudPromedio.toLocaleString("es")} m
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Desde Quito
                  </dt>
                  <dd className="mt-1 font-display text-3xl text-white">
                    {stats.distanciaPromedio} km
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </HeroImage>

        <section className="bg-[#F3EFE4] text-[#12140F]" aria-labelledby="meaning-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#8B5E2A] font-semibold mb-4">
                Qué son
              </p>
              <h2
                id="meaning-heading"
                className="font-display text-4xl sm:text-6xl font-light leading-tight"
              >
                Territorios donde la cultura no se exhibe: se habita.
              </h2>
            </div>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#34382D]">
              <p>
                Un Pueblo Mágico no es solo una parada turística. Es una comunidad que conserva
                formas de cocinar, narrar, comerciar, celebrar, tallar, sembrar y caminar el
                paisaje. En estos destinos, el viaje se vuelve una lectura lenta del territorio.
              </p>
              <p>
                La arquitectura, la biodiversidad y las fiestas no aparecen como decorado: son
                capas de identidad. Cada ruta desde Quito, cada mercado y cada oficio documentado
                en esta plataforma existe para contar cómo el Ecuador sostiene su memoria desde
                lugares pequeños, intensos y profundamente vivos.
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4" role="list">
                {STORY_POINTS.map((point) => (
                  <li
                    key={point}
                    className="border-t border-[#12140F]/15 pt-3 text-xs uppercase tracking-[0.16em] text-[#5B624F]"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28" aria-labelledby="worlds-heading">
          <div className="max-w-3xl mb-10">
            <p className="text-paramo text-xs uppercase tracking-[0.24em] mb-4 font-semibold">
              Ecuador en 4 mundos
            </p>
            <h2 id="worlds-heading" className="font-display text-4xl sm:text-6xl font-light text-white leading-tight">
              Cuatro geografías, una sola memoria en movimiento.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {WORLDS.map((world) => {
              const count = stats.porRegion[world.region] ?? 0;
              return (
                <article key={world.region} className="group relative min-h-[28rem] overflow-hidden rounded-lg border border-white/8 bg-carbon-light">
                  <HeroImage
                    slug={world.slug}
                    overlay="premium"
                    objectPosition="center 45%"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="absolute inset-0 h-full min-h-[28rem] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="relative z-10 flex min-h-[28rem] flex-col justify-end p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-oro mb-3">
                      {world.region} · {count} documentado{count === 1 ? "" : "s"}
                    </p>
                    <h3 className="font-display text-3xl font-light text-white leading-none">
                      {world.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/58">
                      {world.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="explorador"
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 scroll-mt-20"
          aria-labelledby="explorer-heading"
        >
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-oro text-xs uppercase tracking-[0.24em] mb-4 font-semibold">
                Explorador de destinos
              </p>
              <h2 id="explorer-heading" className="font-display text-4xl sm:text-6xl font-light text-white leading-tight">
                Busca por clima, altura, cultura, aventura o distancia.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/42">
              Filtros combinables, ordenamiento real y mapa integrado para recorrer los destinos
              documentados sin perder el pulso editorial del viaje.
            </p>
          </div>

          <Suspense fallback={<ExplorerSkeleton />}>
            <ExploradorClient pueblos={pueblos} db={pueblosMagicosDB} />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}
