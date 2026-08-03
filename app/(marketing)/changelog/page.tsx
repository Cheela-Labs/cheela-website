import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata(
  "Changelog",
  "A transparent history of what changed in the gateway, CLI, and SDK.",
  { path: "/changelog" },
);

export default function ChangelogPage() {
  const jsonLd = [
    pageSchema({
      type: "WebPage",
      title: "Changelog",
      description: metadata.description as string,
      path: "/changelog",
    }),
    breadcrumbSchema({ title: "Changelog", path: "/changelog" }),
  ];

  return (
    <>
      <JsonLd nodes={jsonLd} />
      <section className="pb-24 pt-20">
        <Container narrow>
          <div className="mb-16">
            <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
              CHANGELOG
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-fg-primary">
              Every meaningful release, documented.
            </h1>
            <p className="text-md text-fg-secondary">
              A transparent history of what changed in the gateway, CLI, and
              SDK.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-border-default bg-bg-surface">
            <div className="h-1.5 bg-accent" aria-hidden="true" />
            <div className="p-12">
              <div className="mb-3 font-mono text-2xs tracking-wide text-fg-tertiary">
                ALPHA
              </div>
              <h2 className="mb-4 max-w-[28ch] font-display text-2xl font-bold tracking-tight text-fg-primary">
                Cheela is in alpha. We&apos;re launching soon.
              </h2>
              <p className="mb-6 max-w-[56ch] text-sm leading-relaxed text-fg-secondary">
                There are no public releases to document yet. Once we ship,
                every version lands here with what changed and what it breaks.
              </p>
              <a
                className="inline-flex items-center rounded-pill border border-accent bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-strong transition-colors duration-base hover:border-accent-strong"
                href="/rss.xml"
              >
                Subscribe via RSS
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
