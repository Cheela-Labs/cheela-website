import type { Metadata } from "next";

export const siteName = "Cheela";
export const siteDescription =
  "Cheela is an open platform for building reliable AI agents.";
export const siteKeywords = [
  "Cheela",
  "AI agents",
  "agent runtime",
  "developer infrastructure",
  "observability",
  "runtime policy",
  "TypeScript",
];

export function getVerificationMetadata(): Metadata["verification"] {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();
  const yandex = process.env.YANDEX_VERIFICATION?.trim();

  const verification: Metadata["verification"] = {};

  if (google) {
    verification.google = google;
  }

  if (yandex) {
    verification.yandex = yandex;
  }

  if (bing) {
    verification.other = {
      ...(verification.other ?? {}),
      "msvalidate.01": bing,
    };
  }

  return Object.keys(verification).length > 0 ? verification : undefined;
}

export const seo = {
  site: {
    name: "Cheela Labs",
    shortName: "Cheela",
    title: "Cheela Labs | Infrastructure for AI Agents",
    description:
      "Build production-ready AI agents with provider-agnostic runtimes, SDKs, and developer infrastructure.",
    url: "https://www.cheelalabs.com/",
    domain: "cheelalabs.com",
    locale: "en_US",
    language: "en",
    themeColor: "#11110F",
  },

  social: {
    github: "https://github.com/Cheela-Labs",
    linkedin: "https://www.linkedin.com/company/cheela-labs",
    x: "https://x.com/CheelaLabs",
  },

  images: {
    logo: "/logo.png",
    favicon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  company: {
    legalName: "Cheela Labs",
    foundingDate: "2026",
    email: "Contact@cheelalabs.com",
  },

  keywords: [
    "AI",
    "Artificial Intelligence",
    "AI Infrastructure",
    "AI Agents",
    "Agent Runtime",
    "Agent Framework",
    "Developer Tools",
    "TypeScript",
    "SDK",
    "Provider Agnostic",
    "OpenAI",
    "Anthropic",
    "Gemini",
    "MCP",
    "Model Context Protocol",
    "LangChain",
    "CrewAI",
    "Mastra",
    "LlamaIndex",
    "AI Runtime",
    "Agent SDK",
    "AI Platform",
    "AI Engineering",
    "Cheela",
    "Cheela Labs",
  ],

  links: {
    /** Its own host since the blog moved out of this app. */
    blog: "https://blogs.cheelalabs.com",
    docs: "https://docs.cheelalabs.com",
    dashboard: "https://dashboard.cheelalabs.com",
    github: "https://github.com/cheela-labs",
    npm: "https://www.npmjs.com/package/@cheela/cli",
  },

  authors: [
    {
      name: "Cheela Labs",
      // www, not the apex — the apex 308s, and a redirect hop here dilutes the
      // signal for the URL that should actually rank.
      url: "https://www.cheelalabs.com",
    },
  ],
} as const;

/**
 * Absolute URL on the canonical production host.
 *
 * This deliberately does not consult SITE_URL or VERCEL_URL. Deriving the
 * origin from the environment is what put `https://cheela.virentanti.in` into
 * the live homepage's Organization, WebSite, SoftwareApplication and
 * BreadcrumbList nodes — a stale env var silently rebranded the entity Google
 * had been building. Structured data and canonicals describe the site's
 * identity, which does not vary per deployment, so they are pinned to one host.
 *
 * Note the single-slash join: `seo.site.url` carries a trailing slash, so the
 * template-literal concatenation this replaces produced ids like
 * `…cheelalabs.com//#organization`, which no other node's reference matched.
 */
export function siteUrl(pathname = "/"): string {
  return new URL(pathname, seo.site.url).toString();
}

/** Stable JSON-LD node id: `organization` → `https://…/#organization`. */
export function nodeId(fragment: string): string {
  return `${siteUrl("/")}#${fragment.replace(/^#/, "")}`;
}
