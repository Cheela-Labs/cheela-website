import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Why Cheela",
  "Why make applications AI-native? The reasoning behind Cheela's platform.",
  { path: "/why-cheela" },
);

const QUESTIONS = [
  {
    title: "Why not integrate directly with every AI provider?",
    body: "Direct integrations mean every provider outage, rate limit, and API change becomes your incident. Cheela absorbs that surface area — you register a runtime once, and routing, retries, and failover are handled underneath your application code.",
  },
  {
    title: "Why capabilities instead of traditional APIs?",
    body: 'A capability describes what your agent can do — "classify a ticket", "summarize a document" — independent of which model executes it. That means you can swap gpt-4.1 for claude or a fine-tuned model on another provider without touching a single call site.',
  },
  {
    title: "Why does observability need to be built in, not bolted on?",
    body: "Most teams only find out an agent is misbehaving after a customer complains. Cheela traces every execution — inputs, outputs, latency, and eval scores — by default, so you see drift before it ships.",
  },
  {
    title: "Why Cheela over existing solutions?",
    body: "Most tools solve one piece: a proxy, a prompt manager, or a logging dashboard. Cheela is the full path from your application to the model and back — one gateway, one SDK, one place to look when something breaks.",
  },
];

export default function WhyCheelaPage() {
  return (
    <>
      <section className="pb-16 pt-32">
        <Container narrow>
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            WHY CHEELA
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-fg-primary sm:text-5xl">
            Why make applications AI-native?
          </h1>
          <p className="text-lg leading-relaxed text-fg-secondary">
            Because the model layer changes faster than any application should
            have to. Cheela exists so your product logic doesn't have to be
            rewritten every time a better model ships.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container narrow>
          <div className="flex flex-col gap-20">
            {QUESTIONS.map((q) => (
              <div
                key={q.title}
                className="border-t border-border-default pt-8"
              >
                <h2 className="mb-5 max-w-[24ch] text-2xl font-bold tracking-tight text-fg-primary">
                  {q.title}
                </h2>
                <p className="text-md leading-relaxed text-fg-secondary">
                  {q.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-console-bg py-24">
        <Container narrow>
          <div className="text-center">
            <p className="mb-8 font-display text-2xl font-medium leading-tight tracking-tight text-console-fg">
              "We built Cheela because every team we talked to was solving the
              same routing and observability problems from scratch. One gateway
              config replaces all of it."
            </p>
            <div className="text-sm text-console-fg-muted">
              Viren Tanti, Founder
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 text-center">
        <Container>
          <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-fg-primary">
            See how it works.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={seo.links.docs}
              className="inline-flex items-center rounded-md bg-accent px-6 py-3.5 text-md font-medium text-fg-on-accent"
            >
              Read the docs
            </Link>
            <Link
              href={seo.links.dashboard}
              className="inline-flex items-center rounded-md border border-border-strong px-6 py-3.5 text-md font-medium text-fg-primary"
            >
              Open the dashboard
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
