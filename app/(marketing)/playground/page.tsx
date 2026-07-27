import type { Metadata } from "next";
import Link from "next/link";
import { FakeTerminal } from "@/components/playground/fake-terminal";
import { SdkExplorer } from "@/components/playground/sdk-explorer";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Playground",
  "Experience Cheela before you write a line of code — a live terminal and SDK explorer.",
  { path: "/playground" },
);

export default function PlaygroundPage() {
  return (
    <>
      <section className="px-5 pb-10 pt-20 text-center sm:px-8">
        <Container>
          <div className="mb-4 font-mono text-xs tracking-wide text-accent-strong">
            PLAYGROUND
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-fg-primary">
            Experience Cheela before you write a line of code.
          </h1>
          <p className="mx-auto max-w-[56ch] text-md text-fg-secondary">
            A live terminal and SDK explorer, running against sandboxed sample
            data. No account required.
          </p>
        </Container>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-xs tracking-wide text-fg-tertiary">
                INTERACTIVE CLI
              </div>
              <FakeTerminal />
            </div>
            <div>
              <div className="mb-3 text-xs tracking-wide text-fg-tertiary">
                SDK EXPLORER
              </div>
              <SdkExplorer />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-console-bg px-5 py-20 text-center sm:px-8">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-console-fg">
          Ready to run this against your own models?
        </h2>
        <Link
          href={seo.links.dashboard}
          className="inline-flex rounded-md bg-accent px-6 py-3.5 text-md font-medium text-ink-0"
        >
          Get started
        </Link>
      </section>
    </>
  );
}
