import {
  crossValidate,
  inspectCountryHolidays,
  parseCountryHolidays,
  type CountryHolidayInspection,
  type CountryHolidayModel,
  type EncodedCountryHolidays,
  fit,
  planRollingOrigin,
  predictUncertainty,
  searchModels,
  type EncodedPredictionRows,
  type FittedProphet,
  type EncodedRegressorDefinition,
  type CrossValidationResult,
  type CrossValidationInput,
  type CrossValidationPointInput,
  type CrossValidationIntervalInput,
  type Forecast,
  type PointCrossValidationResult,
  type ModelSearchResult,
  type RollingOriginPlanSummary,
  type RegressorCoefficient,
  type TargetScaling,
} from "effect-prophet";

const countrySelection: EncodedCountryHolidays = { country: "UK" };

const countryInspection = inspectCountryHolidays(countrySelection, [2024, 2060]);

const countryParsing = parseCountryHolidays(countrySelection);

const calendar: CountryHolidayInspection | undefined = undefined;

void countryInspection;

void countryParsing;

void calendar;

const planOperation = planRollingOrigin(
  [{ timestamp: "2024-01-01T00:00:00.000Z", value: 1 }],
  {},
  { horizonMs: 1, cutoffs: { mode: "explicit", timestamps: ["2024-01-01T00:00:00.001Z"] } },
);

const plan: RollingOriginPlanSummary | undefined = undefined;

const pointControls: CrossValidationPointInput = { scaling: "minmax" };

const intervalControls: CrossValidationIntervalInput = {
  mode: "intervals",
  scaling: "minmax",
  uncertainty: { seed: 1, samples: 8 },
};

const controls: CrossValidationInput = pointControls;

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
  controls,
);

const pointResult: PointCrossValidationResult | undefined = undefined;

const searchOperation = searchModels(
  [
    { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
    { timestamp: "2024-01-02T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-03T00:00:00.000Z", value: 3 },
  ],
  {
    candidates: [{ id: "baseline", options: {} }],
    plan: {
      horizonMs: 86_400_000,
      cutoffs: { mode: "explicit", timestamps: ["2024-01-02T00:00:00.000Z"] },
    },
    objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
    failurePolicy: "record",
  },
);

const searchResult: ModelSearchResult | undefined = undefined;

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
  intervalControls,
);

const intervalValue = (result: CrossValidationResult): number | undefined =>
  result.kind === "intervals" ? result.rows[0]?.lower : undefined;

const operation = fit([{ timestamp: "2024-01-01T00:00:00.000Z", value: 1 }], {
  growth: "flat",
  scaling: "minmax",
  countryHolidays: { country: "US", coverage: "allow-known-gaps", priorScale: 7 },
});

const forecast: Forecast | undefined = undefined;

const regressor: EncodedRegressorDefinition = { name: "price", standardization: "auto" };

const rows: EncodedPredictionRows = [
  { timestamp: "2025-01-01T00:00:00.000Z", regressors: { price: 2 } },
];

const coefficient: RegressorCoefficient | undefined = undefined;

const targetScaling: TargetScaling = { mode: "minmax", offset: 1, scale: 1 };

declare const fittedModel: FittedProphet;

const retainedCalendar: CountryHolidayModel | undefined = fittedModel.countryHolidays;

void retainedCalendar;

const simulation = predictUncertainty(fittedModel, rows, { seed: 42 });

void planOperation;

void crossValidationOperation;

void searchOperation;

void searchResult;

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
