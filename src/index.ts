export {
  anomalies,
  defaultAnomalyIntervalWidth,
  detectAnomalies,
  type AnomalyAssessment,
  type AnomalyPosition,
  type AnomalyReport,
} from "./anomaly";

export { type ComponentMode } from "./component-mode";

export {
  inspectCountryHolidays,
  parseCountryHolidays,
  CountryHolidayError,
  type CanonicalCountry,
  type CountryHolidays,
  type EncodedCountryHolidays,
  type CountryHolidayCoveragePolicy,
  type CountryHolidayCoverageIssue,
  type CountryHolidayInspection,
} from "./country-holidays";

export type { CountryHolidayModel } from "./internal/country-holiday-model";

export {
  comparePerformance,
  crossValidateBaseline,
  type BaselineCrossValidationResult,
  type BaselineDefinition,
  type BaselineFoldSummary,
  type ComparisonReport,
} from "./evaluation-baseline";

export {
  evaluateHoldout,
  encodeEvaluationReport,
  decodeEvaluationReport,
  type EvaluationProvenance,
  type HoldoutEvaluationInput,
  type HoldoutEvaluationReport,
  type SelectedCandidateReceipt,
} from "./evaluation-report";

export {
  performanceMetrics,
  type HorizonMetricPoint,
  type MetricAggregation,
  type MetricBucket,
  type MetricName,
  type MetricOptions,
  type MetricReport,
  type MetricScore,
  type RollingMetricPoint,
  type RowMetricPoint,
} from "./evaluation-metrics";

export {
  crossValidate,
  planRollingOrigin,
  type CrossValidationFoldSummary,
  type CrossValidationInput,
  type CrossValidationPointInput,
  type CrossValidationIntervalInput,
  type CrossValidationIntervalRow,
  type CrossValidationPointRow,
  type CrossValidationResult,
  type IntervalCrossValidationResult,
  type PointCrossValidationResult,
  type PositiveDurationMs,
  type RollingOriginFoldSummary,
  type RollingOriginPlanInput,
  type RollingOriginPlanSummary,
} from "./evaluation";

export {
  EvaluationError,
  EvaluationMetricError,
  EvaluationSearchError,
  EvaluationReportError,
  HoldoutEvaluationError,
  FittingError,
  InputValidationError,
  ModelSerializationError,
  PredictionError,
  type CandidateId,
  type PortableCandidateOutcome,
  type PortableEvaluationFailure,
  type FittingFailureReason,
  type ModelSerializationOperation,
  type PredictionFailureReason,
  type ValidationInput,
  type ValidationIssue,
  type WasmFailurePhase,
} from "./errors";

export {
  parseEventCalendar,
  type EncodedEventOccurrence,
  type EventCalendar,
  type EventFeatureColumn,
  type EventOccurrence,
} from "./event";

export { forecast } from "./forecast";

export {
  searchModels,
  type ModelSearchInput,
  type ModelSearchResult,
  type SearchCandidateInput,
  type SearchCandidateResult,
  type SearchObjective,
} from "./model-search";

export {
  decodeObservations,
  type EncodedObservation,
  type EncodedObservations,
  type Observation,
  type Observations,
} from "./observation";

export {
  predictWithIntervals,
  type ForecastWithIntervals,
  type ForecastsWithIntervals,
} from "./predict-with-intervals";

export { prophetFittingBackendLayer } from "./internal/prophet-fitting-backend";

export {
  decodeFittedModel,
  encodeFittedModel,
  type EncodedFittedModel,
  type EncodedFittedRegressor,
  type EncodedFlatMapModel,
  type EncodedLogisticMapModel,
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
  type EncodedFlatMapOptions,
  type EncodedFlatTrendOptions,
  type EncodedLinearAdditiveOptions,
  type EncodedLinearTrendOptions,
  type EncodedLogisticOptions,
  type EncodedMapOptions,
  type EncodedChangepointSetting,
  type EncodedProphetOptions,
  type FlatAdditiveOptions,
  type FlatMapOptions,
  type FlatTrendOptions,
  type Growth,
  type LinearAdditiveOptions,
  type LinearTrendOptions,
  type LogisticOptions,
  type MapOptions,
  type ChangepointSetting,
  type ProphetOptions,
} from "./options";

export {
  LinearOptimizerSchema,
  decodeLinearOptimizer,
  defaultLinearOptimizer,
  defaultLbfgsSettings,
  type EncodedLinearOptimizer,
  type LinearOptimizer,
  type EncodedLbfgsSettings,
  type LbfgsSettings,
} from "./linear-optimizer";

export {
  type FittedFlatMapProphet,
  type FittedLogisticMapProphet,
  type FittedPiecewiseMapProphet,
  type FittedProphet,
  type FlatMapParameters,
  type LogisticMapParameters,
  type PiecewiseMapParameters,
} from "./fitted-model";

export { type LogisticFloorPolicy, type LogisticTargetScaling } from "./logistic";

export {
  defaultSeasonalityPriorScale,
  type EncodedSeasonality,
  type SeasonalityDefinition,
} from "./seasonality";

export {
  defaultTargetScalingMode,
  type TargetScaling,
  type TargetScalingMode,
} from "./target-scaling";

export {
  fit,
  getRegressorCoefficients,
  predict,
  predictUncertainty,
  type EncodedPredictionRow,
  type EncodedPredictionRows,
  type EncodedPredictionTimestamps,
  type EventForecastComponent,
  type Forecast,
  type ForecastComponent,
  type Forecasts,
  type PredictionRow,
  type PredictionRows,
  type PredictionTimestamps,
  type RegressorForecastComponent,
  type SeasonalForecastComponent,
} from "./prophet";

export {
  defaultIntervalWidth,
  maximumSampleCells,
  maximumSimulationRows,
  simulationIdentity,
  type EncodedIntervalOptions,
  type EncodedUncertaintyOptions,
  type UncertaintyInterval,
  type UncertaintyIntervalRow,
  type UncertaintyOptions,
  type UncertaintyResult,
} from "./uncertainty";

export {
  parseRegressorDefinitions,
  type EncodedRegressorDefinition,
  type EncodedRegressorStandardization,
  type FittedRegressor,
  type RegressorCoefficient,
  type RegressorDefinition,
  type RegressorTransform,
  type ResolvedRegressor,
} from "./regressor";
