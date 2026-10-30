import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  AnyMetricNameSchema,
  CustomMetricNameSchema,
  MetricNameSchema,
  MetricNamesSchema,
  PointMetricNameSchema,
  isPointMetricName,
  metricName,
  repeatedMetricName,
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
    expect(Schema.decodeSync(MetricNamesSchema)(["rmse", "coverage"])).toEqual([
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

  it("tells point metrics from coverage and custom definitions", () => {
    expect(isPointMetricName("rmse")).toBe(true);
    expect(isPointMetricName("coverage")).toBe(false);
    expect(isPointMetricName({ name: "rmse" })).toBe(false);
    expect(metricName("mae")).toBe("mae");
    expect(metricName({ name: "wape" })).toBe("wape");
    expect(repeatedMetricName(["mae", "wape"])).toBeUndefined();
    expect(repeatedMetricName(["wape", "wape"])).toMatchObject({ path: [] });
  });
});

describe("custom metric names", () => {
  const accepts = (name: string) => Schema.decodeExit(CustomMetricNameSchema)(name)._tag;

  it("accepts Python identifiers of up to 64 ASCII characters", () => {
    for (const name of ["wape", "_private", "p90_error", "Q1", "x".repeat(64)]) {
      expect(accepts(name), name).toBe("Success");
    }
  });

  it("rejects built-in names, non-identifiers and long names", () => {
    for (const name of [
      "mae",
      "coverage",
      "",
      "1st",
      "has-dash",
      "has space",
      "é",
      "x".repeat(65),
    ]) {
      expect(accepts(name), name).toBe("Failure");
    }
  });

  it("reports either kind of name in metric errors", () => {
    const decode = Schema.decodeUnknownExit(AnyMetricNameSchema);

    expect(decode("mae")._tag).toBe("Success");
    expect(decode("wape")._tag).toBe("Success");
    expect(decode("not a name")._tag).toBe("Failure");
  });
});
