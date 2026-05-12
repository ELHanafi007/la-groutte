"use client";

// ===================================================
// Lagroutte — SectionHeading Component
// Consistent section title pattern across all pages
// ===================================================

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={viewportOnce}
      transition={fadeUp.transition}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "mb-4 inline-block rounded-full px-4 py-1.5",
            "bg-brand-gold/10 text-sm font-medium tracking-wide text-brand-gold-dark",
            "border border-brand-gold/20"
          )}
        >
          {badge}
        </span>
      )}

      <h2 className="mt-2 font-heading">{title}</h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
