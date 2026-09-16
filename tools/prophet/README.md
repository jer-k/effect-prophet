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
7. rounds CPU-sensitive Fourier and component values to 12 decimal places, well inside the
   fixture's `1e-11` absolute tolerance, and writes stable JSON with non-finite values rejected.

No model fit or optimizer invocation occurs. The explicitly populated fields are
`changepoints_t`, `params.k`, `params.m`, and `params.delta`. With the default zero floor, Prophet
evaluates:

```text
trend = (k * scaled_time + m) * y_scale
k = observation_unit_slope / y_scale
m = observation_unit_intercept / y_scale
```

Keeping this conversion in the generator ensures Python Prophet remains the preprocessing and
fixed-evaluation oracle rather than silently substituting the Effect/Rust equation. Fourier
fixtures similarly use Prophet for every expected feature column; explicit matrix multiplication
produces their fixed component values. Neither fixture family invokes an optimizer, so Fourier
parity must not be described as fit parity.

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
