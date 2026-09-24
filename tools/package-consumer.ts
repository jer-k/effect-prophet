import {
  fit,
  predictUncertainty,
  type EncodedPredictionRows,
  type FittedProphet,
  type EncodedRegressorDefinition,
  type Forecast,
  type RegressorCoefficient,
  type TargetScaling,
} from "effect-prophet";

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

void operation;

void simulation;

void forecast;

void regressor;

void rows;

void coefficient;

void targetScaling;
