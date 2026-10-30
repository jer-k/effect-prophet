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
  external: [/^effect(?:\/|$)/u, /^node:/u, /[/\\]node_modules[/\\]/u],
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
