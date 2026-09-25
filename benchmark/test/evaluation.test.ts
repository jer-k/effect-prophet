import { readFileSync } from "node:fs";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";
import { evaluationCases } from "../cases/evaluation.ts";
import {
  evaluationCorrectness,
  evaluationOperation,
  preparedEvaluationOperation,
} from "../evaluation.ts";
import { buildBenchmarkReport } from "../report.ts";
import type { CorrectnessProjection, ImplementationResult, RunManifest } from "../result.ts";

const base = evaluationCases.find((item) => item.id === "evaluation-linear-point");

if (base === undefined) throw new Error("Missing evaluation test case");

const datasetInput: unknown = JSON.parse(
  readFileSync(new URL(`../data/${base.dataset}`, import.meta.url), "utf8"),
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
      evidenceId: "stage-h-evaluation-v1",
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
    new Set(["stage-h-evaluation-v1"]),
  );

describe("evaluation public benchmark", () => {
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
});
