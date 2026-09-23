# Linear piecewise MAP optimizer

**Status:** Accepted for the Stage C Rust/WASM implementation

## Context

The target is the summed negative log posterior from unmodified Prophet 1.4.0 for additive
linear growth with absmax scaling. Changepoint adjustments have a Laplace prior and therefore
introduce exact nonsmooth points at zero. Ordinary smooth LBFGS does not provide a reliable
stationarity interpretation at those points, and adding a smooth approximation would define a
different objective.

The repository already uses a deterministic exact conditional noise update for reduced flat MAP.
The linear implementation should retain that understandable policy, avoid a native BLAS or JS
callback dependency, and execute completely inside Rust/WASM.

## Decision

Use deterministic cyclic proximal coordinate descent for coefficients, alternating with the exact
conditional observation-noise update. The method identity is `piecewise-map-coordinate-v1`.

For `z=y/v`, `v=max(abs(y))` with fallback one, scaled time `t`, hinge matrix `H`, and ordered
Fourier matrix `X`,

```text
mu = m + k*t + H*delta + X*beta
J = N*log(sigma) + ||z-mu||²/(2*sigma²)
  + (m²+k²)/(2*5²)
  + sum_j |delta_j|/tau
  + sum_l beta_l²/(2*p_l²)
  + sigma²/(2*0.5²)
sigma > 0
```

No term is divided by `N`. Optimization uses the constrained-density objective directly; there is
no log-coordinate Jacobian.

At fixed `sigma`, multiply coefficient-dependent terms by `sigma²`. For a design column `x_j`,
partial dot product `rho`, and squared norm `a`:

```text
m,k:    theta_j = rho / (a + sigma²/5²)
beta:   theta_j = rho / (a + sigma²/p_j²)
delta:  theta_j = soft_threshold(rho, sigma²/tau) / a
```

A zero-norm delta column resolves to the Laplace mode zero. Residuals are updated in place after
each coordinate. After one complete coefficient sweep, with `r=||z-mu||²`, update

```text
sigma² = 2*r / (N + sqrt(N² + 16*r))
```

This update is the positive root of the exact conditional stationarity equation. One iteration is
one complete coefficient sweep plus one noise update. Work is `O(N*(2+C+K))` per iteration and
dense memory is `O(N*(2+C+K))`; all size arithmetic is checked before allocation.

Initialization is the scaled endpoint line (`m=z_first`, `k=z_last-z_first`), zero deltas and
seasonal coefficients, and `sigma=0.5`. Defaults are 10,000 iterations, relative change tolerance
`1e-10`, and absolute change tolerance `1e-12`. Success requires a finite state whose maximum
parameter/noise change satisfies

```text
absoluteTolerance + relativeTolerance * max(1, |parameters|, sigma)
```

The result also reports the complete KKT residual. For a zero delta its residual is
`max(0, |smoothGradient|-1/tau)`; for a nonzero delta it is
`|smoothGradient+sign(delta)/tau|`. Smooth coefficients and noise report absolute derivatives.
The certificate is diagnostic rather than a claim of global optimality for joint coefficient and
noise fitting.

## Degenerate behavior

- Exact constant targets use Prophet's explicit shortcut: exact output-unit intercept, zero
  slope/deltas/features, and scaled noise `1e-9`. Termination is
  `constant-target-shortcut`, never optimizer convergence.
- A nonconstant state whose residual collapses below `1e-24*max(1,||z||²)` fails as
  `noise-collapse`. There is no hidden sigma floor.
- Exhausting the configured iteration budget fails as `non-convergence`; no partial model is
  returned.
- Non-finite arithmetic, malformed dimensions, insufficient history, and zero time range remain
  distinct typed Rust/WASM failures.
- There is no fallback to OLS, ridge, or the flat model.

## No-changepoint policy

The package uses a true zero-column changepoint design. Prophet 1.4.0 privately introduces a dummy
zero-time delta and folds its fitted value into `k` after fitting. That parameterization permits a
slope/delta prior trade-off that is not equivalent to the reduced objective even though fixed
prediction is equivalent after folding. Accordingly, no-changepoint package fits are not claimed
to have fitted-parameter or objective parity with Prophet. Explicit and automatic nonempty
candidate configurations are the primary fitted-parity target.

Resolved candidates—including endpoint candidates and zero fitted deltas—remain model prediction
state. They are never pruned by an arbitrary activity threshold.

## Alternatives rejected

- **Smooth LBFGS:** cannot represent the exact Laplace kink or its zero-delta KKT interval without
  changing the target.
- **Smoothed absolute value:** defines a different named objective and makes tolerance-dependent
  shrinkage part of model semantics.
- **Generic nonsmooth dependency:** unnecessary for this convex fixed-sigma coefficient problem,
  increases WASM size and maintenance surface, and does not improve the exact conditional noise
  update.
- **Coordinate-wise sigma floors or ridge fallback:** can report a finite model for an unbounded or
  failed MAP problem and obscure the actual failure.

No new Rust dependency is introduced. The implementation is ordinary safe Rust and is compatible
with the existing `wasm32-unknown-unknown` build.

## Boundary and observability consequences

Fitting and prediction each cross WASM once. Rust owns automatic candidate selection, scaling,
design construction, optimization, and component evaluation. Fit frames return resolved
changepoint timestamps so TypeScript persistence never reruns automatic policy. TypeScript owns
public syntax, strict frame decoding, immutable model construction, JSON persistence, typed Effect
translation, and complete coarse WASM spans.

Validation that occurs in Rust is part of the WASM boundary span. TypeScript syntax failures and
empty public prediction requests do not enter or emit a WASM span. Span attributes contain only
bounded model/growth/count metadata.
