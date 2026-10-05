import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

// Keeps the "Rust dependencies" list in third-party/NOTICE.txt in sync with the crates that
// Cargo.lock compiles into the WebAssembly binary, and confirms each one offers Apache-2.0.

const projectRoot = new URL("../", import.meta.url);

const noticeUrl = new URL("rust/prophet-wasm/third-party/NOTICE.txt", projectRoot);

const sectionHeading = "Rust dependencies";

// Normal dependencies that only run inside wasm-bindgen's proc-macros, so no code from them
// reaches the binary.
const compileTimeOnlyCrates = new Set(["unicode-ident"]);

// cargo tree applies the real feature resolver; cargo metadata unifies dev-dependency features
// and would report crates, such as libm, that the release build never compiles. Normal edges
// without proc-macros leave out everything that only runs on the host during compilation.
const tree = spawnSync(
  "cargo",
  [
    "tree",
    "--locked",
    "--manifest-path",
    "rust/prophet-wasm/Cargo.toml",
    "--target",
    "wasm32-unknown-unknown",
    "--edges",
    "normal,no-proc-macro",
    "--prefix",
    "none",
    "--no-dedupe",
    "--format",
    "{p}\t{l}",
  ],
  { cwd: projectRoot, encoding: "utf8" },
);

assert.equal(tree.status, 0, tree.stderr);

const [, ...dependencyLines] = tree.stdout.trim().split("\n");

const linkedCrates = new Map<string, { name: string; version: string; license: string }>();

for (const line of dependencyLines) {
  const match = /^(\S+) v(\S+)\t(.*)$/u.exec(line);

  assert.ok(match, `unexpected cargo tree line: ${line}`);

  const [, name = "", version = "", license = ""] = match;

  if (compileTimeOnlyCrates.has(name)) {
    continue;
  }

  linkedCrates.set(`${name} ${version}`, { name, version, license });
}

const sortedCrates = [...linkedCrates.values()].sort((left, right) =>
  left.name.localeCompare(right.name),
);

// Accepts "MIT OR Apache-2.0" and the legacy "MIT/Apache-2.0", but not an AND expression,
// where Apache-2.0 would not be enough on its own.
const offersApache = (license: string) =>
  !license.includes(" AND ") && license.split(/ OR |\//u).includes("Apache-2.0");

const nonApacheCrates = sortedCrates.flatMap(({ name, license }) =>
  offersApache(license) ? [] : [`${name} (${license || "no license field"})`],
);

assert.deepEqual(
  nonApacheCrates,
  [],
  "these crates do not offer Apache-2.0; add their license text and a NOTICE.txt section for them",
);

const expectedLines = sortedCrates.map(({ name, version }) => `${name} ${version}`);

// The section is a heading, an underline, a paragraph, a blank line, then one crate per line.
const noticeLines = (await readFile(noticeUrl, "utf8")).split("\n");

const headingIndex = noticeLines.indexOf(sectionHeading);

assert.notEqual(headingIndex, -1, `NOTICE.txt has no "${sectionHeading}" section`);

const listStart = noticeLines.indexOf("", headingIndex) + 1;

const listEnd = noticeLines.indexOf("", listStart);

const listedLines = noticeLines.slice(listStart, listEnd === -1 ? undefined : listEnd);

assert.deepEqual(
  listedLines,
  expectedLines,
  `the "${sectionHeading}" list in NOTICE.txt is out of date; replace it with:\n\n${expectedLines.join("\n")}\n`,
);

console.log(`Third-party notices cover all ${expectedLines.length} linked Rust crates`);
