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
  type ValidationInput,
  type ValidationIssue,
} from "./errors";
import { eventCalendarsMatch, type EventCalendar } from "./event";
import { CountryHolidayError } from "./country-holidays";
import {
  fitCountryHolidayEvents,
  predictCountryHolidayEvents,
  countryHolidayModelFields,
  type CountryHolidayModel,
} from "./internal/country-holiday-model";
import {
  parseFittedModel,
  type FittedFlatMapProphet,
  type FittedLogisticMapProphet,
  type FittedPiecewiseMapProphet,
  type FittedProphet,
  type RegressorModel,
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
import {
  simulateMapWithWasm,
  type SimulationOffsets,
} from "./internal/wasm-map-uncertainty-backend";
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
import { defaultLinearOptimizer } from "./linear-optimizer";
import { decodeObservations, type Observation, type Observations } from "./observation";
import {
  checkExplicitChangepointBounds,
  checkOptionFeatureNames,
  decodeOptions,
  optionsValidationErrorFromSeasonality,
  prefixOptionsIssues,
  type EncodedProphetOptions,
  type ProphetOptions,
} from "./options";
import { decodePredictionRows, type PredictionRow, type PredictionRows } from "./prediction-row";
import {
  projectRegressorCoefficient,
  type FittedRegressor,
  type RegressorCoefficient,
  type RegressorDefinition,
  type ResolvedRegressor,
} from "./regressor";
import type { SeasonalityLayout } from "./seasonality";
import { defaultTargetScalingMode } from "./target-scaling";
import {
  deriveRegressorModelSeed,
  exceedsSimulationBudget,
  parseUncertaintyOptions,
  simulationIdentity,
  type EncodedUncertaintyOptions,
  type UncertaintyOptions,
  type UncertaintyResult,
} from "./uncertainty";

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

const makeFitPlan = (
  options: ProphetOptions,
  layout: SeasonalityLayout,
  masks: SeasonalityMaskMatrix,
  additionalFeatures: KnownAdditiveFeatures,
  regressors: ReadonlyArray<ResolvedRegressor>,
  logisticBounds?: LogisticTrainingBounds,
): FitPlan => {
  const warmStart = options.map.warmStart === undefined ? {} : { warmStart: options.map.warmStart };

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
      ...warmStart,
    });
  }

  if (options.growth === "linear") {
    const map = options.map;

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
      ...warmStart,
    });
  }

  return FitPlan.FlatStanMap({
    scaling: options.scaling ?? defaultTargetScalingMode,
    seasonalities: layout,
    changepoints: options.map.changepoints,
    changepointPriorScale: options.map.changepointPriorScale,
    optimizer: options.map.optimizer ?? defaultLinearOptimizer,
    seasonalityMasks: masks,
    additionalFeatures,
    events: options.events,
    regressors,
    ...warmStart,
  });
};

const predictionEvents = (
  model: FittedProphet,
  timestamps: PredictionTimestamps,
): Effect.Effect<EventCalendar, CountryHolidayError> =>
  model.countryHolidays === undefined
    ? Effect.succeed(model.events)
    : predictCountryHolidayEvents(model.countryHolidays, timestamps, model.events);

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
  InputValidationError | FittingError | CountryHolidayError,
  FittingBackend
> {
  const observations = yield* decodeObservations(observationsInput);
  const options = yield* decodeOptions(optionsInput);

  return yield* fitObservations(observations, options);
});

type Mutable<Fields> = { -readonly [Key in keyof Fields]: Fields[Key] };

/** Name the regressor whose model failed, and move option issues under its `predictor`. */
const regressorModelFitError = (
  error: InputValidationError | FittingError | CountryHolidayError,
  name: string,
  column: number,
): InputValidationError | FittingError | CountryHolidayError => {
  if (Predicate.isTagged("InputValidationError")(error)) {
    return error.input === "options"
      ? prefixOptionsIssues(error, ["regressors", column, "predictor"])
      : error;
  }

  if (!Predicate.isTagged("FittingError")(error)) {
    return error;
  }

  const fields: Mutable<ConstructorParameters<typeof FittingError>[0]> = {
    reason: error.reason,
    observationCount: error.observationCount,
    regressor: name,
    message: `The model for regressor '${name}' failed to fit: ${error.message}`,
  };

  if (error.parameterCount !== undefined) {
    fields.parameterCount = error.parameterCount;
  }

  if (error.memoryLimitBytes !== undefined) {
    fields.memoryLimitBytes = error.memoryLimitBytes;
  }

  if (error.backendPhase !== undefined) {
    fields.backendPhase = error.backendPhase;
  }

  return error.cause === undefined
    ? new FittingError(fields)
    : new FittingError(fields, { cause: error.cause });
};

/**
 * Fit each requested regressor model to its regressor's training values, as Python's
 * `regressor_predictor` does: the history's timestamps, with the regressor as the target.
 */
const fitRegressorModels = Effect.fnUntraced(function* (
  observations: Observations,
  options: ProphetOptions,
  alignedValues: ReadonlyArray<ReadonlyArray<number>>,
): Effect.fn.Return<
  ReadonlyArray<RegressorModel>,
  InputValidationError | FittingError | CountryHolidayError,
  FittingBackend
> {
  const timestamps = observations.map((observation) => observation.timestamp);
  const regressorModels: Array<RegressorModel> = [];

  for (const request of options.regressorModels) {
    const column = options.regressors.findIndex((definition) => definition.name === request.name);
    const values = alignedValues.map((row) => row[column] ?? Number.NaN);

    const training = (observation: Observation, index: number): Observation => ({
      timestamp: observation.timestamp,
      value: values[index] ?? Number.NaN,
    });

    const [first, ...rest] = observations;

    const model = yield* fitObservations(
      [training(first, 0), ...rest.map((observation, index) => training(observation, index + 1))],
      request.options,
    ).pipe(
      Effect.mapError((error) => regressorModelFitError(error, request.name, column)),
      Effect.withSpan("Prophet.fitRegressorModel"),
    );

    // Regressor model options cannot select logistic growth.
    if (model.model === "logistic-piecewise-map") {
      return yield* new FittingError({
        reason: "backend-failure",
        observationCount: observations.length,
        regressor: request.name,
        message: `The model for regressor '${request.name}' must not use logistic growth`,
      });
    }

    regressorModels.push({ name: request.name, timestamps, values, model });
  }

  return regressorModels;
});

const fitObservations = Effect.fnUntraced(function* (
  observations: Observations,
  decodedOptions: ProphetOptions,
): Effect.fn.Return<
  FittedProphet,
  InputValidationError | FittingError | CountryHolidayError,
  FittingBackend
> {
  let options = decodedOptions;

  const resolved = yield* resolveSeasonalities(observations, options).pipe(
    Effect.mapError(optionsValidationErrorFromSeasonality),
  );

  const conditionNames = conditionNamesFromLayout(resolved.layout);

  if (observations.length < 2) {
    return yield* new FittingError({
      reason: "insufficient-observations",
      observationCount: observations.length,
      message: "At least two observations are required to fit a model",
    });
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
  let countryHolidays: CountryHolidayModel | undefined;

  if (options.countryHolidays !== undefined) {
    const resolvedCalendar = yield* fitCountryHolidayEvents(
      options.countryHolidays,
      timestamps,
      options.events,
    );

    countryHolidays = resolvedCalendar.state;
    options = { ...options, events: resolvedCalendar.events };

    // decodeOptions checked custom names, so any collision here involves a country holiday name.
    yield* checkOptionFeatureNames(
      resolved.layout.components.map((component) => component.definition),
      options.events,
      options.regressors,
    ).pipe(
      Effect.mapError(
        (error) =>
          new CountryHolidayError({
            reason: "conflicting-feature-name",
            issues: error.issues,
            coverageIssues: [],
            message:
              "Country holiday names must be distinct from seasonality, condition and regressor names",
          }),
      ),
    );
  }

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

  if (options.regressorModels.length > 0) {
    yield* Effect.annotateCurrentSpan({
      "effect_prophet.regressor_model.count": options.regressorModels.length,
    });
  }

  if (options.events.layout.components.length > 0) {
    yield* Effect.annotateCurrentSpan({
      "effect_prophet.event.count": options.events.layout.components.length,
    });
  }

  if (conditionNames.length > 0) {
    yield* Effect.annotateCurrentSpan({
      "effect_prophet.seasonality.condition.count": conditionNames.length,
    });
  }

  // Python fits regressor models after checking the history, before the main model.
  const regressorModels = yield* fitRegressorModels(observations, options, alignedRegressorValues);

  const input = packTrainingInput(observations);
  const backend = yield* FittingBackend;
  const parameters = yield* backend.fit(input, fitPlan);

  const invalidParameters = new FittingError({
    reason: "backend-failure",
    observationCount: observations.length,
    message: "Fitting backend returned invalid fitted-model parameters",
  });

  const fittedModel = yield* parseFittedModel(parameters).pipe(
    Effect.mapError(() => invalidParameters),
  );

  const returnedRegressors = fittedModel.regressors;

  // Reduced flat fitting has no event input for empty calendars; its empty mode is incidental.
  const eventsMatch =
    options.events.columns.length === 0
      ? fittedModel.events.columns.length === 0 && fittedModel.events.occurrences.length === 0
      : eventCalendarsMatch(options.events, fittedModel.events);

  if (
    fittedModel.countryHolidays !== undefined ||
    fittedModel.regressorModels !== undefined ||
    !fittedRegressorsMatch(regressorFeatures.regressors, returnedRegressors) ||
    !eventsMatch
  ) {
    return yield* new FittingError({
      reason: "backend-failure",
      observationCount: observations.length,
      message: "Fitting backend returned misaligned feature metadata",
    });
  }

  if (countryHolidays === undefined && regressorModels.length === 0) {
    return fittedModel;
  }

  // The orchestrator, never the numerical backend, owns selected-country provenance and the
  // regressor models.
  const provenance =
    countryHolidays === undefined
      ? {}
      : { events: options.events, ...countryHolidayModelFields(countryHolidays) };

  const ownedRegressorModels = regressorModels.length === 0 ? {} : { regressorModels };

  return yield* parseFittedModel({ ...fittedModel, ...provenance, ...ownedRegressorModels }).pipe(
    Effect.mapError(() => invalidParameters),
  );
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
        return yield* new PredictionError({
          reason: "backend-failure",
          timestamp,
          message: `WASM ${backend} prediction backend omitted an expected forecast value`,
        });
      }

      const seasonalities: Array<SeasonalForecastComponent> = [];

      for (const [componentIndex, component] of model.seasonalities.components.entries()) {
        const componentValue = batch.values[rowOffset + 3 + componentIndex];

        if (componentValue === undefined) {
          return yield* new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: `WASM ${backend} prediction backend omitted a seasonal component`,
          });
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
          return yield* new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: `WASM ${backend} prediction backend omitted an event component`,
          });
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
          return yield* new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: `WASM ${backend} prediction backend omitted a regressor component`,
          });
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
        return yield* new PredictionError({
          reason: "backend-failure",
          timestamp,
          message: "WASM mixed MAP prediction backend omitted an expected forecast value",
        });
      }

      // Synchronous per component: yielding an Effect for every row and component dominated
      // event-heavy predictions. Only a missing backend value enters the failure channel.
      const project = (
        name: string,
        mode: "additive" | "multiplicative",
        componentIndex: number,
      ): ForecastComponent | PredictionError => {
        const effect = batch.values[rowOffset + 4 + componentIndex];

        if (effect === undefined) {
          return new PredictionError({
            reason: "backend-failure",
            timestamp,
            message: "WASM mixed MAP prediction backend omitted a named component",
          });
        }

        if (mode === "additive") {
          return { name, mode, value: effect };
        }

        const contribution = batch.contributions[row * batch.componentCount + componentIndex];

        return contribution === undefined
          ? new PredictionError({
              reason: "backend-failure",
              timestamp,
              message: "WASM mixed MAP backend omitted a projected component contribution",
            })
          : { name, mode, factor: effect, contribution };
      };

      const seasonalities: Array<SeasonalForecastComponent> = [];

      for (const [index, component] of model.seasonalities.components.entries()) {
        const projected = project(component.definition.name, component.definition.mode, index);

        if (projected instanceof PredictionError) {
          return yield* projected;
        }

        seasonalities.push(projected);
      }

      const events: Array<EventForecastComponent> = [];

      for (const [index, component] of model.events.layout.components.entries()) {
        const projected = project(component.name, component.mode, seasonalComponentCount + index);

        if (projected instanceof PredictionError) {
          return yield* projected;
        }

        events.push(projected);
      }

      const regressors: Array<RegressorForecastComponent> = [];

      for (const [index, regressor] of model.regressors.entries()) {
        const projected = project(
          regressor.definition.name,
          regressor.definition.mode,
          seasonalComponentCount + eventComponentCount + index,
        );

        if (projected instanceof PredictionError) {
          return yield* projected;
        }

        regressors.push(projected);
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

const makePredictionFeatures = Effect.fnUntraced(function* (
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
  events: EventCalendar,
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
          events,
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
  events: EventCalendar,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  Effect.gen(function* () {
    const { features } = yield* makePredictionFeatures(
      timestamps,
      alignedRegressorValues,
      masks,
      events,
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
  events: EventCalendar,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  Effect.gen(function* () {
    const { features } = yield* makePredictionFeatures(
      timestamps,
      alignedRegressorValues,
      masks,
      events,
      model.regressors,
    );

    const batch = yield* predictLogisticMapWithWasm(model, timestamps, bounds, masks, features);

    return yield* forecastsFromMixedBatch(model, timestamps, batch);
  });

const usesMixedPrediction = (model: FittedFlatMapProphet | FittedPiecewiseMapProphet): boolean =>
  model.fitSummary.method === "flat-map-stan-v1" ||
  model.fitSummary.method === "mixed-piecewise-map-stan-v2";

const predictFittedSeasonalModel = (
  model: FittedFlatMapProphet | FittedPiecewiseMapProphet,
  timestamps: PredictionTimestamps,
  alignedRegressorValues: ReadonlyArray<ReadonlyArray<number>>,
  masks: SeasonalityMaskMatrix,
  events: EventCalendar,
): Effect.Effect<Forecasts, PredictionError | InputValidationError> =>
  usesMixedPrediction(model)
    ? predictMixedMapForecasts(model, timestamps, alignedRegressorValues, masks, events)
    : Match.value(model).pipe(
        Match.discriminatorsExhaustive("model")({
          "flat-map": (flatModel) => predictFlatMapForecasts(flatModel, timestamps),
          "linear-piecewise-map": (piecewiseModel) =>
            predictPiecewiseMapForecasts(
              piecewiseModel,
              timestamps,
              alignedRegressorValues,
              masks,
              events,
            ),
        }),
      );

/** Return fitted regressor coefficients in original input units. */
export const getRegressorCoefficients = (
  model: FittedProphet,
): ReadonlyArray<RegressorCoefficient> =>
  Object.freeze(model.regressors.map(projectRegressorCoefficient));

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
): Effect.fn.Return<Forecasts, InputValidationError | PredictionError | CountryHolidayError> {
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

  const filledRows = yield* fillRegressorModelValues(parsedModel, rows);

  return yield* predictRows(parsedModel, filledRows);
});

/** Name the regressor whose model failed to forecast. */
const regressorModelPredictionError = (
  error: InputValidationError | PredictionError | CountryHolidayError,
  name: string,
): InputValidationError | PredictionError | CountryHolidayError => {
  if (!Predicate.isTagged("PredictionError")(error)) {
    return error;
  }

  const fields: Mutable<ConstructorParameters<typeof PredictionError>[0]> = {
    reason: error.reason,
    timestamp: error.timestamp,
    regressor: name,
    message: `The model for regressor '${name}' failed to forecast: ${error.message}`,
  };

  if (error.backendPhase !== undefined) {
    fields.backendPhase = error.backendPhase;
  }

  return error.cause === undefined
    ? new PredictionError(fields)
    : new PredictionError(fields, { cause: error.cause });
};

const unfilledRegressor = (rowIndex: number, name: string, message: string) =>
  new InputValidationError({
    input: "prediction-rows",
    issues: [{ path: [rowIndex, "regressors", name], message }],
    message,
  });

/**
 * Fill each forecast regressor's values in prediction rows, as Python's `predict` does.
 *
 * A row after the training history takes the regressor model's point forecast, even when it
 * supplies a value. Any other row keeps a supplied value, and a missing one is the training value
 * at the same timestamp, which must appear exactly once in the history.
 */
const fillRegressorModelValues = Effect.fnUntraced(function* (
  model: FittedProphet,
  rows: PredictionRows,
): Effect.fn.Return<PredictionRows, InputValidationError | PredictionError | CountryHolidayError> {
  const regressorModels = model.regressorModels ?? [];

  if (regressorModels.length === 0) {
    return rows;
  }

  const values = rows.map((row) => new Map(Object.entries(row.regressors ?? {})));

  for (const regressorModel of regressorModels) {
    const { name, timestamps } = regressorModel;

    // Training timestamps are nondecreasing, so the last is the end of the history.
    const historyEnd = timestamps.at(-1) ?? Number.NEGATIVE_INFINITY;
    const future = rows.flatMap((row, index) => (row.timestamp > historyEnd ? [index] : []));

    if (future.length > 0) {
      const forecasts = yield* predictRows(
        regressorModel.model,
        future.map((index) => ({ timestamp: rows[index]?.timestamp ?? historyEnd })),
      ).pipe(
        Effect.mapError((error) => regressorModelPredictionError(error, name)),
        Effect.withSpan("Prophet.predictRegressorModel"),
      );

      for (const [position, index] of future.entries()) {
        const forecast = forecasts[position];

        if (forecast !== undefined) {
          values[index]?.set(name, forecast.value);
        }
      }
    }

    let training: Map<number, number> | "repeated" | undefined;

    for (const [index, row] of rows.entries()) {
      const rowValues = values[index];

      if (row.timestamp > historyEnd || rowValues === undefined || rowValues.has(name)) {
        continue;
      }

      training ??= trainingValuesByTimestamp(regressorModel);

      if (training === "repeated") {
        return yield* unfilledRegressor(
          index,
          name,
          `Regressor '${name}' is missing, and the history repeats timestamps, so its training value cannot be looked up`,
        );
      }

      const value = training.get(row.timestamp);

      if (value === undefined) {
        return yield* unfilledRegressor(
          index,
          name,
          `Regressor '${name}' is missing, and its timestamp is not in the training history`,
        );
      }

      rowValues.set(name, value);
    }
  }

  return Object.freeze(
    rows.map((row, index): PredictionRow =>
      Object.freeze({ ...row, regressors: Object.freeze(Object.fromEntries(values[index] ?? [])) }),
    ),
  );
});

/** Each training timestamp's regressor value, or `"repeated"` when a timestamp repeats. */
const trainingValuesByTimestamp = (
  regressorModel: RegressorModel,
): Map<number, number> | "repeated" => {
  const training = new Map<number, number>();

  for (const [index, timestamp] of regressorModel.timestamps.entries()) {
    const value = regressorModel.values[index];

    if (training.has(timestamp) || value === undefined) {
      return "repeated";
    }

    training.set(timestamp, value);
  }

  return training;
};

/** Predict rows whose forecast regressor values are already filled. */
const predictRows = Effect.fnUntraced(function* (
  parsedModel: FittedProphet,
  rows: PredictionRows,
): Effect.fn.Return<Forecasts, InputValidationError | PredictionError | CountryHolidayError> {
  const firstRow = rows[0];

  if (firstRow === undefined) {
    return [];
  }

  const conditionNames = conditionNamesFromLayout(parsedModel.seasonalities);

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

  const regressors = parsedModel.regressors;

  const alignedRegressorValues = yield* alignRegressorValues(
    rows,
    regressors.map((regressor) => regressor.definition),
    "prediction-rows",
  );

  const timestamps = rows.map((row) => row.timestamp);
  const events = yield* predictionEvents(parsedModel, timestamps);

  const masks = yield* createSeasonalityMasks(
    parsedModel.seasonalities,
    alignedConditionValues,
  ).pipe(Effect.mapError((error) => conditionValidationError("prediction-rows", error)));

  if (parsedModel.model === "logistic-piecewise-map") {
    if (logisticBounds === undefined) {
      return yield* new PredictionError({
        reason: "invalid-model",
        timestamp: firstRow.timestamp,
        message: "Logistic prediction bounds were not resolved",
      });
    }

    return yield* predictLogisticMapForecasts(
      parsedModel,
      timestamps,
      logisticBounds,
      alignedRegressorValues,
      masks,
      events,
    );
  }

  return yield* predictFittedSeasonalModel(
    parsedModel,
    timestamps,
    alignedRegressorValues,
    masks,
    events,
  );
});

const emptyUncertaintyResult = (options: UncertaintyOptions): UncertaintyResult =>
  options.output === "samples"
    ? {
        kind: "samples",
        simulation: simulationIdentity,
        sampleCount: options.samples,
        timestamps: [],
        trend: new Float64Array(),
        value: new Float64Array(),
      }
    : {
        kind: "intervals",
        simulation: simulationIdentity,
        sampleCount: options.samples,
        intervalWidth: options.intervalWidth,
        rows: [],
      };

/**
 * Simulate seeded MAP predictive samples or intervals for complete MAP rows.
 *
 * A regressor forecast by its own model varies with that model's draws, as in Python, so its
 * uncertainty widens the main model's after the history.
 */
export const predictUncertainty = Effect.fn("Prophet.predictUncertainty")(function* (
  model: FittedProphet,
  rowsInput: Parameters<typeof decodePredictionRows>[0],
  optionsInput: EncodedUncertaintyOptions,
): Effect.fn.Return<
  UncertaintyResult,
  InputValidationError | PredictionError | CountryHolidayError
> {
  const rows = yield* decodePredictionRows(rowsInput);
  const options = yield* parseUncertaintyOptions(optionsInput);
  const firstRow = rows[0];

  if (firstRow === undefined) {
    return emptyUncertaintyResult(options);
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

  const filledRows = yield* fillRegressorModelValues(parsedModel, rows);

  return yield* simulateRows(parsedModel, filledRows, options);
});

/**
 * Each forecast regressor's draws as per-sample changes to the rows after the history.
 *
 * Python's predictive samples swap each regressor model's draws in for its point forecast, one
 * draw per sample. A regressor's effect is linear in its value, so each draw changes its row by
 * the coefficient times its distance from the point forecast. Earlier rows keep their values.
 */
const regressorModelOffsets = Effect.fnUntraced(function* (
  model: FittedProphet,
  rows: PredictionRows,
  future: ReadonlyArray<number>,
  options: UncertaintyOptions,
): Effect.fn.Return<
  SimulationOffsets | undefined,
  InputValidationError | PredictionError | CountryHolidayError
> {
  if (future.length === 0) {
    return undefined;
  }

  const { samples } = options;
  const additive = new Float64Array(future.length * samples);
  const multiplicative = new Float64Array(future.length * samples);
  const futureRows = future.map((index) => ({ timestamp: rows[index]?.timestamp ?? 0 }));

  for (const [index, regressorModel] of (model.regressorModels ?? []).entries()) {
    const { name } = regressorModel;
    const regressor = model.regressors.find((fitted) => fitted.definition.name === name);

    const draws = yield* simulateRows(regressorModel.model, futureRows, {
      ...options,
      seed: deriveRegressorModelSeed(options.seed, index),
      output: "samples",
    }).pipe(
      Effect.mapError((error) => regressorModelPredictionError(error, name)),
      Effect.withSpan("Prophet.simulateRegressorModel"),
    );

    if (regressor === undefined || draws.kind !== "samples") {
      return yield* new PredictionError({
        reason: "invalid-model",
        timestamp: futureRows[0]?.timestamp ?? 0,
        regressor: name,
        message: `The model for regressor '${name}' returned no draws`,
      });
    }

    const { coefficient } = projectRegressorCoefficient(regressor);
    const target = regressor.definition.mode === "additive" ? additive : multiplicative;

    for (const [position, rowIndex] of future.entries()) {
      const point = rows[rowIndex]?.regressors?.[name] ?? Number.NaN;

      for (let sample = 0; sample < samples; sample += 1) {
        const cell = position * samples + sample;

        target[cell] =
          (target[cell] ?? 0) + coefficient * ((draws.value[cell] ?? Number.NaN) - point);
      }
    }
  }

  return { rows: Float64Array.from(future), additive, multiplicative };
});

/** The rows after the training history, which regressor models forecast. */
const regressorModelFutureRows = (model: FittedProphet, rows: PredictionRows): Array<number> => {
  // Every regressor model is trained on the same history.
  const historyEnd = model.regressorModels?.[0]?.timestamps.at(-1);

  return historyEnd === undefined
    ? []
    : rows.flatMap((row, index) => (row.timestamp > historyEnd ? [index] : []));
};

/** Simulate rows whose forecast regressor values are already filled. */
const simulateRows = Effect.fnUntraced(function* (
  parsedModel: FittedProphet,
  rows: PredictionRows,
  options: UncertaintyOptions,
): Effect.fn.Return<
  UncertaintyResult,
  InputValidationError | PredictionError | CountryHolidayError
> {
  const firstRow = rows[0];

  if (firstRow === undefined) {
    return emptyUncertaintyResult(options);
  }

  const logisticBounds =
    parsedModel.model === "logistic-piecewise-map"
      ? yield* parseLogisticPredictionBounds(rows, parsedModel.targetScaling.floorPolicy)
      : undefined;

  if (parsedModel.model !== "logistic-piecewise-map") {
    yield* rejectNonLogisticPredictionBounds(rows);
  }

  const names = conditionNamesFromLayout(parsedModel.seasonalities);

  const alignedConditions = yield* alignConditionValues(rows, names, "prediction-rows").pipe(
    Effect.mapError((error) => conditionValidationError("prediction-rows", error)),
  );

  const alignedRegressors = yield* alignRegressorValues(
    rows,
    parsedModel.regressors.map((regressor) => regressor.definition),
    "prediction-rows",
  );

  const timestamps = rows.map((row) => row.timestamp);
  const events = yield* predictionEvents(parsedModel, timestamps);

  const masks = yield* createSeasonalityMasks(parsedModel.seasonalities, alignedConditions).pipe(
    Effect.mapError((error) => conditionValidationError("prediction-rows", error)),
  );

  const horizon =
    parsedModel.model !== "flat-map"
      ? Math.max(0, (Math.max(...timestamps) - parsedModel.timeOrigin) / parsedModel.timeScale - 1)
      : 0;

  const future = regressorModelFutureRows(parsedModel, rows);

  // Regressor model draws are held in full, so their rows are bounded like sample output.
  if (
    exceedsSimulationBudget(timestamps.length, options.samples, options.output) ||
    exceedsSimulationBudget(future.length, options.samples, "samples") ||
    (parsedModel.model !== "flat-map" && parsedModel.deltas.length > 10_000) ||
    horizon > 20 ||
    (parsedModel.model !== "flat-map" && parsedModel.deltas.length * horizon > 256)
  ) {
    return yield* new PredictionError({
      reason: "simulation-limit",
      timestamp: firstRow.timestamp,
      message: "MAP simulation exceeds its bounded row, draw or horizon budget",
    });
  }

  const { features } = yield* makePredictionFeatures(
    timestamps,
    alignedRegressors,
    masks,
    events,
    parsedModel.regressors,
  );

  const offsets = yield* regressorModelOffsets(parsedModel, rows, future, options);

  return yield* simulateMapWithWasm(
    parsedModel,
    timestamps,
    masks,
    features,
    options,
    undefined,
    logisticBounds,
    offsets,
  );
});
