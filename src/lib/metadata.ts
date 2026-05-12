// ===================================================
// Lagroutte — SEO Metadata Helpers
// Reusable metadata generation for all pages
// ===================================================

import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
