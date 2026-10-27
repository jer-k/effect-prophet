import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  MetricNameSchema,
  MetricNamesSchema,
  PointMetricNameSchema,
} from "../../src/internal/metric-names";

describe("built-in metric names", () => {
  it("lists Prophet's seven metrics, with coverage the only interval metric", () => {
    expect(MetricNameSchema.literals).toEqual([
      "mae",
      "mse",
      "rmse",
      "mape",
      "mdape",
      "smape",
      "coverage",
    ]);
    expect(PointMetricNameSchema.literals).toEqual(
      MetricNameSchema.literals.filter((metric) => metric !== "coverage"),
    );
  });

  it("accepts a selection of unique names", () => {
    expect(Schema.decodeUnknownSync(MetricNamesSchema)(["rmse", "coverage"])).toEqual([
      "rmse",
      "coverage",
    ]);
  });

  it("rejects empty, repeated and unknown selections", () => {
    const decode = Schema.decodeUnknownExit(MetricNamesSchema);

    expect(decode([])._tag).toBe("Failure");
    expect(decode(["mae", "mae"])._tag).toBe("Failure");
    expect(decode(["wape"])._tag).toBe("Failure");
  });
});
