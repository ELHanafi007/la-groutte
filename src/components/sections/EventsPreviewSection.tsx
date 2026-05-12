"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, Users, Music, Mic2, Crown, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const upcomingEvents = [
  {
    id: "1",
    title: "Old School Beats",
    type: "DJ Party",
    date: "Ven 16 Mai",
    time: "22h — 4h",
    icon: Music,
    spots: 42,
    totalSpots: 200,
    image: "/event-dj.png",
    gradient: "from-crimson/80 to-crimson-dark/90",
  },
  {
    id: "2",
    title: "Live Band Night",
    type: "Live Band",
    date: "Sam 17 Mai",
    time: "21h — 3h",
    icon: Mic2,
    spots: 78,
    totalSpots: 150,
    image: "/event-live.png",
    gradient: "from-gold-dark/80 to-gold/60",
  },
  {
    id: "3",
    title: "Ladies Night Special",
    type: "Ladies Night",
    date: "Jeu 22 Mai",
    time: "22h — 4h",
    icon: Crown,
    spots: 120,
    totalSpots: 200,
    image: "/event-ladies.png",
    gradient: "from-crimson/80 to-crimson-dark/90",
  },
];

export function EventsPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Horizontal on Vertical Scroll Animation
      const cardsWidth = scrollRef.current ? scrollRef.current.scrollWidth - window.innerWidth + 40 : 0;
      
      // Only apply horizontal scroll on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(scrollRef.current, {
          x: -cardsWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1,
            start: "top top",
            end: () => `+=${cardsWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#121414] py-32 lg:h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.22_18/5%),transparent_70%)] opacity-50" />
        
        <div ref={containerRef} className="relative z-10 mx-auto max-w-screen-2xl">
        <Container>
          <div className="mb-12">
            <SectionHeading
              badge="Prochains événements"
              title="Ce qui vous attend"
              subtitle="Réservez maintenant pour garantir votre place. Les soirées affichent souvent complet."
            />
          </div>
        </Container>

        {/* Horizontal Scroll Container */}
        <div className="overflow-hidden lg:overflow-visible">
          <div 
            ref={scrollRef} 
            className="flex flex-col gap-6 lg:flex-row lg:flex-nowrap px-4 md:px-8 lg:px-12 w-full lg:w-max"
          >
            {upcomingEvents.map((event, i) => {
              const fillPercent = ((event.totalSpots - event.spots) / event.totalSpots) * 100;

              return (
                <div
                  key={event.id}
                  className="w-full lg:w-[450px] flex-shrink-0"
                >
                  <Link
                    href={`/reserve`}
                    className="group relative block overflow-hidden rounded-3xl border border-white/[0.06] bg-[#1a1c1c] transition-all duration-500 hover:border-white/[0.12] hover:shadow-premium-lg"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${event.gradient}`} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                      {/* Floating Badge */}
                      <div className="absolute top-5 left-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-lg">
                          <event.icon className="h-3 w-3" />
                          {event.type}
                        </span>
                      </div>

                      {/* Date overlay */}
                      <div className="absolute top-5 right-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-md shadow-lg">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </span>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{event.title}</h3>
                        <p className="mt-1 text-xs text-white/80">{event.time}</p>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="p-6">
                      {/* Capacity */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {event.spots} places restantes
                        </span>
                        <span className="font-mono text-[10px] font-bold text-[#e3e2e2]">{Math.round(fillPercent)}%</span>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-crimson to-gold transition-all duration-700"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>

                      {/* CTA */}
                      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-crimson transition-colors group-hover:text-crimson-light uppercase tracking-wide">
                        Réserver cette soirée
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All */}
        <Container>
          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-8 text-sm font-medium text-foreground transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.06] backdrop-blur-md"
            >
              Voir tous les événements
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </div>
      </div>
    </section>
  );
}
