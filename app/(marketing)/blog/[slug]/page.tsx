import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// Every post is known at build time, so render them all statically and let the
// route 404 on anything else rather than serving an empty shell for a URL that
// was never published.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return createMetadata("Not found", undefined, { noindex: true });

  return createMetadata(post.title, post.description, {
    path: `/blog/${post.slug}`,
    type: "article",
    canonical: post.canonical,
    publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
    authors: [post.author],
    tags: post.tags,
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    image: post.image
      ? { url: post.image, alt: post.imageAlt ?? post.title }
      : undefined,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const url = new URL(`/blog/${post.slug}`, seo.site.url).toString();
  const published = new Date(`${post.date}T00:00:00Z`).toISOString();

  const jsonLd: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post.title,
      description: post.description,
      datePublished: published,
      dateModified: published,
      author: { "@type": "Person", name: post.author },
      publisher: { "@id": `${seo.site.url}#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      keywords: post.keywords.join(", "),
      ...(post.image
        ? { image: new URL(post.image, seo.site.url).toString() }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Blog",
          item: new URL("/blog", seo.site.url).toString(),
        },
        { "@type": "ListItem", position: 2, name: post.title, item: url },
      ],
    },
  ];

  // Lifted out of the post body by the loader — see extractFaq.
  if (post.faq) jsonLd.push(post.faq);

  return (
    <article className="pb-24 pt-16">
      <Container narrow>
        <Link
          className="mb-10 inline-flex items-center gap-2 font-mono text-2xs tracking-wide text-fg-tertiary transition-colors duration-base hover:text-accent-strong"
          href="/blog"
        >
          ← BACK TO BLOG
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-2xs tracking-wide text-fg-tertiary">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} MIN READ</span>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="mb-5 font-display text-4xl font-bold tracking-tight text-fg-primary">
            {post.title}
          </h1>
          <p className="text-md leading-relaxed text-fg-secondary">
            {post.description}
          </p>
        </header>

        {/* Content is authored in our own repo, not user-submitted. */}
        <div
          className="post-body"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted first-party markdown
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.tags.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-border-default pt-8">
            {post.tags.map((tag) => (
              <span
                className="rounded-pill border border-border-default px-2.5 py-0.5 text-2xs font-medium text-fg-secondary"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Container>

      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inlined
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </article>
  );
}
