import type { MetadataRoute } from "next";
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
 * Posts are no longer listed here. The blog is a separate host with its own
 * sitemap, and a sitemap may only contain URLs on its own origin — listing
 * blogs.cheelalabs.com from here would be ignored at best.
 */
const ROUTES: { path: string; priority: number; lastModified: string }[] = [
  { path: "/", priority: 1, lastModified: "2026-08-03" },
  { path: "/why-cheela", priority: 0.7, lastModified: "2026-07-25" },
  { path: "/pricing", priority: 0.7, lastModified: "2026-07-25" },
  { path: "/changelog", priority: 0.5, lastModified: "2026-07-27" },
  { path: "/about", priority: 0.5, lastModified: "2026-07-25" },
  { path: "/contact", priority: 0.5, lastModified: "2026-07-25" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, lastModified }) => ({
    url: new URL(path, seo.site.url).toString(),
    lastModified: new Date(`${lastModified}T00:00:00Z`),
    changeFrequency: "weekly" as const,
    priority,
  }));
}
