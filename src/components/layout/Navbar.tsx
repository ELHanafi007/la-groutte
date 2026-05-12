"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { useLenis } from "@studio-freight/react-lenis";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lenis = useLenis();
  useEffect(() => {
    if (isMobileOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => { 
      lenis?.start();
      document.body.style.overflow = ""; 
    };
  }, [isMobileOpen, lenis]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "border-b border-white/[0.06] bg-background/80 backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <nav className="container-wide flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-3"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-lg bg-crimson/10 ring-1 ring-crimson/20 transition-all duration-300 group-hover:bg-crimson/20 group-hover:ring-crimson/40 group-hover:shadow-[0_0_20px_oklch(0.55_0.22_18/15%)]">
              <img src="/logo.jpg" alt="La Grotte Logo" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground">
                La Grotte
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground sm:block">
                du Pêcheur
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  "text-muted-foreground hover:text-foreground",
                  link.href === "/reserve" &&
                    "ml-2 rounded-lg bg-crimson/10 text-crimson ring-1 ring-crimson/20 hover:bg-crimson/20 hover:text-crimson-light"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Social */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <Link
              href="/reserve"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-crimson px-5 text-sm font-semibold text-white shadow-premium-sm transition-all duration-300 hover:bg-crimson-light hover:shadow-[0_0_24px_oklch(0.55_0.22_18/20%)]"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-white/5 md:hidden"
            aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl font-semibold text-foreground transition-colors hover:text-crimson"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/reserve"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-crimson px-8 text-base font-semibold text-white shadow-lg glow-crimson"
                >
                  Réserver maintenant
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center gap-6"
              >
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-crimson"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
