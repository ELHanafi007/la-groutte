"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Users, Bell, Fingerprint } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { viewportOnce } from "@/lib/animations";

const features = [
  {
    icon: Zap,
    title: "Scan en 0.5 seconde",
    description: "Le portier scanne, la réponse est instantanée. Pas de recherche, pas de doute.",
    image: "/feature-qr.png",
    size: "large",
  },
  {
    icon: ShieldCheck,
    title: "Anti-fraude intégré",
    description: "Chaque QR est cryptographique, à usage unique. Impossible à dupliquer.",
    image: "/event-dj.png",
    size: "normal",
  },
  {
    icon: BarChart3,
    title: "Capacité en temps réel",
    description: "Visualisez combien de personnes sont à l'intérieur à chaque instant.",
    size: "normal",
  },
  {
    icon: Users,
    title: "Liste d'attente auto",
    description: "Quand c'est complet, les clients sont notifiés automatiquement.",
    size: "normal",
  },
  {
    icon: Bell,
    title: "Notifications intelligentes",
    description: "Confirmation, rappel 2h avant, et message post-soirée. Tout automatisé.",
    size: "normal",
  },
  {
    icon: Fingerprint,
    title: "Détection VIP",
    description: "Les clients réguliers sont identifiés. Le portier voit leur statut VIP.",
    image: "/event-ladies.png",
    size: "large",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-crimson/[0.015] to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Fonctionnalités"
          title="Pas juste un système de réservation"
          subtitle="Un outil complet de gestion d'entrée conçu pour le terrain."
        />

        {/* Bento Grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={feature.size === "large" ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-card transition-all duration-500 hover:border-crimson/15 hover:bg-surface">
                {/* Background Image */}
                {feature.image && (
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <img
                      src={feature.image}
                      alt=""
                      className="h-full w-full object-cover opacity-[0.07] transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-card/30" />
                  </div>
                )}

                <div className="relative p-6 lg:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/[0.08] ring-1 ring-crimson/15 transition-all duration-300 group-hover:bg-crimson/15 group-hover:ring-crimson/30 group-hover:shadow-[0_0_24px_oklch(0.55_0.22_18/12%)]">
                    <feature.icon className="h-5 w-5 text-crimson" />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
