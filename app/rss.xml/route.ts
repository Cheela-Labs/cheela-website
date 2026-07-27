import { getSiteUrl } from "@/lib/seo";

export async function GET() {
  const siteUrl = getSiteUrl("/");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Cheela</title>
    <link>${siteUrl}</link>
    <description>Open platform for building reliable AI agents.</description>
    <language>en</language>
    <!-- Intentionally item-less: nothing is published yet. An empty channel is
         valid RSS, so subscribers can add the feed now and get the first post
         when it lands. Items come from the MDX loader once the blog is built. -->
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
