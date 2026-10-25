import type { BenchmarkCase } from "../../tools/case.ts";
import { defaultCase, defaultCaseTolerances } from "./defaults.ts";
import { logisticReconciliationCases } from "./logistic/public-api.ts";

/**
 * Updating a model with new rows, as Prophet documents it: fit the history's first `baseRows`
 * rows, then refit the whole history from that fit's parameters. Effect passes
 * `warmStartParameters(base)` as `map.warmStart`; Python passes `warm_start_params(base)` as
 * `fit(..., init=...)`. Both libraries keep their default optimizers.
 */
const warmStartCase = (
  source: BenchmarkCase,
  growth: "linear" | "flat" | "logistic",
  baseRows: number,
  newRows: number,
): BenchmarkCase => {
  if (source.workload.kind !== "map" || source.workload.fitRequest !== "growth-only") {
    throw new Error("Warm-start cases require a growth-only MAP case");
  }

  return {
    ...source,
    id: `warm-start-${growth}-defaults-${newRows}-new-${newRows === 1 ? "row" : "rows"}`,
    workload: {
      ...source.workload,
      // Default L-BFGS fits stop at slightly different points, so the two base fits differ a
      // little; a gap beyond this is flagged for investigation.
      warmStart: { baseRows, investigateParameterAbsolute: 0.01 },
    },
    phases: ["warm-fit", "warm-start-fit"],
    warmupIterations: 1,
    measuredIterations: 3,
    independentRuns: 2,
    // Default logistic L-BFGS stops well short of Newton's optimum in both libraries, so the two
    // base fits, and the refits that start from them, end at different points. Started from
    // Python's base parameters, Effect's refit matches Python's objective, so every trend uses the
    // default-case tolerances, not logistic reconciliation's tighter ones.
    correctnessTolerances: defaultCaseTolerances,
  };
};

const logisticDefaults = logisticReconciliationCases.find(
  (candidate) => candidate.id === "logistic-reconcile-defaults-rate-changes",
);

if (logisticDefaults === undefined) {
  throw new Error("Missing logistic defaults benchmark source");
}

const linearMedium = defaultCase("linear", "medium", "v1/linear-medium.json");

/**
 * Refits from a previous fit after a day, a week and a month of new rows, under library defaults.
 *
 * Logistic refits after a month of new rows are left out: from a warm start, default L-BFGS
 * settles with a noise scale hundreds of times a fresh fit's in both libraries (139.9 against 0.64
 * here, and in Python 1.4.0). Both find the same trend, but the seasonal coefficients barely
 * matter at that noise and end wherever each optimizer stops, so no tolerance compares them.
 */
export const warmStartCases: ReadonlyArray<BenchmarkCase> = [
  // 256 rows, so both libraries fit with L-BFGS.
  warmStartCase(linearMedium, "linear", 226, 30),
  warmStartCase(linearMedium, "linear", 255, 1),
  // 96 rows, so both libraries fit with Newton.
  warmStartCase(defaultCase("flat", "seasonal", "v1/flat-seasonal.json"), "flat", 89, 7),
  // 365 rows whose growth rate changes twice, with 25 automatic changepoints.
  warmStartCase(logisticDefaults, "logistic", 358, 7),
];
