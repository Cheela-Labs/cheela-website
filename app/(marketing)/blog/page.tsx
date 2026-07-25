import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Blog",
  "Engineering notes, product updates, and tutorials from the team building Cheela.",
);

const CATEGORIES = ["All", "Engineering", "Evals", "Product", "Company"];

const FEATURED = {
  category: "ENGINEERING",
  readTime: "6 MIN",
  title: "How we route 40M requests a day without a queue",
  excerpt:
    "The scheduler behind Cheela's runtime router, and why we avoided a message broker entirely.",
  author: "Priya Raman",
  date: "Jul 14, 2026",
};

const POSTS = [
  {
    category: "Evals",
    readTime: "4 min",
    title: "Grading agent output without writing a single rubric",
    excerpt:
      "A look at the eval pipeline that runs on every execution by default.",
    author: "Dev Nair",
    date: "Jul 9, 2026",
  },
  {
    category: "Product",
    readTime: "3 min",
    title: "Why we built capabilities instead of another SDK",
    excerpt:
      "The reasoning behind treating model calls as typed capabilities, not raw completions.",
    author: "Priya Raman",
    date: "Jul 2, 2026",
  },
  {
    category: "Engineering",
    readTime: "7 min",
    title: "Zero-downtime runtime failover, end to end",
    excerpt:
      "What happens on the gateway in the 400ms after a provider starts returning 503s.",
    author: "Marcus Webb",
    date: "Jun 26, 2026",
  },
  {
    category: "Company",
    readTime: "2 min",
    title: "Cheela raises a seed round to build the AI-native stack",
    excerpt: "What the funding changes, and what it doesn't.",
    author: "Priya Raman",
    date: "Jun 18, 2026",
  },
  {
    category: "Engineering",
    readTime: "5 min",
    title: "Token accounting across five providers, one schema",
    excerpt:
      "Normalizing usage metering so your bill makes sense regardless of runtime.",
    author: "Dev Nair",
    date: "Jun 10, 2026",
  },
  {
    category: "Evals",
    readTime: "6 min",
    title: "Catching silent regressions before your users do",
    excerpt:
      "How the eval pipeline flags a model swap before it reaches production traffic.",
    author: "Marcus Webb",
    date: "Jun 2, 2026",
  },
];

export default function BlogPage() {
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

      <section className="pb-8">
        <Container>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat, i) => (
              <span
                key={cat}
                className={
                  i === 0
                    ? "rounded-pill border border-accent bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-strong"
                    : "rounded-pill border border-border-default px-4 py-1.5 text-sm font-medium text-fg-secondary"
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="overflow-hidden rounded-lg border border-border-default bg-console-bg md:grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-12">
              <div className="mb-4 text-2xs tracking-wide text-accent">
                FEATURED · {FEATURED.category} · {FEATURED.readTime}
              </div>
              <h2 className="mb-4 max-w-[22ch] font-display text-2xl font-bold tracking-tight text-console-fg">
                {FEATURED.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-console-fg-muted">
                {FEATURED.excerpt}
              </p>
              <div className="text-xs text-console-fg-muted">
                {FEATURED.author} · {FEATURED.date}
              </div>
            </div>
            <div className="hidden items-center justify-center bg-ink-0 p-8 font-mono text-sm text-console-fg-muted md:flex">
              <div>
                <div>router.select(runtime, load)</div>
                <div className="text-accent">→ p50 8ms dispatch</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <div
                key={post.title}
                className="overflow-hidden rounded-lg border border-border-default bg-bg-surface transition-colors duration-base hover:border-accent"
              >
                <div className="h-1.5 bg-accent" aria-hidden="true" />
                <div className="p-6">
                  <div className="mb-3 text-2xs tracking-wide text-fg-tertiary">
                    {post.category} · {post.readTime}
                  </div>
                  <div className="mb-2 text-md font-semibold leading-snug text-fg-primary">
                    {post.title}
                  </div>
                  <div className="mb-4 text-sm leading-relaxed text-fg-secondary">
                    {post.excerpt}
                  </div>
                  <div className="text-xs text-fg-tertiary">
                    {post.author} · {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
