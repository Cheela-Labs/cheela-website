import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";

const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/why-cheela", priority: 0.7 },
  { path: "/pricing", priority: 0.7 },
  { path: "/blog", priority: 0.6 },
  { path: "/changelog", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
  { path: "/playground", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: new URL(path, seo.site.url).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
