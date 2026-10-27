import { readFileSync } from "node:fs";

import { Effect } from "effect";
import { decodeOptions, defaultLinearOptimizer, performanceMetrics } from "effect-prophet";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";
import { evaluationCases } from "../../cases/diagnostics/evaluation.ts";
import { effectOptionsForCase } from "../effect-case.ts";
import { linearGrowthEdgeCases } from "../../cases/growth/linear/edge-cases.ts";
import {
  evaluationCorrectness,
  evaluationOperation,
  metricParityFailure,
  preparedEvaluationOperation,
} from "../evaluation.ts";
import { customMetrics } from "../../../tools/prophet/custom-metrics.ts";
import { buildBenchmarkReport } from "../report.ts";
import type { CorrectnessProjection, ImplementationResult, RunManifest } from "../result.ts";

const base = evaluationCases.find((item) => item.id === "evaluation-linear-point");

if (base === undefined) throw new Error("Missing evaluation test case");

const datasetInput: unknown = JSON.parse(
  readFileSync(new URL(`../../inputs/${base.dataset}`, import.meta.url), "utf8"),
);

const environment = {
  runtime: "test",
  runtimeVersion: "1",
  operatingSystem: "linux",
  architecture: "arm64",
  processor: "test",
  containerPlatform: "linux/arm64",
  versions: [],
  artifactHashes: [],
  numericalThreads: [],
  resources: [],
  memoryMeasurement: "process high water",
};

const manifest: RunManifest = {
  schemaVersion: 1,
  runId: "test",
  createdAt: "2024-01-01T00:00:00.000Z",
  gitRevision: "abc",
  gitDirty: false,
  hostPlatform: "linux",
  hostRelease: "1",
  hostArchitecture: "arm64",
  hostProcessor: "test",
  containerPlatform: "linux/arm64",
  emulated: false,
  selectedCases: [base.id],
  commands: ["benchmark"],
  inputHashes: [],
  containerImages: [],
};

const result = (
  implementation: ImplementationResult["implementation"],
  projection: CorrectnessProjection,
): ImplementationResult => ({
  schemaVersion: 1,
  implementation,
  generatedAt: "2024-01-01T00:00:00.000Z",
  environment,
  correctness: [projection],
  failures: [],
  measurements: [
    {
      caseId: base.id,
      implementation,
      phase: "evaluation-point",
      comparison: "different-public-work",
      evidenceId: "rolling-origin-evaluation-v1",
      run: 0,
      samplesNanoseconds: [100, 200],
      correctness: "locally-passed",
    },
  ],
});

// One independent correctness run is sufficient for report eligibility tests.
const testCase = { ...base, independentRuns: 1, measuredIterations: 2 };

const report = (left: CorrectnessProjection, right: CorrectnessProjection) =>
  buildBenchmarkReport(
    manifest,
    [testCase],
    result("effect-prophet", left),
    result("python-prophet", right),
    new Set(["rolling-origin-evaluation-v1"]),
  );

describe("evaluation public benchmark", () => {
  it("declares valid fit options, with both libraries' default optimizers for linear growth", async () => {
    expect(evaluationCases).toHaveLength(17);

    await Effect.runPromise(parseBenchmarkCases(evaluationCases));

    for (const declaration of evaluationCases) {
      const options = effectOptionsForCase(declaration);

      if (options === undefined || declaration.workload.kind !== "evaluation") {
        throw new Error("Expected evaluation declarations and fit options");
      }

      await Effect.runPromise(decodeOptions(options));

      if (declaration.workload.configuration.growth === "linear") {
        expect(declaration.workload.effectOptimizer).toEqual(defaultLinearOptimizer);
        expect(declaration.workload.pythonOptimizer?.algorithm).toBe("Auto");
      }
    }
  });

  it("checks duplicate assessment targets by stable row instance, never first timestamp match", async () => {
    const declaration = linearGrowthEdgeCases.find(
      (item) => item.id === "evaluation-training-duplicates",
    );

    if (declaration === undefined) throw new Error("Missing duplicate evaluation case");

    const dataset = await Effect.runPromise(
      parseBenchmarkDataset(
        JSON.parse(
          readFileSync(new URL(`../../inputs/${declaration.dataset}`, import.meta.url), "utf8"),
        ),
      ),
    );

    const projection = evaluationCorrectness(declaration, dataset, 0);

    expect(projection.evaluation?.trainingRows).toBe(148);
    expect(projection.evaluation?.assessmentRows).toBe(24);
    expect(new Set(projection.evaluation?.rows.map((row) => row.actual)).size).toBeGreaterThan(6);
    expect(evaluationOperation(declaration, dataset, "evaluation-baseline")).toBeDefined();
  });
  it("parses declarations and rejects missing simulation controls or duplicate candidate labels", async () => {
    expect(await Effect.runPromise(parseBenchmarkCases(evaluationCases))).toHaveLength(
      evaluationCases.length,
    );
    const intervals = evaluationCases.find((item) => item.id === "evaluation-linear-intervals");

    if (intervals?.workload.kind !== "evaluation") throw new Error("Missing interval case");

    const { interval: _interval, ...withoutControls } = intervals.workload;
    await expect(
      Effect.runPromise(parseBenchmarkCases([{ ...intervals, workload: withoutControls }])),
    ).rejects.toMatchObject({ input: "cases" });
  });

  it("checks public fold/row/metric identity and excludes held-out target values from predictions", async () => {
    const dataset = await Effect.runPromise(parseBenchmarkDataset(datasetInput));
    const original = evaluationCorrectness(base, dataset, 0);
    const first = original.evaluation;
    expect(first?.cutoffs).toHaveLength(2);
    expect(first?.assessmentRows).toBe(14);
    expect(first?.trainingRows).toBeGreaterThan(0);
    expect(first?.rows[0]?.actual).toBeGreaterThan(0);

    const changed = {
      ...dataset,
      observations: dataset.observations.map((row, index) =>
        index > 70 ? { ...row, value: row.value + 100 } : row,
      ),
    };

    const after = evaluationCorrectness(base, changed, 0);
    expect(after.evaluation?.rows[0]?.predicted).toBe(first?.rows[0]?.predicted);
  });

  it("prepares pure metrics outside the measured callback and gates mismatched rows", async () => {
    const dataset = await Effect.runPromise(parseBenchmarkDataset(datasetInput));
    const measure = preparedEvaluationOperation(base, dataset, "evaluation-metrics");
    const first = measure();
    expect(measure()).toEqual(first);

    const correct = evaluationCorrectness(base, dataset, 0);
    expect(report(correct, correct).timings).toHaveLength(2);

    if (correct.evaluation === undefined) throw new Error("Missing evaluation projection");

    const changed: CorrectnessProjection = {
      ...correct,
      evaluation: {
        ...correct.evaluation,
        rows: correct.evaluation.rows.map((row, index) =>
          index === 0 ? { ...row, timestamp: row.timestamp + 1 } : row,
        ),
      },
    };

    const rejected = report(correct, changed);
    expect(rejected.correctness[0]?.status).toBe("failed");
    expect(rejected.timings).toHaveLength(0);
  });

  it("records one expected candidate failure and keeps report encode/decode separate from search", async () => {
    const case_ = evaluationCases.find((item) => item.id === "evaluation-linear-failure-search");

    if (case_ === undefined) throw new Error("Missing failure workload");

    const dataset = await Effect.runPromise(parseBenchmarkDataset(datasetInput));
    const outcome = evaluationOperation(case_, dataset, "evaluation-search");
    expect(outcome).toMatchObject({
      candidates: [{ kind: "success" }, { kind: "success" }, { kind: "failure" }],
    });
    const encoded = preparedEvaluationOperation(case_, dataset, "evaluation-report-encode");
    const decoded = preparedEvaluationOperation(case_, dataset, "evaluation-report-decode");
    expect(encoded()).toBeTypeOf("string");
    expect(decoded()).toMatchObject({ reportKind: "effect-prophet-evaluation" });
    expect(evaluationCorrectness(case_, dataset, 0).evaluation?.assessmentRows).toBe(14);
  });

  it("times monthly and custom metrics on precomputed rows and searches by a custom objective", async () => {
    const case_ = evaluationCases.find((item) => item.id === "evaluation-linear-custom-search");

    if (case_ === undefined) throw new Error("Missing custom search workload");

    const dataset = await Effect.runPromise(parseBenchmarkDataset(datasetInput));
    const monthly = preparedEvaluationOperation(case_, dataset, "evaluation-metrics-monthly")();
    const custom = preparedEvaluationOperation(case_, dataset, "evaluation-metrics-custom")();

    expect(monthly).toMatchObject({ kind: "overall" });
    expect(custom).toMatchObject({
      kind: "overall",
      bucket: { scores: customMetrics.map(({ name }) => ({ metric: name })) },
    });

    const search = evaluationOperation(case_, dataset, "evaluation-search-custom");

    expect(search).toMatchObject({ objective: { metric: { name: "wape" } } });
    expect(evaluationCorrectness(case_, dataset, 0).evaluation?.metricParity).toBeUndefined();
  });

  it("gates Effect's metrics on Python's rows, in Python's order, with no tolerance", async () => {
    const case_ = evaluationCases.find((item) => item.id === "evaluation-linear-custom-search");

    const workload = case_?.workload;

    if (case_ === undefined || workload?.kind !== "evaluation") {
      throw new Error("Missing custom search workload");
    }

    const dataset = await Effect.runPromise(parseBenchmarkDataset(datasetInput));
    const evaluation = evaluationCorrectness(base, dataset, 0).evaluation;

    if (evaluation === undefined) throw new Error("Missing evaluation projection");

    const metrics = ["mae", "rmse", "smape", "mdape", ...customMetrics.map(({ name }) => name)];

    // Stand-in Python evidence: the rows scored in reverse, so ties keep a non-input order.
    const order = evaluation.rows
      .map((row, index) => ({ index, horizon: row.timestamp - row.cutoff }))
      .reverse()
      .sort((left, right) => left.horizon - right.horizon)
      .map(({ index }) => index);

    const scores = await Effect.runPromise(
      performanceMetrics(
        {
          kind: "point",
          rows: order.map((index) => {
            const row = evaluation.rows[index];

            if (row === undefined) throw new Error("Missing row");

            return {
              ...row,
              fold: evaluation.cutoffs.indexOf(row.cutoff),
              horizonMs: row.timestamp - row.cutoff,
            };
          }),
        },
        {
          metrics: ["mae", "rmse", "smape", "mdape", ...customMetrics],
          aggregation: { kind: "overall" },
        },
      ),
    );

    if (scores.kind !== "overall") throw new Error("Expected overall scores");

    const evidence = {
      horizon: "duration" as const,
      metrics,
      order,
      points: [
        {
          horizon: Math.max(...evaluation.rows.map((row) => row.timestamp - row.cutoff)),
          scores: scores.bucket.scores.map((score) => score.value),
        },
      ],
    };

    const gate = (metricParity: ReadonlyArray<typeof evidence>) =>
      metricParityFailure(workload, { ...evaluation, metricParity });

    expect(gate([evidence])).toBeUndefined();

    const [first = 0, ...rest] = evidence.points[0]?.scores ?? [];

    expect(
      gate([
        { ...evidence, points: [{ horizon: 0, scores: [first * (1 + Number.EPSILON), ...rest] }] },
      ]),
    ).toMatch(/differ from performance_metrics/);

    expect(gate([{ ...evidence, order: order.slice(1) }])).toMatch(/not a permutation/);
    expect(gate([{ ...evidence, order: [...order.slice(1), order.length] }])).toMatch(
      /missing row/,
    );
    expect(gate([{ ...evidence, metrics: ["mae", "unknown"] }])).toMatch(/no definition/);

    const python = { ...evaluationCorrectness(base, dataset, 0), caseId: case_.id };

    const missing = buildBenchmarkReport(
      { ...manifest, selectedCases: [case_.id] },
      [{ ...case_, independentRuns: 1 }],
      result("effect-prophet", python),
      result("python-prophet", python),
      new Set(["rolling-origin-evaluation-v1"]),
    );

    expect(missing.correctness[0]).toMatchObject({
      status: "failed",
      note: "Python metric parity evidence is missing.",
    });
  });
});
