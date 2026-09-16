export {
  FittingError,
  InputValidationError,
  ModelSerializationError,
  PredictionError,
  type FittingFailureReason,
  type ModelSerializationOperation,
  type PredictionFailureReason,
  type ValidationInput,
  type ValidationIssue,
  type WasmFailurePhase,
} from "./errors";

export {
  decodeObservations,
  type EncodedObservation,
  type EncodedObservations,
  type Observation,
  type Observations,
} from "./observation";

export { prophetFittingBackendLayer } from "./internal/prophet-fitting-backend";

export {
  decodeFittedModel,
  encodeFittedModel,
  type EncodedFittedModel,
  type EncodedLinearAdditiveModel,
  type EncodedLinearModel,
  type SerializableFittedModel,
} from "./model-serialization";

export {
  decodeOptions,
  defaultProphetOptions,
  type EncodedFlatBaselineOptions,
  type EncodedLinearAdditiveOptions,
  type EncodedLinearTrendOptions,
  type EncodedProphetOptions,
  type FlatBaselineOptions,
  type Growth,
  type LinearAdditiveOptions,
  type LinearTrendOptions,
  type ProphetOptions,
} from "./options";

export {
  type FittedConstantProphet,
  type FittedLinearAdditiveProphet,
  type FittedLinearProphet,
  type FittedProphet,
  type LinearAdditiveParameters,
} from "./fitted-model";

export {
  defaultSeasonalityPriorScale,
  type EncodedSeasonality,
  type SeasonalityDefinition,
} from "./seasonality";

export {
  fit,
  predict,
  type EncodedPredictionTimestamps,
  type Forecast,
  type Forecasts,
  type PredictionTimestamps,
  type SeasonalForecastComponent,
} from "./prophet";
