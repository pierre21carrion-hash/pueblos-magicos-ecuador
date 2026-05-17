"use client";

import { useComparison } from "@/src/hooks/useComparison";

interface SelectButtonProps {
  id: string;
  nombre: string;
}

export default function SelectButton({ id, nombre }: SelectButtonProps) {
  const { isSelected, toggle, canAdd } = useComparison();
  const selected = isSelected(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (selected || canAdd) toggle(id);
      }}
      aria-pressed={selected}
      aria-label={`${selected ? "Quitar" : "Añadir"} ${nombre} a la comparación`}
      disabled={!selected && !canAdd}
      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
        backdrop-blur-sm text-[11px] font-bold shadow-sm select-none
        ${
          selected
            ? "bg-oro text-carbon scale-110 shadow-oro/30"
            : canAdd
            ? "bg-black/50 text-white/55 border border-white/20 hover:bg-white/15 hover:text-white hover:scale-110"
            : "bg-black/30 text-white/15 border border-white/8 cursor-not-allowed"
        }`}
      title={!selected && !canAdd ? "Máximo 3 destinos" : undefined}
    >
      {selected ? "✓" : "+"}
    </button>
  );
}
