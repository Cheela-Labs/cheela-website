"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  title: string;
  language: string;
  copyText: string;
  children: ReactNode;
  className?: string;
};

export function CodeBlock({
  title,
  language,
  copyText,
  children,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line-dark-1 bg-ink-1 text-console-fg shadow-lg",
        className,
      )}
    >
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-line-dark-1 bg-ink-2 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-4" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-4" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-4" />
          </span>
          <span className="ml-2 font-mono text-xs tracking-wide text-console-fg-muted">
            <span className="font-semibold text-console-fg">{title}</span>
            <span aria-hidden="true"> :: </span>
            <span>{language}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-8 items-center gap-1 rounded-md px-2 font-mono text-2xs font-medium tracking-wide text-accent transition-colors hover:text-console-fg"
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="min-h-[420px] overflow-x-auto p-5 font-mono text-sm leading-relaxed text-console-fg-muted sm:p-7">
        <code>{children}</code>
      </pre>
    </div>
  );
}
