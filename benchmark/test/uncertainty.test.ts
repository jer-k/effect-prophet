import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases } from "../case.ts";
import { uncertaintyCases } from "../cases/uncertainty.ts";
import { percentile } from "../uncertainty.ts";

describe("public uncertainty benchmark declarations", () => {
  it("parses every bounded MAP case and selects available complete rows", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases(uncertaintyCases));
    const growth = new Set<string>();
    const outputs = new Set<string>();

    for (const benchmarkCase of cases) {
      expect(benchmarkCase.workload.kind).toBe("stage-f-map");

      if (benchmarkCase.workload.kind !== "stage-f-map") continue;

      growth.add(benchmarkCase.workload.configuration.growth);

      const controls = benchmarkCase.workload.uncertainty;
      expect(controls?.algorithm).toBe("scalar-continuous-time");
      expect(controls?.evidence).toBe("docs/validation/uncertainty.md#evidence-classes");
      expect(controls?.samples).toBeGreaterThan(0);
      expect(controls?.samples).toBeLessThanOrEqual(2_048);
      outputs.add(controls?.output ?? "missing");

      const selection = benchmarkCase.rowSelection;

      if (selection !== undefined) {
        const rows = selection.historical + selection.future;
        expect(rows).toBeGreaterThan(0);
        expect(rows * (controls?.samples ?? 0)).toBeLessThanOrEqual(1_000_000);
      }
    }

    expect(growth).toEqual(new Set(["linear", "flat", "logistic"]));
    expect(outputs).toEqual(new Set(["intervals", "samples"]));
  });

  it("interpolates equal-tailed quantiles without dropping samples", () => {
    expect(percentile(new Float64Array([4, 1, 2, 3]), 0.1)).toBeCloseTo(1.3);
    expect(percentile(new Float64Array([4, 1, 2, 3]), 0.9)).toBeCloseTo(3.7);
    expect(() => percentile([1, Number.NaN], 0.1)).toThrow();
  });
});
