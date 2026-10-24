import type { BenchmarkCase } from "../../tools/case.ts";
import { anomalyIncidents, anomalyTimestamp } from "../../tools/generate-data.ts";
import { defaultCase, defaultCaseTolerances } from "../growth/defaults.ts";
import { logisticReconciliationCases } from "../growth/logistic/public-api.ts";

import { scalarUncertaintyControls } from "./controls.ts";

type AnomalyDataset = keyof typeof anomalyIncidents;

const rowCounts = {
  "linear-anomalies": 365,
  "flat-anomalies": 180,
  "logistic-anomalies": 365,
} as const satisfies Record<AnomalyDataset, number>;

/**
 * Prophet-ruby's `Prophet.anomalies` under both libraries' defaults: fit the whole history, take
 * 99% value ranges from 1,000 simulated paths at every history row, and flag the rows strictly
 * outside them. Effect calls `anomalies`; Python fits, predicts the same frame and compares.
 */
const anomalyCase = (base: BenchmarkCase, dataset: AnomalyDataset): BenchmarkCase => {
  if (base.workload.kind !== "map" || base.workload.fitRequest !== "growth-only") {
    throw new Error("Anomaly cases require a growth-only MAP case");
  }

  return {
    ...base,
    id: `anomalies-${base.workload.configuration.growth}-defaults-99`,
    dataset: `v7/${dataset}.json`,
    workload: {
      ...base.workload,
      uncertainty: { ...scalarUncertaintyControls("intervals", 1_000), intervalWidth: 0.99 },
      anomalies: {
        expected: [...anomalyIncidents[dataset].keys()].map(anomalyTimestamp),
      },
    },
    rowSelection: { historical: rowCounts[dataset], future: 0, stride: 1 },
    phases: ["warm-fit", "warm-uncertainty", "warm-anomalies"],
    warmupIterations: 1,
    measuredIterations: 3,
    independentRuns: 2,
    timeoutSeconds: 900,
    // Outliers flatten the fitted posterior, so default L-BFGS runs stop at different points: on the
    // logistic history neither library's fit reaches Newton's optimum. These cases test the flags,
    // so every trend uses the default-case tolerances, not logistic reconciliation's tighter ones.
    correctnessTolerances: defaultCaseTolerances,
  };
};

const logisticDefaults = logisticReconciliationCases.find(
  (candidate) => candidate.id === "logistic-reconcile-defaults-rate-changes",
);

if (logisticDefaults === undefined) {
  throw new Error("Missing logistic defaults benchmark source");
}

/** In-sample anomaly detection on histories with known outliers, one per trend. */
export const anomalyCases: ReadonlyArray<BenchmarkCase> = [
  anomalyCase(defaultCase("linear", "anomalies", ""), "linear-anomalies"),
  anomalyCase(defaultCase("flat", "anomalies", ""), "flat-anomalies"),
  anomalyCase(logisticDefaults, "logistic-anomalies"),
];
