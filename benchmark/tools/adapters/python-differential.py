#!/usr/bin/env python3
"""Fit and predict generated differential cases with pinned Python Prophet 1.4.0."""

from __future__ import annotations

import json
import logging
import os
import runpy
import signal
import sys
import time
from pathlib import Path
from typing import Any

import numpy as np

ADAPTERS = Path(__file__).resolve().parent
sys.path.insert(0, str(ADAPTERS))
# Reuse the benchmark adapter's configuration, fitting and projection without running its main.
adapter = runpy.run_path(str(ADAPTERS / "python-prophet.py"))

RUN_DIRECTORY = Path(os.environ.get("DIFFERENTIAL_RUN_DIRECTORY", "/results"))
OUTPUT_PATH = RUN_DIRECTORY / "python-prophet.jsonl"
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


def main() -> None:
    logging.getLogger("cmdstanpy").setLevel(logging.ERROR)
    logging.getLogger("prophet").setLevel(logging.ERROR)
    signal.signal(signal.SIGALRM, on_timeout)

    with (RUN_DIRECTORY / "cases.json").open(encoding="utf-8") as handle:
        cases = json.load(handle)

    # One JSON line per case, appended as it finishes, so a crash keeps every completed outcome.
    with OUTPUT_PATH.open("w", encoding="utf-8") as output:
        for index, differential_case in enumerate(cases):
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
                line = json.dumps({"caseId": differential_case["id"], **outcome,
                                   "seconds": seconds}, allow_nan=False)
            except ValueError:
                outcome = failure("predict", ValueError("Prophet returned a non-finite forecast"))
                line = json.dumps({"caseId": differential_case["id"], **outcome,
                                   "seconds": seconds})
            output.write(line + "\n")
            output.flush()
            print(f"python {index + 1}/{len(cases)} {differential_case['id']} "
                  f"{outcome['status']} {seconds:.2f}s", flush=True)


if __name__ == "__main__":
    main()
