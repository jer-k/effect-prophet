"""Public Prophet 1.4.0 evaluation mappings; no private diagnostics kernels or parallelism."""

from __future__ import annotations

import copy
import json
import math

import numpy as np
import pandas as pd
from prophet.diagnostics import cross_validation, performance_metrics


def metric_window(case):
    """Python's rolling window is fractional/weighted, unlike Effect whole horizon groups."""
    return {"overall": 1, "horizons": 0, "rolling": 0.5}[case["workload"]["metricAggregation"]]


def partition(dataset, case, records_frame):
    config = case["workload"]
    count = config.get("holdoutRows", 0)
    development = dataset["observations"][:-count] if count else dataset["observations"]
    holdout = dataset["observations"][-count:] if count else []
    return records_frame(development, include_value=True), records_frame(holdout, include_value=True)


def plan(case):
    config = case["workload"]["plan"]
    cutoffs = [pd.Timestamp(value).tz_localize(None) for value in config["cutoffs"]]
    horizon = pd.Timedelta(milliseconds=config["horizonMs"])
    return cutoffs, horizon


def cv(case, dataset, configure_model, fit_model, records_frame, intervals=False):
    history, _ = partition(dataset, case, records_frame)
    config = case["workload"]
    model = fit_model(history, case)  # Python diagnostics needs a fitted, mutable full-history model.
    if intervals:
        controls = config["interval"]
        model.uncertainty_samples = controls["samples"]
        model.interval_width = controls["intervalWidth"]
        np.random.seed(controls["seed"])
    cutoffs, horizon = plan(case)
    return cross_validation(model, horizon=horizon, cutoffs=cutoffs, parallel=None, disable_tqdm=True)


def search(case, dataset, configure_model, fit_model, records_frame):
    config = case["workload"]
    candidates = []
    for candidate in config["candidates"]:
        request = copy.deepcopy(case)
        if config["configuration"]["growth"] != "flat":
            request["workload"]["configuration"]["changepointPriorScale"] = candidate["changepointPriorScale"]
        if candidate.get("growth") == "logistic":
            request["workload"]["configuration"]["growth"] = "logistic"
        try:
            result = cv(request, dataset, configure_model, fit_model, records_frame)
            score = float(performance_metrics(result, metrics=["mae"], rolling_window=1)["mae"].iloc[0])
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


def operation(case, dataset, phase, configure_model, fit_model, records_frame):
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
    if phase == "evaluation-metrics":
        result = cv(case, dataset, configure_model, fit_model, records_frame)
        return performance_metrics(result, metrics=["mae", "rmse", "smape", "mape"], rolling_window=metric_window(case))
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
    if phase == "evaluation-holdout":
        return holdout(case, dataset, configure_model, fit_model, records_frame)
    if phase == "evaluation-report-encode":
        return json.dumps(holdout(case, dataset, configure_model, fit_model, records_frame), allow_nan=False)
    if phase == "evaluation-report-decode":
        return json.loads(json.dumps(holdout(case, dataset, configure_model, fit_model, records_frame), allow_nan=False))
    raise ValueError(f"Unsupported evaluation phase: {phase}")


def prepare_operation(case, dataset, phase, configure_model, fit_model, records_frame):
    """Exclude CV/search setup from independent pure-phase boundaries."""
    if phase == "evaluation-metrics":
        result = cv(case, dataset, configure_model, fit_model, records_frame)
        return lambda: performance_metrics(result, metrics=["mae", "rmse", "smape", "mape"], rolling_window=metric_window(case))
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
    if "evaluation-intervals" in case["phases"]:
        interval = operation(case, dataset, "evaluation-intervals", configure_model, fit_model, records_frame)
        if len(interval) != assessment or not np.isfinite(interval[["yhat_lower", "yhat_upper"]].to_numpy()).all() or (interval["yhat_lower"] > interval["yhat_upper"]).any():
            raise ValueError("Python intervals failed finite dimension/order checks")
    for phase in case["phases"]:
        if phase in ("evaluation-search", "evaluation-holdout", "evaluation-report-encode", "evaluation-report-decode"):
            outcome = operation(case, dataset, phase, configure_model, fit_model, records_frame)
            if phase == "evaluation-search" and len([candidate for candidate in outcome[0] if "failure" in candidate]) != case["workload"].get("expectedFailures", 0):
                raise ValueError("Unexpected Python candidate failure count")
    mae = float(np.mean([abs(row["actual"] - row["predicted"]) for row in rows]))
    return {"caseId": case["id"], "run": run, "status": "locally-passed",
            "modelKind": case["workload"]["configuration"]["growth"],
            "changepointTimestamps": [], "seasonalities": [], "events": [], "regressors": [], "forecasts": [],
            "evaluation": {"cutoffs": [int(cutoff.value // 1_000_000) for cutoff in cutoffs],
                           "trainingRows": training, "assessmentRows": assessment,
                           "rows": rows, "mae": mae}}
