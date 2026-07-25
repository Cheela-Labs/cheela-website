"use client";

import { type KeyboardEvent, useRef, useState } from "react";

type HistoryLine = {
  text: string;
  tone: "default" | "muted" | "success" | "danger";
};

const CANNED: Record<string, { text: string; tone: HistoryLine["tone"] }> = {
  help: {
    text: 'Commands: help, npx cheela runtime list, npx cheela run "<input>"',
    tone: "muted",
  },
  "npx cheela runtime list": {
    text: "rt_8f2a  openai/gpt-4.1     healthy\nrt_3c1e  anthropic/claude   healthy",
    tone: "default",
  },
};

const toneClasses: Record<HistoryLine["tone"], string> = {
  default: "text-console-fg",
  muted: "text-console-fg-muted",
  success: "text-success",
  danger: "text-danger",
};

export function FakeTerminal() {
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const cmd = value.trim();
    if (!cmd) return;

    const entry: HistoryLine = { text: `$ ${cmd}`, tone: "default" };
    let response: HistoryLine;

    const runMatch = cmd.match(/^npx cheela run "(.+)"$/);
    if (CANNED[cmd]) {
      response = CANNED[cmd];
    } else if (runMatch) {
      response = {
        text: `→ routed to rt_8f2a · capability summarize\n✓ execution complete · 198ms\n"${runMatch[1].slice(0, 40)}..." → 3-sentence summary generated.`,
        tone: "success",
      };
    } else {
      response = {
        text: `command not found: ${cmd} — type help`,
        tone: "danger",
      };
    }

    setHistory((h) => [...h, entry, response]);
    setValue("");
  }

  return (
    <div className="flex h-[420px] cursor-text flex-col rounded-lg bg-ink-0 p-6 shadow-lg">
      <div className="mb-4 flex shrink-0 gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="size-2.5 rounded-full bg-ink-4" />
        <span className="size-2.5 rounded-full bg-ink-4" />
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed">
        <div className="mb-3 text-console-fg-muted">
          Try: help · npx cheela runtime list · npx cheela run "summarize this"
        </div>
        {history.map((line, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: append-only log
            key={i}
            className={`whitespace-pre-wrap ${toneClasses[line.tone]}`}
          >
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 bg-transparent font-mono text-sm text-console-fg outline-none"
          />
          <span className="terminal-cursor text-console-fg">▍</span>
        </div>
      </div>
    </div>
  );
}
