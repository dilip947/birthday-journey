"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 120, damping: 25 });
  const sy = useSpring(y, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-40 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/10 blur-3xl md:block"
      style={{ left: sx, top: sy }}
    />
  );
}
