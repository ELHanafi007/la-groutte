import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "./Container";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <img 
          src="/hero-bg.png" 
          alt="" 
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <div className="divider-glow absolute top-0 left-0" />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-lg bg-crimson/10 ring-1 ring-crimson/20">
                <img src="/logo.jpg" alt="La Grotte Logo" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  La Grotte
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  du Pêcheur
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-muted-foreground transition-all duration-200 hover:border-crimson/30 hover:bg-crimson/10 hover:text-crimson"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-muted-foreground transition-all duration-200 hover:border-crimson/30 hover:bg-crimson/10 hover:text-crimson"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-crimson/60" />
                {CONTACT_INFO.address}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0 text-crimson/60" />
                {CONTACT_INFO.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-crimson/60" />
                {CONTACT_INFO.email}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0 text-crimson/60" />
                {CONTACT_INFO.hours}
              </li>
            </ul>
          </div>

          {/* CTA Column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Prêt pour ce soir ?
            </h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Réservez en 30 secondes et recevez votre QR code instantanément.
            </p>
            <Link
              href="/reserve"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-crimson px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-crimson-light glow-crimson"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Système de réservation intelligent
          </p>
        </div>
      </Container>
    </footer>
  );
}
