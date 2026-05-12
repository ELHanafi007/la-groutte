// ===================================================
// La Grotte du Pêcheur — Site Constants
// ===================================================

export const SITE_CONFIG = {
  name: "La Grotte du Pêcheur",
  tagline: "Restaurant • Pub • Nightlife",
  description:
    "Vivez une expérience unique. Réservez votre soirée, recevez votre QR code, et entrez sans attendre.",
  url: "https://lagrotte.com",
  locale: "fr_FR",
  language: "fr",
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Événements", href: "/events" },
  { label: "Galerie", href: "/gallery" },
  { label: "Réserver", href: "/reserve" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/la_grotte_du_pecheur",
  facebook: "#",
  tiktok: "#",
} as const;

export const CONTACT_INFO = {
  email: "contact@lagrotte.com",
  phone: "+213 0 00 00 00 00",
  address: "La Grotte du Pêcheur",
  hours: "Ouvert jusqu'à 4h du matin",
} as const;

export const EVENT_TYPES = {
  regular: { label: "Soirée", color: "crimson" },
  dj_party: { label: "DJ Party", color: "crimson" },
  live_band: { label: "Live Band", color: "gold" },
  ladies_night: { label: "Ladies Night", color: "crimson-light" },
  private: { label: "Privé", color: "gold" },
} as const;

export type EventType = keyof typeof EVENT_TYPES;
