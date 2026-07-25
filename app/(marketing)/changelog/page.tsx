import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Changelog",
  "A transparent history of what changed in the gateway, CLI, and SDK.",
);

const ENTRIES = [
  {
    date: "Jul 18, 2026",
    version: "v0.14.0",
    title: "Streaming evals + capability retries",
    items: [
      {
        tag: "NEW",
        tone: "accent" as const,
        text: "Eval scores now stream alongside execution output instead of arriving after completion.",
      },
      {
        tag: "FIX",
        tone: "danger" as const,
        text: "Capability retries no longer double-count tokens in the usage dashboard.",
      },
    ],
  },
  {
    date: "Jul 2, 2026",
    version: "v0.13.0",
    title: "Faster failover, new providers",
    items: [
      {
        tag: "NEW",
        tone: "accent" as const,
        text: "Register Google Vertex and Azure OpenAI endpoints as runtimes alongside OpenAI and Anthropic.",
      },
      {
        tag: "IMPROVED",
        tone: "info" as const,
        text: "Gateway failover time reduced from 800ms to 120ms on provider timeout.",
      },
    ],
  },
  {
    date: "Jun 15, 2026",
    version: "v0.12.0",
    title: "Team roles and audit logs",
    items: [
      {
        tag: "NEW",
        tone: "accent" as const,
        text: "Pro and Enterprise workspaces can now assign viewer, member, and admin roles.",
      },
      {
        tag: "NEW",
        tone: "accent" as const,
        text: "Every config change is now written to an exportable audit log.",
      },
    ],
  },
];

const tagToneClasses = {
  accent: "bg-accent-soft text-accent-strong",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info",
};

export default function ChangelogPage() {
  return (
    <section className="pb-24 pt-20">
      <Container narrow>
        <div className="mb-16">
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            CHANGELOG
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-fg-primary">
            Every meaningful release, documented.
          </h1>
          <p className="text-md text-fg-secondary">
            A transparent history of what changed in the gateway, CLI, and SDK.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {ENTRIES.map((entry) => (
            <div
              key={entry.version}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr] sm:gap-8"
            >
              <div>
                <div className="text-sm text-fg-tertiary">{entry.date}</div>
                <span className="mt-3 inline-block rounded-pill bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-strong">
                  {entry.version}
                </span>
              </div>
              <div className="border-t border-border-default pt-1 sm:border-t-0 sm:pt-0">
                <h2 className="mb-4 text-xl font-bold tracking-tight text-fg-primary">
                  {entry.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {entry.items.map((item) => (
                    <div
                      key={item.text}
                      className="flex gap-3 text-sm leading-relaxed text-fg-secondary"
                    >
                      <span
                        className={`h-fit shrink-0 rounded-sm px-2 py-0.5 text-2xs font-medium ${tagToneClasses[item.tone]}`}
                      >
                        {item.tag}
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
