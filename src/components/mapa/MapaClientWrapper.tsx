"use client";

import dynamic from "next/dynamic";
import type { PuebloMapMarker } from "@/src/types";
import MapaLoading from "./MapaLoading";

// ssr:false inside a Client Component — correct in Next.js 15
const MapaInteractivo = dynamic(() => import("./MapaInteractivo"), {
  ssr: false,
  loading: () => <MapaLoading />,
});

interface MapaClientWrapperProps {
  markers: PuebloMapMarker[];
  /** CSS height string — defaults to MapaInteractivo's own default */
  altura?: string;
}

export default function MapaClientWrapper({ markers, altura }: MapaClientWrapperProps) {
  return <MapaInteractivo markers={markers} altura={altura} />;
}
