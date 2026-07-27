import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Pricing",
  "Simple pricing. No surprises. Priced by usage, per workspace.",
  { path: "/pricing" },
);

const TIERS = [
  {
    name: "Free",
    price: "$0",
    priceSub: "forever",
    cta: "Start for free",
    inverse: false,
    features: ["1 runtime", "100 executions / hour", "Community support"],
  },
  {
    name: "Pro",
    price: "$50",
    priceSub: "per month",
    cta: "Get Pro",
    inverse: true,
    features: [
      "10 runtimes",
      "2,000 executions / hour",
      "Insights analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact us",
    priceSub: "custom pricing",
    cta: "Contact sales",
    inverse: false,
    features: [
      "Unlimited runtimes",
      "Custom executions / hour",
      "Insights analytics",
      "Priority support",
    ],
  },
];

const COMPARE_ROWS = [
  {
    label: "Capability executions / hour",
    free: "100",
    pro: "2,000",
    ent: "Custom",
  },
  { label: "Hourly rollover", free: "2 hours", pro: "24 hours", ent: "Custom" },
  { label: "Runtimes", free: "1", pro: "10", ent: "Unlimited" },
  { label: "Analytics", free: "Overview", pro: "Insights", ent: "Insights" },
  { label: "Log retention", free: "7 days", pro: "90 days", ent: "Custom" },
  { label: "Community support", free: "✓", pro: "✓", ent: "✓" },
  { label: "Priority support", free: "✗", pro: "✓", ent: "✓" },
];

const FAQS = [
  {
    q: "How is a capability execution counted?",
    a: "Every time your app calls a capability — like summarize or classify_ticket — that's one execution, no matter how many steps the model takes to complete it.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes — upgrades apply immediately, downgrades apply at the start of your next billing cycle.",
  },
  {
    q: "What happens if I go over my hourly limit?",
    a: "Free and Pro workspaces get a rollover buffer (2 hours on Free, 24 hours on Pro) to absorb short bursts. Enterprise plans set custom limits with no rollover cap.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pb-12 pt-24 text-center">
        <Container>
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            PRICING
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-fg-primary">
            Simple pricing. No surprises.
          </h1>
          <p className="text-md text-fg-secondary">
            Priced by usage, per workspace. Every plan includes the full CLI,
            SDK, and observability.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={
                  tier.inverse
                    ? "flex flex-col rounded-lg border border-accent bg-console-bg p-8 text-console-fg"
                    : "flex flex-col rounded-lg border border-border-default bg-bg-surface p-8 text-fg-primary"
                }
              >
                <div className="mb-3 text-sm font-semibold">{tier.name}</div>
                <div className="font-display text-3xl font-bold tracking-tight">
                  {tier.price}
                </div>
                <div
                  className={
                    tier.inverse
                      ? "mb-6 text-sm text-console-fg-muted"
                      : "mb-6 text-sm text-fg-tertiary"
                  }
                >
                  {tier.priceSub}
                </div>
                <Link
                  href={
                    tier.name === "Enterprise"
                      ? "/contact#get-started"
                      : seo.links.dashboard
                  }
                  className={
                    tier.inverse
                      ? "mb-8 block rounded-md bg-accent py-2.5 text-center text-sm font-medium text-ink-0"
                      : "mb-8 block rounded-md bg-bg-sunken py-2.5 text-center text-sm font-medium"
                  }
                >
                  {tier.cta}
                </Link>
                <div
                  className={
                    tier.inverse
                      ? "flex flex-col gap-3 border-t border-line-dark-1 pt-6"
                      : "flex flex-col gap-3 border-t border-border-default pt-6"
                  }
                >
                  {tier.features.map((f) => (
                    <div key={f} className="flex gap-2 text-sm">
                      <span
                        className={
                          tier.inverse ? "text-accent" : "text-success"
                        }
                      >
                        ✓
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-fg-primary">
            Compare plans
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border-default">
            <div className="grid min-w-[520px] grid-cols-4 gap-4 bg-bg-sunken px-6 py-4 text-xs tracking-wide text-fg-tertiary">
              <span>FEATURE</span>
              <span>FREE</span>
              <span>PRO</span>
              <span>ENTERPRISE</span>
            </div>
            {COMPARE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid min-w-[520px] grid-cols-4 items-center gap-4 border-t border-border-default px-6 py-4 text-sm"
              >
                <span className="text-fg-primary">{row.label}</span>
                <span className="text-fg-secondary">{row.free}</span>
                <span className="text-fg-secondary">{row.pro}</span>
                <span className="text-fg-secondary">{row.ent}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container narrow>
          <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-fg-primary">
            Pricing FAQ
          </h2>
          <div className="flex flex-col gap-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-t border-border-default pt-5">
                <div className="mb-2 text-md font-semibold text-fg-primary">
                  {faq.q}
                </div>
                <div className="text-sm leading-relaxed text-fg-secondary">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
