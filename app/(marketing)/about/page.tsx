import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "About",
  "Cheela Labs builds the layer between models and products.",
);

const PRINCIPLES = [
  {
    title: "Built for one developer at a time",
    body: "Every feature ships because a real developer needed it to get unstuck — not because it looked good on a roadmap.",
  },
  {
    title: "Numbers over adjectives",
    body: "We'd rather show you p50 latency than tell you we're fast.",
  },
  {
    title: "Open by default",
    body: "The runtime and CLI are MIT-licensed. You should be able to read the code that routes your traffic.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 pt-32">
        <Container narrow>
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            ABOUT
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-fg-primary sm:text-5xl">
            Infrastructure for agents.
          </h1>
          <p className="text-lg leading-relaxed text-fg-secondary">
            Cheela Labs builds the layer between models and products. I started
            the company because every team I talked to was solving the same
            routing, eval, and observability problems from scratch.
          </p>
        </Container>
      </section>

      <section className="pb-16">
        <Container narrow>
          <div className="flex flex-col gap-8">
            <p className="text-md leading-relaxed text-fg-secondary">
              My mission with Cheela is simple: make it possible for any
              application to become AI-native without rebuilding it around a
              single model provider. Teams shouldn't have to choose their
              architecture based on which model happens to be best this month.
            </p>
            <p className="text-md leading-relaxed text-fg-secondary">
              I believe the model layer will keep changing faster than any
              single application should have to. So Cheela is designed for that:
              capabilities instead of hardcoded API calls, a runtime abstraction
              instead of a provider SDK, and observability that's on by default
              instead of bolted on after an incident.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-console-bg py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title}>
                <h3 className="mb-3 text-md font-semibold text-console-fg">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-console-fg-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <h2 className="mb-10 font-display text-2xl font-bold tracking-tight text-fg-primary">
            Team
          </h2>
          <div className="flex items-center gap-5">
            <div className="size-[88px] shrink-0 rounded-md bg-bg-sunken" />
            <div>
              <div className="text-md font-semibold text-fg-primary">
                Viren Tanti
              </div>
              <div className="text-sm text-fg-tertiary">Founder</div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
