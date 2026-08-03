import path from "node:path";
import type { NextConfig } from "next";

/** Where the blog moved to. Kept here so every redirect below reads one value. */
const BLOG_ORIGIN = "https://blogs.cheelalabs.com";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(__dirname, "../.."),
  },

  /**
   * The blog moved to its own host. These are permanent because the old URLs
   * were indexed and linked — a 302 would leave the ranking on a path that no
   * longer serves anything.
   *
   * Order matters, and the two `/blog/*` rules are not interchangeable:
   *
   * - a post is one segment (`/blog/my-post`) and loses the `/blog` prefix,
   *   because the blog owns its own host now and the segment means nothing
   *   there;
   * - media is two or more (`/blog/<topic>/images/x.png`) and keeps its path,
   *   because `resolveMedia` still serves images under `/blog/` on the new
   *   host. Collapsing both into one catch-all sends every social-card image
   *   to a URL that does not exist.
   */
  async redirects() {
    return [
      {
        source: "/blog",
        destination: `${BLOG_ORIGIN}/`,
        permanent: true,
      },
      {
        // Two or more segments — media. `:path+` not `:path*`: the star form
        // matches zero segments too, so it captured `/blog/my-post` as
        // topic="my-post" with an empty tail and sent every post to
        // `/blog/my-post` on the new host, where nothing serves that path.
        source: "/blog/:topic/:path+",
        destination: `${BLOG_ORIGIN}/blog/:topic/:path+`,
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: `${BLOG_ORIGIN}/:slug`,
        permanent: true,
      },
      {
        // Feed readers poll this for years after a move.
        source: "/rss.xml",
        destination: `${BLOG_ORIGIN}/rss.xml`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
