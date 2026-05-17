// Framer Motion variant library — reusable across all components.
// All easing arrays are [x1, y1, x2, y2] cubic-bezier control points.

import type { Variants, Transition } from "framer-motion";

// ─── Easing presets ───────────────────────────────────────────

export const ease = {
  /** Fast deceleration — Apple/iOS feel */
  out:      [0.22, 1, 0.36, 1]      as [number, number, number, number],
  /** Springy overshoot — tactile */
  spring:   [0.34, 1.56, 0.64, 1]   as [number, number, number, number],
  /** Material-style — smooth both ways */
  smooth:   [0.4, 0, 0.2, 1]        as [number, number, number, number],
  /** Sharp acceleration */
  in:       [0.4, 0, 1, 1]          as [number, number, number, number],
  /** Linear */
  linear:   [0, 0, 1, 1]            as [number, number, number, number],
} as const;

// ─── Transition presets ───────────────────────────────────────

export const t = {
  fast:    { duration: 0.2,  ease: ease.out }    as Transition,
  base:    { duration: 0.35, ease: ease.out }    as Transition,
  slow:    { duration: 0.55, ease: ease.out }    as Transition,
  cinema:  { duration: 0.7,  ease: ease.out }    as Transition,
  spring:  { type: "spring" as const, stiffness: 280, damping: 22 },
  bounce:  { type: "spring" as const, stiffness: 340, damping: 16 },
} as const;

// ─── Fade variants ────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: t.base },
  exit:    { opacity: 0, transition: t.fast },
};

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: t.slow },
  exit:    { opacity: 0, y: -12, transition: t.fast },
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: t.slow },
  exit:    { opacity: 0, y: 12, transition: t.fast },
};

// ─── Slide variants ───────────────────────────────────────────

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: t.slow },
  exit:    { opacity: 0, x: -20, transition: t.fast },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: t.slow },
  exit:    { opacity: 0, x: 20, transition: t.fast },
};

// ─── Scale variants ───────────────────────────────────────────

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: t.spring },
  exit:    { opacity: 0, scale: 0.95, transition: t.fast },
};

export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: t.bounce },
  exit:    { opacity: 0, scale: 0.9, transition: t.fast },
};

// ─── Cinematic hero reveal ────────────────────────────────────

export const heroReveal: Variants = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: t.cinema },
  exit:    { opacity: 0, transition: t.fast },
};

export const heroRevealSlow: Variants = {
  hidden:  { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: ease.out },
  },
};

// ─── Step transition (quiz / wizard) ─────────────────────────

export const stepForward: Variants = {
  hidden:  { opacity: 0, x: 36, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: ease.out } },
  exit:    { opacity: 0, x: -36, filter: "blur(4px)", transition: { duration: 0.25, ease: ease.in } },
};

export const stepBackward: Variants = {
  hidden:  { opacity: 0, x: -36, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: ease.out } },
  exit:    { opacity: 0, x: 36, filter: "blur(4px)", transition: { duration: 0.25, ease: ease.in } },
};

// ─── Stagger containers ───────────────────────────────────────

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const staggerBase: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

/** Dynamic stagger — returns a container variant with custom delay */
export function stagger(children: number = 0.1, delay: number = 0.15): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren: children, delayChildren: delay } },
  };
}

// ─── Card interaction presets ─────────────────────────────────

export const cardHover = {
  rest:  { y: 0, scale: 1, transition: t.fast },
  hover: { y: -5, scale: 1.01, transition: { duration: 0.2 } },
  tap:   { scale: 0.98, transition: { duration: 0.1 } },
};

export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, transition: t.spring },
  tap:   { scale: 0.96 },
};

// ─── Viewport-triggered (whileInView presets) ─────────────────

export const inViewFadeUp = {
  initial:   { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: "-80px" },
  transition: t.slow,
};

export const inViewFadeIn = {
  initial:   { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:  { once: true, margin: "-60px" },
  transition: t.base,
};

// ─── Ambient float (for decorative blobs) ─────────────────────

export const floatA = {
  animate: { x: [0, 22, -8, 0], y: [0, -18, 12, 0] },
  transition: { duration: 20, repeat: Infinity, ease: ease.smooth },
};

export const floatB = {
  animate: { x: [0, -28, 10, 0], y: [0, 14, -22, 0] },
  transition: { duration: 26, repeat: Infinity, ease: ease.smooth },
};

export const floatC = {
  animate: { x: [0, 16, -20, 6, 0], y: [0, -24, 8, -14, 0] },
  transition: { duration: 34, repeat: Infinity, ease: ease.smooth, delay: 6 },
};
