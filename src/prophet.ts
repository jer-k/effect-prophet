import { Effect, Match, Schema } from "effect";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  inputValidationErrorFromIssue,
} from "./errors";
import {
  parseFittedModel,
  type FittedFlatMapProphet,
  type FittedLinearProphet,
  type FittedPiecewiseMapProphet,
  type FittedProphet,
} from "./fitted-model";
import { FitPlan, FittingBackend, type TrainingInput } from "./internal/fitting-backend";
import { resolveSeasonalities } from "./internal/seasonality-resolution";
import { TimestampSchema } from "./internal/timestamp";
import { predictFlatMapWithWasm } from "./internal/wasm-flat-map-backend";
import { predictLinearTrendWithWasm } from "./internal/wasm-linear-trend-backend";
import { predictPiecewiseMapWithWasm } from "./internal/wasm-piecewise-map-backend";
import { decodeObservations, type Observations } from "./observation";
import {
  decodeOptions,
  defaultAutomaticMapOptions,
  optionsValidationErrorFromSeasonality,
  type EncodedProphetOptions,
  type ProphetOptions,
} from "./options";
import type {
  EmptySeasonalityLayout,
  NonEmptySeasonalityLayout,
  SeasonalityLayout,
} from "./seasonality";

/** Canonical UTC timestamps accepted by the public prediction boundary. */
export type EncodedPredictionTimestamps = ReadonlyArray<string>;

/** Validated prediction timestamps represented as integer epoch milliseconds. */
export type PredictionTimestamps = ReadonlyArray<number>;

/** One named additive seasonal contribution in observation units. */
export interface SeasonalForecastComponent {
  /** Exact configured seasonality name. */
  readonly name: string;

  /** This seasonality's additive contribution in observation units. */
  readonly value: number;
}

/** One point forecast and its decomposed trend and additive components. */
export interface Forecast {
  /** Prediction timestamp represented as integer epoch milliseconds. */
  readonly timestamp: number;

  /** Predicted observation value. */
  readonly value: number;

  /** Trend contribution to `value`. */
  readonly trend: number;

  /** Total additive seasonal contribution to `value`. */
  readonly additive: number;

  /** Ordered named seasonal contributions. */
  readonly seasonalities: ReadonlyArray<SeasonalForecastComponent>;
}

/** Forecasts in the same order as the supplied prediction timestamps. */
export type Forecasts = ReadonlyArray<Forecast>;

const PredictionTimestampsSchema: Schema.Codec<PredictionTimestamps, EncodedPredictionTimestamps> =
  Schema.Array(TimestampSchema);

const decodePredictionTimestampsSchema = Schema.decodeUnknownEffect(PredictionTimestampsSchema, {
  errors: "all",
});

const decodePredictionTimestamps = Effect.fn("decodePredictionTimestamps")(function* (
  input: Parameters<typeof decodePredictionTimestampsSchema>[0],
): Effect.fn.Return<PredictionTimestamps, InputValidationError> {
  return yield* decodePredictionTimestampsSchema(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("prediction-timestamps", error.issue)),
  );
});

const packTrainingInput = (observations: Observations): TrainingInput => {
  const timestamps = new Float64Array(observations.length);
  const values = new Float64Array(observations.length);

  for (const [index, observation] of observations.entries()) {
    timestamps[index] = observation.timestamp;
    values[index] = observation.value;
  }

  return { timestamps, values };
};

const emptyLayoutFromResolved = (layout: SeasonalityLayout): EmptySeasonalityLayout => {
  const components: readonly [] = Object.freeze([]);

  return Object.freeze({
    ...layout,
    components,
    coefficientCount: 0 as const,
  });
};

const nonEmptyLayoutFromResolved = (
  layout: SeasonalityLayout,
  firstComponent: SeasonalityLayout["components"][number],
): NonEmptySeasonalityLayout => {
  const components: NonEmptySeasonalityLayout["components"] = Object.freeze([
    firstComponent,
    ...layout.components.slice(1),
  ]);

  return Object.freeze({
    ...layout,
    components,
  });
};

const checkExplicitChangepointBounds = (
  observations: Observations,
  options: ProphetOptions,
): Effect.Effect<void, InputValidationError> => {
  if (
    observations.length < 2 ||
    options.growth !== "linear" ||
    options.map === undefined ||
    options.map.changepoints.mode !== "explicit"
  ) {
    return Effect.void;
  }

  const first = observations[0];
  const last = observations.at(-1);

  if (first === undefined || last === undefined) {
    return Effect.void;
  }

  for (const [index, changepoint] of options.map.changepoints.timestamps.entries()) {
    if (changepoint < first.timestamp || changepoint > last.timestamp) {
      return Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["map", "changepoints", "timestamps", index],
              message: "Explicit changepoints must be inside the inclusive training range",
            },
          ],
          message: "Explicit changepoints must be inside the inclusive training range",
        }),
      );
    }
  }

  return Effect.void;
};

const makeFitPlan = (options: ProphetOptions, layout: SeasonalityLayout): FitPlan => {
  if (options.growth === "linear" && options.map !== undefined) {
    return FitPlan.LinearPiecewiseMap({
      seasonalities: layout,
      changepoints: options.map.changepoints,
      changepointPriorScale: options.map.changepointPriorScale,
      optimizer: options.map.optimizer,
    });
  }

  const firstComponent = layout.components[0];

  if (firstComponent === undefined) {
    return options.growth === "linear"
      ? FitPlan.LinearTrend()
      : FitPlan.FlatMap({ seasonalities: emptyLayoutFromResolved(layout) });
  }

  const seasonalities = nonEmptyLayoutFromResolved(layout, firstComponent);

  if (options.growth === "linear") {
    const map = options.map ?? defaultAutomaticMapOptions;

    return FitPlan.LinearPiecewiseMap({
      seasonalities,
      changepoints: map.changepoints,
      changepointPriorScale: map.changepointPriorScale,
      optimizer: map.optimizer,
    });
  }

  return FitPlan.FlatAdditiveMap({ seasonalities });
};

/**
 * Validate observations and options, then fit through the provided backend Layer.
 *
 * @param observationsInput - Untrusted encoded observations.
 * @param optionsInput - Optional untrusted fitting options.
 * @returns A fitted model, validation failure, or fitting failure.
 */
export const fit = Effect.fn("Prophet.fit")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput?: EncodedProphetOptions,
): Effect.fn.Return<FittedProphet, InputValidationError | FittingError, FittingBackend> {
  const observations = yield* decodeObservations(observationsInput);

  const options = yield* decodeOptions(optionsInput);

  const resolved = yield* resolveSeasonalities(observations, options).pipe(
    Effect.mapError(optionsValidationErrorFromSeasonality),
  );

  yield* checkExplicitChangepointBounds(observations, options);

  const fitPlan = makeFitPlan(options, resolved.layout);

  const enabledBuiltInCount = resolved.decisions.reduce(
    (count, decision) => count + (decision.enabled ? 1 : 0),
    0,
  );

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.seasonality.custom.count": options.seasonalities.length,
    "effect_prophet.seasonality.builtin.enabled.count": enabledBuiltInCount,
    ...Object.fromEntries(
      resolved.decisions.map((decision) => [
        `effect_prophet.seasonality.builtin.${decision.name}.resolution`,
        decision.reason,
      ]),
    ),
  });

  const input = packTrainingInput(observations);
  const backend = yield* FittingBackend;
  const parameters = yield* backend.fit(input, fitPlan);

  return yield* parseFittedModel(parameters).pipe(
    Effect.mapError(
      () =>
        new FittingError({
          reason: "backend-failure",
          observationCount: observations.length,
          message: "Fitting backend returned invalid fitted-model parameters",
        }),
    ),
  );
});

const predictLinearForecasts = (
  model: FittedLinearProphet,
  timestamps: PredictionTimestamps,
): Effect.Effect<Forecasts, PredictionError> =>
  Effect.gen(function* () {
    const predictions = yield* predictLinearTrendWithWasm(model, timestamps);
    const forecasts: Array<Forecast> = [];

    for (const [index, timestamp] of timestamps.entries()) {
      const prediction = predictions[index];

      if (prediction === undefined) {
        return yield* Effect.fail(
          new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: "WASM prediction backend omitted an expected forecast",
          }),
        );
      }

      forecasts.push({
        timestamp,
        value: prediction,
        trend: prediction,
        additive: 0,
        seasonalities: [],
      });
    }

    return forecasts;
  });

type FittedSeasonalProphet = FittedFlatMapProphet | FittedPiecewiseMapProphet;

type SeasonalPredictionBatch = {
  readonly values: Float64Array;
};

type SeasonalPredictionBackend = "additive" | "flat MAP" | "linear MAP";

const forecastsFromSeasonalBatch = (
  model: FittedSeasonalProphet,
  timestamps: PredictionTimestamps,
  batch: SeasonalPredictionBatch,
  backend: SeasonalPredictionBackend,
): Effect.Effect<Forecasts, PredictionError> =>
  Effect.gen(function* () {
    const componentCount = model.seasonalities.components.length;
    const rowWidth = componentCount + 3;
    const forecasts: Array<Forecast> = [];

    for (const [row, timestamp] of timestamps.entries()) {
      const rowOffset = row * rowWidth;
      const trend = batch.values[rowOffset];
      const additive = batch.values[rowOffset + 1];
      const value = batch.values[rowOffset + 2];

      if (trend === undefined || additive === undefined || value === undefined) {
        return yield* Effect.fail(
          new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: `WASM ${backend} prediction backend omitted an expected forecast value`,
          }),
        );
      }

      const seasonalities: Array<SeasonalForecastComponent> = [];

      for (const [componentIndex, component] of model.seasonalities.components.entries()) {
        const componentValue = batch.values[rowOffset + 3 + componentIndex];

        if (componentValue === undefined) {
          return yield* Effect.fail(
            new PredictionError({
              reason: "backend-failure",
              timestamp,
              message: `WASM ${backend} prediction backend omitted a seasonal component`,
            }),
          );
        }

        seasonalities.push({ name: component.definition.name, value: componentValue });
      }

      forecasts.push({ timestamp, trend, additive, value, seasonalities });
    }

    return forecasts;
  });

const predictFlatMapForecasts = (
  model: FittedFlatMapProphet,
  timestamps: PredictionTimestamps,
): Effect.Effect<Forecasts, PredictionError> =>
  predictFlatMapWithWasm(model, timestamps).pipe(
    Effect.flatMap((batch) => forecastsFromSeasonalBatch(model, timestamps, batch, "flat MAP")),
  );

const predictPiecewiseMapForecasts = (
  model: FittedPiecewiseMapProphet,
  timestamps: PredictionTimestamps,
): Effect.Effect<Forecasts, PredictionError> =>
  predictPiecewiseMapWithWasm(model, timestamps).pipe(
    Effect.flatMap((batch) => forecastsFromSeasonalBatch(model, timestamps, batch, "linear MAP")),
  );

const predictFittedModel = (
  model: FittedProphet,
  timestamps: PredictionTimestamps,
): Effect.Effect<Forecasts, PredictionError> =>
  Match.value(model).pipe(
    Match.discriminatorsExhaustive("model")({
      "linear-trend": (linearModel) => predictLinearForecasts(linearModel, timestamps),
      "flat-map": (flatModel) => predictFlatMapForecasts(flatModel, timestamps),
      "linear-piecewise-map": (piecewiseModel) =>
        predictPiecewiseMapForecasts(piecewiseModel, timestamps),
    }),
  );

/**
 * Predict point forecasts and decomposed components at validated timestamps.
 *
 * Every model reuses fitting-time state without deriving scales or selected
 * features from prediction timestamps.
 *
 * @param model - A fitted model returned by `fit` or model decoding.
 * @param timestampsInput - Untrusted canonical UTC timestamps.
 * @returns Ordered point forecasts or a typed validation or prediction failure.
 */
export const predict = Effect.fn("Prophet.predict")(function* (
  model: FittedProphet,
  timestampsInput: Parameters<typeof decodePredictionTimestampsSchema>[0],
): Effect.fn.Return<Forecasts, InputValidationError | PredictionError> {
  const timestamps = yield* decodePredictionTimestamps(timestampsInput);
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return [];
  }

  const parsedModel = yield* parseFittedModel(model).pipe(
    Effect.mapError(
      () =>
        new PredictionError({
          reason: "invalid-model",
          timestamp: firstTimestamp,
          message: "Fitted model is invalid",
        }),
    ),
  );

  return yield* predictFittedModel(parsedModel, timestamps);
});
