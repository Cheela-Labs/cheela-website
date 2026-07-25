import { TypingTerminal } from "@/components/chrome/terminal-demo";
import { Container } from "@/components/ui/container";

const TERMINAL_LINES = [
  { text: "$ npx cheela deploy", tone: "accent" as const },
  { text: "✓ runtime rt_8f2a deployed · v3", tone: "success" as const },
  { text: "$ npx cheela status", tone: "accent" as const },
  { text: "→ 5 of 6 runtimes healthy", tone: "muted" as const },
  { text: "✓ gateway p50 212ms", tone: "success" as const },
];

export function CliExperience() {
  return (
    <section className="bg-console-bg py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 font-mono text-xs tracking-wide text-accent">
              CLI
            </div>
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-console-fg">
              From zero to your first execution in a terminal.
            </h2>
            <p className="text-md leading-relaxed text-console-fg-muted">
              Install the CLI, register a runtime, and run your first capability
              without leaving the shell.
            </p>
          </div>
          <TypingTerminal lines={TERMINAL_LINES} className="min-h-[260px]" />
        </div>
      </Container>
    </section>
  );
}
