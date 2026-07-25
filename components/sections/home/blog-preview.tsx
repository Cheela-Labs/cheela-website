import Link from "next/link";
import { Container } from "@/components/ui/container";

const POSTS = [
  {
    category: "Engineering",
    readTime: "6 min",
    title: "How we route 40M requests a day without a queue",
    excerpt:
      "The scheduler behind Cheela's runtime router, and why we avoided a message broker entirely.",
  },
  {
    category: "Evals",
    readTime: "4 min",
    title: "Grading agent output without writing a single rubric",
    excerpt:
      "A look at the eval pipeline that runs on every execution by default.",
  },
  {
    category: "Product",
    readTime: "3 min",
    title: "Why we built capabilities instead of another SDK",
    excerpt:
      "The reasoning behind treating model calls as typed capabilities, not raw completions.",
  },
];

export function BlogPreview() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
              BLOG
            </div>
            <h2 className="max-w-[18ch] font-display text-3xl font-bold tracking-tight text-fg-primary">
              Engineering notes from the team building Cheela.
            </h2>
          </div>
          <Link href="/blog" className="link-accent text-sm font-medium">
            Read the blog →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="/blog"
              className="block overflow-hidden rounded-lg border border-border-default bg-bg-surface"
            >
              <div className="h-2 bg-accent" aria-hidden="true" />
              <div className="p-6">
                <div className="mb-3 text-2xs tracking-wide text-fg-tertiary">
                  {post.category} · {post.readTime}
                </div>
                <div className="mb-2 text-md font-semibold leading-snug text-fg-primary">
                  {post.title}
                </div>
                <div className="text-sm leading-relaxed text-fg-secondary">
                  {post.excerpt}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
