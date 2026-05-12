"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Volume2, VolumeX, Users, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TABLE_PREFERENCE_LABELS, type TablePreference } from "@/types";

type ScanResult = {
  result: "success" | "already_used" | "expired" | "not_found" | "cancelled";
  message: string;
  reservation?: {
    name: string;
    party_size?: number;
    table_preference?: TablePreference;
    event_title?: string;
    checked_in_at?: string;
  };
};

const resultConfig = {
  success: {
    bg: "bg-emerald-500/[0.08]",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    icon: "✓",
    glow: "shadow-[0_0_80px_oklch(0.6_0.2_145/30%)]",
    label: "ACCÈS CONFIRMÉ",
  },
  already_used: {
    bg: "bg-amber-500/[0.08]",
    border: "border-amber-500/30",
    text: "text-amber-400",
    icon: "⚠",
    glow: "shadow-[0_0_80px_oklch(0.7_0.15_85/30%)]",
    label: "DÉJÀ UTILISÉ",
  },
  expired: {
    bg: "bg-red-500/[0.08]",
    border: "border-red-500/30",
    text: "text-red-400",
    icon: "✕",
    glow: "shadow-[0_0_80px_oklch(0.55_0.25_27/30%)]",
    label: "EXPIRÉ",
  },
  not_found: {
    bg: "bg-red-500/[0.08]",
    border: "border-red-500/30",
    text: "text-red-400",
    icon: "✕",
    glow: "shadow-[0_0_80px_oklch(0.55_0.25_27/30%)]",
    label: "NON TROUVÉ",
  },
  cancelled: {
    bg: "bg-red-500/[0.08]",
    border: "border-red-500/30",
    text: "text-red-400",
    icon: "✕",
    glow: "shadow-[0_0_80px_oklch(0.55_0.25_27/30%)]",
    label: "ANNULÉ",
  },
};

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [todayStats, setTodayStats] = useState({ checkedIn: 0, total: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sound effects
  const playSound = useCallback(
    (type: "success" | "denied") => {
      if (!soundEnabled) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === "success") {
        osc.frequency.value = 880;
        gain.gain.value = 0.3;
        osc.start();
        setTimeout(() => { osc.frequency.value = 1100; }, 100);
        setTimeout(() => { osc.stop(); ctx.close(); }, 200);
      } else {
        osc.frequency.value = 300;
        gain.gain.value = 0.4;
        osc.start();
        setTimeout(() => { osc.frequency.value = 200; }, 150);
        setTimeout(() => { osc.stop(); ctx.close(); }, 400);
      }
    },
    [soundEnabled]
  );

  // Start camera
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setCameraError("Impossible d'accéder à la caméra. Utilisez la saisie manuelle.");
      }
    }
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  // QR detection from video using BarcodeDetector API
  useEffect(() => {
    if (!videoRef.current || cameraError) return;

    // Check if BarcodeDetector is available
    if (!("BarcodeDetector" in window)) {
      // Fallback: show manual input option
      setShowManual(true);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detector = new (window as any).BarcodeDetector({ formats: ["qr_code"] });

    scanIntervalRef.current = setInterval(async () => {
      if (!scanning || !videoRef.current || videoRef.current.readyState < 2) return;

      try {
        const barcodes = await detector.detect(videoRef.current);
        if (barcodes.length > 0) {
          const token = barcodes[0].rawValue;
          if (token && token.startsWith("LG-")) {
            setScanning(false);
            await verifyScan(token);
          }
        }
      } catch {
        // Detection failed silently — camera may not be ready
      }
    }, 300);

    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning, cameraError]);

  async function verifyScan(token: string) {
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_token: token }),
      });
      const data: ScanResult = await res.json();
      setScanResult(data);

      if (data.result === "success") {
        playSound("success");
        setTodayStats((prev) => ({ ...prev, checkedIn: prev.checkedIn + (data.reservation?.party_size || 1) }));
      } else {
        playSound("denied");
      }
    } catch {
      setScanResult({
        result: "not_found",
        message: "Erreur de connexion au serveur.",
      });
      playSound("denied");
    }
  }

  function resetScanner() {
    setScanResult(null);
    setScanning(true);
    setManualInput("");
  }

  async function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setScanning(false);
    await verifyScan(manualInput.trim());
  }

  const config = scanResult ? resultConfig[scanResult.result] : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.06_0.005_250)]">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/10">
            <Scan className="h-4 w-4 text-crimson" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Scanner Portier</p>
            <p className="text-[10px] text-muted-foreground">La Grotte du Pêcheur</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Capacity counter */}
          <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-xs font-medium text-foreground">
              {todayStats.checkedIn}
            </span>
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
            aria-label={soundEnabled ? "Couper le son" : "Activer le son"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Camera Feed */}
        {!cameraError && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              scanResult ? "opacity-10" : "opacity-40"
            )}
          />
        )}

        {/* Scan Result Overlay */}
        <AnimatePresence mode="wait">
          {scanResult && config ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative z-10 mx-4 w-full max-w-sm rounded-3xl border p-8 text-center",
                config.bg,
                config.border,
                config.glow
              )}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={cn("mx-auto mb-4 text-7xl", config.text)}
              >
                {config.icon}
              </motion.div>

              {/* Label */}
              <p className={cn("text-2xl font-extrabold tracking-wide", config.text)}>
                {config.label}
              </p>

              {/* Message */}
              <p className="mt-2 text-sm text-muted-foreground">
                {scanResult.message}
              </p>

              {/* Guest Details (on success) */}
              {scanResult.reservation && (
                <div className="mt-6 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="text-lg font-bold text-foreground">
                    {scanResult.reservation.name}
                  </p>
                  {scanResult.reservation.party_size && (
                    <p className="text-sm text-muted-foreground">
                      {scanResult.reservation.party_size} personne{scanResult.reservation.party_size > 1 ? "s" : ""}
                      {scanResult.reservation.table_preference && scanResult.reservation.table_preference !== "any" && (
                        <> · {TABLE_PREFERENCE_LABELS[scanResult.reservation.table_preference]}</>
                      )}
                    </p>
                  )}
                  {scanResult.reservation.event_title && (
                    <p className="text-xs text-muted-foreground">
                      {scanResult.reservation.event_title}
                    </p>
                  )}
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={resetScanner}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/[0.1]"
              >
                <RotateCcw className="h-4 w-4" />
                Scanner suivant
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Scanner Frame */}
              <div className="relative h-64 w-64">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 h-8 w-8 border-l-2 border-t-2 border-crimson rounded-tl-lg" />
                <div className="absolute top-0 right-0 h-8 w-8 border-r-2 border-t-2 border-crimson rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-l-2 border-b-2 border-crimson rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-r-2 border-b-2 border-crimson rounded-br-lg" />

                {/* Scan line animation */}
                <motion.div
                  animate={{ y: [0, 240, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
                  className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-crimson to-transparent"
                />
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                {cameraError
                  ? cameraError
                  : "Placez le QR code dans le cadre"}
              </p>

              {/* Manual input toggle */}
              {(showManual || cameraError) && (
                <form onSubmit={handleManualSubmit} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Code QR (LG-...)"
                    className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-crimson/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-crimson px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-crimson-light"
                  >
                    Vérifier
                  </button>
                </form>
              )}

              {!showManual && !cameraError && (
                <button
                  onClick={() => setShowManual(true)}
                  className="mt-3 text-xs text-muted-foreground/60 underline transition-colors hover:text-muted-foreground"
                >
                  Saisie manuelle
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
