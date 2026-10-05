import { fileURLToPath } from "node:url";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  capabilityForCase,
  loadCaseCatalog,
  loadCoreCases,
  renderCaseCatalog,
  selectCases,
} from "../catalog.ts";
import { loadRunEvidence } from "../stored-results.ts";

const recordedDirectory = fileURLToPath(
  new URL(
    "../../results/retained/flat-growth-and-evaluation/2026-10-04T191226-966Z-730ead62/",
    import.meta.url,
  ),
);

describe("capability catalog", () => {
  it("preserves original settings/gates while selecting only requested cases", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());
    const recorded = await Effect.runPromise(loadRunEvidence(recordedDirectory));
    expect(catalog).toHaveLength(112);
    expect(new Set(catalog.map((item) => item.id)).size).toBe(112);

    for (const original of recorded.cases) {
      const { datasetIdentity: _identity, ...declaration } = original;

      expect(catalog.find((item) => item.id === original.id)).toEqual(declaration);
    }

    const selected = await Effect.runPromise(
      selectCases(catalog, ["flat-constant-minmax", "flat-constant-minmax"]),
    );

    expect(selected.map((item) => item.id)).toEqual(["flat-constant-minmax"]);
    expect(
      (await Effect.runPromise(selectCases(catalog, ["missing"]).pipe(Effect.exit)))._tag,
    ).toBe("Failure");
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
