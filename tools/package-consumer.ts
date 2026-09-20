import {
  fit,
  type EncodedPredictionRows,
  type EncodedRegressorDefinition,
  type Forecast,
  type RegressorCoefficient,
} from "effect-prophet";

const operation = fit([{ timestamp: "2024-01-01T00:00:00.000Z", value: 1 }]);

const forecast: Forecast | undefined = undefined;

const regressor: EncodedRegressorDefinition = { name: "price", standardization: "auto" };

const rows: EncodedPredictionRows = [
  { timestamp: "2025-01-01T00:00:00.000Z", regressors: { price: 2 } },
];

const coefficient: RegressorCoefficient | undefined = undefined;

void operation;

void forecast;

void regressor;

void rows;

void coefficient;
