import { Match, Schema } from "effect";

import { coefficientModeCodes } from "./component-mode";
import type { FittedProphet } from "./fitted-model";
import { PositiveFinite } from "./internal/numeric-schemas";
import { freezeOwned } from "./internal/owned-input";

/**
 * Starting values for Prophet's Stan optimizer, like the `init` Python's `fit` accepts.
 *
 * Values are in Stan's units: the target divided by its scale and time running from 0 to 1
 * over the history. A fit reads them in its own units, as Python does, so they suit a
 * history with a similar scale and span.
 */
export interface WarmStartParameters {
  /** Base trend rate. */
  readonly k: number;

  /** Trend offset. */
  readonly m: number;

  /** Observation noise scale. It must be positive. */
  readonly sigmaObs: number;

  /** Rate changes, one per changepoint, or a single zero when there are none. */
  readonly delta: ReadonlyArray<number>;

  /** Seasonality, event and regressor coefficients in column order, or a single zero. */
  readonly beta: ReadonlyArray<number>;
}

/** Runtime schema for warm-start parameters supplied in fitting options. */
export const WarmStartParametersSchema = Schema.Struct({
  k: Schema.Finite,
  m: Schema.Finite,
  sigmaObs: PositiveFinite,
  delta: Schema.Array(Schema.Finite),
  beta: Schema.Array(Schema.Finite),
});

// Stan keeps one zero-time changepoint, and one all-zero feature column, when a model has none.
const orPrivateZero = (values: ReadonlyArray<number>): ReadonlyArray<number> =>
  values.length === 0 ? [0] : values;

const stanBeta = (model: FittedProphet, scale: number): ReadonlyArray<number> => {
  const modes = coefficientModeCodes(model.seasonalities, {
    layout: {
      components: [
        ...model.events.layout.components,
        ...model.regressors.map((regressor) => ({
          mode: regressor.definition.mode,
          coefficientCount: 1,
        })),
      ],
      coefficientCount: model.events.layout.coefficientCount + model.regressors.length,
    },
  });

  const coefficients = [
    ...model.coefficients,
    ...model.eventCoefficients,
    ...model.regressors.map((regressor) => regressor.coefficient),
  ];

  // Multiplicative coefficients are already dimensionless; additive ones carry the target scale.
  return orPrivateZero(
    coefficients.map((coefficient, index) =>
      modes[index] === 0 ? coefficient / scale : coefficient,
    ),
  );
};

/**
 * Read a fitted model's parameters for warm-starting another fit, like Python's
 * `warm_start_params`.
 *
 * Pass the result as `map.warmStart`. As in Python, the new fit always starts `k`, `m` and
 * `sigmaObs` here, and starts `delta` and `beta` here only when their lengths match its own
 * changepoints and feature columns; otherwise each uses Prophet's default.
 *
 * Flat models do not keep Stan's prior-only rate state, so their `k` is zero and `delta` is
 * empty. Python's values for these are near zero.
 *
 * @param model - A fitted model returned by `fit` or model decoding.
 * @returns The model's Stan parameters.
 */
export const warmStartParameters = (model: FittedProphet): WarmStartParameters => {
  const scale = model.targetScaling.scale;
  const beta = stanBeta(model, scale);
  const sigmaObs = model.noiseScale / scale;

  const parameters: WarmStartParameters = Match.value(model).pipe(
    Match.discriminatorsExhaustive("model")({
      "flat-map": (flat) => ({ k: 0, m: flat.level / scale, sigmaObs, delta: [], beta }),
      "linear-piecewise-map": (linear) => ({
        k: linear.slope / scale,
        m: linear.intercept / scale,
        sigmaObs,
        delta: orPrivateZero(linear.deltas.map((delta) => delta / scale)),
        beta,
      }),
      "logistic-piecewise-map": (logistic) => ({
        k: logistic.rate,
        m: logistic.offset,
        sigmaObs,
        delta: orPrivateZero(logistic.deltas),
        beta,
      }),
    }),
  );

  return freezeOwned(parameters);
};
