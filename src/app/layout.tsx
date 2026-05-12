import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Grotte du Pêcheur | Réservation Intelligente",
    template: "%s | La Grotte du Pêcheur",
  },
  description:
    "Réservez votre soirée en 30 secondes. Recevez votre QR code unique et entrez directement — sans attente, sans stress.",
  keywords: [
    "restaurant",
    "pub",
    "nightlife",
    "réservation",
    "QR code",
    "soirée",
    "la grotte du pêcheur",
  ],
  authors: [{ name: "La Grotte du Pêcheur" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "La Grotte du Pêcheur",
    title: "La Grotte du Pêcheur | Réservation Intelligente",
    description:
      "Réservez votre soirée en 30 secondes. Recevez votre QR code unique et entrez directement.",
  },
};

import { SmoothScroll } from "@/components/layout/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col font-sans">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
