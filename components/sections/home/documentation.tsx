import Link from "next/link";
import { Container } from "@/components/ui/container";
import { seo } from "@/lib/seo";

const DOC_CARDS = [
  {
    title: "Getting started",
    desc: "Install the CLI and run your first capability in under five minutes.",
  },
  {
    title: "API reference",
    desc: "Every endpoint, request shape, and status code Cheela returns.",
  },
  {
    title: "CLI",
    desc: "Register runtimes, tail logs, and ship config changes from the shell.",
  },
  {
    title: "Examples",
    desc: "Working capability definitions for common agent patterns.",
  },
];

export function Documentation() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
              DOCUMENTATION
            </div>
            <h2 className="max-w-[18ch] font-display text-3xl font-bold tracking-tight text-fg-primary">
              Docs written by the people who built it.
            </h2>
          </div>
          <Link
            href={seo.links.docs}
            className="link-accent text-sm font-medium"
          >
            Browse all docs →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOC_CARDS.map((card) => (
            <Link
              key={card.title}
              href={seo.links.docs}
              className="block rounded-lg border border-border-default bg-bg-surface p-6 transition-colors duration-base hover:border-accent"
            >
              <div className="mb-2 text-md font-semibold text-fg-primary">
                {card.title}
              </div>
              <div className="text-sm leading-relaxed text-fg-secondary">
                {card.desc}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
