"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Scan, Clock, Shield, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#121414]">
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 -z-20">
        <img src="/hero-bg.png" alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-[#121414]/90 to-[#121414]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-[#121414]/80" />
      </div>

      <Container className="relative z-10 w-full py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full relative">
        
        {/* ── Left Column: Text Content ── */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl z-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-crimson/20 bg-crimson/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-crimson-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
            </span>
            Réservations ouvertes
          </div>

          {/* Headline */}
          <h1 className="mt-8 font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-[#e3e2e2]">
            Réservez.{" "}
            <br className="hidden sm:block" />
            Scannez.{" "}
            <span className="text-gradient">Entrez.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground/80">
            Fini les files d&apos;attente. Réservez votre soirée en 30 secondes, recevez votre QR code unique, et entrez directement dans La Grotte.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/reserve"
              className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-crimson px-8 text-sm font-semibold text-white shadow-premium transition-all duration-300 hover:bg-crimson-light hover:shadow-[0_0_40px_oklch(0.55_0.22_18/25%)] hover:-translate-y-0.5"
            >
              Réserver maintenant
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* ── Right Column: QR Phone Visual ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-sm hidden lg:block z-10"
        >
          {/* Glow behind phone */}
          <div className="absolute -inset-8 rounded-[40px] opacity-40" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 18 / 20%) 0%, transparent 70%)" }} />

          {/* Phone Frame */}
          <div className="glass-elevated relative overflow-hidden rounded-3xl p-1.5">
            <div className="overflow-hidden rounded-2xl bg-[#121414]">
              {/* Phone image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src="/feature-qr.png" alt="QR Entry System" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-transparent" />
              </div>
              {/* Scanner Overlay UI */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30">
                    <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-400">ACCÈS CONFIRMÉ</p>
                    <p className="text-[11px] text-[#e3e2e2]/70">Ahmed K. · VIP · 4 pers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
    </section>
  );
}
