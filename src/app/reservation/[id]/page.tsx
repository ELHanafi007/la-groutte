"use client";

import { useState, useEffect, useRef, use } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Share2,
  Calendar,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import { BrandedQRCode } from "@/components/ui/BrandedQRCode";
import QRCode from "qrcode";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
  EVENT_TYPE_CONFIG,
  TABLE_PREFERENCE_LABELS,
  type Reservation,
  type Event,
} from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ReservationConfirmationPage({ params }: PageProps) {
  const { id } = use(params);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchData() {
      // --- DEMO MODE CHECK ---
      const isDemo = 
        process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project") || 
        !process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (isDemo) {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get("token") || "LG-DEMO-TRIAL";
        
        setReservation({
          id,
          event_id: "demo-event",
          name: "Client Démo",
          email: "demo@example.com",
          phone: "0000000000",
          party_size: 2,
          table_preference: "any",
          qr_token: token,
          status: "confirmed",
          checked_in_at: null,
          notes: null,
          created_at: new Date().toISOString(),
        });

        setEvent({
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
        });

        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("reservations")
        .select("*, events(*)")
        .eq("id", id)
        .single();

      if (!error && data) {
        setReservation(data as Reservation);
        setEvent(data.events as Event);

        // QR will be rendered by BrandedQRCode component
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDownload = async () => {
    if (!reservation || !event || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 800;

    // Dark background
    ctx.fillStyle = "#0F0F14";
    ctx.roundRect(0, 0, 600, 800, 20);
    ctx.fill();

    // Header accent line
    const gradient = ctx.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, "#C62828");
    gradient.addColorStop(1, "#D4A853");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 4);

    // Title
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("La Grotte du Pêcheur", 300, 50);

    // Event name
    ctx.fillStyle = "#C62828";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(event.title, 300, 85);

    // QR Code — Manual draw to match branded style
    const qr = QRCode.create(reservation.qr_token, { errorCorrectionLevel: "H" });
    const { modules } = qr;
    const mSize = modules.size;
    const qrDrawSize = 300;
    const cSize = qrDrawSize / mSize;
    const startX = 150;
    const startY = 110;

    // Draw dots
    for (let y = 0; y < mSize; y++) {
      for (let x = 0; x < mSize; x++) {
        if (modules.data[y * mSize + x]) {
          // Check if eye
          const isEye = (x < 7 && y < 7) || (x >= mSize - 7 && y < 7) || (x < 7 && y >= mSize - 7);
          const isCenter = (x >= mSize / 2 - 3 && x < mSize / 2 + 3 && y >= mSize / 2 - 3 && y < mSize / 2 + 3);

          if (isEye || isCenter) continue;

          ctx.fillStyle = "#C62828";
          ctx.beginPath();
          ctx.arc(
            startX + x * cSize + cSize / 2,
            startY + y * cSize + cSize / 2,
            cSize / 2.4,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }

    // Draw Eyes
    const eyePositions = [
      { x: 0, y: 0 },
      { x: mSize - 7, y: 0 },
      { x: 0, y: mSize - 7 },
    ];

    eyePositions.forEach((pos) => {
      const ex = startX + pos.x * cSize;
      const ey = startY + pos.y * cSize;
      const es = 7 * cSize;

      // Outer
      ctx.strokeStyle = "#D4A853";
      ctx.lineWidth = cSize;
      ctx.beginPath();
      // @ts-expect-error - roundRect might not be in all TS versions of canvas ctx but works in modern browsers
      ctx.roundRect(ex + cSize / 2, ey + cSize / 2, es - cSize, es - cSize, cSize * 1.5);
      ctx.stroke();

      // Inner
      ctx.fillStyle = "#C62828";
      ctx.beginPath();
      // @ts-expect-error
      ctx.roundRect(ex + 2 * cSize + cSize / 2, ey + 2 * cSize + cSize / 2, 3 * cSize - cSize, 3 * cSize - cSize, cSize);
      ctx.fill();
    });

    // Logo
    const logoImg = new Image();
    logoImg.onload = () => {
      const lSize = 60;
      const lx = startX + (qrDrawSize - lSize) / 2;
      const ly = startY + (qrDrawSize - lSize) / 2;
      
      // Logo background/border
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      // @ts-expect-error
      ctx.roundRect(lx - 2, ly - 2, lSize + 4, lSize + 4, 10);
      ctx.fill();
      
      ctx.drawImage(logoImg, lx, ly, lSize, lSize);

      // Guest info
      ctx.fillStyle = "#AAAAAA";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("INVITÉ", 300, 450);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(reservation.name, 300, 480);

      ctx.fillStyle = "#AAAAAA";
      ctx.font = "14px sans-serif";
      ctx.fillText(`${reservation.party_size} personne${reservation.party_size > 1 ? "s" : ""} · ${TABLE_PREFERENCE_LABELS[reservation.table_preference]}`, 300, 510);

      // Date
      ctx.fillStyle = "#AAAAAA";
      ctx.font = "14px sans-serif";
      ctx.fillText("DATE", 300, 560);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px sans-serif";
      ctx.fillText(formatDate(event.date), 300, 585);

      // Token
      ctx.fillStyle = "#444444";
      ctx.font = "10px monospace";
      ctx.fillText(reservation.qr_token, 300, 640);

      // Footer
      ctx.fillStyle = "#666666";
      ctx.font = "11px sans-serif";
      ctx.fillText("Présentez ce QR code à l'entrée", 300, 750);
      ctx.fillText("Ce code est à usage unique", 300, 770);

      // Download
      const link = document.createElement("a");
      link.download = `reservation-${event.title.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    logoImg.src = "/logo.jpg";
  };

  const handleShare = async () => {
    if (!reservation || !event) return;
    if (navigator.share) {
      await navigator.share({
        title: `Réservation — ${event.title}`,
        text: `Ma réservation pour ${event.title} à La Grotte du Pêcheur le ${formatDate(event.date)}`,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center pt-20">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-crimson border-t-transparent" />
          Chargement...
        </div>
      </section>
    );
  }

  if (!reservation || !event) {
    return (
      <section className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Réservation introuvable</h2>
          <p className="mt-2 text-muted-foreground">
            Cette réservation n&apos;existe pas ou a été supprimée.
          </p>
        </div>
      </section>
    );
  }

  const config = EVENT_TYPE_CONFIG[event.type];

  return (
    <section className="section-padding min-h-screen pt-28">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-md"
        >
          {/* Success Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-2 ring-emerald-500/30"
            >
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </motion.div>
            <h1 className="font-heading text-2xl md:text-3xl">
              Réservation <span className="text-emerald-400">confirmée</span> !
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Présentez ce QR code à l&apos;entrée
            </p>
          </div>

          {/* QR Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-white/[0.06] bg-card"
          >
            {/* Gradient top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-crimson to-gold" />

            {/* QR Display */}
            <div className="flex flex-col items-center px-6 pt-8 pb-6">
              {qrDataUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative rounded-2xl border border-white/[0.06] bg-surface-elevated p-4"
                >
                  {/* Animated shimmer to prove it's live */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="animate-pulse absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                  </div>
                  <BrandedQRCode
                    value={reservation.qr_token}
                    size={224} // 56 * 4 (matching h-56 w-56)
                    logoUrl="/logo.jpg"
                    logoSize={48}
                    primaryColor="#C62828"
                    secondaryColor="#D4A853"
                    className="relative z-10"
                  />
                </motion.div>
              )}

              {/* Token */}
              <p className="mt-4 font-mono text-[10px] tracking-wider text-muted-foreground/50">
                {reservation.qr_token}
              </p>
            </div>

            {/* Divider */}
            <div className="divider-glow mx-6" />

            {/* Reservation Details */}
            <div className="space-y-3 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Événement</span>
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  config.color === "crimson"
                    ? "border-crimson/20 bg-crimson/10 text-crimson"
                    : "border-gold/20 bg-gold/10 text-gold"
                )}>
                  {event.title}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> Date
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(event.date)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Portes
                </span>
                <span className="text-sm font-medium text-foreground">
                  {event.doors_open}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> Personnes
                </span>
                <span className="text-sm font-medium text-foreground">
                  {reservation.party_size}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> Table
                </span>
                <span className="text-sm font-medium text-foreground">
                  {TABLE_PREFERENCE_LABELS[reservation.table_preference]}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 border-t border-white/[0.06] p-4">
              <button
                onClick={handleDownload}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm font-medium text-foreground transition-all hover:bg-white/[0.06]"
              >
                <Download className="h-4 w-4" />
                Télécharger
              </button>
              <button
                onClick={handleShare}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-crimson py-3 text-sm font-medium text-white transition-all hover:bg-crimson-light"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </button>
            </div>
          </motion.div>

          {/* Warning */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center text-xs text-muted-foreground/60"
          >
            Ce QR code est à usage unique et expire après l&apos;événement.
            <br />Ne le partagez qu&apos;avec les personnes de votre groupe.
          </motion.p>
        </motion.div>

        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} className="hidden" />
      </Container>
    </section>
  );
}
