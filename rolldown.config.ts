import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";

export default defineConfig({
  input: "src/index.ts",
  external: [/^effect(?:\/|$)/u, /^node:/u, /[/\\]node_modules[/\\]/u],
  platform: "node",
  plugins: [dts({ sourcemap: false, tsconfig: "tsconfig.build.json" })],
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
});
