import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { writeArtifact } from "./artifacts.ts";
import { listRetainedRuns, loadStoredReport, renderResultsOverview } from "./stored-results.ts";

const root = fileURLToPath(new URL("../results/", import.meta.url));

await Effect.runPromise(
  Effect.gen(function* () {
    const paths = yield* listRetainedRuns(resolve(root, "retained"));

    const entries = yield* Effect.forEach(paths, (path) =>
      loadStoredReport(resolve(root, "retained", path)).pipe(
        Effect.map((evidence) => ({ path, evidence })),
      ),
    );

    yield* writeArtifact(resolve(root, "RESULTS.md"), renderResultsOverview(entries));
  }),
);
