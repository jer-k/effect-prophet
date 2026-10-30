import { readFile } from "node:fs/promises";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";
import { anomalyCases } from "../../cases/uncertainty/anomalies.ts";
import { uncertaintyCases } from "../../cases/uncertainty/public-api.ts";
import { anomalyAgreement, intervalBoundRatio, percentile } from "../uncertainty.ts";

describe("public uncertainty benchmark declarations", () => {
  it("parses every bounded MAP case and selects available complete rows", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases(uncertaintyCases));
    const growth = new Set<string>();
    const outputs = new Set<string>();

    for (const benchmarkCase of cases) {
      expect(benchmarkCase.workload.kind).toBe("map");

      if (benchmarkCase.workload.kind !== "map") continue;

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

        if (controls?.output === "samples") {
          expect(rows * controls.samples).toBeLessThanOrEqual(1_000_000);
        }
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

  it("allows point and Monte Carlo differences that scale with interval width", () => {
    const row = { trendLower: 10, trendUpper: 10, valueLower: 8, valueUpper: 12 };
    const point = { trend: 0.01, value: 0.01 };

    // 100 samples allow 0.6 widths: 2.4 for a 4-wide value interval, plus the point allowance.
    expect(intervalBoundRatio([row], [row], 100, point)).toBe(0);
    expect(intervalBoundRatio([row], [{ ...row, valueUpper: 14.41 }], 100, point)).toBeCloseTo(
      1,
      2,
    );
    expect(intervalBoundRatio([row], [{ ...row, valueUpper: 14.5 }], 100, point)).toBeGreaterThan(
      1,
    );

    // Zero-width trend bounds only get the point allowance.
    expect(intervalBoundRatio([row], [{ ...row, trendLower: 10.02 }], 100, point)).toBeCloseTo(2);
    expect(intervalBoundRatio([row], [], 100, point)).toBeUndefined();
  });
});

describe("anomaly benchmark declarations", () => {
  it("checks each trend's whole history at 99% and names outliers the history contains", async () => {
    const cases = await Effect.runPromise(parseBenchmarkCases(anomalyCases));
    const growth = new Set<string>();

    for (const benchmarkCase of cases) {
      if (benchmarkCase.workload.kind !== "map" || benchmarkCase.workload.anomalies === undefined) {
        throw new Error(`Expected an anomaly case: ${benchmarkCase.id}`);
      }

      growth.add(benchmarkCase.workload.configuration.growth);

      expect(benchmarkCase.workload.uncertainty).toMatchObject({
        output: "intervals",
        samples: 1_000,
        intervalWidth: 0.99,
      });

      const input: unknown = JSON.parse(
        await readFile(new URL(`../../inputs/${benchmarkCase.dataset}`, import.meta.url), "utf8"),
      );

      const dataset = await Effect.runPromise(parseBenchmarkDataset(input));
      const timestamps = dataset.observations.map((row) => row.timestamp);

      expect(benchmarkCase.rowSelection).toEqual({
        historical: dataset.observations.length,
        future: 0,
        stride: 1,
      });

      expect(timestamps).toEqual([...timestamps].sort());
      expect(new Set(timestamps).size).toBe(timestamps.length);
      expect(benchmarkCase.workload.anomalies.expected.length).toBeGreaterThanOrEqual(3);

      for (const timestamp of benchmarkCase.workload.anomalies.expected) {
        expect(timestamps).toContain(timestamp);
      }
    }

    expect(growth).toEqual(new Set(["linear", "flat", "logistic"]));
  });

  it("rejects anomaly declarations that do not check the whole history with intervals", async () => {
    const selected = anomalyCases[0];

    if (selected?.workload.kind !== "map" || selected.workload.uncertainty === undefined) {
      throw new Error("Missing declared anomaly case");
    }

    const { anomalies: _anomalies, ...withoutAnomalies } = selected.workload;

    for (const invalid of [
      { ...selected, phases: ["warm-fit", "warm-uncertainty"] },
      { ...selected, workload: withoutAnomalies },
      {
        ...selected,
        workload: {
          ...selected.workload,
          uncertainty: { ...selected.workload.uncertainty, output: "samples", samples: 16 },
        },
      },
      { ...selected, rowSelection: { historical: 365, future: 1, stride: 1 } },
      { ...selected, rowSelection: { historical: 365, future: 0, stride: 2 } },
    ]) {
      const exit = await Effect.runPromiseExit(parseBenchmarkCases([invalid]));

      expect(exit._tag).toBe("Failure");
    }
  });
});

describe("anomaly agreement", () => {
  const bounds = { trendLower: 0, trendUpper: 0, valueLower: 0, valueUpper: 1 };
  const intervals = [bounds, bounds, bounds];
  const row = (index: number, actual: number) => ({ index, timestamp: index * 1_000, actual });

  it("counts rows flagged by one library and declared outliers either missed", () => {
    const effect = { rows: 3, flagged: [row(0, 2), row(2, 1.01)] };
    const python = { rows: 3, flagged: [row(0, 2)] };
    const wider = [bounds, bounds, { ...bounds, valueUpper: 1.02 }];

    expect(anomalyAgreement(effect, python, intervals, wider, [0])).toEqual({
      kind: "compared",
      effectFlagged: 2,
      pythonFlagged: 1,
      oneSided: 1,
      missedExpected: [],
    });

    expect(anomalyAgreement(effect, python, intervals, wider, [2_000])).toMatchObject({
      missedExpected: [2_000],
    });
  });

  it("rejects flags inside their own interval, out of order, or over different rows", () => {
    const python = { rows: 3, flagged: [row(0, 2)] };

    for (const effect of [
      { rows: 3, flagged: [row(1, 0.5)] },
      { rows: 3, flagged: [row(2, 2), row(0, 2)] },
      { rows: 2, flagged: [row(0, 2)] },
      { rows: 3, flagged: [row(5, 2)] },
    ]) {
      expect(anomalyAgreement(effect, python, intervals, intervals, [])).toEqual({
        kind: "inconsistent",
      });
    }
  });
});
