# effect-prophet

An Effect-based TypeScript package for time-series forecasting.

The Rust/WASM backends fit ordinary least-squares linear trends plus flat, linear-piecewise, and floor-aware logistic MAP models with additive and multiplicative components. Forecasts expose trend, additive and multiplicative totals, final value, and ordered named components. TypeScript owns validation, Effect service composition, persistence, and WASM protocol translation; numerical fitting, changepoint resolution, and evaluation run in Rust. Seeded MAP predictive intervals and samples are experimental; see the [validation and interpretation report](docs/validation/uncertainty.md).

## Compatibility target

The fixed compatibility reference is the unmodified Python `prophet==1.4.0` release at source commit `abf69a215604afcaa7ecb4359f592d13bf6dea9f`. Compatibility is tracked per capability in the [Prophet 1.4.0 compatibility contract](docs/compatibility/prophet-1.4.0.md); this package does not currently claim blanket Prophet compatibility.

The current OLS fit is a mathematical baseline, not Prophet MAP fitting, and the package deliberately keeps stricter canonical-UTC, ordering, and duplicate policies. Python API shapes, CmdStanPy backend behavior, and Python model-JSON interchange are separate from numerical compatibility. Anomaly detection is a possible package extension, not part of the Prophet 1.4.0 parity target.

## Prerequisites

- Node.js 26.7.0 (recorded in `.tool-versions`; the package supports Node.js 22.19.0 or newer)
- npm 11.12.1 (recorded in `package.json`)
- Rust 1.98.1 and the `wasm32-unknown-unknown` target (recorded in `rust-toolchain.toml`)
- wasm-pack 0.15.0

With [asdf](https://asdf-vm.com/) installed, run `asdf install` from this directory to install the recorded Node.js version. With [rustup](https://rustup.rs/) installed, Cargo commands from this checkout install or select the recorded Rust toolchain and WASM target automatically.

Install the pinned `wasm-pack` version separately:

```sh
cargo install wasm-pack --version 0.15.0 --locked
```

## Install

```sh
npm ci
```

## Development

```sh
npm run build
npm run test:package
npm test
npm run test:integration:prophet
npm run test:rust
npm run test:wasm
npm run typecheck
npm run lint
npm run lint:rust
npm run format
npm run format:rust
npm run format:check
npm run format:rust:check
```

Run the complete verification sequence with:

```sh
npm run check
```

`npm test`, `npm run test:integration:prophet`, and `npm run test:wasm` generate ignored development WASM bindings before running tests that exercise the Rust/WASM backend. `npm run build` starts from clean output and creates the release-mode JavaScript, declarations, source maps, and WASM files included in the npm package. `npm run test:package` builds that production artifact, verifies its exact file manifest, loads it through the package export, and runs a forecast through the packaged WASM backend.

The Prophet 1.4.0 compatibility suite is intentionally separate from normal tests. It reads committed references and requires neither Python nor Docker:

```sh
npm run test:integration:prophet
```

With Docker available, regenerate or verify the canonical cross-language fixtures separately:

```sh
npm run fixtures:generate
npm run fixtures:check
```

See the [Prophet reference tooling guide](tools/prophet/README.md) for the pinned environments, provenance, and shared-mount design.

The Docker Compose [public API benchmark suite](benchmark/README.md) records correctness-gated absolute timings for equivalent MAP workloads, including events, regressors, conditional seasonalities, and mixed models. Runs use the host's native ARM64 or AMD64 container architecture, retain raw samples and provenance, and make no performance ranking or RAM claim. Deliberately reviewed snapshots are indexed under [benchmark results](benchmark/results/baselines/README.md).

## Rust/WASM numerical backend

`rust/prophet-wasm` provides the numerical implementations behind the public fitting Layer. It exports coarse operations for ordinary least-squares linear fitting and reduced flat, linear-piecewise, and logistic MAP fitting, with matching batch prediction exports.

Run each phase independently with:

```sh
npm run test:rust
npm run build:wasm
node --test rust/prophet-wasm/node-tests/*.test.ts
```

`wasm-pack` first asks Cargo to compile the crate for `wasm32-unknown-unknown`. It then runs the `wasm-bindgen` tooling over the raw WASM module and writes Node-specific JavaScript, TypeScript declarations, package metadata, and the transformed `.wasm` module to the ignored top-level `wasm/` directory.

The generated JavaScript is the adapter between Node and the low-level WASM ABI. It allocates WASM linear memory and copies each caller-supplied `Float64Array` before Rust borrows the copied values as `&[f64]`. Each fit and prediction export receives all timestamps and model metadata in one call and copies one packed result back; no per-observation or per-component callback crosses the boundary.

A successful fit returns `[0, intercept, slope, timeOrigin, timeScale]`. Timestamps are transformed with `(timestamp - timeOrigin) / timeScale`, where the origin and scale are the minimum timestamp and training range. This removes large epoch offsets and maps the training span to `[0, 1]`; prediction must retain and reuse the same metadata. The fitted equation is `intercept + slope × scaledTime`.

A failed fit returns a one-element packed array containing a `LinearTrendFitStatus` code. Codes distinguish insufficient observations, mismatched array lengths, non-finite timestamps or values, zero time variance, and non-finite numerical results. Batch prediction returns `[0, ...predictions]` on success, a one-element status for invalid model metadata, and a status plus the exact failing timestamp index when evaluation fails.

The TypeScript adapter enforces the packed protocol strictly. Results must be `Float64Array` values with the exact frame length, documented integer status, valid model parameters or finite predictions, and an in-range safe-integer evaluation index where required. Wrong containers, unknown statuses, extra entries, and malformed claimed successes fail as `backend-failure` with `backendPhase: "protocol"` instead of being interpreted as numerical outcomes.

The generated Node module is loaded lazily only after option and empty-prediction short circuits. Loading and required-export parsing fail with `backendPhase: "load"`; exceptions or WASM traps raised by a binding fail with `backendPhase: "execute"`. The adapter translates these boundary failures into the public Effect error channel without implementing the numerical operations itself.

Generated development and production WASM artifacts, along with Cargo `target` output, are ignored rather than committed. They are reproducible on demand from the committed `Cargo.lock`, exact `wasm-bindgen` dependency, `rust-toolchain.toml`, and documented `wasm-pack` version. Development commands write debug bindings to `wasm/`; the clean production build replaces them with release bindings before TypeScript compilation. npm packaging includes that `wasm/` directory beside `dist/`.

The maintenance cost introduced by the Rust backend is a Rust toolchain and WASM compilation target, a separately installed `wasm-pack` executable, Cargo dependency updates, generated-JavaScript/WASM ABI coupling, longer CI setup and build time, and Node-target-specific loading behavior. Browser loading remains deliberately unsupported.

## Observations

Applications prepare complete model-ready rows before calling the library: omit entire missing-target or excluded observations, decide sorting/deduplication/aggregation and UTC conversion, and provide explicit complete future rows. The package rejects malformed inputs instead of cleaning or inferring values. See the [data-preparation decision](docs/decisions/data-preparation-boundary.md), [data and edge-case guide](docs/usage/data-and-edge-cases.md), and [runnable source-to-holdout example](examples/data-policy.ts) (`npm run example:data-policy`).

`decodeObservations` accepts an unknown value and returns an `Effect` that either succeeds with a non-empty observation collection or fails with `InputValidationError`. The error identifies `observations` as its input boundary and includes structured issue paths.

Encoded observations use this shape:

```ts
{
  timestamp: "2024-01-01T00:00:00.000Z",
  value: 1.5,
  regressors: { price: 2 }, // required when `price` is configured
  conditions: { onSeason: true }, // required by conditional seasonalities
}
```

Timestamps must use the canonical UTC ISO representation emitted by Effect's `DateTime.formatIso`. Decoded timestamps are integer epoch milliseconds, keeping mutable JavaScript `Date` objects out of the numerical core. Values and regressor covariates must be finite numbers. Seasonality conditions must be actual booleans; numeric `0`/`1`, strings, null, and missing values are rejected. Every training row must contain exactly the configured regressor and condition name sets; missing and extra names are rejected rather than imputed or ignored.

Collections must be non-empty and arrive in strictly ascending timestamp order. The decoder does not sort input, and duplicate timestamps are rejected. Irregular gaps are valid; they are not filled. Callers own fixed-duration versus calendar-based future schedules, and must provide required future regressors, conditions and logistic bounds for every chosen prediction row.

```ts
import { Effect } from "effect";
import { decodeObservations } from "effect-prophet";

const program = decodeObservations([{ timestamp: "2024-01-01T00:00:00.000Z", value: 1.5 }]);

const observations = await Effect.runPromise(program);
```

## Options

`decodeOptions` validates untrusted fitting options and supplies defaults when called with `undefined` or an empty object. Unknown keys are rejected so misspelled configuration cannot silently reach a fitting backend.

Public options are a union of supported configurations rather than independent fields. Linear and flat growth each accept either no custom seasonalities or a non-empty ordered list. Public `growth: "flat"` selects the reduced `"flat-map"` model. `seasonalityMode` defaults to `"additive"`; custom seasonalities and regressors inherit it unless they provide `mode`. `holidaysMode` inherits `seasonalityMode` unless explicitly set.

Each configured custom seasonality requires a unique name, positive period in fixed 24-hour days, and positive integer Fourier order; `priorScale` is positive and defaults to `10`. An optional `conditionName` gates all of that component's Fourier columns using required boolean row values. Multiple custom seasonalities may share a condition. The names `yearly`, `weekly`, and `daily` are reserved for built-ins, which remain unconditional. Seasonality, event, regressor, and condition names cannot collide. Different named components may share a period, although overlapping Fourier bases can make component interpretation difficult.

Built-ins deliberately default to `"off"`, unlike Python Prophet. Set an individual control to `"auto"` for Prophet 1.4.0's training-history rule, or use `{ mode: "on" }` to force its default order. Forced controls also accept positive `fourierOrder` and `priorScale` overrides. `prophetFittingBackendLayer` is total over every configuration accepted by `fit` and dispatches to the corresponding narrow numerical adapter.

Linear, flat, and logistic MAP support Python Prophet's train-only `"absmax"` and `"minmax"` target scaling; absmax is the default. An explicit `scaling` option on featureless linear input selects MAP so centering and priors retain their Python meaning. The selected scaling state is persisted and reused during prediction; logistic state also records whether its floor was explicit or inferred. Country holiday catalogs remain out of scope; experimental opt-in MAP uncertainty is documented below. See the [target-scaling contract](docs/modeling/target-scaling.md), [linear piecewise MAP contract](docs/modeling/piecewise-map.md), [reduced flat MAP contract](docs/modeling/flat-map.md), and [logistic MAP contract](docs/modeling/logistic-map.md).

```ts
import { Effect } from "effect";
import { decodeOptions } from "effect-prophet";

const defaults = await Effect.runPromise(decodeOptions());
// Includes linear growth, no seasonalities/events, and all built-ins off.

const flat = await Effect.runPromise(decodeOptions({ growth: "flat", scaling: "minmax" }));

const scaledLinearMap = await Effect.runPromise(decodeOptions({ scaling: "minmax" }));

const seasonal = await Effect.runPromise(
  decodeOptions({
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3, priorScale: 10 }],
  }),
);
```

## Experimental MAP predictive uncertainty

`predictUncertainty(model, completeRows, { seed, samples?, intervalWidth?, output? })` runs a seeded Rust/WASM simulation for fitted **linear-piecewise, flat and floor-aware logistic MAP** models (including resolved mixed components). It returns equal-tailed trend/forecast intervals by default or caller-owned row-major sample buffers with `output: "samples"`. For example:

```ts
import { Effect } from "effect";
import { fit, predictUncertainty, prophetFittingBackendLayer } from "effect-prophet";

const model = await Effect.runPromise(
  fit(
    [
      { timestamp: "2025-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2025-01-02T00:00:00.000Z", value: 3 },
      { timestamp: "2025-01-03T00:00:00.000Z", value: 2.5 },
    ],
    { map: { changepoints: { mode: "explicit", timestamps: [] } } },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const bands = await Effect.runPromise(
  predictUncertainty(model, ["2025-01-04T00:00:00.000Z"], { seed: 42 }),
);
if (bands.kind === "intervals") console.log(bands.rows[0]?.value);
```

`predict` remains point-only. OLS uncertainty is unsupported; linear, flat and logistic MAP uncertainty are experimental. The stochastic process follows Prophet 1.4.0's **scalar** rather than default vectorized future-trend path; fitted feature coefficients and caller-supplied future covariates do not vary. A seed replays the same ordered request within a build; Python's seeded draws, cross-version replay, statistical calibration and guaranteed coverage are not claimed. See [modeling and resource limits](docs/modeling/uncertainty.md), the [fitted synthetic holdout report](docs/validation/uncertainty.md) and the [typechecked save/reload example](examples/uncertainty.ts).

## Linear trend forecast

`fit` validates public observations and options, constructs an explicit fitting plan, and makes one coarse-grained call to the complete public backend. For featureless linear growth, `prophetFittingBackendLayer` invokes the Rust ordinary-least-squares implementation through generated WASM bindings. Training timestamps and values are packed into aligned `Float64Array` values at the backend boundary.

The fitted model stores the intercept, slope, time origin, and time scale required for prediction. `predict` validates canonical UTC prediction timestamps and sends all timestamps and fitting-time state to one Rust/WASM batch operation. Every ordered forecast exposes `value`, `trend`, `additive`, `multiplicative`, and named component arrays. Featureless models return zero totals and empty component lists.

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const model = await Effect.runPromise(
  fit([
    { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
    { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
  ]).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(
  predict(model, ["2024-01-01T00:00:03.000Z", "2024-01-01T00:00:04.000Z"]),
);
// Forecast values and trend components are 11 and 14; additive is zero.
```

## Custom events

Custom events use exact UTC calendar dates and optional inclusive day windows. Known future occurrences must be supplied while fitting; one-off events do not recur automatically. Linear piecewise MAP fits event coefficients jointly in Rust. Flat growth rejects configured events.

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const model = await Effect.runPromise(
  fit(observations, {
    events: [
      { name: "launch", date: "2025-03-10", lowerWindowDays: -1, upperWindowDays: 2 },
      { name: "launch", date: "2026-03-09", lowerWindowDays: -1, upperWindowDays: 2 },
    ],
    map: { changepoints: { mode: "auto" } },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(predict(model, futureTimestamps));
// forecasts[i].events contains the grouped `launch` contribution.
```

## Additional regressors

Known regressors are fitted jointly with the trend, seasonalities, and custom events. Definitions are ordered and accept a positive `priorScale`, optional additive or multiplicative `mode`, and `standardization: "auto" | "always" | "never"`. Automatic standardization leaves exact binary and constant training columns unchanged and otherwise uses the training sample mean and sample standard deviation. Stored transforms and resolved modes are reused for prediction and after serialization.

Prediction remains timestamp-only for models without regressors. A regressor model requires row-shaped input containing exactly every fitted regressor; the package never forecasts, fills, or carries future covariates forward.

```ts
import { Effect } from "effect";
import { fit, getRegressorCoefficients, predict, prophetFittingBackendLayer } from "effect-prophet";

const model = await Effect.runPromise(
  fit(
    [
      { timestamp: "2025-01-01T00:00:00.000Z", value: 10, regressors: { price: 2 } },
      { timestamp: "2025-01-02T00:00:00.000Z", value: 12, regressors: { price: 3 } },
    ],
    { regressors: [{ name: "price", standardization: "auto", priorScale: 5 }] },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(
  predict(model, [{ timestamp: "2025-01-03T00:00:00.000Z", regressors: { price: 4 } }]),
);

const coefficients = getRegressorCoefficients(model);
// coefficients are descriptive model parameters in original regressor units, not causal effects.
```

Complete prediction rows preserve input order and duplicates. Equal timestamps may produce different forecasts when their regressor or condition values differ. Every forecast includes ordered `regressors` components. Additive components expose output-unit `value`; multiplicative components expose a dimensionless `factor` and output-unit `contribution`. Forecasts reconstruct as `trend * (1 + multiplicative) + additive`.

## Conditional seasonalities

A custom seasonality can name a boolean condition supplied on every training and nonempty prediction row. A false value gates every Fourier harmonic in that component to exact zero without removing or reordering its coefficients. Condition values are not inferred, persisted, or forecast; callers provide future regimes explicitly.

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const model = await Effect.runPromise(
  fit(
    observations.map((row) => ({
      ...row,
      conditions: { onSeason: isOnSeason(row.timestamp) },
    })),
    {
      seasonalities: [
        {
          name: "weekly-on-season",
          periodDays: 7,
          fourierOrder: 3,
          conditionName: "onSeason",
        },
      ],
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(
  predict(model, [
    {
      timestamp: "2025-04-01T00:00:00.000Z",
      conditions: { onSeason: false },
    },
  ]),
);
// forecasts[0].seasonalities[0].value === 0
```

Timestamp strings remain valid for models without conditions. Conditional models require object rows containing exactly all fitted condition names. Equal timestamps with different conditions remain distinct before and after model serialization. Linear piecewise MAP supports conditions; flat MAP supports them through mixed-mode fitting, while its reduced additive-only path rejects them.

See [known additive features](docs/modeling/additive-features.md) for ordering, normalization, UTC event-window semantics, memory ownership, and the WASM protocol.

## Automatic built-in seasonalities

Automatic selection uses training timestamps only. Yearly requires at least 730 fixed 24-hour days; weekly requires at least 14 days and a minimum consecutive gap below 7 days; daily requires at least 2 days and a minimum gap below 1 day. Irregular histories are accepted, and the minimum positive gap—not average cadence—controls the sampling test. Prediction timestamps never alter the fitted layout, and serialized models store the resolved definitions rather than `"auto"` controls.

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const observations = Array.from({ length: 57 }, (_, index) => ({
  timestamp: new Date(Date.UTC(2024, 0, 1) + index * 6 * 60 * 60 * 1_000).toISOString(),
  value: 10 + Math.sin((2 * Math.PI * index) / 4),
}));

const model = await Effect.runPromise(
  fit(observations, {
    builtInSeasonalities: {
      yearly: "auto",
      weekly: "auto",
      daily: "auto",
    },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, ["2024-01-16T00:00:00.000Z"]));
// This 14-day subdaily history enables weekly and daily, but not yearly.
```

`{ mode: "on" }` bypasses history and cadence checks. Forcing yearly seasonality with less than 730 days can be under-identified and can make trend/seasonality decomposition unstable. More generally, only force components when the observed windows support meaningful extrapolation. Automatic selection matches Prophet's feature rule, and additive linear fitting uses the reduced Prophet-compatible piecewise MAP path—not full Prophet API parity.

## Explicit additive seasonalities

For a non-empty seasonality list, `prophetFittingBackendLayer` jointly fits the linear trend and every configured Fourier component using the piecewise MAP objective. Featureless linear options select the ordinary linear-trend OLS model instead; omitted `map` uses automatic `{ count: 25, range: 0.8 }` changepoints.

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
  { timestamp: "2024-01-01T06:00:00.000Z", value: 3 },
  { timestamp: "2024-01-01T12:00:00.000Z", value: 1 },
  { timestamp: "2024-01-01T18:00:00.000Z", value: -1 },
  { timestamp: "2024-01-02T00:00:00.000Z", value: 1 },
];

const predictionTimestamps = ["2024-01-02T06:00:00.000Z"];

const model = await Effect.runPromise(
  fit(observations, {
    growth: "linear",
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3, priorScale: 10 }],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(predict(model, predictionTimestamps));
// Each row includes trend, additive, value, and the named weekly-custom contribution.
```

Names and component order are retained in the fitted model and portable JSON. Explicit `map: {}` remains an empty-changepoint MAP request, while omitted `map` selects the documented automatic changepoint defaults.

## Linear piecewise MAP forecast

Supplying `map` explicitly controls the Rust linear piecewise MAP objective. Additive linear requests that omit `map` use automatic changepoints; featureless linear requests still use OLS. Explicit changepoints must be
canonical, strictly increasing UTC timestamps inside the inclusive training range. Automatic
candidates use Prophet 1.4.0's row-index policy and are resolved in Rust from training timestamps.
Resolved timestamps and every aligned delta are retained in the model and portable JSON.

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const observations = Array.from({ length: 10 }, (_, index) => ({
  timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
  value: 2 + index * 0.4 + (index >= 5 ? 1 : 0),
}));

const model = await Effect.runPromise(
  fit(observations, {
    map: {
      changepoints: { mode: "auto", count: 2, range: 0.8 },
      changepointPriorScale: 0.05,
    },
    builtInSeasonalities: { weekly: "auto" },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(
  predict(model, ["2024-01-11T00:00:00.000Z", "2024-01-15T00:00:00.000Z"]),
);
```

The deterministic optimizer reports finite objective/stationarity diagnostics, uses an explicit
constant-target shortcut, and fails rather than falling back when noise collapses or the iteration
budget is exhausted. No-point MAP uses a true empty candidate design and therefore does not claim
fitted-objective parity with Prophet's private dummy-delta parameterization. See the
[piecewise MAP contract](docs/modeling/piecewise-map.md) and
[optimizer decision](docs/decisions/map-optimizer.md).

## Flat MAP forecast

Flat growth jointly fits a constant trend level, configured additive or multiplicative features, and observation noise. Components may vary while every forecast retains the same trend:

```ts
import { Effect } from "effect";
import { fit, prophetFittingBackendLayer } from "effect-prophet";

const flat = await Effect.runPromise(
  fit(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2.1 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 3.2 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 1.9 },
    ],
    {
      growth: "flat",
      seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 1 }],
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);
// flat.model === "flat-map"
```

Fitted model types are branded domain values. Callers obtain trusted models through `fit` or `decodeFittedModel`; plain object literals are intentionally not assignable to these types. `predict` and serialization still parse defensively at runtime to protect JavaScript callers and forged values. While the package API remains WIP, this is a deliberate type-level tightening without a change to the model fields or public operation shapes.

Expected input, fitting, and prediction failures remain in their respective typed Effect error channels. Unsupported option combinations are absent from the public TypeScript union and fail as input validation at untyped JavaScript boundaries.

## Logistic MAP forecast

Logistic growth requires a finite `capacity` on every training and prediction row. Training rows
may all include `floor`, or all omit it and use the fitted implicit floor policy:

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const model = await Effect.runPromise(
  fit(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 10, capacity: 100 },
      { timestamp: "2024-01-02T00:00:00.000Z", value: 20, capacity: 100 },
      { timestamp: "2024-01-03T00:00:00.000Z", value: 35, capacity: 100 },
    ],
    { growth: "logistic", scaling: "minmax" },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(
  predict(model, [
    { timestamp: "2024-01-04T00:00:00.000Z", capacity: 100 },
    { timestamp: "2024-01-05T00:00:00.000Z", capacity: 120 },
  ]),
);
```

Explicit-floor models require a floor on every prediction row. Targets outside their bounds are
accepted as noisy observations and are not clipped. Capacity and floor bound the trend only; an
additive or multiplicative component can move the final forecast outside those bounds. See the
[logistic model contract](docs/modeling/logistic-map.md).

## Tracing WASM operations

The public `fit` and `predict` operations create the `Prophet.fit` and `Prophet.predict` spans. When those operations reach the Rust/WASM adapter, the adapter adds these child spans:

| Span                          | Attributes                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `effect-prophet.wasm.fit`     | Backend, operation, model type, growth, observation count, and—for additive fits—seasonality/coefficient counts |
| `effect-prophet.wasm.predict` | Backend, operation, model type, prediction count, and—for additive prediction—seasonality count                 |

Each WASM span covers the complete synchronous adapter operation: lazy Node module loading, typed-array preparation inside the invocation, generated `wasm-bindgen` input copying, Rust execution, generated output copying, and packed-result decoding. Validation and short-circuit paths that do not invoke WASM do not create a WASM span. Typed adapter failures end the corresponding span as failed without changing the returned error.

The spans measure the coarse host/WASM boundary. They cannot break Rust execution into optimizer or numerical phases because the library does not install Rust callbacks or propagate trace context into WASM.

The `Prophet.fit` span records bounded custom/enabled-built-in counts, a configured condition-name count, and one resolution reason for each canonical built-in. It never records condition names or values, observations, timestamps, coefficients, or option payloads.

Applications own tracer configuration, sampling, and export. The library uses Effect's built-in tracing API and does not install an OpenTelemetry SDK or exporter. An application can place the operations under its own parent span and provide its compatible tracer when running the program:

```ts
const program = Effect.gen(function* () {
  const model = yield* fit(observations).pipe(Effect.provide(prophetFittingBackendLayer));

  return yield* predict(model, predictionTimestamps);
}).pipe(Effect.withSpan("forecast.job"));
```

## Experimental model serialization

`encodeFittedModel` converts a fitted linear, linear piecewise MAP, or flat MAP model into a JSON-compatible payload. `decodeFittedModel` validates an untrusted payload and reconstructs the runtime model without selecting a fitting backend. Featureful payloads retain all prediction coefficients, ordered definitions (including optional condition names), and fit diagnostics; layout offsets are reconstructed during decoding. Condition row values and training masks are never serialized, so every nonempty conditional prediction requires fresh values. Payloads written before condition support decode missing `conditionName` fields as unconditional definitions. Flat MAP payloads additionally retain observation noise. Backend identifiers, services, and WASM resources are not serialized.

```ts
import { Effect } from "effect";
import { decodeFittedModel, encodeFittedModel } from "effect-prophet";

if (model.model === "linear-trend" || model.model === "flat-map") {
  const encoded = await Effect.runPromise(encodeFittedModel(model));
  const json = JSON.stringify(encoded);
  const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(json)));
}
```

The payload has no independent format version. It is interpreted using the installed package's schema, following Prophet's field-based serialization approach rather than introducing a separate migration protocol. Serialized compatibility remains experimental until the package's `1.0.0` release.

## Expected errors

The public error channel uses four tagged categories:

- `InputValidationError` includes the input boundary and structured schema issues, including unsupported option combinations received from untyped callers.
- `FittingError` includes a reason, observation count, optional parameter count, and optional WASM backend phase. Numerical failures distinguish rank deficiency, non-finite results, flat noise collapse, and non-convergence.
- `PredictionError` includes a reason, the relevant timestamp, and optional WASM backend phase.
- `ModelSerializationError` includes the failed operation and structured schema issues.

Messages supplement these fields for people; callers can branch on `_tag` and inspect structured context without parsing a message. When a failure originates in WASM adapter mechanics, `backendPhase` distinguishes `"load"`, `"execute"`, and `"protocol"` failures. Ordinary numerical statuses retain their domain reason and do not fabricate a backend phase.

Loading and execution failures also retain the original exception by identity in the runtime-only, non-enumerable `cause` property. Causes can contain local paths or other sensitive runtime details, so they are deliberately absent from Effect Schema encoding and ordinary JSON fields; inspect them explicitly only when debugging. Expected invalid input and numerical-domain failures belong in the typed error channel. Violated internal invariants and programming errors remain defects rather than being converted into broad domain errors. Stack traces are not included in the errors' schema payloads.

## Package layout

- `src/index.ts` is the authored package entry point.
- `test/` contains authored Vitest tests.
- `dist/` is generated by the production build and is not committed.
- `wasm/` contains generated Node-target bindings and the release WASM binary and is not committed.
- `rolldown.config.ts` emits Node-compatible ESM JavaScript, source maps, and bundled declarations while preserving the authored TypeScript import style.
- `tsconfig.build.json` supplies production declaration compiler settings.
- Vitest owns test execution, TypeScript owns type checking, and Rolldown owns package builds.
- Oxlint checks source correctness, and Oxfmt checks or writes formatting.

The `exports` map exposes only the package root. ESM consumers load `dist/index.js`, while TypeScript consumers resolve its matching `dist/index.d.ts` declaration. Internal files that are not listed in `exports` are not public package entry points. The `prepack` lifecycle rebuilds from clean output so `npm pack` and a future `npm publish` cannot include stale generated modules.
