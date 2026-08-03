import { Container } from "@/components/ui/container";
import { seo } from "@/lib/seo";

/**
 * A pointer, not a preview.
 *
 * This section used to render three hard-coded post cards — titles, categories
 * and read times for articles that were never written, each linking to the
 * index rather than to anything. Now that the blog lives on its own host, the
 * website cannot read posts at all, and the honest options were a manually
 * synced list that goes stale the first time somebody publishes without
 * remembering this file, or one link that is always correct. This is the
 * second.
 */
export function BlogPreview() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="overflow-hidden rounded-lg border border-border-default bg-bg-surface">
          <div aria-hidden="true" className="h-1.5 bg-accent" />
          <div className="flex flex-wrap items-end justify-between gap-6 p-10 sm:p-12">
            <div>
              <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
                BLOG
              </div>
              <h2 className="mb-3 max-w-[20ch] font-display text-3xl font-bold tracking-tight text-fg-primary">
                Engineering notes from the team building Cheela.
              </h2>
              <p className="max-w-[52ch] text-sm leading-relaxed text-fg-secondary">
                Deep dives on agent discovery, the capability model, and what we
                got wrong on the way here.
              </p>
            </div>
            <a
              className="inline-flex shrink-0 items-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-fg-on-accent transition-transform duration-fast ease-out active:scale-[0.97]"
              href={seo.links.blog}
            >
              Read the blog →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
