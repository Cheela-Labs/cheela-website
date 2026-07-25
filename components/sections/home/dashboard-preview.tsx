import { Container } from "@/components/ui/container";

const SIDEBAR_ITEMS = [
  { label: "Overview", active: true },
  { label: "Runtimes", active: false },
  { label: "Analytics", active: false },
  { label: "Settings", active: false },
];

const METRICS = [
  { label: "Requests", value: "48,204", delta: "46,110 completed" },
  { label: "Runtimes", value: "6", delta: "5 healthy" },
  { label: "Avg latency", value: "212ms", delta: "across executions" },
  { label: "Tokens", value: "18.2M", delta: "up 12% this week" },
];

const EXECUTIONS = [
  { id: "ex_7f3a9c", runtime: "rt_8f2a", status: "completed", ok: true },
  { id: "ex_912bd0", runtime: "rt_3c1e", status: "completed", ok: true },
  { id: "ex_00af2e", runtime: "rt_8f2a", status: "failed", ok: false },
];

export function DashboardPreview() {
  return (
    <section className="border-t border-border-default py-24" data-reveal>
      <Container>
        <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
          DASHBOARD
        </div>
        <h2 className="mb-4 max-w-[16ch] font-display text-3xl font-bold tracking-tight text-fg-primary">
          Your inference layer at a glance.
        </h2>
        <p className="mb-10 max-w-[56ch] text-md leading-relaxed text-fg-secondary">
          Every runtime, execution, and token accounted for — the control plane
          Cheela ships with, not a demo built for a screenshot.
        </p>
        <div className="grid overflow-hidden rounded-lg border border-line-dark-1 shadow-lg md:grid-cols-[220px_1fr]">
          <div className="hidden bg-console-bg p-4 md:block">
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.label}
                className={
                  item.active
                    ? "mb-0.5 rounded-md bg-accent/15 px-4 py-3 text-sm text-console-fg"
                    : "mb-0.5 rounded-md px-4 py-3 text-sm text-console-fg-muted"
                }
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="bg-console-bg p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="font-mono text-2xs tracking-wide text-accent">
                  OVERVIEW
                </div>
                <div className="text-lg font-semibold text-console-fg">
                  Control plane
                </div>
              </div>
              <div className="rounded-md bg-accent px-3.5 py-2 text-xs font-medium text-ink-0">
                + Register runtime
              </div>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-md border border-console-border bg-white/[0.02] p-4"
                >
                  <div className="text-xs text-console-fg-muted">{m.label}</div>
                  <div className="my-1 text-xl font-semibold tracking-tight text-console-fg">
                    {m.value}
                  </div>
                  <div className="text-2xs text-accent">{m.delta}</div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-md border border-console-border">
              <div className="grid grid-cols-4 gap-4 bg-white/[0.02] px-4 py-3 font-mono text-2xs tracking-wide text-console-fg-muted">
                <span>EXECUTION</span>
                <span>RUNTIME</span>
                <span>STATUS</span>
                <span>DURATION</span>
              </div>
              {EXECUTIONS.map((ex) => (
                <div
                  key={ex.id}
                  className="grid grid-cols-4 gap-4 border-t border-console-border px-4 py-3 font-mono text-xs text-console-fg"
                >
                  <span>{ex.id}</span>
                  <span className="text-console-fg-muted">{ex.runtime}</span>
                  <span className={ex.ok ? "text-success" : "text-danger"}>
                    {ex.status}
                  </span>
                  <span className="text-console-fg-muted">
                    {ex.ok ? "212ms" : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
