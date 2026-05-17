"use client";

import { useEffect, useRef, useState } from "react";
import type { PuebloMapMarker } from "@/src/types";

// Leaflet CSS is imported here — only runs on client (ssr:false)
import "leaflet/dist/leaflet.css";

// Fix Leaflet's broken default icon path under webpack/Next.js
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

const ECUADOR_CENTER: [number, number] = [-1.8, -78.2];
const DEFAULT_ZOOM = 7;

const DARK_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const DARK_TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function buildCircleIcon(color: string, active: boolean) {
  const size = active ? 14 : 10;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}">
      <circle cx="${size}" cy="${size}" r="${size - 2}" fill="${color}" fill-opacity="${active ? 0.9 : 0.7}" stroke="white" stroke-width="1.5"/>
    </svg>
  `.trim();

  return L.divIcon({
    html: svg,
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size],
    popupAnchor: [0, -(size + 4)],
    className: "",
  });
}

interface MapaInteractivoProps {
  markers: PuebloMapMarker[];
  altura?: string;
}

export default function MapaInteractivo({
  markers,
  altura = "calc(100svh - 7rem)",
}: MapaInteractivoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: ECUADOR_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: true,
    });

    L.tileLayer(DARK_TILE_URL, {
      attribution: DARK_TILE_ATTR,
      maxZoom: 18,
      subdomains: "abcd",
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const markerRefs: Record<string, L.Marker> = {};

    markers.forEach((m) => {
      const icon = buildCircleIcon(m.colorAcento, false);
      const marker = L.marker([m.coordenadas.lat, m.coordenadas.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:inherit;min-width:160px">
            <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:${m.colorAcento};margin:0 0 4px">${m.region}</p>
            <p style="font-size:14px;font-weight:600;margin:0 0 4px;color:#F5F7F9">${m.nombre}</p>
            <p style="font-size:11px;font-style:italic;color:rgba(245,247,249,0.5);margin:0 0 8px;line-height:1.4">${m.tagline}</p>
            <div style="display:flex;gap:12px;font-size:10px;color:rgba(245,247,249,0.35);margin-bottom:8px">
              <span>↑ ${m.altitud.toLocaleString("es")} m</span>
              <span>⊙ ${m.distanciaKm} km</span>
            </div>
            <a href="/pueblos/${m.slug}" style="display:inline-block;font-size:11px;font-weight:500;color:${m.colorAcento};text-decoration:none">
              Ver destino →
            </a>
          </div>`
        )
        .on("click", () => setActiveId(m.id));

      markerRefs[m.id] = marker;
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [markers]);

  // Update icon when activeId changes
  // Re-render icons via DOM iteration (Leaflet doesn't expose markers by id natively)
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const latlng = layer.getLatLng();
        const matched = markers.find(
          (m) =>
            Math.abs(m.coordenadas.lat - latlng.lat) < 0.0001 &&
            Math.abs(m.coordenadas.lng - latlng.lng) < 0.0001
        );
        if (matched) {
          layer.setIcon(buildCircleIcon(matched.colorAcento, matched.id === activeId));
        }
      }
    });
  }, [activeId, markers]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg border border-white/8 overflow-hidden"
      style={{ height: altura }}
      role="application"
      aria-label={`Mapa interactivo con ${markers.length} pueblos mágicos del Ecuador`}
    />
  );
}
