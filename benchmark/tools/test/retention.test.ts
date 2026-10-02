import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Effect, Exit, Option, Predicate } from "effect";
import { describe, expect, it } from "vitest";

import { retainRun } from "../retention.ts";
import { loadStoredReport } from "../stored-results.ts";
import { makeRunFixture } from "./run-fixture.ts";
import { makeRecordingTracer } from "./tracing.ts";

describe("explicit benchmark retention", () => {
  it("retains complete passing or failing evidence by tested scope, without copies/overwrites", async () => {
    const fixture = await makeRunFixture();

    try {
      const source = await fixture.writeRun("passing");
      await writeFile(resolve(source, "unrelated-local-file.txt"), "not benchmark evidence");

      const destination = await Effect.runPromise(
        retainRun(fixture.benchmarkRoot, "passing", "flat-growth"),
      );

      expect(destination).toBe(
        resolve(fixture.benchmarkRoot, "results/retained/flat-growth/passing"),
      );
      expect(await readdir(destination)).not.toContain("unrelated-local-file.txt");
      expect(await readdir(destination)).not.toContain("inputs");
      expect(await readdir(destination)).not.toContain("records.jsonl");
      expect(await readFile(resolve(destination, "cases.json"))).toEqual(
        await readFile(resolve(source, "cases.json")),
      );
      expect(
        Exit.isFailure(
          await Effect.runPromise(
            retainRun(fixture.benchmarkRoot, "passing", "flat-growth").pipe(Effect.exit),
          ),
        ),
      ).toBe(true);

      await fixture.writeRun("failed", { failed: true });

      const failed = await Effect.runPromise(
        retainRun(fixture.benchmarkRoot, "failed", "flat-growth"),
      );

      const recorded = await Effect.runPromise(loadStoredReport(failed));
      expect(recorded.report.correctness[0]?.status).toBe("failed");
      expect(recorded.report.timings).toHaveLength(0);
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("rejects incomplete runs, changed input bytes and unsafe scopes", async () => {
    const fixture = await makeRunFixture();

    try {
      const source = await fixture.writeRun("incomplete");
      await rm(resolve(source, "python-prophet.json"));
      expect(
        Exit.isFailure(
          await Effect.runPromise(
            retainRun(fixture.benchmarkRoot, "incomplete", "flat-growth").pipe(Effect.exit),
          ),
        ),
      ).toBe(true);
      await fixture.writeRun("changed-input");
      await writeFile(
        resolve(fixture.benchmarkRoot, "inputs", fixture.benchmarkCase.dataset),
        "{}",
      );
      expect(
        Exit.isFailure(
          await Effect.runPromise(
            retainRun(fixture.benchmarkRoot, "changed-input", "flat-growth").pipe(Effect.exit),
          ),
        ),
      ).toBe(true);
      expect(
        Exit.isFailure(
          await Effect.runPromise(
            retainRun(fixture.benchmarkRoot, "incomplete", "../escape").pipe(Effect.exit),
          ),
        ),
      ).toBe(true);
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("ends filesystem boundary spans successfully or as typed failures, and skips pre-boundary validation", async () => {
    const fixture = await makeRunFixture();
    const { spans, tracer } = makeRecordingTracer();

    try {
      await fixture.writeRun("trace-run");
      const operation = retainRun(fixture.benchmarkRoot, "trace-run", "flat-growth");

      const execute = () =>
        Effect.runPromise(
          operation.pipe(Effect.withSpan("benchmark.test"), Effect.withTracer(tracer), Effect.exit),
        );

      expect(Exit.isSuccess(await execute())).toBe(true);
      expect(Exit.isFailure(await execute())).toBe(true);
      const boundaries = spans.filter((span) => span.name === "benchmark.retention.filesystem");
      expect(boundaries).toHaveLength(2);

      for (const [index, span] of boundaries.entries()) {
        if (Option.isNone(span.parent)) throw new Error("Missing span parent");
        const parentId = span.parent.value.spanId;
        const parent = spans.find((candidate) => candidate.spanId === parentId);

        if (
          parent === undefined ||
          !Predicate.isTagged(parent.status, "Ended") ||
          !Predicate.isTagged(span.status, "Ended")
        )
          throw new Error("Unended span");

        expect(parent.name).toBe("benchmark.retention.retain");
        expect(span.traceId).toBe(parent.traceId);
        expect(span.status.startTime >= parent.status.startTime).toBe(true);
        expect(span.status.endTime <= parent.status.endTime).toBe(true);
        expect(Exit.isSuccess(span.status.exit)).toBe(index === 0);
        expect(span.attributes.size).toBe(0);
      }

      const before = spans.length;
      await Effect.runPromise(
        retainRun(fixture.benchmarkRoot, "trace-run", "../bad").pipe(
          Effect.withTracer(tracer),
          Effect.exit,
        ),
      );
      expect(
        spans.slice(before).some((span) => span.name === "benchmark.retention.filesystem"),
      ).toBe(false);
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });
});
