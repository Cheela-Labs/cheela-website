import { getAllPosts } from "@/lib/blog";
import { seo } from "@/lib/seo";

/**
 * Absolute URLs against the production host, not the request origin — a feed
 * gets copied into readers and aggregators that have no idea which deployment
 * served it, so every link in it has to survive on its own.
 */
function absolute(path: string): string {
  return new URL(path, seo.site.url).toString();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value: string): string {
  // The only sequence that can terminate a CDATA section early.
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function rfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const self = absolute("/rss.xml");
  const updated = posts[0] ? rfc822(posts[0].date) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = absolute(`/blog/${post.slug}`);
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");
      const enclosure = post.image
        ? `\n      <enclosure url="${absolute(post.image)}" type="image/png" length="0" />`
        : "";

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <dc:creator>${cdata(post.author)}</dc:creator>
      <description>${cdata(post.description)}</description>
      <content:encoded>${cdata(post.html)}</content:encoded>${enclosure}
${categories}
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(seo.site.name)} — Blog</title>
    <link>${absolute("/blog")}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(seo.site.description)}</description>
    <language>${seo.site.language}</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <generator>Cheela website</generator>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
