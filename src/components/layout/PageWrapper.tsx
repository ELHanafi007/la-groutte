"use client";

// ===================================================
// Lagroutte — PageWrapper Component
// Fade-in animation wrapper for page content
// ===================================================

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.main
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.main>
  );
}
