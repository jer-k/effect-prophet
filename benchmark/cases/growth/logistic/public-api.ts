import type { BenchmarkCase } from "../../../tools/case.ts";
import {
  outputFirstQuality,
  pythonDefaultOptimizer as pythonOptimizer,
} from "../../prophet-defaults.ts";

const phases = [
  "warm-fit",
  "warm-predict",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-predict",
] as const;

const weekly = { name: "weekly-custom", periodDays: 7, fourierOrder: 3, priorScale: 10 };

const promotion = { name: "promotion", priorScale: 10, standardization: "never" } as const;

const events = ["2020-01-22", "2020-04-16"].map((date) => ({
  name: "campaign",
  date,
  lowerWindowDays: -1,
  upperWindowDays: 1,
  priorScale: 10,
}));

const configuration = {
  growth: "logistic",
  scaling: "absmax",
  seasonalityMode: "additive",
  holidaysMode: "additive",
  changepoints: { mode: "explicit", timestamps: ["2020-02-08T00:00:00.000Z"] },
  changepointPriorScale: 0.05,
  seasonalities: [],
  events: [],
  regressors: [],
} as const;

type Configuration = Extract<
  BenchmarkCase["workload"],
  { readonly kind: "stage-f-map" }
>["configuration"];

const configuredCase = (
  id: string,
  dataset: string,
  settings: Configuration = configuration,
): BenchmarkCase => ({
  id: `logistic-reconcile-${id}`,
  dataset: `v2/${dataset}.json`,
  workload: {
    kind: "stage-f-map",
    comparison: { kind: "equivalent-objective", evidenceId: "logistic-python-reconciliation-v1" },
    configuration: settings,
    pythonOptimizer,
  },
  phases,
  warmupIterations: 1,
  measuredIterations: 2,
  independentRuns: 2,
  timeoutSeconds: 600,
  correctnessTolerances: {
    trend: { absolute: 0.01, relative: 0.0001 },
    component: { absolute: 0.002, relative: 0.0001 },
    additive: { absolute: 0.002, relative: 0.0001 },
    forecast: { absolute: 0.01, relative: 0.0001 },
    noiseScale: { absolute: 0.02, relative: 0 },
    persistence: { absolute: 1e-8, relative: 0 },
  },
  optimizerQuality: outputFirstQuality,
});

/** Both libraries' logistic defaults; only the expected resolved weekly seasonality is declared. */
const defaultsCase = (id: string, dataset: string): BenchmarkCase => {
  const original = configuredCase(`defaults-${id}`, "");

  if (original.workload.kind !== "stage-f-map") throw new Error("Expected logistic fitting case");

  return {
    ...original,
    dataset,
    workload: {
      ...original.workload,
      fitRequest: "growth-only",
      configuration: {
        ...configuration,
        changepoints: { mode: "auto", count: 25, range: 0.8 },
        // Expected resolved metadata, NOT a custom seasonality request.
        seasonalities: [{ ...weekly, name: "weekly" }],
      },
    },
  };
};

/** Python-default logistic investigation targets; declarations do not imply passing parity. */
export const logisticReconciliationCases: ReadonlyArray<BenchmarkCase> = [
  ...(["absmax", "minmax"] as const).flatMap((scaling) =>
    (["empty", "explicit", "auto"] as const).map((points) =>
      configuredCase(`basic-96-${points}-${scaling}`, "logistic-basic-96", {
        ...configuration,
        scaling,
        changepoints:
          points === "auto"
            ? { mode: "auto", count: 3, range: 0.8 }
            : {
                mode: "explicit",
                timestamps: points === "empty" ? [] : configuration.changepoints.timestamps,
              },
      }),
    ),
  ),
  ...(["absmax", "minmax"] as const).map((scaling) =>
    configuredCase(`empty-loose-prior-${scaling}`, "logistic-basic-96", {
      ...configuration,
      scaling,
      changepoints: { mode: "explicit", timestamps: [] },
      changepointPriorScale: 10,
    }),
  ),
  ...([99, 100, 256] as const).map((count) =>
    configuredCase(`basic-${count}`, `logistic-basic-${count}`),
  ),
  defaultsCase("96", "v2/logistic-weekly-96.json"),
  defaultsCase("256", "v2/logistic-weekly-256.json"),
  // Growth-rate changes at 35% and 65% of the history, so the 25 automatic changepoints have
  // real changes to fit. The weekly datasets are one smooth curve, so their deltas fit near zero.
  defaultsCase("rate-changes", "v3/logistic-rate-changes.json"),
  configuredCase("weekly", "logistic-weekly-96", { ...configuration, seasonalities: [weekly] }),
  configuredCase("conditional", "logistic-conditional-96", {
    ...configuration,
    seasonalities: [{ ...weekly, conditionName: "active" }],
  }),
  configuredCase("event", "logistic-event-96", { ...configuration, events }),
  configuredCase("regressor-additive", "logistic-regressor-additive-96", {
    ...configuration,
    regressors: [promotion],
  }),
  configuredCase("regressor-multiplicative", "logistic-regressor-multiplicative-96", {
    ...configuration,
    regressors: [{ ...promotion, mode: "multiplicative" }],
  }),
  ...(["absmax", "minmax"] as const).flatMap((scaling) => [
    configuredCase(`explicit-floor-${scaling}`, "logistic-floor-96", { ...configuration, scaling }),
    configuredCase(`mixed-${scaling}`, "logistic-mixed-96", {
      ...configuration,
      scaling,
      seasonalities: [{ ...weekly, conditionName: "active" }],
      events,
      regressors: [{ ...promotion, mode: "multiplicative" }],
    }),
  ]),
  ...(
    ["unsorted", "duplicates", "declining", "saturated", "constant", "out-of-bounds"] as const
  ).map((variant) =>
    configuredCase(variant, `logistic-${variant}-96`, {
      ...configuration,
      changepoints: {
        mode: "explicit",
        timestamps: [
          variant === "duplicates" ? "2020-01-20T00:00:00.000Z" : "2020-02-08T00:00:00.000Z",
        ],
      },
    }),
  ),
];
