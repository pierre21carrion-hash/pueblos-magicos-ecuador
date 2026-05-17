"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MatchScoreRingProps {
  pct: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  animate?: boolean;
}

const SCORE_COLOR = (pct: number) => {
  if (pct >= 80) return { stroke: "#3F7D44", text: "#3F7D44", label: "Excelente" };
  if (pct >= 65) return { stroke: "#C9A84C", text: "#C9A84C", label: "Muy bueno" };
  if (pct >= 50) return { stroke: "#C76139", text: "#C76139", label: "Bueno" };
  return { stroke: "rgba(255,255,255,0.3)", text: "rgba(255,255,255,0.4)", label: "Alternativa" };
};

export default function MatchScoreRing({
  pct,
  size = 80,
  strokeWidth = 5,
  showLabel = false,
  animate: shouldAnimate = true,
}: MatchScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animate ring fill from 0 → pct via CSS transition triggered after mount
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (!shouldAnimate) { setFilled(pct); return; }
    const timer = setTimeout(() => setFilled(pct), 80);
    return () => clearTimeout(timer);
  }, [pct, shouldAnimate]);

  const offset = circumference * (1 - filled / 100);
  const { stroke, text, label } = SCORE_COLOR(pct);

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Glow behind ring */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-25"
          style={{ backgroundColor: stroke }}
        />

        <svg
          width={size}
          height={size}
          className="-rotate-90 relative z-10"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: shouldAnimate
                ? "stroke-dashoffset 1.3s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          />
        </svg>

        {/* Centered label */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <span
            className="font-bold leading-none tabular-nums"
            style={{
              fontSize: size * 0.22,
              color: text,
            }}
          >
            {pct}%
          </span>
        </motion.div>
      </motion.div>

      {showLabel && (
        <motion.span
          className="text-[10px] uppercase tracking-widest font-medium"
          style={{ color: text }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
