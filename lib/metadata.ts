// src/lib/metadata.ts

import type { Metadata } from "next";
import { seo } from "./seo";

export type MetadataOptions = {
  /**
   * Site-relative path of the page, e.g. `/pricing`. Drives the canonical URL
   * and og:url.
   *
   * Omitting it used to be the only option, and every page canonicalised to
   * `/` — which tells a crawler that eight distinct pages are duplicates of the
   * homepage and gets seven of them dropped from the index. Always pass it.
   */
  path?: string;
  /** Request origin, used for metadataBase only. Canonicals ignore it. */
  origin?: string;
  image?: { url: string; alt?: string };
  type?: "website" | "article";
  /** Absolute URL. Only for content published elsewhere first. */
  canonical?: string;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  keywords?: string[];
  noindex?: boolean;
};

/**
 * The canonical host is always production `www`, never the request origin.
 *
 * The apex 308s to `www`, so canonicalising to whatever host served the request
 * would emit a redirect hop from the apex and would point preview deployments
 * at themselves. Both dilute the signal for the real URL.
 */
function canonicalUrl(path: string): string {
  return new URL(path, seo.site.url).toString();
}

export function createMetadata(
  title?: string,
  description?: string,
  options: MetadataOptions = {},
): Metadata {
  const {
    path = "/",
    origin = seo.site.url,
    image,
    type = "website",
    canonical: canonicalOverride,
    publishedTime,
    authors,
    tags,
    keywords,
    noindex = false,
  } = options;

  const pageTitle = title ? `${title} | ${seo.site.name}` : seo.site.title;
  const pageDescription = description ?? seo.site.description;
  const metadataBase = new URL(origin);
  const url = canonicalUrl(path);
  const canonical = canonicalOverride ?? url;

  const images = image
    ? [
        {
          url: new URL(image.url, seo.site.url).toString(),
          alt: image.alt ?? pageTitle,
          width: 1200,
          height: 630,
        },
      ]
    : undefined;

  return {
    metadataBase,

    title: pageTitle,

    description: pageDescription,

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    keywords: keywords ?? [...seo.keywords],

    authors: authors
      ? authors.map((name) => ({ name }))
      : seo.authors.map((author) => ({ ...author })),

    creator: seo.company.legalName,

    publisher: seo.company.legalName,

    applicationName: seo.site.name,

    alternates: {
      canonical,
      types: {
        "application/rss+xml": [
          { url: canonicalUrl("/rss.xml"), title: `${seo.site.name} — Blog` },
        ],
      },
    },

    openGraph: {
      type,
      locale: seo.site.locale,
      url,
      siteName: seo.site.name,
      title: pageTitle,
      description: pageDescription,
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, authors, tags } : {}),
    },

    twitter: {
      // `summary` renders a bare text row; the large card is what makes a
      // shared link look like anything at all.
      card: images ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
      ...(images ? { images } : {}),
    },

    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export const metadata = createMetadata();
