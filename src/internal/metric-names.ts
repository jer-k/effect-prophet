import { Predicate, Schema } from "effect";

/** Prophet's built-in point-error metrics; only these can rank a model. */
export const PointMetricNameSchema = Schema.Literals([
  "mae",
  "mse",
  "rmse",
  "mape",
  "mdape",
  "smape",
]);

/** Whether a metric selection is a built-in point-error metric's name. */
export const isPointMetricName = Schema.is(PointMetricNameSchema);

/** Prophet 1.4.0's seven built-in `performance_metrics` names. */
export const MetricNameSchema = Schema.Literals([...PointMetricNameSchema.literals, "coverage"]);

const builtInNames: ReadonlySet<string> = new Set(MetricNameSchema.literals);

/**
 * A caller-defined metric's name. Prophet registers a custom metric under its function's name, so
 * this is a Python identifier of at most 64 ASCII characters that no built-in metric uses.
 */
export const CustomMetricNameSchema = Schema.String.check(
  Schema.makeFilter((name) => /^[A-Za-z_][A-Za-z0-9_]{0,63}$/.test(name), {
    message: "Expected 1 to 64 ASCII letters, digits or underscores, not starting with a digit",
  }),
  Schema.makeFilter((name) => !builtInNames.has(name), {
    message: "Custom metric names cannot reuse a built-in metric name",
  }),
);

/** A built-in or custom metric name, as scores and metric errors report it. */
export const AnyMetricNameSchema = Schema.Union([MetricNameSchema, CustomMetricNameSchema]);

/** The name a metric selection scores under: a built-in name, or a definition's `name`. */
export const metricName = (metric: string | { readonly name: string }): string =>
  Predicate.isString(metric) ? metric : metric.name;

/** A filter issue when a selection names any metric twice. */
export const repeatedMetricName = (names: ReadonlyArray<string>) =>
  new Set(names).size === names.length
    ? undefined
    : { path: [], issue: "Metric names must be unique" };

/** A non-empty selection of built-in metrics, each named once. */
export const MetricNamesSchema = Schema.NonEmptyArray(MetricNameSchema).check(
  Schema.makeFilter(repeatedMetricName),
);
