import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { promisify } from "node:util";

const run = promisify(execFile);

const site = new URL("../", import.meta.url);

const directory = new URL("../snippets/", import.meta.url);

// A page shows what a snippet prints in a `txt [Output]` block right after including it.
const outputBlock = /```txt \[Output\]\n/g;

const snippetOutput = /<<< @\/snippets\/([\w-]+\.ts)[^\n]*\n+```txt \[Output\]\n([\s\S]*?)```/g;

const indent = (text: string) => text.replace(/^/gm, "    ");

const snippets = (await readdir(directory)).filter((name) => name.endsWith(".ts")).sort();

const pages = (await readdir(site, { recursive: true }))
  .filter((name) => name.endsWith(".md") && !name.startsWith(".vitepress"))
  .sort();

const failures: Array<string> = [];

const expected = new Map<string, Array<{ page: string; output: string }>>();

for (const page of pages) {
  const content = await readFile(new URL(page, site), "utf8");
  const matches = [...content.matchAll(snippetOutput)];

  if (matches.length !== [...content.matchAll(outputBlock)].length) {
    failures.push(page);
    console.error(`✗ ${page}\n    has an output block that doesn't follow a snippet`);
  }

  for (const [, snippet = "", output = ""] of matches) {
    if (!snippets.includes(snippet)) {
      failures.push(page);
      console.error(`✗ ${page}\n    shows the output of ${snippet}, which doesn't exist`);
    }

    expected.set(snippet, [...(expected.get(snippet) ?? []), { page, output: output.trimEnd() }]);
  }
}

for (const snippet of snippets) {
  try {
    const { stdout } = await run(process.execPath, [new URL(snippet, directory).pathname]);
    const printed = stdout.trimEnd();
    const stale = (expected.get(snippet) ?? []).filter(({ output }) => output !== printed);

    if (stale.length > 0) {
      failures.push(snippet);

      for (const { page, output } of stale) {
        console.error(
          `✗ ${snippet}\n  ${page} shows:\n${indent(output)}\n  but it prints:\n${indent(printed)}`,
        );
      }

      continue;
    }

    console.log(`✓ ${snippet}\n${indent(stdout)}`);
  } catch (error) {
    failures.push(snippet);
    console.error(`✗ ${snippet}\n${String(error)}`);
  }
}

if (failures.length > 0) {
  console.error(`${failures.length} examples failed: ${failures.join(", ")}`);
  process.exitCode = 1;
}
