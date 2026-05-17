import Image from "next/image";
import Link from "next/link";
import type { PuebloMagico } from "@/src/types";
import BadgeRegion from "@/src/components/ui/BadgeRegion";

interface ComparisonCardProps {
  pueblo: PuebloMagico;
  onRemove?: () => void;
}

export default function ComparisonCard({ pueblo, onRemove }: ComparisonCardProps) {
  const { nombre, nombreCorto, provincia, region, colorAcento, seo, multimedia } = pueblo;

  return (
    <div className="flex flex-col min-w-0">
      {/* Thumbnail */}
      <div
        className="relative aspect-[3/2] rounded-lg overflow-hidden mb-3"
        style={{ backgroundColor: multimedia.heroColorDominante ?? colorAcento + "25" }}
      >
        <Image
          src={multimedia.heroImage}
          alt={nombre}
          fill
          sizes="(max-width: 768px) 45vw, 22vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        />

        {/* Remove */}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Quitar ${nombre} de la comparación`}
            className="absolute top-2 right-2 w-5 h-5 rounded-full
              bg-black/60 backdrop-blur-sm
              text-white/40 hover:text-white hover:bg-black/80
              transition-all flex items-center justify-center text-xs"
          >
            ×
          </button>
        )}

        <div className="absolute bottom-2 left-2">
          <BadgeRegion region={region} size="sm" />
        </div>
      </div>

      {/* Info */}
      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5 truncate">
        {provincia}
      </p>
      <Link
        href={`/pueblos/${seo.slug}`}
        className="font-display text-sm sm:text-base font-light text-white
          hover:text-white/75 transition-colors leading-tight truncate"
      >
        {nombreCorto}
      </Link>

      <div
        className="mt-2 w-6 h-0.5 rounded-full shrink-0"
        style={{ backgroundColor: colorAcento }}
        aria-hidden="true"
      />
    </div>
  );
}
