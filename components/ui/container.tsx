"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow
          ? "max-w-[var(--container-narrow)]"
          : "max-w-[var(--container-max)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
