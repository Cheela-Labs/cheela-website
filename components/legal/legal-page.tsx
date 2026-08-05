import type { ReactNode } from "react";
import JsonLd from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { isPublishable, legal } from "@/lib/legal";
import { breadcrumbSchema, pageSchema } from "@/lib/structured-data";

/**
 * Shared frame for the six legal documents.
 *
 * One layout so the six cannot drift apart typographically, and one place that
 * decides what happens while `lib/legal.ts` still holds placeholders: a banner
 * saying so, rather than a document that reads as though it is in force while
 * naming "[REGISTERED ENTITY NAME]" as a party.
 */
export function LegalPage({
  title,
  description,
  slug,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  children: ReactNode;
}) {
  const ready = isPublishable();

  return (
    <>
      <JsonLd
        nodes={[
          pageSchema({ type: "WebPage", title, description, path: `/${slug}` }),
          breadcrumbSchema({ title, path: `/${slug}` }),
        ]}
      />

      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-[720px]">
          <header className="mb-12 border-b border-line-1 pb-8">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-ink-6">{description}</p>
            <p className="mt-6 text-sm text-ink-6">
              {ready ? (
                <>
                  Effective {legal.effectiveDate} · {legal.operator.name}
                </>
              ) : (
                <>Draft — not yet in force</>
              )}
            </p>
          </header>

          {ready ? null : (
            <div className="mb-12 rounded-lg border border-orange-600/30 bg-orange-100/60 p-5 text-sm">
              <strong className="font-semibold">
                This document is a draft and is not in force.
              </strong>{" "}
              The registered entity name, address, effective date and governing
              court have not been filled in yet — see{" "}
              <code>apps/website/lib/legal.ts</code>. It has not been reviewed
              by a lawyer.
            </div>
          )}

          <div className="legal-prose space-y-8">{children}</div>

          <footer className="mt-16 border-t border-line-1 pt-8 text-sm text-ink-6">
            <p>
              Questions about this document:{" "}
              <a
                className="underline underline-offset-4"
                href={`mailto:${legal.contact.general}`}
              >
                {legal.contact.general}
              </a>
            </p>
          </footer>
        </div>
      </Container>
    </>
  );
}

/** A numbered section. Anchored so a clause can be linked to directly. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={id}>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">
        <a className="hover:underline" href={`#${id}`}>
          {title}
        </a>
      </h2>
      <div className="space-y-3 text-ink-6 leading-relaxed">{children}</div>
    </section>
  );
}

/** Bulleted list with the spacing the rest of the document uses. */
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static prose, never reordered
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
