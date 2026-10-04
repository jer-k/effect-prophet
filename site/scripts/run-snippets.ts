import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import { promisify } from "node:util";

const run = promisify(execFile);

const directory = new URL("../snippets/", import.meta.url);

const snippets = (await readdir(directory)).filter((name) => name.endsWith(".ts")).sort();

const failures: Array<string> = [];

for (const snippet of snippets) {
  try {
    const { stdout } = await run(process.execPath, [new URL(snippet, directory).pathname]);

    console.log(`✓ ${snippet}\n${stdout.replace(/^/gm, "    ")}`);
  } catch (error) {
    failures.push(snippet);
    console.error(`✗ ${snippet}\n${String(error)}`);
  }
}

if (failures.length > 0) {
  console.error(`${failures.length} of ${snippets.length} examples failed: ${failures.join(", ")}`);
  process.exitCode = 1;
}
