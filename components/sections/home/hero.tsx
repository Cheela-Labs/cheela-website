import Link from "next/link";
import { TypingTerminal } from "@/components/chrome/terminal-demo";
import { Container } from "@/components/ui/container";
import { seo } from "@/lib/seo";

const TERMINAL_LINES = [
  { text: "$ npx cheela init", tone: "accent" as const },
  { text: "created cheela.config.ts", tone: "muted" as const },
  { text: "✓ ready to deploy", tone: "success" as const },
];

export function Hero() {
  return (
    <section className="pb-24 pt-32 sm:pb-24 sm:pt-32">
      <Container>
        <div className="grid gap-10">
          <div className="font-mono text-xs tracking-wide text-accent-strong">
            INFRASTRUCTURE FOR AGENTS
          </div>
          <h1 className="max-w-[18ch] font-display text-5xl font-bold leading-tight tracking-tight text-fg-primary sm:text-6xl">
            Ship AI-native.
          </h1>
          <p className="max-w-[640px] text-lg leading-relaxed text-fg-secondary">
            Cheela is the routing, evals, and observability layer between your
            application and every model provider you use. Write a capability
            once. Run it on any runtime.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={seo.links.dashboard}
              className="inline-flex items-center rounded-md bg-accent px-6 py-3.5 text-md font-medium text-fg-on-accent transition-transform duration-fast ease-out active:scale-[0.97]"
            >
              Get started
            </a>
            <Link
              href={seo.links.docs}
              className="inline-flex items-center rounded-md border border-border-strong bg-bg-surface px-6 py-3.5 text-md font-medium text-fg-primary transition-colors duration-base hover:bg-bg-sunken"
            >
              Read the docs
            </Link>
          </div>
          <TypingTerminal
            lines={TERMINAL_LINES}
            className="mt-8 max-w-[640px]"
          />
        </div>
      </Container>
    </section>
  );
}
