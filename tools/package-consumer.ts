import {
  crossValidate,
  fit,
  planRollingOrigin,
  predictUncertainty,
  type EncodedPredictionRows,
  type FittedProphet,
  type EncodedRegressorDefinition,
  type CrossValidationResult,
  type Forecast,
  type PointCrossValidationResult,
  type RollingOriginPlanSummary,
  type RegressorCoefficient,
  type TargetScaling,
} from "effect-prophet";

const planOperation = planRollingOrigin(
  [{ timestamp: "2024-01-01T00:00:00.000Z", value: 1 }],
  {},
  { horizonMs: 1, cutoffs: { mode: "explicit", timestamps: ["2024-01-01T00:00:00.001Z"] } },
);

const plan: RollingOriginPlanSummary | undefined = undefined;

const crossValidationOperation = crossValidate(
  [
    { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
    { timestamp: "2024-01-02T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-03T00:00:00.000Z", value: 3 },
  ],
  {},
  {
    horizonMs: 86_400_000,
    cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
  },
);

const pointResult: PointCrossValidationResult | undefined = undefined;

const intervalOperation = crossValidate(
  [
    { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
    { timestamp: "2024-01-02T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-03T00:00:00.000Z", value: 3 },
  ],
  { map: { changepoints: { mode: "explicit", timestamps: [] } } },
  {
    horizonMs: 86_400_000,
    cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
  },
  { mode: "intervals", uncertainty: { seed: 1, samples: 8 } },
);

const intervalValue = (result: CrossValidationResult): number | undefined =>
  result.kind === "intervals" ? result.rows[0]?.lower : undefined;

const operation = fit([{ timestamp: "2024-01-01T00:00:00.000Z", value: 1 }], {
  growth: "flat",
  scaling: "minmax",
});

const forecast: Forecast | undefined = undefined;

const regressor: EncodedRegressorDefinition = { name: "price", standardization: "auto" };

const rows: EncodedPredictionRows = [
  { timestamp: "2025-01-01T00:00:00.000Z", regressors: { price: 2 } },
];

const coefficient: RegressorCoefficient | undefined = undefined;

const targetScaling: TargetScaling = { mode: "minmax", offset: 1, scale: 1 };

declare const fittedModel: FittedProphet;

const simulation = predictUncertainty(fittedModel, rows, { seed: 42 });

void planOperation;

void crossValidationOperation;

void pointResult;

void intervalOperation;

void intervalValue;

void plan;

void operation;

void simulation;

void forecast;

void regressor;

void rows;

void coefficient;

void targetScaling;
