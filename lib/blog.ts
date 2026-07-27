import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  keywords: string[];
  /** Absolute site path to the social image, or undefined. */
  image?: string;
  imageAlt?: string;
  /** Set only when the piece was published elsewhere first. */
  canonical?: string;
  readingMinutes: number;
  html: string;
  /** FAQPage JSON-LD lifted out of the body, if the post carried one. */
  faq?: unknown;
};

export type PostSummary = Omit<Post, "html" | "faq">;

/**
 * GitHub's heading-anchor algorithm. The posts hand-write tables of contents
 * that link to `#the-problem-ads-actually-solves` and friends, so these have to
 * match GitHub's output exactly or every TOC link is dead on arrival.
 */
function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}

function stripMarkdown(value: string): string {
  return value
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
}

/**
 * Posts carry a `<details>` block holding FAQPage JSON-LD, written to be pasted
 * into a `<head>`. Lift it into real structured data and drop the block: a
 * script tag shown as prose is noise to the reader and invisible to a crawler.
 */
function extractFaq(markdown: string): { markdown: string; faq?: unknown } {
  // The summary itself contains markup (`<code>&lt;head&gt;</code>`), so this
  // has to be able to span tags rather than stopping at the first `<`.
  const block =
    /<details>\s*<summary>[\s\S]*?JSON-LD[\s\S]*?<\/summary>[\s\S]*?<\/details>/i;
  const match = markdown.match(block);
  if (!match) return { markdown };

  const json = match[0].match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );

  let faq: unknown;
  if (json?.[1]) {
    try {
      faq = JSON.parse(json[1]);
    } catch {
      // Malformed JSON-LD is not worth failing a build over — the post still
      // renders, it just ships without the FAQ rich-result hint.
      faq = undefined;
    }
  }

  return { markdown: markdown.replace(block, "").trimEnd(), faq };
}

function createRenderer(topic: string) {
  const marked = new Marked({ gfm: true, breaks: false });
  const used = new Map<string, number>();

  marked.use({
    renderer: {
      heading({ text, depth, tokens }) {
        const base = slugifyHeading(stripMarkdown(text));
        const seen = used.get(base) ?? 0;
        used.set(base, seen + 1);
        const id = seen === 0 ? base : `${base}-${seen}`;

        // Anchor every heading so sections are linkable, matching how the
        // hand-written tables of contents already address them.
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },

      image({ href, title, text }) {
        const src = resolveMedia(href, topic);
        const titleAttr = title ? ` title="${title}"` : "";
        // Diagrams are wide; let them scroll rather than overflow the column.
        return `<figure class="post-figure"><img src="${src}" alt="${text}"${titleAttr} loading="lazy" decoding="async" /></figure>`;
      },

      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${title}"` : "";
        const external = /^https?:\/\//.test(href);
        const rel = external
          ? ' rel="noopener noreferrer" target="_blank"'
          : "";
        return `<a href="${href}"${titleAttr}${rel}>${inner}</a>`;
      },
    },
  });

  return marked;
}

/** `./images/x.svg` in the markdown → `/blog/<topic>/images/x.svg` on disk. */
function resolveMedia(href: string, topic: string): string {
  if (/^(https?:)?\/\//.test(href) || href.startsWith("/")) return href;
  const clean = href.replace(/^\.\//, "");
  return `/blog/${topic}/${clean}`;
}

function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string");
}

/** `date` arrives from YAML as a Date; normalise to YYYY-MM-DD. */
function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  return undefined;
}

async function markdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(entry.parentPath ?? dir, entry.name));
}

async function loadPost(file: string): Promise<Post | undefined> {
  const raw = await readFile(file, "utf8");
  const { data, content } = matter(raw);

  const slug = typeof data.slug === "string" ? data.slug : undefined;
  const title = typeof data.title === "string" ? data.title : undefined;
  const date = toIsoDate(data.date);

  // The contract that separates a post from a note: title + slug + date. It is
  // what keeps IMAGE-PLAN.md and README.md out of the site, the sitemap and the
  // feed without needing an ignore list to be maintained by hand.
  if (!slug || !title || !date) return undefined;
  if (data.draft === true) return undefined;

  const topic = path.basename(path.dirname(file));
  const { markdown, faq } = extractFaq(content);

  // Drop the leading H1 — the page renders the title itself, and two H1s on one
  // document is a real structural problem for a crawler.
  const body = markdown.replace(/^\s*#\s+.*(\r?\n)+/, "");

  const image =
    typeof data.image === "string"
      ? resolveMedia(data.image, topic)
      : undefined;

  const canonical =
    typeof data.canonical === "string" && data.canonical.trim().length > 0
      ? data.canonical.trim()
      : undefined;

  return {
    slug,
    title,
    description: typeof data.description === "string" ? data.description : "",
    date,
    author: typeof data.author === "string" ? data.author : "Cheela Labs",
    tags: toStringArray(data.tags),
    keywords: toStringArray(data.keywords),
    image,
    imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : undefined,
    canonical,
    readingMinutes: readingTime(body),
    html: await createRenderer(topic).parse(body),
    faq,
  };
}

let cache: Post[] | undefined;

export async function getAllPosts(): Promise<Post[]> {
  if (cache) return cache;

  const files = await markdownFiles(CONTENT_DIR);
  const loaded = await Promise.all(files.map(loadPost));
  const posts = loaded.filter((post): post is Post => post !== undefined);

  const duplicate = posts.find(
    (post, index) => posts.findIndex((p) => p.slug === post.slug) !== index,
  );
  if (duplicate) {
    // Two posts on one URL means one silently shadows the other depending on
    // filesystem order. Better to stop the build than to ship a coin flip.
    throw new Error(`[blog] Duplicate slug: ${duplicate.slug}`);
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  cache = posts;
  return posts;
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  const posts = await getAllPosts();
  return posts.map(({ html: _html, faq: _faq, ...summary }) => summary);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
