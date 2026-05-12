"use client";

import { useEffect, useRef } from "react";
import { Smartphone, QrCode, ScanLine, PartyPopper } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Réservez en ligne",
    description: "Choisissez votre soirée et remplissez le formulaire en 30 secondes. Simple, rapide, sans friction.",
    image: "/about-grotto.png",
  },
  {
    icon: QrCode,
    step: "02",
    title: "Recevez votre QR",
    description: "Un QR code unique et cryptographique est généré instantanément. Valable uniquement pour votre soirée.",
    image: "/feature-qr.png",
  },
  {
    icon: ScanLine,
    step: "03",
    title: "Scannez à l'entrée",
    description: "Le portier scanne votre QR en 0.5s. Validation instantanée, zéro attente, zéro question.",
    image: "/event-dj.png",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Profitez de la soirée",
    description: "Vous êtes dedans. Votre table vous attend. La nuit est à vous.",
    image: "/event-ladies.png",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scale down and fade effect using ScrollTrigger (without pinning)
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Effect when the next card comes over
        if (index < cardsRef.current.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            scrollTrigger: {
              trigger: cardsRef.current[index + 1],
              start: "top center",
              end: "top top+=100",
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative bg-[#121414] pb-[30vh]">
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(oklch(0.55 0.22 18 / 80%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Comment ça marche"
          title="4 étapes. 30 secondes. Zéro stress."
          subtitle="Le système le plus rapide pour réserver et entrer. Fini les files d'attente."
        />

        <div className="mt-16 flex flex-col gap-8 md:gap-12 relative mx-auto max-w-4xl">
            <div
              key={step.step}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1a1c1c] shadow-2xl flex flex-col md:flex-row min-h-[350px] sticky top-32"
              style={{ zIndex: i + 1 }}
            >
              {/* Image side */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={step.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1c1c]/90 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1c] to-transparent md:hidden" />
                
                {/* Step number overlay */}
                <div className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 backdrop-blur-xl border border-white/10">
                  <span className="font-mono text-sm font-bold text-crimson-light">{step.step}</span>
                </div>
              </div>

              {/* Content side */}
              <div className="flex w-full md:w-1/2 flex-col justify-center p-8 md:p-12 z-10 bg-[#1a1c1c] md:bg-transparent">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson/[0.08] ring-1 ring-crimson/20 shadow-[0_0_30px_oklch(0.55_0.22_18/15%)]">
                  <step.icon className="h-6 w-6 text-crimson" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-[#e3e2e2] tracking-tight">{step.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
