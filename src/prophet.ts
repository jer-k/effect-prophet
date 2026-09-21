import { Effect, Match, Predicate } from "effect";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  UnsupportedConfigurationError,
  type ValidationInput,
  type ValidationIssue,
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
  concatenateKnownAdditiveFeatures,
  createUnconditionalSeasonalityMask,
  type KnownAdditiveFeatures,
  type SeasonalityMaskMatrix,
} from "./internal/additional-features";
import { createEventFeatures } from "./internal/event-features";
import { FitPlan, FittingBackend, type TrainingInput } from "./internal/fitting-backend";
import {
  createRegressorFeatures,
  resolveRegressorFeatures,
  type RegressorFeatureError,
} from "./internal/regressor-features";
import { resolveSeasonalities } from "./internal/seasonality-resolution";
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
import { decodePredictionRows } from "./prediction-row";
import {
  projectRegressorCoefficient,
  type FittedRegressor,
  type RegressorCoefficient,
  type RegressorDefinition,
  type ResolvedRegressor,
} from "./regressor";
import type {
  EmptySeasonalityLayout,
  NonEmptySeasonalityLayout,
  SeasonalityLayout,
} from "./seasonality";

export type {
  EncodedPredictionRow,
  EncodedPredictionRows,
  EncodedPredictionTimestamps,
  PredictionRow,
  PredictionRows,
} from "./prediction-row";

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

/** One named additive regressor contribution in observation units. */
export interface RegressorForecastComponent {
  /** Exact configured regressor name. */
  readonly name: string;

  /** This row's contribution from the transformed regressor. */
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

  /** Total additive seasonal, event, and regressor contribution to `value`. */
  readonly additive: number;

  /** Ordered named seasonal contributions. */
  readonly seasonalities: ReadonlyArray<SeasonalForecastComponent>;

  /** Ordered named custom-event contributions. */
  readonly events: ReadonlyArray<EventForecastComponent>;

  /** Ordered named additive-regressor contributions. */
  readonly regressors: ReadonlyArray<RegressorForecastComponent>;
}

/** Forecasts in the same order as the supplied prediction rows. */
export type Forecasts = ReadonlyArray<Forecast>;

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
  regressors: ReadonlyArray<ResolvedRegressor>,
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
      regressors,
    });
  }

  const firstComponent = layout.components[0];

  if (firstComponent === undefined && additionalFeatures.layout.coefficientCount === 0) {
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
      regressors,
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

const fittedRegressorsMatch = (
  expected: ReadonlyArray<ResolvedRegressor>,
  actual: ReadonlyArray<FittedRegressor>,
): boolean =>
  expected.length === actual.length &&
  expected.every((regressor, index) => {
    const fitted = actual[index];

    if (fitted === undefined) {
      return false;
    }

    const definitionsMatch =
      fitted.definition.name === regressor.definition.name &&
      fitted.definition.priorScale === regressor.definition.priorScale &&
      fitted.definition.standardization === regressor.definition.standardization;

    if (!definitionsMatch || fitted.transform.mode !== regressor.transform.mode) {
      return false;
    }

    return fitted.transform.mode === "identity" && regressor.transform.mode === "identity"
      ? fitted.transform.reason === regressor.transform.reason
      : fitted.transform.mode === "standardized" && regressor.transform.mode === "standardized"
        ? fitted.transform.mean === regressor.transform.mean &&
          fitted.transform.sampleStandardDeviation === regressor.transform.sampleStandardDeviation
        : false;
  });

type RegressorValueRow = {
  readonly regressors?: Readonly<Record<string, number>>;
};

const alignRegressorValues = (
  rows: ReadonlyArray<RegressorValueRow>,
  definitions: ReadonlyArray<RegressorDefinition>,
  input: Extract<ValidationInput, "observations" | "prediction-rows">,
): Effect.Effect<ReadonlyArray<ReadonlyArray<number>>, InputValidationError> => {
  const expectedNames = new Set<string>(definitions.map((definition) => definition.name));
  const aligned: Array<ReadonlyArray<number>> = [];
  const issues: Array<ValidationIssue> = [];

  for (const [rowIndex, row] of rows.entries()) {
    const provided = row.regressors;
    const values: Array<number> = [];

    for (const definition of definitions) {
      if (provided === undefined || !Object.hasOwn(provided, definition.name)) {
        issues.push({
          path: [rowIndex, "regressors", definition.name],
          message: `Missing required regressor '${definition.name}'`,
        });

        continue;
      }

      const value = provided[definition.name];

      if (value === undefined) {
        issues.push({
          path: [rowIndex, "regressors", definition.name],
          message: `Missing required regressor '${definition.name}'`,
        });
      } else {
        values.push(value);
      }
    }

    if (provided !== undefined) {
      for (const name of Object.keys(provided)) {
        if (!expectedNames.has(name)) {
          issues.push({
            path: [rowIndex, "regressors", name],
            message: `Unexpected regressor '${name}'`,
          });
        }
      }
    }

    aligned.push(Object.freeze(values));
  }

  if (issues.length > 0) {
    return Effect.fail(
      new InputValidationError({
        input,
        issues,
        message: "Regressor values must exactly match the fitted regressor definitions",
      }),
    );
  }

  return Effect.succeed(Object.freeze(aligned));
};

const regressorFeatureValidationError = (
  input: Extract<ValidationInput, "observations" | "prediction-rows">,
  definitions: ReadonlyArray<RegressorDefinition>,
  error: RegressorFeatureError,
): InputValidationError => {
  const [first, second] = error.path;
  let path: ReadonlyArray<PropertyKey>;

  if (Predicate.isNumber(first) && Predicate.isNumber(second)) {
    path = [first, "regressors", definitions[second]?.name ?? second];
  } else if (Predicate.isNumber(first)) {
    path = ["regressors", definitions[first]?.name ?? first];
  } else {
    path = ["regressors", first ?? ""];
  }

  return new InputValidationError({
    input,
    issues: [{ path, message: error.message }],
    message: error.message,
  });
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

  if (options.growth === "flat" && options.events.layout.coefficientCount > 0) {
    return yield* Effect.fail(
      new UnsupportedConfigurationError({
        option: "events",
        model: "flat-map",
        message: "Custom events require linear piecewise MAP fitting",
      }),
    );
  }

  if (options.growth === "flat" && options.regressors.length > 0) {
    return yield* Effect.fail(
      new UnsupportedConfigurationError({
        option: "regressors",
        model: "flat-map",
        message: "Additional regressors require linear piecewise MAP fitting",
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

  yield* checkExplicitChangepointBounds(observations, options);

  const alignedRegressorValues = yield* alignRegressorValues(
    observations,
    options.regressors,
    "observations",
  );

  const regressorFeatures = yield* resolveRegressorFeatures(
    options.regressors,
    alignedRegressorValues,
  ).pipe(
    Effect.mapError((error) =>
      regressorFeatureValidationError("observations", options.regressors, error),
    ),
  );

  const timestamps = observations.map((observation) => observation.timestamp);

  const eventMatrix = yield* createEventFeatures(timestamps, options.events).pipe(
    Effect.mapError((error) => featureConstructionError(observations.length, error.message)),
  );

  const eventFeatures: KnownAdditiveFeatures = Object.freeze({
    matrix: eventMatrix,
    layout: options.events.layout,
  });

  const additionalFeatures = yield* concatenateKnownAdditiveFeatures([
    eventFeatures,
    regressorFeatures.features,
  ]).pipe(Effect.mapError((error) => featureConstructionError(observations.length, error.message)));

  const masks = yield* createUnconditionalSeasonalityMask(
    observations.length,
    resolved.layout.components.length,
  ).pipe(Effect.mapError((error) => featureConstructionError(observations.length, error.message)));

  const fitPlan = makeFitPlan(
    options,
    resolved.layout,
    masks,
    additionalFeatures,
    regressorFeatures.regressors,
  );

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

  if (options.regressors.length > 0) {
    yield* Effect.annotateCurrentSpan({
      "effect_prophet.regressor.count": options.regressors.length,
    });
  }

  const input = packTrainingInput(observations);
  const backend = yield* FittingBackend;
  const parameters = yield* backend.fit(input, fitPlan);

  const fittedModel = yield* parseFittedModel(parameters).pipe(
    Effect.mapError(
      () =>
        new FittingError({
          reason: "backend-failure",
          observationCount: observations.length,
          message: "Fitting backend returned invalid fitted-model parameters",
        }),
    ),
  );

  const returnedRegressors =
    fittedModel.model === "linear-piecewise-map" ? fittedModel.regressors : [];

  if (!fittedRegressorsMatch(regressorFeatures.regressors, returnedRegressors)) {
    return yield* Effect.fail(
      new FittingError({
        reason: "backend-failure",
        observationCount: observations.length,
        message: "Fitting backend returned misaligned regressor metadata",
      }),
    );
  }

  return fittedModel;
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
        regressors: [],
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

    const events = model.model === "linear-piecewise-map" ? model.events : undefined;

    const fittedRegressors = model.model === "linear-piecewise-map" ? model.regressors : [];

    const eventComponentCount = events?.layout.components.length ?? 0;

    const rowWidth = seasonalComponentCount + eventComponentCount + fittedRegressors.length + 3;

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

      const eventComponents: Array<EventForecastComponent> = [];

      if (events !== undefined) {
        for (const [componentIndex, component] of events.layout.components.entries()) {
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

          eventComponents.push({ name: component.name, value: componentValue });
        }
      }

      const regressors: Array<RegressorForecastComponent> = [];

      for (const [componentIndex, regressor] of fittedRegressors.entries()) {
        const componentValue =
          batch.values[
            rowOffset + 3 + seasonalComponentCount + eventComponentCount + componentIndex
          ];

        if (componentValue === undefined) {
          return yield* Effect.fail(
            new PredictionError({
              reason: "backend-failure",
              timestamp,
              message: `WASM ${backend} prediction backend omitted a regressor component`,
            }),
          );
        }

        regressors.push({ name: regressor.definition.name, value: componentValue });
      }

      forecasts.push({
        timestamp,
        trend,
        additive,
        value,
        seasonalities,
        events: eventComponents,
        regressors,
      });
    }

    return forecasts;
  });

const makePredictionFeatures = Effect.fn("makePredictionFeatures")(function* (
  timestamps: PredictionTimestamps,
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
  seasonalComponentCount: number,
  events: EventCalendar,
  regressors: ReadonlyArray<FittedRegressor>,
): Effect.fn.Return<
  { readonly masks: SeasonalityMaskMatrix; readonly features: KnownAdditiveFeatures },
  PredictionError | InputValidationError
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

  const eventMatrix = yield* createEventFeatures(timestamps, events).pipe(
    Effect.mapError(
      (error) =>
        new PredictionError({
          reason: "backend-failure",
          timestamp: timestamps[error.row ?? 0] ?? firstTimestamp,
          message: error.message,
        }),
    ),
  );

  const eventFeatures: KnownAdditiveFeatures = Object.freeze({
    matrix: eventMatrix,
    layout: events.layout,
  });

  const regressorFeatures = yield* createRegressorFeatures(regressors, alignedRegressorValues).pipe(
    Effect.mapError((error) =>
      regressorFeatureValidationError(
        "prediction-rows",
        regressors.map((regressor) => regressor.definition),
        error,
      ),
    ),
  );

  const features = yield* concatenateKnownAdditiveFeatures([eventFeatures, regressorFeatures]).pipe(
    Effect.mapError(
      (error) =>
        new PredictionError({
          reason: "backend-failure",
          timestamp: firstTimestamp,
          message: error.message,
        }),
    ),
  );

  return { masks, features };
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
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  model.events.layout.coefficientCount === 0 && model.regressors.length === 0
    ? predictPiecewiseMapWithWasm(model, timestamps).pipe(
        Effect.flatMap((batch) =>
          forecastsFromSeasonalBatch(model, timestamps, batch, "linear MAP"),
        ),
      )
    : Effect.gen(function* () {
        const { masks, features } = yield* makePredictionFeatures(
          timestamps,
          alignedRegressorValues,
          model.seasonalities.components.length,
          model.events,
          model.regressors,
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
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  Match.value(model).pipe(
    Match.discriminatorsExhaustive("model")({
      "linear-trend": (linearModel) => predictLinearForecasts(linearModel, timestamps),
      "flat-map": (flatModel) => predictFlatMapForecasts(flatModel, timestamps),
      "linear-piecewise-map": (piecewiseModel) =>
        predictPiecewiseMapForecasts(piecewiseModel, timestamps, alignedRegressorValues),
    }),
  );

const fittedRegressors = (model: FittedProphet): ReadonlyArray<FittedRegressor> =>
  model.model === "linear-piecewise-map" ? model.regressors : [];

/** Return fitted regressor coefficients in original input units. */
export const getRegressorCoefficients = (
  model: FittedProphet,
): ReadonlyArray<RegressorCoefficient> =>
  Object.freeze(fittedRegressors(model).map(projectRegressorCoefficient));

/**
 * Predict point forecasts and decomposed components at validated rows.
 *
 * Every model reuses fitting-time state without deriving scales or selected
 * features from prediction rows.
 *
 * @param model - A fitted model returned by `fit` or model decoding.
 * @param rowsInput - Untrusted timestamp strings or row-shaped future covariates.
 * @returns Ordered point forecasts or a typed validation or prediction failure.
 */
export const predict = Effect.fn("Prophet.predict")(function* (
  model: FittedProphet,
  rowsInput: Parameters<typeof decodePredictionRows>[0],
): Effect.fn.Return<Forecasts, InputValidationError | PredictionError> {
  const rows = yield* decodePredictionRows(rowsInput);
  const firstRow = rows[0];

  if (firstRow === undefined) {
    return [];
  }

  const parsedModel = yield* parseFittedModel(model).pipe(
    Effect.mapError(
      () =>
        new PredictionError({
          reason: "invalid-model",
          timestamp: firstRow.timestamp,
          message: "Fitted model is invalid",
        }),
    ),
  );

  const regressors = fittedRegressors(parsedModel);

  const alignedRegressorValues = yield* alignRegressorValues(
    rows,
    regressors.map((regressor) => regressor.definition),
    "prediction-rows",
  );

  const timestamps = rows.map((row) => row.timestamp);

  return yield* predictFittedModel(parsedModel, timestamps, alignedRegressorValues);
});
