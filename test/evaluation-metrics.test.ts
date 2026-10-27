import { Effect } from "effect";
import { beforeAll, describe, expect, it } from "vitest";

import {
  EvaluationMetricError,
  InputValidationError,
  performanceMetrics,
  planRollingOrigin,
  simulationIdentity,
  type CrossValidationPointRow,
  type IntervalCrossValidationResult,
  type PointCrossValidationResult,
  type RollingOriginPlanSummary,
} from "../src/index";

const day = 86_400_000;

const at = (index: number) => new Date(Date.UTC(2024, 0, 1) + index * day).toISOString();

let plan: RollingOriginPlanSummary;

beforeAll(async () => {
  plan = await Effect.runPromise(
    planRollingOrigin(
      Array.from({ length: 8 }, (_, index) => ({ timestamp: at(index), value: index + 1 })),
      {},
      { horizonMs: 2 * day, cutoffs: { mode: "explicit", timestamps: [at(3), at(4)] } },
    ),
  );
});

const rows = (
  values: ReadonlyArray<readonly [number, number, number, number]>,
): ReadonlyArray<CrossValidationPointRow> =>
  values.map(([fold, horizon, actual, predicted]) => ({
    fold,
    cutoff: Date.UTC(2024, 0, 1) + (fold === 0 ? 3 : 4) * day,
    timestamp: Date.UTC(2024, 0, 1) + (fold === 0 ? 3 : 4) * day + horizon,
    horizonMs: horizon,
    actual,
    predicted,
  }));

const point = (
  values: ReadonlyArray<readonly [number, number, number, number]>,
): PointCrossValidationResult => ({
  kind: "point",
  plan,
  folds: [],
  rows: rows(values),
});

const interval = (
  values: ReadonlyArray<readonly [number, number, number, number, number, number]>,
): IntervalCrossValidationResult => ({
  kind: "intervals",
  plan,
  folds: [],
  simulation: simulationIdentity,
  sampleCount: 10,
  intervalWidth: 0.8,
  rows: values.map(([fold, horizon, actual, predicted, lower, upper]) => ({
    fold,
    cutoff: Date.UTC(2024, 0, 1) + (fold === 0 ? 3 : 4) * day,
    timestamp: Date.UTC(2024, 0, 1) + (fold === 0 ? 3 : 4) * day + horizon,
    horizonMs: horizon,
    actual,
    predicted,
    lower,
    upper,
  })),
});

const metrics = ["mae", "mse", "rmse", "mape", "mdape", "smape"] as const;

describe("performanceMetrics", () => {
  it("computes all point equations in output units, ratio units and even median", async () => {
    const result = await Effect.runPromise(
      performanceMetrics(
        point([
          [0, day, 2, 1],
          [0, 2 * day, -4, -2],
          [1, day, 4, 2],
          [1, 2 * day, 8, 6],
        ]),
        { metrics, aggregation: { kind: "overall" } },
      ),
    );

    expect(result.kind).toBe("overall");

    if (result.kind !== "overall") return;
    expect(result.bucket.rowCount).toBe(4);
    expect(result.bucket.scores).toEqual([
      { metric: "mae", value: 1.75 },
      { metric: "mse", value: 3.25 },
      { metric: "rmse", value: Math.sqrt(3.25) },
      { metric: "mape", value: 0.4375 },
      { metric: "mdape", value: 0.5 },
      { metric: "smape", value: (2 / 3 + 2 / 3 + 2 / 3 + 2 / 7) / 4 },
    ]);
  });

  it("sorts rows by horizon, keeping input order for ties, and aggregates exact horizons", async () => {
    const source = point([
      [0, 2 * day, 4, 3],
      [0, day, 1, 0],
      [1, day, 10, 7],
      [1, 2 * day, 5, 1],
    ]);

    const perRow = await Effect.runPromise(
      performanceMetrics(source, { metrics: ["mae"], aggregation: { kind: "rows" } }),
    );

    const horizons = await Effect.runPromise(
      performanceMetrics(source, { metrics: ["mae"], aggregation: { kind: "horizons" } }),
    );

    expect(
      perRow.kind === "rows" &&
        perRow.points.map((entry) => [
          entry.fold,
          entry.horizonMs,
          entry.rowCount,
          entry.scores[0]?.value,
        ]),
    ).toEqual([
      [0, day, 1, 1],
      [1, day, 1, 3],
      [0, 2 * day, 1, 1],
      [1, 2 * day, 1, 4],
    ]);
    expect(
      horizons.kind === "horizons" &&
        horizons.points.map((entry) => [entry.horizonMs, entry.rowCount, entry.scores[0]?.value]),
    ).toEqual([
      [day, 2, 2],
      [2 * day, 2, 2.5],
    ]);
    expect(source.rows.map((entry) => entry.horizonMs)).toEqual([2 * day, day, day, 2 * day]);
  });

  it("averages exactly w rows, taking a proportional share of the oldest horizon group", async () => {
    const source = point([
      [0, day, 1, 0],
      [1, day, 3, 0],
      [0, 2 * day, 5, 0],
      [1, 3 * day, 7, 0],
    ]);

    for (const window of [
      { kind: "count", rows: 2 } as const,
      { kind: "fraction", value: 0.5 } as const,
    ]) {
      const report = await Effect.runPromise(
        performanceMetrics(source, {
          metrics: ["mae", "rmse"],
          aggregation: { kind: "rolling", window },
        }),
      );

      // At 2 days the window holds the 5 and half of the first day's sum of 4: (5 + 4 / 2) / 2.
      expect(
        report.kind === "rolling" && [
          report.windowRows,
          report.points.map((entry) => [
            entry.horizonMs,
            ...entry.scores.map(({ value }) => value),
          ]),
        ],
      ).toEqual([
        2,
        [
          [day, 2, Math.sqrt(5)],
          [2 * day, 3.5, Math.sqrt(15)],
          [3 * day, 6, Math.sqrt(37)],
        ],
      ]);
    }
  });

  it("uses inclusive interval bounds and exact 0/0 sMAPE; coverage requires intervals", async () => {
    const source = interval([
      [0, day, 0, 0, 0, 0],
      [1, day, 3, 1, 1, 3],
      [0, 2 * day, 5, 4, 0, 4],
    ]);

    const report = await Effect.runPromise(
      performanceMetrics(source, {
        metrics: ["coverage", "smape"],
        aggregation: { kind: "overall" },
      }),
    );

    expect(report.kind === "overall" && report.bucket.scores).toEqual([
      { metric: "coverage", value: 2 / 3 },
      { metric: "smape", value: (0 + 1 + 2 / 9) / 3 },
    ]);

    const error = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(point([[0, day, 1, 2]]), {
          metrics: ["coverage"],
          aggregation: { kind: "overall" },
        }),
      ),
    );

    expect(error).toBeInstanceOf(EvaluationMetricError);
    expect(error).toMatchObject({ metric: "coverage", reason: "unavailable" });

    const preflight = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(point([[0, day, 1e308, -1e308]]), {
          metrics: ["mse", "coverage"],
          aggregation: { kind: "overall" },
        }),
      ),
    );

    expect(preflight).toMatchObject({ metric: "coverage", reason: "unavailable" });
  });

  it("fails MAPE for near-zero actuals and MDAPE for exact zeros, as Prophet's rules require", async () => {
    const zero = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(
          point([
            [0, 2 * day, 2, 1],
            [1, day, -0, 1],
          ]),
          { metrics: ["mape"], aggregation: { kind: "horizons" } },
        ),
      ),
    );

    expect(zero).toMatchObject({ reason: "zero-actual", metric: "mape", bucket: 0 });

    // Prophet skips MAPE whenever any |actual| is below 1e-8, but still divides for MDAPE.
    const nearZero = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(point([[0, day, -1e-9, 0]]), {
          metrics: ["mdape", "mape"],
          aggregation: { kind: "overall" },
        }),
      ),
    );

    expect(nearZero).toMatchObject({ reason: "zero-actual", metric: "mape", stage: "division" });

    const scored = await Effect.runPromise(
      performanceMetrics(
        point([
          [0, day, 1e-8, 0],
          [0, 2 * day, 1e-9, 0],
        ]),
        { metrics: ["mdape"], aggregation: { kind: "rows" } },
      ),
    );

    expect(scored.kind === "rows" && scored.points.map((entry) => entry.scores[0]?.value)).toEqual([
      1, 1,
    ]);

    const threshold = await Effect.runPromise(
      performanceMetrics(point([[0, day, 1e-8, 0]]), {
        metrics: ["mape"],
        aggregation: { kind: "overall" },
      }),
    );

    expect(threshold.kind === "overall" && threshold.bucket.scores).toEqual([
      { metric: "mape", value: 1 },
    ]);

    const mdape = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(
          point([
            [0, day, 1, 0],
            [0, 2 * day, 0, 1],
          ]),
          {
            metrics: ["mdape"],
            aggregation: { kind: "rolling", window: { kind: "count", rows: 1 } },
          },
        ),
      ),
    );

    expect(mdape).toMatchObject({ reason: "zero-actual", metric: "mdape", bucket: 1 });

    const removed = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(
          point([[0, day, 1, 0]]),
          JSON.parse(
            JSON.stringify({
              metrics: ["mape"],
              aggregation: { kind: "overall" },
              mapeZeroActual: "exclude",
            }),
          ),
        ),
      ),
    );

    expect(removed).toBeInstanceOf(InputValidationError);
  });

  it("keeps nonnegative finite scores, aggregation identities and permutation-invariant buckets", async () => {
    for (let seed = 1; seed <= 30; seed += 1) {
      const values = Array.from(
        { length: 18 },
        (_, index) =>
          [
            index % 2,
            ((index % 3) + 1) * day,
            ((seed * 13 + index * 11) % 17) + 1,
            ((seed * 7 + index * 19) % 23) - 5,
          ] as const,
      );

      const source = point(values);
      const reverse = point(values.slice().reverse());

      const options = {
        metrics: ["mae", "mse", "rmse", "smape"] as const,
        aggregation: { kind: "overall" as const },
      };

      const first = await Effect.runPromise(performanceMetrics(source, options));
      const second = await Effect.runPromise(performanceMetrics(reverse, options));

      if (first.kind !== "overall" || second.kind !== "overall") continue;

      for (const score of first.bucket.scores) {
        expect(Number.isFinite(score.value) && score.value >= 0).toBe(true);
        expect(score.value).toBeCloseTo(
          second.bucket.scores.find((entry) => entry.metric === score.metric)?.value ?? NaN,
          10,
        );
      }

      const value = (name: string) =>
        first.bucket.scores.find((entry) => entry.metric === name)?.value ?? NaN;

      expect(value("mse") + 1e-10).toBeGreaterThanOrEqual(value("mae") ** 2);
      expect(value("rmse") ** 2).toBeCloseTo(value("mse"), 10);
    }
  });

  it("matches an independent recomputation of every exact w-row window", async () => {
    const values = Array.from({ length: 23 }, (_, index) => {
      const fold = index % 3;
      const horizon = ((index * 7) % 6) + 1 + (index % 5 === 0 ? 0 : (index % 2) * 2);

      return [fold, horizon * day, ((index * 37) % 19) + 1.25, ((index * 11) % 13) - 4] as const;
    });

    const source = point(values);
    const sorted = Array.from(source.rows).sort((left, right) => left.horizonMs - right.horizonMs);
    const horizons = Array.from(new Set(sorted.map((row) => row.horizonMs)));
    const absolute = (row: CrossValidationPointRow) => Math.abs(row.actual - row.predicted);
    const percentage = (row: CrossValidationPointRow) => absolute(row) / Math.abs(row.actual);

    for (let windowRows = 1; windowRows <= values.length; windowRows += 1) {
      const report = await Effect.runPromise(
        performanceMetrics(source, {
          metrics: ["mae", "mdape"],
          aggregation: { kind: "rolling", window: { kind: "count", rows: windowRows } },
        }),
      );

      if (report.kind !== "rolling") throw new Error("Expected a rolling report");

      const expected = horizons.flatMap((horizon) => {
        const start = sorted.findIndex((row) => row.horizonMs === horizon);
        const end = sorted.filter((row) => row.horizonMs <= horizon).length;

        if (end < windowRows) return [];

        // Whole groups back to the one that fills the window, then a share of that oldest group.
        let mean = 0;
        let remaining = windowRows;

        for (const group of horizons.filter((candidate) => candidate <= horizon).reverse()) {
          const members = sorted.filter((row) => row.horizonMs === group);
          const share = Math.min(1, remaining / members.length);

          mean += (share * members.reduce((total, row) => total + absolute(row), 0)) / windowRows;
          remaining -= members.length;

          if (remaining <= 0) break;
        }

        // MDAPE takes the whole group, or fills it to w with the rows just before it.
        const window = sorted
          .slice(Math.min(start, end - windowRows), end)
          .map(percentage)
          .sort((left, right) => left - right);

        const middle = Math.floor(window.length / 2);

        const median =
          window.length % 2 === 1
            ? (window[middle] ?? NaN)
            : ((window[middle - 1] ?? NaN) + (window[middle] ?? NaN)) / 2;

        return [{ horizon, mean, median }];
      });

      expect(report.points.map((entry) => entry.horizonMs)).toEqual(
        expected.map(({ horizon }) => horizon),
      );

      for (const [index, entry] of report.points.entries()) {
        expect(entry.scores[0]?.value).toBeCloseTo(expected[index]?.mean ?? NaN, 12);
        expect(entry.scores[1]?.value).toBe(expected[index]?.median);
      }
    }
  });

  it("rolls many distinct horizons without rescanning each whole window", async () => {
    const source = point(
      Array.from(
        { length: 2_000 },
        (_, index) => [0, (index + 1) * 1000, (index % 9) + 1, 0] as const,
      ),
    );

    const report = await Effect.runPromise(
      performanceMetrics(source, {
        metrics: ["mae", "mdape"],
        aggregation: { kind: "rolling", window: { kind: "fraction", value: 0.5 } },
      }),
    );

    expect(report.kind === "rolling" && [report.windowRows, report.points.length]).toEqual([
      1_000, 1_001,
    ]);
  });

  it("returns typed input and arithmetic failures without mutating input", async () => {
    const source = point([[0, day, 1e308, -1e308]]);

    const square = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(point([[0, day, 1e200, 0]]), {
          metrics: ["mse"],
          aggregation: { kind: "overall" },
        }),
      ),
    );

    expect(square).toMatchObject({ reason: "non-finite", metric: "mse", stage: "square" });

    const difference = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(source, { metrics: ["mae"], aggregation: { kind: "overall" } }),
      ),
    );

    expect(difference).toMatchObject({ reason: "non-finite", stage: "difference" });
    expect(source.rows[0]?.actual).toBe(1e308);

    // Prophet totals each horizon group before dividing, so a group can overflow on its own.
    const sum = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(
          point([
            [0, day, 1e308, 0],
            [1, day, 1e308, 0],
          ]),
          { metrics: ["mae"], aggregation: { kind: "horizons" } },
        ),
      ),
    );

    expect(sum).toMatchObject({ reason: "non-finite", metric: "mae", stage: "sum", bucket: 0 });

    for (const input of [
      { metrics: [], aggregation: { kind: "rows" } },
      { metrics: ["mae", "mae"], aggregation: { kind: "overall" } },
      {
        metrics: ["mape"],
        aggregation: { kind: "rolling", window: { kind: "fraction", value: 0 } },
      },
      { metrics: ["mae"], aggregation: { kind: "rolling", window: { kind: "count", rows: 4 } } },
    ]) {
      const invalid = await Effect.runPromise(
        Effect.flip(performanceMetrics(point([[0, day, 1, 2]]), JSON.parse(JSON.stringify(input)))),
      );

      expect(invalid).toBeInstanceOf(InputValidationError);
    }

    expect(square).toBeInstanceOf(EvaluationMetricError);
  });
});

describe("performanceMetrics with calendar-month horizons", () => {
  const calendar = (
    values: ReadonlyArray<readonly [number, string, string, number, number]>,
  ): PointCrossValidationResult => ({
    kind: "point",
    plan,
    folds: [],
    rows: values.map(([fold, cutoff, timestamp, actual, predicted]) => ({
      fold,
      cutoff: Date.parse(cutoff),
      timestamp: Date.parse(timestamp),
      horizonMs: Date.parse(timestamp) - Date.parse(cutoff),
      actual,
      predicted,
    })),
  });

  // Same-month, leap-day, month-end and year-rollover forecasts, deliberately out of month order.
  const source = calendar([
    [0, "2024-02-26T00:00:00.000Z", "2024-03-01T00:00:00.000Z", 4, 2],
    [0, "2024-02-26T00:00:00.000Z", "2024-02-29T23:59:59.999Z", 1, 0],
    [1, "2024-12-30T00:00:00.000Z", "2024-12-31T00:00:00.000Z", 3, 0],
    [1, "2024-12-30T00:00:00.000Z", "2025-01-01T00:00:00.000Z", 8, 0],
    [1, "2024-12-30T00:00:00.000Z", "2025-02-28T00:00:00.000Z", 2, 1],
  ]);

  it("counts months from the cutoff's UTC month, with zero for the cutoff month", async () => {
    const report = await Effect.runPromise(
      performanceMetrics(source, {
        metrics: ["mae"],
        aggregation: { kind: "rows" },
        horizon: "calendar-month",
      }),
    );

    expect(report.kind === "rows" && report.horizon).toBe("calendar-month");
    expect(
      report.kind === "rows" &&
        report.points.map((entry) => [
          entry.fold,
          entry.horizonMonths,
          entry.horizonMs,
          entry.scores[0]?.value,
        ]),
    ).toEqual([
      [0, 0, Date.parse("2024-02-29T23:59:59.999Z") - Date.parse("2024-02-26T00:00:00.000Z"), 1],
      [1, 0, day, 3],
      [0, 1, 4 * day, 2],
      [1, 1, 2 * day, 8],
      [1, 2, 60 * day, 1],
    ]);
  });

  it("groups and rolls by month exactly as Prophet's monthly windows do", async () => {
    const options = { metrics: ["mae", "mdape"], horizon: "calendar-month" } as const;

    const horizons = await Effect.runPromise(
      performanceMetrics(source, { ...options, aggregation: { kind: "horizons" } }),
    );

    const rolling = await Effect.runPromise(
      performanceMetrics(source, {
        ...options,
        aggregation: { kind: "rolling", window: { kind: "count", rows: 3 } },
      }),
    );

    expect(
      horizons.kind === "horizons" &&
        horizons.points.map((entry) => [
          entry.horizonMonths,
          entry.rowCount,
          entry.scores.map((score) => score.value),
        ]),
    ).toEqual([
      [0, 2, [2, 1]],
      [1, 2, [5, 0.75]],
      [2, 1, [1, 0.5]],
    ]);

    // Month 2's window is months 1 and 2. Month 1's window takes half of month 0's sum, and its
    // MDAPE borrows month 0's last row in input order.
    expect(
      rolling.kind === "rolling" &&
        rolling.points.map((entry) => [
          entry.horizonMonths,
          entry.scores.map((score) => score.value),
        ]),
    ).toEqual([
      [1, [(4 + 10 - 2) / 3, 1]],
      [2, [(10 + 1) / 3, 0.5]],
    ]);
  });

  it("scores overall like duration horizons and tags only bucketed reports with their unit", async () => {
    const overall = {
      metrics: ["mae", "rmse", "mdape"],
      aggregation: { kind: "overall" },
    } as const;

    const monthly = await Effect.runPromise(
      performanceMetrics(source, { ...overall, horizon: "calendar-month" }),
    );

    const duration = await Effect.runPromise(performanceMetrics(source, overall));

    expect(monthly).toEqual(duration);
    expect(monthly).not.toHaveProperty("horizon");

    const exact = await Effect.runPromise(
      performanceMetrics(source, { metrics: ["mae"], aggregation: { kind: "horizons" } }),
    );

    expect(exact.kind === "horizons" && exact.horizon).toBe("duration");
    expect(exact.kind === "horizons" && exact.points[0]).not.toHaveProperty("horizonMonths");
  });

  it("rejects unknown horizon units", async () => {
    const invalid = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(
          source,
          JSON.parse(
            JSON.stringify({ metrics: ["mae"], aggregation: { kind: "rows" }, horizon: "M" }),
          ),
        ),
      ),
    );

    expect(invalid).toBeInstanceOf(InputValidationError);
  });
});
