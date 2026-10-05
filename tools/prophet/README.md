# Prophet reference tooling

This directory owns the reproducible Python environment used to generate compatibility fixtures.
The separate TypeScript/Rust-WASM integration suite consumes committed JSON without installing
Python, uv, Prophet, or Docker.

[`reference.json`](reference.json) is the machine-readable Prophet source identity. The
human-facing compatibility notes are the docs site's
[How close are the results?](../../site/python/accuracy.md) and
[What's different](../../site/python/differences.md) pages.

## Canonical environment

Fixture generation runs in the `prophet-fixtures-generate` Compose service. Its image pins:

- `python:3.12.11-slim-bookworm` by multi-platform image digest;
- the `linux/amd64` execution platform;
- uv `0.8.15` by image digest;
- all Python packages through [`uv.lock`](uv.lock), including `prophet==1.4.0`.

The manifest records the base image, platform, Python and uv versions, dependency-lock digest,
numerical package versions, generator source-bundle digest, source commit, and Prophet's bundled
model-binary digest. `generatorRevision` is SHA-256 of `generate.py`, a NUL byte, then
`linear_optimizer_evidence.py`, covering the shared executable-probe protocol as well as case
construction. Docker provides the OS/native execution envelope; `uv.lock` remains the dependency lock.

The pinned platform makes fixture provenance consistent on ARM and x86 development machines. It
may use emulation on ARM. Do not use an emulated fixture run as performance evidence; future
benchmarks must report and use their native execution platform.

## Generate and check

Start Docker, then regenerate the committed fixture directory explicitly:

```sh
npm run fixtures:generate
```

Generation is the only command that mounts
`integration/fixtures/prophet-1.4.0/` read-write. Review all resulting JSON and provenance changes.

Verify both byte-identical generation and the real TypeScript/Rust-WASM comparisons with:

```sh
npm run fixtures:check
```

Check mode mounts committed fixtures read-only, generates into a temporary container directory,
prints a unified diff for drift, and then runs the focused fixture tests in the separately pinned
Effect/Rust-WASM container. Neither runner has runtime network access. Image builds can access the
network when an uncached pinned dependency must be downloaded.

Run the integration suite directly against committed fixtures without Docker or Python:

```sh
npm run test:integration:prophet
```

The suite is intentionally excluded from ordinary `npm test`.

## What the generator evaluates

[`generate.py`](generate.py) verifies the installed distribution is exactly the version in
`reference.json`. It then:

1. constructs a Prophet model with linear growth, no changepoints, no seasonalities, and no
   uncertainty;
2. calls Prophet's own `setup_dataframe(..., initialize_scales=True)` on training observations;
3. converts observation-unit fixed parameters into Prophet's scaled representation;
4. calls `setup_dataframe` for prediction rows and `predict_trend`, which delegates to Prophet's
   `piecewise_linear` implementation;
5. calls Prophet 1.4.0's unmodified `fourier_series` for ordered weekly, fractional-day,
   epoch, pre-epoch, subdaily, irregular, and repeated timestamp cases;
6. evaluates authored fixed coefficients against those feature blocks without fitting a model;
7. evaluates explicit fixed changepoints, output-unit slope adjustments, and composed Fourier
   components for interior, endpoint, and no-changepoint cases;
8. invokes release `set_changepoints` for exact automatic row-index candidate fixtures;
9. invokes unmodified `diagnostics.generate_cutoffs` for daily, millisecond and irregular-gap cutoff/fold-count fixtures with explicit fixed-duration controls;
10. evaluates strict boolean conditional seasonalities through the release's unmodified
    `make_all_seasonality_features`, retaining ungated and gated matrices plus fixed components;
11. fits one baseline and four conditional/mixed-feature explicit-changepoint cases through the
    bundled CmdStan Newton optimizer;
12. rounds CPU-sensitive Fourier values to 12 decimal places, snaps fitted optimizer residuals
    below `1e-8` to zero, preserves positive noise scales, and rounds the remaining fitted outputs
    to 12 significant digits, well inside the fixture tolerances, then writes stable JSON with
    non-finite values rejected;
13. calls `sample_posterior_predictive(..., vectorized=False)` with five authored fixed MAP
    states (linear, flat, linear with fixed additive/multiplicative regressors, implicit-floor
    logistic with changing capacity, and explicit-changing-floor logistic with mixed fixed
    regressors and a nonzero historical rate crossing). A pinned Python seed and explicit future
    dates produce 12-significant-digit means, population variances and 10th/90th percentiles.
    The first four cases use 2048 draws; the higher-variance explicit-floor case uses 8192.
    That case pools four predetermined independent 2048-draw generated-WASM requests for
    test-only distribution comparison without exceeding the per-request sample limit.
    Different RNGs prevent individual draw equality; the historical proximal zero-rate
    extension and fixed Stan public-state singular failures are tested separately.

The fixed-parameter fixture families explicitly populate `changepoints_t`, `params.k`, `params.m`,
and `params.delta` without fitting. With the default zero floor, Prophet evaluates:

```text
trend = (k * scaled_time + m) * y_scale
k = observation_unit_slope / y_scale
m = observation_unit_intercept / y_scale
```

For explicit changepoints, the same conversion applies independently to every output-unit delta,
and the release evaluates the equivalent hinge form. Keeping this conversion in the
generator ensures Python Prophet remains the preprocessing and fixed-evaluation oracle rather
than silently substituting the Effect/Rust equation. Fourier fixtures similarly use Prophet for
every expected feature column; explicit matrix multiplication produces their fixed component
values. Seasonality-resolution fixtures invoke the release's `set_auto_seasonalities` policy with
explicit controls and training timestamps, recording enabled built-ins separately from the
package-option mapping. Automatic changepoint fixtures record logical selected dates and omit the
release's private dummy fitting column. These fixed and policy fixture families do not invoke an
optimizer, so their parity must not be described as fitted MAP parity.

`linear-map-fit.json` and `conditional-map-fit.json` are separately labeled fitted evidence. The
conditional cases cover mixed conditional/unconditional components, a shared condition, an
all-false regularized training block, and a condition/event/regressor combination. They use an
explicit changepoint, `changepoint_prior_scale=0.2`, and the Newton algorithm, then record the
complete design order, output-unit coefficients/noise, grouped components, and predictions. Their
looser quantity-specific tolerances reflect cross-optimizer agreement rather than bitwise
algorithm identity. Fitted values below `1e-8` are canonicalized to zero, except positive noise
scales, and all values are limited to 12 significant digits so host CPU math implementation
differences cannot cause irrelevant last-bit fixture drift. `logistic-map.json` adds fixed
changing-capacity trends for explicit-floor/minmax and implicit-floor/absmax cases, plus a fitted
explicit-floor, one-changepoint Newton case. Its fitted
parameters, noise, and forecasts use the same zero threshold, 12-significant-digit
canonicalization, and cross-optimizer tolerance policy. Ridge remains a distinct objective and
makes no fitted-Prophet parity claim.

`stan-logistic-objective.json` freezes 31 density/gradient probes across eight cases: empty changepoints
with default/loose priors (including the frozen 96-row benchmark in both scalings), explicit changing floors, conditional additive seasonality with an event
and multiplicative regressor, repeated final dates, and clipped initialization endpoints. Its
score and complete unconstrained gradients come from the bundled executable's `log_prob` command
with `jacobian=False` and `sig_figs=12`. Curvature uses the actual Stan Newton symmetric stencil,
including its scaling and perturbations crossing the Laplace kink. These are not the proximal
optimizer's diagonal curvature approximations. Features are rounded to 12 decimal places **before**
oracle evaluation so Rust consumes exactly the same matrix.

Four empty-point cases also record unmodified Newton fits before public folding and Python's
actual public forecasts afterward. Their tiny fitted values are preserved (no zero snapping),
while all optimizer outputs remain limited to 12 significant digits. The small default-prior
case records its 38-step Newton trajectory (`save_iterations=True` affects output only).
Three low-noise states add executable gradients and one-step optimizations; curvature remains
asserted on the 28 ordinary probes, where 12-digit gradient output resolves the unchanged `2e-12`
absolute gate. Low-noise gradient-output rounding cannot resolve that curvature gate.

Correctness tests run the actual Rust evaluator, initializer, Newton stencil and predictor on
native Rust and WASM. Same-state one-step coordinates match within `1e-10`. Independently fitted
small-default-prior stationarity still differs by about `0.027`; under the output-first policy the
fit-endpoint test prints this gap for investigation and asserts the public fold and forecasts. The
three loose-prior fitted cases agree on score, noise, forecast and stationarity. Public TypeScript/WASM fitting now selects the
shared Stan policy by default, and the three loose-prior cases also pass public fitting,
prediction, persistence and uncertainty replay. Historical proximal controls remain explicit.
Under the output-first policy, all 28 public benchmark cases pass; `defaults-256` carries
objective and stationarity investigation flags. See the
[logistic benchmark cases](../../benchmark/cases/growth/logistic/README.md); full optimizer
or blanket public parity is not claimed.

`logistic-prediction-state.json` freezes 18 authored public states through unmodified
`setup_dataframe` and `predict_trend`, without fitting: zero base rates, zero post-change rates,
zero rates at the offset/origin/endpoint, later rate recovery, and nonzero sign crossings in
both scalings. Empty logical points use Python's actual public zero-time, zero-delta dummy.
Expected nonfinite rows are tagged rather than written as invalid JSON or replaced with a
continuous extension. Native/WASM tests check each row and shared simulation baselines;
public fixture tests also check batch failure indexes, persistence and historical proximal
restoration. Python's nonfinite results translate to typed library failures, not successful
NaN forecasts. The existing numerical-objective artifact remains byte-identical.

`stan-logistic-lbfgs.json` consumes the unchanged `logistic-weekly-256.json` benchmark input
for `logistic-reconcile-defaults-256`. It records an unmodified growth-only public fit and,
separately, a controlled Stan L-BFGS fit with Fourier inputs rounded to 12 decimal places
and initialization fixed to the serialized 12-significant-digit state. The controlled
problem retains the default 10,000-iteration budget and stopping rules. Its full accepted
trajectory and 13 same-state density/gradient probes support divergence diagnosis through
the existing solver; public-fit parameters are also probed on the rounded feature matrix.
All fitted outputs use the shared 12-significant-digit canonicalizer without snapping
small nonzero deltas. Do not treat the controlled endpoint as the unmodified public fit or
as a benchmark baseline. The full objective regression is intentionally red until the
unchanged `0.01` gate is met; initialization, early steps and sampled gradients are narrower
checks, not a waiver.

Six additional authored private operation cases in this artifact distinguish additive GLM packet
adjoints from scalar variable-adjoint products, scalar inverse-logit value-view evaluation,
column-major changepoint forward cancellation/blocking, and scalar changepoint adjoint cancellation.
They use the same unmodified executable, `jacobian=False`, `sig_figs=12`, and existing absolute
`1e-7` density/gradient gates. Large authored observations amplify operation differences without
increasing fitted-output precision; these cases do not claim public preprocessing or full optimizer
parity. The old packet exponential is now only a test counterexample, not fitting arithmetic.

## Shared comparison substrate

[`compose.yaml`](../../compose.yaml) keeps the Python and Effect/Rust-WASM environments separate
while mounting the same reviewed inputs. Fixture artifacts are written by only the Python service
and read by the Effect service. Future benchmark services can follow the same pattern under the
top-level `benchmark/` directory: shared read-only cases/data, implementation-specific writable
result directories, and a comparison/report step. Timed runs must execute sequentially and must
exclude bind-mount I/O and container startup unless those phases are explicitly part of a workload.

## Verify the source reference

In an independent Prophet clone or the read-only `@prophet` reference checkout, resolve the tag
without checking it out or reading files from the current working tree:

```sh
git rev-parse 'refs/tags/v1.4.0^{commit}'
```

The command must print:

```text
abf69a215604afcaa7ecb4359f592d13bf6dea9f
```

Inspect baseline files explicitly at the tag, for example:

```sh
git show 'v1.4.0:python/prophet/forecaster.py'
git show 'v1.4.0:python/stan/prophet.stan'
```

Do not mount or execute the local reference checkout. Its configured `HEAD` currently includes
post-release patches and is outside this baseline.
