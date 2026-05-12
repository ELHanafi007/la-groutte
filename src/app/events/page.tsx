"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/animations";
import { EVENT_TYPE_CONFIG, type EventWithCapacity } from "@/types";

export default function EventsPage() {
  const [events, setEvents] = useState<EventWithCapacity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from("event_capacity")
        .select("*")
        .in("status", ["upcoming", "active"])
        .order("date", { ascending: true });

      if (data) setEvents(data as EventWithCapacity[]);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <section className="section-padding min-h-screen pt-28">
      <Container>
        <SectionHeading
          badge="Événements"
          title="Prochaines soirées"
          subtitle="Découvrez nos événements et réservez votre place avant qu'il ne soit trop tard."
        />

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-crimson border-t-transparent" />
              Chargement...
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground">
              Aucun événement programmé pour le moment.
            </p>
            <p className="mt-2 text-sm text-muted-foreground/60">
              Revenez bientôt pour découvrir nos prochaines soirées.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {events.map((event, i) => {
              const config = EVENT_TYPE_CONFIG[event.type];
              const fillPercent =
                ((event.capacity - event.spots_remaining) / event.capacity) * 100;
              const isFull = event.spots_remaining <= 0;

              // Image mapping
              const eventImage = 
                event.type === 'dj_party' ? '/event-dj.png' :
                event.type === 'live_band' ? '/event-live.png' :
                event.type === 'ladies_night' ? '/event-ladies.png' :
                '/about-grotto.png';

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="group rounded-2xl border border-white/[0.06] bg-card p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-surface md:p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      {/* Thumbnail */}
                      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl md:h-32 md:w-48">
                        <img 
                          src={eventImage} 
                          alt={event.title} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.005_250/40%)] to-transparent" />
                      </div>

                      {/* Content Wrapper */}
                      <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        {/* Left: Event info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                              config.color === "crimson"
                                ? "border-crimson/20 bg-crimson/10 text-crimson"
                                : "border-gold/20 bg-gold/10 text-gold"
                            )}
                          >
                            {config.label}
                          </span>
                          {isFull && (
                            <span className="inline-flex items-center rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-destructive">
                              Complet
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-xl font-bold text-foreground md:text-2xl">
                          {event.title}
                        </h3>

                        {event.description && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-crimson/50" />
                            {formatDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-crimson/50" />
                            {event.doors_open}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-crimson/50" />
                            {event.spots_remaining} places restantes
                          </span>
                        </div>

                        {/* Capacity bar */}
                        <div className="mt-4 max-w-xs">
                          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className={cn(
                                "h-full rounded-full bg-gradient-to-r transition-all duration-700",
                                config.color === "crimson"
                                  ? "from-crimson to-crimson-light"
                                  : "from-gold to-gold-light"
                              )}
                              style={{ width: `${fillPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <div className="flex-shrink-0">
                        {isFull ? (
                          <span className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 text-sm font-medium text-muted-foreground">
                            Complet
                          </span>
                        ) : (
                          <Link
                            href={`/reserve?event=${event.id}`}
                            className="group/btn inline-flex h-11 items-center gap-2 rounded-xl bg-crimson px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-crimson-light hover:shadow-[0_0_24px_oklch(0.55_0.22_18/20%)]"
                          >
                            Réserver
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
