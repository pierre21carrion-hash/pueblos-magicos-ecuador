import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { PuebloMagico } from "@/src/types";
import { getPuebloBySlug, getAllSlugs } from "@/src/data/pueblos-magicos";
import { generarMetadataPueblo, generarSchemaJsonLd, generarBreadcrumbSchema } from "@/src/lib/seo";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import PuebloHero from "@/src/components/pueblos/PuebloHero";
import PuebloInfoGrid from "@/src/components/pueblos/PuebloInfoGrid";
import PuebloGallery from "@/src/components/ui/PuebloGallery";

interface Params {
  params: Promise<{ slug: string }>;
}

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pueblo = getPuebloBySlug(slug);
  if (!pueblo) return { title: "Destino no encontrado" };
  return generarMetadataPueblo(pueblo);
}

function SectionShell({ id, eyebrow, title, children }: SectionShellProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20" aria-labelledby={id}>
      <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-14">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-oro/70 font-semibold mb-3">
            {eyebrow}
          </p>
          <h2 id={id} className="font-display text-3xl sm:text-5xl font-light text-white leading-tight">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function HistoricalContext({ pueblo }: { pueblo: PuebloMagico }) {
  if (!pueblo.narrativa.historia && !pueblo.narrativa.curiosidad) return null;

  return (
    <SectionShell id="historia-heading" eyebrow="Memoria" title="Historia, leyenda y permanencia.">
      <div className="space-y-6">
        {pueblo.narrativa.historia && (
          <p className="text-lg leading-relaxed text-white/68 font-serif">
            {pueblo.narrativa.historia}
          </p>
        )}
        {pueblo.narrativa.curiosidad && (
          <aside className="border-l border-oro/50 pl-5 py-1">
            <p className="text-xs uppercase tracking-[0.22em] text-oro/65 mb-2">Dato de territorio</p>
            <p className="text-sm leading-relaxed text-white/48">{pueblo.narrativa.curiosidad}</p>
          </aside>
        )}
      </div>
    </SectionShell>
  );
}

function AttractionsSection({ pueblo }: { pueblo: PuebloMagico }) {
  if (!pueblo.atractivos.length) return null;

  return (
    <SectionShell id="attractions-heading" eyebrow="Experiencias" title="Atractivos para recorrer sin prisa.">
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
        {pueblo.atractivos.map((atractivo, index) => (
          <li key={atractivo.nombre} className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-3xl text-white/22">{String(index + 1).padStart(2, "0")}</span>
              <span
                className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]"
                style={{ borderColor: `${pueblo.colorAcento}55`, color: pueblo.colorAcento }}
              >
                {atractivo.tipo}
              </span>
            </div>
            <h3 className="mt-5 text-base font-semibold text-white">{atractivo.nombre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">{atractivo.descripcion}</p>
            <dl className="mt-4 flex flex-wrap gap-4 text-[11px] text-white/30">
              {atractivo.duracionHoras && (
                <div>
                  <dt className="sr-only">Duración</dt>
                  <dd>{atractivo.duracionHoras} h sugeridas</dd>
                </div>
              )}
              {atractivo.costoUSD && (
                <div>
                  <dt className="sr-only">Costo</dt>
                  <dd>{atractivo.costoUSD}</dd>
                </div>
              )}
            </dl>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

function ClimateSection({ pueblo }: { pueblo: PuebloMagico }) {
  return (
    <SectionShell id="climate-heading" eyebrow="Clima" title="La atmósfera práctica del viaje.">
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Clima", value: pueblo.clima },
          { label: "Temperatura", value: pueblo.temperaturaRango },
          { label: "Mejor época", value: pueblo.mejorEpocaVisitar },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
            <dt className="text-[10px] uppercase tracking-[0.2em] text-white/28">{label}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-white/62">{value}</dd>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}

function GastronomySection({ pueblo }: { pueblo: PuebloMagico }) {
  if (!pueblo.gastronomia.length) return null;

  return (
    <SectionShell id="gastro-heading" eyebrow="Mesa" title="Gastronomía patrimonial y cocina cotidiana.">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
        {pueblo.gastronomia.map((item) => (
          <li key={item.nombre} className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-white">{item.nombre}</h3>
              {item.esPatrimonial && (
                <span className="shrink-0 text-[9px] uppercase tracking-widest text-oro/75 border border-oro/25 rounded-full px-2 py-0.5">
                  Patrimonial
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/45">{item.descripcion}</p>
            {item.dondeProbarla && (
              <p className="mt-4 text-xs italic leading-relaxed text-white/30">{item.dondeProbarla}</p>
            )}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function FestivitiesSection({ pueblo }: { pueblo: PuebloMagico }) {
  if (!pueblo.festividades.length) return null;

  return (
    <SectionShell id="festivities-heading" eyebrow="Calendario" title="Fiestas donde el territorio habla.">
      <ul className="space-y-4" role="list">
        {pueblo.festividades.map((fiesta) => (
          <li key={fiesta.nombre} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-white/8 pt-4">
            <p className="text-xs uppercase tracking-[0.16em] text-oro/65">{fiesta.mes}</p>
            <div>
              <h3 className="text-base font-semibold text-white">{fiesta.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{fiesta.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

function BiodiversitySection({ pueblo }: { pueblo: PuebloMagico }) {
  const { biodiversidad } = pueblo;

  if (
    !biodiversidad.habitatPrincipal &&
    !biodiversidad.areaProtegida &&
    !biodiversidad.especiesIconicas?.length
  ) {
    return null;
  }

  return (
    <SectionShell id="biodiversity-heading" eyebrow="Biodiversidad" title="Paisaje, hábitat y especies icónicas.">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {biodiversidad.habitatPrincipal && (
            <div className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/28">Hábitat</p>
              <p className="mt-3 text-sm leading-relaxed text-white/62">{biodiversidad.habitatPrincipal}</p>
            </div>
          )}
          {biodiversidad.areaProtegida && (
            <div className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/28">Área protegida</p>
              <p className="mt-3 text-sm leading-relaxed text-white/62">{biodiversidad.areaProtegida}</p>
            </div>
          )}
        </div>
        {biodiversidad.especiesIconicas && (
          <div className="flex flex-wrap gap-2">
            {biodiversidad.especiesIconicas.map((species) => (
              <span key={species} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/48">
                {species}
              </span>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}

function RouteSection({ pueblo }: { pueblo: PuebloMagico }) {
  return (
    <SectionShell id="route-heading" eyebrow="Ruta" title="Cómo llegar desde Quito.">
      <div className="rounded-lg border border-white/8 bg-white/[0.03] p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
          <div>
            <dt className="text-white/30 text-xs uppercase tracking-widest mb-1">Distancia</dt>
            <dd className="text-white">{pueblo.ruta.distanciaKm} km</dd>
          </div>
          <div>
            <dt className="text-white/30 text-xs uppercase tracking-widest mb-1">Tiempo estimado</dt>
            <dd className="text-white">{pueblo.ruta.tiempoEstimado}</dd>
          </div>
          <div>
            <dt className="text-white/30 text-xs uppercase tracking-widest mb-1">Vía principal</dt>
            <dd className="text-white">{pueblo.ruta.via}</dd>
          </div>
        </dl>

        <ol className="mt-6 space-y-3" role="list">
          {pueblo.ruta.indicaciones.map((indicacion, index) => (
            <li key={indicacion} className="flex gap-3 text-sm text-white/50">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{ backgroundColor: `${pueblo.colorAcento}24`, color: pueblo.colorAcento }}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span>{indicacion}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pueblo.ruta.transporte.map((option) => (
            <div key={`${option.tipo}-${option.descripcion}`} className="border-t border-white/8 pt-3">
              <p className="text-xs uppercase tracking-[0.16em] text-white/35">{option.tipo}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/52">{option.descripcion}</p>
              {(option.precio || option.frecuencia) && (
                <p className="mt-2 text-xs text-white/28">
                  {[option.precio, option.frecuencia].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function RecommendationsSection({ pueblo }: { pueblo: PuebloMagico }) {
  return (
    <SectionShell id="recommendations-heading" eyebrow="Recomendaciones" title="Antes de cerrar la mochila.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
          <h3 className="text-base font-semibold text-white">Hospedaje</h3>
          <ul className="mt-3 space-y-3" role="list">
            {pueblo.hospedaje.map((item) => (
              <li key={`${item.categoria}-${item.descripcion}`} className="text-sm leading-relaxed text-white/45">
                <span className="text-white/70">{item.categoria}:</span> {item.descripcion}
                {item.precioReferencia && <span className="text-white/28"> · {item.precioReferencia}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-5">
          <h3 className="text-base font-semibold text-white">Contexto cultural</h3>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/45">
            {pueblo.cultura.pueblosIndigenas && (
              <p><span className="text-white/70">Pueblos:</span> {pueblo.cultura.pueblosIndigenas.join(", ")}</p>
            )}
            {pueblo.cultura.artesaniaIconica && (
              <p><span className="text-white/70">Artesanía:</span> {pueblo.cultura.artesaniaIconica.join(", ")}</p>
            )}
            {pueblo.cultura.patrimonioDeclarado && (
              <p><span className="text-white/70">Patrimonio:</span> {pueblo.cultura.patrimonioDeclarado.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export default async function PuebloPage({ params }: Params) {
  const { slug } = await params;
  const pueblo = getPuebloBySlug(slug);
  if (!pueblo) notFound();

  const jsonLd = generarSchemaJsonLd(pueblo);
  const breadcrumbLd = generarBreadcrumbSchema(pueblo);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <PuebloHero pueblo={pueblo} />
        <PuebloInfoGrid pueblo={pueblo} />
        <HistoricalContext pueblo={pueblo} />
        <AttractionsSection pueblo={pueblo} />
        <ClimateSection pueblo={pueblo} />
        <PuebloGallery slug={slug} nombrePueblo={pueblo.nombre} />
        <GastronomySection pueblo={pueblo} />
        <FestivitiesSection pueblo={pueblo} />
        <BiodiversitySection pueblo={pueblo} />
        <RouteSection pueblo={pueblo} />
        <RecommendationsSection pueblo={pueblo} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <Link
            href="/pueblos"
            className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/65 transition-colors"
          >
            ← Volver al explorador
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
