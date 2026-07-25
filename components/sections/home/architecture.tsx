import { Container } from "@/components/ui/container";

const RUNTIMES = [
  "gpt-4.1 · openai",
  "claude · anthropic",
  "gemini · google",
  "any model · openrouter",
];

export function Architecture() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
          ARCHITECTURE
        </div>
        <h2 className="mb-12 max-w-[18ch] font-display text-3xl font-bold tracking-tight text-fg-primary">
          Cheela orchestrates. Your infrastructure executes.
        </h2>
        <div className="rounded-lg border border-border-default bg-bg-surface p-8 sm:p-12">
          <div className="flex flex-col items-center justify-center gap-0 lg:flex-row">
            <div className="rounded-md border border-border-strong px-6 py-5 text-center font-mono text-sm">
              Your application
            </div>
            <div
              className="h-8 w-px bg-border-strong lg:h-px lg:w-14"
              aria-hidden="true"
            />
            <div className="rounded-md border-[1.5px] border-accent bg-accent-soft px-6 py-6 text-center">
              <div className="mb-2 font-mono text-sm font-semibold">
                Cheela gateway
              </div>
              <div className="flex justify-center gap-2">
                {["Routing", "Evals", "Observability"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-pill bg-bg-surface px-2 py-0.5 text-2xs text-accent-strong"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="h-8 w-px bg-border-strong lg:h-px lg:w-14"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-2">
              {RUNTIMES.map((rt) => (
                <div
                  key={rt}
                  className="rounded-md border border-border-strong px-5 py-3 font-mono text-xs"
                >
                  {rt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
