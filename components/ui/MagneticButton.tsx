"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function MagneticButton({ children }: { children: ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.div>
  );
}
