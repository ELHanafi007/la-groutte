"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { viewportOnce } from "@/lib/animations";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 1800;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: "K+", label: "Followers Instagram" },
  { value: 500, suffix: "ms", label: "Temps de scan" },
  { value: 4, suffix: "h", label: "Ouvert jusqu'à" },
  { value: 100, suffix: "%", label: "Sécurisé" },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.04]">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-crimson/[0.02] via-transparent to-gold/[0.02]" />

      <Container className="relative py-16 md:py-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card/50 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:bg-card"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at center, oklch(0.55 0.22 18 / 5%) 0%, transparent 70%)" }} />

              <p className="font-heading text-3xl font-extrabold text-gradient md:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
