# AGENT.md

# Cheela Website

## Mission

You are building the official website for **Cheela**, infrastructure for AI agents — routing, evals, and observability between an application and every model provider it uses.

This is **not** a marketing website.

It should feel like the homepage of a world-class developer infrastructure company.

Imagine if Stripe, Vercel, Linear, Raycast and Anthropic collaborated on a developer-first product.

The website should communicate engineering excellence, simplicity, precision and trust.

Avoid generic AI startup aesthetics.

---

# Philosophy

Everything should feel intentional.

Animations are subtle.

Whitespace is generous.

Typography is large.

The design should breathe.

Users should immediately think:

> "These people know what they're doing."

Never over-design.

Never add visual elements that don't contribute to the experience.

---

# Tech Stack

Use:

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`)
- Lucide (icons)
- class-variance-authority is NOT used — variant styling is plain `Record<Variant, string>` lookups + the shared `cn()` helper
- tailwind-merge
- clsx
- Biome

Do not use CSS modules.

Do not use styled-components.

Do not use Chakra.

Do not use MUI.

Everything should be built with Tailwind.

---

# Code Quality

- Strict TypeScript
- Zero ESLint errors
- Zero Biome warnings
- Accessible components
- Semantic HTML
- Mobile-first
- Reusable components
- No duplicated styles
- No magic numbers
- No inline styles unless absolutely required

Every component should be composable.

---

# Theme

Light by default, with dark "console" bands for contrast (solution/CLI/AI-native sections on Home, pull-quotes, footer). No gradients, no photography — solid colors only.

All tokens live in `app/globals.css`'s `@theme` block (colors, fonts, type scale, spacing aliases, radius, shadows, easing/duration) and are consumed as Tailwind utilities (`bg-accent`, `text-fg-primary`, `font-display`), not arbitrary-value classes.

Paper / ink neutrals:

- `--color-paper-0` `#FFFFFF` → `--color-paper-3` `#E8E6E0`
- `--color-ink-0` `#050505` → `--color-ink-6` `#95959C`

Accent (single warm orange, sampled from the logo mark):

- `--color-orange-600` `#FFA600` — the only accent color in the system
- Aliases: `accent` / `accent-strong` / `accent-soft`

Console sub-palette (dark bands + the dashboard app):

- `console-bg` `#0E0E10`, `console-surface`, `console-border`, `console-fg`, `console-fg-muted`

Semantic: `success` `#1F8B4C`, `danger` `#D3402B`, `warning` (= accent), `info` `#2B6CD3`.

Accent should only be used where attention is required. Do not overuse orange.

---

# Typography

Use **Ranade** (self-hosted variable font, weights 100–900) for both display and body — one typeface, weight does the work of hierarchy.

Use **JetBrains Mono** for anything code-adjacent: endpoints, keys, logs, terminal output, tiny uppercase eyebrow labels.

Type scale (all exposed as Tailwind `text-*` utilities via `@theme`):

- `text-6xl` 120px (rarely used) / `text-5xl` 88px (page h1) / `text-4xl` 64px / `text-3xl` 48px (section h2)
- `text-2xl` 36px / `text-xl` 28px / `text-lg` 22px / `text-md` 18px (body/lede)
- `text-base` 16px / `text-sm` 14px / `text-xs` 12px / `text-2xs` 11px (eyebrows, tags)

Display text uses tight/negative letter-spacing (`tracking-tight`, -0.03em) and tight line-height (`leading-tight`, 1.05). Body text uses `leading-relaxed` (1.65) for reading comfort.

Eyebrow labels (`INFRASTRUCTURE FOR AGENTS`, `WITHOUT CHEELA`) are already-uppercase copy set in `font-mono` + `tracking-wide` — do not apply a CSS `uppercase` transform, the copy itself is written in caps.

Spacing should be generous.

---

# Radius

- Buttons / inputs / cards: `radius-md` (12px) or `radius-lg` (16px) for cards
- Pills: `radius-pill` (999px) — reserved for tags, badges, and switches only, never buttons

---

# Shadows

Very subtle. `shadow-xs`/`shadow-sm` for resting surfaces. `shadow-md`/`shadow-lg` only for lifted surfaces (dialogs, popovers, hero terminal). Never large blurry shadows.

---

# Layout

Container: `max-width: var(--container-max)` (1200px), or `var(--container-narrow)` (760px) for long-form text pages (About, Why Cheela, Changelog, Contact).

Section padding: `py-24` (96px), `py-32` (128px) for hero/final-CTA bands.

Card padding: `p-6`–`p-8`.

---

# Folder Structure

```
app/
  (marketing)/          — layout.tsx (NavBar + SiteFooter) + one page.tsx per route
    page.tsx            — Home
    about/, why-cheela/, pricing/, blog/, changelog/, contact/, playground/
  fonts/                — self-hosted Ranade-Variable.ttf
components/
  chrome/                — NavBar, SiteFooter, TerminalWindow/TypingTerminal
  sections/home/         — one file per Home section (hero, problem, solution, ...)
  ui/                    — Button, Badge, Card, CodeBlock, Container, Section
  contact/, playground/  — page-specific interactive pieces
lib/
public/
```

Every UI primitive should exist before sections are built.

---

# Design System

Reusable components:

Button, Badge, Card, Section (with `inverse`/`narrow` variants), Container, CodeBlock, TerminalWindow/TypingTerminal.

Everything should be reusable — new pages compose from these rather than hand-rolling markup.

---

# Motion

Motion is a first-class part of the design, but restrained: 120–280ms, standard/out easing. Buttons scale to `0.97` on press — never a color-darkening hover, never bounce or spring.

Never add random animations. Every animation must have purpose.

Motion should feel:

- smooth
- premium
- deliberate
- restrained

Never bouncy. Never playful. Never exaggerated.

---

# Motion Principles

- Entrance: fade + slight upward translate (`[data-reveal]`, driven by `animation-timeline: view()`, falls back to visible when unsupported)
- Hover: border/background change only — no color-darkening on solid buttons
- Terminal / typing effects: used sparingly (Home hero, CLI section, Playground) via the shared `TypingTerminal` component

---

# Navbar

Sticky, 72px tall, shared across every marketing route via `(marketing)/layout.tsx`. Logo mark + wordmark left, 8-item nav center (active item derived from `usePathname()`, not a prop), npm icon + "Get started" (→ dashboard app) right.

---

# Sections (Home)

12 sections, each its own file under `components/sections/home/`: Hero, Problem, Solution, How It Works, Architecture, CLI Experience, Dashboard Preview, Documentation, Blog Preview, AI-Native, Pricing Preview, Final CTA.

Build each section independently — a section should not depend on another section's internal state.

---

# Cards

Border-first, not shadow-first: `border border-border-default`, `shadow-xs` at rest, subtle `shadow-sm` on hover — no color-darkening border on hover.

---

# Buttons

Solid `radius-md`, `text-sm font-medium`, scale-to-0.97 on press. Variants: primary (solid accent), secondary/outline (bordered), ghost (transparent, sunken fill on hover), link (text only).

---

# Icons

Use **Lucide** (1.5–1.7px stroke, 24px grid). No icon font, no emoji, no unicode-glyph icons.

---

# Images

No photography, no hand-drawn illustration, no repeating patterns/textures, no gradients. The only image asset is the logo mark (`/logo-mark.svg`, `/logo.png`).

---

# Visual Language

Solid colors only. Thin 1px borders as the primary separator. Numbers over adjectives in copy (`212ms p50 latency`, not "blazing fast"). Sentence case everywhere, including headlines and buttons.

---

# Inspiration

Stripe, Vercel, Linear, Raycast, Anthropic — developer-first, typography-led, restrained motion.

---

# Accessibility

Keyboard navigation.

Focus states.

ARIA where required.

Proper contrast.

Respect prefers-reduced-motion.

---

# Performance

Lighthouse target

100 Accessibility · 100 Best Practices · 100 SEO

Use lazy loading. Avoid unnecessary JavaScript. Minimize layout shift.

---

# SEO

Metadata, OpenGraph, Twitter Cards, JSON-LD, Sitemap, robots.txt, RSS, canonical URLs, structured data — all wired through `lib/metadata.ts` (`createMetadata()`) and `lib/seo.ts` (`seo` const).

---

# Responsiveness

Desktop first. Tablet. Mobile. No horizontal scrolling. Every component must adapt.

---

# Animation Budget

Do not animate everything. Motion should guide attention. If an animation doesn't improve understanding, remove it.

---

# Design Goal

This website should not look like an AI startup.

It should look like the homepage of a company building the future infrastructure for AI agents.

Every interaction should reinforce reliability, craftsmanship and engineering excellence.
