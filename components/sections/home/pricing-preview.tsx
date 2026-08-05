import Link from "next/link";
import { Container } from "@/components/ui/container";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    features: ["1 runtime", "100 executions / hour"],
    cta: "Start for free",
    inverse: false,
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: ["10 runtimes", "2,000 executions / hour", "Priority support"],
    cta: "Start Pro trial",
    inverse: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: ["Dedicated gateway", "SSO + audit logs", "Custom SLAs"],
    cta: "Contact sales",
    inverse: false,
  },
];

export function PricingPreview() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="mb-12 text-center">
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            PRICING
          </div>
          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-fg-primary">
            Simple pricing. No surprises.
          </h2>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-fg-primary hover:bg-bg-sunken"
          >
            Compare plans
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.inverse
                  ? "rounded-lg border border-accent bg-console-bg p-8 text-console-fg"
                  : "rounded-lg border border-border-default bg-bg-surface p-8 text-fg-primary"
              }
            >
              <div className="mb-4 text-sm font-semibold">{tier.name}</div>
              <div className="mb-6 font-display text-3xl font-bold tracking-tight">
                {tier.price}
              </div>
              <div className="mb-8 flex flex-col gap-3">
                {tier.features.map((f) => (
                  <div key={f} className="text-sm opacity-85">
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/pricing"
                className={
                  tier.inverse
                    ? "block rounded-md bg-accent py-2.5 text-center text-sm font-medium text-ink-0"
                    : "block rounded-md bg-bg-sunken py-2.5 text-center text-sm font-medium"
                }
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
