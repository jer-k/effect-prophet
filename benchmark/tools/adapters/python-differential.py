#!/usr/bin/env python3
"""Fit and predict generated differential cases with pinned Python Prophet 1.4.0."""

from __future__ import annotations

import json
import logging
import math
import os
import runpy
import signal
import sys
import time
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from typing import Any

import numpy as np
import prophet.models

ADAPTERS = Path(__file__).resolve().parent
sys.path.insert(0, str(ADAPTERS))
# Reuse the benchmark adapter's configuration, fitting and projection without running its main.
adapter = runpy.run_path(str(ADAPTERS / "python-prophet.py"))

RUN_DIRECTORY = Path(os.environ.get("DIFFERENTIAL_RUN_DIRECTORY", "/results"))
OUTPUT_PATH = RUN_DIRECTORY / "python-prophet.jsonl"
PERTURBATION_REQUESTS_PATH = RUN_DIRECTORY / "perturbation-requests.json"
PERTURBATIONS_OUTPUT_PATH = RUN_DIRECTORY / "python-perturbations.jsonl"
CASE_TIMEOUT_SECONDS = int(os.environ.get("DIFFERENTIAL_CASE_TIMEOUT_SECONDS", "300"))
MAXIMUM_MESSAGE_LENGTH = 500


class CaseTimeout(Exception):
    """Raised when one case exceeds its wall-clock budget."""


def on_timeout(_signal: int, _frame: Any) -> None:
    raise CaseTimeout(f"Case exceeded {CASE_TIMEOUT_SECONDS} seconds")


def failure(stage: str, error: BaseException) -> dict[str, Any]:
    """Record the exception type and a bounded message."""

    return {
        "status": "failed",
        "stage": stage,
        "error": type(error).__name__,
        "message": str(error)[:MAXIMUM_MESSAGE_LENGTH],
    }


def run_case(differential_case: dict[str, Any]) -> dict[str, Any]:
    """Fit and predict one case through Prophet's public API."""

    dataset = differential_case["dataset"]
    try:
        training = adapter["records_frame"](dataset["observations"], include_value=True)
        future = adapter["records_frame"](dataset["predictionRows"], include_value=False)
        model = adapter["fit_model"](training, differential_case)
    except Exception as error:  # noqa: BLE001 - every failure is a recorded outcome
        return failure("fit", error)
    try:
        _, forecasts = adapter["forecast_projection"](model, future)
    except Exception as error:  # noqa: BLE001
        return failure("predict", error)

    sigma = float(np.asarray(model.params["sigma_obs"]).reshape(-1)[0])
    return {"status": "fitted", "forecasts": forecasts, "noiseScale": sigma * float(model.y_scale)}


def one_ulp(value: float, direction: str) -> float:
    """The adjacent float64 above or below `value`."""

    return float(np.nextafter(value, math.inf if direction == "up" else -math.inf))


def perturb(perturbation: str, stan_init: dict[str, Any],
            stan_data: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    """Move Prophet's initial `m` or its scaled targets by one ulp; copy everything else."""

    target, direction = perturbation.rsplit("-", 1)
    if direction not in ("up", "down"):
        raise ValueError(f"Unknown perturbation {perturbation}")
    initial = dict(stan_init)
    data = dict(stan_data)
    if target == "m":
        initial["m"] = one_ulp(initial["m"], direction)
        return initial, data
    y = np.asarray(data["y"], dtype=np.float64).copy()
    rows = {"first-y": [0], "last-y": [len(y) - 1], "all-y": range(len(y))}[target]
    for row in rows:
        y[row] = one_ulp(y[row], direction)
    data["y"] = y
    return initial, data


@contextmanager
def perturbed_oracle(perturbation: str) -> Iterator[None]:
    """Perturb what Prophet hands its unchanged CmdStan backend, keeping every control."""

    backend = prophet.models.CmdStanPyBackend
    original = backend.fit

    def fit(self: Any, stan_init: dict[str, Any], stan_data: dict[str, Any], **kwargs: Any) -> Any:
        return original(self, *perturb(perturbation, stan_init, stan_data), **kwargs)

    backend.fit = fit
    try:
        yield
    finally:
        backend.fit = original


def timed_line(differential_case: dict[str, Any], fields: dict[str, Any]) -> tuple[str, str]:
    """Run one case under the wall-clock budget and encode its JSON line and status."""

    started = time.perf_counter()
    signal.alarm(CASE_TIMEOUT_SECONDS)
    try:
        outcome = run_case(differential_case)
    except CaseTimeout as error:
        outcome = failure("fit", error)
    finally:
        signal.alarm(0)
    seconds = time.perf_counter() - started
    try:
        line = json.dumps({"caseId": differential_case["id"], **fields, **outcome,
                           "seconds": seconds}, allow_nan=False)
    except ValueError:
        outcome = failure("predict", ValueError("Prophet returned a non-finite forecast"))
        line = json.dumps({"caseId": differential_case["id"], **fields, **outcome,
                           "seconds": seconds})
    return line, f"{outcome['status']} {seconds:.2f}s"


def main() -> None:
    logging.getLogger("cmdstanpy").setLevel(logging.ERROR)
    logging.getLogger("prophet").setLevel(logging.ERROR)
    signal.signal(signal.SIGALRM, on_timeout)

    with (RUN_DIRECTORY / "cases.json").open(encoding="utf-8") as handle:
        cases = json.load(handle)

    if sys.argv[1:] == ["--perturbations"]:
        with PERTURBATION_REQUESTS_PATH.open(encoding="utf-8") as handle:
            requests = json.load(handle)
        requested = [case for case in cases if case["id"] in set(requests["caseIds"])]
        output_path = PERTURBATIONS_OUTPUT_PATH
        runs = [(case, perturbation) for case in requested
                for perturbation in requests["perturbations"]]
    else:
        output_path = OUTPUT_PATH
        runs = [(case, None) for case in cases]

    # One JSON line per run, appended as it finishes, so a crash keeps every completed outcome.
    with output_path.open("w", encoding="utf-8") as output:
        for index, (differential_case, perturbation) in enumerate(runs):
            if perturbation is None:
                line, status = timed_line(differential_case, {})
            else:
                with perturbed_oracle(perturbation):
                    line, status = timed_line(differential_case, {"perturbation": perturbation})
            output.write(line + "\n")
            output.flush()
            label = differential_case["id"] if perturbation is None else \
                f"{differential_case['id']} {perturbation}"
            print(f"python {index + 1}/{len(runs)} {label} {status}", flush=True)


if __name__ == "__main__":
    main()
