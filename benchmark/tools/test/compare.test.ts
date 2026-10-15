import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
      expect(matching).toContain("| compared |");
      expect(matching).toContain("| warm-fit |");
      expect(matching).toContain("Correctness gates: **unchanged**");
      expect(matching).toContain("Timing harness: **unchanged**");

      const failed = await fixture.writeRun("failed", { failed: true });
      expect(await Effect.runPromise(compareRuns(before, failed))).toContain(
        "| passed | failed | did not pass in both runs |",
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

      // Changed correctness gates alter how outcomes are judged, not timings, so timings remain.
      const oldGate = await fixture.writeRun("old-gate", { gateHash: "old-gate-hash" });
      const newGate = await fixture.writeRun("new-gate", { gateHash: "new-gate-hash" });
      const changedGate = await Effect.runPromise(compareRuns(oldGate, newGate));
      expect(changedGate).toContain("Correctness gates: **changed (`benchmark/tools/case.ts`");
      expect(changedGate).toContain("| compared |");
      expect(changedGate).toContain("| warm-fit |");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("flags consistently slower or faster phases and names a changed timing harness", async () => {
    const fixture = await makeRunFixture();

    try {
      const before = await fixture.writeRun("before");
      const same = await fixture.writeRun("same");
      const slower = await fixture.writeRun("slower", { effectSampleScale: 3, harnessHash: "new" });
      const faster = await fixture.writeRun("faster", { effectSampleScale: 0.3 });

      const unchanged = await Effect.runPromise(compareRuns(before, same));

      expect(unchanged).toMatch(/## Possible regressions\n\n[^\n]*\n\nNone\./u);
      expect(unchanged).toMatch(/## Possible improvements\n\nNone\./u);

      const regressed = await Effect.runPromise(compareRuns(before, slower));

      const regressions = regressed.slice(
        regressed.indexOf("## Possible regressions"),
        regressed.indexOf("## Possible improvements"),
      );

      expect(regressed).toContain(
        "Timing harness: **changed (`benchmark/tools/adapters/effect-prophet.ts`)",
      );
      expect(regressions).toContain("| effect-prophet | warm-fit |");
      expect(regressions).toContain("| 3.00× |");
      // Python's samples did not change, so none of its phases is flagged.
      expect(regressions).not.toContain("| python-prophet |");

      const improved = await Effect.runPromise(compareRuns(before, faster));

      const improvements = improved.slice(
        improved.indexOf("## Possible improvements"),
        improved.indexOf("## Cases"),
      );

      expect(improvements).toContain("| effect-prophet | warm-fit |");
      expect(improvements).toContain("| 0.30× |");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("summarizes changed outcomes, contracts and investigation flags between two runs", async () => {
    const fixture = await makeRunFixture();

    const withFlags = async (
      directory: string,
      flags: ReadonlyArray<{ readonly name: string; readonly effectValue: number }>,
    ) => {
      const path = resolve(directory, "report.json");
      const report = JSON.parse(await readFile(path, "utf8"));

      report.correctness[0].investigations = flags.map((flag) => ({
        run: 0,
        pythonValue: 1,
        difference: flag.effectValue - 1,
        threshold: 0.01,
        ...flag,
      }));

      await writeFile(path, JSON.stringify(report));
    };

    try {
      const id = fixture.benchmarkCase.id;
      const before = await fixture.writeRun("before");
      const after = await fixture.writeRun("after");

      await withFlags(before, [
        { name: "objective", effectValue: 2 },
        { name: "stationarity-residual", effectValue: 3 },
      ]);

      await withFlags(after, [
        { name: "objective", effectValue: 2 },
        { name: "stationarity-residual", effectValue: 4 },
        { name: "noise", effectValue: 5 },
      ]);

      const flagged = await Effect.runPromise(compareRuns(before, after));

      expect(flagged).toContain("- Added: none.");
      expect(flagged).toContain("- Outcome changes: none.");
      expect(flagged).toContain("- Investigation flags: 2 changed, 1 unchanged.");
      expect(flagged).toContain(`- New flag: \`${id}\` run 0 noise`);
      expect(flagged).toContain(
        `- Changed flag: \`${id}\` run 0 stationarity-residual: 3.000000e+0 vs 1.000000e+0 → 4.000000e+0 vs 1.000000e+0`,
      );

      const failed = await fixture.writeRun("failed", { failed: true });

      expect(await Effect.runPromise(compareRuns(after, failed))).toContain(
        `- Outcome changes: \`${id}\` passed → failed.`,
      );

      const changed = await fixture.writeRun("changed", {
        case: { ...fixture.benchmarkCase, timeoutSeconds: 777 },
      });

      expect(await Effect.runPromise(compareRuns(before, changed))).toContain(
        `- Case contract or input changes: \`${id}\`.`,
      );
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("names changed calendar gate sources without withholding country/control timings", async () => {
    const fixture = await makeRunFixture();

    try {
      const countryControl = {
        ...fixture.benchmarkCase,
        calendarSnapshot: {
          snapshotId: `sha256:${"a".repeat(64)}`,
          prophet: "1.4.0",
          holidays: "0.104",
        },
      } as const;

      const before = await fixture.writeRun("before", {
        case: countryControl,
        gateHash: "base",
        calendarGateHash: "calendar",
      });

      const matched = await fixture.writeRun("matched", {
        case: countryControl,
        gateHash: "base",
        calendarGateHash: "calendar",
      });

      expect(await Effect.runPromise(compareRuns(before, matched))).toContain("| compared |");

      for (const calendarGateHash of ["changed", undefined]) {
        const options: Parameters<typeof fixture.writeRun>[1] = {
          case: countryControl,
          gateHash: "base",
        };

        if (calendarGateHash !== undefined) Object.assign(options, { calendarGateHash });

        const changed = await fixture.writeRun(`after-${calendarGateHash ?? "unbound"}`, options);
        const comparison = await Effect.runPromise(compareRuns(before, changed));

        expect(comparison).toContain("`benchmark/tools/country-holidays.ts`");
        expect(comparison).toContain("| warm-fit |");
      }
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
