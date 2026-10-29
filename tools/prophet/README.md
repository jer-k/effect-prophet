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
model-binary digest. `generatorRevision` is SHA-256 of `generate.py`,
`linear_optimizer_evidence.py`, `country_holiday_fixtures.py`,
`global_prior_scale_fixtures.py`, `custom_metrics.py` and the
benchmark's Python adapter (`benchmark/tools/adapters/python-prophet.py`), joined by NUL bytes.
That covers case construction, the shared executable-probe protocol, the custom metrics the
benchmark also registers, and the adapter the differential comparison reuses. Editing
any of them changes the manifest, so run `npm run fixtures:generate` and commit the result even
when no fixture values change. Docker provides the OS/native execution envelope; `uv.lock` remains
the dependency lock.

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

## Production country-calendar generation (#69)

The first data-delivery slice is implemented separately from the exploratory experiment:

```sh
npm run calendars:generate
npm run calendars:check
npm run calendars:verify
```

See [CALENDARS.md](CALENDARS.md) for the versioned artifact format, generation-year parity checks,
reviewed historical/future coverage inventory, notices, provenance, and provider update process.
Artifacts live in `calendars/` and `third-party/calendars/`, with a derived TypeScript allowlist.
Public `parseCountryHolidays`/`inspectCountryHolidays` support offline inspection, coverage policy
and typed lookup failures. The npm artifact includes these files and notices. `countryHolidays`
fit options integrate with all trends, prediction, uncertainty, embedded JSON persistence and
fold/search/holdout evaluation. Country compatibility fixtures use real `add_country_holidays`
and the pinned provider. Native correctness-gated benchmark release evidence remains pending.

## Country-calendar size experiment (#69)

[`measure_holidays.py`](measure_holidays.py) generates an exploratory **1995–2044 inclusive**
country-level snapshot through the installed Prophet `make_holidays_df` helper. It does not
modify compatibility fixtures or add calendars to the published package. Generated files belong
in the ignored `.generated/` directory.

Run with the same pinned reference image (the output directory must be empty):

```sh
docker compose --profile fixtures-generate build prophet-fixtures-generate
mkdir -p .generated/holidays-1995-2044

docker run --rm --platform linux/amd64 --network none --read-only --tmpfs /tmp \
  -e PYTHONHASHSEED=0 \
  -v "$PWD/tools/prophet:/workspace/tools/prophet:ro" \
  -v "$PWD/rust/prophet-wasm/third-party:/workspace/rust/prophet-wasm/third-party:ro" \
  -v "$PWD/.generated/holidays-1995-2044:/snapshot" \
  --entrypoint /opt/effect-prophet-reference/bin/python \
  effect-prophet/reference-fixtures:1.4.0 \
  tools/prophet/measure_holidays.py --output /snapshot
```

The generator verifies the installed package versions against `uv.lock`, preserves Unicode and
all dates returned by Prophet, checks alias equivalence through the real helper, and verifies
compact-encoding and gzip round trips. `manifest.json` records counts, file hashes, country-level
sizes, provider warnings, generator/lock hashes, and environment provenance. Provider license and
contributor files are copied from the exact installed wheel; Prophet's existing license is also
included. There is no optimizer invocation or CPU-sensitive fitted arithmetic in this experiment.

### Measured results

With **Prophet 1.4.0 / holidays 0.104**, the provider advertises 501 country codes. Adding Prophet's
legacy `TU` alias produces **502 codes**, resolving to **250 canonical country calendars and 252
aliases**. The deduplicated snapshot contains **165,673 occurrences**, **2,304 distinct names**, and
5,730 country/name pairs. The actual returned date range is 1995-01-01 through 2044-12-31.

All sizes below are exact bytes. JSON uses UTF-8 without formatting whitespace. Gzip uses level 9
with a zero timestamp; the separately measured Brotli column uses Node's quality 11.

| Representation                                                                 | JSON bytes | Gzip bytes | Brotli bytes |
| ------------------------------------------------------------------------------ | ---------: | ---------: | -----------: |
| Per-country `{date, name}` events + alias map                                  |  8,270,406 |    645,832 |      310,163 |
| Per-country names dictionary + `[epochDay, nameIndex]` occurrences + alias map |  1,890,690 |    585,904 |      347,493 |
| Repeated events for every code, like the R generator's code inventory          | 16,586,303 |  1,162,575 |      322,407 |

`compact.json` is about **1.80 MiB raw / 572 KiB gzipped**. The compact representation wins on raw
size but not on Brotli size; these measurements do not establish a final storage format.
`events.json` provides a readable semantic baseline and `all-codes.events.json` quantifies alias
duplication. The compact format uses integer UTC days since 1970-01-01, preserving name identity
and simultaneous occurrences. It is not yet a public persistence schema.

Individual compact files in `countries/` total 1,886,544 raw bytes or 649,370 bytes when gzipped
separately (excluding the alias map and manifest). The median country is **7,294.5 bytes raw /
2,580.5 bytes gzipped**; the US is 6,492 / 2,366 bytes. Sweden is the largest at 35,459 / 8,862 bytes.
Combining files before compression avoids much of the separate-file compression overhead.

Exploratory deterministic tar+gzip archives containing the compact data, research manifest, and
all four third-party files measured **606,771 bytes combined** or **616,587 bytes partitioned**
in the original size-only experiment (before adding the coverage census).
These are data-only archive measurements, **not** the size or incremental size of an npm package.
They exclude generated `.gz` duplicates and the alternative event representations.

### Coverage and reproducibility caveats

- `BV`, `HM`, and `IO` return empty country calendars. Recognized country codes must not be
  advertised as necessarily having nonempty holiday coverage.
- India's calendar emits `Requested Holidays are available only from 2001 to 2035.` The manifest
  retains that warning and its affected country. A 50-year generation request does not prove that
  every holiday rule has 50-year coverage.
- Defaults are exactly Prophet's: `en_US`, observed dates enabled, provider-default categories,
  and no subdivision. English can fall back to the provider's original language. Future dates are
  a versioned rule snapshot, not guaranteed official announcements.
- Two independent generations, including every JSON, gzip, manifest, license, and contributor
  file, were byte-identical. To repeat that check, run the command with a second empty host output
  directory, then use `diff -rq` between the two directories.

**Conclusion:** all-country bundling looks reasonable by size, especially with optional
country-level loading. Coverage policy, future-date updates, public API integration, persistence,
and package notice placement remain implementation decisions for #69.

### Extension through 2060: dates are available, completeness is not uniform

The CLI now accepts `--first-year`, `--last-year`, and `--future-from` (defaults: 1995, 2044,
and 2026). To reproduce the extension, use `.generated/holidays-1995-2060` as the empty host
output directory in the command above and add `--last-year 2060` to the Python arguments.

The **1995–2060 inclusive** snapshot contains **220,692 occurrences** across the same 250
canonical calendars, with the same 2,304 distinct names. Every 1995–2044 calendar and alias was
preserved exactly. Two independent extension runs with different Python hash seeds produced
byte-identical artifacts, including the coverage census.

| Representation                                | JSON bytes | Gzip bytes |
| --------------------------------------------- | ---------: | ---------: |
| Per-country `{date, name}` events + alias map | 11,036,920 |    865,891 |
| Compact dictionaries + alias map              |  2,466,399 |    782,920 |
| Repeated events for every country code        | 22,136,928 |  1,669,058 |

The compact snapshot is **2.35 MiB raw / 765 KiB gzipped**, an increase of just **197,016
compressed bytes** (about 192 KiB) over the 2044 snapshot. Storage is not the principal constraint.

`coverage.json` records all 66 requested years for every country, year-by-year occurrence counts,
provider-declared year bounds, empty years, and warnings from separate single-year Prophet
queries. It also flags recurring names that disappear after 2035 or 2050; these are investigative
flags, **not** a general completeness detector. They can reflect name changes or a particular
observed-day variant, and cannot establish whether a future date is officially confirmed.

**245 calendars have at least one generated occurrence in every year from 2026 through 2060.**
That is not the same as 245 complete calendars. Only India emits an availability warning, yet
source review confirms several silent gaps:

| Calendar                                                                                 | Finding in the pinned `holidays` 0.104 source and generated dates                                                                                                                        |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sri Lanka (`LK`)                                                                         | Explicit `end_year = 2026`; returns no dates from 2027 onward. Poya calendars are approved annually.                                                                                     |
| India (`IN`)                                                                             | Many Hindu tables stop at 2035: Holi, India-specific Diwali, Dussehra, and others vanish after that year. Other holidays continue.                                                       |
| Nepal (`NP`)                                                                             | Several local date tables end in 2032/2033; many Hindu tables end in 2035. Generated occurrences fall from 30 in 2035 to 6 in 2036, without a warning.                                   |
| Bhutan, Fiji, Guyana, Mauritius, Suriname (`BT`, `FJ`, `GY`, `MU`, `SR`)                 | Also consume Hindu tables ending in 2035. Affected names include Dassain, India-specific Diwali, Holi, and other country-specific subsets.                                               |
| Indonesia (`ID`)                                                                         | Nyepi / Day of Silence is table-backed only through 2050 and is silently absent afterward. Other holidays continue.                                                                      |
| Ukraine (`UA`)                                                                           | Default public-holiday category returns no future dates: the provider carries martial-law suspension forward. This is provider policy, not proof there will be no holidays through 2060. |
| Bouvet Island, Heard/McDonald Islands, British Indian Ocean Territory (`BV`, `HM`, `IO`) | Empty calendars throughout the requested range.                                                                                                                                          |

US, UK, Germany, Canada, and Japan generate dates in every future year with no provider warnings.
This is a useful rule-projection check, **not** an audit of all statutory holidays or subdivisions.
China's source requires annual checks for official arrangements; Thailand likewise documents
annual announcements. Singapore documents estimated moving holidays from 2028 onward. These
limitations cannot be resolved simply by precomputing more years.

The name-disappearance flags also include Turkey and Malaysia, but those must not be classified
as confirmed table omissions from the flag alone. Turkey's Eid dates continue with an
`(estimated)` name suffix after the source's confirmed range ends in 2032; Malaysia's Vesak
base holiday continues despite a disappearing observed-name variant. Exact provider names matter
because Prophet uses them as feature identities; blindly stripping suffixes would change parity.

Source review used the **installed, lockfile-pinned wheel**, not a moving upstream branch. Relevant
files are `holidays/calendars/hindu.py`, `holidays/calendars/balinese_saka.py`,
`holidays/countries/{sri_lanka,india,nepal,ukraine}.py`, and the affected country implementations.
The generated census is reproducible but the source review is targeted, not an exhaustive
country-by-country legal or accuracy audit.

**Recommendation:** keep 2060 as an outer snapshot horizon, but publish explicit per-country/rule
coverage limitations. Reject or require an explicit partial-calendar opt-in where known tables
run out, preserve distinctions between missing data and deliberately empty provider calendars,
and allow custom calendars to supply missing future dates. A blanket “all countries supported
through 2060” claim is not justified by this provider version.

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

`stan-differential-same-state.json` pins the unchanged executable's density and every gradient
component for five differential inputs, the four from #107 plus seed 1886692310, frozen in
`differential-cases.json` and configured through the differential's own Python adapter. Each case
records Prophet's normalized problem with features rounded to 12 decimal places, Prophet's
initialization, and one authored state that moves every coordinate, including flat growth's
prior-only rate and changepoints. Probes use `jacobian=False` and `sig_figs=12`. No optimizer runs:
these inputs are oracle-sensitive, so a fitted endpoint would not be a stable fixture.

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
