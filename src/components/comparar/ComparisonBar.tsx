"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useComparison } from "@/src/hooks/useComparison";

const SLOTS = [0, 1, 2];

export default function ComparisonBar() {
  const pathname = usePathname();
  const { count, selectedCards, remove, clear, compareUrl, canCompare } =
    useComparison();

  // Hidden on the comparison page itself
  if (pathname === "/comparar") return null;

  const visible = count > 0;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ease-out will-change-transform ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Comparador de destinos"
      aria-hidden={!visible}
    >
      <div className="px-4 sm:px-6 pb-safe pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-[#0F1115]/96 backdrop-blur-xl shadow-2xl shadow-black/80 px-4 py-3">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">

              {/* Label — desktop only */}
              <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium shrink-0">
                Comparar
              </p>

              {/* Slots */}
              <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap">
                {SLOTS.map((i) => {
                  const card = selectedCards[i];
                  if (card) {
                    return (
                      <div
                        key={card.id}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg
                          bg-white/5 border border-white/8 shrink-0
                          animate-in fade-in slide-in-from-bottom-2 duration-200"
                      >
                        <div
                          className="relative w-5 h-5 rounded overflow-hidden shrink-0"
                          style={{ backgroundColor: card.colorAcento + "25" }}
                        >
                          <Image
                            src={card.multimedia.heroImage}
                            alt=""
                            fill
                            sizes="20px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-[11px] text-white/60 whitespace-nowrap max-w-[96px] truncate">
                          {card.nombreCorto}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(card.id)}
                          aria-label={`Quitar ${card.nombre}`}
                          className="text-white/20 hover:text-white/60 transition-colors text-sm leading-none shrink-0 ml-0.5"
                        >
                          ×
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`empty-${i}`}
                      className="h-7 w-20 rounded-lg border border-dashed border-white/8
                        flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <span className="text-white/12 text-[10px]">+ añadir</span>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-white/25 hover:text-white/55 transition-colors"
                >
                  Borrar
                </button>

                {canCompare ? (
                  <Link
                    href={compareUrl}
                    className="px-4 py-1.5 rounded-lg text-[11px] font-medium
                      bg-oro text-carbon hover:bg-oro/90 transition-colors"
                  >
                    Comparar {count} →
                  </Link>
                ) : (
                  <span className="px-4 py-1.5 rounded-lg text-[11px]
                    bg-white/4 text-white/20 select-none">
                    {count === 0 ? "Selecciona 2+" : "Selecciona 1 más"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
