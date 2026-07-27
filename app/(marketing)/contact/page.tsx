import type { Metadata } from "next";
import { LeadForm } from "@/components/contact/lead-form";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Contact",
  "Talk to the Cheela Labs team — general inquiries, support, security, and GitHub.",
  { path: "/contact" },
);

const CHANNELS = [
  {
    title: "General inquiries",
    desc: "Questions about the product or partnerships.",
    contact: "hello@cheelalabs.com",
    href: "mailto:hello@cheelalabs.com",
  },
  {
    title: "Support",
    desc: "Already building with Cheela and need help.",
    contact: "support@cheelalabs.com",
    href: "mailto:support@cheelalabs.com",
  },
  {
    title: "Security",
    desc: "Report a vulnerability or ask about compliance.",
    contact: "security@cheelalabs.com",
    href: "mailto:security@cheelalabs.com",
  },
  {
    title: "GitHub",
    desc: "Report an issue or browse the source.",
    contact: "github.com/cheela-labs",
    href: "https://github.com/cheela-labs",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="px-5 pb-8 pt-20 sm:px-8">
        <Container>
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            CONTACT
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fg-primary">
            Talk to the team.
          </h1>
        </Container>
      </section>

      <section className="px-5 pb-20 pt-8 sm:px-8">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-border-default p-6"
              >
                <div className="mb-2 text-sm font-semibold text-fg-primary">
                  {c.title}
                </div>
                <div className="mb-4 text-sm leading-relaxed text-fg-secondary">
                  {c.desc}
                </div>
                <a
                  href={c.href}
                  className="font-mono text-sm text-accent-strong hover:text-accent"
                >
                  {c.contact}
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="get-started"
        className="bg-console-bg px-5 py-24 sm:px-8"
        style={{ scrollMarginTop: "96px" }}
      >
        <div className="mx-auto max-w-[600px]">
          <div className="mb-4 font-mono text-xs tracking-wide text-accent">
            GET STARTED
          </div>
          <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-console-fg">
            Tell us what you're building.
          </h2>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
