# Prophet reference tooling

This directory owns the reproducible Python environment used to generate compatibility fixtures.
The separate TypeScript/Rust-WASM integration suite consumes committed JSON without installing
Python, uv, Prophet, or Docker.

[`reference.json`](reference.json) is the machine-readable Prophet source identity. The
human-facing capability contract is
[`docs/compatibility/prophet-1.4.0.md`](../../docs/compatibility/prophet-1.4.0.md).

## Canonical environment

Fixture generation runs in the `prophet-fixtures-generate` Compose service. Its image pins:

- `python:3.12.11-slim-bookworm` by multi-platform image digest;
- the `linux/amd64` execution platform;
- uv `0.8.15` by image digest;
- all Python packages through [`uv.lock`](uv.lock), including `prophet==1.4.0`.

The manifest records the base image, platform, Python and uv versions, dependency-lock digest,
numerical package versions, generator digest, source commit, and Prophet's bundled model-binary
digest. Docker provides the OS/native execution envelope; `uv.lock` remains the dependency lock.

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
9. evaluates strict boolean conditional seasonalities through the release's unmodified
   `make_all_seasonality_features`, retaining ungated and gated matrices plus fixed components;
10. fits one baseline and four conditional/mixed-feature explicit-changepoint cases through the
    bundled CmdStan Newton optimizer;
11. rounds CPU-sensitive Fourier values to 12 decimal places and fitted optimizer outputs to 12
    significant digits, well inside the fixture tolerances, then writes stable JSON with non-finite
    values rejected.

The fixed-parameter fixture families explicitly populate `changepoints_t`, `params.k`, `params.m`,
and `params.delta` without fitting. With the default zero floor, Prophet evaluates:

```text
trend = (k * scaled_time + m) * y_scale
k = observation_unit_slope / y_scale
m = observation_unit_intercept / y_scale
```

For explicit changepoints, the same conversion applies independently to every output-unit delta,
and the release evaluates the equivalent hinge form documented in
[`piecewise-map.md`](../../docs/modeling/piecewise-map.md). Keeping this conversion in the
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
algorithm identity. Fitted values are canonicalized to 12 significant digits so host CPU math
implementation differences cannot cause irrelevant last-bit fixture drift. Ridge remains a distinct
objective and makes no fitted-Prophet parity claim.

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
