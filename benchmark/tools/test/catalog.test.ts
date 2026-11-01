import { fileURLToPath } from "node:url";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  assertCompleteSuites,
  benchmarkSuiteIds,
  capabilityForCase,
  casesInSuites,
  loadCaseCatalog,
  loadCoreCases,
  renderCaseCatalog,
  selectCases,
  suiteForCase,
} from "../catalog.ts";
import { resolveRunReference } from "../references.ts";
import { loadRunEvidence } from "../stored-results.ts";

const baselineDirectory = (name: string) =>
  Effect.runPromise(
    resolveRunReference(fileURLToPath(new URL("../../results/", import.meta.url)), name),
  );

describe("capability catalog", () => {
  it("preserves original settings/gates while selecting only requested cases", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());

    const recorded = await Effect.runPromise(
      loadRunEvidence(await baselineDirectory("flat-growth")),
    );

    expect(catalog).toHaveLength(178);
    expect(new Set(catalog.map((item) => item.id)).size).toBe(178);

    for (const original of recorded.cases) {
      const { datasetIdentity: _identity, ...declaration } = original;

      expect(catalog.find((item) => item.id === original.id)).toEqual(declaration);
    }

    const selected = await Effect.runPromise(
      selectCases(catalog, ["flat-constant-minmax", "flat-constant-minmax"]),
    );

    expect(selected.map((item) => item.id)).toEqual(["flat-constant-minmax"]);
    expect((await Effect.runPromiseExit(selectCases(catalog, ["missing"])))._tag).toBe("Failure");
  });

  it("owns focused features once and generates a deterministic coverage inventory", async () => {
    const cases = await Effect.runPromise(loadCoreCases());
    expect(cases).toHaveLength(8);
    expect(cases.find((item) => capabilityForCase(item) === "holidays")?.id).toBe(
      "map-events-small",
    );
    expect(cases.find((item) => capabilityForCase(item) === "regressors")?.id).toBe(
      "map-regressors-medium",
    );
    const rendered = renderCaseCatalog(cases);
    expect(rendered).toBe(renderCaseCatalog(cases));
    expect(rendered).toContain("not passing evidence");
    expect(rendered).toContain("inputs/v1/map-events-small.json");
  });
});

describe("trend suites", () => {
  it("assigns every case to the suite its saved baseline covers", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());

    for (const suite of benchmarkSuiteIds) {
      const recorded = await Effect.runPromise(
        loadRunEvidence(await baselineDirectory(`${suite}-growth`)),
      );

      for (const item of recorded.cases) {
        expect(suiteForCase(catalog.find((candidate) => candidate.id === item.id)!), item.id).toBe(
          suite,
        );
      }
    }
  });

  it("selects whole suites and rejects unknown ones", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());
    const selected = await Effect.runPromise(casesInSuites(catalog, ["flat", "logistic"]));

    expect(selected.length).toBeGreaterThan(0);
    expect(selected.every((item) => ["flat", "logistic"].includes(suiteForCase(item)))).toBe(true);
    expect(selected).toHaveLength(catalog.filter((item) => suiteForCase(item) !== "linear").length);
    expect(await Effect.runPromise(casesInSuites(catalog, []))).toEqual([]);
    expect((await Effect.runPromiseExit(casesInSuites(catalog, ["cubic"])))._tag).toBe("Failure");
  });

  it("only points a baseline at runs that cover every declared case of their suites", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());
    const flat = catalog.filter((item) => suiteForCase(item) === "flat").map((item) => item.id);
    const linear = catalog.filter((item) => suiteForCase(item) === "linear").map((item) => item.id);

    expect(await Effect.runPromise(assertCompleteSuites(catalog, flat))).toEqual(["flat"]);
    expect(await Effect.runPromise(assertCompleteSuites(catalog, [...flat, ...linear]))).toEqual([
      "linear",
      "flat",
    ]);

    const failure = async (ids: ReadonlyArray<string>) =>
      (await Effect.runPromise(assertCompleteSuites(catalog, ids).pipe(Effect.flip))).message;

    expect(await failure(flat.slice(1))).toContain(`declared but not run: ${flat[0]}`);
    expect(await failure([...flat, "invented-case"])).toContain(
      "not in the catalog: invented-case",
    );
    expect(await failure([])).toContain("no catalog cases");
  });
});
