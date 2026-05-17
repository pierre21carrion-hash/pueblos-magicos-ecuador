// ============================================================
// DESIGN SYSTEM — PUEBLOS MÁGICOS DEL ECUADOR
// Paleta inspirada en los Andes ecuatorianos
// ============================================================

import type { PaletaColor } from "../types";

// ─── PALETA OFICIAL ──────────────────────────────────────────

export const paleta: PaletaColor = {
  verde: "#3F7D44",       // Verde páramo andino
  terracota: "#C76139",   // Terracota colonial
  azul: "#3D8BCD",        // Azul cielo andino
  oro: "#E8B040",         // Oro Zaruma — mineral andino
  blanco: "#F5F7F9",      // Blanco nevado
  carbon: "#0F1115",      // Carbón cinematográfico
  mist: "#B8C4A8",        // Neblina andina
  bark: "#1A1C17",        // Corteza oscura
};

// ─── TOKENS CSS (para tailwind.config) ──────────────────────

export const coloresTailwind = {
  "paramo": "#3F7D44",
  "paramo-dark": "#2D5A32",
  "paramo-light": "#6BAF71",
  "colonial": "#C76139",
  "colonial-dark": "#8B3D22",
  "colonial-light": "#E08860",
  "andino": "#3D8BCD",
  "andino-dark": "#1E5C94",
  "andino-light": "#6AAEDE",
  "oro": "#E8B040",
  "oro-dark": "#B5861E",
  "oro-light": "#F0C870",
  "nevado": "#F5F7F9",
  "carbon": "#0F1115",
  "carbon-light": "#1A1C17",
  "mist": "#B8C4A8",
  "bark": "#2A2E24",
  "stone": "#8C9480",
  "parchment": "#E8E0CC",
};

// ─── COLORES POR REGIÓN ──────────────────────────────────────

export const coloresPorRegion: Record<string, string> = {
  Sierra: "#3F7D44",      // Verde páramo
  Costa: "#E8B040",       // Oro Zaruma
  Amazonía: "#3D8BCD",    // Azul cielo
  Galápagos: "#2D8BA0",   // Azul profundo oceánico
};

// ─── COLORES POR DIFICULTAD ──────────────────────────────────

export const coloresPorDificultad: Record<string, string> = {
  Fácil: "#3F7D44",
  Moderado: "#E8B040",
  Difícil: "#C76139",
  "Muy difícil": "#8B1A1A",
};

// ─── TIPOGRAFÍA ──────────────────────────────────────────────

export const tipografia = {
  display: "'Cormorant Garamond', Georgia, serif",
  serif: "'Libre Baskerville', Georgia, serif",
  mono: "'Space Mono', 'Courier New', monospace",
  sans: "'Plus Jakarta Sans', system-ui, sans-serif",
};

// ─── BREAKPOINTS ─────────────────────────────────────────────

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// ─── ANIMACIONES (Framer Motion variants) ───────────────────

export const animaciones = {
  fadeInUp: {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  staggerContainer: {
    animate: {
      transition: { staggerChildren: 0.08 },
    },
  },
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -4, transition: { duration: 0.3 } },
  },
  markerPulse: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  },
};

// ─── TAILWIND EXTEND CONFIG ──────────────────────────────────
// Copiar dentro de tailwind.config.ts → theme.extend

export const tailwindExtend = {
  colors: coloresTailwind,
  fontFamily: {
    display: ["Cormorant Garamond", "Georgia", "serif"],
    serif: ["Libre Baskerville", "Georgia", "serif"],
    mono: ["Space Mono", "Courier New", "monospace"],
    sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
  },
  backgroundImage: {
    "gradient-paramo":
      "linear-gradient(160deg, #0F1115 0%, #1A2418 40%, #0A1508 100%)",
    "gradient-andes":
      "linear-gradient(180deg, rgba(15,17,21,0) 0%, rgba(15,17,21,0.7) 60%, #0F1115 100%)",
    "gradient-mist":
      "linear-gradient(135deg, rgba(61,139,205,0.1) 0%, rgba(63,125,68,0.05) 100%)",
  },
  keyframes: {
    "particle-float": {
      "0%, 100%": { transform: "translateY(0px) translateX(0px)", opacity: "0.4" },
      "50%": { transform: "translateY(-20px) translateX(10px)", opacity: "0.8" },
    },
    "mist-drift": {
      "0%": { transform: "translateX(-10px)", opacity: "0.3" },
      "50%": { opacity: "0.6" },
      "100%": { transform: "translateX(10px)", opacity: "0.3" },
    },
    shimmer: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
  },
  animation: {
    "particle-float": "particle-float 6s ease-in-out infinite",
    "mist-drift": "mist-drift 8s ease-in-out infinite",
    shimmer: "shimmer 2s linear infinite",
  },
};
