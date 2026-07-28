import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { seo } from "@/lib/seo";

/**
 * `lastModified` is maintained by hand — bump the date when a page's content
 * meaningfully changes, not for a copy tweak.
 *
 * Deriving it automatically is tempting and does not work. `new Date()` claims
 * the whole site changed on every deploy, which teaches Google to ignore the
 * field, so a page that genuinely did change stops getting recrawled any
 * sooner. Reading file mtimes has the same outcome by a longer route: git does
 * not preserve mtimes, so in CI every file carries the checkout time.
 *
 * Posts are exempt — they have a real publication date in their front matter.
 */
const ROUTES: { path: string; priority: number; lastModified: string }[] = [
  { path: "/", priority: 1, lastModified: "2026-07-25" },
  { path: "/why-cheela", priority: 0.7, lastModified: "2026-07-25" },
  { path: "/pricing", priority: 0.7, lastModified: "2026-07-25" },
  { path: "/blog", priority: 0.6, lastModified: "2026-07-27" },
  { path: "/changelog", priority: 0.5, lastModified: "2026-07-27" },
  { path: "/about", priority: 0.5, lastModified: "2026-07-25" },
  { path: "/contact", priority: 0.5, lastModified: "2026-07-25" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = ROUTES.map(({ path, priority, lastModified }) => ({
    url: new URL(path, seo.site.url).toString(),
    lastModified: new Date(`${lastModified}T00:00:00Z`),
    changeFrequency: "weekly" as const,
    priority,
  }));

  const posts = await getAllPosts();

  const postEntries = posts
    // A post canonicalised elsewhere must not appear here: the sitemap would be
    // asking Google to index a URL whose own canonical tag points away from it.
    .filter((post) => post.canonical === undefined)
    .map((post) => ({
      url: new URL(`/blog/${post.slug}`, seo.site.url).toString(),
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticEntries, ...postEntries];
}
