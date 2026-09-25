import { Effect } from "effect";
import { beforeAll, describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../integration/helpers/prophet-fixture";

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
    expect(result.bucket.scores).toEqual(
      [
        { metric: "mae", value: 1.75 },
        { metric: "mse", value: 3.25 },
        { metric: "rmse", value: Math.sqrt(3.25) },
        { metric: "mape", value: 0.4375 },
        { metric: "mdape", value: 0.5, includedCount: 4, excludedCount: 0 },
        { metric: "smape", value: (2 / 3 + 2 / 3 + 2 / 3 + 2 / 7) / 4 },
      ].map((score) =>
        score.metric === "mape" ? { ...score, includedCount: 4, excludedCount: 0 } : score,
      ),
    );
  });

  it("preserves fold/input row order and aggregates exact equal horizons across folds", async () => {
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
      [0, 2 * day, 1, 1],
      [0, day, 1, 1],
      [1, day, 1, 3],
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

  it("uses whole equal-horizon groups for right-aligned count and fraction windows", async () => {
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

      expect(
        report.kind === "rolling" &&
          report.points.map((entry) => [entry.horizonMs, entry.rowCount, entry.scores[0]?.value]),
      ).toEqual([
        [day, 2, 2],
        [2 * day, 3, 3],
        [3 * day, 2, 6],
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

  it("enforces zero policies with bucket-local included/excluded counts", async () => {
    const source = point([
      [0, day, 0, 0],
      [0, 2 * day, 2, 1],
      [1, day, -0, 1],
    ]);

    const error = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(source, { metrics: ["mape"], aggregation: { kind: "overall" } }),
      ),
    );

    expect(error).toMatchObject({ reason: "zero-actual", metric: "mape", bucket: 0 });

    const report = await Effect.runPromise(
      performanceMetrics(source, {
        metrics: ["mape", "mdape"],
        aggregation: { kind: "overall" },
        mapeZeroActual: "exclude",
      }),
    );

    expect(report.kind === "overall" && report.bucket.scores).toEqual([
      { metric: "mape", value: 0.5, includedCount: 1, excludedCount: 2 },
      { metric: "mdape", value: 0.5, includedCount: 1, excludedCount: 2 },
    ]);

    const empty = await Effect.runPromise(
      Effect.flip(
        performanceMetrics(point([[0, day, 0, 0]]), {
          metrics: ["mdape"],
          aggregation: { kind: "rows" },
          mapeZeroActual: "exclude",
        }),
      ),
    );

    expect(empty).toMatchObject({ reason: "empty-bucket", metric: "mdape", bucket: 0 });

    // Prophet skips MAPE globally below 1e-8; an exact nonzero actual remains here.
    const nearZero = await Effect.runPromise(
      performanceMetrics(point([[0, day, 1e-9, 0]]), {
        metrics: ["mape", "mdape"],
        aggregation: { kind: "overall" },
      }),
    );

    expect(
      nearZero.kind === "overall" && nearZero.bucket.scores.map((score) => score.value),
    ).toEqual([1, 1]);
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

  it("matches recomputed whole-group buckets including MDAPE and excluded zeros", async () => {
    const values = [
      [0, day, 0, 1],
      [1, day, 3, 1],
      [0, 2 * day, 5, 1],
      [0, 3 * day, 2, 0],
      [1, 3 * day, 0, 0],
      [0, 4 * day, 7, 2],
    ] as const;

    const source = point(values);

    const options = {
      metrics: ["mae", "mse", "rmse", "mape", "mdape", "smape"] as const,
      mapeZeroActual: "exclude" as const,
    };

    const report = await Effect.runPromise(
      performanceMetrics(source, {
        ...options,
        aggregation: { kind: "rolling", window: { kind: "count", rows: 3 } },
      }),
    );

    expect(report.kind).toBe("rolling");

    if (report.kind !== "rolling") return;

    for (const bucket of report.points) {
      const sorted = source.rows
        .filter((row) => row.horizonMs <= bucket.horizonMs)
        .sort((left, right) => left.horizonMs - right.horizonMs);

      const distinct = Array.from(new Set(sorted.map((row) => row.horizonMs))).reverse();
      const selected: Array<CrossValidationPointRow> = [];

      for (const horizon of distinct) {
        selected.unshift(...sorted.filter((row) => row.horizonMs === horizon));

        if (selected.length >= 3) break;
      }

      const expected = await Effect.runPromise(
        performanceMetrics(
          { ...source, rows: selected },
          { ...options, aggregation: { kind: "overall" } },
        ),
      );

      expect(expected.kind === "overall" && bucket.scores).toEqual(
        expected.kind === "overall" && expected.bucket.scores,
      );
      expect(bucket.rowCount).toBe(selected.length);
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

    expect(report.kind === "rolling" && report.points.length).toBe(1_001);
    expect(report.kind === "rolling" && report.points.at(-1)?.rowCount).toBe(1_000);
  });

  it("matches pinned, unmodified Prophet 1.4.0 diagnostics where contracts coincide", async () => {
    const { evaluationMetrics: fixture } = await Effect.runPromise(loadProphetFixtureBundle());

    const source: IntervalCrossValidationResult = {
      kind: "intervals",
      plan,
      folds: [],
      simulation: simulationIdentity,
      sampleCount: 10,
      intervalWidth: 0.8,
      rows: fixture.rows.map((row) => ({
        fold: 0,
        cutoff: Date.UTC(2024, 0, 1),
        timestamp: Date.UTC(2024, 0, 1) + row.horizonMs,
        ...row,
      })),
    };

    const all = ["mae", "mse", "rmse", "mape", "mdape", "smape", "coverage"] as const;

    const aggregations = [
      { kind: "rows" },
      { kind: "horizons" },
      { kind: "rolling", window: { kind: "fraction", value: 0.5 } },
      { kind: "overall" },
    ] as const;

    for (const aggregation of aggregations) {
      const report = await Effect.runPromise(
        performanceMetrics(source, { metrics: all, aggregation }),
      );

      const expected = fixture.expected[aggregation.kind];
      const points = report.kind === "overall" ? [report.bucket] : report.points;

      expect(points).toHaveLength(expected.length);

      for (const [index, bucket] of points.entries()) {
        const reference = expected[index];
        expect(reference).toBeDefined();

        if (reference === undefined) continue;

        for (const score of bucket.scores) {
          expect(score.value).toBeCloseTo(reference.scores[score.metric], 10);
        }
      }
    }
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
