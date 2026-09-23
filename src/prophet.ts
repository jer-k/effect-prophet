import { Effect, Match, Predicate } from "effect";

import {
  alignConditionValues,
  conditionNamesFromLayout,
  type InvalidConditionValues,
} from "./condition";
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
  type FittedLogisticMapProphet,
  type FittedPiecewiseMapProphet,
  type FittedProphet,
} from "./fitted-model";
import {
  parseLogisticPredictionBounds,
  parseLogisticTrainingBounds,
  rejectNonLogisticPredictionBounds,
  rejectNonLogisticTrainingBounds,
  type LogisticPredictionBounds,
  type LogisticTrainingBounds,
} from "./logistic";
import {
  concatenateKnownAdditiveFeatures,
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
import { createSeasonalityMasks } from "./internal/seasonality-masks";
import { predictFlatMapWithWasm } from "./internal/wasm-flat-map-backend";
import { predictLinearTrendWithWasm } from "./internal/wasm-linear-trend-backend";
import { predictLogisticMapWithWasm } from "./internal/wasm-logistic-map-backend";
import {
  predictMixedFlatMapWithWasm,
  predictMixedLinearMapWithWasm,
  type MixedMapPredictionBatch,
} from "./internal/wasm-mixed-map-backend";
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
import { defaultTargetScalingMode } from "./target-scaling";

export type {
  EncodedPredictionRow,
  EncodedPredictionRows,
  EncodedPredictionTimestamps,
  PredictionRow,
  PredictionRows,
} from "./prediction-row";

/** Validated prediction timestamps represented as integer epoch milliseconds. */
export type PredictionTimestamps = ReadonlyArray<number>;

/** One named forecast component with mode-correct units. */
export type ForecastComponent =
  | {
      readonly name: string;
      readonly mode: "additive";
      readonly value: number;
    }
  | {
      readonly name: string;
      readonly mode: "multiplicative";
      readonly factor: number;
      readonly contribution: number;
    };

/** One named seasonal forecast component. */
export type SeasonalForecastComponent = ForecastComponent;

/** One named grouped custom-event forecast component. */
export type EventForecastComponent = ForecastComponent;

/** One named regressor forecast component. */
export type RegressorForecastComponent = ForecastComponent;

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

  /** Total dimensionless multiplicative factor applied to the trend. */
  readonly multiplicative: number;

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
    options.growth === "flat" ||
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
  logisticBounds?: LogisticTrainingBounds,
): FitPlan => {
  if (options.growth === "logistic" && logisticBounds !== undefined) {
    return FitPlan.LogisticPiecewiseMap({
      scaling: options.scaling ?? defaultTargetScalingMode,
      bounds: logisticBounds,
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

  const hasMultiplicativeComponent =
    layout.components.some((component) => component.definition.mode === "multiplicative") ||
    additionalFeatures.layout.components.some((component) => component.mode === "multiplicative");

  if (options.growth === "linear" && (options.map !== undefined || options.scaling !== undefined)) {
    const map = options.map ?? defaultAutomaticMapOptions;

    return FitPlan.LinearPiecewiseMap({
      scaling: options.scaling ?? defaultTargetScalingMode,
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

  const firstComponent = layout.components[0];

  if (options.growth === "flat" && hasMultiplicativeComponent) {
    return FitPlan.FlatMixedMap({
      scaling: options.scaling ?? defaultTargetScalingMode,
      seasonalities: layout,
      optimizer: defaultAutomaticMapOptions.optimizer,
      seasonalityMasks: masks,
      additionalFeatures,
      events: options.events,
      regressors,
    });
  }

  if (firstComponent === undefined && additionalFeatures.layout.coefficientCount === 0) {
    return options.growth === "linear"
      ? FitPlan.LinearTrend()
      : FitPlan.FlatMap({
          scaling: options.scaling ?? defaultTargetScalingMode,
          seasonalities: emptyLayoutFromResolved(layout),
        });
  }

  if (options.growth === "linear") {
    const map = defaultAutomaticMapOptions;

    return FitPlan.LinearPiecewiseMap({
      scaling: options.scaling ?? defaultTargetScalingMode,
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
    return FitPlan.FlatMap({
      scaling: options.scaling ?? defaultTargetScalingMode,
      seasonalities: emptyLayoutFromResolved(layout),
    });
  }

  return FitPlan.FlatAdditiveMap({
    scaling: options.scaling ?? defaultTargetScalingMode,
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
      fitted.definition.standardization === regressor.definition.standardization &&
      fitted.definition.mode === regressor.definition.mode;

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

const conditionValidationError = (
  input: Extract<ValidationInput, "observations" | "prediction-rows">,
  error: InvalidConditionValues,
): InputValidationError =>
  new InputValidationError({
    input,
    issues: error.issues,
    message: error.message,
  });

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

  const conditionNames = conditionNamesFromLayout(resolved.layout);

  const hasMultiplicativeRequest =
    resolved.layout.components.some(
      (component) => component.definition.mode === "multiplicative",
    ) ||
    options.events.layout.components.some((component) => component.mode === "multiplicative") ||
    options.regressors.some((regressor) => regressor.mode === "multiplicative");

  if (options.growth === "flat" && conditionNames.length > 0 && !hasMultiplicativeRequest) {
    return yield* Effect.fail(
      new UnsupportedConfigurationError({
        option: "conditional-seasonalities",
        model: "flat-map",
        message: "Conditional seasonalities require linear piecewise MAP fitting",
      }),
    );
  }

  if (
    options.growth === "flat" &&
    options.events.layout.coefficientCount > 0 &&
    !hasMultiplicativeRequest
  ) {
    return yield* Effect.fail(
      new UnsupportedConfigurationError({
        option: "events",
        model: "flat-map",
        message: "Custom events require linear piecewise MAP fitting",
      }),
    );
  }

  if (options.growth === "flat" && options.regressors.length > 0 && !hasMultiplicativeRequest) {
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

  let logisticBounds: LogisticTrainingBounds | undefined;

  if (options.growth === "logistic") {
    logisticBounds = yield* parseLogisticTrainingBounds(
      observations,
      options.scaling ?? defaultTargetScalingMode,
    );
  } else {
    yield* rejectNonLogisticTrainingBounds(observations);
  }

  const alignedConditionValues = yield* alignConditionValues(
    observations,
    conditionNames,
    "observations",
  ).pipe(Effect.mapError((error) => conditionValidationError("observations", error)));

  const masks = yield* createSeasonalityMasks(resolved.layout, alignedConditionValues).pipe(
    Effect.mapError((error) => conditionValidationError("observations", error)),
  );

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

  const fitPlan = makeFitPlan(
    options,
    resolved.layout,
    masks,
    additionalFeatures,
    regressorFeatures.regressors,
    logisticBounds,
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

  if (conditionNames.length > 0) {
    yield* Effect.annotateCurrentSpan({
      "effect_prophet.seasonality.condition.count": conditionNames.length,
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

  const returnedRegressors = fittedRegressors(fittedModel);

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
        multiplicative: 0,
        seasonalities: [],
        events: [],
        regressors: [],
      });
    }

    return forecasts;
  });

type FittedSeasonalProphet =
  | FittedFlatMapProphet
  | FittedPiecewiseMapProphet
  | FittedLogisticMapProphet;

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

    const events = model.events;
    const fittedRegressors = model.regressors;
    const eventComponentCount = events.layout.components.length;

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

        seasonalities.push({
          name: component.definition.name,
          mode: "additive",
          value: componentValue,
        });
      }

      const eventComponents: Array<EventForecastComponent> = [];

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

        eventComponents.push({ name: component.name, mode: "additive", value: componentValue });
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

        regressors.push({
          name: regressor.definition.name,
          mode: "additive",
          value: componentValue,
        });
      }

      forecasts.push({
        timestamp,
        trend,
        additive,
        multiplicative: 0,
        value,
        seasonalities,
        events: eventComponents,
        regressors,
      });
    }

    return forecasts;
  });

const forecastsFromMixedBatch = (
  model: FittedSeasonalProphet,
  timestamps: PredictionTimestamps,
  batch: MixedMapPredictionBatch,
): Effect.Effect<Forecasts, PredictionError> =>
  Effect.gen(function* () {
    const seasonalComponentCount = model.seasonalities.components.length;
    const eventComponentCount = model.events.layout.components.length;
    const rowWidth = 4 + seasonalComponentCount + eventComponentCount + model.regressors.length;
    const forecasts: Array<Forecast> = [];

    for (const [row, timestamp] of timestamps.entries()) {
      const rowOffset = row * rowWidth;
      const trend = batch.values[rowOffset];
      const additive = batch.values[rowOffset + 1];
      const multiplicative = batch.values[rowOffset + 2];
      const value = batch.values[rowOffset + 3];

      if (
        trend === undefined ||
        additive === undefined ||
        multiplicative === undefined ||
        value === undefined
      ) {
        return yield* Effect.fail(
          new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: "WASM mixed MAP prediction backend omitted an expected forecast value",
          }),
        );
      }

      const project = (
        name: string,
        mode: "additive" | "multiplicative",
        componentIndex: number,
      ): Effect.Effect<ForecastComponent, PredictionError> => {
        const effect = batch.values[rowOffset + 4 + componentIndex];

        if (effect === undefined) {
          return Effect.fail(
            new PredictionError({
              reason: "backend-failure",
              timestamp,
              message: "WASM mixed MAP prediction backend omitted a named component",
            }),
          );
        }

        if (mode === "additive") {
          return Effect.succeed({ name, mode, value: effect });
        }

        const contribution = batch.contributions[row * batch.componentCount + componentIndex];

        return contribution === undefined
          ? Effect.fail(
              new PredictionError({
                reason: "backend-failure",
                timestamp,
                message: "WASM mixed MAP backend omitted a projected component contribution",
              }),
            )
          : Effect.succeed({ name, mode, factor: effect, contribution });
      };

      const seasonalities: Array<SeasonalForecastComponent> = [];

      for (const [index, component] of model.seasonalities.components.entries()) {
        seasonalities.push(
          yield* project(component.definition.name, component.definition.mode, index),
        );
      }

      const events: Array<EventForecastComponent> = [];

      for (const [index, component] of model.events.layout.components.entries()) {
        events.push(yield* project(component.name, component.mode, seasonalComponentCount + index));
      }

      const regressors: Array<RegressorForecastComponent> = [];

      for (const [index, regressor] of model.regressors.entries()) {
        regressors.push(
          yield* project(
            regressor.definition.name,
            regressor.definition.mode,
            seasonalComponentCount + eventComponentCount + index,
          ),
        );
      }

      forecasts.push({
        timestamp,
        trend,
        additive,
        multiplicative,
        value,
        seasonalities,
        events,
        regressors,
      });
    }

    return forecasts;
  });

const makePredictionFeatures = Effect.fn("makePredictionFeatures")(function* (
  timestamps: PredictionTimestamps,
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
  masks: SeasonalityMaskMatrix,
  events: EventCalendar,
  regressors: ReadonlyArray<FittedRegressor>,
): Effect.fn.Return<
  { readonly masks: SeasonalityMaskMatrix; readonly features: KnownAdditiveFeatures },
  PredictionError | InputValidationError
> {
  const firstTimestamp = timestamps[0] ?? 0;

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
  masks: SeasonalityMaskMatrix,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  model.events.layout.coefficientCount === 0 &&
  model.regressors.length === 0 &&
  conditionNamesFromLayout(model.seasonalities).length === 0
    ? predictPiecewiseMapWithWasm(model, timestamps).pipe(
        Effect.flatMap((batch) =>
          forecastsFromSeasonalBatch(model, timestamps, batch, "linear MAP"),
        ),
      )
    : Effect.gen(function* () {
        const { features } = yield* makePredictionFeatures(
          timestamps,
          alignedRegressorValues,
          masks,
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

const predictMixedMapForecasts = (
  model: FittedFlatMapProphet | FittedPiecewiseMapProphet,
  timestamps: PredictionTimestamps,
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
  masks: SeasonalityMaskMatrix,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  Effect.gen(function* () {
    const { features } = yield* makePredictionFeatures(
      timestamps,
      alignedRegressorValues,
      masks,
      model.events,
      model.regressors,
    );

    const batch =
      model.model === "linear-piecewise-map"
        ? yield* predictMixedLinearMapWithWasm(model, timestamps, masks, features)
        : yield* predictMixedFlatMapWithWasm(model, timestamps, masks, features);

    return yield* forecastsFromMixedBatch(model, timestamps, batch);
  });

const predictLogisticMapForecasts = (
  model: FittedLogisticMapProphet,
  timestamps: PredictionTimestamps,
  bounds: Parameters<typeof predictLogisticMapWithWasm>[2],
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
  masks: SeasonalityMaskMatrix,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  Effect.gen(function* () {
    const { features } = yield* makePredictionFeatures(
      timestamps,
      alignedRegressorValues,
      masks,
      model.events,
      model.regressors,
    );

    const batch = yield* predictLogisticMapWithWasm(model, timestamps, bounds, masks, features);

    return yield* forecastsFromMixedBatch(model, timestamps, batch);
  });

const isMixedModel = (model: FittedFlatMapProphet | FittedPiecewiseMapProphet): boolean =>
  model.fitSummary.method === "mixed-flat-map-coordinate-v1" ||
  model.fitSummary.method === "mixed-piecewise-map-coordinate-v1";

const predictFittedSeasonalModel = (
  model: FittedFlatMapProphet | FittedPiecewiseMapProphet,
  timestamps: PredictionTimestamps,
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
  masks: SeasonalityMaskMatrix,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  isMixedModel(model)
    ? predictMixedMapForecasts(model, timestamps, alignedRegressorValues, masks)
    : Match.value(model).pipe(
        Match.discriminatorsExhaustive("model")({
          "flat-map": (flatModel) => predictFlatMapForecasts(flatModel, timestamps),
          "linear-piecewise-map": (piecewiseModel) =>
            predictPiecewiseMapForecasts(piecewiseModel, timestamps, alignedRegressorValues, masks),
        }),
      );

const fittedRegressors = (model: FittedProphet): ReadonlyArray<FittedRegressor> =>
  model.model === "linear-piecewise-map" ||
  model.model === "flat-map" ||
  model.model === "logistic-piecewise-map"
    ? model.regressors
    : [];

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

  const conditionNames =
    parsedModel.model === "linear-trend" ? [] : conditionNamesFromLayout(parsedModel.seasonalities);

  let logisticBounds: LogisticPredictionBounds | undefined;

  if (parsedModel.model === "logistic-piecewise-map") {
    logisticBounds = yield* parseLogisticPredictionBounds(
      rows,
      parsedModel.targetScaling.floorPolicy,
    );
  } else {
    yield* rejectNonLogisticPredictionBounds(rows);
  }

  const alignedConditionValues = yield* alignConditionValues(
    rows,
    conditionNames,
    "prediction-rows",
  ).pipe(Effect.mapError((error) => conditionValidationError("prediction-rows", error)));

  const regressors = fittedRegressors(parsedModel);

  const alignedRegressorValues = yield* alignRegressorValues(
    rows,
    regressors.map((regressor) => regressor.definition),
    "prediction-rows",
  );

  const timestamps = rows.map((row) => row.timestamp);

  if (parsedModel.model === "linear-trend") {
    return yield* predictLinearForecasts(parsedModel, timestamps);
  }

  const masks = yield* createSeasonalityMasks(
    parsedModel.seasonalities,
    alignedConditionValues,
  ).pipe(Effect.mapError((error) => conditionValidationError("prediction-rows", error)));

  if (parsedModel.model === "logistic-piecewise-map") {
    if (logisticBounds === undefined) {
      return yield* Effect.fail(
        new PredictionError({
          reason: "invalid-model",
          timestamp: firstRow.timestamp,
          message: "Logistic prediction bounds were not resolved",
        }),
      );
    }

    return yield* predictLogisticMapForecasts(
      parsedModel,
      timestamps,
      logisticBounds,
      alignedRegressorValues,
      masks,
    );
  }

  return yield* predictFittedSeasonalModel(parsedModel, timestamps, alignedRegressorValues, masks);
});
