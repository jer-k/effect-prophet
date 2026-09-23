#!/usr/bin/env python3
"""Public Prophet 1.4.0 benchmark adapter and isolated worker protocol."""

from __future__ import annotations

import hashlib
import importlib.metadata
import json
import math
import os
import platform
import subprocess
import sys
import time
from pathlib import Path
from typing import Any, Callable

import numpy as np
import pandas as pd
import prophet
from prophet import Prophet
from prophet.serialize import model_from_json, model_to_json
from prophet.utilities import regressor_coefficients

PROTOCOL_PREFIX = "EFFECT_PROPHET_BENCHMARK_RESULT="
ADAPTER_PATH = Path(__file__).resolve()
BENCHMARK_ROOT = ADAPTER_PATH.parent.parent
DEFAULT_CASES_PATH = BENCHMARK_ROOT / "cases" / "public-api.json"
DEFAULT_DATA_ROOT = BENCHMARK_ROOT / "data"
DEFAULT_OUTPUT_PATH = BENCHMARK_ROOT / "results" / "runs" / "python-prophet.json"
MEASUREMENT_SINK: Any = None


def read_json(path: Path) -> Any:
    """Read one JSON boundary value."""

    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_cases() -> list[dict[str, Any]]:
    """Load case declarations already checked by the TypeScript contract tests."""

    path = Path(os.environ.get("BENCHMARK_CASES_PATH", DEFAULT_CASES_PATH))
    value = read_json(path)
    if not isinstance(value, list):
        raise ValueError("Benchmark case file must contain an array")
    return value


def load_dataset(benchmark_case: dict[str, Any]) -> dict[str, Any]:
    """Load a shared dataset without permitting traversal outside its mounted root."""

    root = Path(os.environ.get("BENCHMARK_DATA_ROOT", DEFAULT_DATA_ROOT)).resolve()
    relative = Path(str(benchmark_case["dataset"]))
    path = (root / relative).resolve()
    if root not in path.parents:
        raise ValueError("Benchmark dataset path escapes the shared data root")
    value = read_json(path)
    if not isinstance(value, dict):
        raise ValueError("Benchmark dataset must be an object")
    return value


def select_cases(cases: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Apply the optional comma-separated case selection."""

    selection = os.environ.get("BENCHMARK_CASE_IDS", "").strip()
    if not selection:
        return cases
    selected = {value.strip() for value in selection.split(",")}
    return [case for case in cases if case.get("id") in selected]


def records_frame(rows: list[dict[str, Any]], include_value: bool) -> pd.DataFrame:
    """Convert complete shared rows into one naive-calendar Prophet DataFrame."""

    data: dict[str, Any] = {
        "ds": pd.to_datetime(
            [row["timestamp"] for row in rows], utc=True
        ).tz_localize(None),
    }
    if include_value:
        data["y"] = [row["value"] for row in rows]
    if rows and "capacity" in rows[0]:
        data["cap"] = [row["capacity"] for row in rows]
    if rows and "floor" in rows[0]:
        data["floor"] = [row["floor"] for row in rows]
    regressor_names = list(rows[0].get("regressors", {}).keys()) if rows else []
    condition_names = list(rows[0].get("conditions", {}).keys()) if rows else []
    for name in regressor_names:
        data[name] = [row.get("regressors", {}).get(name) for row in rows]
    for name in condition_names:
        data[name] = [row.get("conditions", {}).get(name) for row in rows]
    return pd.DataFrame(data)


def prepare_input(dataset: dict[str, Any]) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Convert shared JSON records into Prophet's public DataFrame inputs."""

    return (
        records_frame(dataset["observations"], include_value=True),
        records_frame(dataset["predictionRows"], include_value=False),
    )


def holidays_frame(events: list[dict[str, Any]]) -> pd.DataFrame | None:
    """Translate UTC event occurrences into Prophet's holidays protocol."""

    if not events:
        return None
    ordered = sorted(events, key=lambda event: (event["name"], event["date"]))
    return pd.DataFrame(
        {
            "holiday": [event["name"] for event in ordered],
            "ds": pd.to_datetime([event["date"] for event in ordered]),
            "lower_window": [event["lowerWindowDays"] for event in ordered],
            "upper_window": [event["upperWindowDays"] for event in ordered],
            "prior_scale": [event["priorScale"] for event in ordered],
        }
    )


def configure_model(benchmark_case: dict[str, Any]) -> Prophet:
    """Construct a fresh public Prophet model with the shared configuration."""

    workload = benchmark_case["workload"]
    if workload["kind"] not in ("linear-map", "stage-f-map"):
        raise ValueError(f"Case {benchmark_case['id']} is not a fitting workload")
    configuration = workload["configuration"]
    changepoints = configuration["changepoints"]
    stage_f = workload["kind"] == "stage-f-map"
    growth = configuration["growth"] if stage_f else "linear"
    common: dict[str, Any] = {
        "growth": growth,
        "changepoint_prior_scale": configuration["changepointPriorScale"],
        "yearly_seasonality": False,
        "weekly_seasonality": False,
        "daily_seasonality": False,
        "uncertainty_samples": 0,
        "holidays": holidays_frame(configuration["events"]),
        "seasonality_mode": configuration.get("seasonalityMode", "additive"),
        "holidays_mode": configuration.get("holidaysMode", "additive"),
        "scaling": configuration.get("scaling", "absmax"),
    }
    if growth == "flat":
        common["changepoints"] = []
    elif changepoints["mode"] == "explicit":
        common["changepoints"] = [
            pd.to_datetime(value, utc=True).tz_localize(None)
            for value in changepoints["timestamps"]
        ]
    else:
        common["n_changepoints"] = changepoints["count"]
        common["changepoint_range"] = changepoints["range"]
    model = Prophet(**common)
    for seasonality in configuration["seasonalities"]:
        model.add_seasonality(
            name=seasonality["name"],
            period=seasonality["periodDays"],
            fourier_order=seasonality["fourierOrder"],
            prior_scale=seasonality["priorScale"],
            mode=seasonality.get("mode", configuration.get("seasonalityMode", "additive")),
            condition_name=seasonality.get("conditionName"),
        )
    standardization = {"never": False, "auto": "auto", "always": True}
    for regressor in configuration["regressors"]:
        model.add_regressor(
            name=regressor["name"],
            prior_scale=regressor["priorScale"],
            standardize=standardization[regressor["standardization"]],
            mode=regressor.get("mode", configuration.get("seasonalityMode", "additive")),
        )
    model.stan_backend.set_options(
        newton_fallback=workload["pythonOptimizer"]["newtonFallback"]
    )
    return model


def fit_model(training: pd.DataFrame, benchmark_case: dict[str, Any]) -> Prophet:
    """Construct and fit a fresh model through Prophet's public fit operation."""

    workload = benchmark_case["workload"]
    model = configure_model(benchmark_case)
    optimizer = workload["pythonOptimizer"]
    return model.fit(
        training,
        algorithm=optimizer["algorithm"],
        iter=optimizer["maxIterations"],
    )


def fixed_prediction_model(
    training: pd.DataFrame, benchmark_case: dict[str, Any]
) -> Prophet:
    """Prepare and publicly restore a model with the authored fixed equation."""

    workload = benchmark_case["workload"]
    if workload["kind"] != "fixed-linear-prediction":
        raise ValueError("Expected a fixed-linear-prediction workload")
    model = Prophet(
        growth="linear",
        changepoints=[],
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    ).fit(training, algorithm="Newton", iter=10_000)
    parameters = workload["parameters"]
    if model.start is None or model.t_scale is None or model.y_scale is None:
        raise ValueError("Prophet did not retain fixed-model scaling state")
    actual_origin = int(model.start.value // 1_000_000)
    actual_scale = int(model.t_scale.total_seconds() * 1_000)
    if actual_origin != parameters["timeOrigin"] or actual_scale != parameters["timeScale"]:
        raise ValueError("Fixed prediction parameters do not match Prophet training scales")
    model.params["m"] = np.array([[parameters["intercept"] / model.y_scale]])
    model.params["k"] = np.array([[parameters["slope"] / model.y_scale]])
    model.params["delta"] = np.zeros_like(model.params["delta"])
    model.params["beta"] = np.zeros_like(model.params["beta"])
    return model_from_json(model_to_json(model))


def setup_model(training: pd.DataFrame, benchmark_case: dict[str, Any]) -> Prophet:
    """Prepare an untimed fitted model for prediction and persistence phases."""

    if benchmark_case["workload"]["kind"] == "fixed-linear-prediction":
        return fixed_prediction_model(training, benchmark_case)
    return fit_model(training, benchmark_case)


def event_names(model: Prophet) -> list[str]:
    """Return fitted grouped event names in Prophet feature order."""

    names = model.train_holiday_names
    return [] if names is None else [str(value) for value in names.tolist()]


def forecast_projection(
    model: Prophet, prediction_frame: pd.DataFrame
) -> tuple[pd.DataFrame, list[dict[str, Any]]]:
    """Run public prediction and project all named additive components."""

    predicted = model.predict(prediction_frame)
    seasonality_names = list(model.seasonalities.keys())
    grouped_events = event_names(model)
    regressors = list(model.extra_regressors.keys())
    projected: list[dict[str, Any]] = []
    def component(name: str, mode: str, row: pd.Series) -> dict[str, Any]:
        value = float(row[name])
        if mode == "multiplicative":
            return {"name": name, "mode": mode, "factor": value, "contribution": value * float(row["trend"])}
        return {"name": name, "mode": mode, "value": value}

    for _, row in predicted.iterrows():
        projected.append(
            {
                "timestamp": int(pd.Timestamp(row["ds"]).value // 1_000_000),
                "value": float(row["yhat"]),
                "trend": float(row["trend"]),
                "additive": float(row.get("additive_terms", 0.0)),
                "multiplicative": float(row.get("multiplicative_terms", 0.0)),
                "seasonalities": [
                    component(name, model.seasonalities[name]["mode"], row)
                    for name in seasonality_names
                ],
                "events": [
                    component(name, model.holidays_mode, row)
                    for name in grouped_events
                ],
                "regressors": [
                    component(name, model.extra_regressors[name]["mode"], row)
                    for name in regressors
                ],
            }
        )
    return predicted, projected


def component_sum(forecast: dict[str, Any], mode: str) -> float:
    """Sum every projected named component of a selected mode."""

    groups = (
        forecast["seasonalities"],
        forecast["events"],
        forecast["regressors"],
    )
    return sum(
        component["value" if mode == "additive" else "factor"]
        for group in groups for component in group if component["mode"] == mode
    )


def assert_forecasts(
    benchmark_case: dict[str, Any],
    dataset: dict[str, Any],
    projections: list[dict[str, Any]],
) -> None:
    """Check row identity, decomposition, masks, and event activation."""

    rows = dataset["predictionRows"]
    if len(projections) != len(rows):
        raise ValueError("Prophet prediction omitted requested rows")
    workload = benchmark_case["workload"]
    configuration = workload.get("configuration", {})
    seasonalities = {
        item["name"]: item for item in configuration.get("seasonalities", [])
    }
    events = configuration.get("events", [])
    for index, forecast in enumerate(projections):
        row = rows[index]
        expected_timestamp = int(pd.Timestamp(row["timestamp"]).value // 1_000_000)
        if forecast["timestamp"] != expected_timestamp:
            raise ValueError("Prophet prediction changed row order")
        values = (forecast["value"], forecast["trend"], forecast["additive"], forecast["multiplicative"])
        if not all(math.isfinite(value) for value in values):
            raise ValueError("Prophet prediction returned a non-finite value")
        if abs(forecast["value"] - forecast["trend"] * (1 + forecast["multiplicative"]) - forecast["additive"]) > 1e-8:
            raise ValueError("Prophet prediction failed total reconstruction")
        if (abs(forecast["additive"] - component_sum(forecast, "additive")) > 1e-8 or
            abs(forecast["multiplicative"] - component_sum(forecast, "multiplicative")) > 1e-8):
            raise ValueError("Prophet prediction failed named component reconstruction")
        for component in forecast["seasonalities"]:
            definition = seasonalities.get(component["name"], {})
            condition_name = definition.get("conditionName")
            if condition_name and row.get("conditions", {}).get(condition_name) is False:
                if component.get("value", component.get("factor")) != 0:
                    raise ValueError("Prophet did not zero a condition-false component")
        day = pd.to_datetime(row["timestamp"], utc=True).tz_localize(None).normalize()
        for component in forecast["events"]:
            occurrences = [event for event in events if event["name"] == component["name"]]
            active = any(
                pd.Timestamp(event["date"]) + pd.Timedelta(days=event["lowerWindowDays"])
                <= day
                <= pd.Timestamp(event["date"]) + pd.Timedelta(days=event["upperWindowDays"])
                for event in occurrences
            )
            if not active and component.get("value", component.get("factor")) != 0:
                raise ValueError("Prophet activated an event outside its window")


def assert_fixed_equation(
    benchmark_case: dict[str, Any], projections: list[dict[str, Any]]
) -> None:
    """Check the authored fixed control equation."""

    workload = benchmark_case["workload"]
    if workload["kind"] != "fixed-linear-prediction":
        return
    parameters = workload["parameters"]
    tolerance = benchmark_case["correctnessTolerances"]["forecast"]
    for forecast in projections:
        expected = parameters["intercept"] + parameters["slope"] * (
            (forecast["timestamp"] - parameters["timeOrigin"])
            / parameters["timeScale"]
        )
        allowed = tolerance["absolute"] + tolerance["relative"] * abs(expected)
        if abs(forecast["value"] - expected) > allowed:
            raise ValueError("Prophet prediction failed the fixed linear equation")


def event_metadata(model: Prophet) -> list[dict[str, Any]]:
    """Project persisted holidays metadata in grouped feature order."""

    if model.holidays is None:
        return []
    result: list[dict[str, Any]] = []
    for name in event_names(model):
        rows = model.holidays[model.holidays["holiday"] == name]
        first = rows.iloc[0]
        result.append(
            {
                "name": name,
                "mode": model.holidays_mode,
                "dates": [pd.Timestamp(value).strftime("%Y-%m-%d") for value in rows["ds"]],
                "lowerWindowDays": int(first["lower_window"]),
                "upperWindowDays": int(first["upper_window"]),
                "priorScale": float(first["prior_scale"]),
            }
        )
    return result


def regressor_metadata(
    model: Prophet, benchmark_case: dict[str, Any]
) -> list[dict[str, Any]]:
    """Project fitted transforms and public original-unit coefficient metadata."""

    configuration = benchmark_case["workload"].get("configuration", {})
    configured = {
        item["name"]: item for item in configuration.get("regressors", [])
    }
    if not model.extra_regressors:
        return []
    coefficients = regressor_coefficients(model)
    by_name = {row["regressor"]: row for _, row in coefficients.iterrows()}
    result: list[dict[str, Any]] = []
    for name, state in model.extra_regressors.items():
        declaration = configured[name]
        coefficient = by_name[name]
        standardized = declaration["standardization"] == "always" or (
            declaration["standardization"] == "auto"
            and (float(state["mu"]) != 0.0 or float(state["std"]) != 1.0)
        )
        transform: dict[str, Any]
        if standardized:
            transform = {
                "mode": "standardized",
                "mean": float(state["mu"]),
                "sampleStandardDeviation": float(state["std"]),
            }
        else:
            reason = (
                "disabled"
                if declaration["standardization"] == "never"
                else "binary"
            )
            transform = {"mode": "identity", "reason": reason}
        result.append(
            {
                "name": name,
                "priorScale": float(state["prior_scale"]),
                "standardization": declaration["standardization"],
                "mode": state["mode"],
                "transform": transform,
                "coefficient": float(coefficient["coef"]),
                "center": float(coefficient["center"]),
            }
        )
    return result


def metadata_projection(model: Prophet, benchmark_case: dict[str, Any]) -> dict[str, Any]:
    """Project fitted configuration and resolved state."""

    if benchmark_case["workload"]["kind"] == "fixed-linear-prediction":
        return {
            "modelKind": "linear-trend",
            "changepointTimestamps": [],
            "seasonalities": [],
            "events": [],
            "regressors": [],
        }
    seasonalities = []
    for name, state in model.seasonalities.items():
        item = {"name": name, "mode": state["mode"]}
        if state.get("condition_name") is not None:
            item["conditionName"] = state["condition_name"]
        seasonalities.append(item)
    growth = benchmark_case["workload"]["configuration"].get("growth", "linear")
    scaling = {"mode": model.scaling, "scale": float(model.y_scale)}
    if growth == "logistic":
        scaling["floorPolicy"] = "explicit" if model.logistic_floor else "implicit"
        scaling["offset"] = 0.0 if model.logistic_floor else float(model.y_min)
    else:
        scaling["offset"] = float(model.y_min)
    return {
        "modelKind": {"linear": "linear-piecewise-map", "flat": "flat-map", "logistic": "logistic-piecewise-map"}[growth],
        "targetScaling": scaling,
        "changepointTimestamps": [
            int(pd.Timestamp(value).value // 1_000_000) for value in model.changepoints
        ],
        "seasonalities": seasonalities,
        "events": event_metadata(model),
        "regressors": regressor_metadata(model, benchmark_case),
    }


def assert_metadata(benchmark_case: dict[str, Any], metadata: dict[str, Any]) -> None:
    """Verify public Prophet retained the declared benchmark configuration."""

    workload = benchmark_case["workload"]
    if workload["kind"] not in ("linear-map", "stage-f-map"):
        return
    configuration = workload["configuration"]
    expected_seasonalities = [
        {
            "name": item["name"],
            "mode": item.get("mode", configuration.get("seasonalityMode", "additive")),
            **(
                {"conditionName": item["conditionName"]}
                if "conditionName" in item
                else {}
            ),
        }
        for item in configuration["seasonalities"]
    ]
    growth = configuration.get("growth", "linear")
    expected_kind = {"linear": "linear-piecewise-map", "flat": "flat-map", "logistic": "logistic-piecewise-map"}[growth]
    if metadata["modelKind"] != expected_kind:
        raise ValueError("Prophet did not fit the expected model kind")
    if metadata["seasonalities"] != expected_seasonalities:
        raise ValueError("Prophet changed seasonality metadata")
    expected_regressors = [item["name"] for item in configuration["regressors"]]
    if [item["name"] for item in metadata["regressors"]] != expected_regressors:
        raise ValueError("Prophet changed regressor order")
    for regressor in metadata["regressors"]:
        if not math.isfinite(regressor["coefficient"]):
            raise ValueError("Prophet returned a non-finite regressor coefficient")
        expected_mode = (
            "identity"
            if regressor["standardization"] == "never"
            or regressor["name"] == "binary-auto"
            else "standardized"
        )
        if regressor["transform"]["mode"] != expected_mode:
            raise ValueError("Prophet resolved an unexpected regressor transform")
    if growth == "flat":
        return
    changepoints = configuration["changepoints"]
    if changepoints["mode"] == "explicit":
        expected = [int(pd.Timestamp(value).value // 1_000_000) for value in changepoints["timestamps"]]
        if metadata["changepointTimestamps"] != expected:
            raise ValueError("Prophet changed explicit changepoints")
    elif len(metadata["changepointTimestamps"]) != changepoints["count"]:
        raise ValueError("Prophet resolved the wrong automatic changepoint count")


def maximum_projection_difference(
    left: list[dict[str, Any]], right: list[dict[str, Any]]
) -> float:
    """Return the largest prediction difference across totals and all components."""

    if len(left) != len(right):
        raise ValueError("Persistence round trip omitted forecasts")
    maximum = 0.0
    for left_forecast, right_forecast in zip(left, right, strict=True):
        if left_forecast["timestamp"] != right_forecast["timestamp"]:
            raise ValueError("Persistence round trip changed forecast rows")
        left_values = [
            left_forecast["value"],
            left_forecast["trend"],
            left_forecast["additive"],
            left_forecast["multiplicative"],
            *[value for item in (*left_forecast["seasonalities"], *left_forecast["events"], *left_forecast["regressors"]) for value in ([item["value"]] if item["mode"] == "additive" else [item["factor"], item["contribution"]])],
        ]
        right_values = [
            right_forecast["value"],
            right_forecast["trend"],
            right_forecast["additive"],
            right_forecast["multiplicative"],
            *[value for item in (*right_forecast["seasonalities"], *right_forecast["events"], *right_forecast["regressors"]) for value in ([item["value"]] if item["mode"] == "additive" else [item["factor"], item["contribution"]])],
        ]
        if len(left_values) != len(right_values):
            raise ValueError("Persistence round trip changed component layout")
        maximum = max(
            maximum,
            *(abs(a - b) for a, b in zip(left_values, right_values, strict=True)),
        )
    return maximum


def persistence_maximum_error(
    model: Prophet,
    prediction_frame: pd.DataFrame,
    original: list[dict[str, Any]],
) -> float:
    """Check public JSON persistence over the complete prediction projection."""

    restored = model_from_json(model_to_json(model))
    _, restored_projection = forecast_projection(restored, prediction_frame)
    return maximum_projection_difference(original, restored_projection)


def correctness_projection(
    benchmark_case: dict[str, Any], dataset: dict[str, Any], run: int
) -> dict[str, Any]:
    """Produce untimed public correctness evidence for one independent run."""

    training, prediction_frame = prepare_input(dataset)
    model = setup_model(training, benchmark_case)
    _, projections = forecast_projection(model, prediction_frame)
    metadata = metadata_projection(model, benchmark_case)
    assert_forecasts(benchmark_case, dataset, projections)
    assert_fixed_equation(benchmark_case, projections)
    assert_metadata(benchmark_case, metadata)
    verified = subprocess.run(
        [sys.executable, str(ADAPTER_PATH), "--verify-restored", benchmark_case["id"]],
        input=json.dumps({
            "model": model_to_json(model),
            "forecasts": projections,
            "tolerance": benchmark_case["correctnessTolerances"]["persistence"]["absolute"],
        }),
        text=True,
        capture_output=True,
        timeout=benchmark_case["timeoutSeconds"],
        check=False,
    )
    if verified.returncode != 0 or PROTOCOL_PREFIX not in verified.stdout:
        raise ValueError(verified.stderr or verified.stdout or "Fresh-process restoration failed")

    result: dict[str, Any] = {
        "caseId": benchmark_case["id"],
        "run": run,
        "status": "locally-passed",
        **metadata,
        "forecasts": projections,
        "persistenceMaximumAbsoluteError": persistence_maximum_error(
            model, prediction_frame, projections
        ),
    }
    sigma = model.params.get("sigma_obs")
    if benchmark_case["workload"]["kind"] in ("linear-map", "stage-f-map"):
        if sigma is None or model.y_scale is None:
            raise ValueError("Prophet MAP fit omitted its noise scale")
        result["noiseScale"] = float(sigma[0][0] * model.y_scale)
        stan_fit = model.stan_fit
        optimized = None if stan_fit is None else stan_fit.optimized_params_dict
        objective = None if optimized is None else optimized.get("lp__")
        if objective is None or not math.isfinite(float(objective)):
            raise ValueError("Prophet MAP fit did not retain a finite optimizer objective")
        result["fitQuality"] = [{"name": "cmdstan-lp", "value": float(objective)}]
    return result


def measure(
    benchmark_case: dict[str, Any], operation: Callable[[], Any]
) -> list[int]:
    """Warm and measure one operation with a monotonic nanosecond clock."""

    global MEASUREMENT_SINK
    for _ in range(benchmark_case["warmupIterations"]):
        MEASUREMENT_SINK = operation()
    samples: list[int] = []
    for _ in range(benchmark_case["measuredIterations"]):
        started = time.perf_counter_ns()
        value = operation()
        ended = time.perf_counter_ns()
        MEASUREMENT_SINK = value
        samples.append(ended - started)
    return samples


def process_samples(
    benchmark_case: dict[str, Any], mode: str, serialized_model: str | None = None
) -> list[int]:
    """Measure fresh Python startup through cold or restored prediction output."""

    samples: list[int] = []
    for _ in range(benchmark_case["measuredIterations"]):
        started = time.perf_counter_ns()
        child = subprocess.run(
            [sys.executable, str(ADAPTER_PATH), mode, benchmark_case["id"]],
            input=serialized_model,
            capture_output=True,
            text=True,
            timeout=benchmark_case["timeoutSeconds"],
            check=False,
            env=os.environ,
        )
        ended = time.perf_counter_ns()
        if child.returncode != 0 or PROTOCOL_PREFIX not in child.stdout:
            raise RuntimeError(child.stderr or child.stdout or f"Prophet {mode} worker failed")
        samples.append(ended - started)
    return samples


def measurement_for_phase(
    benchmark_case: dict[str, Any],
    dataset: dict[str, Any],
    run: int,
    phase: str,
) -> dict[str, Any]:
    """Collect one phase's raw samples after untimed correctness."""

    training, prediction_frame = prepare_input(dataset)
    model = setup_model(training, benchmark_case)
    serialized = model_to_json(model)
    if phase == "adapter-input-conversion":
        samples = measure(benchmark_case, lambda: prepare_input(dataset))
    elif phase == "warm-fit":
        samples = measure(benchmark_case, lambda: fit_model(training, benchmark_case))
    elif phase == "warm-predict":
        samples = measure(benchmark_case, lambda: model.predict(prediction_frame))
    elif phase == "warm-fit-predict":
        def fit_predict() -> pd.DataFrame:
            fitted = fit_model(training, benchmark_case)
            return fitted.predict(prediction_frame)
        samples = measure(benchmark_case, fit_predict)
    elif phase == "warm-fit-predict-with-conversion":
        def convert_fit_predict() -> pd.DataFrame:
            converted_training, converted_prediction = prepare_input(dataset)
            fitted = fit_model(converted_training, benchmark_case)
            return fitted.predict(converted_prediction)
        samples = measure(benchmark_case, convert_fit_predict)
    elif phase == "cold-first-forecast":
        samples = process_samples(benchmark_case, "--cold")
    elif phase == "model-json-encode":
        samples = measure(benchmark_case, lambda: model_to_json(model))
    elif phase == "model-json-decode":
        samples = measure(benchmark_case, lambda: model_from_json(serialized))
    elif phase == "fresh-process-restored-predict":
        samples = process_samples(benchmark_case, "--restored", serialized)
    else:
        raise ValueError(f"Unsupported benchmark phase: {phase}")
    comparison = benchmark_case["workload"]["comparison"]
    return {
        "caseId": benchmark_case["id"],
        "implementation": "python-prophet",
        "phase": phase,
        "comparison": comparison["kind"],
        "evidenceId": comparison["evidenceId"],
        "run": run,
        "samplesNanoseconds": samples,
        "correctness": "locally-passed",
    }


def find_case(case_id: str) -> dict[str, Any]:
    """Find one declared case or fail explicitly."""

    for benchmark_case in load_cases():
        if benchmark_case.get("id") == case_id:
            return benchmark_case
    raise ValueError(f"Unknown benchmark case: {case_id}")


def run_worker(case_id: str, run: int, stage: str = "all") -> dict[str, Any]:
    """Run correctness, timing, or both in one independent process."""

    benchmark_case = find_case(case_id)
    dataset = load_dataset(benchmark_case)
    result: dict[str, Any] = {"measurements": []}
    if stage != "timing":
        result["correctness"] = correctness_projection(benchmark_case, dataset, run)
    if stage != "correctness":
        result["measurements"] = [
            measurement_for_phase(benchmark_case, dataset, run, phase)
            for phase in benchmark_case["phases"]
        ]
    return result


def run_cold_worker(case_id: str) -> None:
    """Execute cold conversion, fit, prediction, and protocol output."""

    benchmark_case = find_case(case_id)
    dataset = load_dataset(benchmark_case)
    training, prediction_frame = prepare_input(dataset)
    predicted = fit_model(training, benchmark_case).predict(prediction_frame)
    if len(predicted) != len(prediction_frame):
        raise ValueError("Cold Prophet forecast omitted rows")
    print(f'{PROTOCOL_PREFIX}{{"status":"passed"}}')


def run_restored_worker(case_id: str, verify: bool = False) -> None:
    """Decode a persisted model and predict in a fresh process without fitting."""

    benchmark_case = find_case(case_id)
    dataset = load_dataset(benchmark_case)
    serialized = sys.stdin.read()
    verification = json.loads(serialized) if verify else None
    model = model_from_json(verification["model"] if verify else serialized)
    _, prediction_frame = prepare_input(dataset)
    if verify:
        _, projections = forecast_projection(model, prediction_frame)
        if len(projections) != len(prediction_frame):
            raise ValueError("Restored Prophet forecast omitted rows")
        if maximum_projection_difference(verification["forecasts"], projections) > verification["tolerance"]:
            raise ValueError("Fresh-process restored forecasts differ from the fitted model")
    else:
        predicted = model.predict(prediction_frame)
        if len(predicted) != len(prediction_frame):
            raise ValueError("Restored Prophet forecast omitted rows")
    print(f'{PROTOCOL_PREFIX}{{"status":"passed"}}')


def sha256_file(path: Path) -> str:
    """Hash one provenance artifact."""

    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def read_resource(path: Path) -> str:
    """Read one container resource value when available."""

    try:
        return path.read_text(encoding="utf-8").strip()
    except OSError:
        return "unavailable"


def collect_environment() -> dict[str, Any]:
    """Collect Python, Prophet, backend, container, and lock provenance."""

    model_binary = Path(prophet.__file__).resolve().parent / "stan_model" / "prophet_model.bin"
    lock_path = BENCHMARK_ROOT / "python" / "uv.lock"
    versions = [
        {"name": name, "value": importlib.metadata.version(name)}
        for name in ("cmdstanpy", "holidays", "numpy", "pandas", "prophet")
    ]
    return {
        "runtime": "python",
        "runtimeVersion": platform.python_version(),
        "operatingSystem": f"{platform.system()} {platform.release()}",
        "architecture": platform.machine(),
        "processor": platform.processor() or "unavailable",
        "containerPlatform": os.environ.get("BENCHMARK_CONTAINER_PLATFORM", "unavailable"),
        "versions": versions,
        "artifactHashes": [
            {"name": "benchmark/python/uv.lock", "value": sha256_file(lock_path)},
            {"name": "prophet/stan_model/prophet_model.bin", "value": sha256_file(model_binary)},
        ],
        "numericalThreads": [
            {"name": name, "value": os.environ.get(name, "unset")}
            for name in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS")
        ],
        "resources": [
            {"name": "logical-cpu-count", "value": str(os.cpu_count() or "unavailable")},
            {
                "name": "runtime-total-memory-bytes",
                "value": str(os.sysconf("SC_PAGE_SIZE") * os.sysconf("SC_PHYS_PAGES")),
            },
            {"name": "cgroup-memory-max", "value": read_resource(Path("/sys/fs/cgroup/memory.max"))},
            {"name": "collection-method", "value": "python-os and cgroup-v2"},
        ],
        "memoryMeasurement": (
            "unsupported; Prophet fitting may use a backend child process and timings do not "
            "report a process-tree peak RSS"
        ),
    }


def parse_worker_output(stdout: str) -> dict[str, Any]:
    """Parse the final prefixed worker protocol line."""

    lines = [line for line in stdout.splitlines() if line.startswith(PROTOCOL_PREFIX)]
    if not lines:
        raise ValueError("Prophet worker did not emit its result protocol")
    value = json.loads(lines[-1][len(PROTOCOL_PREFIX):])
    if not isinstance(value, dict):
        raise ValueError("Prophet worker protocol must be an object")
    return value


def run_coordinator() -> None:
    """Run the selected correctness or timing stage and save raw output."""

    stage = os.environ.get("BENCHMARK_STAGE", "all")
    if stage not in ("all", "correctness", "timing"):
        raise ValueError(f"Unsupported benchmark stage: {stage}")
    output_path = Path(os.environ.get("BENCHMARK_OUTPUT_PATH", DEFAULT_OUTPUT_PATH))
    previous: dict[str, Any] | None = None
    eligible_ids: set[str] | None = None
    if stage == "timing":
        previous = read_json(output_path)
        eligibility_path = os.environ.get("BENCHMARK_ELIGIBILITY_PATH")
        if eligibility_path is None:
            raise ValueError("BENCHMARK_ELIGIBILITY_PATH is required for timing")
        eligibility = read_json(Path(eligibility_path))
        eligible_ids = set(eligibility["caseIds"])
    selected = select_cases(load_cases())
    cases = (
        selected
        if eligible_ids is None
        else [case for case in selected if case["id"] in eligible_ids]
    )
    measurements: list[dict[str, Any]] = []
    correctness: list[dict[str, Any]] = (
        [] if previous is None else list(previous["correctness"])
    )
    failures: list[dict[str, Any]] = (
        [] if previous is None else list(previous["failures"])
    )
    for benchmark_case in cases:
        for run in range(benchmark_case["independentRuns"]):
            try:
                worker = subprocess.run(
                    [
                        sys.executable,
                        str(ADAPTER_PATH),
                        "--worker",
                        benchmark_case["id"],
                        str(run),
                        stage,
                    ],
                    capture_output=True,
                    text=True,
                    timeout=benchmark_case["timeoutSeconds"],
                    check=False,
                    env=os.environ,
                )
            except subprocess.TimeoutExpired:
                failures.append(
                    {
                        "caseId": benchmark_case["id"],
                        "implementation": "python-prophet",
                        "run": run,
                        "stage": "timeout",
                        "message": f"Worker exceeded {benchmark_case['timeoutSeconds']} seconds",
                    }
                )
                continue
            if worker.returncode != 0:
                failures.append(
                    {
                        "caseId": benchmark_case["id"],
                        "implementation": "python-prophet",
                        "run": run,
                        "stage": "runtime",
                        "message": (worker.stderr or worker.stdout or "Worker failed").strip()[:4000],
                    }
                )
                continue
            try:
                output = parse_worker_output(worker.stdout)
                measurements.extend(output["measurements"])
                if "correctness" in output:
                    correctness.append(output["correctness"])
            except (KeyError, TypeError, ValueError) as error:
                failures.append(
                    {
                        "caseId": benchmark_case["id"],
                        "implementation": "python-prophet",
                        "run": run,
                        "stage": "runtime",
                        "message": str(error),
                    }
                )
    result = {
        "schemaVersion": 1,
        "implementation": "python-prophet",
        "generatedAt": pd.Timestamp.now(tz="UTC").isoformat().replace("+00:00", "Z"),
        "environment": collect_environment(),
        "measurements": measurements,
        "failures": failures,
        "correctness": correctness,
    }
    output_path.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    """Dispatch coordinator and worker modes."""

    mode = sys.argv[1] if len(sys.argv) > 1 else "--coordinator"
    if mode == "--worker":
        if len(sys.argv) not in (4, 5):
            raise ValueError("Worker requires case id, run index, and optional stage")
        stage = sys.argv[4] if len(sys.argv) == 5 else "all"
        if stage not in ("all", "correctness", "timing"):
            raise ValueError(f"Unsupported benchmark stage: {stage}")
        print(
            f"{PROTOCOL_PREFIX}"
            f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"
        )
    elif mode == "--cold":
        if len(sys.argv) != 3:
            raise ValueError("Cold worker requires case id")
        run_cold_worker(sys.argv[2])
    elif mode in ("--restored", "--verify-restored"):
        if len(sys.argv) != 3:
            raise ValueError("Restored worker requires case id")
        run_restored_worker(sys.argv[2], verify=mode == "--verify-restored")
    else:
        run_coordinator()


if __name__ == "__main__":
    try:
        main()
    except Exception as error:  # noqa: BLE001 - CLI boundary renders expected worker failures.
        print(f"{type(error).__name__}: {error}", file=sys.stderr)
        raise
