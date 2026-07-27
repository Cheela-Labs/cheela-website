// Copies images out of the blog content submodule into public/ so they are
// served as ordinary static assets.
//
// The alternative — a route handler reading the content directory at request
// time — needs file-tracing config to survive bundling and gives up CDN
// caching. Copying happens once at build and is one less thing to get wrong.
//
// Run from the build and dev scripts explicitly rather than via a `prebuild`
// lifecycle hook: pnpm does not run pre/post scripts by default, so the hook
// would silently not fire on Vercel.

import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(appDir, "content", "blog");
const publicDir = path.join(appDir, "public", "blog");

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(contentDir))) {
    // A clone without `--recurse-submodules` leaves this empty. Fail loudly:
    // building a blog with no posts would otherwise deploy a site that has
    // quietly dropped every article and every URL Google already knows about.
    console.error(
      `[blog] Content not found at ${path.relative(appDir, contentDir)}\n` +
        `[blog] Run: git submodule update --init --recursive`,
    );
    process.exit(1);
  }

  await rm(publicDir, { recursive: true, force: true });

  const topics = await readdir(contentDir, { withFileTypes: true });
  let copied = 0;

  for (const topic of topics) {
    if (!topic.isDirectory()) continue;

    const from = path.join(contentDir, topic.name, "images");
    if (!(await exists(from))) continue;

    const to = path.join(publicDir, topic.name, "images");
    await mkdir(path.dirname(to), { recursive: true });
    await cp(from, to, { recursive: true });

    copied += (await readdir(from)).length;
  }

  console.log(`[blog] Synced ${copied} media file(s) to public/blog`);
}

await main();
