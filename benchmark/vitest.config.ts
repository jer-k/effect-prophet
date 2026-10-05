import { defineConfig } from "vitest/config";

// Resolve the package from source, as tsconfig.json does, so the tests do not need a built dist/.
export default defineConfig({
  resolve: {
    alias: { "effect-prophet": new URL("../src/index.ts", import.meta.url).pathname },
  },
  test: {
    dir: import.meta.dirname,
  },
});
