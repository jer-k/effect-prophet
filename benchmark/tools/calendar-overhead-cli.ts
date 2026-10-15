import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { BenchmarkArtifactError } from "./artifacts.ts";
import { calendarOverhead } from "./calendar-overhead.ts";
import { resolveRunReference } from "./references.ts";

const reference = process.argv[2];

const root = fileURLToPath(new URL("../results/", import.meta.url));

await Effect.runPromise(
  Effect.gen(function* () {
    if (reference === undefined || process.argv.length !== 3) {
      return yield* Effect.fail(
        new BenchmarkArtifactError({
          message: "Usage: npm run benchmark:calendar-overhead -- <results-relative-run>",
        }),
      );
    }

    const directory = yield* resolveRunReference(root, reference);

    process.stdout.write(yield* calendarOverhead(directory));
  }),
);
