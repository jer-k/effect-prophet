// Check the built site's machine-readable outputs: each page's Markdown copy, llms.txt and the
// sitemap. Run after `npm run docs:build`.
import { access, readdir, readFile } from "node:fs/promises";

const dist = new URL("../.vitepress/dist/", import.meta.url);

const base = "/effect-prophet/";

const origin = "https://jer-k.github.io";

const failures: Array<string> = [];

const exists = (path: string) =>
  access(new URL(path, dist)).then(
    () => true,
    () => false,
  );

const files = (await readdir(dist, { recursive: true })).sort();

const pages = files.filter((name) => name.endsWith(".html") && name !== "404.html");

if (pages.length === 0) {
  failures.push("dist has no pages; run `npm run docs:build` first");
}

// Every page links to a Markdown copy that exists.
for (const page of pages) {
  const html = await readFile(new URL(page, dist), "utf8");
  const links = [...html.matchAll(/<link rel="alternate" type="text\/markdown" href="([^"]+)">/g)];
  const href = links[0]?.[1];

  if (links.length !== 1 || href === undefined) {
    failures.push(`${page}: expected one Markdown alternate link, found ${links.length}`);
    continue;
  }

  if (!href.startsWith(base) || !(await exists(href.slice(base.length)))) {
    failures.push(`${page}: Markdown copy ${href} doesn't exist`);
  }
}

// Markdown copies have their snippets and generated content expanded.
for (const copy of files.filter((name) => name.endsWith(".md"))) {
  const markdown = await readFile(new URL(copy, dist), "utf8");

  if (markdown.includes("<<< @/") || markdown.includes("<!-- @content -->")) {
    failures.push(`${copy}: contains an unexpanded snippet or generated-content marker`);
  }
}

// Every llms.txt link resolves to a file in the build.
const index = await readFile(new URL("llms.txt", dist), "utf8");

for (const [, url = ""] of index.matchAll(/\]\((https:[^)]+)\)/g)) {
  const prefix = `${origin}${base}`;

  if (!url.startsWith(prefix) || !(await exists(url.slice(prefix.length)))) {
    failures.push(`llms.txt: ${url} doesn't resolve to a built file`);
  }
}

// The sitemap lists every page.
const sitemap = await readFile(new URL("sitemap.xml", dist), "utf8");

const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc));

for (const page of pages) {
  const path = page.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");

  if (!listed.has(`${origin}${base}${path}`)) {
    failures.push(`sitemap.xml: missing ${path || "/"}`);
  }
}

for (const failure of failures) {
  console.error(`✗ ${failure}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
} else {
  console.log(`✓ ${pages.length} pages have Markdown copies and sitemap entries`);
}
