import { Effect } from "effect";

import { emptyEventCalendar } from "../../src/event";
import { parsePiecewiseMapModel, type PiecewiseMapParameters } from "../../src/fitted-model";
import { parseSeasonalityLayout } from "../../src/seasonality";

/** Authored no-changepoint MAP state for boundary and fixed-equation tests, not a fitted optimizer oracle. */
export const fixedPiecewiseParameters: PiecewiseMapParameters = {
  model: "linear-piecewise-map",
  targetScaling: { mode: "absmax", offset: 0, scale: 1 },
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
  changepointTimestamps: [],
  deltas: [],
  seasonalities: Effect.runSync(parseSeasonalityLayout({ components: [], coefficientCount: 0 })),
  coefficients: [],
  events: emptyEventCalendar,
  eventCoefficients: [],
  regressors: [],
  noiseScale: 0.1,
  fitSummary: {
    method: "piecewise-map-stan-v2",
    termination: "objective-change",
    optimization: {
      algorithm: "newton",
      attemptCount: 1,
      failedAttemptIterations: null,
      hessianResets: 0,
    },
    valueScale: 1,
    observationCount: 3,
    iterations: 1,
    objective: 0,
    stationarityResidual: 0,
    changepointPriorScale: 0.05,
  },
};

/** Parsed fixed MAP prediction state shared by public lifecycle tests. */
export const fixedPiecewiseModel = Effect.runSync(parsePiecewiseMapModel(fixedPiecewiseParameters));
