import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { BenchmarkArtifactError } from "./artifacts.ts";
import { retainRun } from "./retention.ts";
import { setBaseline } from "./references.ts";

const runId = process.argv[2];

const scope = process.argv[3];

await Effect.runPromise(
  Effect.gen(function* () {
    if (
      runId === undefined ||
      scope === undefined ||
      (process.argv.length !== 4 &&
        !(process.argv.length === 5 && process.argv[4] === "--baseline"))
    ) {
      return yield* Effect.fail(
        new BenchmarkArtifactError({
          message: "Usage: npm run benchmark:retain -- <run-id> <tested-capability> [--baseline]",
        }),
      );
    }

    const root = fileURLToPath(new URL("../", import.meta.url));
    const destination = yield* retainRun(root, runId, scope);

    if (process.argv[4] === "--baseline")
      yield* setBaseline(resolve(root, "results"), scope, runId);

    process.stdout.write(
      `Retained benchmark evidence at ${destination}\nRun npm run benchmark:results to update the overview.\n`,
    );
  }),
);
