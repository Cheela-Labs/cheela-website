import { structuredData } from "@/lib/structured-data";

/**
 * Emits JSON-LD nodes as separate `<script>` tags.
 *
 * With no props it emits the site graph — Organization, WebSite,
 * SoftwareApplication — which is how the root layout uses it. Pages pass their
 * own nodes instead: a breadcrumb, a page type, an FAQ.
 *
 * One tag per node rather than a single `@graph` array. Both are valid, and
 * separate tags mean a page can add nodes without it and the layout having to
 * agree on how to merge them.
 */
export default function JsonLd({
  nodes = structuredData,
}: {
  nodes?: readonly Record<string, unknown>[];
}) {
  return (
    <>
      {nodes.map((schema, index) => (
        <script
          // `@id` where there is one — every node here has one, and the index
          // keeps this honest if a node without an id is ever passed.
          key={(schema["@id"] as string) ?? index}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
