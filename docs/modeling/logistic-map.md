# Logistic piecewise MAP model

The release target is unmodified Python Prophet 1.4.0 behavior by default. Public fitting now
uses the shared Stan-style Newton/L-BFGS policy; it is the only logistic fitting policy. This is
not a full parity declaration: see the [current reconciliation evidence](../validation/logistic-reconciliation.md)
for the output-first comparison results and the bounded fixed-state prediction evidence.

## Rows and scaling

Training and prediction rows require finite `capacity`. A training set either supplies finite
`floor` on every row or omits it on every row. Every capacity must exceed the effective floor;
targets are permitted outside those bounds. Scaling is derived from training only and persisted
as mode (`absmax` or `minmax`), positive scale, and implicit fixed floor or explicit row-floor
policy. Prediction capacities and floors never alter it.

## Defaults and controls

Omitted built-in seasonality controls are `"auto"`, for every growth family. Python's history/span
and minimum-positive-gap rules decide whether yearly (order 10), weekly (3), and daily (4) are
included. Duplicate timestamps do not count as zero sampling gaps. Use `"off"` explicitly for
custom-only or no-seasonality fitting. This shared seasonality change does not migrate ordinary
resolved-featureless linear OLS fitting; that separate linear-default difference remains open.

Logistic uses the same algorithm-specific controls as linear Stan MAP:

```ts
{ growth: "logistic", map: { optimizer: { algorithm: "newton", maxIterations: 10000 } } }
{ growth: "logistic", map: { optimizer: { algorithm: "lbfgs", fallback: "none", lbfgs: { historySize: 5 } } } }
```

Omission selects Newton below 100 retained rows and L-BFGS otherwise, with ordinary Newton
fallback and 10,000 iterations **per attempt**. Duplicates count. Fallback restarts from the
original initialization; it does not continue the failed L-BFGS state. Inapplicable controls
are rejected before WASM. Budget exhaustion returns a finite fit with `"iteration-limit"`,
not a convergence claim. Method `logistic-piecewise-map-stan-v2` records the actual algorithm,
termination, attempts, failed-attempt iterations when known, and Hessian-reset count.

The earlier proximal policy has been removed, as linear's coordinate policy was. Its
`algorithm: "proximal"`, `relativeTolerance` and `absoluteTolerance` controls fail option
parsing, and saved `logistic-piecewise-map-proximal-v1` models fail decoding; there is no
migration shim.

## Objective and private state

For scaled capacity `C=(capacity-floor)/scale` and target `z=(y-floor)/scale`, fitting uses
`mu = logisticTrend*(1+X_m*beta) + X_a*beta` and Prophet's Gaussian/Laplace priors, without a
noise Jacobian, averaging, clipping, or hidden noise floor. The Stan path evaluates literal
segment-rate/gamma recurrence and derivatives, rejecting its nonfinite/singular trials; it
reuses the existing Newton curvature, L-BFGS, fallback, and stopping machinery.

Python's private dummy delta and beta are retained during no-point/no-feature fitting. Fit
score, normalized noise, and stationarity describe that **private executable state**. For an
empty public changepoint set, public rate becomes `k + delta[0]`, with `m` unchanged. Private
dummy coordinates are omitted from public deltas/coefficients and serialized state. This is
Python's actual fold, even though it changes general logistic forecasts. Do not rescore the
folded public state and present it as the private optimizer evidence.

## Prediction and lifecycle

Prediction evaluates Python's public gamma-offset recurrence. Empty logical changepoints
retain its zero-time, zero-delta prediction dummy. A zero post-change rate can produce nonfinite
gamma/forecast values; these become `PredictionError` with reason `"non-finite-forecast"`, not
successful NaN output or a silently substituted continuous curve. Rows before the singular
changepoint remain evaluable, and the complete batch fails at its first affected input row.

```text
trend = floor + (capacity-floor)*sigmoid(eta)
additive = X_a*beta_additive
multiplicative = X_m*beta_multiplicative
value = trend*(1+multiplicative)+additive
```

`eta` follows the gamma-offset recurrence above. The generated `logistic-prediction-state.json`
checks zero base/segment rates, later recovery, endpoint changes and nonzero sign crossings in
both scalings. This does not claim bitwise parity or cover every extreme floating-point state.

Named additive components use output units. Multiplicative components expose a dimensionless
factor and output-unit contribution `trend*factor`. Prediction order and duplicate instances
with different capacities, floors, conditions, or regressors are preserved. Persistence stores
complete public prediction state and honest completion evidence, not a refitting instruction.
Uncertainty uses the same fixed trend and failure semantics before sampling;
its existing scalar future-event process is unchanged, not Python-default uncertainty parity.
CV consumes the same public state and filters explicit changepoints strictly before each
fold's final training timestamp and preserves the selected optimizer controls.

## Rust/WASM ownership and tracing

`rust/prophet-wasm/src/logistic_map.rs` owns preprocessing, the shared evaluator and prediction;
`logistic_objective.rs` owns private Stan state, diagnostics, and folding. The shared `stan/`
modules own optimizer selection, execution, and fallback. `wasm/logistic_map.rs` owns checked
numeric framing. TypeScript owns option/model parsing, complete-row policy, persistence,
Effect failure translation, and coarse tracing. No tracer/exporter service is required.

The fit frame prefix is

```text
[status, scalingMode, targetScale, floorPolicy, implicitFloor,
 rate, offset, timeOrigin, timeScale, noiseScale, changepointCount,
 observationCount, iterations, objective, stationarityResidual, termination,
 algorithm, attemptCount, failedAttemptIterations, hessianResets,
 ...changepoints, ...deltas, ...coefficients]
```

Controls use the shared version-two Stan frame; any other version is rejected. The decoder
requires Stan completion evidence, rejects malformed evidence, and translates failed attempts
without losing either cause. Existing `effect-prophet.wasm.fit`
and `.predict` spans cover setup, invocation, result decoding/copying, and failure translation.
Optimizer attributes contain bounded choices/counts only, never numerical state or payloads.
