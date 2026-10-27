"""Custom metrics registered with Prophet 1.4.0's `register_performance_metric`, as Python users add them.

The fixture generator and the benchmark's Python adapter both import this module, so the two
check Effect against the same definitions. `tools/prophet/custom-metrics.ts` defines each one again
as an Effect custom metric of the same name.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd
from prophet.diagnostics import register_performance_metric, rolling_mean_by_h


def rolling_statistic_by_h(
    x: np.ndarray, h: np.ndarray, w: int, name: str, statistic: Any
) -> pd.DataFrame:
    """Prophet's `rolling_median_by_h` windows, written independently, with any statistic.

    `performance_metrics` passes values sorted by horizon. Each horizon's window is its own rows,
    filled to `w` with the rows just before them when it has fewer; a horizon that can't be filled
    gets no value.
    """

    horizons, starts = np.unique(h, return_index=True)
    ends = [*starts[1:], len(h)]
    windows = [(horizon, min(start, end - w), end) for horizon, start, end in zip(horizons, starts, ends)]

    return pd.DataFrame({
        "horizon": [horizon for horizon, first, _ in windows if first >= 0],
        name: [statistic(x[first:end]) for _, first, end in windows if first >= 0],
    })


def per_row_metric(df: pd.DataFrame, name: str, values: pd.Series) -> pd.DataFrame:
    """A custom metric's `rolling_window < 0` result, as Prophet's built-in metrics return it."""

    return pd.DataFrame({"horizon": df["horizon"], name: values})


# Effect defines each metric below with a per-row score and a reducer of the same name. On the
# fixture cases every score is a short binary fraction, or shares one value within a horizon, as
# the built-in metrics' scores do.
@register_performance_metric
def pinball75(df: pd.DataFrame, w: int) -> pd.DataFrame:
    error = df["y"] - df["yhat"]
    loss = np.maximum(0.75 * error, -0.25 * error)

    if w < 0:
        return per_row_metric(df, "pinball75", loss)

    return rolling_mean_by_h(x=loss.values, h=df["horizon"].values, w=w, name="pinball75")


@register_performance_metric
def root_mse(df: pd.DataFrame, w: int) -> pd.DataFrame:
    error = df["y"] - df["yhat"]
    square = error * error

    if w < 0:
        return per_row_metric(df, "root_mse", np.sqrt(square))

    result = rolling_mean_by_h(x=square.values, h=df["horizon"].values, w=w, name="root_mse")
    result["root_mse"] = np.sqrt(result["root_mse"])

    return result


@register_performance_metric
def wape(df: pd.DataFrame, w: int) -> pd.DataFrame:
    error = (df["y"] - df["yhat"]).abs()
    actual = df["y"].abs()

    if w < 0:
        return per_row_metric(df, "wape", error / actual)

    numerator = rolling_mean_by_h(x=error.values, h=df["horizon"].values, w=w, name="wape")
    denominator = rolling_mean_by_h(x=actual.values, h=df["horizon"].values, w=w, name="wape")
    numerator["wape"] = numerator["wape"] / denominator["wape"]

    return numerator


def register_ape_quantile(name: str, probability: float) -> str:
    """Register numpy's linear quantile of absolute percentage errors over the median's windows."""

    def metric(df: pd.DataFrame, w: int) -> pd.DataFrame:
        ape = np.abs((df["y"] - df["yhat"]) / df["y"])

        if w < 0:
            return per_row_metric(df, name, ape)

        return rolling_statistic_by_h(
            ape.values,
            df["horizon"].values,
            w,
            name,
            lambda values: float(np.quantile(values, probability, method="linear")),
        )

    metric.__name__ = name
    register_performance_metric(metric)

    return name


CUSTOM_METRIC_NAMES = (
    "pinball75",
    "root_mse",
    "wape",
    register_ape_quantile("ape_q0", 0.0),
    register_ape_quantile("ape_q30", 0.3),
    register_ape_quantile("ape_q50", 0.5),
    register_ape_quantile("ape_q90", 0.9),
    register_ape_quantile("ape_q100", 1.0),
)
