import type { BenchmarkCase, BenchmarkPhase } from "./case.ts";
import type {
  BenchmarkImplementation,
  BenchmarkMeasurement,
  CorrectnessProjection,
  ImplementationResult,
  RunManifest,
} from "./result.ts";

/** Distribution summary derived from retained raw timing samples. */
export interface TimingSummary {
  readonly caseId: string;
  readonly phase: BenchmarkPhase;
  readonly implementation: BenchmarkImplementation;
  readonly sampleCount: number;
  readonly medianNanoseconds: number;
  readonly p90Nanoseconds: number;
  readonly minimumNanoseconds: number;
  readonly maximumNanoseconds: number;
}

/** Correctness eligibility for one cross-language benchmark case. */
export interface CaseCorrectnessSummary {
  readonly caseId: string;
  readonly status: "passed" | "failed";
  readonly comparison: "different-objective" | "equivalent-equation" | "equivalent-objective";
  readonly maximumAbsoluteDifference?: number;
  readonly maximumRelativeDifference?: number;
  readonly note: string;
}

/** Complete machine-readable report generated from raw implementation records. */
export interface BenchmarkReport {
  readonly schemaVersion: 1;
  readonly run: RunManifest;
  readonly generatedAt: string;
  readonly purpose: string;
  readonly correctness: ReadonlyArray<CaseCorrectnessSummary>;
  readonly timings: ReadonlyArray<TimingSummary>;
  readonly failures: ReadonlyArray<ImplementationResult["failures"][number]>;
  readonly environments: ReadonlyArray<{
    readonly implementation: BenchmarkImplementation;
    readonly environment: ImplementationResult["environment"];
  }>;
}

const quantile = (sorted: ReadonlyArray<number>, probability: number): number => {
  if (sorted.length === 0) {
    return 0;
  }

  const index = Math.max(0, Math.ceil(probability * sorted.length) - 1);

  return sorted[index] ?? sorted.at(-1) ?? 0;
};

const summarizeMeasurements = (
  measurements: ReadonlyArray<BenchmarkMeasurement>,
): ReadonlyArray<TimingSummary> => {
  const grouped = new Map<string, Array<number>>();
  const metadata = new Map<string, Pick<TimingSummary, "caseId" | "phase" | "implementation">>();

  for (const measurement of measurements) {
    const key = `${measurement.caseId}\u0000${measurement.phase}\u0000${measurement.implementation}`;
    const samples = grouped.get(key);

    if (samples === undefined) {
      grouped.set(key, Array.from(measurement.samplesNanoseconds));
      metadata.set(key, {
        caseId: measurement.caseId,
        phase: measurement.phase,
        implementation: measurement.implementation,
      });
    } else {
      samples.push(...measurement.samplesNanoseconds);
    }
  }

  const summaries: Array<TimingSummary> = [];

  for (const [key, samples] of grouped) {
    const fields = metadata.get(key);

    if (fields === undefined || samples.length === 0) {
      continue;
    }

    const sorted = Array.from(samples).sort((left, right) => left - right);

    summaries.push({
      ...fields,
      sampleCount: sorted.length,
      medianNanoseconds: quantile(sorted, 0.5),
      p90Nanoseconds: quantile(sorted, 0.9),
      minimumNanoseconds: sorted[0] ?? 0,
      maximumNanoseconds: sorted.at(-1) ?? 0,
    });
  }

  return summaries.sort((left, right) =>
    `${left.caseId}:${left.phase}:${left.implementation}`.localeCompare(
      `${right.caseId}:${right.phase}:${right.implementation}`,
    ),
  );
};

const relativeDifference = (left: number, right: number): number => {
  const scale = Math.max(Math.abs(left), Math.abs(right), Number.MIN_VALUE);

  return Math.abs(left - right) / scale;
};

interface DifferenceAccumulator {
  absolute: number;
  relative: number;
}

const includeDifference = (
  accumulator: DifferenceAccumulator,
  left: number,
  right: number,
): void => {
  accumulator.absolute = Math.max(accumulator.absolute, Math.abs(left - right));
  accumulator.relative = Math.max(accumulator.relative, relativeDifference(left, right));
};

const compareProjection = (
  effectProjection: CorrectnessProjection,
  pythonProjection: CorrectnessProjection,
): DifferenceAccumulator | undefined => {
  if (effectProjection.forecasts.length !== pythonProjection.forecasts.length) {
    return undefined;
  }

  const differences: DifferenceAccumulator = { absolute: 0, relative: 0 };

  for (const [index, effectForecast] of effectProjection.forecasts.entries()) {
    const pythonForecast = pythonProjection.forecasts[index];

    if (pythonForecast === undefined || effectForecast.timestamp !== pythonForecast.timestamp) {
      return undefined;
    }

    includeDifference(differences, effectForecast.value, pythonForecast.value);
    includeDifference(differences, effectForecast.trend, pythonForecast.trend);
    includeDifference(differences, effectForecast.additive, pythonForecast.additive);

    if (effectForecast.seasonalities.length !== pythonForecast.seasonalities.length) {
      return undefined;
    }

    for (const [componentIndex, effectComponent] of effectForecast.seasonalities.entries()) {
      const pythonComponent = pythonForecast.seasonalities[componentIndex];

      if (pythonComponent === undefined || effectComponent.name !== pythonComponent.name) {
        return undefined;
      }

      includeDifference(differences, effectComponent.value, pythonComponent.value);
    }
  }

  if (effectProjection.noiseScale !== undefined && pythonProjection.noiseScale !== undefined) {
    includeDifference(differences, effectProjection.noiseScale, pythonProjection.noiseScale);
  }

  return differences;
};

const projectionsForCase = (
  projections: ReadonlyArray<CorrectnessProjection>,
  caseId: string,
): ReadonlyArray<CorrectnessProjection> =>
  projections
    .filter((projection) => projection.caseId === caseId)
    .sort((left, right) => left.run - right.run);

const correctnessForCase = (
  benchmarkCase: BenchmarkCase,
  effectResult: ImplementationResult,
  pythonResult: ImplementationResult,
  evidenceIds: ReadonlySet<string>,
): CaseCorrectnessSummary => {
  const effectFailures = effectResult.failures.filter(
    (failure) => failure.caseId === benchmarkCase.id,
  );

  const pythonFailures = pythonResult.failures.filter(
    (failure) => failure.caseId === benchmarkCase.id,
  );

  if (effectFailures.length > 0 || pythonFailures.length > 0) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: benchmarkCase.workload.comparison.kind,
      note: "At least one implementation run failed before correctness eligibility was established.",
    };
  }

  const effectProjections = projectionsForCase(effectResult.correctness, benchmarkCase.id);
  const pythonProjections = projectionsForCase(pythonResult.correctness, benchmarkCase.id);

  if (
    effectProjections.length !== benchmarkCase.independentRuns ||
    pythonProjections.length !== benchmarkCase.independentRuns
  ) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: benchmarkCase.workload.comparison.kind,
      note: "One or more independent runs omitted local correctness evidence.",
    };
  }

  const allProjections = [...effectProjections, ...pythonProjections];

  const persistenceFailed = allProjections.some(
    (projection) =>
      projection.persistenceMaximumAbsoluteError === undefined ||
      projection.persistenceMaximumAbsoluteError > benchmarkCase.correctnessTolerance.absolute,
  );

  if (persistenceFailed) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: benchmarkCase.workload.comparison.kind,
      note: "At least one public persistence round trip exceeded the correctness tolerance.",
    };
  }

  if (
    benchmarkCase.workload.comparison.kind === "equivalent-objective" &&
    allProjections.some(
      (projection) => projection.fitQuality === undefined || projection.fitQuality.length === 0,
    )
  ) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: "equivalent-objective",
      note: "Equivalent-objective timing requires finite optimizer quality evidence from both implementations.",
    };
  }

  if (benchmarkCase.workload.comparison.kind === "different-objective") {
    return {
      caseId: benchmarkCase.id,
      status: "passed",
      comparison: "different-objective",
      note: "Both implementations passed local checks; cross-language forecast equality is not applicable.",
    };
  }

  const evidenceId = benchmarkCase.workload.comparison.evidenceId;

  if (!evidenceIds.has(evidenceId)) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: benchmarkCase.workload.comparison.kind,
      note: `Comparison evidence ${evidenceId} is missing.`,
    };
  }

  const maximum: DifferenceAccumulator = { absolute: 0, relative: 0 };

  for (const [index, effectProjection] of effectProjections.entries()) {
    const pythonProjection = pythonProjections[index];

    if (pythonProjection === undefined || effectProjection.run !== pythonProjection.run) {
      return {
        caseId: benchmarkCase.id,
        status: "failed",
        comparison: benchmarkCase.workload.comparison.kind,
        note: "Independent correctness runs are not aligned.",
      };
    }

    const difference = compareProjection(effectProjection, pythonProjection);

    if (difference === undefined) {
      return {
        caseId: benchmarkCase.id,
        status: "failed",
        comparison: benchmarkCase.workload.comparison.kind,
        note: "Forecast rows or named component layouts differ.",
      };
    }

    maximum.absolute = Math.max(maximum.absolute, difference.absolute);
    maximum.relative = Math.max(maximum.relative, difference.relative);
  }

  const tolerance = benchmarkCase.correctnessTolerance;
  const passed = maximum.absolute <= tolerance.absolute || maximum.relative <= tolerance.relative;

  return {
    caseId: benchmarkCase.id,
    status: passed ? "passed" : "failed",
    comparison: benchmarkCase.workload.comparison.kind,
    maximumAbsoluteDifference: maximum.absolute,
    maximumRelativeDifference: maximum.relative,
    note: passed
      ? `Cross-language projections passed evidence ${evidenceId}.`
      : `Cross-language projections exceeded the configured absolute-plus-relative tolerance for evidence ${evidenceId}.`,
  };
};

/**
 * Build a neutral correctness and absolute-timing report from raw implementation artifacts.
 *
 * No relative speedup, ranking, winner, or performance gate is calculated.
 *
 * @param manifest - Host and source provenance for the Compose run.
 * @param cases - Parsed selected case declarations.
 * @param effectResult - Raw Effect Prophet result artifact.
 * @param pythonResult - Raw Python Prophet result artifact.
 * @param evidenceIds - Reviewed evidence identifiers available to authorize comparisons.
 * @returns A complete machine-readable report.
 */
export const buildBenchmarkReport = (
  manifest: RunManifest,
  cases: ReadonlyArray<BenchmarkCase>,
  effectResult: ImplementationResult,
  pythonResult: ImplementationResult,
  evidenceIds: ReadonlySet<string>,
): BenchmarkReport => {
  const correctness = cases.map((benchmarkCase) =>
    correctnessForCase(benchmarkCase, effectResult, pythonResult, evidenceIds),
  );

  const passedCases = new Set<string>();

  for (const summary of correctness) {
    if (summary.status === "passed") {
      passedCases.add(summary.caseId);
    }
  }

  const acceptedMeasurements = [...effectResult.measurements, ...pythonResult.measurements].filter(
    (measurement) => passedCases.has(measurement.caseId),
  );

  return {
    schemaVersion: 1,
    run: manifest,
    generatedAt: new Date().toISOString(),
    purpose:
      "Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.",
    correctness,
    timings: summarizeMeasurements(acceptedMeasurements),
    failures: [...effectResult.failures, ...pythonResult.failures],
    environments: [
      { implementation: effectResult.implementation, environment: effectResult.environment },
      { implementation: pythonResult.implementation, environment: pythonResult.environment },
    ],
  };
};

const milliseconds = (nanoseconds: number): string => (nanoseconds / 1_000_000).toFixed(3);

const escapeTableCell = (value: string): string =>
  value.replaceAll("|", "\\|").replaceAll("\r\n", "<br>").replaceAll("\n", "<br>");

/**
 * Render a machine-readable benchmark report as reviewable Markdown.
 *
 * @param report - Report produced from retained raw records.
 * @returns A Markdown document with correctness, absolute timings, failures, and provenance.
 */
export const renderBenchmarkMarkdown = (report: BenchmarkReport): string => {
  const lines: Array<string> = [
    `# Effect Prophet benchmark — ${report.run.runId}`,
    "",
    report.purpose,
    "",
    "## Correctness",
    "",
    "| Case | Classification | Status | Max absolute difference | Max relative difference | Note |",
    "| --- | --- | --- | ---: | ---: | --- |",
  ];

  for (const summary of report.correctness) {
    lines.push(
      `| ${escapeTableCell(summary.caseId)} | ${summary.comparison} | ${summary.status} | ${summary.maximumAbsoluteDifference?.toExponential(3) ?? "n/a"} | ${summary.maximumRelativeDifference?.toExponential(3) ?? "n/a"} | ${escapeTableCell(summary.note)} |`,
    );
  }

  lines.push(
    "",
    "## Absolute timings",
    "",
    "Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.",
    "",
    "| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) |",
    "| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |",
  );

  for (const timing of report.timings) {
    lines.push(
      `| ${escapeTableCell(timing.caseId)} | ${timing.phase} | ${timing.implementation} | ${timing.sampleCount} | ${milliseconds(timing.medianNanoseconds)} | ${milliseconds(timing.p90Nanoseconds)} | ${milliseconds(timing.minimumNanoseconds)} | ${milliseconds(timing.maximumNanoseconds)} |`,
    );
  }

  lines.push("", "## Failures", "");

  if (report.failures.length === 0) {
    lines.push("No structured failures were recorded.");
  } else {
    lines.push(
      "| Case | Implementation | Run | Stage | Message |",
      "| --- | --- | ---: | --- | --- |",
    );

    for (const failure of report.failures) {
      lines.push(
        `| ${escapeTableCell(failure.caseId)} | ${failure.implementation} | ${failure.run} | ${failure.stage} | ${escapeTableCell(failure.message)} |`,
      );
    }
  }

  lines.push(
    "",
    "## Provenance",
    "",
    `- Git revision: \`${report.run.gitRevision}\`${report.run.gitDirty ? " (dirty)" : ""}`,
    `- Host: \`${report.run.hostPlatform}/${report.run.hostArchitecture}\``,
    `- Container platform: \`${report.run.containerPlatform}\``,
    `- Execution mode: ${report.run.emulated ? "architecture-emulated diagnostic run" : "native architecture"}`,
    `- Selected cases: ${report.run.selectedCases.map((value) => `\`${value}\``).join(", ")}`,
    "- Container images:",
    ...report.run.containerImages.map((image) => `  - \`${image.name}\`: \`${image.value}\``),
    "",
  );

  for (const entry of report.environments) {
    lines.push(
      `### ${entry.implementation}`,
      "",
      `- Runtime: \`${entry.environment.runtime} ${entry.environment.runtimeVersion}\``,
      `- Container: \`${entry.environment.operatingSystem}/${entry.environment.architecture}\``,
      `- Processor: \`${entry.environment.processor}\``,
      `- Resources: ${entry.environment.resources.map((resource) => `\`${resource.name}=${resource.value}\``).join(", ")}`,
      `- Memory: ${entry.environment.memoryMeasurement}`,
      "",
    );
  }

  return `${lines.join("\n")}\n`;
};
