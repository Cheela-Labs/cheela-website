import { Container } from "@/components/ui/container";

const PROVIDERS = ["OpenAI", "Anthropic", "Google Gemini", "OpenRouter"];

export function Solution() {
  return (
    <section className="bg-console-bg py-24" data-reveal>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 font-mono text-xs tracking-wide text-accent">
              WITH CHEELA
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight tracking-tight text-console-fg">
              One gateway. Every model.
            </h2>
            <p className="text-md leading-relaxed text-console-fg-muted">
              Cheela sits between your application and your model providers. You
              write capabilities once — Cheela handles routing, retries, evals,
              and observability for every runtime you register.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-md border border-line-dark-1 bg-console-surface px-6 py-4 font-mono text-sm text-console-fg">
              Your app
            </div>
            <div className="h-8 w-px bg-line-dark-2" aria-hidden="true" />
            <div className="rounded-md border border-accent bg-accent px-6 py-4 font-mono text-sm font-medium text-ink-0">
              Cheela gateway
            </div>
            <div className="h-8 w-px bg-line-dark-2" aria-hidden="true" />
            <div className="flex flex-wrap justify-center gap-3">
              {PROVIDERS.map((provider) => (
                <div
                  key={provider}
                  className="rounded-sm border border-line-dark-1 bg-console-surface px-4 py-2 font-mono text-xs text-console-fg-muted"
                >
                  {provider}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
