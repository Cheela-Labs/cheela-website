"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";

const baseClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-2.5 font-body text-sm font-medium transition-transform duration-fast ease-out active:scale-[0.97] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-fg-on-accent",
  secondary:
    "border border-border-strong bg-bg-surface text-fg-primary hover:bg-bg-sunken",
  outline:
    "border border-border-strong bg-transparent text-fg-primary hover:bg-bg-sunken",
  ghost: "text-fg-secondary hover:bg-bg-sunken hover:text-fg-primary",
  link: "min-h-0 rounded-none px-0 py-0 text-accent-strong hover:text-accent",
};

type ButtonCommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButtonProps = ButtonCommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchorProps = ButtonCommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButtonProps | ButtonAsAnchorProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = cn(baseClassName, variantClasses[variant], className);

  if ("href" in props && props.href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a className={classes} {...anchorProps} href={props.href}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
