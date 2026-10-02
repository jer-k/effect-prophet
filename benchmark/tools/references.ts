import { resolve } from "node:path";

import { Effect, Schema } from "effect";

import { BenchmarkArtifactError, parseArtifactId, readJson, writeArtifact } from "./artifacts.ts";
import { loadStoredReport } from "./stored-results.ts";

const BaselinesSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  baselines: Schema.Record(Schema.String, Schema.String),
});

const readBaselines = (root: string) =>
  readJson(resolve(root, "baselines.json"), Schema.decodeUnknownEffect(BaselinesSchema)).pipe(
    Effect.mapError(
      (cause) =>
        new BenchmarkArtifactError({ message: `Invalid baseline references: ${String(cause)}` }),
    ),
  );

/** Resolve a named retained baseline or an explicit results-relative local/retained run. */
export const resolveRunReference = Effect.fn("benchmark.results.resolve-reference")(function* (
  root: string,
  reference: string,
) {
  if (reference.startsWith("runs/") || reference.startsWith("retained/")) {
    const segments = reference.split("/");
    yield* Effect.forEach(segments, parseArtifactId);

    return resolve(root, reference);
  }

  yield* parseArtifactId(reference);
  const file = yield* readBaselines(root);
  const target = file.baselines[reference];

  if (target === undefined || !target.startsWith("retained/")) {
    return yield* Effect.fail(
      new BenchmarkArtifactError({ message: `Unknown retained baseline: ${reference}` }),
    );
  }

  yield* Effect.forEach(target.split("/"), parseArtifactId);

  return resolve(root, target);
});

/** Explicitly move a named baseline reference to complete retained evidence; never to a local run. */
export const setBaseline = Effect.fn("benchmark.results.set-baseline")(function* (
  root: string,
  scope: string,
  runId: string,
) {
  yield* parseArtifactId(scope);
  yield* parseArtifactId(runId);
  const target = `retained/${scope}/${runId}`;
  yield* loadStoredReport(resolve(root, target));
  const file = yield* readBaselines(root);

  yield* writeArtifact(
    resolve(root, "baselines.json"),
    `${JSON.stringify({ ...file, baselines: { ...file.baselines, [scope]: target } }, null, 2)}\n`,
  );
});
