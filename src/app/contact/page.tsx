"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const contactDetails = [
  { icon: MapPin, label: "Adresse", value: CONTACT_INFO.address },
  { icon: Phone, label: "Téléphone", value: CONTACT_INFO.phone },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email },
  { icon: Clock, label: "Horaires", value: CONTACT_INFO.hours },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Simulate sending — replace with actual API
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
  }

  return (
    <section className="section-padding min-h-screen pt-28">
      <Container>
        {/* Cinematic Header Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/[0.06] shadow-2xl"
        >
          <img 
            src="/event-ladies.png" 
            alt="La Grotte Atmosphere" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.005_250)] via-[oklch(0.06_0.005_250/20%)] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.06_0.005_250/40%)] to-transparent" />
        </motion.div>

        <SectionHeading
          badge="Contact"
          title="Parlons-en"
          subtitle="Une question, une réservation privée, ou simplement envie de dire bonjour ? On est là."
        />

        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-card p-6 md:p-8">
              <h3 className="text-lg font-bold text-foreground">Nos coordonnées</h3>
              <div className="mt-6 space-y-5">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-crimson/[0.08] ring-1 ring-crimson/15">
                      <detail.icon className="h-4 w-4 text-crimson" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {detail.label}
                      </p>
                      <p className="mt-0.5 text-sm text-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Suivez-nous
                </p>
                <div className="mt-3 flex gap-3">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-muted-foreground transition-all hover:border-crimson/30 hover:bg-crimson/10 hover:text-crimson"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-2 ring-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">Message envoyé !</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Merci pour votre message. On vous répond très vite.
                </p>
                <button
                  onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
                  className="mt-6 text-sm text-crimson underline transition-colors hover:text-crimson-light"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.06] bg-card p-6 md:p-8"
              >
                <h3 className="text-lg font-bold text-foreground">Envoyez-nous un message</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  On répond généralement en moins de 24h.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                      Nom *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Votre message..."
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-crimson/40 focus:outline-none focus:ring-1 focus:ring-crimson/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300",
                    sending
                      ? "cursor-not-allowed bg-crimson/50 text-white/70"
                      : "bg-crimson text-white hover:bg-crimson-light hover:shadow-[0_0_24px_oklch(0.55_0.22_18/20%)]"
                  )}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
