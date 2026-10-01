"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-px bg-blush origin-left"
      style={{ scaleX: progress, width: "100%" }}
    />
  );
}
