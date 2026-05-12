"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Users, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { viewportOnce } from "@/lib/animations";

const values = [
  {
    icon: Sparkles,
    title: "Expérience premium",
    description: "Chaque détail est pensé pour offrir une soirée inoubliable dans un cadre unique.",
  },
  {
    icon: Shield,
    title: "Sécurité maximale",
    description: "Système de QR code cryptographique pour une entrée sécurisée et rapide.",
  },
  {
    icon: Zap,
    title: "Technologie de pointe",
    description: "Scanner en 0.5 seconde, capacité en temps réel, anti-fraude intégré.",
  },
  {
    icon: Users,
    title: "Communauté fidèle",
    description: "Plus de 15K followers et une communauté passionnée qui revient chaque semaine.",
  },
];

export default function AboutPage() {
  return (
    <section className="section-padding min-h-screen pt-28">
      <Container>
        <SectionHeading
          badge="À propos"
          title="La Grotte du Pêcheur"
          subtitle="Un lieu unique où gastronomie, ambiance et technologie se rencontrent pour créer des soirées exceptionnelles."
        />

        {/* Interior Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl"
        >
          <img 
            src="/about-grotto.png" 
            alt="La Grotte Interior" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.005_250/60%)] to-transparent" />
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-4 max-w-3xl rounded-2xl border border-white/[0.06] bg-card p-8 md:p-12"
        >
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            Notre <span className="text-gradient">histoire</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              La Grotte du Pêcheur est née d&apos;une vision simple : créer un espace où chaque soirée
              est une expérience unique. Restaurant le jour, pub en soirée, et lieu de vie nocturne
              incontournable jusqu&apos;à 4h du matin.
            </p>
            <p>
              Avec plus de 15 000 followers sur Instagram, notre communauté grandit chaque jour.
              Pour répondre à cette demande croissante, nous avons développé un système de
              réservation intelligent qui élimine les files d&apos;attente et garantit une entrée
              fluide grâce à la technologie QR.
            </p>
            <p>
              Notre philosophie est claire : pas de compromis sur la qualité de l&apos;expérience.
              Chaque client mérite d&apos;être accueilli comme un VIP, et notre technologie rend
              cela possible à grande échelle.
            </p>
          </div>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-8">
            {[
              { icon: Clock, label: "Ouvert jusqu'à", value: "4h" },
              { icon: Users, label: "Communauté", value: "15K+" },
              { icon: MapPin, label: "Capacité", value: "200" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto h-4 w-4 text-crimson/50" />
                <p className="mt-2 font-heading text-xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-white/[0.06] bg-card p-6 transition-all duration-300 hover:border-crimson/15"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/[0.08] ring-1 ring-crimson/15">
                <value.icon className="h-5 w-5 text-crimson" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
