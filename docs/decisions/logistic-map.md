# Logistic piecewise MAP numerical policy

**Status:** Accepted for the combined Stage F logistic implementation

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
general `m`. Empty-point fitted objective/parameter parity is therefore excluded.

Prophet's constant-target shortcut applies only to linear and flat growth. Logistic histories are
optimized normally and can return noise-collapse when no reliable finite interior optimum exists.

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
