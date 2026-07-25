import { Container } from "@/components/ui/container";

const STEPS = [
  {
    n: "01",
    title: "Define a capability",
    body: "Describe what your agent can do — not which model runs it.",
  },
  {
    n: "02",
    title: "Register a runtime",
    body: "Connect any model provider through one config file.",
  },
  {
    n: "03",
    title: "Call it from your app",
    body: "POST /v1/executions — the same request shape every time.",
  },
  {
    n: "04",
    title: "Cheela orchestrates",
    body: "Routing, evals, retries, and traces happen automatically.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="mb-12 font-mono text-xs tracking-wide text-accent-strong">
          HOW CHEELA WORKS
        </div>
        <h2 className="mb-12 max-w-[16ch] font-display text-3xl font-bold tracking-tight text-fg-primary">
          Four steps between your code and a model.
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="border-t-2 border-accent pt-5">
              <div className="mb-3 font-mono text-sm text-fg-tertiary">
                {step.n}
              </div>
              <h3 className="mb-2 text-md font-semibold text-fg-primary">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-fg-secondary">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
