"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  EVENT_TYPE_CONFIG,
  TABLE_PREFERENCE_LABELS,
  type EventWithCapacity,
  type TablePreference,
} from "@/types";

export default function ReservePage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventWithCapacity[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [tablePreference, setTablePreference] = useState<TablePreference>("any");

  // Fetch upcoming events
  useEffect(() => {
    async function fetchEvents() {
      // --- DEMO MODE CHECK ---
      const isDemo = 
        process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project") || 
        !process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (isDemo) {
        const dummyEvents: EventWithCapacity[] = [{
          id: "demo-event",
          title: "Soirée Démo VIP",
          type: "dj_party",
          date: new Date().toISOString(),
          doors_open: "22:00",
          doors_close: "04:00",
          capacity: 200,
          description: "Ceci est une réservation de démonstration.",
          image_url: null,
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          reserved_count: 45,
          checked_in_count: 12,
          spots_remaining: 155,
        }];
        setEvents(dummyEvents);
        setSelectedEvent(dummyEvents[0].id);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("event_capacity")
        .select("*")
        .in("status", ["upcoming", "active"])
        .order("date", { ascending: true });

      if (!fetchError && data) {
        setEvents(data as EventWithCapacity[]);
        if (data.length > 0) setSelectedEvent(data[0].id);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const selectedEventData = events.find((e) => e.id === selectedEvent);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: selectedEvent,
          name,
          email,
          phone,
          party_size: partySize,
          table_preference: tablePreference,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setSubmitting(false);
        return;
      }

      // Redirect to confirmation page with QR
      router.push(`/reservation/${data.reservation.id}?token=${data.reservation.qr_token}`);
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
      setSubmitting(false);
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <section className="section-padding min-h-screen pt-28">
      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl"
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-crimson/[0.08] px-4 py-1.5 text-xs font-medium tracking-wide text-crimson-light">
              <CheckCircle2 className="h-3 w-3" />
              Réservation en 30 secondes
            </span>
            <h1 className="mt-6 font-heading text-3xl md:text-4xl lg:text-5xl">
              Réserver votre <span className="text-gradient">soirée</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Choisissez votre événement, remplissez le formulaire, et recevez votre QR code unique instantanément.
            </p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-white/[0.06] bg-card p-6 md:p-8"
          >
            {/* Event Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Choisir un événement *
              </label>
              {loading ? (
                <div className="flex items-center gap-2 rounded-xl bg-surface p-4 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Chargement des événements...
                </div>
              ) : events.length === 0 ? (
                <div className="rounded-xl bg-surface p-4 text-sm text-muted-foreground">
                  Aucun événement disponible pour le moment.
                </div>
              ) : (
                <div className="grid gap-3">
                  {events.map((event) => {
                    const config = EVENT_TYPE_CONFIG[event.type];
                    const isFull = event.spots_remaining <= 0;
                    return (
                      <button
                        key={event.id}
                        type="button"
                        disabled={isFull}
                        onClick={() => setSelectedEvent(event.id)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200",
                          selectedEvent === event.id
                            ? "border-crimson/40 bg-crimson/[0.06] ring-1 ring-crimson/20"
                            : "border-white/[0.06] bg-surface hover:border-white/[0.12]",
                          isFull && "cursor-not-allowed opacity-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              config.color === "crimson"
                                ? "bg-crimson/10 text-crimson"
                                : "bg-gold/10 text-gold"
                            )}
                          >
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {event.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(event.date)} · {config.label}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "text-xs font-medium",
                            isFull ? "text-destructive" : "text-muted-foreground"
                          )}>
                            {isFull ? "Complet" : `${event.spots_remaining} places`}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                Nom complet *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  Téléphone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+213 ..."
                  className="w-full rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                />
              </div>
            </div>

            {/* Party Size + Table */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="party-size" className="mb-2 block text-sm font-medium text-foreground">
                  Nombre de personnes *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="party-size"
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-surface py-3 pl-10 pr-4 text-sm text-foreground transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "personne" : "personnes"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="table-pref" className="mb-2 block text-sm font-medium text-foreground">
                  Préférence de table
                </label>
                <select
                  id="table-pref"
                  value={tablePreference}
                  onChange={(e) => setTablePreference(e.target.value as TablePreference)}
                  className="w-full appearance-none rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                >
                  {Object.entries(TABLE_PREFERENCE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/[0.08] px-4 py-3 text-sm text-destructive"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !selectedEvent || events.length === 0}
              className={cn(
                "group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300",
                submitting
                  ? "cursor-not-allowed bg-crimson/50 text-white/70"
                  : "bg-crimson text-white shadow-premium hover:bg-crimson-light hover:shadow-[0_0_30px_oklch(0.55_0.22_18/25%)] hover:-translate-y-0.5"
              )}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Réservation en cours...
                </>
              ) : (
                <>
                  Confirmer la réservation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            {/* Info */}
            {selectedEventData && (
              <p className="text-center text-xs text-muted-foreground">
                {selectedEventData.spots_remaining} places restantes pour{" "}
                <span className="text-foreground">{selectedEventData.title}</span>
              </p>
            )}
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}
