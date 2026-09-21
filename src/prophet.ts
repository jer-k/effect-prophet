import { Effect, Match, Schema } from "effect";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  UnsupportedConfigurationError,
  inputValidationErrorFromIssue,
} from "./errors";
import type { EventCalendar } from "./event";
import {
  parseFittedModel,
  type FittedFlatMapProphet,
  type FittedLinearProphet,
  type FittedPiecewiseMapProphet,
  type FittedProphet,
} from "./fitted-model";
import {
  createUnconditionalSeasonalityMask,
  type KnownAdditiveFeatures,
  type SeasonalityMaskMatrix,
} from "./internal/additional-features";
import { createEventFeatures } from "./internal/event-features";
import { FitPlan, FittingBackend, type TrainingInput } from "./internal/fitting-backend";
import { resolveSeasonalities } from "./internal/seasonality-resolution";
import { TimestampSchema } from "./internal/timestamp";
import { predictFlatMapWithWasm } from "./internal/wasm-flat-map-backend";
import { predictLinearTrendWithWasm } from "./internal/wasm-linear-trend-backend";
import {
  predictPiecewiseMapFeaturesWithWasm,
  predictPiecewiseMapWithWasm,
} from "./internal/wasm-piecewise-map-backend";
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

/** One named grouped custom-event contribution in observation units. */
export interface EventForecastComponent {
  /** Exact configured event name. */
  readonly name: string;

  /** Sum of this event's offset-column contributions. */
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

  /** Ordered named custom-event contributions. */
  readonly events: ReadonlyArray<EventForecastComponent>;
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

const makeFitPlan = (
  options: ProphetOptions,
  layout: SeasonalityLayout,
  masks: SeasonalityMaskMatrix,
  additionalFeatures: KnownAdditiveFeatures,
): FitPlan => {
  if (options.growth === "linear" && options.map !== undefined) {
    return FitPlan.LinearPiecewiseMap({
      seasonalities: layout,
      changepoints: options.map.changepoints,
      changepointPriorScale: options.map.changepointPriorScale,
      optimizer: options.map.optimizer,
      seasonalityMasks: masks,
      additionalFeatures,
      events: options.events,
    });
  }

  const firstComponent = layout.components[0];

  if (firstComponent === undefined && options.events.layout.coefficientCount === 0) {
    return options.growth === "linear"
      ? FitPlan.LinearTrend()
      : FitPlan.FlatMap({ seasonalities: emptyLayoutFromResolved(layout) });
  }

  if (options.growth === "linear") {
    const map = defaultAutomaticMapOptions;

    return FitPlan.LinearPiecewiseMap({
      seasonalities: layout,
      changepoints: map.changepoints,
      changepointPriorScale: map.changepointPriorScale,
      optimizer: map.optimizer,
      seasonalityMasks: masks,
      additionalFeatures,
      events: options.events,
    });
  }

  if (firstComponent === undefined) {
    return FitPlan.FlatMap({ seasonalities: emptyLayoutFromResolved(layout) });
  }

  return FitPlan.FlatAdditiveMap({
    seasonalities: nonEmptyLayoutFromResolved(layout, firstComponent),
  });
};

const featureConstructionError = (observationCount: number, message: string): FittingError =>
  new FittingError({
    reason: "backend-failure",
    observationCount,
    message,
  });

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
): Effect.fn.Return<
  FittedProphet,
  InputValidationError | UnsupportedConfigurationError | FittingError,
  FittingBackend
> {
  const observations = yield* decodeObservations(observationsInput);

  const options = yield* decodeOptions(optionsInput);

  const resolved = yield* resolveSeasonalities(observations, options).pipe(
    Effect.mapError(optionsValidationErrorFromSeasonality),
  );

  yield* checkExplicitChangepointBounds(observations, options);

  if (options.growth === "flat" && options.events.layout.coefficientCount > 0) {
    return yield* Effect.fail(
      new UnsupportedConfigurationError({
        option: "events",
        model: "flat-map",
        message: "Custom events require linear piecewise MAP fitting",
      }),
    );
  }

  if (observations.length < 2) {
    return yield* Effect.fail(
      new FittingError({
        reason: "insufficient-observations",
        observationCount: observations.length,
        message: "At least two observations are required to fit a model",
      }),
    );
  }

  const timestamps = observations.map((observation) => observation.timestamp);

  const matrix = yield* createEventFeatures(timestamps, options.events).pipe(
    Effect.mapError((error) => featureConstructionError(observations.length, error.message)),
  );

  const additionalFeatures: KnownAdditiveFeatures = Object.freeze({
    matrix,
    layout: options.events.layout,
  });

  const masks = yield* createUnconditionalSeasonalityMask(
    observations.length,
    resolved.layout.components.length,
  ).pipe(Effect.mapError((error) => featureConstructionError(observations.length, error.message)));

  const fitPlan = makeFitPlan(options, resolved.layout, masks, additionalFeatures);

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
        events: [],
      });
    }

    return forecasts;
  });

type FittedSeasonalProphet = FittedFlatMapProphet | FittedPiecewiseMapProphet;

type SeasonalPredictionBatch = {
  readonly values: Float64Array;
};

type SeasonalPredictionBackend = "flat MAP" | "linear MAP";

const forecastsFromSeasonalBatch = (
  model: FittedSeasonalProphet,
  timestamps: PredictionTimestamps,
  batch: SeasonalPredictionBatch,
  backend: SeasonalPredictionBackend,
): Effect.Effect<Forecasts, PredictionError> =>
  Effect.gen(function* () {
    const seasonalComponentCount = model.seasonalities.components.length;

    const eventLayout = model.model === "linear-piecewise-map" ? model.events.layout : undefined;

    const eventComponentCount = eventLayout?.components.length ?? 0;
    const rowWidth = seasonalComponentCount + eventComponentCount + 3;
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

      const events: Array<EventForecastComponent> = [];

      if (eventLayout !== undefined) {
        for (const [componentIndex, component] of eventLayout.components.entries()) {
          const componentValue =
            batch.values[rowOffset + 3 + seasonalComponentCount + componentIndex];

          if (componentValue === undefined) {
            return yield* Effect.fail(
              new PredictionError({
                reason: "backend-failure",
                timestamp,
                message: `WASM ${backend} prediction backend omitted an event component`,
              }),
            );
          }

          events.push({ name: component.name, value: componentValue });
        }
      }

      forecasts.push({ timestamp, trend, additive, value, seasonalities, events });
    }

    return forecasts;
  });

const makePredictionFeatures = Effect.fn("makePredictionFeatures")(function* (
  timestamps: PredictionTimestamps,
  seasonalComponentCount: number,
  events: EventCalendar,
): Effect.fn.Return<
  { readonly masks: SeasonalityMaskMatrix; readonly features: KnownAdditiveFeatures },
  PredictionError
> {
  const firstTimestamp = timestamps[0] ?? 0;

  const masks = yield* createUnconditionalSeasonalityMask(
    timestamps.length,
    seasonalComponentCount,
  ).pipe(
    Effect.mapError(
      (error) =>
        new PredictionError({
          reason: "backend-failure",
          timestamp: firstTimestamp,
          message: error.message,
        }),
    ),
  );

  const matrix = yield* createEventFeatures(timestamps, events).pipe(
    Effect.mapError(
      (error) =>
        new PredictionError({
          reason: "backend-failure",
          timestamp: timestamps[error.row ?? 0] ?? firstTimestamp,
          message: error.message,
        }),
    ),
  );

  return {
    masks,
    features: Object.freeze({ matrix, layout: events.layout }),
  };
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
  model.events.layout.coefficientCount === 0
    ? predictPiecewiseMapWithWasm(model, timestamps).pipe(
        Effect.flatMap((batch) =>
          forecastsFromSeasonalBatch(model, timestamps, batch, "linear MAP"),
        ),
      )
    : Effect.gen(function* () {
        const { masks, features } = yield* makePredictionFeatures(
          timestamps,
          model.seasonalities.components.length,
          model.events,
        );

        const batch = yield* predictPiecewiseMapFeaturesWithWasm(
          model,
          timestamps,
          masks,
          features,
        );

        return yield* forecastsFromSeasonalBatch(model, timestamps, batch, "linear MAP");
      });

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
