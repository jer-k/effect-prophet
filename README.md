# effect-prophet

A private TypeScript package for exploring Effect-based time-series forecasting.

The Rust/WASM backends fit either an ordinary least-squares linear trend or a jointly estimated linear trend with explicit additive Fourier seasonalities. Forecasts expose trend, additive total, final value, and ordered named seasonal components. TypeScript owns validation, Effect service composition, persistence, and WASM protocol translation; numerical fitting and evaluation run in Rust. The package does not yet implement Prophet MAP fitting, changepoints, automatic seasonalities, or uncertainty intervals.

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

`npm test`, `npm run test:integration:prophet`, and `npm run test:wasm` generate ignored WASM bindings before running tests that exercise the Rust/WASM backend.

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

## Rust/WASM numerical backend

`rust/prophet-wasm` provides the numerical implementations behind the public fitting Layers. In addition to the original arithmetic `mean` spike, it exports coarse operations for ordinary least-squares linear fitting and normalized additive ridge fitting, with matching batch prediction exports.

Run each phase independently with:

```sh
npm run test:rust
npm run build:wasm
node --test rust/prophet-wasm/node-tests/*.test.mjs
```

`wasm-pack` first asks Cargo to compile the crate for `wasm32-unknown-unknown`. It then runs the `wasm-bindgen` tooling over the raw WASM module and writes Node-specific JavaScript, TypeScript declarations, package metadata, and the transformed `.wasm` module to `rust/prophet-wasm/pkg`.

The generated JavaScript is the adapter between Node and the low-level WASM ABI. It allocates WASM linear memory and copies each caller-supplied `Float64Array` before Rust borrows the copied values as `&[f64]`. Each fit and prediction export receives all timestamps and model metadata in one call and copies one packed result back; no per-observation or per-component callback crosses the boundary.

A successful fit returns `[0, intercept, slope, timeOrigin, timeScale]`. Timestamps are transformed with `(timestamp - timeOrigin) / timeScale`, where the origin and scale are the minimum timestamp and training range. This removes large epoch offsets and maps the training span to `[0, 1]`; prediction must retain and reuse the same metadata. The fitted equation is `intercept + slope × scaledTime`.

A failed fit returns a one-element packed array containing a `LinearTrendFitStatus` code. Codes distinguish insufficient observations, mismatched array lengths, non-finite timestamps or values, zero time variance, and non-finite numerical results. Batch prediction returns `[0, ...predictions]` on success, a one-element status for invalid model metadata, and a status plus the exact failing timestamp index when evaluation fails.

The TypeScript adapter enforces the packed protocol strictly. Results must be `Float64Array` values with the exact frame length, documented integer status, valid model parameters or finite predictions, and an in-range safe-integer evaluation index where required. Wrong containers, unknown statuses, extra entries, and malformed claimed successes fail as `backend-failure` with `backendPhase: "protocol"` instead of being interpreted as numerical outcomes.

The generated Node module is loaded lazily only after option and empty-prediction short circuits. Loading and required-export parsing fail with `backendPhase: "load"`; exceptions or WASM traps raised by a binding fail with `backendPhase: "execute"`. The adapter translates these boundary failures into the public Effect error channel without implementing the numerical operations itself.

Generated `pkg` and Cargo `target` artifacts are ignored rather than committed. They are reproducible on demand from the committed `Cargo.lock`, exact `wasm-bindgen` dependency, `rust-toolchain.toml`, and documented `wasm-pack` version. This keeps generated binary and glue diffs out of review while the spike is private; shipping an npm package will require a separate decision about when and where release artifacts are built.

The maintenance cost introduced by the spike is a Rust toolchain and WASM compilation target, a separately installed `wasm-pack` executable, Cargo dependency updates, generated-JavaScript/WASM ABI coupling, longer CI setup and build time, and Node-target-specific loading behavior. Browser loading and final npm packaging remain deliberately unresolved.

## Observations

`decodeObservations` accepts an unknown value and returns an `Effect` that either succeeds with a non-empty observation collection or fails with `InputValidationError`. The error identifies `observations` as its input boundary and includes structured issue paths.

Encoded observations use this shape:

```ts
{
  timestamp: "2024-01-01T00:00:00.000Z",
  value: 1.5,
}
```

Timestamps must use the canonical UTC ISO representation emitted by Effect's `DateTime.formatIso`. Decoded timestamps are integer epoch milliseconds, keeping mutable JavaScript `Date` objects out of the numerical core. Values must be finite numbers.

Collections must be non-empty and arrive in strictly ascending timestamp order. The decoder does not sort input, and duplicate timestamps are rejected.

```ts
import { Effect } from "effect";
import { decodeObservations } from "effect-prophet";

const program = decodeObservations([{ timestamp: "2024-01-01T00:00:00.000Z", value: 1.5 }]);

const observations = await Effect.runPromise(program);
```

## Options

`decodeOptions` validates untrusted fitting options and supplies defaults when called with `undefined` or an empty object. Unknown keys are rejected so misspelled configuration cannot silently reach a fitting backend.

Public options include `growth` and ordered explicit `seasonalities`. Omitted seasonalities default to an empty list. Each seasonality requires a unique custom name, positive period in fixed 24-hour days, and positive integer Fourier order; `priorScale` is positive and defaults to `10`.

The selected fitting Layer owns the narrower capability policy:

| Fitting Layer                        | Growth support | Configured seasonalities |
| ------------------------------------ | -------------- | ------------------------ |
| `wasmAdditiveFittingBackendLayer`    | Linear only    | Supported                |
| `wasmLinearTrendFittingBackendLayer` | Linear only    | Rejected explicitly      |
| `constantMeanFittingBackendLayer`    | Flat only      | Rejected explicitly      |

The explicitly named `constantMeanFittingBackendLayer` remains a learning example. It fits an arithmetic-mean baseline tagged `"constant-mean-baseline"`; it is not a full Prophet flat-growth implementation. Logistic growth, automatic built-in seasonalities, holidays, and changepoints remain out of scope.

```ts
import { Effect } from "effect";
import { decodeOptions } from "effect-prophet";

const defaults = await Effect.runPromise(decodeOptions());
// { growth: "linear" }

const flat = await Effect.runPromise(decodeOptions({ growth: "flat" }));

const seasonal = await Effect.runPromise(
  decodeOptions({
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3, priorScale: 10 }],
  }),
);
```

## Linear trend forecast

`fit` validates public observations and options before making one coarse-grained call to the provided fitting backend. `wasmLinearTrendFittingBackendLayer` invokes the Rust ordinary-least-squares implementation through generated WASM bindings. Training timestamps and values are packed into aligned `Float64Array` values at the backend boundary.

The fitted model stores the intercept, slope, time origin, and time scale required for prediction. `predict` validates canonical UTC prediction timestamps and sends all timestamps and fitting-time state to one Rust/WASM batch operation. Every ordered forecast exposes `value`, `trend`, `additive`, and `seasonalities`; ordinary linear and constant models return `additive: 0` and an empty component list.

```ts
import { Effect } from "effect";
import { fit, wasmLinearTrendFittingBackendLayer, predict } from "effect-prophet";

const model = await Effect.runPromise(
  fit([
    { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
    { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
  ]).pipe(Effect.provide(wasmLinearTrendFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(
  predict(model, ["2024-01-01T00:00:03.000Z", "2024-01-01T00:00:04.000Z"]),
);
// Forecast values and trend components are 11 and 14; additive is zero.
```

## Explicit additive seasonalities

`wasmAdditiveFittingBackendLayer` jointly fits the linear trend and every configured Fourier component using the documented `normalized-ridge-v1` objective. An empty layout still produces a distinct `linear-additive-ridge` model with fit diagnostics.

```ts
import { Effect } from "effect";
import { fit, predict, wasmAdditiveFittingBackendLayer } from "effect-prophet";

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
  }).pipe(Effect.provide(wasmAdditiveFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(predict(model, predictionTimestamps));
// Each row includes trend, additive, value, and the named weekly-custom contribution.
```

Names and component order are retained in the fitted model and portable JSON. The ridge objective is intentionally distinct from Prophet MAP fitting; see [the additive ridge contract](docs/modeling/additive-ridge.md).

The constant-mean implementation remains available only as the explicitly named `constantMeanFittingBackendLayer` example. It requires explicit flat growth:

```ts
import { Effect } from "effect";
import { constantMeanFittingBackendLayer, fit } from "effect-prophet";

const baseline = await Effect.runPromise(
  fit(
    [
      { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
      { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
    ],
    { growth: "flat" },
  ).pipe(Effect.provide(constantMeanFittingBackendLayer)),
);
// { model: "constant-mean-baseline", level: 3.5 }
```

Fitted model types are branded domain values. Callers obtain trusted models through `fit` or `decodeFittedModel`; plain object literals are intentionally not assignable to these types. `predict` and serialization still parse defensively at runtime to protect JavaScript callers and forged values. While the package API remains WIP, this is a deliberate type-level tightening without a change to the model fields or public operation shapes.

Expected input, unsupported-configuration, fitting, and prediction failures remain in their respective typed Effect error channels.

## Tracing WASM operations

The public `fit` and `predict` operations create the `Prophet.fit` and `Prophet.predict` spans. When those operations reach the Rust/WASM adapter, the adapter adds these child spans:

| Span                          | Attributes                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `effect-prophet.wasm.fit`     | Backend, operation, model type, growth, observation count, and—for additive fits—seasonality/coefficient counts |
| `effect-prophet.wasm.predict` | Backend, operation, model type, prediction count, and—for additive prediction—seasonality count                 |

Each WASM span covers the complete synchronous adapter operation: lazy Node module loading, typed-array preparation inside the invocation, generated `wasm-bindgen` input copying, Rust execution, generated output copying, and packed-result decoding. Validation and short-circuit paths that do not invoke WASM do not create a WASM span. Typed adapter failures end the corresponding span as failed without changing the returned error.

The spans measure the coarse host/WASM boundary. They cannot break Rust execution into optimizer or numerical phases because the library does not install Rust callbacks or propagate trace context into WASM.

Applications own tracer configuration, sampling, and export. The library uses Effect's built-in tracing API and does not install an OpenTelemetry SDK or exporter. An application can place the operations under its own parent span and provide its compatible tracer when running the program:

```ts
const program = Effect.gen(function* () {
  const model = yield* fit(observations).pipe(Effect.provide(wasmLinearTrendFittingBackendLayer));

  return yield* predict(model, predictionTimestamps);
}).pipe(Effect.withSpan("forecast.job"));
```

## Experimental model serialization

`encodeFittedModel` converts a fitted linear or linear-additive model into a JSON-compatible payload. `decodeFittedModel` validates an untrusted payload and reconstructs the runtime model without selecting a fitting backend. Additive payloads retain trend and seasonal coefficients, scaling, ordered definitions, and fit diagnostics; layout offsets are reconstructed during decoding. Backend identifiers, services, and WASM resources are not serialized. The constant-mean teaching baseline remains unsupported.

```ts
import { Effect } from "effect";
import { decodeFittedModel, encodeFittedModel } from "effect-prophet";

if (model.model !== "constant-mean-baseline") {
  const encoded = await Effect.runPromise(encodeFittedModel(model));
  const json = JSON.stringify(encoded);
  const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(json)));
}
```

The payload has no independent format version. It is interpreted using the installed package's schema, following Prophet's field-based serialization approach rather than introducing a separate migration protocol. Serialized compatibility remains experimental until the package's `1.0.0` release.

## Expected errors

The public error channel uses five tagged categories:

- `InputValidationError` includes the input boundary and structured schema issues.
- `UnsupportedConfigurationError` identifies a valid option rejected by the selected backend through a discriminated `configuration` payload for growth or configured seasonalities.
- `FittingError` includes a reason, observation count, optional parameter count, and optional WASM backend phase. Additive direct-solver failures distinguish rank deficiency and non-finite results.
- `PredictionError` includes a reason, the relevant timestamp, and optional WASM backend phase.
- `ModelSerializationError` includes the failed operation and structured schema issues.

Messages supplement these fields for people; callers can branch on `_tag` and inspect structured context without parsing a message. When a failure originates in WASM adapter mechanics, `backendPhase` distinguishes `"load"`, `"execute"`, and `"protocol"` failures. Ordinary numerical statuses retain their domain reason and do not fabricate a backend phase.

Loading and execution failures also retain the original exception by identity in the runtime-only, non-enumerable `cause` property. Causes can contain local paths or other sensitive runtime details, so they are deliberately absent from Effect Schema encoding and ordinary JSON fields; inspect them explicitly only when debugging. Expected invalid input and numerical-domain failures belong in the typed error channel. Violated internal invariants and programming errors remain defects rather than being converted into broad domain errors. Stack traces are not included in the errors' schema payloads.

## Package layout

- `src/index.ts` is the authored package entry point.
- `test/` contains authored Vitest tests.
- `dist/` is generated by TypeScript and is not committed.
- `tsconfig.build.json` owns JavaScript, source-map, and declaration generation.
- Vitest owns test execution; TypeScript owns type checking and builds.
- Oxlint checks source correctness, and Oxfmt checks or writes formatting.

The `exports` map exposes only the package root. ESM consumers load `dist/index.js`, while TypeScript consumers resolve its matching `dist/index.d.ts` declaration. Internal files that are not listed in `exports` are not public package entry points.
