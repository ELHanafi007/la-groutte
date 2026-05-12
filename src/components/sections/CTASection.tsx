"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { viewportOnce } from "@/lib/animations";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/hero-bg.png" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>

          {/* Crimson Glow */}
          <div
            className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, oklch(0.55 0.22 18 / 30%) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, oklch(0.75 0.14 75 / 25%) 0%, transparent 70%)" }}
          />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.06]" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 lg:px-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center rounded-full border border-gold/20 bg-gold/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold"
              >
                Ne ratez pas la prochaine
              </motion.span>

              <h2 className="mt-6 font-heading">
                Prêt à transformer{" "}
                <span className="text-gradient">vos soirées</span> ?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
                Rejoignez La Grotte du Pêcheur. Réservez votre place en quelques
                secondes et vivez une expérience sans friction.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/reserve"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-xl bg-crimson px-9 text-base font-semibold text-white shadow-premium transition-all duration-300 hover:bg-crimson-light hover:shadow-[0_0_40px_oklch(0.55_0.22_18/25%)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  Réserver maintenant
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-9 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.08]"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
