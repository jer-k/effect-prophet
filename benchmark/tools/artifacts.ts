import { readFile, writeFile } from "node:fs/promises";

import { Effect, Schema } from "effect";

/** Expected benchmark configuration, artifact or filesystem failure. */
export class BenchmarkArtifactError extends Schema.TaggedError<BenchmarkArtifactError>()(
  "BenchmarkArtifactError",
  { message: Schema.String },
) {}

/** Read and decode JSON at the benchmark filesystem boundary. */
export const readJson = Effect.fn("benchmark.artifacts.read-json")(function* <A, E, R>(
  path: string,
  // oxlint-disable-next-line anti-slop/no-unknown-parameters -- This I/O boundary invokes the supplied parser before returning domain values.
  parse: (input: unknown) => Effect.Effect<A, E, R>,
) {
  const contents = yield* Effect.tryPromise({
    try: () => readFile(path, "utf8"),
    catch: (cause) =>
      new BenchmarkArtifactError({ message: `Cannot read JSON ${path}: ${String(cause)}` }),
  });

  const input: unknown = yield* Effect.try({
    try: () => JSON.parse(contents),
    catch: (cause) =>
      new BenchmarkArtifactError({ message: `Invalid JSON ${path}: ${String(cause)}` }),
  });

  return yield* parse(input);
});

/** Write a generated benchmark artifact. */
export const writeArtifact = Effect.fn("benchmark.artifacts.write")(function* (
  path: string,
  contents: string,
) {
  yield* Effect.tryPromise({
    try: () => writeFile(path, contents),
    catch: (cause) =>
      new BenchmarkArtifactError({ message: `Cannot write ${path}: ${String(cause)}` }),
  });
});

/** Reject identifiers that could escape a run or capability directory. */
export const parseArtifactId = (value: string) =>
  /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/u.test(value)
    ? Effect.succeed(value)
    : Effect.fail(
        new BenchmarkArtifactError({ message: `Invalid benchmark identifier: ${value}` }),
      );
