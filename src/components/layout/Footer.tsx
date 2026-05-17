import Link from "next/link";
import { getPueblosCards } from "@/src/data/pueblos-magicos";

export default function Footer() {
  const pueblos = getPueblosCards().slice(0, 4);

  return (
    <footer className="border-t border-white/5 bg-carbon" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-lg font-medium text-white mb-2">
            Pueblos Mágicos del Ecuador
          </p>
          <p className="text-white/40 text-xs leading-relaxed">
            Programa "4 Mundos" · Ministerio de Turismo del Ecuador · desde 2019
          </p>
        </div>

        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Destinos</p>
          <ul className="space-y-1.5" role="list">
            {pueblos.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/pueblos/${p.seo.slug}`}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {p.nombreCorto}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/pueblos"
                className="text-oro/70 hover:text-oro text-sm transition-colors"
              >
                Ver todos →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Navegación</p>
          <ul className="space-y-1.5" role="list">
            {[
              { href: "/pueblos", label: "Explorador" },
              { href: "/mapa", label: "Mapa Interactivo" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} Ministerio de Turismo del Ecuador
        </p>
        <p className="text-white/15 text-xs">
          Programa 4 Mundos
        </p>
      </div>
    </footer>
  );
}
