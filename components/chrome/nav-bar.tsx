"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Why Cheela", href: "/why-cheela" },
  { label: "Docs", href: seo.links.docs },
  { label: "Playground", href: "/playground" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-bg-page">
      <div className="mx-auto flex h-[72px] max-w-[var(--container-max)] flex-wrap items-center justify-between gap-4 px-5 sm:gap-8 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo-mark.svg"
            alt=""
            width={34}
            height={34}
            className="size-[34px]"
          />
          <span className="font-display text-md font-semibold tracking-tight text-fg-primary">
            Cheela Labs
          </span>
        </Link>

        <nav className="order-3 flex flex-wrap items-center gap-4 overflow-x-auto sm:order-none sm:gap-6">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-sm",
                  active
                    ? "font-semibold text-fg-primary"
                    : "text-fg-secondary hover:text-fg-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href="https://www.npmjs.com/package/@cheela/cli"
            title="npm"
            className="flex items-center text-fg-secondary hover:text-fg-primary"
          >
            <span className="sr-only">npm</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1.5 6h21v12h-6v-9h-3v9h-3v-9H4.5v9h-3V6z" />
            </svg>
          </a>
          <a
            href={seo.links.dashboard}
            className="inline-flex items-center rounded-md bg-accent px-[18px] py-2.5 text-sm font-medium text-fg-on-accent transition-transform duration-fast ease-out active:scale-[0.97]"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
