"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  Scan,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  EVENT_TYPE_CONFIG,
  TABLE_PREFERENCE_LABELS,
  type EventWithCapacity,
  type Reservation,
  type ReservationStatus,
} from "@/types";

const STATUS_CONFIG: Record<ReservationStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  pending: { label: "En attente", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", icon: Clock },
  confirmed: { label: "Confirmé", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: CheckCircle2 },
  checked_in: { label: "Entré", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 },
  cancelled: { label: "Annulé", color: "text-red-400 bg-red-500/10 border-red-500/20", icon: XCircle },
  no_show: { label: "Absent", color: "text-orange-400 bg-orange-500/10 border-orange-500/20", icon: XCircle },
  expired: { label: "Expiré", color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20", icon: Clock },
};

export default function AdminPage() {
  const [events, setEvents] = useState<EventWithCapacity[]>([]);
  const [reservations, setReservations] = useState<(Reservation & { events?: { title: string } })[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "reservations">("overview");

  useEffect(() => {
    async function fetchData() {
      const [eventsRes, reservationsRes] = await Promise.all([
        supabase.from("event_capacity").select("*").order("date", { ascending: true }),
        supabase
          .from("reservations")
          .select("*, events(title)")
          .order("created_at", { ascending: false })
          .limit(100),
      ]);

      if (eventsRes.data) setEvents(eventsRes.data as EventWithCapacity[]);
      if (reservationsRes.data) setReservations(reservationsRes.data as (Reservation & { events?: { title: string } })[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("admin-reservations")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "reservations" }, (payload) => {
        setReservations((prev) => [payload.new as Reservation, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "reservations" }, (payload) => {
        setReservations((prev) =>
          prev.map((r) => (r.id === (payload.new as Reservation).id ? { ...r, ...payload.new } : r))
        );
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredReservations =
    selectedEvent === "all"
      ? reservations
      : reservations.filter((r) => r.event_id === selectedEvent);

  const totalReservations = reservations.length;
  const totalCheckedIn = reservations.filter((r) => r.status === "checked_in").length;
  const totalConfirmed = reservations.filter((r) => r.status === "confirmed").length;
  const totalGuests = reservations
    .filter((r) => ["confirmed", "checked_in"].includes(r.status))
    .reduce((sum, r) => sum + r.party_size, 0);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center pt-20">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-crimson border-t-transparent" />
          Chargement du tableau de bord...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-16">
      <Container size="wide">
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-6 md:p-8">
          <div className="absolute inset-0 -z-10 opacity-10">
            <img src="/about-grotto.png" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Tableau de bord</h1>
              <p className="mt-1 text-sm text-muted-foreground">Gestion des événements et réservations en temps réel</p>
            </div>
            <a href="/scan" target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-2.5 text-sm font-semibold text-white shadow-premium transition-all hover:bg-crimson-light hover:shadow-[0_0_20px_oklch(0.55_0.22_18/30%)]">
              <Scan className="h-4 w-4" />
              Ouvrir le scanner
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Réservations", value: totalReservations, icon: Calendar, color: "text-crimson", bg: "bg-crimson/10", border: "border-crimson/20" },
            { label: "Confirmés", value: totalConfirmed, icon: CheckCircle2, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Entrés ce soir", value: totalCheckedIn, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { label: "Total invités", value: totalGuests, icon: BarChart3, color: "text-gold", bg: "bg-gold/10", border: "border-gold/20" },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={cn("rounded-xl border bg-card p-5 transition-all hover:bg-surface", stat.border)}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", stat.bg, stat.color)}><stat.icon className="h-4 w-4" /></div>
              </div>
              <p className="mt-3 text-3xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 flex gap-1 rounded-xl border border-white/[0.06] bg-card p-1">
          {(["overview", "reservations"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 rounded-lg py-2.5 text-sm font-medium transition-all", activeTab === tab ? "bg-white/[0.06] text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
              {tab === "overview" ? "Vue d'ensemble" : "Réservations"}
            </button>
          ))}
        </div>

        {activeTab === "overview" ? (
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="rounded-xl border border-white/[0.06] bg-card p-12 text-center text-muted-foreground">Aucun événement. Ajoutez-en depuis Supabase.</div>
            ) : (
              events.map((event) => {
                const config = EVENT_TYPE_CONFIG[event.type];
                const fillPercent = event.capacity > 0 ? ((event.capacity - event.spots_remaining) / event.capacity) * 100 : 0;
                const eventImage = event.type === 'dj_party' ? '/event-dj.png' : event.type === 'live_band' ? '/event-live.png' : event.type === 'ladies_night' ? '/event-ladies.png' : '/about-grotto.png';

                return (
                  <div key={event.id} className="group overflow-hidden rounded-xl border border-white/[0.06] bg-card transition-all hover:border-white/[0.12] hover:bg-surface">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="relative h-32 w-full shrink-0 overflow-hidden sm:h-28 sm:w-40">
                        <img src={eventImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5 sm:flex-row sm:items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest", config.color === "crimson" ? "border-crimson/20 bg-crimson/10 text-crimson" : "border-gold/20 bg-gold/10 text-gold")}>{config.label}</span>
                            <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest", event.status === "upcoming" ? "border-blue-500/20 bg-blue-500/10 text-blue-400" : event.status === "active" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-zinc-500/20 bg-zinc-500/10 text-zinc-400")}>{event.status}</span>
                          </div>
                          <h3 className="mt-2 text-lg font-bold text-foreground">{event.title}</h3>
                          <p className="text-xs text-muted-foreground">{formatDate(event.date)} · Portes: {event.doors_open}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-6 sm:mt-0">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Réservés</p>
                            <p className="font-mono text-lg font-bold text-foreground">{event.reserved_count}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Entrés</p>
                            <p className="font-mono text-lg font-bold text-emerald-400">{event.checked_in_count}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Restants</p>
                            <p className={cn("font-mono text-lg font-bold", event.spots_remaining <= 10 ? "text-red-400" : "text-foreground")}>{event.spots_remaining}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.03] px-5 py-3">
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        <span>Remplissage</span>
                        <span className="font-mono">{Math.round(fillPercent)}%</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", fillPercent > 90 ? "from-red-500 to-red-400" : fillPercent > 70 ? "from-amber-500 to-amber-400" : "from-crimson to-gold")} style={{ width: `${fillPercent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              <button onClick={() => setSelectedEvent("all")} className={cn("shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all", selectedEvent === "all" ? "bg-crimson/10 text-crimson" : "text-muted-foreground hover:bg-white/[0.04]")}>Tous ({reservations.length})</button>
              {events.map((event) => (
                <button key={event.id} onClick={() => setSelectedEvent(event.id)} className={cn("shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all", selectedEvent === event.id ? "bg-crimson/10 text-crimson" : "text-muted-foreground hover:bg-white/[0.04]")}>{event.title}</button>
              ))}
            </div>
            <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-card">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nom</th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Événement</th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Personnes</th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Table</th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Statut</th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Heure</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">Aucune réservation trouvée.</td></tr>
                  ) : (
                    filteredReservations.map((res) => {
                      const statusCfg = STATUS_CONFIG[res.status];
                      return (
                        <tr key={res.id} className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]">
                          <td className="px-4 py-3"><p className="text-sm font-medium text-foreground">{res.name}</p><p className="text-[10px] text-muted-foreground">{res.email}</p></td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{res.events?.title || "—"}</td>
                          <td className="px-4 py-3 font-mono text-sm text-foreground">{res.party_size}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{TABLE_PREFERENCE_LABELS[res.table_preference]}</td>
                          <td className="px-4 py-3"><span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold", statusCfg.color)}><statusCfg.icon className="h-2.5 w-2.5" />{statusCfg.label}</span></td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{formatTime(res.created_at)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
