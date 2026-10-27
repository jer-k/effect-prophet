import { Schema } from "effect";

/** Prophet's built-in point-error metrics; only these can rank a model. */
export const PointMetricNameSchema = Schema.Literals([
  "mae",
  "mse",
  "rmse",
  "mape",
  "mdape",
  "smape",
]);

/** Prophet 1.4.0's seven built-in `performance_metrics` names. */
export const MetricNameSchema = Schema.Literals([...PointMetricNameSchema.literals, "coverage"]);

/** A non-empty selection of built-in metrics, each named once. */
export const MetricNamesSchema = Schema.NonEmptyArray(MetricNameSchema).check(
  Schema.makeFilter((metrics) => {
    if (new Set(metrics).size !== metrics.length) {
      return { path: [], issue: "Metric names must be unique" };
    }
  }),
);
