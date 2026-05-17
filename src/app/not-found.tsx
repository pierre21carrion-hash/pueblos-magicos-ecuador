import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-carbon text-white px-6">
      <p className="text-7xl font-display font-light text-colonial/30 mb-2" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-display font-medium mb-3 text-center">
        Destino no encontrado
      </h1>
      <p className="text-white/50 text-sm mb-8 text-center max-w-xs">
        Esta ruta no existe en el mapa de los Pueblos Mágicos.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-colonial text-white text-sm font-medium rounded-sm
                   hover:bg-colonial-dark transition-colors duration-200 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-oro"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
