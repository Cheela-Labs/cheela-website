"use client";

import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg bg-ink-1 p-8 shadow-lg", className)}>
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="size-2.5 rounded-full bg-ink-4" />
      </div>
      {children}
    </div>
  );
}

type TerminalTone = "default" | "muted" | "accent" | "success";

export type TerminalLine = { text: string; tone?: TerminalTone };

const toneClasses: Record<TerminalTone, string> = {
  default: "text-console-fg",
  muted: "text-console-fg-muted",
  accent: "text-accent",
  success: "text-success",
};

export function TypingTerminal({
  lines,
  className,
}: {
  lines: TerminalLine[];
  className?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const id = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= lines.length) {
          window.clearInterval(id);
          return count;
        }
        return count + 1;
      });
    }, 260);
    return () => window.clearInterval(id);
  }, [lines]);

  const done = visibleCount >= lines.length;

  return (
    <TerminalWindow className={className}>
      <div className="font-mono text-sm leading-relaxed">
        {lines.slice(0, visibleCount).map((line) => (
          <div key={line.text} className={toneClasses[line.tone ?? "default"]}>
            {line.text}
          </div>
        ))}
        {done ? <span className="terminal-cursor text-accent">▍</span> : null}
      </div>
    </TerminalWindow>
  );
}
