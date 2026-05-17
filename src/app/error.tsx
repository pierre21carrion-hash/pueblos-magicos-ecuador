"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[PueblosMagicos] Error de aplicación:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-carbon text-white px-6">
      <p className="text-5xl mb-4" aria-hidden="true">⚠</p>
      <h2 className="text-xl font-display font-medium mb-3 text-center">
        Algo salió mal
      </h2>
      <p className="text-white/50 text-sm mb-8 text-center max-w-xs">
        {error.message || "Error inesperado en la aplicación."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 border border-white/20 text-white text-sm font-medium rounded-sm
                   hover:bg-white/10 transition-colors duration-200"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
