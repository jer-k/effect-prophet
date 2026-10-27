import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import {
  EvaluationMetricError,
  performanceMetrics,
  type CrossValidationIntervalRow,
  type MetricName,
  type MetricSelection,
} from "../../../src/index";
import { customMetrics } from "../../../tools/prophet/custom-metrics";

const day = 86_400_000;

const firstCutoff = Date.UTC(2024, 0, 1);

const builtInNames: ReadonlyArray<string> = [
  "mae",
  "mse",
  "rmse",
  "mape",
  "mdape",
  "smape",
  "coverage",
] satisfies ReadonlyArray<MetricName>;

const selection = (name: string): MetricSelection<string> => {
  const builtIn = builtInNames.find((candidate): candidate is MetricName => candidate === name);
  const custom = customMetrics.find((metric) => metric.name === name);
  const selected = builtIn ?? custom;

  if (selected === undefined) throw new Error(`Fixture metric ${name} has no Effect definition`);

  return selected;
};

const monthOf = (epoch: number) =>
  new Date(epoch).getUTCFullYear() * 12 + new Date(epoch).getUTCMonth();

// A bucket's horizon in the case's unit: elapsed milliseconds or calendar months.
const horizonOf = (point: { readonly horizonMs: number } | { readonly horizonMonths: number }) =>
  "horizonMonths" in point ? point.horizonMonths : point.horizonMs;

describe("Prophet 1.4.0 performance_metrics compatibility", () => {
  it("reproduces every aggregation bit for bit, including split windows, borrowed rows and calendar months", async () => {
    const { evaluationMetrics } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of evaluationMetrics.cases) {
      const rows: ReadonlyArray<CrossValidationIntervalRow> = referenceCase.rows.map((row) => ({
        ...row,
        cutoff: firstCutoff + row.fold * 7 * day,
        timestamp: firstCutoff + row.fold * 7 * day + row.horizonMs,
      }));

      const source = { kind: "intervals" as const, rows };

      // Prophet's `monthly=True` subtracts month periods; this recomputes them independently.
      const rowHorizon = (row: CrossValidationIntervalRow) =>
        referenceCase.horizon === "calendar-month"
          ? monthOf(row.timestamp) - monthOf(row.cutoff)
          : row.horizonMs;

      for (const expected of referenceCase.aggregations) {
        const label = `${referenceCase.id} ${JSON.stringify(expected.aggregation)}`;
        const [first, ...rest] = expected.metrics;

        const metrics: readonly [MetricSelection<string>, ...Array<MetricSelection<string>>] = [
          selection(first),
          ...rest.map(selection),
        ];

        const report = await Effect.runPromise(
          performanceMetrics(source, {
            metrics,
            aggregation: expected.aggregation,
            horizon: referenceCase.horizon,
          }),
        );

        if (report.kind !== "overall") expect(report.horizon, label).toBe(referenceCase.horizon);

        // Prophet reports an overall score at the largest horizon, in the case's unit.
        const points =
          report.kind === "overall"
            ? [{ horizonMs: Math.max(...rows.map(rowHorizon)), ...report.bucket }]
            : report.points;

        if (report.kind === "rolling") expect(report.windowRows, label).toBe(expected.windowRows);
        expect(points, label).toHaveLength(expected.points.length);

        // Prophet keeps the input index on per-row results; Effect returns them in horizon order,
        // with equal horizons in input order.
        const order = rows
          .map((row, index) => ({ row, index }))
          .sort((left, right) => rowHorizon(left.row) - rowHorizon(right.row))
          .map(({ index }) => index);

        if (report.kind === "rows") {
          expect(
            report.points.map((point) => [point.fold, point.timestamp]),
            label,
          ).toEqual(order.map((index) => [rows[index]?.fold, rows[index]?.timestamp]));
        }

        const references =
          report.kind === "rows"
            ? order.map((index) => expected.points.find((candidate) => candidate.row === index))
            : expected.points;

        for (const [index, point] of points.entries()) {
          const reference = references[index];

          expect(horizonOf(point), `${label} point ${index}`).toBe(
            reference === undefined ? undefined : horizonOf(reference),
          );

          for (const score of point.scores) {
            expect(score.value, `${label} point ${index} ${score.metric}`).toBe(
              reference?.scores[score.metric],
            );
          }
        }

        // Prophet silently drops MAPE when an actual is near zero; Effect fails instead.
        if (referenceCase.metrics.includes("mape") && !expected.metrics.includes("mape")) {
          const error = await Effect.runPromise(
            Effect.flip(
              performanceMetrics(source, {
                metrics: ["mape"],
                aggregation: expected.aggregation,
                horizon: referenceCase.horizon,
              }),
            ),
          );

          expect(error, label).toBeInstanceOf(EvaluationMetricError);
          expect(error, label).toMatchObject({ metric: "mape", reason: "zero-actual" });
        }
      }
    }
  });
});
