# Logistic piecewise MAP numerical policy

**Status:** Historical Stage F proximal policy, superseded as the public default by shared Stan fitting.

The historical decision below is retained for explicit proximal selection and old saved models.
Public defaults now select the shared Newton/L-BFGS policy, retain Python's private no-point fit,
score before folding, and perform the actual public `k += delta[0]` fold with `m` unchanged.
Built-in seasonalities default to automatic. Explicit legacy tolerance overrides still identify
historical proximal requests; omission or a budget-only override does not.

The release direction targets unmodified Python Prophet 1.4.0 defaults. Improved edge behavior
requires an explicit opt-in, not a default-parity exemption. See the [current model contract](../modeling/logistic-map.md)
and [reconciliation evidence](../validation/logistic-reconciliation.md). Public comparisons use
the output-first policy below, as do fit-endpoint numerical tests. Fixed singular public states now have bounded oracle
coverage; Stan prediction uses public gamma arithmetic while proximal retains this extension.

## Context

The compatibility target is unmodified Python Prophet 1.4.0 at commit `abf69a2`. Prophet fits
logistic growth with a nonlinear Stan objective, row capacities, optional row floors, and the same
additive/multiplicative feature matrix used by linear growth. Its gamma-offset implementation
preserves continuity but divides by the next segment rate when that rate is zero.

The package executes numerical work in ordinary Rust behind coarse WASM calls. It matches
Prophet's preprocessing, objective, priors, initialization, and public prediction composition; it
does not embed CmdStan or claim optimizer identity.

## Decision

Use the equivalent continuous logit form

```text
eta(t) = k*(t-m) + sum_j(delta_j*max(0,t-c_j))
g_scaled = C_scaled*sigmoid(eta)
mu = g_scaled*(1+X_m*beta) + X_a*beta
```

Away from a zero segment rate this is algebraically identical to Prophet's gamma-offset exponent.
At zero or crossing rates it is the continuous extension of that exponent, while Prophet's direct
gamma calculation is singular. This difference is classified as a numerical extension rather
than release parity.

The implementation preserves Prophet's priors on dimensionless rate `k`, normalized time-offset
`m`, rate changes `delta`, feature coefficients, and positive observation noise:

```text
J = N*log(sigma) + ||z-mu||²/(2*sigma²)
  + (k²+m²)/(2*5²)
  + sum(abs(delta_j))/changepointPriorScale
  + sum(beta_l²/(2*priorScale_l²))
  + sigma²/(2*0.5²)
```

No Jacobian, averaging, coefficient clipping, forecast clipping, or hidden noise floor is added.

## Scaling and row policy

Capacity is required on every logistic training and prediction row. Training rows either all
supply floor or all omit it. Explicit-floor models require every prediction floor; implicit-floor
models reject supplied floors and reuse the persisted floor.

For explicit floors:

- absmax scale is `max(abs(y-floor))`;
- minmax scale is `max(capacity)-min(floor)`.

Without explicit floors, absmax uses floor zero and `max(abs(y))`; minmax uses floor `min(y)` and
`max(y)-min(y)`. Exactly zero scale becomes one. Every finite capacity must exceed its effective
floor. Observations outside the bounds remain valid noisy observations and are never clipped.

## Optimization

Initialization follows Prophet's endpoint-ratio policy: endpoint target ratios are limited to
1–99% of capacity for initialization only, nearly equal inverse ratios perturb the first ratio by
5%, and the resulting logits determine `k` and `m`. Deltas and feature coefficients start at zero;
scaled noise starts at one.

One deterministic iteration performs:

1. exact Gaussian-prior coordinate updates for feature coefficients at fixed logistic trend;
2. a diagonally Gauss-Newton-preconditioned, monotone proximal-gradient update of `k`, `m`, and
   `delta`, with exact soft-thresholding of the Laplace coordinates and at most 40 half-step
   backtracks;
3. the exact conditional positive-noise update used by the other MAP kernels.

Success uses the configured absolute-plus-relative parameter or objective-change tolerance and
reports the complete smooth-gradient/Laplace-KKT/noise residual. Logistic fits default to 10,000
iterations, `1e-7` relative tolerance, and `1e-9` absolute tolerance; explicitly supplied optimizer
controls remain authoritative. The method identity is
`logistic-piecewise-map-proximal-v1`. There is no OLS, flat, smoothed-penalty, or alternate-objective
fallback. Nonfinite state, noise collapse, and budget exhaustion are typed failures. No global
optimum is claimed for this nonconvex objective.

The package uses a genuine empty changepoint design. Prophet's private zero-time dummy delta and
post-fit `k` folding are not retained because that fold does not preserve logistic predictions for
general `m`. This is a current mismatch to reconcile, including the release's actual public post-fit folding
behavior; it is not a permanent default-parity exclusion.

Prophet's constant-target shortcut applies only to linear and flat growth. Logistic histories are
optimized normally and can return noise-collapse when no reliable finite interior optimum exists.

## Benchmark acceptance: output-first

Jeremy chose an output-first acceptance policy for the logistic Python comparisons on 2026-10-03.

**Gates (a mismatch fails the case):** trend, named components, additive totals and final forecasts;
output-unit noise; feature metadata, changepoints, scaling and floor policy; public JSON and
fresh-process persistence; applicable uncertainty replay. Both implementations must also report
exactly one finite fitting objective, nonnegative stationarity residual and positive normalized
noise per run. Missing or malformed evidence still fails.

**Reported, not gated:** the independently fitted objective, normalized noise and stationarity
residual. A difference beyond `0.01` (objective), `0.0002` (normalized noise), or Effect's residual
exceeding Python's by more than `0.01` (stationarity) is listed under "Output-first investigation
flags" in the benchmark report. Each flag must be explained in the
[reconciliation evidence](../validation/logistic-reconciliation.md), but it does not block the case
or its timings.

**Why:** these three numbers describe where each optimizer stopped, not what users receive. On a
nonsmooth objective, two correct optimizers, or the same Python release on different CPUs, can
stop at slightly different points with matching forecasts. Treating those as failures had the
investigation chasing differences users cannot observe. Forecast gates still catch internal-state
bugs that change outputs, such as the private no-point delta, which moved forecasts by up to 41
units before it was fixed.

**Difference from linear:** linear's [accepted policy](linear-map-benchmark-acceptance.md) still
gates the objective (`0.01`) and normalized noise (`0.0002`), with stationarity diagnostic-only
under EP-097. Logistic gates neither. Archived equality-gate declarations and results are not
requalified.

The same split applies to frozen-fixture tests. Tests that feed Python's frozen internal values into
our code (same-state density/gradient, operation probes, fixed-state prediction, initialization and
early trajectory) remain exact assertions. Tests that run a full optimization and compare its
endpoint assert public outputs and print internal gaps for investigation.

## Runtime and persistence

The portable `logistic-piecewise-map` state stores target scale/floor policy, dimensionless
`rate`, normalized time `offset`, dimensionless deltas, training time scaling, resolved
changepoints, complete mixed feature metadata and coefficients, output-unit noise, and finite fit
diagnostics. Capacity and explicit floor curves remain prediction-row inputs.

Public prediction restores

```text
trend = floor + (capacity-floor)*sigmoid(eta)
value = trend*(1+multiplicative) + additive
```

The trend is bounded for each valid row; the final forecast is not necessarily bounded after
components. Fitting and prediction each use one checked WASM call and retain the existing coarse
Effect spans without attaching row values, bounds, parameters, or runtime causes.
