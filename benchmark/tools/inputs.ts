import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

import { Effect, Schema } from "effect";

import { BenchmarkArtifactError, readJson } from "./artifacts.ts";
import { parseBenchmarkDataset, type BenchmarkCase } from "./case.ts";

const InputManifestSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  files: Schema.Array(
    Schema.Struct({ file: Schema.String, recipe: Schema.String, sha256: Schema.String }),
  ),
});

/** Resolve a dataset reference without allowing it to escape its input root. */
export const resolveInputPath = (root: string, dataset: string) => {
  const path = resolve(root, dataset);
  const withinRoot = relative(resolve(root), path);

  return isAbsolute(dataset) || withinRoot === ".." || withinRoot.startsWith(`..${sep}`)
    ? Effect.fail(new BenchmarkArtifactError({ message: `Dataset escapes input root: ${dataset}` }))
    : Effect.succeed(path);
};

/** Read exact input bytes, parse rows and verify the immutable version manifest or recorded identity. */
export const loadInputDataset = Effect.fn("benchmark.inputs.load")(function* (
  root: string,
  item: BenchmarkCase,
) {
  const path = yield* resolveInputPath(root, item.dataset);

  return yield* Effect.gen(function* () {
    const bytes = yield* Effect.tryPromise({
      try: () => readFile(path),
      catch: (cause) =>
        new BenchmarkArtifactError({ message: `Cannot read input ${path}: ${String(cause)}` }),
    });

    const input: unknown = yield* Effect.try({
      try: () => JSON.parse(bytes.toString("utf8")),
      catch: (cause) =>
        new BenchmarkArtifactError({ message: `Invalid input JSON ${path}: ${String(cause)}` }),
    });

    const dataset = yield* parseBenchmarkDataset(input);
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    const identity = item.datasetIdentity;

    if (identity !== undefined) {
      if (
        identity.sha256 !== sha256 ||
        identity.recipe !== dataset.recipe ||
        identity.trainingRows !== dataset.observations.length
      ) {
        return yield* Effect.fail(
          new BenchmarkArtifactError({ message: `Recorded input identity changed for ${item.id}` }),
        );
      }
    } else {
      const manifest = yield* readJson(
        resolve(dirname(path), "manifest.json"),
        Schema.decodeUnknownEffect(InputManifestSchema),
      ).pipe(
        Effect.mapError(
          (cause) =>
            new BenchmarkArtifactError({ message: `Invalid input manifest: ${String(cause)}` }),
        ),
      );

      const entry = manifest.files.find(
        (candidate) => resolve(dirname(path), candidate.file) === path,
      );

      if (entry === undefined || entry.sha256 !== sha256 || entry.recipe !== dataset.recipe) {
        return yield* Effect.fail(
          new BenchmarkArtifactError({
            message: `Versioned input changed for ${item.id}; create a new input version`,
          }),
        );
      }
    }

    return { bytes, dataset, sha256 };
  }).pipe(Effect.withSpan("benchmark.inputs.filesystem"));
});
