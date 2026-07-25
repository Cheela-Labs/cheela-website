import Link from "next/link";
import { Container } from "@/components/ui/container";

const STATS = [
  { value: "15", label: "Capabilities per runtime, avg" },
  { value: "0", label: "Browser automation steps needed" },
  { value: "48ms", label: "Avg capability call time" },
  { value: "99.98%", label: "Gateway uptime" },
];

export function AiNative() {
  return (
    <section className="bg-console-bg py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 font-mono text-xs tracking-wide text-accent">
              AI-NATIVE
            </div>
            <h2 className="mb-6 max-w-[16ch] font-display text-3xl font-bold tracking-tight text-console-fg">
              A new way for agents to use your product.
            </h2>
            <p className="mb-8 text-md leading-relaxed text-console-fg-muted">
              Most products are still built only for humans clicking buttons.
              Cheela exposes what your product does as capabilities an agent can
              call directly — no screen-scraping, no brittle browser automation.
              Just a typed call that does exactly what the button would.
            </p>
            <Link
              href="/why-cheela"
              className="inline-flex items-center rounded-md border border-line-dark-1 px-5 py-2.5 text-sm font-medium text-console-fg hover:bg-white/5"
            >
              Why capabilities, not APIs
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-line-dark-1 bg-console-surface p-6"
              >
                <div className="font-display text-2xl font-bold tracking-tight text-console-fg">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-console-fg-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
