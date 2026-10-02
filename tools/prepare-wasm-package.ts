import { cp, rm } from "node:fs/promises";

await rm(new URL("../wasm/.gitignore", import.meta.url));

await cp(
  new URL("../rust/prophet-wasm/third-party/", import.meta.url),
  new URL("../wasm/third-party/", import.meta.url),
  { recursive: true },
);
