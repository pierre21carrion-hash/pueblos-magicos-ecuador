import Link from "next/link";
import { getEstadisticasGlobales } from "@/src/data/pueblos-magicos";

export default function Navbar() {
  const { total } = getEstadisticasGlobales();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-carbon/80 backdrop-blur-md">
      <a href="#main-content" className="skip-nav">
        Ir al contenido principal
      </a>
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2 group"
          aria-label="Pueblos Mágicos del Ecuador — Inicio"
        >
          <span className="font-display text-lg font-medium text-white group-hover:text-oro transition-colors">
            Pueblos Mágicos
          </span>
          <span className="text-white/30 text-xs">Ecuador</span>
        </Link>

        <ul className="hidden sm:flex items-center gap-6 text-sm" role="list">
          <li>
            <Link
              href="/pueblos"
              className="text-white/60 hover:text-white transition-colors"
            >
              Explorador
            </Link>
          </li>
          <li>
            <Link
              href="/descubrir"
              className="text-white/60 hover:text-white transition-colors"
            >
              Descubrir
            </Link>
          </li>
          <li>
            <Link
              href="/mapa"
              className="text-white/60 hover:text-white transition-colors"
            >
              Mapa
            </Link>
          </li>
          <li aria-label={`${total} pueblos certificados`}>
            <span className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/40">
              {total} destinos
            </span>
          </li>
        </ul>

        {/* Mobile — solo explorador */}
        <Link
          href="/pueblos"
          className="sm:hidden text-white/60 hover:text-white transition-colors text-sm"
          aria-label="Explorar pueblos"
        >
          Explorar
        </Link>
      </nav>
    </header>
  );
}
