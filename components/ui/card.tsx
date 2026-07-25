"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  label?: string;
} & HTMLAttributes<HTMLElement>;

export function Card({ children, className, label, ...props }: CardProps) {
  return (
    <article
      {...props}
      className={cn(
        "relative rounded-lg border border-border-default bg-bg-surface p-6 shadow-xs transition-shadow duration-base hover:shadow-sm sm:p-8",
        label && "pt-10 sm:pt-11",
        className,
      )}
    >
      {label ? (
        <div className="absolute left-4 top-0 rounded-b-sm border-x border-b border-border-default bg-bg-page px-2.5 py-1.5 font-mono text-2xs font-medium tracking-wide text-accent-strong">
          <span aria-hidden="true" className="mr-1 text-fg-tertiary">
            {"//"}
          </span>
          {label}
        </div>
      ) : null}
      {children}
    </article>
  );
}
