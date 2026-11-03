---
description: "Use Effect Prophet in browsers with Vite, webpack, Rspack or esbuild, and how the WebAssembly engine loads."
---

# Browsers and bundlers

Effect Prophet runs in browsers as well as Node.js, from the same package and the same import.
There is nothing to configure for Vite, webpack or Rspack. esbuild needs one file copied.

Every change is tested in Chromium, Firefox and WebKit (the engine behind Safari) with every
bundler below. All three give exactly the same forecasts as Node.js, because they all run the
same engine.

## How the engine loads

The math runs in a WebAssembly binary, `prophet_wasm_bg.wasm`, which loads the first time a fit
or forecast needs it.

- **Node.js** reads the binary from disk and compiles it right away, so `Effect.runSync` works
  for fitting and forecasting. Country holiday calendars still need `Effect.runPromise`, because
  their files load asynchronously.
- **Browsers** download and compile the binary once per page, asynchronously, and later calls
  reuse it. Run your programs with `Effect.runPromise` or `Effect.runFork`. `Effect.runSync`
  fails on the call that has to wait for the download.

The first call that loads the engine has `wasm.cold_start` set on its
[trace](./tracing#how-long-each-step-took), so the download isn't mistaken for a slow fit.

Each [country holiday calendar](./holiday-calendars) is a separate file that loads the first
time a fit or `inspectCountryHolidays` uses that country. Bundlers turn each one into its own
small chunk, so a page downloads only the countries it uses. Prediction from a fitted or saved
model never loads a calendar file, because the model carries the calendar it was fitted with.

## Sizes

Measured with a Vite production build:

| File                     | Size   | Gzipped |
| ------------------------ | ------ | ------- |
| WebAssembly engine       | 263 kB | 104 kB  |
| One country calendar     | 10 kB  | 3.6 kB  |
| Largest country calendar | 47 kB  | 12 kB   |

The country figure is the median of the 250 calendars. Your JavaScript bundle also includes
Effect Prophet's code and the parts of Effect it uses.

## Vite

Works with `vite build` and the dev server, with no configuration. Vite emits the engine as an
asset and each calendar as a chunk.

## webpack

Works with webpack 5 and no configuration. webpack emits the engine as an asset and each calendar
as a chunk.

## Rspack

Works with Rspack 2 and no configuration, the same way as webpack.

## esbuild

esbuild bundles the code and, with `splitting: true`, puts each calendar in its own chunk. It
doesn't copy the engine binary, so copy it next to your bundle yourself:

```ts
import { copyFile } from "node:fs/promises";
import { build } from "esbuild";

await build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  format: "esm",
  splitting: true,
  outdir: "dist",
});

await copyFile(
  "node_modules/effect-prophet/wasm/prophet_wasm_bg.wasm",
  "dist/prophet_wasm_bg.wasm",
);
```

Without `splitting`, every calendar ends up inside your main bundle.

## Serving the files

Serve `.wasm` files with the `application/wasm` content type. Browsers can then compile the
engine while it downloads. With another content type it still works, but more slowly, and the
browser console shows a warning.

If a file can't be loaded, the operation fails with a typed error rather than throwing: the
engine gives a `FittingError` or `PredictionError` with `reason: "backend-failure"` and
`backendPhase: "load"`, and a calendar gives a `CountryHolidayError` with
`reason: "snapshot-unavailable"`. See [Handling errors](/examples/errors).
