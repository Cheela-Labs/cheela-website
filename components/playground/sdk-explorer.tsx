"use client";

import { useState } from "react";

const CODE = `import { Cheela } from "@cheela/sdk";

const cheela = new Cheela();
const result: ExecutionResult = await cheela.run("summarize this doc");

console.log(result.output);`;

export function SdkExplorer() {
  const [runOutput, setRunOutput] = useState("not run yet");

  function runCode() {
    setRunOutput("running…");
    window.setTimeout(() => {
      setRunOutput(
        '✓ 212ms · "This document covers the Cheela gateway routing model, capability definitions, and how evals attach to every execution."',
      );
    }, 700);
  }

  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-lg border border-border-default">
      <div className="border-b border-border-default px-4 py-2.5">
        <span className="rounded-md bg-bg-sunken px-3 py-1.5 text-xs font-medium text-fg-primary">
          TypeScript
        </span>
      </div>
      <pre className="flex-1 overflow-y-auto whitespace-pre-wrap bg-ink-1 p-6 font-mono text-sm text-console-fg">
        {CODE}
      </pre>
      <div className="flex items-center justify-between border-t border-line-dark-1 bg-ink-1 px-5 py-4">
        <span className="font-mono text-xs text-console-fg-muted">
          {runOutput}
        </span>
        <button
          type="button"
          onClick={runCode}
          className="rounded-md bg-accent px-[18px] py-2 text-sm font-medium text-ink-0 transition-transform duration-fast ease-out active:scale-[0.97]"
        >
          Run
        </button>
      </div>
    </div>
  );
}
