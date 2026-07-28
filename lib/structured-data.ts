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

    publisher: {
      "@id": nodeId("organization"),
    },
  },
];
