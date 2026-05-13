"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("Une erreur inattendue est survenue.");
      setLoading(false);
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 h-[400px] w-[400px] rounded-full bg-crimson/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px]" />

      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-md"
        >
          {/* Logo & Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
              <img src="/logo.jpg" alt="La Grotte" className="h-full w-full rounded-lg object-cover" />
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              Accès <span className="text-gradient">Manager</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Connectez-vous pour gérer les événements et les réservations.
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-3xl border border-white/[0.06] bg-card/50 p-8 backdrop-blur-xl">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground/80">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@lagrotte.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm transition-all focus:border-crimson/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-crimson/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground/80">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm transition-all focus:border-crimson/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-crimson/20"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs text-destructive"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-crimson-light hover:shadow-[0_0_30px_oklch(0.55_0.22_18/30%)] active:scale-[0.98]",
                  loading && "cursor-not-allowed opacity-70"
                )}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Info */}
          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
            Système de Gestion La Grotte v0.1
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
