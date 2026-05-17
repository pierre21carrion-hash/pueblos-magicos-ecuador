import type { Region } from "@/src/types";

const REGION_COLORS: Record<string, string> = {
  Sierra:    "bg-paramo/15 text-paramo-light border-paramo/20",
  Costa:     "bg-oro/15 text-oro border-oro/20",
  Amazonía:  "bg-andino/15 text-andino-light border-andino/20",
  Galápagos: "bg-andino-dark/15 text-andino border-andino-dark/20",
};

const SIZE_CLASSES = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

interface BadgeRegionProps {
  region: Region | string;
  size?: "sm" | "md" | "lg";
}

export default function BadgeRegion({ region, size = "md" }: BadgeRegionProps) {
  const colorClass = REGION_COLORS[region] ?? "bg-white/10 text-white/60 border-white/10";
  return (
    <span
      className={`inline-flex items-center border rounded-full font-medium uppercase tracking-wide ${colorClass} ${SIZE_CLASSES[size]}`}
      aria-label={`Región ${region}`}
    >
      {region}
    </span>
  );
}
