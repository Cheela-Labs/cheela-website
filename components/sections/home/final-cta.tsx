import Link from "next/link";
import { seo } from "@/lib/seo";

export function FinalCta() {
  return (
    <section className="bg-accent px-5 py-32 text-center sm:px-8">
      <div className="mx-auto max-w-[720px]">
        <h2 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink-0">
          Build the layer between models and your product.
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={seo.links.dashboard}
            className="inline-flex items-center rounded-md bg-ink-0 px-6 py-3.5 text-md font-medium text-paper-0 transition-transform duration-fast ease-out active:scale-[0.97]"
          >
            Get started
          </a>
          <Link
            href={seo.links.docs}
            className="inline-flex items-center rounded-md border-[1.5px] border-ink-0 px-6 py-3.5 text-md font-medium text-ink-0"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}
