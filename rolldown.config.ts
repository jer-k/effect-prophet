import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

// tsrs keeps its binary lookup behind the private `#getExePath` import, so load the same file by
// path. It finds the per-platform `@tsrs/*` package and honors `TSRS_BINARY`.
const tsrsRoot = dirname(createRequire(import.meta.url).resolve("tsrs/package.json"));

const { default: getTsrsPath } = await import(
  pathToFileURL(join(tsrsRoot, "lib/getExePath.js")).href
);

export default defineConfig({
  input: "src/index.ts",
  // The generated WASM glue and the country calendars ship beside `dist`: the glue finds its
  // binary from its own module URL, and each calendar stays a separate file for applications'
  // bundlers to split.
  external: [
    /^effect(?:\/|$)/u,
    /^node:/u,
    /[/\\]node_modules[/\\]/u,
    /[/\\]wasm[/\\]prophet_wasm\.js$/u,
    /[/\\]calendars[/\\]countries[/\\][A-Z]{2}\.json$/u,
  ],
  platform: "node",
  plugins: [
    dts({
      generator: "tsgo",
      sourcemap: false,
      tsconfig: "tsconfig.build.json",
      tsgo: { path: getTsrsPath() },
    }),
  ],
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
});
