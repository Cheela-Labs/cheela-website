import { Container } from "@/components/ui/container";

const ROWS = [
  { label: "openai-sdk@4.x", issue: "per-provider auth" },
  { label: "anthropic-sdk@0.2x", issue: "per-provider retries" },
  { label: "custom-retry.ts", issue: "no shared traces" },
  { label: "retry-wrapper.go", issue: "unmonitored" },
];

export function Problem() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 font-mono text-xs tracking-wide text-fg-tertiary">
              WITHOUT CHEELA
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight tracking-tight text-fg-primary">
              Every provider is its own integration.
            </h2>
            <p className="text-md leading-relaxed text-fg-secondary">
              A different SDK for every model. Retry logic copy-pasted across
              services. No shared view of what your agents are actually doing
              once they reach production.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-md border border-border-default bg-bg-surface px-5 py-4"
              >
                <span className="font-mono text-sm text-fg-primary">
                  {row.label}
                </span>
                <span className="text-xs text-danger">{row.issue}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
