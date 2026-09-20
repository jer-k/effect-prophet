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
  type EncodedFlatMapModel,
  type EncodedLinearModel,
  type EncodedPiecewiseMapModel,
  type SerializableFittedModel,
} from "./model-serialization";

export {
  decodeOptions,
  defaultAutomaticMapOptions,
  defaultProphetOptions,
  type BuiltInSeasonalities,
  type BuiltInSeasonalitySetting,
  type EncodedBuiltInSeasonalities,
  type EncodedBuiltInSeasonalitySetting,
  type EncodedFlatAdditiveOptions,
  type EncodedFlatTrendOptions,
  type EncodedLinearAdditiveOptions,
  type EncodedLinearTrendOptions,
  type EncodedMapOptions,
  type EncodedChangepointSetting,
  type EncodedProphetOptions,
  type FlatAdditiveOptions,
  type FlatTrendOptions,
  type Growth,
  type LinearAdditiveOptions,
  type LinearTrendOptions,
  type MapOptions,
  type MapOptimizerControls,
  type ChangepointSetting,
  type ProphetOptions,
} from "./options";

export {
  type FittedFlatMapProphet,
  type FittedLinearProphet,
  type FittedPiecewiseMapProphet,
  type FittedProphet,
  type FlatMapParameters,
  type PiecewiseMapParameters,
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
