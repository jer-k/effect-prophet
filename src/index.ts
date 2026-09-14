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
  type ValidationIssue,
} from "./errors";

export {
  decodeObservations,
  type EncodedObservation,
  type EncodedObservations,
  type Observation,
  type Observations,
} from "./observation";

export { constantMeanFittingBackendLayer } from "./internal/constant-fitting-backend";

export { wasmLinearTrendFittingBackendLayer } from "./internal/wasm-linear-trend-backend";

export {
  decodeFittedModel,
  encodeFittedModel,
  type EncodedFittedModel,
} from "./model-serialization";

export {
  decodeOptions,
  defaultProphetOptions,
  type EncodedProphetOptions,
  type Growth,
  type ProphetOptions,
} from "./options";

export {
  fit,
  predict,
  type EncodedPredictionTimestamps,
  type FittedConstantProphet,
  type FittedLinearProphet,
  type FittedProphet,
  type Forecast,
  type Forecasts,
  type PredictionTimestamps,
} from "./prophet";
