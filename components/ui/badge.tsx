"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "accent" | "success" | "danger" | "warning" | "info" | "neutral";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: Tone;
};

const toneClasses: Record<Tone, string> = {
  accent: "border-accent/30 bg-accent-soft text-accent-strong",
  success: "border-success/30 bg-success/10 text-success",
  danger: "border-danger/30 bg-danger/10 text-danger",
  warning: "border-warning/30 bg-warning/10 text-accent-strong",
  info: "border-info/30 bg-info/10 text-info",
  neutral: "border-border-default bg-bg-sunken text-fg-secondary",
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 font-mono text-2xs font-medium tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
