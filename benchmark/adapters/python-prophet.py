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


def prepare_input(dataset: dict[str, Any]) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Convert common records into Prophet's public DataFrame inputs."""

    observations = dataset["observations"]
    prediction_timestamps = dataset["predictionTimestamps"]
    training = pd.DataFrame(
        {
            "ds": pd.to_datetime([row["timestamp"] for row in observations], utc=True).tz_localize(None),
            "y": [row["value"] for row in observations],
        }
    )
    prediction = pd.DataFrame(
        {
            "ds": pd.to_datetime(prediction_timestamps, utc=True).tz_localize(None),
        }
    )
    return training, prediction


def configure_model(benchmark_case: dict[str, Any]) -> Prophet:
    """Construct a fresh public Prophet model for one fit sample."""

    workload = benchmark_case["workload"]
    kind = workload["kind"]
    if kind == "linear-fit":
        return Prophet(
            growth="linear",
            changepoints=[],
            yearly_seasonality=False,
            weekly_seasonality=False,
            daily_seasonality=False,
            uncertainty_samples=0,
        )
    if kind != "explicit-linear-map":
        raise ValueError(f"Case {benchmark_case['id']} is not a fitting workload")

    configuration = workload["configuration"]
    model = Prophet(
        growth="linear",
        changepoints=[
            pd.to_datetime(value, utc=True).tz_localize(None)
            for value in configuration["changepointTimestamps"]
        ],
        changepoint_prior_scale=configuration["changepointPriorScale"],
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    for seasonality in configuration["seasonalities"]:
        model.add_seasonality(
            name=seasonality["name"],
            period=seasonality["periodDays"],
            fourier_order=seasonality["fourierOrder"],
            prior_scale=seasonality["priorScale"],
            mode="additive",
        )
    model.stan_backend.set_options(
        newton_fallback=workload["pythonOptimizer"]["newtonFallback"]
    )
    return model


def fit_model(training: pd.DataFrame, benchmark_case: dict[str, Any]) -> Prophet:
    """Construct and fit a fresh Prophet model through its public fit operation."""

    workload = benchmark_case["workload"]
    model = configure_model(benchmark_case)
    if workload["kind"] == "explicit-linear-map":
        optimizer = workload["pythonOptimizer"]
        return model.fit(
            training,
            algorithm=optimizer["algorithm"],
            iter=optimizer["maxIterations"],
        )
    return model.fit(training)


def fixed_prediction_model(
    training: pd.DataFrame, benchmark_case: dict[str, Any]
) -> Prophet:
    """Prepare and publicly restore a model with the authored fixed linear equation."""

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


def setup_model(
    training: pd.DataFrame, benchmark_case: dict[str, Any]
) -> Prophet:
    """Prepare an untimed fitted model for prediction and persistence phases."""

    if benchmark_case["workload"]["kind"] == "fixed-linear-prediction":
        return fixed_prediction_model(training, benchmark_case)
    return fit_model(training, benchmark_case)


def forecast_projection(
    model: Prophet, prediction_frame: pd.DataFrame
) -> tuple[pd.DataFrame, list[dict[str, Any]]]:
    """Run public prediction and project its richer DataFrame into shared fields."""

    predicted = model.predict(prediction_frame)
    seasonality_names = list(model.seasonalities.keys())
    projected: list[dict[str, Any]] = []
    for index, row in predicted.iterrows():
        timestamp = int(pd.Timestamp(row["ds"]).value // 1_000_000)
        seasonalities = [
            {"name": name, "value": float(row[name])} for name in seasonality_names
        ]
        projected.append(
            {
                "timestamp": timestamp,
                "value": float(row["yhat"]),
                "trend": float(row["trend"]),
                "additive": float(row.get("additive_terms", 0.0)),
                "seasonalities": seasonalities,
            }
        )
    return predicted, projected


def assert_correctness(
    benchmark_case: dict[str, Any], projections: list[dict[str, Any]], expected_count: int
) -> None:
    """Check local shape, finite-value, decomposition, and fixed-equation invariants."""

    if len(projections) != expected_count:
        raise ValueError("Prophet prediction omitted requested rows")
    tolerance = benchmark_case["correctnessTolerance"]
    workload = benchmark_case["workload"]
    for forecast in projections:
        values = (forecast["value"], forecast["trend"], forecast["additive"])
        if not all(math.isfinite(value) for value in values):
            raise ValueError("Prophet prediction returned a non-finite value")
        allowed = tolerance["absolute"] + tolerance["relative"] * abs(forecast["value"])
        if abs(forecast["value"] - forecast["trend"] - forecast["additive"]) > allowed:
            raise ValueError("Prophet prediction failed additive reconstruction")
        if workload["kind"] == "fixed-linear-prediction":
            parameters = workload["parameters"]
            expected = parameters["intercept"] + parameters["slope"] * (
                (forecast["timestamp"] - parameters["timeOrigin"])
                / parameters["timeScale"]
            )
            fixed_allowed = tolerance["absolute"] + tolerance["relative"] * abs(expected)
            if abs(forecast["value"] - expected) > fixed_allowed:
                raise ValueError("Prophet prediction failed the fixed linear equation")


def persistence_maximum_error(
    model: Prophet,
    prediction_frame: pd.DataFrame,
    original: list[dict[str, Any]],
) -> float:
    """Check the public JSON persistence round trip outside measured regions."""

    restored = model_from_json(model_to_json(model))
    _, restored_projection = forecast_projection(restored, prediction_frame)
    if len(restored_projection) != len(original):
        raise ValueError("Prophet persistence round trip omitted forecasts")
    return max(
        (
            abs(left["value"] - right["value"])
            for left, right in zip(original, restored_projection, strict=True)
        ),
        default=0.0,
    )


def correctness_projection(
    benchmark_case: dict[str, Any], dataset: dict[str, Any], run: int
) -> dict[str, Any]:
    """Produce untimed public correctness evidence for one independent run."""

    training, prediction_frame = prepare_input(dataset)
    model = setup_model(training, benchmark_case)
    _, projections = forecast_projection(model, prediction_frame)
    assert_correctness(benchmark_case, projections, len(prediction_frame))
    persistence_error = persistence_maximum_error(model, prediction_frame, projections)
    result: dict[str, Any] = {
        "caseId": benchmark_case["id"],
        "run": run,
        "status": "locally-passed",
        "modelKind": "prophet-linear-map",
        "forecasts": projections,
        "persistenceMaximumAbsoluteError": persistence_error,
    }
    sigma = model.params.get("sigma_obs")
    if sigma is not None and model.y_scale is not None:
        result["noiseScale"] = float(sigma[0][0] * model.y_scale)
    if benchmark_case["workload"]["kind"] == "explicit-linear-map":
        stan_fit = model.stan_fit
        optimized = None if stan_fit is None else stan_fit.optimized_params_dict
        objective = None if optimized is None else optimized.get("lp__")
        if objective is None or not math.isfinite(float(objective)):
            raise ValueError("Prophet MAP fit did not retain a finite optimizer objective")
        result["fitQuality"] = [
            {"name": "cmdstan-lp", "value": float(objective)},
        ]
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


def cold_samples(benchmark_case: dict[str, Any]) -> list[int]:
    """Measure fresh interpreter startup through one complete public forecast."""

    samples: list[int] = []
    for _ in range(benchmark_case["measuredIterations"]):
        started = time.perf_counter_ns()
        child = subprocess.run(
            [sys.executable, str(ADAPTER_PATH), "--cold", benchmark_case["id"]],
            capture_output=True,
            text=True,
            timeout=benchmark_case["timeoutSeconds"],
            check=False,
            env=os.environ,
        )
        ended = time.perf_counter_ns()
        if child.returncode != 0 or PROTOCOL_PREFIX not in child.stdout:
            raise RuntimeError(child.stderr or child.stdout or "Cold Prophet worker failed")
        samples.append(ended - started)
    return samples


def measurement_for_phase(
    benchmark_case: dict[str, Any],
    dataset: dict[str, Any],
    run: int,
    phase: str,
) -> dict[str, Any]:
    """Collect one phase's samples after untimed setup."""

    training, prediction_frame = prepare_input(dataset)
    model = setup_model(training, benchmark_case)
    serialized = model_to_json(model)
    if phase == "input-preparation":
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
        samples = cold_samples(benchmark_case)
    elif phase == "model-json-encode":
        samples = measure(benchmark_case, lambda: model_to_json(model))
    elif phase == "model-json-decode":
        samples = measure(benchmark_case, lambda: model_from_json(serialized))
    else:
        raise ValueError(f"Unsupported benchmark phase: {phase}")

    comparison = benchmark_case["workload"]["comparison"]
    result: dict[str, Any] = {
        "caseId": benchmark_case["id"],
        "implementation": "python-prophet",
        "phase": phase,
        "comparison": comparison["kind"],
        "run": run,
        "samplesNanoseconds": samples,
        "correctness": "locally-passed",
    }
    if comparison["kind"] != "different-objective":
        result["evidenceId"] = comparison["evidenceId"]
    return result


def find_case(case_id: str) -> dict[str, Any]:
    """Find one declared case or fail explicitly."""

    for benchmark_case in load_cases():
        if benchmark_case.get("id") == case_id:
            return benchmark_case
    raise ValueError(f"Unknown benchmark case: {case_id}")


def run_worker(case_id: str, run: int) -> dict[str, Any]:
    """Run one independent process worth of setup, correctness, and warm phases."""

    benchmark_case = find_case(case_id)
    dataset = load_dataset(benchmark_case)
    correctness = correctness_projection(benchmark_case, dataset, run)
    measurements = [
        measurement_for_phase(benchmark_case, dataset, run, phase)
        for phase in benchmark_case["phases"]
    ]
    return {"measurements": measurements, "correctness": correctness}


def run_cold_worker(case_id: str) -> None:
    """Execute one cold conversion, fit, predict, and output materialization."""

    benchmark_case = find_case(case_id)
    dataset = load_dataset(benchmark_case)
    training, prediction_frame = prepare_input(dataset)
    model = fit_model(training, benchmark_case)
    predicted = model.predict(prediction_frame)
    if len(predicted) != len(prediction_frame):
        raise ValueError("Cold Prophet forecast omitted rows")
    print(f'{PROTOCOL_PREFIX}{{"status":"passed"}}')


def sha256_file(path: Path) -> str:
    """Hash one provenance artifact."""

    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def read_resource(path: Path) -> str:
    """Read one container resource value when the platform exposes it."""

    try:
        return path.read_text(encoding="utf-8").strip()
    except OSError:
        return "unavailable"


def collect_environment() -> dict[str, Any]:
    """Collect Python, Prophet, container, and lock provenance."""

    model_binary = Path(prophet.__file__).resolve().parent / "stan_model" / "prophet_model.bin"
    lock_path = BENCHMARK_ROOT / "python" / "uv.lock"
    versions = []
    for name in ("cmdstanpy", "numpy", "pandas", "prophet"):
        versions.append({"name": name, "value": importlib.metadata.version(name)})
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
            {
                "name": "cgroup-memory-max",
                "value": read_resource(Path("/sys/fs/cgroup/memory.max")),
            },
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
    """Run selected cases in fresh independent Python processes and save raw output."""

    cases = select_cases(load_cases())
    measurements: list[dict[str, Any]] = []
    correctness: list[dict[str, Any]] = []
    failures: list[dict[str, Any]] = []
    for benchmark_case in cases:
        for run in range(benchmark_case["independentRuns"]):
            try:
                worker = subprocess.run(
                    [sys.executable, str(ADAPTER_PATH), "--worker", benchmark_case["id"], str(run)],
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
    output_path = Path(os.environ.get("BENCHMARK_OUTPUT_PATH", DEFAULT_OUTPUT_PATH))
    output_path.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    """Dispatch coordinator and worker modes."""

    mode = sys.argv[1] if len(sys.argv) > 1 else "--coordinator"
    if mode == "--worker":
        if len(sys.argv) != 4:
            raise ValueError("Worker requires case id and run index")
        print(f"{PROTOCOL_PREFIX}{json.dumps(run_worker(sys.argv[2], int(sys.argv[3])))}")
    elif mode == "--cold":
        if len(sys.argv) != 3:
            raise ValueError("Cold worker requires case id")
        run_cold_worker(sys.argv[2])
    else:
        run_coordinator()


if __name__ == "__main__":
    try:
        main()
    except Exception as error:  # noqa: BLE001 - CLI boundary renders expected worker failures.
        print(f"{type(error).__name__}: {error}", file=sys.stderr)
        raise
