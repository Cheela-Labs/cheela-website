"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  inverse?: boolean;
  narrow?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  inverse,
  narrow,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-24",
        inverse
          ? "bg-console-bg text-console-fg"
          : "border-t border-border-default",
        className,
      )}
    >
      <Container narrow={narrow}>
        <div className="space-y-10 sm:space-y-12">
          {eyebrow || title || description ? (
            <div className="max-w-3xl space-y-4" data-reveal>
              {eyebrow ? (
                <p
                  className={cn(
                    "font-mono text-xs tracking-wide",
                    inverse ? "text-accent" : "text-accent-strong",
                  )}
                >
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2
                  className={cn(
                    "font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl",
                    inverse ? "text-console-fg" : "text-fg-primary",
                  )}
                >
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p
                  className={cn(
                    "max-w-2xl font-body text-md leading-relaxed",
                    inverse ? "text-console-fg-muted" : "text-fg-secondary",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
