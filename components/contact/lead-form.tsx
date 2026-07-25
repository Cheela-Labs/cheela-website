"use client";

import { useState } from "react";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Work email"
        required
        className="w-full rounded-md border border-border-strong bg-bg-surface px-3.5 py-3 text-sm text-fg-primary focus:border-accent focus:shadow-focus focus:outline-none"
      />
      <input
        type="text"
        placeholder="Company"
        className="w-full rounded-md border border-border-strong bg-bg-surface px-3.5 py-3 text-sm text-fg-primary focus:border-accent focus:shadow-focus focus:outline-none"
      />
      <textarea
        rows={4}
        placeholder="What are you building with Cheela?"
        className="w-full rounded-md border border-border-strong bg-bg-surface px-3.5 py-3 text-sm text-fg-primary focus:border-accent focus:shadow-focus focus:outline-none"
      />
      <button
        type="submit"
        className="self-start rounded-md bg-accent px-[22px] py-2.5 text-sm font-medium text-ink-0 transition-transform duration-fast ease-out active:scale-[0.97]"
      >
        {submitted ? "Sent — we'll be in touch" : "Send"}
      </button>
    </form>
  );
}
