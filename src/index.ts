export {
  FittingError,
  InputValidationError,
  ModelSerializationError,
  PredictionError,
  UnsupportedConfigurationError,
  type FittingFailureReason,
  type ModelSerializationOperation,
  type PredictionFailureReason,
  type ValidationInput,
  type UnsupportedConfiguration,
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

export { constantMeanFittingBackendLayer } from "./internal/constant-fitting-backend";

export { wasmAdditiveFittingBackendLayer } from "./internal/wasm-additive-backend";

export { wasmLinearTrendFittingBackendLayer } from "./internal/wasm-linear-trend-backend";

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
  type EncodedProphetOptions,
  type Growth,
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
