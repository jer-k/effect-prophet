import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import {
  EvaluationMetricError,
  performanceMetrics,
  type CrossValidationIntervalRow,
  type MetricName,
} from "../../../src/index";

const day = 86_400_000;

const firstCutoff = Date.UTC(2024, 0, 1);

describe("Prophet 1.4.0 performance_metrics compatibility", () => {
  it("reproduces every aggregation bit for bit, including split windows and borrowed rows", async () => {
    const { evaluationMetrics } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of evaluationMetrics.cases) {
      const rows: ReadonlyArray<CrossValidationIntervalRow> = referenceCase.rows.map((row) => ({
        ...row,
        cutoff: firstCutoff + row.fold * 7 * day,
        timestamp: firstCutoff + row.fold * 7 * day + row.horizonMs,
      }));

      const source = { kind: "intervals" as const, rows };

      for (const expected of referenceCase.aggregations) {
        const label = `${referenceCase.id} ${JSON.stringify(expected.aggregation)}`;
        const [first, ...rest] = expected.metrics;
        const metrics: readonly [MetricName, ...Array<MetricName>] = [first, ...rest];

        const report = await Effect.runPromise(
          performanceMetrics(source, { metrics, aggregation: expected.aggregation }),
        );

        const points =
          report.kind === "overall"
            ? [{ horizonMs: Math.max(...rows.map((row) => row.horizonMs)), ...report.bucket }]
            : report.points;

        if (report.kind === "rolling") expect(report.windowRows, label).toBe(expected.windowRows);
        expect(points, label).toHaveLength(expected.points.length);

        // Prophet keeps the input index on per-row results; Effect returns them in horizon order,
        // with equal horizons in input order.
        const order = rows
          .map((row, index) => ({ row, index }))
          .sort((left, right) => left.row.horizonMs - right.row.horizonMs)
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

          expect(point.horizonMs, `${label} point ${index}`).toBe(reference?.horizonMs);

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
