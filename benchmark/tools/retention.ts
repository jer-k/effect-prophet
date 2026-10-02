import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { access, cp, mkdir, rm } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { promisify } from "node:util";

import { Effect } from "effect";

import { BenchmarkArtifactError, parseArtifactId } from "./artifacts.ts";
import { loadInputDataset } from "./inputs.ts";
import { loadRunEvidence } from "./stored-results.ts";

const executeFile = promisify(execFile);

/** Retain complete selected-case evidence under a capability scope without overwriting snapshots. */
export const retainRun = Effect.fn("benchmark.retention.retain")(function* (
  benchmarkRoot: string,
  runId: string,
  scope: string,
) {
  yield* parseArtifactId(runId);
  yield* parseArtifactId(scope);

  const source = resolve(benchmarkRoot, "results/runs", runId);
  const evidence = yield* loadRunEvidence(source);

  if (evidence.manifest.runId !== runId) {
    return yield* Effect.fail(
      new BenchmarkArtifactError({ message: "Selected directory does not match recorded run ID" }),
    );
  }

  // New runs reference shared versioned inputs. Their exact bytes must exist in HEAD before retention.
  for (const item of evidence.cases) {
    const loaded = yield* loadInputDataset(resolve(benchmarkRoot, "inputs"), item);
    const projectRoot = resolve(benchmarkRoot, "..");
    const inputPath = relative(projectRoot, resolve(benchmarkRoot, "inputs", item.dataset));

    const committed = yield* Effect.tryPromise({
      try: () =>
        executeFile("git", ["show", `HEAD:${inputPath}`], {
          cwd: projectRoot,
          encoding: "buffer",
          maxBuffer: 16 * 1024 * 1024,
        }),
      catch: (cause) =>
        new BenchmarkArtifactError({
          message: `Commit the referenced input before retaining ${item.id}: ${String(cause)}`,
        }),
    }).pipe(Effect.withSpan("benchmark.retention.committed-input"));

    if (createHash("sha256").update(committed.stdout).digest("hex") !== loaded.sha256) {
      return yield* Effect.fail(
        new BenchmarkArtifactError({ message: `Committed input bytes differ for ${item.id}` }),
      );
    }
  }

  const destination = resolve(benchmarkRoot, "results/retained", scope, runId);

  yield* Effect.tryPromise({
    try: async () => {
      const files = [
        "manifest.json",
        "cases.json",
        "effect-prophet.json",
        "python-prophet.json",
        "report.json",
        "report.md",
        "eligible-cases.json",
      ];

      await Promise.all(files.map((file) => access(resolve(source, file))));
      await mkdir(resolve(destination, ".."), { recursive: true });
      await mkdir(destination);

      try {
        for (const file of files) {
          await cp(resolve(source, file), resolve(destination, file), {
            force: false,
            errorOnExist: true,
          });
        }
      } catch (cause) {
        await rm(destination, { recursive: true, force: true });
        throw cause;
      }
    },
    catch: (cause) =>
      new BenchmarkArtifactError({
        message: `Cannot retain complete run without overwriting evidence: ${String(cause)}`,
      }),
  }).pipe(Effect.withSpan("benchmark.retention.filesystem"));

  return destination;
});
