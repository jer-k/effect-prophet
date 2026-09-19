import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

import { Effect, Schema } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const projectRoot = new URL("../", import.meta.url);

const collectFiles = async (directory: URL, prefix = ""): Promise<Array<string>> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: Array<string> = [];

  for (const entry of entries) {
    const relativePath = prefix === "" ? entry.name : `${prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(new URL(`${entry.name}/`, directory), relativePath)));
    } else {
      files.push(relativePath);
    }
  }

  return files;
};

const sourceFiles = await collectFiles(new URL("src/", projectRoot));

const expectedJavaScriptFiles = sourceFiles.flatMap((sourceFile) => {
  assert.match(sourceFile, /\.ts$/u);

  const outputBase = sourceFile.slice(0, -3);
  const outputFiles = [`dist/${outputBase}.js`];

  if (sourceFile !== "index.ts") {
    outputFiles.push(`dist/${outputBase}.js.map`);
  }

  return outputFiles;
});

const expectedDeclarationFiles = [
  "dist/errors.d.ts",
  "dist/fitted-model.d.ts",
  "dist/index.d.ts",
  "dist/internal/fitting-backend.d.ts",
  "dist/internal/prophet-fitting-backend.d.ts",
  "dist/model-serialization.d.ts",
  "dist/observation.d.ts",
  "dist/options.d.ts",
  "dist/prophet.d.ts",
  "dist/seasonality.d.ts",
];

const expectedWasmFiles = [
  "wasm/package.json",
  "wasm/prophet_wasm.d.ts",
  "wasm/prophet_wasm.js",
  "wasm/prophet_wasm_bg.wasm",
  "wasm/prophet_wasm_bg.wasm.d.ts",
];

const pack = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: projectRoot,
  encoding: "utf8",
});

assert.equal(pack.status, 0, pack.stderr || pack.stdout);

const PackResultsSchema = Schema.Array(
  Schema.Struct({
    files: Schema.Array(Schema.Struct({ path: Schema.String })),
  }),
);

const packResults = Schema.decodeUnknownSync(PackResultsSchema)(JSON.parse(pack.stdout));

assert.equal(packResults.length, 1);

const packResult = packResults.at(0);

assert.ok(packResult);

const packedFiles = packResult.files.map(({ path }) => path).sort();

const expectedPackedFiles = [
  "README.md",
  "package.json",
  ...expectedDeclarationFiles,
  ...expectedJavaScriptFiles,
  ...expectedWasmFiles,
].sort();

assert.deepEqual(
  packedFiles,
  expectedPackedFiles,
  "the npm artifact contains missing or stale files",
);

for (const declarationFile of expectedDeclarationFiles) {
  const declaration = await readFile(new URL(declarationFile, projectRoot), "utf8");

  const relativeImports = declaration.matchAll(
    /\b(?:from\s+|import\()\s*["'](\.{1,2}\/[^"']+)["']/gu,
  );

  for (const relativeImport of relativeImports) {
    assert.match(relativeImport[1] ?? "", /\.js$/u);
  }
}

const declarationTypecheck = spawnSync(
  "node",
  [
    "node_modules/typescript/bin/tsc",
    "--ignoreConfig",
    "--noEmit",
    "--strict",
    "--skipLibCheck",
    "true",
    "--target",
    "ES2022",
    "--module",
    "NodeNext",
    "--moduleResolution",
    "NodeNext",
    "tools/package-consumer.ts",
  ],
  {
    cwd: projectRoot,
    encoding: "utf8",
  },
);

assert.equal(
  declarationTypecheck.status,
  0,
  declarationTypecheck.stderr || declarationTypecheck.stdout,
);

const model = await Effect.runPromise(
  fit([
    { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
    { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
    { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
  ]).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecasts = await Effect.runPromise(predict(model, ["2024-01-01T00:00:03.000Z"]));

assert.equal(forecasts.length, 1);

assert.equal(forecasts[0]?.value, 11);

assert.equal(forecasts[0]?.trend, 11);

console.log(`Package artifact smoke test passed (${packedFiles.length} files)`);
