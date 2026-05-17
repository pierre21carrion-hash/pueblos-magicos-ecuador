"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PageRevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Drop-in wrapper that animates its children in on mount.
 * Works in both Server and Client component trees —
 * import in any page to get a cinematic entrance.
 */
export default function PageReveal({ children, className }: PageRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
