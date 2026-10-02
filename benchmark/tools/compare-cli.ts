import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { BenchmarkArtifactError, writeArtifact } from "./artifacts.ts";
import { compareRuns } from "./compare.ts";
import { resolveRunReference } from "./references.ts";

const before = process.argv[2];

const after = process.argv[3];

const root = fileURLToPath(new URL("../results/", import.meta.url));

await Effect.runPromise(
  Effect.gen(function* () {
    if (before === undefined || after === undefined || process.argv.length !== 4) {
      return yield* Effect.fail(
        new BenchmarkArtifactError({
          message:
            "Usage: npm run benchmark:compare -- <results-relative-before> <results-relative-after>",
        }),
      );
    }

    const beforeDirectory = yield* resolveRunReference(root, before);
    const afterDirectory = yield* resolveRunReference(root, after);
    const markdown = yield* compareRuns(beforeDirectory, afterDirectory);
    const directory = resolve(root, "comparisons");

    yield* Effect.tryPromise({
      try: () => mkdir(directory, { recursive: true }),
      catch: (cause) =>
        new BenchmarkArtifactError({
          message: `Cannot create comparison directory: ${String(cause)}`,
        }),
    });
    const destination = resolve(directory, `${Date.now()}.md`);
    yield* writeArtifact(destination, markdown);
    process.stdout.write(`${markdown}\nSaved local comparison: ${destination}\n`);
  }),
);
