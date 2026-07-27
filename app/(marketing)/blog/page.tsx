import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { formatPostDate, getPostSummaries } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Blog",
  "Engineering notes, product updates, and tutorials from the team building Cheela.",
  { path: "/blog" },
);

export default async function BlogPage() {
  const posts = await getPostSummaries();

  return (
    <>
      <section className="pb-10 pt-20">
        <Container>
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            BLOG
          </div>
          <h1 className="mb-4 max-w-[16ch] font-display text-4xl font-bold tracking-tight text-fg-primary">
            Engineering notes from the team building Cheela.
          </h1>
          <p className="max-w-[56ch] text-md text-fg-secondary">
            Deep dives, product updates, and tutorials. Written by the engineers
            shipping the gateway.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {posts.length === 0 ? (
            <div className="overflow-hidden rounded-lg border border-border-default bg-bg-surface">
              <div className="h-1.5 bg-accent" aria-hidden="true" />
              <div className="p-12">
                <div className="mb-3 font-mono text-2xs tracking-wide text-fg-tertiary">
                  NO POSTS YET
                </div>
                <h2 className="mb-4 max-w-[28ch] font-display text-2xl font-bold tracking-tight text-fg-primary">
                  We haven&apos;t published anything here yet.
                </h2>
                <p className="mb-6 max-w-[56ch] text-sm leading-relaxed text-fg-secondary">
                  The first posts are being written. Subscribe to the feed and
                  they&apos;ll show up as soon as they land.
                </p>
                <a
                  className="inline-flex items-center rounded-pill border border-accent bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-strong transition-colors duration-base hover:border-accent-strong"
                  href="/rss.xml"
                >
                  Subscribe via RSS
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border-default bg-border-default">
              {posts.map((post) => (
                <article
                  className="bg-bg-surface transition-colors duration-base hover:bg-bg-sunken"
                  key={post.slug}
                >
                  <Link
                    className="block p-8 sm:p-10"
                    href={`/blog/${post.slug}`}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-2xs tracking-wide text-fg-tertiary">
                      <time dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingMinutes} MIN READ</span>
                    </div>
                    <h2 className="mb-3 max-w-[34ch] font-display text-2xl font-bold tracking-tight text-fg-primary">
                      {post.title}
                    </h2>
                    <p className="mb-5 max-w-[64ch] text-sm leading-relaxed text-fg-secondary">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          className="rounded-pill border border-border-default px-2.5 py-0.5 text-2xs font-medium text-fg-secondary"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
