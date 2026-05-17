import type { PuebloMagico } from "@/src/types";

interface PuebloInfoGridProps {
  pueblo: PuebloMagico;
}

interface StatItemProps {
  label: string;
  value: string;
  accent?: string;
}

function StatItem({ label, value, accent }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1 py-4 border-b border-white/5 last:border-0">
      <dt className="text-white/30 text-[10px] uppercase tracking-widest">{label}</dt>
      <dd
        className="font-display text-2xl font-light"
        style={{ color: accent ?? "white" }}
      >
        {value}
      </dd>
    </div>
  );
}

export default function PuebloInfoGrid({ pueblo }: PuebloInfoGridProps) {
  const { topografia, ruta, clima, temperaturaRango, temporadaIdeal, colorAcento, narrativa, atractivos, anioIngreso } = pueblo;
  const imprescindibles = atractivos.filter((a) => a.prioridad === "imprescindible");

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
      aria-labelledby="info-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Descripción */}
        <div className="lg:col-span-2 space-y-6">
          <h2 id="info-heading" className="sr-only">Información del destino</h2>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            {narrativa.descripcionCorta}
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            {narrativa.descripcionLarga}
          </p>

          {/* Atractivos imprescindibles */}
          {imprescindibles.length > 0 && (
            <div>
              <h3 className="font-display text-xl font-light text-white mb-4">
                Imprescindibles
              </h3>
              <ul className="space-y-3" role="list">
                {imprescindibles.map((a) => (
                  <li
                    key={a.nombre}
                    className="flex items-start gap-3 p-4 rounded-lg border border-white/5 bg-white/2"
                  >
                    <div
                      className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: colorAcento }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{a.nombre}</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                        {a.descripcion}
                      </p>
                      {a.costoUSD && (
                        <p className="text-white/30 text-xs mt-1">{a.costoUSD}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Stats sidebar */}
        <aside aria-label="Datos prácticos">
          <dl>
            <StatItem label="Altitud" value={`${topografia.altitudMsnm.toLocaleString("es")} msnm`} accent={colorAcento} />
            <StatItem label="Distancia desde Quito" value={`${ruta.distanciaKm} km · ${ruta.tiempoEstimado}`} />
            <StatItem label="Dificultad de acceso" value={ruta.nivelDificultad} />
            <StatItem label="Clima" value={clima} />
            <StatItem label="Temperatura" value={temperaturaRango} />
            <StatItem label="Mejor época" value={temporadaIdeal} />
            <StatItem label="Programa" value={`Pueblo Mágico desde ${anioIngreso}`} />
          </dl>
        </aside>
      </div>
    </section>
  );
}
