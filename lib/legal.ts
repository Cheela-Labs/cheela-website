/**
 * The facts every legal page states, in one place.
 *
 * These are the only things in the legal pages that cannot be derived from the
 * codebase, and they are the ones that must not be guessed — a legal document
 * naming the wrong entity or the wrong court is worse than no document. The
 * rest of each page describes what the system actually does, and that part was
 * written from the code rather than from a template.
 *
 * ⚠️ FILL THESE IN BEFORE PUBLISHING. `operator.name` and `operator.address`
 * are placeholders. `isPublishable()` below is what the pages check; while it is
 * false every page renders a visible warning instead of pretending to be in
 * force.
 *
 * These pages are a drafting starting point, not legal advice. Have a lawyer
 * admitted in your jurisdiction review them before they go live.
 */

export const legal = {
  /**
   * The party to these documents.
   *
   * There is no company. Cheela Labs is a trading name used by an individual,
   * so the contracting party is that person and there is no separate legal
   * entity between them and a customer — which the Terms say plainly rather
   * than implying a company that does not exist.
   *
   * The practical consequence is that the liability cap in the Terms is
   * contractual only. It is not backed by a corporate structure, so it does not
   * separate personal assets from the business the way incorporation would.
   */
  operator: {
    /** Full legal name of the individual operating the service. */
    name: "[YOUR FULL LEGAL NAME]",
    /** Address for legal notice. Required on the documents; use a business address if you have one. */
    address: "[ADDRESS FOR NOTICE]",
    /** Trading name used throughout the product. Not a registered mark. */
    tradingName: "Cheela Labs",
  },

  /** ISO date these terms take effect. Shown on every page. */
  effectiveDate: "[EFFECTIVE DATE]",

  jurisdiction: {
    country: "India",
    /** City whose courts have exclusive jurisdiction, e.g. "Bengaluru, Karnataka". */
    courts: "[CITY, STATE]",
  },

  contact: {
    general: "hello@cheelalabs.com",
    support: "support@cheelalabs.com",
    security: "security@cheelalabs.com",
    /**
     * Abuse reports. No dedicated mailbox exists yet, so this points at
     * support until one does — an address in a published policy that bounces
     * is worse than one that is merely shared.
     */
    abuse: "support@cheelalabs.com",
    privacy: "support@cheelalabs.com",
  },
} as const;

/** True once the placeholders above have been replaced. */
export function isPublishable(): boolean {
  return ![
    legal.operator.name,
    legal.operator.address,
    legal.effectiveDate,
    legal.jurisdiction.courts,
  ].some((value) => value.startsWith("["));
}

export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
};

/**
 * The six documents, in the order the footer lists them.
 *
 * Kept here rather than in the footer so the sitemap, the footer and the
 * index page cannot disagree about which documents exist.
 */
export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    description: "The agreement between you and Cheela Labs.",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "What we collect, why, how long we keep it, and who else sees it.",
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    description: "What you may not do with Cheela, and what happens if you do.",
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description:
      "Every cookie the site and dashboard set, and how to refuse them.",
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    description: "How payments, cancellation and refunds work.",
  },
  {
    slug: "ai-policy",
    title: "AI Policy",
    description: "How model output behaves, and who is responsible for it.",
  },
];

/**
 * Third parties that process data on our behalf.
 *
 * Read off the codebase rather than assembled from memory, so the Privacy
 * Policy names what actually runs. Keep it in step with what is deployed —
 * every entry here is something a customer's data genuinely reaches.
 */
export const SUBPROCESSORS = [
  {
    name: "SuperTokens",
    purpose: "Authentication and session management",
    data: "Email address, hashed password, session tokens, OAuth identifiers",
  },
  {
    name: "MongoDB Atlas",
    purpose: "Primary database",
    data: "Account records, runtime metadata, execution traces, usage counters",
  },
  {
    name: "OpenRouter",
    purpose: "Model inference",
    data: "The messages your application sends for an execution, in transit",
  },
  {
    name: "Razorpay",
    purpose: "Payment processing",
    data: "Payment and card details, collected by Razorpay directly — never by us",
  },
  {
    name: "Resend",
    purpose: "Transactional email",
    data: "Email address, message content of verification emails",
  },
  {
    name: "Vercel",
    purpose: "Hosting for the website, dashboard, docs and blog",
    data: "Request logs, IP addresses",
  },
  {
    name: "Railway",
    purpose: "Hosting for the API",
    data: "Request logs, IP addresses",
  },
  {
    name: "Cloudflare",
    purpose: "DNS",
    data: "DNS query metadata",
  },
  {
    name: "Google Analytics",
    purpose: "Website analytics — loaded only after you consent",
    data: "Pseudonymous usage events, IP address (truncated)",
  },
] as const;
