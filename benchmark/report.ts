import type { BenchmarkCase, BenchmarkPhase } from "./case.ts";
import type {
  BenchmarkImplementation,
  BenchmarkMeasurement,
  CorrectnessProjection,
  ForecastProjection,
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

/** Maximum cross-language differences by correctness quantity. */
export interface QuantityDifferences {
  readonly trend: number;
  readonly component: number;
  readonly additive: number;
  readonly forecast: number;
  readonly noiseScale: number;
}

/** Correctness eligibility for one cross-language benchmark case. */
export interface CaseCorrectnessSummary {
  readonly caseId: string;
  readonly status: "passed" | "failed";
  readonly comparison: "equivalent-equation" | "equivalent-objective";
  readonly maximumDifferences?: QuantityDifferences;
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

const emptyDifferences = () => ({
  trend: 0,
  component: 0,
  additive: 0,
  forecast: 0,
  noiseScale: 0,
});

const includeDifference = (
  differences: ReturnType<typeof emptyDifferences>,
  quantity: keyof QuantityDifferences,
  left: number,
  right: number,
): void => {
  const difference = Math.abs(left - right);

  differences[quantity] = Math.max(differences[quantity], difference);
};

const sameNames = (
  left: ReadonlyArray<{ readonly name: string }>,
  right: ReadonlyArray<{ readonly name: string }>,
): boolean =>
  left.length === right.length && left.every((value, index) => value.name === right[index]?.name);

const compareForecast = (
  effectForecast: ForecastProjection,
  pythonForecast: ForecastProjection,
  differences: ReturnType<typeof emptyDifferences>,
): boolean => {
  if (
    effectForecast.timestamp !== pythonForecast.timestamp ||
    !sameNames(effectForecast.seasonalities, pythonForecast.seasonalities) ||
    !sameNames(effectForecast.events, pythonForecast.events) ||
    !sameNames(effectForecast.regressors, pythonForecast.regressors)
  ) {
    return false;
  }

  includeDifference(differences, "forecast", effectForecast.value, pythonForecast.value);
  includeDifference(differences, "trend", effectForecast.trend, pythonForecast.trend);
  includeDifference(differences, "additive", effectForecast.additive, pythonForecast.additive);

  const effectComponents = [
    ...effectForecast.seasonalities,
    ...effectForecast.events,
    ...effectForecast.regressors,
  ];

  const pythonComponents = [
    ...pythonForecast.seasonalities,
    ...pythonForecast.events,
    ...pythonForecast.regressors,
  ];

  for (const [index, effectComponent] of effectComponents.entries()) {
    const pythonComponent = pythonComponents[index];

    if (pythonComponent === undefined) {
      return false;
    }

    includeDifference(differences, "component", effectComponent.value, pythonComponent.value);
  }

  return true;
};

const stableMetadata = (projection: CorrectnessProjection) => ({
  modelKind: projection.modelKind,
  changepointTimestamps: projection.changepointTimestamps,
  seasonalities: projection.seasonalities,
  events: projection.events,
  regressors: projection.regressors.map((regressor) => ({
    name: regressor.name,
    priorScale: regressor.priorScale,
    standardization: regressor.standardization,
    transform:
      regressor.transform.mode === "identity"
        ? { mode: regressor.transform.mode, reason: regressor.transform.reason }
        : { mode: regressor.transform.mode },
  })),
});

const compareProjection = (
  effectProjection: CorrectnessProjection,
  pythonProjection: CorrectnessProjection,
): QuantityDifferences | undefined => {
  if (
    effectProjection.forecasts.length !== pythonProjection.forecasts.length ||
    JSON.stringify(stableMetadata(effectProjection)) !==
      JSON.stringify(stableMetadata(pythonProjection))
  ) {
    return undefined;
  }

  const differences = emptyDifferences();

  for (const [index, effectRegressor] of effectProjection.regressors.entries()) {
    const pythonRegressor = pythonProjection.regressors[index];

    if (pythonRegressor === undefined) {
      return undefined;
    }

    includeDifference(
      differences,
      "component",
      effectRegressor.coefficient,
      pythonRegressor.coefficient,
    );
    includeDifference(differences, "component", effectRegressor.center, pythonRegressor.center);

    if (
      effectRegressor.transform.mode === "standardized" &&
      pythonRegressor.transform.mode === "standardized"
    ) {
      includeDifference(
        differences,
        "component",
        effectRegressor.transform.mean,
        pythonRegressor.transform.mean,
      );
      includeDifference(
        differences,
        "component",
        effectRegressor.transform.sampleStandardDeviation,
        pythonRegressor.transform.sampleStandardDeviation,
      );
    }
  }

  for (const [index, effectForecast] of effectProjection.forecasts.entries()) {
    const pythonForecast = pythonProjection.forecasts[index];

    if (
      pythonForecast === undefined ||
      !compareForecast(effectForecast, pythonForecast, differences)
    ) {
      return undefined;
    }
  }

  if (effectProjection.noiseScale !== undefined || pythonProjection.noiseScale !== undefined) {
    if (effectProjection.noiseScale === undefined || pythonProjection.noiseScale === undefined) {
      return undefined;
    }

    includeDifference(
      differences,
      "noiseScale",
      effectProjection.noiseScale,
      pythonProjection.noiseScale,
    );
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

const quantityPasses = (
  difference: number,
  quantity: keyof QuantityDifferences,
  benchmarkCase: BenchmarkCase,
  effectProjections: ReadonlyArray<CorrectnessProjection>,
  pythonProjections: ReadonlyArray<CorrectnessProjection>,
): boolean => {
  const tolerance = benchmarkCase.correctnessTolerances[quantity];
  let scale = 0;

  for (const projection of [...effectProjections, ...pythonProjections]) {
    if (quantity === "noiseScale") {
      scale = Math.max(scale, Math.abs(projection.noiseScale ?? 0));
      continue;
    }

    for (const forecast of projection.forecasts) {
      if (quantity === "forecast") {
        scale = Math.max(scale, Math.abs(forecast.value));
      } else if (quantity === "trend") {
        scale = Math.max(scale, Math.abs(forecast.trend));
      } else if (quantity === "additive") {
        scale = Math.max(scale, Math.abs(forecast.additive));
      } else {
        for (const component of [
          ...forecast.seasonalities,
          ...forecast.events,
          ...forecast.regressors,
        ]) {
          scale = Math.max(scale, Math.abs(component.value));
        }
      }
    }
  }

  return difference <= tolerance.absolute + tolerance.relative * scale;
};

const correctnessForCase = (
  benchmarkCase: BenchmarkCase,
  effectResult: ImplementationResult,
  pythonResult: ImplementationResult,
  evidenceIds: ReadonlySet<string>,
): CaseCorrectnessSummary => {
  const failures = [...effectResult.failures, ...pythonResult.failures].filter(
    (failure) => failure.caseId === benchmarkCase.id,
  );

  if (failures.length > 0) {
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

  const persistenceFailed = [...effectProjections, ...pythonProjections].some((projection) => {
    const error = projection.persistenceMaximumAbsoluteError;
    const tolerance = benchmarkCase.correctnessTolerances.persistence;

    return error === undefined || error > tolerance.absolute;
  });

  if (persistenceFailed) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: benchmarkCase.workload.comparison.kind,
      note: "At least one public persistence round trip exceeded its tolerance.",
    };
  }

  if (
    benchmarkCase.workload.comparison.kind === "equivalent-objective" &&
    [...effectProjections, ...pythonProjections].some(
      (projection) => projection.fitQuality === undefined || projection.fitQuality.length === 0,
    )
  ) {
    return {
      caseId: benchmarkCase.id,
      status: "failed",
      comparison: benchmarkCase.workload.comparison.kind,
      note: "Equivalent-objective timing requires finite optimizer evidence.",
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

  const maximum = emptyDifferences();

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

    const differences = compareProjection(effectProjection, pythonProjection);

    if (differences === undefined) {
      return {
        caseId: benchmarkCase.id,
        status: "failed",
        comparison: benchmarkCase.workload.comparison.kind,
        note: "Fitted metadata, forecast rows, or named component layouts differ.",
      };
    }

    for (const quantity of Object.keys(maximum)) {
      const key: keyof QuantityDifferences =
        quantity === "trend" ||
        quantity === "component" ||
        quantity === "additive" ||
        quantity === "forecast"
          ? quantity
          : "noiseScale";

      maximum[key] = Math.max(maximum[key], differences[key]);
    }
  }

  const quantities: ReadonlyArray<keyof QuantityDifferences> = [
    "trend",
    "component",
    "additive",
    "forecast",
    "noiseScale",
  ];

  const failedQuantities = quantities.filter(
    (quantity) =>
      !quantityPasses(
        maximum[quantity],
        quantity,
        benchmarkCase,
        effectProjections,
        pythonProjections,
      ),
  );

  const passed = failedQuantities.length === 0;

  return {
    caseId: benchmarkCase.id,
    status: passed ? "passed" : "failed",
    comparison: benchmarkCase.workload.comparison.kind,
    maximumDifferences: maximum,
    note: passed
      ? `Cross-language projections passed evidence ${evidenceId}.`
      : `Cross-language quantities exceeded tolerance: ${failedQuantities.join(", ")}.`,
  };
};

/** Build a neutral correctness and absolute-timing report from raw artifacts. */
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

/** Render a machine-readable benchmark report as reviewable Markdown. */
export const renderBenchmarkMarkdown = (report: BenchmarkReport): string => {
  const lines: Array<string> = [
    `# Effect Prophet benchmark — ${report.run.runId}`,
    "",
    report.purpose,
    "",
    "## Correctness",
    "",
    "| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |",
    "| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |",
  ];

  for (const summary of report.correctness) {
    const differences = summary.maximumDifferences;

    lines.push(
      `| ${escapeTableCell(summary.caseId)} | ${summary.comparison} | ${summary.status} | ${differences?.trend.toExponential(3) ?? "n/a"} | ${differences?.component.toExponential(3) ?? "n/a"} | ${differences?.additive.toExponential(3) ?? "n/a"} | ${differences?.forecast.toExponential(3) ?? "n/a"} | ${differences?.noiseScale.toExponential(3) ?? "n/a"} | ${escapeTableCell(summary.note)} |`,
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
    `- Host: \`${report.run.hostPlatform} ${report.run.hostRelease}/${report.run.hostArchitecture}\` (\`${report.run.hostProcessor}\`)`,
    `- Container platform: \`${report.run.containerPlatform}\``,
    `- Execution mode: ${report.run.emulated ? "architecture-emulated diagnostic run" : "native architecture"}`,
    `- Selected cases: ${report.run.selectedCases.map((value) => `\`${value}\``).join(", ")}`,
    "- Commands:",
    ...report.run.commands.map((command) => `  - \`${command}\``),
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
      `- Versions: ${entry.environment.versions.map((version) => `\`${version.name}=${version.value}\``).join(", ")}`,
      `- Numerical threads: ${entry.environment.numericalThreads.map((control) => `\`${control.name}=${control.value}\``).join(", ")}`,
      `- Resources: ${entry.environment.resources.map((resource) => `\`${resource.name}=${resource.value}\``).join(", ")}`,
      `- Memory: ${entry.environment.memoryMeasurement}`,
      "",
    );
  }

  return `${lines.join("\n")}\n`;
};
