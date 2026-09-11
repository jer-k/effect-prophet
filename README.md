# effect-prophet

A private TypeScript package for exploring Effect-based time-series forecasting.

The current Rust/WASM backend fits an ordinary least-squares linear trend and predicts point forecasts with a trend component. TypeScript owns validation, Effect service composition, and WASM protocol translation; numerical fitting and trend evaluation run in Rust. The package does not yet implement Prophet features such as changepoints, seasonality, or uncertainty intervals.

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

`npm test` and `npm run test:wasm` generate ignored WASM bindings before running their respective integration tests.

## Rust/WASM numerical backend

`rust/prophet-wasm` provides the numerical implementation behind the public linear fitting Layer. In addition to the original arithmetic `mean` spike, it exports coarse `fit_linear_trend` and `predict_linear_trend` operations for ordinary least-squares fitting and batch prediction.

Run each phase independently with:

```sh
npm run test:rust
npm run build:wasm
node --test rust/prophet-wasm/node-tests/*.test.mjs
```

`wasm-pack` first asks Cargo to compile the crate for `wasm32-unknown-unknown`. It then runs the `wasm-bindgen` tooling over the raw WASM module and writes Node-specific JavaScript, TypeScript declarations, package metadata, and the transformed `.wasm` module to `rust/prophet-wasm/pkg`.

The generated JavaScript is the adapter between Node and the low-level WASM ABI. It allocates WASM linear memory and copies each caller-supplied `Float64Array` before Rust borrows the copied values as `&[f64]`. The fit and prediction exports each receive all timestamps in one call and copy one packed result back; no per-observation callback crosses the boundary.

A successful fit returns `[0, intercept, slope, timeOrigin, timeScale]`. Timestamps are transformed with `(timestamp - timeOrigin) / timeScale`, where the origin and scale are the minimum timestamp and training range. This removes large epoch offsets and maps the training span to `[0, 1]`; prediction must retain and reuse the same metadata. The fitted equation is `intercept + slope × scaledTime`.

A failed fit returns a one-element packed array containing a `LinearTrendFitStatus` code. Codes distinguish insufficient observations, mismatched array lengths, non-finite timestamps or values, zero time variance, and non-finite numerical results. Batch prediction returns `[0, ...predictions]` on success and a status with the failing timestamp index when evaluation fails. The TypeScript boundary translates these explicit protocol results into the public Effect error channel without implementing the numerical operations itself.

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

The only current option is `growth`:

- `"linear"` is the default and is supported by `wasmLinearTrendFittingBackendLayer`.
- `"flat"` is reserved for backends that implement a constant trend.

The explicitly named `constantMeanFittingBackendLayer` remains available as an architectural example and deliberately ignores this option. Logistic growth and all seasonality, holiday, and changepoint options remain out of scope.

```ts
import { Effect } from "effect";
import { decodeOptions } from "effect-prophet";

const defaults = await Effect.runPromise(decodeOptions());
// { growth: "linear" }

const flat = await Effect.runPromise(decodeOptions({ growth: "flat" }));
```

## Linear trend forecast

`fit` validates public observations and options before making one coarse-grained call to the provided fitting backend. `wasmLinearTrendFittingBackendLayer` invokes the Rust ordinary-least-squares implementation through generated WASM bindings. Training timestamps and values are packed into aligned `Float64Array` values at the backend boundary.

The fitted model stores the intercept, slope, time origin, and time scale required for prediction. `predict` validates canonical UTC prediction timestamps and sends all timestamps and the fitting-time scaling to one Rust/WASM batch operation. Each ordered forecast currently exposes `value` and its equal `trend` component.

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
// Forecast values and trend components are 11 and 14.
```

The constant-mean implementation remains available only as the explicitly named `constantMeanFittingBackendLayer` example. Expected input, fitting, and prediction failures remain in their respective typed Effect error channels.

## Experimental model serialization

`encodeFittedModel` converts a fitted linear model into a JSON-compatible payload. `decodeFittedModel` validates an untrusted payload and reconstructs the runtime model without selecting a fitting backend. The payload contains only the model kind, linear coefficients, and fitting-time scaling required for prediction; backend identifiers, services, and WASM resources are not serialized.

```ts
import { Effect } from "effect";
import { decodeFittedModel, encodeFittedModel } from "effect-prophet";

const encoded = await Effect.runPromise(encodeFittedModel(model));
const json = JSON.stringify(encoded);
const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(json)));
```

The payload has no independent format version. It is interpreted using the installed package's schema, following Prophet's field-based serialization approach rather than introducing a separate migration protocol. Serialized compatibility remains experimental until the package's `1.0.0` release.

## Expected errors

The public error channel uses four tagged categories:

- `InputValidationError` includes the input boundary and structured schema issues.
- `FittingError` includes a reason and observation count.
- `PredictionError` includes a reason and the timestamp being evaluated.
- `ModelSerializationError` includes the failed operation and structured schema issues.

Messages supplement these fields for people; callers can branch on `_tag` and inspect structured context without parsing a message. Expected invalid input and numerical-domain failures belong in the typed error channel. Violated internal invariants and programming errors remain defects rather than being converted into broad domain errors. Stack traces are not included in the errors' schema payloads.

## Package layout

- `src/index.ts` is the authored package entry point.
- `test/` contains authored Vitest tests.
- `dist/` is generated by TypeScript and is not committed.
- `tsconfig.build.json` owns JavaScript, source-map, and declaration generation.
- Vitest owns test execution; TypeScript owns type checking and builds.
- Oxlint checks source correctness, and Oxfmt checks or writes formatting.

The `exports` map exposes only the package root. ESM consumers load `dist/index.js`, while TypeScript consumers resolve its matching `dist/index.d.ts` declaration. Internal files that are not listed in `exports` are not public package entry points.
