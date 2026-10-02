import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { writeArtifact } from "./artifacts.ts";
import { loadCaseCatalog, renderCaseCatalog } from "./catalog.ts";

await Effect.runPromise(
  Effect.gen(function* () {
    const cases = yield* loadCaseCatalog();
    yield* writeArtifact(
      fileURLToPath(new URL("../CASES.md", import.meta.url)),
      renderCaseCatalog(cases),
    );
  }),
);
