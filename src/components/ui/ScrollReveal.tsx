"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Additional entrance delay in seconds */
  delay?: number;
  /** Override default y distance (px) */
  distance?: number;
  /** Use blur fade — adds depth on reveal */
  blur?: boolean;
  /** Viewport trigger margin — negative = trigger earlier */
  margin?: string;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 28,
  blur = false,
  margin = "-60px",
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: distance,
        ...(blur ? { filter: "blur(6px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: true, margin }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
