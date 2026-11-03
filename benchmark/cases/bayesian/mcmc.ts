import type { BenchmarkCase } from "../../tools/case.ts";
import { growthScalingAndMixedMapCases } from "../growth/mixed-map.ts";
import { prophetDefaultChangepoints, pythonDefaultOptimizer } from "../prophet-defaults.ts";
import { regressorModelCases } from "../regressors/regressor-models.ts";
import { scalarUncertaintyControls } from "../uncertainty/controls.ts";

type MapWorkload = Extract<BenchmarkCase["workload"], { kind: "map" }>;

type Configuration = MapWorkload["configuration"];

const comparison = { kind: "equivalent-posterior", evidenceId: "posterior-nuts-v1" } as const;

/**
 * Fit, point forecast, saving and loading, and ranges in this process and a fresh one. Python's
 * `predict` also computes every component's range over the draws, which Effect's `predict` leaves
 * to `predictWithIntervals`.
 */
const phases = [
  "warm-fit",
  "warm-predict",
  "model-json-encode",
  "model-json-decode",
  "warm-uncertainty",
  "fresh-process-restored-uncertainty",
] as const;

/**
 * Posterior means differ only by Monte Carlo error, which `pointWidthFraction` bounds; the declared
 * point tolerances add nothing to it. Noise scale is a single posterior mean, close in both.
 */
const tolerances = {
  trend: { absolute: 0, relative: 0 },
  component: { absolute: 0, relative: 0 },
  additive: { absolute: 0, relative: 0 },
  forecast: { absolute: 0, relative: 0 },
  noiseScale: { absolute: 0, relative: 0.05 },
  persistence: { absolute: 1e-8, relative: 0 },
};

/** Python's `weekly_seasonality=True` settings, under a name Effect doesn't reserve. */
const weekly = { name: "weekly-custom", periodDays: 7, fourierOrder: 3, priorScale: 10 };

/**
 * Python 1.4.0's scalar `predict` fails on a posterior with exactly one changepoint, whose deltas
 * CmdStan returns as a flat array, so sources declaring one get two automatic changepoints.
 */
const twoChangepoints = { mode: "auto", count: 2, range: 0.8 } as const;

/**
 * Like `Prophet(mcmc_samples=samples)` and `fit(seed=19)`: 4 chains unless declared, each keeping
 * `samples / 2` draws. Ranges come from 1,000 requested futures, `ceil(1000 / draws)` per draw.
 */
const sampledCase = (
  id: string,
  dataset: string,
  configuration: Configuration,
  sampling: { readonly samples: number; readonly chains?: number } = { samples: 300 },
  casePhases: BenchmarkCase["phases"] = phases,
): BenchmarkCase => ({
  id,
  dataset,
  workload: {
    kind: "map",
    comparison,
    configuration,
    pythonOptimizer: pythonDefaultOptimizer,
    mcmc: { ...sampling, seed: 19, pointWidthFraction: 0.15 },
    uncertainty: scalarUncertaintyControls("intervals", 1_000),
  },
  phases: casePhases,
  warmupIterations: 1,
  measuredIterations: 3,
  independentRuns: 2,
  timeoutSeconds: 900,
  correctnessTolerances: tolerances,
});

const sourceConfiguration = (
  cases: ReadonlyArray<BenchmarkCase>,
  id: string,
): Pick<BenchmarkCase, "dataset"> & Pick<MapWorkload, "configuration"> => {
  const source = cases.find((candidate) => candidate.id === id);

  if (source === undefined || source.workload.kind !== "map") {
    throw new Error(`Missing MAP benchmark source: ${id}`);
  }

  return { dataset: source.dataset, configuration: source.workload.configuration };
};

const withTwoChangepoints = ({
  dataset,
  configuration,
}: ReturnType<typeof sourceConfiguration>): ReturnType<typeof sourceConfiguration> => ({
  dataset,
  configuration: { ...configuration, changepoints: twoChangepoints },
});

const linearMixed = withTwoChangepoints(
  sourceConfiguration(growthScalingAndMixedMapCases, "linear-mixed-components"),
);

const flatMixed = sourceConfiguration(growthScalingAndMixedMapCases, "flat-mixed-components");

const logisticFloor = withTwoChangepoints(
  sourceConfiguration(growthScalingAndMixedMapCases, "logistic-explicit-floor-minmax"),
);

const regressorModel = sourceConfiguration(regressorModelCases, "linear-regressor-model");

/** Full Bayesian fits of every growth, compared with Python's `mcmc_samples`. */
export const mcmcCases: ReadonlyArray<BenchmarkCase> = [
  // Conditional multiplicative weekly seasonality, an event, a binary regressor and two
  // automatic changepoints over 96 daily rows.
  sampledCase("mcmc-linear-mixed-components", linearMixed.dataset, linearMixed.configuration),
  // Prophet's 25 automatic changepoints over 256 daily rows, so the posterior carries real
  // trend-change uncertainty into the 64 future rows.
  sampledCase("mcmc-linear-default-changepoints", "v1/linear-medium.json", {
    growth: "linear",
    scaling: "absmax",
    seasonalityMode: "additive",
    holidaysMode: "additive",
    changepoints: prophetDefaultChangepoints,
    changepointPriorScale: 0.05,
    seasonalities: [weekly],
    events: [],
    regressors: [],
  }),
  // Two chains of 250 kept draws, so each draw runs two futures.
  sampledCase("mcmc-flat-mixed-components", flatMixed.dataset, flatMixed.configuration, {
    samples: 500,
    chains: 2,
  }),
  // Changing capacities, an explicit floor, a multiplicative regressor and two automatic
  // changepoints.
  sampledCase(
    "mcmc-logistic-explicit-floor-minmax",
    logisticFloor.dataset,
    logisticFloor.configuration,
  ),
  // A year of daily saturating growth whose rate changes, with 25 automatic changepoints and
  // 90 future rows.
  sampledCase("mcmc-logistic-rate-changes", "v3/logistic-rate-changes.json", {
    growth: "logistic",
    scaling: "absmax",
    seasonalityMode: "additive",
    holidaysMode: "additive",
    changepoints: prophetDefaultChangepoints,
    changepointPriorScale: 0.05,
    seasonalities: [weekly],
    events: [],
    regressors: [],
  }),
  // A regressor forecast by its own MAP model, as `mcmc_samples` doesn't reach it in Python. Each
  // future takes the next of the regressor model's 1,000 draws in turn. Python's `model_to_json`
  // drops regressor models, so there is nothing to save and load. Python passes `fit`'s arguments
  // on to regressor models' optimizer, so only the seed can be given: 4 chains.
  sampledCase(
    "mcmc-linear-regressor-model",
    regressorModel.dataset,
    regressorModel.configuration,
    { samples: 300 },
    ["warm-fit", "warm-predict", "warm-uncertainty"],
  ),
];
