"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Why Cheela", href: "/why-cheela" },
  { label: "Docs", href: seo.links.docs },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function NpmIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="20"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="M1.5 6h21v12h-6v-9h-3v9h-3v-9H4.5v9h-3V6z" />
    </svg>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A client-side navigation does not unmount the header, so without this the
  // panel stays open over the page the visitor just asked for.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the effect reads — dropping it is what the rule suggests and would stop the panel ever closing on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-bg-page">
      <div className="mx-auto flex h-[72px] max-w-[var(--container-max)] items-center justify-between gap-4 px-5 sm:px-8">
        <Link className="flex shrink-0 items-center gap-2.5" href="/">
          <Image
            alt=""
            className="size-[34px]"
            height={34}
            src="/logo-mark.svg"
            width={34}
          />
          <span className="font-display text-md font-semibold tracking-tight text-fg-primary">
            Cheela Labs
          </span>
        </Link>

        {/* Seven links plus two actions do not fit until well past the tablet
            breakpoint, so the full bar only appears at lg. */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              className={cn(
                "whitespace-nowrap text-sm",
                pathname === item.href
                  ? "font-semibold text-fg-primary"
                  : "text-fg-secondary hover:text-fg-primary",
              )}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            className="flex items-center text-fg-secondary hover:text-fg-primary"
            href={seo.links.npm}
            title="npm"
          >
            <span className="sr-only">npm</span>
            <NpmIcon />
          </a>
          <a
            className="inline-flex items-center rounded-md bg-accent px-[18px] py-2.5 text-sm font-medium text-fg-on-accent transition-transform duration-fast ease-out active:scale-[0.97]"
            href={seo.links.dashboard}
          >
            Get started
          </a>
        </div>

        <button
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex size-10 shrink-0 items-center justify-center rounded-md text-fg-primary lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-border-default bg-bg-page px-5 pb-6 pt-2 sm:px-8 lg:hidden"
          id="mobile-nav"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  className={cn(
                    "block border-b border-border-default py-3.5 text-md",
                    pathname === item.href
                      ? "font-semibold text-fg-primary"
                      : "text-fg-secondary",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <a
              className="inline-flex flex-1 items-center justify-center rounded-md bg-accent px-[18px] py-3 text-sm font-medium text-fg-on-accent transition-transform duration-fast ease-out active:scale-[0.97]"
              href={seo.links.dashboard}
            >
              Get started
            </a>
            <a
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border-default text-fg-secondary"
              href={seo.links.npm}
              title="npm"
            >
              <span className="sr-only">npm</span>
              <NpmIcon />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
