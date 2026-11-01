"""Public Prophet 1.4.0 evaluation mappings; no private diagnostics kernels."""

from __future__ import annotations

import copy
import json
import math
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from prophet.diagnostics import cross_validation, performance_metrics, register_performance_metric, rolling_mean_by_h

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "tools" / "prophet"))
from custom_metrics import CUSTOM_METRIC_NAMES, per_row_metric

POINT_METRICS = ["mae", "rmse", "smape", "mape"]

# Built-in metrics that never drop out of performance_metrics' result, then every custom metric.
PARITY_METRICS = ["mae", "rmse", "smape", "mdape", *CUSTOM_METRIC_NAMES]

PARITY_PHASES = ("evaluation-metrics-monthly", "evaluation-metrics-custom", "evaluation-search-custom")

# Phases timing cross_validation's parallel modes, and the sequential work each one parallelizes.
PARALLEL_PHASES = {
    "evaluation-point-threads": ("evaluation-point", "threads"),
    "evaluation-point-processes": ("evaluation-point", "processes"),
    "evaluation-intervals-threads": ("evaluation-intervals", "threads"),
    "evaluation-intervals-processes": ("evaluation-intervals", "processes"),
    "evaluation-search-threads": ("evaluation-search", "threads"),
    "evaluation-search-processes": ("evaluation-search", "processes"),
}

# The custom metric a custom search ranks candidates by.
CUSTOM_OBJECTIVE = "wape"

METRIC_PHASES = ("evaluation-metrics", "evaluation-metrics-monthly", "evaluation-metrics-custom", "evaluation-metrics-scaled")

# MASE as a Python user would register it, for evaluation-metrics-scaled: the lag its naive forecast
# repeats, the row before when None, as Effect's `scaledErrorMetric` defines each one.
SCALED_METRICS = {"mase": None, "mase_weekly": pd.Timedelta(days=7)}


def naive_errors(training, lag):
    """Absolute errors of repeating the row before, or the value observed exactly `lag` earlier."""
    if lag is None:
        return training["y"].diff().abs().iloc[1:]
    values = dict(zip(training["ds"], training["y"]))
    return pd.Series([abs(value - values[timestamp - lag]) for timestamp, value in zip(training["ds"], training["y"])
                      if timestamp - lag in values], dtype=float)


def fold_scales(history, cutoffs, lag):
    """Each cutoff's MASE scale: the naive forecast's mean absolute error on the rows it trains on."""
    scales = {}
    for cutoff in cutoffs:
        errors = naive_errors(history.loc[history["ds"] <= cutoff], lag)
        scale = float(errors.mean()) if len(errors) else math.nan
        if not math.isfinite(scale) or scale == 0:
            raise ValueError("Python MASE has no usable scale")
        scales[cutoff] = scale
    return scales


def register_scaled_metrics(history):
    """Register each MASE metric with Prophet, scaled by `history`, the rows cross-validation saw."""
    for name, lag in SCALED_METRICS.items():
        def metric(df, w, name=name, lag=lag):
            scales = fold_scales(history, df["cutoff"].drop_duplicates(), lag)
            scaled = (df["y"] - df["yhat"]).abs() / df["cutoff"].map(scales)
            if w < 0:
                return per_row_metric(df, name, scaled)
            return rolling_mean_by_h(x=scaled.values, h=df["horizon"].values, w=w, name=name)

        metric.__name__ = name
        register_performance_metric(metric)


def scaled_errors(history, result, cutoffs):
    """Each MASE metric's fold scales, in cutoff order, and its overall score on Python's CV rows."""
    register_scaled_metrics(history)
    overall = performance_metrics(result, metrics=list(SCALED_METRICS), rolling_window=1)
    return [{"metric": name, "scales": list(fold_scales(history, cutoffs, lag).values()),
             "overall": float(overall[name].iloc[0])}
            for name, lag in SCALED_METRICS.items()]


def metric_window(case):
    """The rolling_window that gives the same aggregation as Effect's metricAggregation."""
    return {"overall": 1, "horizons": 0, "rolling": 0.5}[case["workload"]["metricAggregation"]]


def partition(dataset, case, records_frame):
    config = case["workload"]
    count = config.get("holdoutRows", 0)
    ordered = sorted(dataset["observations"], key=lambda row: row["timestamp"])
    development = ordered[:-count] if count else ordered
    holdout = ordered[-count:] if count else []
    return records_frame(development, include_value=True), records_frame(holdout, include_value=True)


def plan(case):
    config = case["workload"]["plan"]
    cutoffs = [pd.Timestamp(value).tz_localize(None) for value in config["cutoffs"]]
    horizon = pd.Timedelta(milliseconds=config["horizonMs"])
    return cutoffs, horizon


def forecasts_regressors(case):
    return any(regressor.get("predictor") for regressor in case["workload"]["configuration"]["regressors"])


def cutoff_folds(case, history, fit_model, intervals):
    """Rolling-origin folds fitted at each cutoff, in cross_validation's frame layout.

    Prophet's cross_validation refits regressor models on the stored history, whose regressor values
    it has already standardized, so its fold forecasts drift from a fit at the cutoff: by about 15%
    on the flat regressor-model history. Effect fits each fold as fit at the cutoff would, so these
    cases do that same work through Prophet's public fit and predict.
    """
    config = case["workload"]
    cutoffs, horizon = plan(case)
    if intervals:
        np.random.seed(config["interval"]["seed"])
    frames = []
    for cutoff in cutoffs:
        training = history.loc[history["ds"] <= cutoff]
        assessment = history.loc[(history["ds"] > cutoff) & (history["ds"] <= cutoff + horizon)]
        model = fit_model(training, case)
        if intervals:
            model.uncertainty_samples = config["interval"]["samples"]
            model.interval_width = config["interval"]["intervalWidth"]
        predicted = model.predict(assessment.drop(columns="y"))
        frame = predicted[["ds", "yhat", *(["yhat_lower", "yhat_upper"] if intervals else [])]].copy()
        frame["y"] = assessment["y"].to_numpy()
        frame["cutoff"] = cutoff
        frames.append(frame)
    return pd.concat(frames, ignore_index=True)


def cv(case, dataset, configure_model, fit_model, records_frame, intervals=False, parallel=None):
    history, _ = partition(dataset, case, records_frame)
    if forecasts_regressors(case):
        return cutoff_folds(case, history, fit_model, intervals)
    config = case["workload"]
    model = fit_model(history, case)  # Python diagnostics needs a fitted, mutable full-history model.
    if intervals:
        controls = config["interval"]
        model.uncertainty_samples = controls["samples"]
        model.interval_width = controls["intervalWidth"]
        np.random.seed(controls["seed"])
    cutoffs, horizon = plan(case)
    return cross_validation(model, horizon=horizon, cutoffs=cutoffs, parallel=parallel, disable_tqdm=True)


def search(case, dataset, configure_model, fit_model, records_frame, objective="mae", parallel=None):
    config = case["workload"]
    candidates = []
    for candidate in config["candidates"]:
        request = copy.deepcopy(case)
        if config["configuration"]["growth"] != "flat":
            request["workload"]["configuration"]["changepointPriorScale"] = candidate["changepointPriorScale"]
        if candidate.get("growth") == "logistic":
            request["workload"]["configuration"]["growth"] = "logistic"
        try:
            result = cv(request, dataset, configure_model, fit_model, records_frame, parallel=parallel)
            score = float(performance_metrics(result, metrics=[objective], rolling_window=1)[objective].iloc[0])
            if not math.isfinite(score):
                raise ValueError("Nonfinite search score")
            candidates.append({"id": candidate["id"], "score": score})
        except ValueError:
            if candidate.get("growth") != "logistic":
                raise
            candidates.append({"id": candidate["id"], "failure": "missing-capacity"})
    eligible = [index for index, item in enumerate(candidates) if "score" in item]
    winner = min(eligible, key=lambda index: (candidates[index]["score"], index))
    return candidates, winner


def holdout(case, dataset, configure_model, fit_model, records_frame, selection=None):
    history, assessment = partition(dataset, case, records_frame)
    candidates, winner = selection if selection is not None else search(case, dataset, configure_model, fit_model, records_frame)
    request = copy.deepcopy(case)
    if request["workload"]["configuration"]["growth"] != "flat":
        request["workload"]["configuration"]["changepointPriorScale"] = request["workload"]["candidates"][winner]["changepointPriorScale"]
    fitted = fit_model(history, request)
    predicted = fitted.predict(assessment.drop(columns="y"))
    actual = assessment["y"].to_numpy()
    forecast = predicted["yhat"].to_numpy()
    baselines = {"last-observation": float(history["y"].iloc[-1]), "training-mean": float(history["y"].mean())}
    return {"selected": candidates[winner], "candidates": candidates,
            "actual": actual.tolist(), "predicted": forecast.tolist(),
            "mae": float(np.mean(np.abs(actual - forecast))), "baselines": baselines}


def metrics(result, case, phase, history):
    """The metric work a metrics phase times, on precomputed CV rows."""
    if phase == "evaluation-metrics":
        return performance_metrics(result, metrics=list(POINT_METRICS), rolling_window=metric_window(case))
    if phase == "evaluation-metrics-monthly":
        return performance_metrics(result, metrics=list(POINT_METRICS), rolling_window=metric_window(case), monthly=True)
    if phase == "evaluation-metrics-scaled":
        register_scaled_metrics(history)
        return performance_metrics(result, metrics=list(SCALED_METRICS), rolling_window=metric_window(case))
    return performance_metrics(result, metrics=list(CUSTOM_METRIC_NAMES), rolling_window=metric_window(case))


def metric_parity(result, case):
    """Python's metrics on its own CV rows, with the row order its horizon sort produced.

    `performance_metrics` sorts by horizon with pandas' unstable sort, which decides which rows a
    window borrows from a horizon and the order a horizon's values are summed in. Repeating the same
    copy, horizon column and sort here gives that order, so Effect can score the rows in it.
    """
    if not result.index.equals(pd.RangeIndex(len(result))):
        raise ValueError("Python CV rows are not indexed by position")
    evidence = []
    for horizon in ("duration", "calendar-month"):
        monthly = horizon == "calendar-month"
        frame = result.copy()
        if monthly:
            frame["horizon"] = frame["ds"].dt.to_period("M").astype(int) - frame["cutoff"].dt.to_period("M").astype(int)
        else:
            frame["horizon"] = frame["ds"] - frame["cutoff"]
        frame.sort_values("horizon", inplace=True)
        scores = performance_metrics(result, metrics=list(PARITY_METRICS), rolling_window=metric_window(case), monthly=monthly)
        if list(scores.columns) != ["horizon", *PARITY_METRICS]:
            raise ValueError("Python dropped a parity metric")
        points = [{"horizon": int(row.horizon) if monthly else int(row.horizon / pd.Timedelta(milliseconds=1)),
                   "scores": [float(getattr(row, name)) for name in PARITY_METRICS]}
                  for row in scores.itertuples()]
        evidence.append({"horizon": horizon, "metrics": list(PARITY_METRICS),
                         "order": [int(index) for index in frame.index], "points": points})
    return evidence


def operation(case, dataset, phase, configure_model, fit_model, records_frame):
    if phase in PARALLEL_PHASES:
        sequential, parallel = PARALLEL_PHASES[phase]
        if sequential == "evaluation-search":
            return search(case, dataset, configure_model, fit_model, records_frame, parallel=parallel)
        intervals = sequential == "evaluation-intervals"
        return cv(case, dataset, configure_model, fit_model, records_frame, intervals, parallel)
    history, _ = partition(dataset, case, records_frame)
    if phase == "evaluation-input-conversion":
        return history
    cutoffs, horizon = plan(case)
    if phase == "evaluation-plan":
        return [{"cutoff": cutoff.isoformat(), "training": int((history["ds"] <= cutoff).sum()),
                 "assessment": int(((history["ds"] > cutoff) & (history["ds"] <= cutoff + horizon)).sum())}
                for cutoff in cutoffs]
    if phase in ("evaluation-point", "cold-first-evaluation"):
        return cv(case, dataset, configure_model, fit_model, records_frame)
    if phase == "evaluation-intervals":
        return cv(case, dataset, configure_model, fit_model, records_frame, intervals=True)
    if phase in METRIC_PHASES:
        return metrics(cv(case, dataset, configure_model, fit_model, records_frame), case, phase, history)
    if phase == "evaluation-baseline":
        result = []
        for cutoff in cutoffs:
            training = history.loc[history["ds"] <= cutoff]
            assessment = history.loc[(history["ds"] > cutoff) & (history["ds"] <= cutoff + horizon)]
            values = dict(zip(training["ds"], training["y"]))
            seasonal = [float(values[timestamp - pd.Timedelta(days=7)]) for timestamp in assessment["ds"]]
            result.append({"cutoff": cutoff.isoformat(), "last": [float(training["y"].iloc[-1])] * len(assessment),
                           "mean": [float(training["y"].mean())] * len(assessment), "seasonal": seasonal})
        return result
    if phase == "evaluation-search":
        return search(case, dataset, configure_model, fit_model, records_frame)
    if phase == "evaluation-search-custom":
        return search(case, dataset, configure_model, fit_model, records_frame, CUSTOM_OBJECTIVE)
    if phase == "evaluation-holdout":
        return holdout(case, dataset, configure_model, fit_model, records_frame)
    if phase == "evaluation-report-encode":
        return json.dumps(holdout(case, dataset, configure_model, fit_model, records_frame), allow_nan=False)
    if phase == "evaluation-report-decode":
        return json.loads(json.dumps(holdout(case, dataset, configure_model, fit_model, records_frame), allow_nan=False))
    raise ValueError(f"Unsupported evaluation phase: {phase}")


def prepare_operation(case, dataset, phase, configure_model, fit_model, records_frame):
    """Exclude CV/search setup from independent pure-phase boundaries."""
    if phase in METRIC_PHASES:
        history, _ = partition(dataset, case, records_frame)
        result = cv(case, dataset, configure_model, fit_model, records_frame)
        return lambda: metrics(result, case, phase, history)
    if phase == "evaluation-holdout":
        selection = search(case, dataset, configure_model, fit_model, records_frame)
        return lambda: holdout(case, dataset, configure_model, fit_model, records_frame, selection)
    if phase == "evaluation-report-encode":
        report = holdout(case, dataset, configure_model, fit_model, records_frame)
        return lambda: json.dumps(report, allow_nan=False)
    if phase == "evaluation-report-decode":
        encoded = json.dumps(holdout(case, dataset, configure_model, fit_model, records_frame), allow_nan=False)
        return lambda: json.loads(encoded)
    return lambda: operation(case, dataset, phase, configure_model, fit_model, records_frame)


def parallel_matches(case, dataset, phase, sequential, configure_model, fit_model, records_frame):
    """Check that a parallel mode returns the sequential work's rows, so its timing is the same work.

    Point forecasts and search scores must be identical. Interval draws come from numpy's global
    generator, which threads share and processes don't inherit, so only their frame is checked.
    """
    kind, _ = PARALLEL_PHASES[phase]
    outcome = operation(case, dataset, phase, configure_model, fit_model, records_frame)
    if kind == "evaluation-search":
        if outcome != search(case, dataset, configure_model, fit_model, records_frame):
            raise ValueError(f"Python {phase} selected differently from sequential search")
        return
    columns = ["ds", "cutoff", "y", *(["yhat"] if kind == "evaluation-point" else [])]
    if not outcome[columns].equals(sequential[columns]):
        raise ValueError(f"Python {phase} rows differ from sequential cross-validation")
    if kind == "evaluation-intervals" and (
            not np.isfinite(outcome[["yhat_lower", "yhat_upper"]].to_numpy()).all()
            or (outcome["yhat_lower"] > outcome["yhat_upper"]).any()):
        raise ValueError(f"Python {phase} intervals failed finite/order checks")


def correctness(case, dataset, configure_model, fit_model, records_frame, run):
    history, _ = partition(dataset, case, records_frame)
    cutoffs, horizon = plan(case)
    result = cv(case, dataset, configure_model, fit_model, records_frame)
    rows = []
    training = 0
    assessment = 0
    for cutoff in cutoffs:
        expected = history.loc[(history["ds"] > cutoff) & (history["ds"] <= cutoff + horizon)]
        training += int((history["ds"] <= cutoff).sum())
        assessment += len(expected)
        observed = result.loc[result["cutoff"] == cutoff]
        if list(observed["ds"]) != list(expected["ds"]) or list(observed["y"]) != list(expected["y"]):
            raise ValueError("Python CV cutoff, order or target alignment differs")
        for row in observed.itertuples():
            if not math.isfinite(row.yhat):
                raise ValueError("Python CV forecast is nonfinite")
            rows.append({"cutoff": int(cutoff.value // 1_000_000), "timestamp": int(row.ds.value // 1_000_000),
                         "actual": float(row.y), "predicted": float(row.yhat)})
    if len(rows) != assessment:
        raise ValueError("Python CV assessment dimensions differ")
    if [(row["cutoff"], row["timestamp"]) for row in rows] != [
            (int(row.cutoff.value // 1_000_000), int(row.ds.value // 1_000_000)) for row in result.itertuples()]:
        raise ValueError("Python CV rows are not in result order")
    if "evaluation-intervals" in case["phases"]:
        interval = operation(case, dataset, "evaluation-intervals", configure_model, fit_model, records_frame)
        if len(interval) != assessment or not np.isfinite(interval[["yhat_lower", "yhat_upper"]].to_numpy()).all() or (interval["yhat_lower"] > interval["yhat_upper"]).any():
            raise ValueError("Python intervals failed finite dimension/order checks")
    for phase in case["phases"]:
        if phase in PARALLEL_PHASES:
            parallel_matches(case, dataset, phase, result, configure_model, fit_model, records_frame)
        if phase in ("evaluation-search", "evaluation-search-custom", "evaluation-holdout", "evaluation-report-encode", "evaluation-report-decode"):
            outcome = operation(case, dataset, phase, configure_model, fit_model, records_frame)
            if phase in ("evaluation-search", "evaluation-search-custom") and len([candidate for candidate in outcome[0] if "failure" in candidate]) != case["workload"].get("expectedFailures", 0):
                raise ValueError("Unexpected Python candidate failure count")
    mae = float(np.mean([abs(row["actual"] - row["predicted"]) for row in rows]))
    evaluation = {"cutoffs": [int(cutoff.value // 1_000_000) for cutoff in cutoffs],
                  "trainingRows": training, "assessmentRows": assessment, "rows": rows, "mae": mae}
    if any(phase in PARITY_PHASES for phase in case["phases"]):
        evaluation["metricParity"] = metric_parity(result, case)
    if "evaluation-metrics-scaled" in case["phases"]:
        evaluation["scaledErrors"] = scaled_errors(history, result, cutoffs)
    return {"caseId": case["id"], "run": run, "status": "locally-passed",
            "modelKind": case["workload"]["configuration"]["growth"],
            "changepointTimestamps": [], "seasonalities": [], "events": [], "regressors": [], "forecasts": [],
            "evaluation": evaluation}
