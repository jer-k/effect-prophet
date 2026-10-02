import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

import { Effect, Exit, Option, Predicate } from "effect";
import { describe, expect, it } from "vitest";

import { loadCoreCases } from "../catalog.ts";
import { generateBenchmarkData } from "../generate-data.ts";
import { loadInputDataset } from "../inputs.ts";

import { makeRecordingTracer } from "./tracing.ts";

describe("immutable shared inputs", () => {
  it("verifies exact bytes and fails changed inputs; filesystem spans retain real parent/completion", async () => {
    const directory = await mkdtemp(resolve(tmpdir(), "prophet-inputs-"));
    const cases = await Effect.runPromise(loadCoreCases());
    const item = cases[0];

    if (item === undefined) throw new Error("Missing input fixture");

    try {
      await mkdir(resolve(directory, "v1"));
      await Effect.runPromise(
        generateBenchmarkData(pathToFileURL(`${resolve(directory, "v1")}${sep}`)),
      );
      const { spans, tracer } = makeRecordingTracer();

      const success = await Effect.runPromise(
        loadInputDataset(directory, item).pipe(
          Effect.withSpan("benchmark.test"),
          Effect.withTracer(tracer),
          Effect.exit,
        ),
      );

      expect(Exit.isSuccess(success)).toBe(true);
      const bytes = await readFile(resolve(directory, item.dataset), "utf8");
      await writeFile(resolve(directory, item.dataset), `${bytes} `);

      const failure = await Effect.runPromise(
        loadInputDataset(directory, item).pipe(
          Effect.withSpan("benchmark.test"),
          Effect.withTracer(tracer),
          Effect.exit,
        ),
      );

      expect(Exit.isFailure(failure)).toBe(true);

      const boundaries = spans.filter((span) => span.name === "benchmark.inputs.filesystem");
      expect(boundaries).toHaveLength(2);

      for (const [index, boundary] of boundaries.entries()) {
        expect(Option.isSome(boundary.parent)).toBe(true);

        if (Option.isNone(boundary.parent)) throw new Error("Missing boundary parent");

        const parentId = boundary.parent.value.spanId;
        const parent = spans.find((span) => span.spanId === parentId);

        if (parent === undefined) throw new Error("Missing parent span");

        expect(parent.name).toBe("benchmark.inputs.load");
        expect(parent.traceId).toBe(boundary.traceId);
        expect(spans.find((span) => span.spanId === parent.spanId)).toBe(parent);
        expect(boundary.attributes.size).toBe(0);
        expect(boundary.status._tag).toBe("Ended");

        if (
          !Predicate.isTagged(boundary.status, "Ended") ||
          !Predicate.isTagged(parent.status, "Ended")
        )
          throw new Error("Unended boundary");

        expect(Exit.isSuccess(boundary.status.exit)).toBe(index === 0);
        expect(boundary.status.startTime >= parent.status.startTime).toBe(true);
        expect(boundary.status.endTime <= parent.status.endTime).toBe(true);
      }

      const before = spans.length;
      await Effect.runPromise(
        loadInputDataset(directory, { ...item, dataset: "../outside.json" }).pipe(
          Effect.withTracer(tracer),
          Effect.exit,
        ),
      );
      expect(spans.slice(before).some((span) => span.name === "benchmark.inputs.filesystem")).toBe(
        false,
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("generation never overwrites existing version bytes", async () => {
    const directory = await mkdtemp(resolve(tmpdir(), "prophet-generate-"));
    const root = pathToFileURL(`${directory}${sep}`);

    try {
      await Effect.runPromise(generateBenchmarkData(root));
      const manifest = await readFile(new URL("manifest.json", root));
      await Effect.runPromise(generateBenchmarkData(root));
      expect(await readFile(new URL("manifest.json", root))).toEqual(manifest);
      await writeFile(new URL("flat-level.json", root), "changed input\n");
      const result = await Effect.runPromise(generateBenchmarkData(root).pipe(Effect.exit));
      expect(Exit.isFailure(result)).toBe(true);
      expect(await readFile(new URL("flat-level.json", root), "utf8")).toBe("changed input\n");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
