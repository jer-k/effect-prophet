import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import { Schema } from "effect";
import { build as esbuild } from "esbuild";
import { chromium } from "playwright";
import { build as viteBuild, createServer as createViteServer } from "vite";
import webpack from "webpack";

// Bundles the packed artifact for the browser with each supported bundler, and serves it through
// the Vite dev server, then runs every page in headless Chromium: a point fit and forecast, a
// country-holiday fit and forecast, and a calendar inspection, so the WASM binary and the
// per-country calendar chunks must both resolve.

const projectRoot = new URL("../", import.meta.url);

const smokeScript = `
import { Effect } from "effect";
import { fit, inspectCountryHolidays, predict, prophetFittingBackendLayer } from "effect-prophet";

const rows = Array.from({ length: 80 }, (_, index) => ({
  timestamp: new Date(Date.UTC(2024, 0, index + 1, 12)).toISOString(),
  value: 20 + index * 0.03 + Math.sin(index) * 0.15,
}));

const future = ["2025-01-01T12:00:00.000Z", "2025-01-02T12:00:00.000Z"];

const smoke = Effect.gen(function* () {
  const point = yield* fit(rows);
  const forecasts = yield* predict(point, future);
  const holidays = yield* fit(rows, { countryHolidays: { country: "US" } });
  const holidayForecasts = yield* predict(holidays, future);
  const calendar = yield* inspectCountryHolidays({ country: "DE" }, [2025]);

  return {
    forecasts: forecasts.length,
    holidayForecasts: holidayForecasts.length,
    finite: [...forecasts, ...holidayForecasts].every((row) => Number.isFinite(row.value)),
    calendar: calendar.country,
    christmas: calendar.occurrences.some((event) => event.date === "2025-12-25"),
  };
}).pipe(Effect.provide(prophetFittingBackendLayer));

const report = (outcome) => {
  document.body.dataset.smoke = JSON.stringify(outcome);
};

Effect.runPromise(smoke).then(
  (result) => report({ ok: true, result }),
  (error) => report({ ok: false, error: String(error?.stack ?? error) }),
);
`;

const page = (script: string, type: "module" | "classic") =>
  `<!doctype html>\n<html><body><script${type === "module" ? ' type="module"' : ""} src="${script}"></script></body></html>\n`;

const contentTypes = new Map([
  [".html", "text/html"],
  [".js", "text/javascript"],
  [".json", "application/json"],
  [".wasm", "application/wasm"],
]);

const ListeningAddress = Schema.Struct({ port: Schema.Int });

/** A page under test and how to stop serving it. */
interface Served {
  readonly url: string;
  readonly close: () => Promise<void>;
}

/** Serve one directory over HTTP, as a static host would. */
const serve = async (root: string): Promise<Served> => {
  const server = createServer((request, response) => {
    const path = normalize(new URL(request.url ?? "/", "http://localhost").pathname);
    const file = join(root, path === "/" ? "index.html" : path);

    readFile(file).then(
      (body) => {
        response.writeHead(200, {
          "content-type": contentTypes.get(extname(file)) ?? "application/octet-stream",
        });
        response.end(body);
      },
      () => {
        response.writeHead(404);
        response.end();
      },
    );
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));

  const { port } = Schema.decodeUnknownSync(ListeningAddress)(server.address());

  return {
    url: `http://127.0.0.1:${port}/`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
};

const application = await mkdtemp(join(tmpdir(), "effect-prophet-browser-"));

try {
  const pack = spawnSync(
    "npm",
    ["pack", "--json", "--ignore-scripts", "--pack-destination", application],
    { cwd: projectRoot, encoding: "utf8" },
  );

  assert.equal(pack.status, 0, pack.stderr || pack.stdout);

  const [artifact]: ReadonlyArray<{ readonly filename: string }> = JSON.parse(pack.stdout);

  assert.ok(artifact);

  const installed = join(application, "node_modules/effect-prophet");

  await mkdir(installed, { recursive: true });
  await mkdir(join(application, "src"));
  await symlink(
    fileURLToPath(new URL("node_modules/effect", projectRoot)),
    join(application, "node_modules/effect"),
    "dir",
  );

  const extract = spawnSync(
    "tar",
    ["-xzf", join(application, artifact.filename), "--strip-components=1", "-C", installed],
    { encoding: "utf8" },
  );

  assert.equal(extract.status, 0, extract.stderr || extract.stdout);

  const entry = join(application, "src/main.js");

  await writeFile(entry, smokeScript);
  await writeFile(join(application, "index.html"), page("/src/main.js", "module"));

  const targets: ReadonlyArray<{
    readonly name: string;
    readonly start: (outDir: string) => Promise<Served>;
  }> = [
    {
      name: "vite build",
      start: async (outDir) => {
        await viteBuild({
          root: application,
          configFile: false,
          logLevel: "warn",
          build: { outDir, emptyOutDir: true },
        });

        return serve(outDir);
      },
    },
    {
      name: "vite dev server",
      start: async () => {
        const server = await createViteServer({
          root: application,
          configFile: false,
          logLevel: "warn",
          server: { host: "127.0.0.1", port: 0 },
        });

        await server.listen();

        const [url] = server.resolvedUrls?.local ?? [];

        assert.ok(url, "the Vite dev server has no local URL");

        return { url, close: () => server.close() };
      },
    },
    {
      name: "webpack",
      start: async (outDir) => {
        const stats = await new Promise<webpack.Stats | undefined>((resolve, reject) => {
          webpack(
            {
              mode: "production",
              context: application,
              entry,
              output: { path: outDir, filename: "main.js" },
              performance: { hints: false },
            },
            (error, result) => (error ? reject(error) : resolve(result)),
          );
        });

        assert.ok(stats, "webpack produced no stats");
        assert.ok(!stats.hasErrors(), stats.toString("errors-only"));

        await writeFile(join(outDir, "index.html"), page("main.js", "classic"));

        return serve(outDir);
      },
    },
    {
      name: "esbuild",
      start: async (outDir) => {
        await esbuild({
          absWorkingDir: application,
          entryPoints: [entry],
          bundle: true,
          format: "esm",
          splitting: true,
          outdir: outDir,
          logLevel: "warning",
        });

        // esbuild leaves `new URL(..., import.meta.url)` alone, so the binary goes beside the
        // bundle, where the generated glue looks for it.
        await copyFile(
          join(installed, "wasm/prophet_wasm_bg.wasm"),
          join(outDir, "prophet_wasm_bg.wasm"),
        );
        await writeFile(join(outDir, "index.html"), page("main.js", "module"));

        return serve(outDir);
      },
    },
  ];

  const browser = await chromium.launch();

  try {
    for (const [index, { name, start }] of targets.entries()) {
      const { url, close } = await start(join(application, `out-${index}`));

      try {
        const tab = await browser.newPage();
        const problems: Array<string> = [];

        tab.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
        tab.on("console", (message) => {
          if (message.type() === "error" || message.type() === "warning") {
            problems.push(`console ${message.type()}: ${message.text()}`);
          }
        });
        tab.on("requestfailed", (request) => problems.push(`request failed: ${request.url()}`));
        tab.on("response", (response) => {
          if (!response.ok()) problems.push(`HTTP ${response.status()}: ${response.url()}`);
        });

        await tab.goto(url);
        await tab.waitForSelector("body[data-smoke]", { state: "attached", timeout: 60_000 });

        const outcome = JSON.parse((await tab.getAttribute("body", "data-smoke")) ?? "null");

        assert.deepEqual(
          outcome,
          {
            ok: true,
            result: {
              forecasts: 2,
              holidayForecasts: 2,
              finite: true,
              calendar: "DE",
              christmas: true,
            },
          },
          `${name}: ${JSON.stringify(outcome)}`,
        );
        assert.deepEqual(problems, [], `${name} reported problems`);

        await tab.close();
      } finally {
        await close();
      }

      console.log(`Browser smoke test passed with ${name}`);
    }
  } finally {
    await browser.close();
  }
} finally {
  await rm(application, { recursive: true, force: true });
}
