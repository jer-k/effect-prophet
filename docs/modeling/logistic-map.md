# Logistic piecewise MAP model

The logistic model follows the accepted [numerical decision](../decisions/logistic-map.md) and
Python Prophet 1.4.0's floor-aware preprocessing, objective, initialization, and mixed-component
prediction composition.

## Rows and scaling

Training and prediction rows require finite `capacity`. A training set either supplies finite
`floor` on every row or omits it on every row. Every capacity must exceed the effective floor;
targets are permitted outside those bounds.

The fitted state stores

```ts
type LogisticTargetScaling = {
  readonly mode: "absmax" | "minmax";
  readonly scale: number;
  readonly floorPolicy:
    { readonly kind: "implicit"; readonly floor: number } | { readonly kind: "explicit" };
};
```

Scaling is derived from training only. Prediction capacities and floors never alter it.

## Trend and objective

For normalized training time `t`, normalized changepoints `c`, row-scaled capacity
`C=(capacity-floor)/scale`, and `z=(y-floor)/scale`:

```text
eta = rate*(t-offset) + sum(delta_j*max(0,t-c_j))
g = C*sigmoid(eta)
mu = g*(1+X_m*beta) + X_a*beta
```

The stable sigmoid evaluates positive and negative branches separately. Hinge accumulation uses
compensated summation. Finite exponents may saturate to zero or one; nonfinite derived arithmetic
is a typed numerical failure.

The summed negative log posterior and priors are documented in the decision. Additive fitted
coefficients and noise are restored to output units; multiplicative coefficients, rate, offset,
and deltas remain dimensionless.

## Prediction

For each complete future row:

```text
trend = floor + (capacity-floor)*sigmoid(eta)
additive = X_a*beta_additive
multiplicative = X_m*beta_multiplicative
value = trend*(1+multiplicative)+additive
```

Named additive components use output units. Named multiplicative components expose a dimensionless
factor and the row-dependent output-unit contribution `trend*factor`. Equal timestamps with
different capacities, floors, conditions, or regressors remain distinct rows.

## Rust/WASM ownership

`rust/prophet-wasm/src/logistic_map.rs` owns floor-aware scaling, stable evaluation, initialization,
optimization, prediction, and numerical failures. `wasm_logistic_map.rs` owns numeric framing and
validation. TypeScript owns public schemas, complete-row policy, strict frame decoding, trusted
model construction, persistence, Effect failure translation, and coarse tracing.

The fit frame prefix is

```text
[status, scalingMode, targetScale, floorPolicy, implicitFloor,
 rate, offset, timeOrigin, timeScale, noiseScale, changepointCount,
 observationCount, iterations, objective, stationarityResidual, termination,
 ...changepoints, ...deltas, ...coefficients]
```

Floor policy code zero means implicit and carries a finite floor; code one means explicit and
requires the canonical unused implicit-floor slot zero. Prediction successes use rows
`[trend, additive, multiplicative, value, ...namedEffects]`.

## Compatibility scope

Nonsingular fixed trends, scaling, initialization, objective terms, mixed composition, and fitted
forecasts target Prophet 1.4.0 behavior. Exact zero/crossing segment rates use the package's
continuous logit extension. Empty-changepoint fitting uses a true empty objective rather than
Prophet's private dummy parameter. Optimizer trajectories and bitwise fitted parameters are not
compatibility claims.
