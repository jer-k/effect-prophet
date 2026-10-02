import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Effect, Exit, Predicate } from "effect";
import { describe, expect, it } from "vitest";

import { compareRuns } from "../compare.ts";
import { resolveRunReference, setBaseline } from "../references.ts";
import { retainRun } from "../retention.ts";
import { listRetainedRuns, loadStoredReport, renderResultsOverview } from "../stored-results.ts";
import { makeRunFixture } from "./run-fixture.ts";
import { assertEndedTrace, makeRecordingTracer } from "./tracing.ts";

describe("benchmark developer comparisons", () => {
  it("compares passing cases but withholds timing for failed, changed-contract or hardware-different runs", async () => {
    const fixture = await makeRunFixture();

    try {
      const before = await fixture.writeRun("before");
      const after = await fixture.writeRun("after");
      const matching = await Effect.runPromise(compareRuns(before, after));
      expect(matching).toContain("| eligible |");
      expect(matching).toContain("| warm-fit |");

      const failed = await fixture.writeRun("failed", { failed: true });
      expect(await Effect.runPromise(compareRuns(before, failed))).toContain(
        "| passed | failed | gate did not pass |",
      );

      const changed = await fixture.writeRun("changed", {
        case: { ...fixture.benchmarkCase, timeoutSeconds: 777 },
      });

      expect(await Effect.runPromise(compareRuns(before, changed))).toContain(
        "changed/missing case contract or input",
      );
      const different = await fixture.writeRun("different", { processor: "different-cpu" });
      const report = await Effect.runPromise(compareRuns(before, different));
      expect(report).toContain("environment differs");
      expect(report).not.toContain("| warm-fit |");

      const oldGate = await fixture.writeRun("old-gate", { gateHash: "old-gate-hash" });
      const newGate = await fixture.writeRun("new-gate", { gateHash: "new-gate-hash" });
      const changedGate = await Effect.runPromise(compareRuns(oldGate, newGate));
      expect(changedGate).toContain("gate implementation changed or unavailable");
      expect(changedGate).not.toContain("| warm-fit |");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("traces real comparison reads through successful and failed operations", async () => {
    const fixture = await makeRunFixture();
    const successTrace = makeRecordingTracer();
    const failureTrace = makeRecordingTracer();

    try {
      const before = await fixture.writeRun("before");
      const after = await fixture.writeRun("after");

      const success = await Effect.runPromise(
        compareRuns(before, after).pipe(
          Effect.withSpan("benchmark.test"),
          Effect.withTracer(successTrace.tracer),
          Effect.exit,
        ),
      );

      expect(Exit.isSuccess(success)).toBe(true);
      assertEndedTrace(successTrace.spans);
      expect(successTrace.spans.map((span) => span.name)).toContain("benchmark.results.compare");
      expect(successTrace.spans.map((span) => span.name)).toContain(
        "benchmark.artifacts.read-json",
      );

      const failure = await Effect.runPromise(
        compareRuns(resolve(fixture.root, "missing"), after).pipe(
          Effect.withSpan("benchmark.test"),
          Effect.withTracer(failureTrace.tracer),
          Effect.exit,
        ),
      );

      expect(Exit.isFailure(failure)).toBe(true);
      assertEndedTrace(failureTrace.spans);

      for (const trace of [successTrace, failureTrace]) {
        for (const span of trace.spans) {
          if (Predicate.isTagged(span.status, "Ended"))
            expect(Exit.isSuccess(span.status.exit)).toBe(trace === successTrace);
        }
      }
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("indexes retained outcomes only and points named baselines to retained evidence", async () => {
    const fixture = await makeRunFixture();

    try {
      await fixture.writeRun("local-only");
      await fixture.writeRun("retained");

      const destination = await Effect.runPromise(
        retainRun(fixture.benchmarkRoot, "retained", "flat-growth"),
      );

      const results = resolve(fixture.benchmarkRoot, "results");
      await mkdir(results, { recursive: true });
      await writeFile(
        resolve(results, "baselines.json"),
        JSON.stringify({ schemaVersion: 1, baselines: {} }),
      );
      const recording = makeRecordingTracer();

      const paths = await Effect.runPromise(
        Effect.gen(function* () {
          yield* setBaseline(results, "flat-growth", "retained");
          expect(yield* resolveRunReference(results, "flat-growth")).toBe(destination);

          return yield* listRetainedRuns(resolve(results, "retained"));
        }).pipe(Effect.withSpan("benchmark.test"), Effect.withTracer(recording.tracer)),
      );

      assertEndedTrace(recording.spans);
      expect(recording.spans.map((span) => span.name)).toContain("benchmark.results.set-baseline");
      expect(recording.spans.map((span) => span.name)).toContain(
        "benchmark.results.resolve-reference",
      );
      expect(recording.spans.map((span) => span.name)).toContain("benchmark.results.list");
      expect(paths).toEqual(["flat-growth/retained"]);
      const evidence = await Effect.runPromise(loadStoredReport(destination));
      const overview = renderResultsOverview([{ path: paths[0] ?? "", evidence }]);
      expect(overview).toContain("flat-growth/retained/report.md");
      expect(overview).not.toContain("local-only");
      expect(
        (await Effect.runPromise(resolveRunReference(results, "runs/../outside").pipe(Effect.exit)))
          ._tag,
      ).toBe("Failure");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });
});
