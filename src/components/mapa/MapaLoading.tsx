export default function MapaLoading() {
  return (
    <div
      className="w-full rounded-lg border border-white/8 overflow-hidden flex items-center justify-center bg-carbon-light"
      style={{ height: "calc(100svh - 7rem)" }}
      role="status"
      aria-label="Cargando mapa interactivo"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-6 h-6 border-2 border-white/10 border-t-andino rounded-full animate-spin" />
        <p className="text-white/30 text-xs tracking-widest uppercase">Cargando mapa</p>
      </div>
    </div>
  );
}
