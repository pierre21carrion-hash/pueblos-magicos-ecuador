"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

// ─── Parallax ─────────────────────────────────────────────────

/**
 * Returns a smoothed `y` MotionValue tied to the element's scroll position.
 * speed < 1 = slower than scroll (background layers)
 * speed > 1 = faster than scroll (foreground parallax)
 */
export function useScrollParallax(speed: number = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const y = useSpring(raw, { stiffness: 80, damping: 24, restDelta: 0.001 });
  return { ref, y };
}

// ─── Opacity fade-out on scroll ───────────────────────────────

/** Fades element from 1→0 as page scrolls from `startPx` to `endPx`. */
export function useScrollOpacity(startPx = 0, endPx = 400): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [startPx, endPx], [1, 0]);
}

// ─── Velocity-based scale warp ────────────────────────────────

/** Slight scale bulge proportional to scroll velocity — tactile momentum feel. */
export function useVelocityScale(
  minScale = 0.98,
  maxScale = 1.02,
  damping = 35,
): MotionValue<number> {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const raw = useTransform(velocity, [-3000, 0, 3000], [minScale, 1, maxScale]);
  return useSpring(raw, { stiffness: 400, damping });
}

// ─── Section entrance progress ────────────────────────────────

/** Returns scroll progress (0→1) as element enters the viewport from below. */
export function useSectionReveal(margin = "-80px 0px -80px 0px") {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  void margin; // kept in signature for future rootMargin support
  return { ref, opacity, y, scale, progress: scrollYProgress };
}

// ─── Scroll direction ─────────────────────────────────────────

type ScrollDirection = "up" | "down" | "idle";

/** Calls `onChange` whenever scroll direction changes. */
export function useScrollDirection(
  onChange: (dir: ScrollDirection) => void,
): void {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const prev = useRef<ScrollDirection>("idle");

  useMotionValueEvent(velocity, "change", (v) => {
    const dir: ScrollDirection = v > 10 ? "down" : v < -10 ? "up" : "idle";
    if (dir !== prev.current && dir !== "idle") {
      prev.current = dir;
      onChange(dir);
    }
  });
}
