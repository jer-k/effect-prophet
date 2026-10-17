import type { Types } from "effect";
import fc from "fast-check";

import { linearOptimizers } from "../cases/growth/linear/controls.ts";
import { pythonDefaultOptimizer } from "../cases/prophet-defaults.ts";
import type { BenchmarkDataset } from "./case.ts";
import type { DifferentialCase } from "./differential.ts";

type Workload = DifferentialCase["workload"];

type Configuration = Workload["configuration"];

type Observation = BenchmarkDataset["observations"][number];

type PredictionRow = BenchmarkDataset["predictionRows"][number];

type Covariates = Omit<PredictionRow, "timestamp">;

type Mode = "additive" | "multiplicative";

const dayMilliseconds = 86_400_000;

const cadenceMilliseconds = {
  hourly: 3_600_000,
  daily: dayMilliseconds,
  weekly: 7 * dayMilliseconds,
} as const;

type Cadence = keyof typeof cadenceMilliseconds;

const origin = Date.UTC(2015, 0, 1);

/** Pick from weighted constants. */
const weighted = <Value>(
  ...choices: ReadonlyArray<readonly [weight: number, value: Value]>
): fc.Arbitrary<Value> =>
  fc.oneof(...choices.map(([weight, value]) => ({ weight, arbitrary: fc.constant(value) })));

const mode = fc.constantFrom<Mode>("additive", "multiplicative");

const unit = fc.double({ min: -1, max: 1, noNaN: true });

const priorScale = fc.constantFrom(0.1, 1, 10);

// Effect reserves the built-in names, so custom seasonalities use the benchmarks' `-custom` names.
const seasonalityPool = [
  { name: "weekly-custom", periodDays: 7, maximumOrder: 4 },
  { name: "monthly", periodDays: 30.5, maximumOrder: 5 },
  { name: "yearly-custom", periodDays: 365.25, maximumOrder: 10 },
  { name: "daily-custom", periodDays: 1, maximumOrder: 4 },
] as const;

const seasonalityRecipe = (maximumOrder: number) =>
  fc.option(
    fc.record({
      fourierOrder: fc.integer({ min: 1, max: maximumOrder }),
      priorScale,
      mode: fc.option(mode, { nil: undefined }),
      conditional: weighted([4, false], [1, true]),
      amplitude: fc.double({ min: 0.05, max: 1, noNaN: true }),
      phase: fc.double({ min: 0, max: 2 * Math.PI, noNaN: true }),
    }),
    { nil: undefined, freq: 2 },
  );

const recipeArbitrary = fc.record({
  growth: fc.constantFrom("linear", "flat", "logistic"),
  defaults: weighted([5, false], [1, true]),
  // Ill-posed cases keep seasonalities longer than the history and more coefficients than rows.
  wellPosed: weighted([4, true], [1, false]),
  cadence: weighted<Cadence>([1, "hourly"], [4, "daily"], [1, "weekly"]),
  rows: fc.oneof(
    { weight: 1, arbitrary: fc.integer({ min: 2, max: 12 }) },
    { weight: 3, arbitrary: fc.integer({ min: 30, max: 200 }) },
    { weight: 1, arbitrary: fc.integer({ min: 300, max: 800 }) },
  ),
  startDay: fc.integer({ min: 0, max: 3_000 }),
  gapRate: weighted([2, 0], [1, 0.05], [1, 0.3]),
  duplicateRate: weighted([3, 0], [1, 0.05]),
  shuffled: fc.boolean(),
  level: fc.constantFrom(0, 10, -50, 1_000, 1e6),
  amplitude: fc.constantFrom(0.01, 1, 100, 10_000),
  slope: unit,
  breaks: fc.array(
    fc.record({ at: fc.double({ min: 0.1, max: 0.9, noNaN: true }), change: unit }),
    { maxLength: 3 },
  ),
  logistic: fc.record({
    floor: fc.boolean(),
    capacityMultiple: fc.double({ min: 1.5, max: 5, noNaN: true }),
    growingCapacity: fc.boolean(),
    midpoint: fc.double({ min: 0.2, max: 0.8, noNaN: true }),
    steepness: fc.double({ min: 1, max: 12, noNaN: true }),
  }),
  noise: fc.constantFrom(0, 0.01, 0.1, 0.5),
  outliers: weighted([4, 0], [1, 1], [1, 3]),
  scaling: fc.constantFrom("absmax", "minmax"),
  seasonalityMode: mode,
  holidaysMode: mode,
  seasonalities: fc.tuple(
    ...seasonalityPool.map((seasonality) => seasonalityRecipe(seasonality.maximumOrder)),
  ),
  regressors: fc.array(
    fc.record({
      binary: fc.boolean(),
      coefficient: unit,
      priorScale,
      standardization: fc.constantFrom("auto", "always", "never"),
      mode: fc.option(mode, { nil: undefined }),
    }),
    { maxLength: 2 },
  ),
  events: fc.array(
    fc.record({
      occurrences: fc.array(fc.double({ min: 0, max: 1.2, noNaN: true }), {
        minLength: 1,
        maxLength: 4,
      }),
      lowerWindowDays: fc.integer({ min: -2, max: 0 }),
      upperWindowDays: fc.integer({ min: 0, max: 2 }),
      priorScale,
      effect: unit,
    }),
    { maxLength: 2 },
  ),
  changepoints: fc.oneof(
    fc.record({
      mode: fc.constant("auto" as const),
      count: fc.integer({ min: 0, max: 30 }),
      range: fc.constantFrom(0.5, 0.8, 0.95),
    }),
    fc.record({
      mode: fc.constant("explicit" as const),
      fractions: fc.array(fc.double({ min: 0.05, max: 0.95, noNaN: true }), { maxLength: 4 }),
    }),
  ),
  changepointPriorScale: fc.constantFrom(0.001, 0.01, 0.05, 0.5),
  horizon: fc.integer({ min: 1, max: 60 }),
  inSample: fc.integer({ min: 0, max: 10 }),
});

type Recipe = typeof recipeArbitrary extends fc.Arbitrary<infer Value> ? Value : never;

/** Independent uniform draws in [-1, 1] for each source of per-row randomness. */
interface Streams {
  readonly noise: ReadonlyArray<number>;
  readonly covariate: ReadonlyArray<number>;
  readonly selection: ReadonlyArray<number>;
}

const generatedArbitrary = fc.noBias(
  recipeArbitrary.chain((recipe) => {
    const length = recipe.rows + recipe.horizon;
    const stream = fc.array(unit, { minLength: length, maxLength: length });

    return fc
      .record({ noise: stream, covariate: stream, selection: stream })
      .map((streams) => ({ recipe, streams }));
  }),
);

const draw = (values: ReadonlyArray<number>, index: number): number =>
  values[index % values.length] ?? 0;

/** A draw mapped onto [0, 1). */
const probability = (values: ReadonlyArray<number>, index: number): number =>
  Math.min(0.999_999, (draw(values, index) + 1) / 2);

const sigmoid = (value: number): number => 1 / (1 + Math.exp(-value));

const isoTimestamp = (epoch: number): string => new Date(epoch).toISOString();

const isoDate = (epoch: number): string => isoTimestamp(epoch).slice(0, 10);

const conditionName = "active";

/** Build one replayable case from its generated recipe and per-row draws. */
const buildCase = (seed: number, recipe: Recipe, streams: Streams): DifferentialCase => {
  const step = cadenceMilliseconds[recipe.cadence];
  const start = origin + recipe.startDay * dayMilliseconds;
  const trainingEnd = start + (recipe.rows - 1) * step;
  const span = Math.max(trainingEnd - start, step);
  const position = (epoch: number) => (epoch - start) / span;

  const seasonalities = seasonalityPool.flatMap((definition, index) => {
    const seasonality = recipe.seasonalities[index];

    // Sub-daily seasonality needs sub-daily rows; on daily rows its columns are constant.
    if (seasonality === undefined || (definition.periodDays < 1.5 && recipe.cadence !== "hourly")) {
      return [];
    }

    if (!recipe.wellPosed) {
      return [{ ...definition, ...seasonality }];
    }

    // Like Prophet's automatic seasonalities, require two full periods of history, and keep each
    // seasonality's columns well below the row count.
    if (2 * definition.periodDays * dayMilliseconds > span) {
      return [];
    }

    const fourierOrder = Math.max(
      1,
      Math.min(seasonality.fourierOrder, Math.floor(recipe.rows / 8)),
    );

    return [{ ...definition, ...seasonality, fourierOrder }];
  });

  const conditional = seasonalities.some((seasonality) => seasonality.conditional);

  const regressors = recipe.regressors.map((regressor, index) => ({
    ...regressor,
    name: `${regressor.binary ? "promotion" : "temperature"}-${index + 1}`,
  }));

  const eventNames = ["launch", "campaign"];

  const events = recipe.events.flatMap((event, index) =>
    Array.from(
      new Set(event.occurrences.map((fraction) => isoDate(start + fraction * span))),
      (date) => ({
        name: eventNames[index] ?? `event-${index + 1}`,
        date,
        lowerWindowDays: event.lowerWindowDays,
        upperWindowDays: event.upperWindowDays,
        priorScale: event.priorScale,
        effect: event.effect,
      }),
    ),
  );

  const floor = recipe.growth === "logistic" && recipe.logistic.floor ? recipe.level : undefined;

  const capacityAt = (epoch: number): number => {
    const base = floor ?? 0;
    const capacity = base + recipe.amplitude * recipe.logistic.capacityMultiple;

    return recipe.logistic.growingCapacity
      ? capacity + recipe.amplitude * 0.5 * position(epoch)
      : capacity;
  };

  const covariatesAt = (epoch: number, index: number): Covariates => {
    const regressorValues = Object.fromEntries(
      regressors.map((regressor) => [
        regressor.name,
        regressor.binary
          ? probability(streams.covariate, index) > 0.7
            ? 1
            : 0
          : 20 +
            10 * Math.sin((2 * Math.PI * epoch) / (365.25 * dayMilliseconds)) +
            3 * draw(streams.covariate, index),
      ]),
    );

    const covariates: Types.Mutable<Covariates> = {};

    if (recipe.growth === "logistic") {
      covariates.capacity = capacityAt(epoch);
    }

    if (floor !== undefined) {
      covariates.floor = floor;
    }

    if (regressors.length > 0) {
      covariates.regressors = regressorValues;
    }

    if (conditional) {
      // Ten-row blocks alternate, so conditional seasonalities see both states at any cadence.
      covariates.conditions = {
        [conditionName]: Math.floor((epoch - start) / (10 * step)) % 2 === 0,
      };
    }

    return covariates;
  };

  const trendAt = (epoch: number): number => {
    const x = position(epoch);

    if (recipe.growth === "flat") {
      return recipe.level;
    }

    if (recipe.growth === "logistic") {
      const base = floor ?? 0;
      const direction = recipe.slope < 0 ? -1 : 1;

      return (
        base +
        (capacityAt(epoch) - base) *
          sigmoid(direction * recipe.logistic.steepness * (x - recipe.logistic.midpoint))
      );
    }

    const breaks = recipe.breaks.reduce(
      (sum, item) => sum + item.change * Math.max(0, x - item.at),
      0,
    );

    return recipe.level + recipe.amplitude * (recipe.slope * x + breaks);
  };

  const valueAt = (epoch: number, index: number, covariates: Covariates): number => {
    const trend = trendAt(epoch);
    let additive = 0;
    let multiplicative = 0;

    const add = (componentMode: Mode, magnitude: number) => {
      if (componentMode === "additive") {
        additive += recipe.amplitude * magnitude;
      } else {
        multiplicative += 0.3 * magnitude;
      }
    };

    for (const seasonality of seasonalities) {
      if (seasonality.conditional && covariates.conditions?.[conditionName] !== true) {
        continue;
      }

      const angle = (2 * Math.PI * epoch) / (seasonality.periodDays * dayMilliseconds);

      add(
        seasonality.mode ?? recipe.seasonalityMode,
        seasonality.amplitude * Math.sin(angle + seasonality.phase),
      );
    }

    for (const regressor of regressors) {
      const value = covariates.regressors?.[regressor.name] ?? 0;
      const standardized = regressor.binary ? value : (value - 20) / 10;

      add(regressor.mode ?? recipe.seasonalityMode, regressor.coefficient * standardized);
    }

    const day = Date.parse(isoDate(epoch));

    for (const event of events) {
      const offset = (day - Date.parse(event.date)) / dayMilliseconds;

      if (offset >= event.lowerWindowDays && offset <= event.upperWindowDays) {
        add(recipe.holidaysMode, event.effect);
      }
    }

    return (
      trend * (1 + multiplicative) +
      additive +
      recipe.noise * recipe.amplitude * draw(streams.noise, index)
    );
  };

  const outlierRows = new Set(
    Array.from({ length: recipe.rows }, (_, index) => index)
      .sort((left, right) => draw(streams.covariate, left) - draw(streams.covariate, right))
      .slice(0, recipe.outliers),
  );

  const observations: Array<Observation> = [];

  for (let index = 0; index < recipe.rows; index += 1) {
    // The first row always stays, so every history has at least one observation.
    if (index > 0 && probability(streams.selection, index) < recipe.gapRate) {
      continue;
    }

    const epoch = start + index * step;
    const covariates = covariatesAt(epoch, index);
    const timestamp = isoTimestamp(epoch);

    const outlier = outlierRows.has(index)
      ? 10 * recipe.amplitude * Math.sign(draw(streams.noise, index + 1) || 1)
      : 0;

    observations.push({
      timestamp,
      value: valueAt(epoch, index, covariates) + outlier,
      ...covariates,
    });

    if (probability(streams.covariate, index + recipe.rows) < recipe.duplicateRate) {
      observations.push({
        timestamp,
        value: valueAt(epoch, index + recipe.rows, covariates),
        ...covariates,
      });
    }
  }

  if (recipe.shuffled) {
    const order = new Map(
      observations.map((row, index) => [row, draw(streams.selection, index + 7)]),
    );

    observations.sort((left, right) => (order.get(left) ?? 0) - (order.get(right) ?? 0));
  }

  const trainingEpochs = Array.from(
    new Set(observations.map((row) => Date.parse(row.timestamp))),
  ).sort((left, right) => left - right);

  const lastEpoch = trainingEpochs.at(-1) ?? start;

  const firstAt = new Map<string, Observation>();

  for (const row of observations) {
    if (!firstAt.has(row.timestamp)) {
      firstAt.set(row.timestamp, row);
    }
  }

  // In-sample rows repeat a training row's covariates, as predicting on history does.
  const inSample = Array.from(
    { length: Math.min(recipe.inSample, trainingEpochs.length) },
    (_, index): PredictionRow => {
      const epoch =
        trainingEpochs[Math.floor((index * trainingEpochs.length) / recipe.inSample)] ?? start;

      const { value: _value, ...row } = firstAt.get(isoTimestamp(epoch)) ?? {
        timestamp: isoTimestamp(epoch),
        value: 0,
      };

      return row;
    },
  );

  const future = Array.from({ length: recipe.horizon }, (_, index): PredictionRow => {
    const epoch = lastEpoch + (index + 1) * step;

    return { timestamp: isoTimestamp(epoch), ...covariatesAt(epoch, recipe.rows + index) };
  });

  const predictionRows = [...inSample, ...future];

  const workload = recipe.defaults
    ? defaultsWorkload(recipe.growth)
    : configuredWorkload(recipe, {
        growth: recipe.growth,
        scaling: recipe.scaling,
        seasonalityMode: recipe.seasonalityMode,
        holidaysMode: recipe.holidaysMode,
        changepoints:
          recipe.growth === "flat"
            ? { mode: "explicit", timestamps: [] }
            : recipe.changepoints.mode === "auto"
              ? { mode: "auto", count: recipe.changepoints.count, range: recipe.changepoints.range }
              : {
                  mode: "explicit",
                  timestamps: explicitChangepoints(trainingEpochs, recipe.changepoints.fractions),
                },
        changepointPriorScale: recipe.changepointPriorScale,
        seasonalities: seasonalities.map((seasonality) => {
          const declared: Types.Mutable<Configuration["seasonalities"][number]> = {
            name: seasonality.name,
            periodDays: seasonality.periodDays,
            fourierOrder: seasonality.fourierOrder,
            priorScale: seasonality.priorScale,
          };

          if (seasonality.mode !== undefined) {
            declared.mode = seasonality.mode;
          }

          if (seasonality.conditional) {
            declared.conditionName = conditionName;
          }

          return declared;
        }),
        events: events.map(({ effect: _effect, ...event }) => event),
        regressors: regressors.map((regressor) => {
          const declared: Types.Mutable<Configuration["regressors"][number]> = {
            name: regressor.name,
            priorScale: regressor.priorScale,
            standardization: regressor.standardization,
          };

          if (regressor.mode !== undefined) {
            declared.mode = regressor.mode;
          }

          return declared;
        }),
      });

  // Library defaults fit no regressors or conditional seasonalities, so their rows omit them.
  const strip = <Row extends Covariates>({ regressors: _r, conditions: _c, ...row }: Row) => row;

  const dataset: BenchmarkDataset = {
    id: `generated-${seed}`,
    recipe: "differential-v1",
    observations: recipe.defaults ? observations.map(strip) : observations,
    predictionRows: recipe.defaults ? predictionRows.map(strip) : predictionRows,
  };

  return {
    id: `generated-${seed}`,
    seed,
    traits: traits(recipe, workload, observations.length),
    workload,
    dataset,
  };
};

/** Interior training timestamps at the requested fractions of the history. */
const explicitChangepoints = (
  epochs: ReadonlyArray<number>,
  fractions: ReadonlyArray<number>,
): ReadonlyArray<string> => {
  if (epochs.length < 3) {
    return [];
  }

  const indexes = new Set(
    fractions.map((fraction) =>
      Math.min(epochs.length - 2, Math.max(1, Math.round(fraction * (epochs.length - 1)))),
    ),
  );

  return Array.from(indexes)
    .sort((left, right) => left - right)
    .map((index) => isoTimestamp(epochs[index] ?? 0));
};

const comparison = { kind: "equivalent-objective", evidenceId: "differential-v1" } as const;

/** Python's `Prophet(growth=...)` against Effect's `fit(rows, { growth })`. */
const defaultsWorkload = (growth: Configuration["growth"]): Workload => ({
  kind: "map",
  comparison,
  fitRequest: "growth-only",
  configuration: {
    growth,
    scaling: "absmax",
    seasonalityMode: "additive",
    holidaysMode: "additive",
    changepoints:
      growth === "flat"
        ? { mode: "explicit", timestamps: [] }
        : { mode: "auto", count: 25, range: 0.8 },
    changepointPriorScale: 0.05,
    seasonalities: [],
    events: [],
    regressors: [],
  },
  pythonOptimizer: { algorithm: "Auto", maxIterations: 10_000, newtonFallback: true },
});

/** Both libraries on their default optimizers, as the linear, flat and logistic benchmarks do. */
const configuredWorkload = (recipe: Recipe, configuration: Configuration): Workload =>
  recipe.growth === "linear"
    ? { kind: "map", comparison, configuration, ...linearOptimizers }
    : { kind: "map", comparison, configuration, pythonOptimizer: pythonDefaultOptimizer };

const traits = (recipe: Recipe, workload: Workload, rows: number): ReadonlyArray<string> => {
  const configuration = workload.configuration;

  const labels: Array<string | false> = [
    recipe.defaults && "defaults",
    !recipe.defaults && !recipe.wellPosed && configuration.seasonalities.length > 0 && "ill-posed",
    recipe.cadence,
    rows < 13 ? "short" : rows >= 300 && "long",
    recipe.gapRate > 0 && "gaps",
    recipe.duplicateRate > 0 && "duplicates",
    recipe.shuffled && "unsorted",
    recipe.outliers > 0 && "outliers",
    recipe.noise === 0 && "noiseless",
    configuration.scaling === "minmax" && "minmax",
    configuration.seasonalities.length > 0 && "seasonalities",
    configuration.seasonalities.some((seasonality) => seasonality.conditionName !== undefined) &&
      "conditional",
    configuration.events.length > 0 && "events",
    configuration.regressors.length > 0 && "regressors",
    configuration.changepoints.mode === "explicit" &&
      configuration.changepoints.timestamps.length > 0 &&
      "explicit-changepoints",
    !recipe.defaults &&
      (configuration.seasonalityMode === "multiplicative" ||
        configuration.holidaysMode === "multiplicative" ||
        configuration.seasonalities.some((seasonality) => seasonality.mode === "multiplicative") ||
        configuration.regressors.some((regressor) => regressor.mode === "multiplicative")) &&
      "multiplicative",
    recipe.growth === "logistic" && recipe.logistic.floor && "floor",
  ];

  return labels.filter((label): label is string => label !== false);
};

/** Regenerate the case for one seed; the same seed always yields the same case. */
export const generateCase = (seed: number): DifferentialCase => {
  const [generated] = fc.sample(generatedArbitrary, { seed, numRuns: 1 });

  if (generated === undefined) {
    throw new Error(`fast-check produced no case for seed ${seed}`);
  }

  return buildCase(seed, generated.recipe, generated.streams);
};

/** Distinct per-case seeds derived from a root seed. */
export const caseSeeds = (rootSeed: number, count: number): ReadonlyArray<number> => {
  const seeds = new Set<number>();
  let attempt = 0;

  while (seeds.size < count) {
    for (const seed of fc.sample(fc.noBias(fc.nat()), {
      seed: rootSeed + attempt,
      numRuns: count,
    })) {
      if (seeds.size < count) {
        seeds.add(seed);
      }
    }

    attempt += 1;
  }

  return Array.from(seeds);
};
