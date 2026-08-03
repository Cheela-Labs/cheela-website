import { nodeId, seo, siteUrl } from "./seo";

/**
 * The site's entity graph, emitted once from the root layout.
 *
 * Every id goes through `nodeId` so that a reference from anywhere else — a
 * post's `publisher`, a breadcrumb's parent — resolves to the same node.
 * Previously these were built by string concatenation against a `seo.site.url`
 * that ends in a slash, yielding `…com//#organization`, so references written
 * the obvious way pointed at a node that did not exist.
 */
export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": nodeId("organization"),

    name: "Cheela Labs",
    url: siteUrl("/"),
    logo: siteUrl(seo.images.logo),
    description: seo.site.description,
    foundingDate: seo.company.foundingDate,

    // Both values already exist in `seo.ts` and were simply not reaching the
    // graph. `contactPoint` is what lets a knowledge panel show a way to get in
    // touch rather than just a link.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: seo.company.email,
      url: siteUrl("/contact"),
    },

    sameAs: [seo.social.github, seo.social.linkedin, seo.social.x],
  },

  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": nodeId("website"),

    url: siteUrl("/"),
    name: "Cheela Labs",
    description: seo.site.description,

    publisher: {
      "@id": nodeId("organization"),
    },
  },

  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": nodeId("software"),

    name: "Cheela",
    url: siteUrl("/"),
    description: seo.site.description,

    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",

    /**
     * The published plans, and only the published plans.
     *
     * Google treats `offers` as required for a SoftwareApplication, and it was
     * absent — so the node asserted a product with no commercial terms while
     * `/pricing` listed three tiers.
     *
     * Enterprise is deliberately not here. It is "Contact us"; an `Offer`
     * without a price is meaningless and inventing one would be a lie about
     * what the page says. Two real offers describe the product honestly.
     *
     * There is no `aggregateRating` or `review` either. Those are what produce
     * star ratings, and Cheela has no reviews to aggregate. Fabricating them is
     * both a policy violation and the single most common way a rich result gets
     * a manual action.
     */
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        url: siteUrl("/pricing"),
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "50",
        priceCurrency: "USD",
        url: siteUrl("/pricing"),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "50",
          priceCurrency: "USD",
          // Per month, stated in the way Google reads recurring pricing.
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
      },
    ],

    publisher: {
      "@id": nodeId("organization"),
    },
  },
];

/**
 * Home → this page.
 *
 * Two levels, because the site is two levels. Every marketing page hangs
 * directly off the homepage; there are no section indexes to name, and Google
 * requires `item` on every entry but the last, so inventing one would mean
 * emitting a URL that 404s.
 */
export function breadcrumbSchema(options: { title: string; path: string }) {
  const url = siteUrl(options.path);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,

    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: options.title },
    ],
  };
}

/**
 * A single marketing page, typed.
 *
 * `AboutPage` and `ContactPage` are real schema.org types that say what a page
 * is for; `WebPage` is the honest fallback for everything else. None of these
 * produce a rich result on their own — the value is that a crawler reading the
 * graph can tell the contact page from the pricing page without parsing prose.
 */
export function pageSchema(options: {
  type: "WebPage" | "AboutPage" | "ContactPage";
  title: string;
  description: string;
  path: string;
}) {
  const url = siteUrl(options.path);

  return {
    "@context": "https://schema.org",
    "@type": options.type,
    "@id": `${url}#page`,

    name: options.title,
    description: options.description,
    url,
    inLanguage: seo.site.language,

    isPartOf: { "@id": nodeId("website") },
    about: { "@id": nodeId("software") },
    publisher: { "@id": nodeId("organization") },
  };
}

/**
 * Question-and-answer content.
 *
 * **This will not produce a rich result.** Google restricted FAQ rich results
 * in August 2023 to well-known government and health sites; for a SaaS
 * marketing page it renders nothing in search, and any guide promising
 * otherwise predates that change.
 *
 * It is emitted anyway because the cost is a few hundred bytes and the
 * audience has shifted: assistants and AI search read structured Q&A to answer
 * directly, and this is the one page that already holds real questions with
 * real answers. If that stops being worth it, delete the call — nothing else
 * depends on it.
 */
export function faqSchema(options: {
  path: string;
  questions: readonly { q: string; a: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl(options.path)}#faq`,

    mainEntity: options.questions.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: { "@type": "Answer", text: entry.a },
    })),
  };
}
