#!/usr/bin/env python3
"""Generate deterministic fixed-parameter fixtures from Python Prophet 1.4.0."""

from __future__ import annotations

import argparse
import difflib
import hashlib
import importlib.metadata
import json
import os
import platform
import re
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, NoReturn, Sequence

import numpy as np
import pandas as pd
import prophet
from prophet import Prophet
from prophet.diagnostics import generate_cutoffs, performance_metrics

from linear_optimizer_evidence import (
    linear_optimizer_evidence, map_optimizer_evidence, stan_curvature_probe,
    stan_optimization_completion, stan_unconstrained_probe,
)


EXPECTED_PROPHET_VERSION = "1.4.0"
EXPECTED_CONTAINER_PLATFORM = "linux/amd64"
FOURIER_DECIMAL_PLACES = 12
FITTED_SIGNIFICANT_DIGITS = 12
FITTED_ZERO_THRESHOLD = 1e-8
LINEAR_TREND_FILENAME = "linear-trend.json"
FOURIER_FILENAME = "fourier.json"
PIECEWISE_LINEAR_FILENAME = "piecewise-linear.json"
CHANGEPOINT_RESOLUTION_FILENAME = "changepoint-resolution.json"
EVALUATION_CUTOFFS_FILENAME = "evaluation-cutoffs.json"
EVALUATION_METRICS_FILENAME = "evaluation-metrics.json"
LINEAR_MAP_FIT_FILENAME = "linear-map-fit.json"
SEASONALITY_RESOLUTION_FILENAME = "seasonality-resolution.json"
CONDITIONAL_SEASONALITY_FILENAME = "conditional-seasonality.json"
CONDITIONAL_MAP_FIT_FILENAME = "conditional-map-fit.json"
TARGET_SCALING_FILENAME = "target-scaling.json"
MIXED_MAP_FILENAME = "mixed-map.json"
LOGISTIC_MAP_FILENAME = "logistic-map.json"
MAP_UNCERTAINTY_FILENAME = "map-uncertainty.json"
STAN_LINEAR_OPTIMIZER_FILENAME = "stan-linear-optimizer.json"
STAN_LOGISTIC_OBJECTIVE_FILENAME = "stan-logistic-objective.json"
LOGISTIC_PREDICTION_STATE_FILENAME = "logistic-prediction-state.json"
STAN_LOGISTIC_LBFGS_FILENAME = "stan-logistic-lbfgs.json"
MANIFEST_FILENAME = "manifest.json"
ROOT = Path(__file__).resolve().parents[2]
REFERENCE_PATH = ROOT / "tools" / "prophet" / "reference.json"
LOCK_PATH = ROOT / "tools" / "prophet" / "uv.lock"
GENERATOR_PATH = Path(__file__).resolve()


@dataclass(frozen=True)
class Observation:
    """One canonical timestamp and observation value used to initialize Prophet scales."""

    timestamp: str
    value: float


@dataclass(frozen=True)
class CaseSpec:
    """Authored inputs and observation-unit coefficients for one reference case."""

    identifier: str
    observations: tuple[Observation, ...]
    prediction_timestamps: tuple[str, ...]
    intercept: float
    slope: float
    absolute_tolerance: float = 1e-12
    relative_tolerance: float = 1e-12


LINEAR_TREND_CASES = (
    CaseSpec(
        identifier="irregular-positive-extrapolation",
        observations=(
            Observation("2024-01-01T00:00:00.000Z", 8.0),
            Observation("2024-01-02T12:00:00.000Z", 12.0),
            Observation("2024-01-05T00:00:00.000Z", 15.0),
            Observation("2024-01-11T00:00:00.000Z", 30.0),
        ),
        prediction_timestamps=(
            "2023-12-29T00:00:00.000Z",
            "2024-01-01T00:00:00.000Z",
            "2024-01-03T12:00:00.000Z",
            "2024-01-11T00:00:00.000Z",
            "2024-01-16T00:00:00.000Z",
        ),
        intercept=4.25,
        slope=18.75,
    ),
    CaseSpec(
        identifier="constant-negative-trend",
        observations=(
            Observation("2024-02-01T00:00:00.000Z", -2.0),
            Observation("2024-02-02T06:00:00.000Z", -4.0),
            Observation("2024-02-07T00:00:00.000Z", -3.0),
        ),
        prediction_timestamps=(
            "2024-01-31T00:00:00.000Z",
            "2024-02-01T00:00:00.000Z",
            "2024-02-04T00:00:00.000Z",
            "2024-02-09T00:00:00.000Z",
        ),
        intercept=-7.5,
        slope=0.0,
    ),
    CaseSpec(
        identifier="irregular-negative-slope",
        observations=(
            Observation("2024-03-10T00:00:00.000Z", 100.0),
            Observation("2024-03-11T00:00:00.000Z", 90.0),
            Observation("2024-03-14T12:00:00.000Z", 60.0),
            Observation("2024-03-20T00:00:00.000Z", 20.0),
        ),
        prediction_timestamps=(
            "2024-03-08T00:00:00.000Z",
            "2024-03-10T00:00:00.000Z",
            "2024-03-15T00:00:00.000Z",
            "2024-03-20T00:00:00.000Z",
            "2024-03-25T00:00:00.000Z",
        ),
        intercept=40.0,
        slope=-22.5,
    ),
)


@dataclass(frozen=True)
class FourierSeasonalitySpec:
    """One ordered seasonal component used by a fixed-feature fixture."""

    name: str
    period_days: float
    fourier_order: int
    prior_scale: float


@dataclass(frozen=True)
class FourierCaseSpec:
    """Authored timestamps, layout, and coefficients for Fourier parity."""

    identifier: str
    timestamps: tuple[str, ...]
    seasonalities: tuple[FourierSeasonalitySpec, ...]
    coefficients: tuple[float, ...]
    absolute_tolerance: float = 1e-11
    relative_tolerance: float = 1e-11


FOURIER_CASES = (
    FourierCaseSpec(
        identifier="weekly-and-fractional-day-irregular",
        timestamps=(
            "2023-12-31T18:00:00.000Z",
            "2024-01-01T00:00:00.000Z",
            "2024-01-02T07:30:00.000Z",
            "2024-02-14T12:00:00.125Z",
            "2025-06-01T03:15:00.000Z",
        ),
        seasonalities=(
            FourierSeasonalitySpec("custom-week", 7.0, 2, 10.0),
            FourierSeasonalitySpec("half-day", 0.5, 1, 2.5),
        ),
        coefficients=(0.25, -0.5, 1.25, 0.75, -2.0, 0.125),
    ),
    FourierCaseSpec(
        identifier="epoch-pre-epoch-and-repeated",
        timestamps=(
            "1970-01-01T00:00:00.000Z",
            "1969-12-31T18:00:00.000Z",
            "1970-01-01T06:00:00.000Z",
            "1970-01-01T00:00:00.000Z",
        ),
        seasonalities=(
            FourierSeasonalitySpec("one-day", 1.0, 2, 10.0),
        ),
        coefficients=(2.0, 3.0, -1.0, 0.5),
    ),
)


@dataclass(frozen=True)
class ConditionalSeasonalitySpec:
    """One seasonality and optional strict boolean condition in a reference case."""

    name: str
    period_days: float
    fourier_order: int
    prior_scale: float
    condition_name: str | None = None


@dataclass(frozen=True)
class ConditionalFeatureCaseSpec:
    """Authored conditional rows and fixed coefficients for preprocessing parity."""

    identifier: str
    timestamps: tuple[str, ...]
    seasonalities: tuple[ConditionalSeasonalitySpec, ...]
    condition_rows: tuple[dict[str, bool], ...]
    coefficients: tuple[float, ...]
    note: str


CONDITIONAL_TIMESTAMPS = (
    "2024-01-01T00:00:00.000Z",
    "2024-01-01T06:30:00.000Z",
    "2024-01-02T18:00:00.000Z",
    "2024-01-05T03:15:00.000Z",
    "2024-01-11T12:00:00.000Z",
    "2024-02-03T00:00:00.000Z",
)


CONDITIONAL_FEATURE_CASES = (
    ConditionalFeatureCaseSpec(
        identifier="all-true-agrees-with-unconditional",
        timestamps=CONDITIONAL_TIMESTAMPS,
        seasonalities=(
            ConditionalSeasonalitySpec("weekly-on", 7.0, 2, 10.0, "onSeason"),
        ),
        condition_rows=tuple({"onSeason": True} for _ in CONDITIONAL_TIMESTAMPS),
        coefficients=(0.25, -0.5, 1.25, 0.75),
        note="An all-true conditional block is identical to its ungated Fourier block.",
    ),
    ConditionalFeatureCaseSpec(
        identifier="all-false-zero-component",
        timestamps=CONDITIONAL_TIMESTAMPS,
        seasonalities=(
            ConditionalSeasonalitySpec("weekly-off", 7.0, 2, 10.0, "onSeason"),
        ),
        condition_rows=tuple({"onSeason": False} for _ in CONDITIONAL_TIMESTAMPS),
        coefficients=(0.25, -0.5, 1.25, 0.75),
        note="A condition may be constant false; every gated feature and component is exact zero.",
    ),
    ConditionalFeatureCaseSpec(
        identifier="alternating-shared-condition",
        timestamps=CONDITIONAL_TIMESTAMPS,
        seasonalities=(
            ConditionalSeasonalitySpec("weekly-on", 7.0, 1, 10.0, "onSeason"),
            ConditionalSeasonalitySpec("half-day-on", 0.5, 1, 3.0, "onSeason"),
        ),
        condition_rows=tuple(
            {"onSeason": index % 2 == 0} for index, _ in enumerate(CONDITIONAL_TIMESTAMPS)
        ),
        coefficients=(0.5, -0.25, 1.5, 0.125),
        note="Two components deliberately share one alternating condition.",
    ),
    ConditionalFeatureCaseSpec(
        identifier="independent-conditions-with-unconditional",
        timestamps=CONDITIONAL_TIMESTAMPS,
        seasonalities=(
            ConditionalSeasonalitySpec("three-day", 3.0, 1, 4.0),
            ConditionalSeasonalitySpec("weekly-on", 7.0, 1, 10.0, "onSeason"),
            ConditionalSeasonalitySpec("daily-promotion", 1.0, 1, 5.0, "promotion"),
        ),
        condition_rows=tuple(
            {"onSeason": index in {0, 1, 4}, "promotion": index in {1, 2, 5}}
            for index, _ in enumerate(CONDITIONAL_TIMESTAMPS)
        ),
        coefficients=(0.2, 0.4, -0.5, 0.75, 1.0, -0.25),
        note="Independent conditions and one unconditional component preserve source order.",
    ),
    ConditionalFeatureCaseSpec(
        identifier="prediction-regime-absent-from-training",
        timestamps=CONDITIONAL_TIMESTAMPS,
        seasonalities=(
            ConditionalSeasonalitySpec("weekly-future", 7.0, 1, 10.0, "futureRegime"),
        ),
        condition_rows=tuple(
            {"futureRegime": index == len(CONDITIONAL_TIMESTAMPS) - 1}
            for index, _ in enumerate(CONDITIONAL_TIMESTAMPS)
        ),
        coefficients=(0.75, -0.5),
        note="The final prediction-style row enables a regime that is absent in preceding rows.",
    ),
)


@dataclass(frozen=True)
class PiecewiseLinearCaseSpec:
    """Fixed piecewise trend and optional Fourier composition inputs."""

    identifier: str
    observations: tuple[Observation, ...]
    prediction_timestamps: tuple[str, ...]
    changepoint_timestamps: tuple[str, ...]
    intercept: float
    slope: float
    deltas: tuple[float, ...]
    seasonalities: tuple[FourierSeasonalitySpec, ...] = ()
    seasonal_coefficients: tuple[float, ...] = ()
    absolute_tolerance: float = 1e-10
    relative_tolerance: float = 1e-10


PIECEWISE_LINEAR_CASES = (
    PiecewiseLinearCaseSpec(
        identifier="two-break-irregular-with-seasonalities",
        observations=(
            Observation("2024-01-01T00:00:00.000Z", 8.0),
            Observation("2024-01-02T12:00:00.000Z", 12.0),
            Observation("2024-01-05T00:00:00.000Z", 15.0),
            Observation("2024-01-11T00:00:00.000Z", 30.0),
        ),
        prediction_timestamps=(
            "2023-12-30T00:00:00.000Z",
            "2024-01-01T00:00:00.000Z",
            "2024-01-03T06:00:00.000Z",
            "2024-01-05T00:00:00.000Z",
            "2024-01-08T00:00:00.000Z",
            "2024-01-12T00:00:00.000Z",
        ),
        changepoint_timestamps=(
            "2024-01-03T06:00:00.000Z",
            "2024-01-08T00:00:00.000Z",
        ),
        intercept=4.25,
        slope=18.75,
        deltas=(-8.5, 12.0),
        seasonalities=(
            FourierSeasonalitySpec("custom-week", 7.0, 1, 10.0),
            FourierSeasonalitySpec("half-day", 0.5, 1, 2.5),
        ),
        seasonal_coefficients=(0.25, -0.5, -2.0, 0.125),
    ),
    PiecewiseLinearCaseSpec(
        identifier="inclusive-endpoint-changepoints",
        observations=(
            Observation("2024-02-01T00:00:00.000Z", -2.0),
            Observation("2024-02-02T12:00:00.000Z", 4.0),
            Observation("2024-02-05T00:00:00.000Z", 1.0),
        ),
        prediction_timestamps=(
            "2024-01-31T00:00:00.000Z",
            "2024-02-01T00:00:00.000Z",
            "2024-02-03T00:00:00.000Z",
            "2024-02-05T00:00:00.000Z",
            "2024-02-07T00:00:00.000Z",
        ),
        changepoint_timestamps=(
            "2024-02-01T00:00:00.000Z",
            "2024-02-05T00:00:00.000Z",
        ),
        intercept=-2.0,
        slope=4.0,
        deltas=(1.5, -3.0),
    ),
    PiecewiseLinearCaseSpec(
        identifier="no-changepoint-linear-reduction",
        observations=(
            Observation("2024-03-01T00:00:00.000Z", 2.0),
            Observation("2024-03-04T00:00:00.000Z", -1.0),
        ),
        prediction_timestamps=(
            "2024-02-28T00:00:00.000Z",
            "2024-03-01T00:00:00.000Z",
            "2024-03-02T12:00:00.000Z",
            "2024-03-04T00:00:00.000Z",
            "2024-03-06T00:00:00.000Z",
        ),
        changepoint_timestamps=(),
        intercept=3.0,
        slope=-5.0,
        deltas=(),
    ),
)


@dataclass(frozen=True)
class ChangepointResolutionCaseSpec:
    """Ordered training rows and automatic candidate controls."""

    identifier: str
    offsets_milliseconds: tuple[int, ...]
    count: int
    range: float


@dataclass(frozen=True)
class EvaluationCutoffCaseSpec:
    """Authored release cutoff-generation inputs with explicit fixed-ms durations."""

    identifier: str
    offsets_milliseconds: tuple[int, ...]
    horizon_ms: int
    initial_ms: int
    period_ms: int


@dataclass(frozen=True)
class SeasonalityResolutionCaseSpec:
    """Training history and explicit controls for one built-in policy fixture."""

    identifier: str
    offsets_milliseconds: tuple[int, ...]
    yearly: str | bool | int = False
    weekly: str | bool | int = False
    daily: str | bool | int = False
    custom_seasonalities: tuple[FourierSeasonalitySpec, ...] = ()
    mapping_note: str = "Controls map directly; package built-ins are opt-in and default to off."


DAY_MILLISECONDS = 86_400_000


CHANGEPOINT_RESOLUTION_CASES = (
    ChangepointResolutionCaseSpec(
        "duplicate-generated-candidates", tuple((index // 4) * DAY_MILLISECONDS for index in range(96)), 25, 0.8
    ),
    ChangepointResolutionCaseSpec(
        "ties-to-even-six-rows", tuple(index * DAY_MILLISECONDS for index in range(6)), 2, 1.0
    ),
    ChangepointResolutionCaseSpec(
        "irregular-row-index-spacing",
        (
            0,
            DAY_MILLISECONDS,
            2 * DAY_MILLISECONDS,
            20 * DAY_MILLISECONDS,
            21 * DAY_MILLISECONDS,
            90 * DAY_MILLISECONDS,
        ),
        3,
        0.8,
    ),
    ChangepointResolutionCaseSpec(
        "requested-zero", tuple(index * DAY_MILLISECONDS for index in range(8)), 0, 0.8
    ),
    ChangepointResolutionCaseSpec(
        "count-reduced", tuple(index * DAY_MILLISECONDS for index in range(4)), 25, 1.0
    ),
    ChangepointResolutionCaseSpec("one-row", (0,), 25, 0.8),
    ChangepointResolutionCaseSpec(
        "tiny-range", tuple(index * DAY_MILLISECONDS for index in range(10)), 25, 0.01
    ),
    ChangepointResolutionCaseSpec(
        "default-controls", tuple(index * DAY_MILLISECONDS for index in range(40)), 25, 0.8
    ),
)


EVALUATION_CUTOFF_CASES = (
    EvaluationCutoffCaseSpec(
        "daily-default", tuple(index * DAY_MILLISECONDS for index in range(12)),
        2 * DAY_MILLISECONDS, 6 * DAY_MILLISECONDS, DAY_MILLISECONDS,
    ),
    EvaluationCutoffCaseSpec(
        "subdaily-odd-ms", tuple(range(41)), 5, 15, 3,
    ),
    EvaluationCutoffCaseSpec(
        "irregular-gap", (0, 4 * DAY_MILLISECONDS, *(index * DAY_MILLISECONDS for index in range(20, 25))),
        2 * DAY_MILLISECONDS, DAY_MILLISECONDS, DAY_MILLISECONDS,
    ),
)


SEASONALITY_RESOLUTION_CASES = (
    SeasonalityResolutionCaseSpec("daily-span-just-below", (0, DAY_MILLISECONDS // 2, 2 * DAY_MILLISECONDS - 1), daily="auto"),
    SeasonalityResolutionCaseSpec("daily-span-exact", (0, DAY_MILLISECONDS // 2, 2 * DAY_MILLISECONDS), daily="auto"),
    SeasonalityResolutionCaseSpec("daily-span-just-above", (0, DAY_MILLISECONDS // 2, 2 * DAY_MILLISECONDS + 1), daily="auto"),
    SeasonalityResolutionCaseSpec("weekly-span-just-below", (0, DAY_MILLISECONDS, 14 * DAY_MILLISECONDS - 1), weekly="auto"),
    SeasonalityResolutionCaseSpec("weekly-span-exact", (0, DAY_MILLISECONDS, 14 * DAY_MILLISECONDS), weekly="auto"),
    SeasonalityResolutionCaseSpec("weekly-span-just-above", (0, DAY_MILLISECONDS, 14 * DAY_MILLISECONDS + 1), weekly="auto"),
    SeasonalityResolutionCaseSpec("yearly-span-just-below", (0, 730 * DAY_MILLISECONDS - 1), yearly="auto"),
    SeasonalityResolutionCaseSpec("yearly-span-exact", (0, 730 * DAY_MILLISECONDS), yearly="auto"),
    SeasonalityResolutionCaseSpec("yearly-span-just-above", (0, 730 * DAY_MILLISECONDS + 1), yearly="auto"),
    SeasonalityResolutionCaseSpec("daily-gap-exact", (0, DAY_MILLISECONDS, 2 * DAY_MILLISECONDS), daily="auto"),
    SeasonalityResolutionCaseSpec("daily-gap-just-below", (0, DAY_MILLISECONDS - 1, 2 * DAY_MILLISECONDS), daily="auto"),
    SeasonalityResolutionCaseSpec("weekly-gap-exact", (0, 7 * DAY_MILLISECONDS, 14 * DAY_MILLISECONDS), weekly="auto"),
    SeasonalityResolutionCaseSpec("weekly-gap-just-below", (0, 7 * DAY_MILLISECONDS - 1, 14 * DAY_MILLISECONDS), weekly="auto"),
    SeasonalityResolutionCaseSpec("irregular-minimum-gap", (0, DAY_MILLISECONDS // 2, 20 * DAY_MILLISECONDS), weekly="auto", daily="auto"),
    SeasonalityResolutionCaseSpec("one-point-history", (0,), yearly="auto", weekly="auto", daily="auto"),
    SeasonalityResolutionCaseSpec("daily-only-sampling", tuple(index * DAY_MILLISECONDS for index in range(15)), weekly="auto", daily="auto"),
    SeasonalityResolutionCaseSpec("weekly-only-sampling", (0, 7 * DAY_MILLISECONDS, 14 * DAY_MILLISECONDS), weekly="auto", daily="auto"),
    SeasonalityResolutionCaseSpec("subdaily-history", (0, DAY_MILLISECONDS // 2, 2 * DAY_MILLISECONDS), daily="auto"),
    SeasonalityResolutionCaseSpec("explicit-off-long-history", (0, DAY_MILLISECONDS // 2, 730 * DAY_MILLISECONDS), yearly=False, weekly=False, daily=False),
    SeasonalityResolutionCaseSpec("explicit-on-short-history", (0,), yearly=True, weekly=True, daily=True),
    SeasonalityResolutionCaseSpec("explicit-order-overrides", (0,), yearly=6, weekly=5, daily=2),
    SeasonalityResolutionCaseSpec(
        "custom-coexistence",
        (0, DAY_MILLISECONDS // 2, 14 * DAY_MILLISECONDS),
        weekly="auto",
        daily="auto",
        custom_seasonalities=(FourierSeasonalitySpec("weekly-custom", 7.0, 1, 4.0),),
        mapping_note="The non-reserved custom component coexists with built-ins; package output keeps custom definitions first.",
    ),
)


def fail(message: str) -> NoReturn:
    """Terminate the command with an actionable fixture-generation failure."""

    raise SystemExit(message)


def sha256_file(path: Path) -> str:
    """Return the lowercase SHA-256 digest of a file."""

    digest = hashlib.sha256()

    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)

    return digest.hexdigest()


def stable_json(value: Any) -> bytes:
    """Encode JSON with deterministic ordering and no non-finite extensions."""

    return (json.dumps(value, allow_nan=False, indent=2, sort_keys=True) + "\n").encode("utf-8")


def canonical_fourier_float(value: np.floating[Any]) -> float:
    """Round CPU-sensitive trigonometric output into the fixture precision contract."""

    rounded = round(float(value), FOURIER_DECIMAL_PLACES)

    return 0.0 if rounded == 0.0 else rounded


def canonical_fitted_float(
    value: Any, *, zero_threshold: float = FITTED_ZERO_THRESHOLD
) -> float:
    """Canonicalize optimizer output across supported amd64 CPU implementations."""

    numeric = float(value)

    if abs(numeric) < zero_threshold:
        return 0.0

    rounded = float(format(numeric, f".{FITTED_SIGNIFICANT_DIGITS}g"))

    return 0.0 if rounded == 0.0 else rounded


def read_reference() -> dict[str, str]:
    """Read and minimally parse the source identity established by EP-013."""

    try:
        value = json.loads(REFERENCE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        fail(f"Unable to read {REFERENCE_PATH}: {error}")

    expected_keys = {"distribution", "repository", "sourceCommit", "tag", "version"}

    if not isinstance(value, dict) or set(value) != expected_keys:
        fail(f"{REFERENCE_PATH} does not contain the expected reference identity")

    if not all(isinstance(value[key], str) and value[key] for key in expected_keys):
        fail(f"{REFERENCE_PATH} contains an invalid reference identity")

    return value


def require_environment(reference: dict[str, str]) -> dict[str, str]:
    """Verify the installed oracle and canonical container execution envelope."""

    installed_version = importlib.metadata.version(reference["distribution"])

    if installed_version != EXPECTED_PROPHET_VERSION or installed_version != reference["version"]:
        fail(
            "Reference fixture generation requires "
            f"prophet=={EXPECTED_PROPHET_VERSION}; found {installed_version}"
        )

    image = os.environ.get("EFFECT_PROPHET_REFERENCE_BASE_IMAGE")
    target_platform = os.environ.get("EFFECT_PROPHET_TARGET_PLATFORM")

    if not image or target_platform != EXPECTED_CONTAINER_PLATFORM:
        fail(
            "Reference fixtures must be generated in the pinned Docker environment; "
            "use npm run fixtures:generate or npm run fixtures:check"
        )

    if platform.system() != "Linux" or platform.machine() not in {"x86_64", "AMD64"}:
        fail("The canonical reference environment must execute as linux/amd64")

    uv_version = subprocess.run(
        ["uv", "--version"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()

    return {
        "baseImage": image,
        "platform": target_platform,
        "uvVersion": uv_version.removeprefix("uv "),
    }


def prophet_timestamp(timestamp: str) -> str:
    """Convert canonical UTC text to Prophet's timezone-naive timestamp representation."""

    if not timestamp.endswith("Z"):
        fail(f"Fixture timestamp is not canonical UTC: {timestamp}")

    parsed = pd.Timestamp(timestamp)

    if parsed.tzinfo is None:
        fail(f"Fixture timestamp did not parse as UTC: {timestamp}")

    return parsed.tz_convert("UTC").tz_localize(None).isoformat()


def epoch_milliseconds(timestamp: pd.Timestamp) -> int:
    """Convert a timezone-naive Prophet timestamp to Unix epoch milliseconds."""

    return timestamp.value // 1_000_000


def make_case(spec: CaseSpec) -> dict[str, Any]:
    """Evaluate one fixed trend through Prophet preprocessing and trend code without fitting."""

    model = Prophet(
        growth="linear",
        changepoints=[],
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )

    training = pd.DataFrame(
        {
            "ds": [prophet_timestamp(item.timestamp) for item in spec.observations],
            "y": [item.value for item in spec.observations],
        }
    )
    prepared_training = model.setup_dataframe(training, initialize_scales=True)

    if model.start is None or model.t_scale is None or model.y_scale is None:
        fail(f"Prophet did not initialize scales for case {spec.identifier}")

    time_origin = epoch_milliseconds(model.start)
    time_scale = int(model.t_scale.total_seconds() * 1_000)
    floor = 0.0

    # Prophet evaluates (k * t + m) * y_scale + floor. The fixture contract stores
    # coefficients in observation units, so conversion into Prophet's scaled state is explicit.
    scaled_k = spec.slope / model.y_scale
    scaled_m = (spec.intercept - floor) / model.y_scale

    model.changepoints_t = np.array([], dtype=np.float64)
    model.params = {
        "k": np.array([[scaled_k]], dtype=np.float64),
        "m": np.array([[scaled_m]], dtype=np.float64),
        "delta": np.empty((1, 0), dtype=np.float64),
    }

    prediction = pd.DataFrame(
        {"ds": [prophet_timestamp(timestamp) for timestamp in spec.prediction_timestamps]}
    )
    prepared_prediction = model.setup_dataframe(prediction, initialize_scales=False)
    trend = model.predict_trend(prepared_prediction)

    return {
        "expected": {
            "scaledPredictionTimes": [float(value) for value in prepared_prediction["t"]],
            "scaledTrainingTimes": [float(value) for value in prepared_training["t"]],
            "trend": [float(value) for value in trend],
        },
        "id": spec.identifier,
        "kind": "fixed-linear-trend",
        "observations": [
            {"timestamp": item.timestamp, "value": item.value} for item in spec.observations
        ],
        "parameters": {
            "intercept": spec.intercept,
            "slope": spec.slope,
            "timeOrigin": time_origin,
            "timeScale": time_scale,
        },
        "predictionTimestamps": list(spec.prediction_timestamps),
        "tolerance": {
            "absolute": spec.absolute_tolerance,
            "relative": spec.relative_tolerance,
        },
    }


def make_fourier_case(spec: FourierCaseSpec) -> dict[str, Any]:
    """Generate Fourier columns with unmodified Prophet and evaluate fixed components."""

    dates = pd.Series(
        pd.to_datetime(
            [prophet_timestamp(timestamp) for timestamp in spec.timestamps], format="mixed"
        )
    )
    feature_blocks: list[np.ndarray] = []
    component_blocks: list[np.ndarray] = []
    coefficient_offset = 0

    for seasonality in spec.seasonalities:
        block = Prophet.fourier_series(
            dates,
            period=seasonality.period_days,
            series_order=seasonality.fourier_order,
        )
        component_coefficient_count = seasonality.fourier_order * 2
        component_coefficients = np.asarray(
            spec.coefficients[
                coefficient_offset : coefficient_offset + component_coefficient_count
            ],
            dtype=np.float64,
        )

        if component_coefficients.size != component_coefficient_count:
            fail(f"Misaligned Fourier coefficients for case {spec.identifier}")

        feature_blocks.append(block)
        component_blocks.append(block @ component_coefficients)
        coefficient_offset += component_coefficient_count

    if coefficient_offset != len(spec.coefficients):
        fail(f"Extra Fourier coefficients for case {spec.identifier}")

    row_count = len(spec.timestamps)
    features = (
        np.concatenate(feature_blocks, axis=1)
        if feature_blocks
        else np.empty((row_count, 0), dtype=np.float64)
    )
    components = (
        np.column_stack(component_blocks)
        if component_blocks
        else np.empty((row_count, 0), dtype=np.float64)
    )

    return {
        "coefficients": list(spec.coefficients),
        "expected": {
            "columnCount": int(features.shape[1]),
            "componentsRowMajor": [
                canonical_fourier_float(value) for value in components.ravel()
            ],
            "featuresRowMajor": [
                canonical_fourier_float(value) for value in features.ravel()
            ],
            "rowCount": row_count,
        },
        "id": spec.identifier,
        "kind": "fourier-features",
        "seasonalities": [
            {
                "fourierOrder": seasonality.fourier_order,
                "name": seasonality.name,
                "periodDays": seasonality.period_days,
                "priorScale": seasonality.prior_scale,
            }
            for seasonality in spec.seasonalities
        ],
        "timestamps": list(spec.timestamps),
        "tolerance": {
            "absolute": spec.absolute_tolerance,
            "relative": spec.relative_tolerance,
        },
    }


def make_conditional_feature_case(spec: ConditionalFeatureCaseSpec) -> dict[str, Any]:
    """Generate gated Fourier columns through unmodified Prophet condition behavior."""

    if len(spec.timestamps) != len(spec.condition_rows):
        fail(f"Misaligned condition rows for case {spec.identifier}")

    coefficient_count = sum(
        seasonality.fourier_order * 2 for seasonality in spec.seasonalities
    )

    if coefficient_count != len(spec.coefficients):
        fail(f"Misaligned conditional coefficients for case {spec.identifier}")

    model = Prophet(
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )

    for seasonality in spec.seasonalities:
        model.add_seasonality(
            name=seasonality.name,
            period=seasonality.period_days,
            fourier_order=seasonality.fourier_order,
            prior_scale=seasonality.prior_scale,
            condition_name=seasonality.condition_name,
        )

    frame_values: dict[str, Any] = {
        "ds": pd.to_datetime(
            [prophet_timestamp(timestamp) for timestamp in spec.timestamps], format="mixed"
        )
    }

    condition_names = sorted(
        {
            seasonality.condition_name
            for seasonality in spec.seasonalities
            if seasonality.condition_name is not None
        }
    )

    for condition_name in condition_names:
        frame_values[condition_name] = [
            row[condition_name] for row in spec.condition_rows
        ]

    frame = pd.DataFrame(frame_values)
    gated_features, _, _, _ = model.make_all_seasonality_features(frame)
    ungated_blocks: list[np.ndarray] = []
    manually_gated_blocks: list[np.ndarray] = []
    component_blocks: list[np.ndarray] = []
    coefficient_offset = 0

    for seasonality in spec.seasonalities:
        block = Prophet.fourier_series(
            frame["ds"], seasonality.period_days, seasonality.fourier_order
        )
        count = seasonality.fourier_order * 2
        coefficients = np.asarray(
            spec.coefficients[coefficient_offset : coefficient_offset + count],
            dtype=np.float64,
        )
        mask = (
            np.ones(len(frame), dtype=np.float64)
            if seasonality.condition_name is None
            else frame[seasonality.condition_name].to_numpy(dtype=np.float64)
        )
        gated_block = block * mask[:, np.newaxis]

        ungated_blocks.append(block)
        manually_gated_blocks.append(gated_block)
        component_blocks.append(gated_block @ coefficients)
        coefficient_offset += count

    ungated = np.concatenate(ungated_blocks, axis=1)
    manually_gated = np.concatenate(manually_gated_blocks, axis=1)
    gated = gated_features.to_numpy(dtype=np.float64)
    components = np.column_stack(component_blocks)

    if not np.array_equal(gated, manually_gated):
        fail(f"Unexpected Prophet condition gating for case {spec.identifier}")

    return {
        "coefficients": list(spec.coefficients),
        "conditionRows": list(spec.condition_rows),
        "expected": {
            "columnCount": int(gated.shape[1]),
            "componentsRowMajor": [
                canonical_fourier_float(value) for value in components.ravel()
            ],
            "gatedFeaturesRowMajor": [
                canonical_fourier_float(value) for value in gated.ravel()
            ],
            "rowCount": len(spec.timestamps),
            "ungatedFeaturesRowMajor": [
                canonical_fourier_float(value) for value in ungated.ravel()
            ],
        },
        "id": spec.identifier,
        "kind": "conditional-seasonality-features",
        "note": spec.note,
        "seasonalities": [
            {
                "fourierOrder": seasonality.fourier_order,
                "name": seasonality.name,
                "periodDays": seasonality.period_days,
                "priorScale": seasonality.prior_scale,
                **(
                    {}
                    if seasonality.condition_name is None
                    else {"conditionName": seasonality.condition_name}
                ),
            }
            for seasonality in spec.seasonalities
        ],
        "timestamps": list(spec.timestamps),
        "tolerance": {"absolute": 1e-11, "relative": 1e-11},
    }


def make_piecewise_linear_case(spec: PiecewiseLinearCaseSpec) -> dict[str, Any]:
    """Evaluate fixed piecewise and Fourier parameters through unmodified Prophet."""

    if len(spec.changepoint_timestamps) != len(spec.deltas):
        fail(f"Misaligned changepoints and deltas for case {spec.identifier}")

    model = Prophet(
        growth="linear",
        changepoints=[],
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    training = pd.DataFrame(
        {
            "ds": [prophet_timestamp(item.timestamp) for item in spec.observations],
            "y": [item.value for item in spec.observations],
        }
    )
    prepared_training = model.setup_dataframe(training, initialize_scales=True)

    if model.start is None or model.t_scale is None or model.y_scale is None:
        fail(f"Prophet did not initialize scales for case {spec.identifier}")

    changepoints = pd.Series(
        pd.to_datetime(
            [prophet_timestamp(timestamp) for timestamp in spec.changepoint_timestamps],
            format="mixed",
        )
    )
    scaled_changepoints = np.asarray(
        (changepoints - model.start) / model.t_scale,
        dtype=np.float64,
    )

    model.changepoints_t = scaled_changepoints
    model.params = {
        "k": np.array([[spec.slope / model.y_scale]], dtype=np.float64),
        "m": np.array([[spec.intercept / model.y_scale]], dtype=np.float64),
        "delta": np.array(
            [[delta / model.y_scale for delta in spec.deltas]],
            dtype=np.float64,
        ),
    }

    prediction = pd.DataFrame(
        {"ds": [prophet_timestamp(timestamp) for timestamp in spec.prediction_timestamps]}
    )
    prepared_prediction = model.setup_dataframe(prediction, initialize_scales=False)
    trend = np.asarray(model.predict_trend(prepared_prediction), dtype=np.float64)

    feature_blocks: list[np.ndarray] = []
    component_blocks: list[np.ndarray] = []
    coefficient_offset = 0

    for seasonality in spec.seasonalities:
        block = Prophet.fourier_series(
            prepared_prediction["ds"],
            period=seasonality.period_days,
            series_order=seasonality.fourier_order,
        )
        component_coefficient_count = seasonality.fourier_order * 2
        coefficients = np.asarray(
            spec.seasonal_coefficients[
                coefficient_offset : coefficient_offset + component_coefficient_count
            ],
            dtype=np.float64,
        )

        if coefficients.size != component_coefficient_count:
            fail(f"Misaligned seasonal coefficients for case {spec.identifier}")

        feature_blocks.append(block)
        component_blocks.append(block @ coefficients)
        coefficient_offset += component_coefficient_count

    if coefficient_offset != len(spec.seasonal_coefficients):
        fail(f"Extra seasonal coefficients for case {spec.identifier}")

    row_count = len(spec.prediction_timestamps)
    features = (
        np.concatenate(feature_blocks, axis=1)
        if feature_blocks
        else np.empty((row_count, 0), dtype=np.float64)
    )
    components = (
        np.column_stack(component_blocks)
        if component_blocks
        else np.empty((row_count, 0), dtype=np.float64)
    )
    additive = components.sum(axis=1)
    value = trend + additive

    return {
        "changepointTimestamps": list(spec.changepoint_timestamps),
        "expected": {
            "additive": [float(item) for item in additive],
            "featuresRowMajor": [
                canonical_fourier_float(item) for item in features.ravel()
            ],
            "scaledChangepointTimes": [float(item) for item in scaled_changepoints],
            "scaledPredictionTimes": [float(item) for item in prepared_prediction["t"]],
            "scaledTrainingTimes": [float(item) for item in prepared_training["t"]],
            "seasonalComponentsRowMajor": [
                canonical_fourier_float(item) for item in components.ravel()
            ],
            "trend": [float(item) for item in trend],
            "value": [float(item) for item in value],
        },
        "id": spec.identifier,
        "kind": "fixed-piecewise-linear",
        "observations": [
            {"timestamp": item.timestamp, "value": item.value} for item in spec.observations
        ],
        "parameters": {
            "deltas": list(spec.deltas),
            "intercept": spec.intercept,
            "seasonalCoefficients": list(spec.seasonal_coefficients),
            "slope": spec.slope,
            "timeOrigin": epoch_milliseconds(model.start),
            "timeScale": int(model.t_scale.total_seconds() * 1_000),
        },
        "predictionTimestamps": list(spec.prediction_timestamps),
        "seasonalities": [
            {
                "fourierOrder": seasonality.fourier_order,
                "name": seasonality.name,
                "periodDays": seasonality.period_days,
                "priorScale": seasonality.prior_scale,
            }
            for seasonality in spec.seasonalities
        ],
        "tolerance": {
            "absolute": spec.absolute_tolerance,
            "relative": spec.relative_tolerance,
        },
    }


def timestamp_from_offset(offset_milliseconds: int) -> str:
    """Render a fixture offset as canonical UTC text with millisecond precision."""

    instant = datetime(2020, 1, 1, tzinfo=timezone.utc) + timedelta(milliseconds=offset_milliseconds)

    return instant.isoformat(timespec="milliseconds").replace("+00:00", "Z")


def effect_built_in_setting(control: str | bool | int) -> str | dict[str, Any]:
    """Map an explicit Python Prophet control to the package's public option syntax."""

    if control == "auto":
        return "auto"

    if control is False:
        return "off"

    if control is True:
        return {"mode": "on"}

    return {"fourierOrder": control, "mode": "on"}


def make_evaluation_cutoff_case(spec: EvaluationCutoffCaseSpec) -> dict[str, Any]:
    """Use unmodified release generate_cutoffs and the release's fold inequalities."""

    history = pd.DataFrame({
        "ds": pd.to_datetime(
            [prophet_timestamp(timestamp_from_offset(offset)) for offset in spec.offsets_milliseconds],
            format="mixed",
        )
    })
    horizon = pd.Timedelta(milliseconds=spec.horizon_ms)
    cutoffs = generate_cutoffs(
        history, horizon, pd.Timedelta(milliseconds=spec.initial_ms),
        pd.Timedelta(milliseconds=spec.period_ms),
    )

    def render(date: pd.Timestamp) -> str:
        return date.tz_localize("UTC").isoformat(timespec="milliseconds").replace("+00:00", "Z")

    return {
        "id": spec.identifier,
        "kind": "evaluation-cutoffs",
        "sourceMethod": "Prophet 1.4.0 generate_cutoffs",
        "trainingTimestamps": [timestamp_from_offset(offset) for offset in spec.offsets_milliseconds],
        "horizonMs": spec.horizon_ms,
        "initialMs": spec.initial_ms,
        "periodMs": spec.period_ms,
        "expectedCutoffs": [render(cutoff) for cutoff in cutoffs],
        "expectedFoldCounts": [
            {
                "training": int((history.ds <= cutoff).sum()),
                "assessment": int(((history.ds > cutoff) & (history.ds <= cutoff + horizon)).sum()),
            }
            for cutoff in cutoffs
        ],
    }


def make_evaluation_metrics_fixture() -> dict[str, Any]:
    """Pin unmodified Prophet metrics on nonzero, finite interval forecast instances.

    Distinct horizons make Python's rolling boundary and our whole-group boundary
    identical here; overlapping-horizon differences are covered in the TS tests.
    """
    offsets = (1, 2, 3, 4)
    actuals = (2.0, -4.0, 4.0, 8.0)
    predictions = (1.0, -2.0, 2.0, 6.0)
    lower = (1.0, -4.0, 1.0, 6.0)
    upper = (2.0, -2.0, 4.0, 7.0)
    cutoff = pd.Timestamp("2024-01-01")
    frame = pd.DataFrame({
        "ds": [cutoff + pd.Timedelta(days=offset) for offset in offsets],
        "cutoff": [cutoff] * len(offsets),
        "y": actuals,
        "yhat": predictions,
        "yhat_lower": lower,
        "yhat_upper": upper,
    })
    names = ["mae", "mse", "rmse", "mape", "mdape", "smape", "coverage"]
    modes = {"rows": -1.0, "horizons": 0.0, "rolling": 0.5, "overall": 1.0}
    expected = {}
    for mode, window in modes.items():
        reference = performance_metrics(frame, metrics=names.copy(), rolling_window=window)
        assert reference is not None
        expected[mode] = [
            {
                "horizonMs": int(row.horizon / pd.Timedelta(milliseconds=1)),
                "scores": {name: float(format(getattr(row, name), ".12g")) for name in names},
            }
            for row in reference.itertuples()
        ]

    return {
        "kind": "evaluation-metrics",
        "sourceMethod": "Prophet 1.4.0 performance_metrics",
        "rows": [
            {
                "horizonMs": offset * 86_400_000,
                "actual": actual,
                "predicted": predicted,
                "lower": low,
                "upper": high,
            }
            for offset, actual, predicted, low, high in zip(offsets, actuals, predictions, lower, upper)
        ],
        "expected": expected,
    }


def make_changepoint_resolution_case(spec: ChangepointResolutionCaseSpec) -> dict[str, Any]:
    """Resolve automatic candidates through the unmodified release policy."""

    training_timestamps = [
        timestamp_from_offset(offset) for offset in spec.offsets_milliseconds
    ]
    history_dates = pd.to_datetime(
        [prophet_timestamp(timestamp) for timestamp in training_timestamps],
        format="mixed",
    )
    model = Prophet(
        n_changepoints=spec.count,
        changepoint_range=spec.range,
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
    )
    model.history = pd.DataFrame({"ds": history_dates})
    model.start = history_dates.min()
    model.t_scale = history_dates.max() - model.start
    model.set_changepoints()
    selected_indexes = [
        int(np.flatnonzero(history_dates == timestamp)[0])
        for timestamp in model.changepoints
    ]
    selected_timestamps = [
        pd.Timestamp(timestamp)
        .tz_localize("UTC")
        .isoformat(timespec="milliseconds")
        .replace("+00:00", "Z")
        for timestamp in model.changepoints
    ]

    return {
        "controls": {"count": spec.count, "range": spec.range},
        "expectedSelectedIndexes": selected_indexes,
        "expectedSelectedTimestamps": selected_timestamps,
        "id": spec.identifier,
        "kind": "changepoint-resolution",
        "note": "Expected values exclude Prophet's private dummy zero-time fitting column.",
        "trainingTimestamps": training_timestamps,
    }


def make_seasonality_resolution_case(spec: SeasonalityResolutionCaseSpec) -> dict[str, Any]:
    """Resolve built-ins through unmodified Prophet's training-history policy."""

    model = Prophet(
        yearly_seasonality=spec.yearly,
        weekly_seasonality=spec.weekly,
        daily_seasonality=spec.daily,
    )

    for seasonality in spec.custom_seasonalities:
        model.add_seasonality(
            name=seasonality.name,
            period=seasonality.period_days,
            fourier_order=seasonality.fourier_order,
            prior_scale=seasonality.prior_scale,
        )

    training_timestamps = [
        timestamp_from_offset(offset) for offset in spec.offsets_milliseconds
    ]
    model.history = pd.DataFrame(
        {
            "ds": pd.to_datetime(
                [prophet_timestamp(timestamp) for timestamp in training_timestamps],
                format="mixed",
            )
        }
    )
    model.set_auto_seasonalities()

    expected_enabled = []

    for name in ("yearly", "weekly", "daily"):
        resolved = model.seasonalities.get(name)

        if resolved is None:
            continue

        expected_enabled.append(
            {
                "fourierOrder": resolved["fourier_order"],
                "name": name,
                "periodDays": resolved["period"],
                "priorScale": resolved["prior_scale"],
            }
        )

    return {
        "configurationMapping": {
            "effectProphetBuiltIns": {
                "daily": effect_built_in_setting(spec.daily),
                "weekly": effect_built_in_setting(spec.weekly),
                "yearly": effect_built_in_setting(spec.yearly),
            },
            "effectProphetCustomSeasonalities": [
                {
                    "fourierOrder": seasonality.fourier_order,
                    "name": seasonality.name,
                    "periodDays": seasonality.period_days,
                    "priorScale": seasonality.prior_scale,
                }
                for seasonality in spec.custom_seasonalities
            ],
            "note": spec.mapping_note,
        },
        "expectedEnabled": expected_enabled,
        "id": spec.identifier,
        "kind": "seasonality-resolution",
        "trainingTimestamps": training_timestamps,
        "upstreamControls": {
            "daily": spec.daily,
            "weekly": spec.weekly,
            "yearly": spec.yearly,
        },
    }


def make_linear_map_fit_fixture(history_variant: str = "ordered") -> dict[str, Any]:
    """Fit shared explicit MAP controls, including stable sorting and retained duplicates."""

    timestamps = [timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(10)]
    values = (1.0, 1.8, 2.7, 3.6, 4.5, 4.7, 4.9, 5.2, 5.4, 5.7)
    changepoint_timestamp = timestamps[4]
    model = Prophet(
        growth="linear",
        changepoints=[prophet_timestamp(changepoint_timestamp)],
        changepoint_prior_scale=0.2,
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    training = pd.DataFrame(
        {
            "ds": [prophet_timestamp(timestamp) for timestamp in timestamps],
            "y": values,
        }
    )
    if history_variant == "unsorted":
        training = training.iloc[::-1].reset_index(drop=True)
    elif history_variant == "duplicates":
        repeated = training.copy()
        repeated["y"] = repeated["y"] + np.asarray([0.35 * ((index % 3) - 1) for index in range(10)])
        repeated.loc[8, "y"] += 2.5
        training = pd.concat([training, repeated.iloc[::-1]], ignore_index=True)
    elif history_variant != "ordered":
        fail(f"Unknown training history variant: {history_variant}")

    model.fit(training, algorithm="Newton")
    prediction_timestamps = timestamps + [timestamp_from_offset(12 * DAY_MILLISECONDS)]
    prediction = model.predict(
        pd.DataFrame(
            {
                "ds": [
                    prophet_timestamp(timestamp) for timestamp in prediction_timestamps
                ]
            }
        )
    )

    if model.start is None or model.t_scale is None or model.y_scale is None:
        fail("Prophet did not retain scaling for the fitted linear MAP fixture")

    return {
        "changepointTimestamps": [changepoint_timestamp],
        "expected": {
            "deltas": [
                canonical_fitted_float(value * model.y_scale)
                for value in model.params["delta"][0]
            ],
            "intercept": canonical_fitted_float(model.params["m"][0][0] * model.y_scale),
            "noiseScale": canonical_fitted_float(
                model.params["sigma_obs"][0][0] * model.y_scale,
                zero_threshold=0.0,
            ),
            "slope": canonical_fitted_float(model.params["k"][0][0] * model.y_scale),
            "trend": [canonical_fitted_float(value) for value in prediction["trend"]],
        },
        "id": "one-explicit-break-no-seasonality" if history_variant == "ordered" else f"training-{history_variant}-explicit-break",
        "kind": "fitted-linear-map",
        "observations": [
            {"timestamp": pd.Timestamp(row.ds).tz_localize("UTC").isoformat(timespec="milliseconds").replace("+00:00", "Z"), "value": float(row.y)}
            for row in training.itertuples(index=False)
        ],
        "predictionTimestamps": prediction_timestamps,
        "settings": {
            "algorithm": "Newton",
            "changepointPriorScale": 0.2,
            "densityConvention": "constrained-parameter MAP without transform Jacobian",
            "timeOrigin": epoch_milliseconds(model.start),
            "timeScale": int(model.t_scale.total_seconds() * 1_000),
            "valueScale": float(model.y_scale),
        },
        "tolerance": {
            "coefficientAbsolute": 2e-3,
            "forecastAbsolute": 2e-3,
            "noiseAbsolute": 2e-3,
        },
    }


def make_conditional_map_fit_fixture() -> dict[str, Any]:
    """Fit approved conditional and mixed-feature MAP evidence through pinned CmdStan."""

    case_specs = (
        {
            "id": "mixed-conditional-and-unconditional",
            "seasonalities": (
                ConditionalSeasonalitySpec("weekly-on", 7.0, 1, 10.0, "onSeason"),
                ConditionalSeasonalitySpec("three-day", 3.0, 1, 5.0),
            ),
            "condition": lambda index, name: index % 3 != 1,
            "combined": False,
        },
        {
            "id": "shared-condition-components",
            "seasonalities": (
                ConditionalSeasonalitySpec("weekly-on", 7.0, 1, 10.0, "onSeason"),
                ConditionalSeasonalitySpec("daily-on", 1.0, 1, 4.0, "onSeason"),
            ),
            "condition": lambda index, name: index % 2 == 0,
            "combined": False,
        },
        {
            "id": "all-false-regularized-component",
            "seasonalities": (
                ConditionalSeasonalitySpec("weekly-off", 7.0, 1, 10.0, "offSeason"),
            ),
            "condition": lambda index, name: index >= 24,
            "combined": False,
        },
        {
            "id": "conditional-event-regressor-combination",
            "seasonalities": (
                ConditionalSeasonalitySpec("weekly-on", 7.0, 1, 10.0, "onSeason"),
                ConditionalSeasonalitySpec("three-day", 3.0, 1, 5.0),
            ),
            "condition": lambda index, name: index % 3 != 1,
            "combined": True,
        },
    )
    cases: list[dict[str, Any]] = []

    for spec in case_specs:
        identifier = spec["id"]
        seasonalities = spec["seasonalities"]
        condition_value = spec["condition"]
        combined = spec["combined"]
        timestamps = [timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(24)]
        condition_names = sorted(
            {
                seasonality.condition_name
                for seasonality in seasonalities
                if seasonality.condition_name is not None
            }
        )
        condition_rows = [
            {name: bool(condition_value(index, name)) for name in condition_names}
            for index in range(len(timestamps))
        ]
        promotion = [index % 2 for index in range(len(timestamps))]
        values = []

        for index, row in enumerate(condition_rows):
            weekly = np.sin(2.0 * np.pi * index / 7.0)
            three_day = np.cos(2.0 * np.pi * index / 3.0)
            active = next(iter(row.values()), True)
            event_effect = 1.25 if combined and index == 7 else 0.0
            regressor_effect = 0.45 * promotion[index] if combined else 0.0
            values.append(
                8.0
                + 0.12 * index
                + (1.4 * weekly if active else 0.0)
                + (0.5 * three_day if len(seasonalities) > 1 else 0.0)
                + event_effect
                + regressor_effect
                + 0.03 * ((index % 4) - 1.5)
            )

        events = (
            [{"name": "launch", "date": "2020-01-08", "priorScale": 10.0}]
            if combined
            else []
        )
        holidays = (
            pd.DataFrame({"holiday": ["launch"], "ds": ["2020-01-08"], "prior_scale": [10.0]})
            if combined
            else None
        )
        changepoint_timestamp = timestamps[10]
        model = Prophet(
            growth="linear",
            changepoints=[prophet_timestamp(changepoint_timestamp)],
            changepoint_prior_scale=0.2,
            yearly_seasonality=False,
            weekly_seasonality=False,
            daily_seasonality=False,
            holidays=holidays,
            uncertainty_samples=0,
        )

        for seasonality in seasonalities:
            model.add_seasonality(
                name=seasonality.name,
                period=seasonality.period_days,
                fourier_order=seasonality.fourier_order,
                prior_scale=seasonality.prior_scale,
                condition_name=seasonality.condition_name,
            )

        if combined:
            model.add_regressor("promotion", prior_scale=10.0, standardize=False)

        training_values: dict[str, Any] = {
            "ds": [prophet_timestamp(timestamp) for timestamp in timestamps],
            "y": values,
        }

        for condition_name in condition_names:
            training_values[condition_name] = [
                row[condition_name] for row in condition_rows
            ]

        if combined:
            training_values["promotion"] = promotion

        training = pd.DataFrame(training_values)
        model.fit(training, algorithm="Newton")
        optimizer_evidence = linear_optimizer_evidence(model)
        prediction_indexes = (23, 24, 30)
        prediction_timestamps = [
            timestamp_from_offset(index * DAY_MILLISECONDS) for index in prediction_indexes
        ]
        prediction_condition_rows = [
            {name: bool(condition_value(index, name)) for name in condition_names}
            for index in prediction_indexes
        ]
        prediction_values: dict[str, Any] = {
            "ds": [prophet_timestamp(timestamp) for timestamp in prediction_timestamps]
        }

        for condition_name in condition_names:
            prediction_values[condition_name] = [
                row[condition_name] for row in prediction_condition_rows
            ]

        if combined:
            prediction_values["promotion"] = [index % 2 for index in prediction_indexes]

        prediction_frame = pd.DataFrame(prediction_values)
        prediction = model.predict(prediction_frame)
        prepared_prediction = model.setup_dataframe(prediction_frame.copy())
        features, prior_scales, _, _ = model.make_all_seasonality_features(prepared_prediction)
        component_names = [seasonality.name for seasonality in seasonalities]

        if combined:
            component_names.extend(["launch", "promotion"])

        components = prediction[component_names].to_numpy(dtype=np.float64)
        observations = []

        for index, (timestamp, value) in enumerate(zip(timestamps, values, strict=True)):
            observation: dict[str, Any] = {
                "conditions": condition_rows[index],
                "timestamp": timestamp,
                "value": value,
            }

            if combined:
                observation["regressors"] = {"promotion": promotion[index]}

            observations.append(observation)

        prediction_rows = []

        for index, timestamp in enumerate(prediction_timestamps):
            row: dict[str, Any] = {
                "conditions": prediction_condition_rows[index],
                "timestamp": timestamp,
            }

            if combined:
                row["regressors"] = {"promotion": prediction_indexes[index] % 2}

            prediction_rows.append(row)

        cases.append(
            {
                "events": events,
                "expected": {
                    "additive": [
                        canonical_fitted_float(value)
                        for value in prediction[component_names].sum(axis=1)
                    ],
                    "componentNames": component_names,
                    "componentsRowMajor": [
                        canonical_fitted_float(value) for value in components.ravel()
                    ],
                    "featureColumnNames": list(features.columns),
                    "featurePriorScales": [float(value) for value in prior_scales],
                    "featuresRowMajor": [
                        canonical_fourier_float(value)
                        for value in features.to_numpy(dtype=np.float64).ravel()
                    ],
                    "noiseScale": canonical_fitted_float(
                        model.params["sigma_obs"][0][0] * model.y_scale,
                        zero_threshold=0.0,
                    ),
                    "observationUnitCoefficients": [
                        canonical_fitted_float(value * model.y_scale)
                        for value in model.params["beta"][0]
                    ],
                    "trend": [
                        canonical_fitted_float(value) for value in prediction["trend"]
                    ],
                    "value": [
                        canonical_fitted_float(value) for value in prediction["yhat"]
                    ],
                },
                "id": identifier,
                "optimizerEvidence": {key: canonical_fitted_float(value, zero_threshold=0.0) for key, value in optimizer_evidence.items()},
                "kind": "conditional-map-fit",
                "observations": observations,
                "predictionRows": prediction_rows,
                "regressors": (
                    [
                        {
                            "name": "promotion",
                            "priorScale": 10.0,
                            "standardization": "never",
                        }
                    ]
                    if combined
                    else []
                ),
                "seasonalities": [
                    {
                        "fourierOrder": seasonality.fourier_order,
                        "name": seasonality.name,
                        "periodDays": seasonality.period_days,
                        "priorScale": seasonality.prior_scale,
                        **(
                            {}
                            if seasonality.condition_name is None
                            else {"conditionName": seasonality.condition_name}
                        ),
                    }
                    for seasonality in seasonalities
                ],
                "settings": {
                    "algorithm": "Newton",
                    "changepointPriorScale": 0.2,
                    "changepointTimestamps": [changepoint_timestamp],
                    "densityConvention": "Prophet 1.4.0 constrained-parameter MAP",
                },
                "tolerance": {
                    "componentAbsolute": 5e-2,
                    "featureAbsolute": 1e-11,
                    "forecastAbsolute": 5e-2,
                },
            }
        )

    return {"cases": cases}


def make_target_scaling_fixture() -> dict[str, Any]:
    """Freeze Prophet target preprocessing and fitted nonlogistic scaling evidence."""

    preprocessing_specs = (
        ("positive", (2.0, 4.0, 3.0)),
        ("negative", (-4.0, -2.0, -3.0)),
        ("mixed", (-2.0, 3.0, 1.0)),
        ("zero", (0.0, 0.0, 0.0)),
        ("positive-constant", (4.0, 4.0, 4.0)),
        ("negative-constant", (-4.0, -4.0, -4.0)),
        ("tiny-range", (1.0, 1.0 + 1e-12, 1.0 + 5e-13)),
    )
    preprocessing_cases: list[dict[str, Any]] = []

    for identifier, values in preprocessing_specs:
        timestamps = [timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(len(values))]

        for mode in ("absmax", "minmax"):
            model = Prophet(
                scaling=mode,
                yearly_seasonality=False,
                weekly_seasonality=False,
                daily_seasonality=False,
                uncertainty_samples=0,
            )
            prepared = model.setup_dataframe(
                pd.DataFrame(
                    {
                        "ds": [prophet_timestamp(timestamp) for timestamp in timestamps],
                        "y": values,
                    }
                ),
                initialize_scales=True,
            )

            if model.y_min is None or model.y_scale is None:
                fail("Prophet did not retain target scaling for preprocessing evidence")

            preprocessing_cases.append(
                {
                    "expected": {
                        "offset": float(model.y_min),
                        "scale": float(model.y_scale),
                        "scaledValues": [float(value) for value in prepared["y_scaled"]],
                    },
                    "id": f"{identifier}-{mode}",
                    "kind": "target-scaling-preprocessing",
                    "mode": mode,
                    "values": list(values),
                    "tolerance": {"absolute": 1e-12, "relative": 1e-12},
                }
            )

    timestamps = [timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(24)]
    promotion = [index % 2 for index in range(len(timestamps))]
    values = [
        canonical_fourier_float(
            np.float64(
                30.0
                + 0.15 * index
                + 1.2 * np.sin(2.0 * np.pi * index / 7.0)
                + 0.4 * promotion[index]
                + (1.5 if index == 8 else 0.0)
                + 0.04 * ((index % 3) - 1)
            )
        )
        for index in range(len(timestamps))
    ]
    changepoint_timestamp = timestamps[10]
    events = [{"name": "launch", "date": "2020-01-09", "priorScale": 10.0}]
    model = Prophet(
        growth="linear",
        scaling="minmax",
        changepoints=[prophet_timestamp(changepoint_timestamp)],
        changepoint_prior_scale=0.2,
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        holidays=pd.DataFrame(
            {"holiday": ["launch"], "ds": ["2020-01-09"], "prior_scale": [10.0]}
        ),
        uncertainty_samples=0,
    )
    model.add_seasonality("weekly-custom", period=7.0, fourier_order=1, prior_scale=10.0)
    model.add_regressor("promotion", prior_scale=10.0, standardize=False)
    training = pd.DataFrame(
        {
            "ds": [prophet_timestamp(timestamp) for timestamp in timestamps],
            "promotion": promotion,
            "y": values,
        }
    )
    model.fit(training, algorithm="Newton")
    prediction_indexes = (23, 24, 30)
    prediction_timestamps = [
        timestamp_from_offset(index * DAY_MILLISECONDS) for index in prediction_indexes
    ]
    prediction = model.predict(
        pd.DataFrame(
            {
                "ds": [prophet_timestamp(timestamp) for timestamp in prediction_timestamps],
                "promotion": [index % 2 for index in prediction_indexes],
            }
        )
    )

    if model.y_min is None or model.y_scale is None:
        fail("Prophet did not retain target scaling for fitted linear evidence")

    linear_case = {
        "changepointTimestamps": [changepoint_timestamp],
        "events": events,
        "expected": {
            "additive": [
                canonical_fitted_float(value)
                for value in prediction[["weekly-custom", "launch", "promotion"]].sum(axis=1)
            ],
            "offset": float(model.y_min),
            "scale": float(model.y_scale),
            "trend": [canonical_fitted_float(value) for value in prediction["trend"]],
            "value": [canonical_fitted_float(value) for value in prediction["yhat"]],
        },
        "growth": "linear",
        "id": "minmax-linear-seasonality-event-regressor",
        "kind": "target-scaling-fitted-map",
        "mode": "minmax",
        "observations": [
            {
                "regressors": {"promotion": promotion[index]},
                "timestamp": timestamp,
                "value": value,
            }
            for index, (timestamp, value) in enumerate(zip(timestamps, values, strict=True))
        ],
        "predictionRows": [
            {"regressors": {"promotion": index % 2}, "timestamp": timestamp}
            for index, timestamp in zip(prediction_indexes, prediction_timestamps, strict=True)
        ],
        "regressors": [
            {"name": "promotion", "priorScale": 10.0, "standardization": "never"}
        ],
        "seasonalities": [
            {
                "fourierOrder": 1,
                "name": "weekly-custom",
                "periodDays": 7.0,
                "priorScale": 10.0,
            }
        ],
        "settings": {"changepointPriorScale": 0.2},
        "tolerance": {"absolute": 7e-2, "relative": 1e-3},
    }

    flat_values = (10.0, 12.0, 11.0, 13.0, 12.5, 11.5, 13.5, 12.25)
    flat_timestamps = [
        timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(len(flat_values))
    ]
    flat_model = Prophet(
        growth="flat",
        scaling="minmax",
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    flat_model.fit(
        pd.DataFrame(
            {
                "ds": [prophet_timestamp(timestamp) for timestamp in flat_timestamps],
                "y": flat_values,
            }
        ),
        algorithm="Newton",
    )
    flat_prediction_timestamps = [timestamp_from_offset(9 * DAY_MILLISECONDS)]
    flat_prediction = flat_model.predict(
        pd.DataFrame(
            {"ds": [prophet_timestamp(timestamp) for timestamp in flat_prediction_timestamps]}
        )
    )

    if flat_model.y_min is None or flat_model.y_scale is None:
        fail("Prophet did not retain target scaling for fitted flat evidence")

    flat_case = {
        "changepointTimestamps": [],
        "events": [],
        "expected": {
            "additive": [0.0],
            "offset": float(flat_model.y_min),
            "scale": float(flat_model.y_scale),
            "trend": [canonical_fitted_float(value) for value in flat_prediction["trend"]],
            "value": [canonical_fitted_float(value) for value in flat_prediction["yhat"]],
        },
        "growth": "flat",
        "id": "minmax-flat-no-features",
        "kind": "target-scaling-fitted-map",
        "mode": "minmax",
        "observations": [
            {"timestamp": timestamp, "value": value}
            for timestamp, value in zip(flat_timestamps, flat_values, strict=True)
        ],
        "predictionRows": [{"timestamp": flat_prediction_timestamps[0]}],
        "regressors": [],
        "seasonalities": [],
        "settings": {"changepointPriorScale": 0.05},
        "tolerance": {"absolute": 7e-2, "relative": 1e-3},
    }

    return {"fittedCases": [linear_case, flat_case], "preprocessingCases": preprocessing_cases}


def make_mixed_map_fixture() -> dict[str, Any]:
    """Freeze independent mixed equations and fitted Newton evidence."""

    fixed_design = np.asarray(
        [[1.0, 0.5, -0.25], [0.0, 1.5, 0.75], [-1.0, 2.0, 1.25]],
        dtype=np.float64,
    )
    fixed_modes = np.asarray([0.0, 1.0, 1.0], dtype=np.float64)
    fixed_beta = np.asarray([0.4, -0.8, 0.3], dtype=np.float64)
    fixed_trend = np.asarray([0.5, 1.0, -0.25], dtype=np.float64)
    fixed_target = np.asarray([0.8, -0.4, 0.2], dtype=np.float64)
    fixed_priors = np.asarray([2.0, 3.0, 4.0], dtype=np.float64)
    fixed_sigma = 0.4
    additive_design = fixed_design * (1.0 - fixed_modes)
    multiplicative_design = fixed_design * fixed_modes
    fixed_factor = multiplicative_design @ fixed_beta
    fixed_additive = additive_design @ fixed_beta
    fixed_mean = fixed_trend * (1.0 + fixed_factor) + fixed_additive
    fixed_residual = fixed_mean - fixed_target
    fixed_derivatives = additive_design + fixed_trend[:, None] * multiplicative_design
    fixed_beta_gradient = (
        fixed_derivatives.T @ fixed_residual / fixed_sigma**2
        + fixed_beta / fixed_priors**2
    )
    fixed_objective = (
        len(fixed_target) * np.log(fixed_sigma)
        + np.dot(fixed_residual, fixed_residual) / (2.0 * fixed_sigma**2)
        + np.sum(fixed_beta**2 / (2.0 * fixed_priors**2))
        + fixed_sigma**2 / (2.0 * 0.5**2)
    )
    target_offset = 10.0
    target_scale = 4.0
    restored_trend = target_offset + target_scale * fixed_trend
    output_additive = target_scale * fixed_additive
    public_value = restored_trend * (1.0 + fixed_factor) + output_additive

    independent = {
        "id": "fixed-trend-mixed-objective",
        "kind": "mixed-map-independent",
        "rowCount": len(fixed_target),
        "columnCount": fixed_design.shape[1],
        "designRowMajor": fixed_design.ravel().tolist(),
        "modes": ["additive", "multiplicative", "multiplicative"],
        "beta": fixed_beta.tolist(),
        "priorScales": fixed_priors.tolist(),
        "scaledTrend": fixed_trend.tolist(),
        "scaledTarget": fixed_target.tolist(),
        "sigma": fixed_sigma,
        "targetScaling": {"mode": "minmax", "offset": target_offset, "scale": target_scale},
        "expected": {
            "additiveScaled": fixed_additive.tolist(),
            "betaGradient": fixed_beta_gradient.tolist(),
            "factor": fixed_factor.tolist(),
            "likelihoodMean": fixed_mean.tolist(),
            "objective": float(fixed_objective),
            "publicAdditive": output_additive.tolist(),
            "publicTrend": restored_trend.tolist(),
            "publicValue": public_value.tolist(),
        },
        "tolerance": {"absolute": 1e-12, "relative": 1e-12},
    }

    def fitted_case(growth: str, scaling: str) -> dict[str, Any]:
        timestamps = [timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(28)]
        condition = [index % 4 != 1 for index in range(len(timestamps))]
        promotion = [float((index % 5) - 2) for index in range(len(timestamps))]
        values: list[float] = []

        for index in range(len(timestamps)):
            trend = 18.0 + (0.22 * index if growth == "linear" else 0.0)
            weekly_factor = 0.16 * np.sin(2.0 * np.pi * index / 7.0) if condition[index] else 0.0
            promotion_factor = -0.035 * promotion[index]
            additive = 0.55 * np.cos(2.0 * np.pi * index / 3.0)
            event = 1.4 if index == 8 else 0.0
            noise = 0.025 * ((index % 3) - 1)
            values.append(
                canonical_fourier_float(
                    np.float64(trend * (1.0 + weekly_factor + promotion_factor) + additive + event + noise)
                )
            )

        holidays = pd.DataFrame(
            {"holiday": ["launch"], "ds": ["2020-01-09"], "prior_scale": [6.0]}
        )
        model = Prophet(
            growth=growth,
            scaling=scaling,
            changepoints=(
                [prophet_timestamp(timestamps[12])] if growth == "linear" else None
            ),
            changepoint_prior_scale=0.2,
            yearly_seasonality=False,
            weekly_seasonality=False,
            daily_seasonality=False,
            holidays=holidays,
            holidays_mode="additive",
            uncertainty_samples=0,
        )
        model.add_seasonality(
            "weekly-relative",
            period=7.0,
            fourier_order=1,
            prior_scale=5.0,
            mode="multiplicative",
            condition_name="active",
        )
        model.add_seasonality(
            "three-day-additive",
            period=3.0,
            fourier_order=1,
            prior_scale=4.0,
            mode="additive",
        )
        model.add_regressor(
            "promotion", prior_scale=3.0, standardize=False, mode="multiplicative"
        )
        training = pd.DataFrame(
            {
                "ds": [prophet_timestamp(timestamp) for timestamp in timestamps],
                "y": values,
                "active": condition,
                "promotion": promotion,
            }
        )
        model.fit(training, algorithm="Newton")
        prediction_indexes = (27, 28, 34)
        prediction_timestamps = [
            timestamp_from_offset(index * DAY_MILLISECONDS) for index in prediction_indexes
        ]
        prediction_frame = pd.DataFrame(
            {
                "ds": [prophet_timestamp(timestamp) for timestamp in prediction_timestamps],
                "active": [index % 4 != 1 for index in prediction_indexes],
                "promotion": [float((index % 5) - 2) for index in prediction_indexes],
            }
        )
        prediction = model.predict(prediction_frame)
        prepared_prediction = model.setup_dataframe(prediction_frame.copy())
        prediction_features, prior_scales, component_columns, _ = (
            model.make_all_seasonality_features(prepared_prediction)
        )
        training_features, _, _, _ = model.make_all_seasonality_features(model.history)
        column_modes = [
            "multiplicative" if value == 1 else "additive"
            for value in component_columns["multiplicative_terms"].tolist()
        ]
        beta = np.asarray(model.params["beta"][0], dtype=np.float64)
        additive_mask = np.asarray([mode == "additive" for mode in column_modes], dtype=np.float64)
        multiplicative_mask = 1.0 - additive_mask
        training_prediction = model.predict(training.drop(columns=["y"]))

        if model.y_min is None or model.y_scale is None:
            fail("Prophet did not retain scaling for mixed fitted evidence")

        scaled_trend = (
            np.asarray(training_prediction["trend"], dtype=np.float64) - model.y_min
        ) / model.y_scale
        train_matrix = training_features.to_numpy(dtype=np.float64)
        likelihood_mean = scaled_trend * (1.0 + train_matrix @ (beta * multiplicative_mask)) + (
            train_matrix @ (beta * additive_mask)
        )
        component_names = [
            "weekly-relative",
            "three-day-additive",
            "launch",
            "promotion",
        ]
        coefficients = [
            canonical_fitted_float(value if mode == "multiplicative" else value * model.y_scale)
            for value, mode in zip(beta, column_modes, strict=True)
        ]

        return {
            "id": f"{growth}-{scaling}-mixed-components",
            "kind": "mixed-map-fitted",
            "growth": growth,
            "scaling": scaling,
            "observations": [
                {
                    "timestamp": timestamp,
                    "value": value,
                    "conditions": {"active": condition[index]},
                    "regressors": {"promotion": promotion[index]},
                }
                for index, (timestamp, value) in enumerate(zip(timestamps, values, strict=True))
            ],
            "predictionRows": [
                {
                    "timestamp": timestamp,
                    "conditions": {"active": index % 4 != 1},
                    "regressors": {"promotion": float((index % 5) - 2)},
                }
                for index, timestamp in zip(prediction_indexes, prediction_timestamps, strict=True)
            ],
            "seasonalities": [
                {
                    "name": "weekly-relative",
                    "periodDays": 7.0,
                    "fourierOrder": 1,
                    "priorScale": 5.0,
                    "conditionName": "active",
                    "mode": "multiplicative",
                },
                {
                    "name": "three-day-additive",
                    "periodDays": 3.0,
                    "fourierOrder": 1,
                    "priorScale": 4.0,
                    "mode": "additive",
                },
            ],
            "events": [
                {"name": "launch", "date": "2020-01-09", "priorScale": 6.0, "mode": "additive"}
            ],
            "regressors": [
                {
                    "name": "promotion",
                    "priorScale": 3.0,
                    "standardization": "never",
                    "mode": "multiplicative",
                }
            ],
            "settings": {
                "algorithm": "Newton",
                "changepointPriorScale": 0.2,
                "densityConvention": "Prophet 1.4.0 constrained-parameter MAP",
                "offset": float(model.y_min),
                "scale": float(model.y_scale),
            },
            "expected": {
                "featureColumnNames": list(prediction_features.columns),
                "featureModes": column_modes,
                "featurePriorScales": [float(value) for value in prior_scales],
                "trainingFeaturesRowMajor": [
                    canonical_fourier_float(value)
                    for value in training_features.to_numpy(dtype=np.float64).ravel()
                ],
                "featuresRowMajor": [
                    canonical_fourier_float(value)
                    for value in prediction_features.to_numpy(dtype=np.float64).ravel()
                ],
                "intercept": canonical_fitted_float(model.params["m"][0][0] * model.y_scale),
                "slope": (
                    canonical_fitted_float(model.params["k"][0][0] * model.y_scale)
                    if growth == "linear"
                    else 0.0
                ),
                "deltas": (
                    [
                        canonical_fitted_float(value * model.y_scale)
                        for value in model.params["delta"][0]
                    ]
                    if growth == "linear"
                    else []
                ),
                "changepointTimestamps": (
                    [timestamps[12]] if growth == "linear" else []
                ),
                "coefficients": coefficients,
                "noiseScale": canonical_fitted_float(
                    model.params["sigma_obs"][0][0] * model.y_scale,
                    zero_threshold=0.0,
                ),
                "scaledLikelihoodMean": [
                    canonical_fitted_float(value) for value in likelihood_mean
                ],
                "componentNames": component_names,
                "componentsRowMajor": [
                    canonical_fitted_float(value)
                    for value in prediction[component_names].to_numpy(dtype=np.float64).ravel()
                ],
                "trend": [canonical_fitted_float(value) for value in prediction["trend"]],
                "additive": [
                    canonical_fitted_float(value) for value in prediction["additive_terms"]
                ],
                "multiplicative": [
                    canonical_fitted_float(value) for value in prediction["multiplicative_terms"]
                ],
                "value": [canonical_fitted_float(value) for value in prediction["yhat"]],
            },
            "tolerance": {
                "coefficientAbsolute": 8e-2,
                "componentAbsolute": 8e-2,
                "forecastAbsolute": 8e-2,
            },
        }

    return {
        "independentCases": [independent],
        "fittedCases": [fitted_case("linear", "minmax"), fitted_case("flat", "absmax")],
    }


def make_logistic_map_fixture() -> dict[str, Any]:
    """Freeze floor-aware fixed and fitted logistic evidence from Prophet 1.4.0."""

    timestamps = [timestamp_from_offset(index * DAY_MILLISECONDS) for index in range(20)]
    capacities = [80.0 + 0.5 * index for index in range(20)]
    floors = [-5.0 + 0.05 * index for index in range(20)]
    values = []

    for index, (capacity, floor) in enumerate(zip(capacities, floors, strict=True)):
        time = index / 19.0
        eta = 5.0 * (time - 0.45) + 1.2 * max(0.0, time - 10.0 / 19.0)
        trend = floor + (capacity - floor) / (1.0 + np.exp(-eta))
        values.append(canonical_fourier_float(np.float64(trend + 0.15 * ((index % 3) - 1))))

    training = pd.DataFrame(
        {
            "ds": [prophet_timestamp(timestamp) for timestamp in timestamps],
            "y": values,
            "cap": capacities,
            "floor": floors,
        }
    )
    fixed_model = Prophet(
        growth="logistic",
        scaling="minmax",
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    history = fixed_model.setup_dataframe(training.copy(), initialize_scales=True)
    fixed_rate = 4.2
    fixed_offset = 0.4
    fixed_deltas = np.asarray([-1.1, 0.7], dtype=np.float64)
    fixed_points = np.asarray([0.3, 0.65], dtype=np.float64)
    prediction_indexes = (0, 7, 19, 24)
    prediction_timestamps = [
        timestamp_from_offset(index * DAY_MILLISECONDS) for index in prediction_indexes
    ]
    prediction_capacities = [82.0, 88.0, 95.0, 110.0]
    prediction_floors = [-4.0, -3.0, -2.0, -1.0]
    prediction_frame = pd.DataFrame(
        {
            "ds": [prophet_timestamp(timestamp) for timestamp in prediction_timestamps],
            "cap": prediction_capacities,
            "floor": prediction_floors,
        }
    )
    prepared = fixed_model.setup_dataframe(prediction_frame.copy())
    fixed_scaled = fixed_model.piecewise_logistic(
        np.asarray(prepared["t"], dtype=np.float64),
        np.asarray(prepared["cap_scaled"], dtype=np.float64),
        fixed_deltas,
        fixed_rate,
        fixed_offset,
        fixed_points,
    )
    fixed_trend = fixed_scaled * float(fixed_model.y_scale) + np.asarray(
        prepared["floor"], dtype=np.float64
    )

    implicit_model = Prophet(
        growth="logistic",
        scaling="absmax",
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    implicit_training = training.drop(columns=["floor"])
    implicit_model.setup_dataframe(implicit_training.copy(), initialize_scales=True)
    implicit_prediction_frame = prediction_frame.drop(columns=["floor"])
    implicit_prepared = implicit_model.setup_dataframe(implicit_prediction_frame.copy())
    implicit_scaled = implicit_model.piecewise_logistic(
        np.asarray(implicit_prepared["t"], dtype=np.float64),
        np.asarray(implicit_prepared["cap_scaled"], dtype=np.float64),
        fixed_deltas,
        fixed_rate,
        fixed_offset,
        fixed_points,
    )
    implicit_trend = implicit_scaled * float(implicit_model.y_scale)

    fitted = Prophet(
        growth="logistic",
        scaling="minmax",
        changepoints=[prophet_timestamp(timestamps[10])],
        changepoint_prior_scale=0.2,
        yearly_seasonality=False,
        weekly_seasonality=False,
        daily_seasonality=False,
        uncertainty_samples=0,
    )
    fitted.fit(training, algorithm="Newton")
    fitted_prediction = fitted.predict(prediction_frame)

    if (
        fixed_model.y_scale is None
        or implicit_model.y_scale is None
        or fitted.y_scale is None
    ):
        fail("Prophet did not retain logistic target scaling")

    return {
        "fixedCases": [
            {
                "id": "explicit-floor-changing-capacity",
                "scaling": "minmax",
                "training": [
                    {
                        "timestamp": timestamp,
                        "value": value,
                        "capacity": capacity,
                        "floor": floor,
                    }
                    for timestamp, value, capacity, floor in zip(
                        timestamps, values, capacities, floors, strict=True
                    )
                ],
                "predictionRows": [
                    {"timestamp": timestamp, "capacity": capacity, "floor": floor}
                    for timestamp, capacity, floor in zip(
                        prediction_timestamps,
                        prediction_capacities,
                        prediction_floors,
                        strict=True,
                    )
                ],
                "parameters": {
                    "rate": fixed_rate,
                    "offset": fixed_offset,
                    "changepoints": fixed_points.tolist(),
                    "deltas": fixed_deltas.tolist(),
                },
                "expected": {
                    "scale": float(fixed_model.y_scale),
                    "scaledTime": [float(value) for value in prepared["t"]],
                    "scaledCapacity": [float(value) for value in prepared["cap_scaled"]],
                    "trend": [canonical_fitted_float(value) for value in fixed_trend],
                },
                "tolerance": {"absolute": 1e-10, "relative": 1e-10},
            },
            {
                "id": "implicit-floor-absmax-changing-capacity",
                "scaling": "absmax",
                "training": [
                    {
                        "timestamp": timestamp,
                        "value": value,
                        "capacity": capacity,
                    }
                    for timestamp, value, capacity in zip(
                        timestamps, values, capacities, strict=True
                    )
                ],
                "predictionRows": [
                    {"timestamp": timestamp, "capacity": capacity}
                    for timestamp, capacity in zip(
                        prediction_timestamps,
                        prediction_capacities,
                        strict=True,
                    )
                ],
                "parameters": {
                    "rate": fixed_rate,
                    "offset": fixed_offset,
                    "changepoints": fixed_points.tolist(),
                    "deltas": fixed_deltas.tolist(),
                },
                "expected": {
                    "scale": float(implicit_model.y_scale),
                    "scaledTime": [float(value) for value in implicit_prepared["t"]],
                    "scaledCapacity": [
                        float(value) for value in implicit_prepared["cap_scaled"]
                    ],
                    "trend": [canonical_fitted_float(value) for value in implicit_trend],
                },
                "tolerance": {"absolute": 1e-10, "relative": 1e-10},
            },
        ],
        "fittedCases": [
            {
                "id": "explicit-floor-one-changepoint",
                "scaling": "minmax",
                "observations": [
                    {
                        "timestamp": timestamp,
                        "value": value,
                        "capacity": capacity,
                        "floor": floor,
                    }
                    for timestamp, value, capacity, floor in zip(
                        timestamps, values, capacities, floors, strict=True
                    )
                ],
                "predictionRows": [
                    {"timestamp": timestamp, "capacity": capacity, "floor": floor}
                    for timestamp, capacity, floor in zip(
                        prediction_timestamps,
                        prediction_capacities,
                        prediction_floors,
                        strict=True,
                    )
                ],
                "settings": {
                    "algorithm": "Newton",
                    "changepointPriorScale": 0.2,
                    "changepointTimestamp": timestamps[10],
                    "scale": float(fitted.y_scale),
                },
                "expected": {
                    "rate": canonical_fitted_float(fitted.params["k"][0][0]),
                    "offset": canonical_fitted_float(fitted.params["m"][0][0]),
                    "deltas": [
                        canonical_fitted_float(value) for value in fitted.params["delta"][0]
                    ],
                    "noiseScale": canonical_fitted_float(
                        fitted.params["sigma_obs"][0][0] * fitted.y_scale,
                        zero_threshold=0.0,
                    ),
                    "trend": [
                        canonical_fitted_float(value) for value in fitted_prediction["trend"]
                    ],
                    "value": [
                        canonical_fitted_float(value) for value in fitted_prediction["yhat"]
                    ],
                },
                "tolerance": {"forecastAbsolute": 0.5, "parameterAbsolute": 0.5},
            }
        ],
    }


def make_map_uncertainty_fixture() -> dict[str, Any]:
    """Summarize fixed-state, scalar-path release draws without fitting CmdStan."""

    training_dates = pd.to_datetime(["2025-01-01", "2025-01-06", "2025-01-11"])
    prediction_dates = pd.to_datetime(["2025-01-16", "2025-01-21"])
    cases = []

    for identifier, growth, mixed in (
        ("linear", "linear", False),
        ("flat", "flat", False),
        ("linear-mixed", "linear", True),
        ("logistic", "logistic", False),
        ("logistic-explicit-floor-mixed-crossing", "logistic", True),
    ):
        explicit_floor = identifier == "logistic-explicit-floor-mixed-crossing"
        sample_count = 8192 if explicit_floor else 2048
        model = Prophet(
            growth=growth,
            changepoints=[pd.Timestamp("2025-01-06")],
            yearly_seasonality=False,
            weekly_seasonality=False,
            daily_seasonality=False,
            uncertainty_samples=sample_count,
        )
        if mixed:
            model.add_regressor("known_additive", mode="additive", standardize=False)
            model.add_regressor("known_multiplicative", mode="multiplicative", standardize=False)

        training = pd.DataFrame({"ds": training_dates, "y": [2.0, 3.0, 4.0]})
        prediction = pd.DataFrame({"ds": prediction_dates})
        additional_values = [0.5, 0.5, -1.0, -0.5] if mixed else []

        if growth == "logistic":
            training["cap"] = [10.0, 10.0, 10.0]
            prediction["cap"] = [10.0, 20.0]
            if explicit_floor:
                training["floor"] = [1.0, 1.0, 1.0]
                prediction["floor"] = [1.0, 2.0]

        if mixed:
            training["known_additive"] = [0.0, 1.0, 0.0]
            training["known_multiplicative"] = [0.0, 1.0, 1.0]
            prediction["known_additive"] = [0.5, -1.0]
            prediction["known_multiplicative"] = [0.5, -0.5]

        model.setup_dataframe(training, initialize_scales=True)
        model.changepoints_t = np.asarray([0.5], dtype=np.float64)
        rate = 0.5 if explicit_floor else 2.0
        delta = -1.0 if explicit_floor else 0.1
        model.params = {
            "k": np.asarray([[rate if growth == "logistic" else 0.4]], dtype=np.float64),
            "m": np.asarray([[0.4 if growth == "logistic" else 0.5]], dtype=np.float64),
            "delta": np.asarray([[delta if growth == "logistic" else 0.05]], dtype=np.float64),
            # Without regressors, release inserts one private zero-valued column.
            "beta": (
                np.asarray([[1.0 / float(model.y_scale), 0.25]], dtype=np.float64)
                if mixed
                else np.zeros((1, 1), dtype=np.float64)
            ),
            "sigma_obs": np.asarray([[0.05 if growth == "logistic" else 0.1]], dtype=np.float64),
        }
        prediction = model.setup_dataframe(prediction)

        # The seed identifies only Python's reference run: our RNG is intentionally different.
        np.random.seed(2831)
        draws = model.sample_posterior_predictive(prediction, vectorized=False)
        expected = {}

        for name in ("trend", "yhat"):
            values = draws[name]
            expected[name] = {
                "mean": [
                    canonical_fitted_float(value, zero_threshold=0.0)
                    for value in values.mean(axis=1)
                ],
                "variance": [
                    canonical_fitted_float(value, zero_threshold=0.0)
                    for value in values.var(axis=1)
                ],
                "low": [
                    canonical_fitted_float(value, zero_threshold=0.0)
                    for value in np.percentile(values, 10, axis=1)
                ],
                "high": [
                    canonical_fitted_float(value, zero_threshold=0.0)
                    for value in np.percentile(values, 90, axis=1)
                ],
            }

        cases.append({
            "id": identifier,
            "growth": growth,
            "additionalValuesRowMajor": additional_values,
            "additionalCoefficients": [1.0, 0.25] if mixed else [],
            "additionalModes": ["additive", "multiplicative"] if mixed else [],
            "logistic": (
                {
                    "rate": rate,
                    "offset": 0.4,
                    "capacities": [10.0, 20.0],
                    "floor": 0.0 if not explicit_floor else None,
                    "explicitFloors": [1.0, 2.0] if explicit_floor else None,
                }
                if growth == "logistic"
                else None
            ),
            "method": "sample_posterior_predictive(vectorized=False)",
            "sampleCount": sample_count,
            "wasmSamplesPerSeed": 2048,
            "wasmSeeds": [42, 101, 203, 307] if explicit_floor else [42],
            "pythonSeed": 2831,
            "trainingTimestamps": [
                timestamp.strftime("%Y-%m-%dT00:00:00.000Z") for timestamp in training_dates
            ],
            "trainingValues": [2.0, 3.0, 4.0],
            "predictionTimestamps": [
                timestamp.strftime("%Y-%m-%dT00:00:00.000Z") for timestamp in prediction_dates
            ],
            "parameters": {
                "interceptOrLevel": 2.0,
                "slope": 1.6,
                "changepointTimestamp": "2025-01-06T00:00:00.000Z",
                "delta": delta if growth == "logistic" else 0.2,
                "noiseScale": canonical_fitted_float(
                    float(model.y_scale) * (0.05 if growth == "logistic" else 0.1),
                    zero_threshold=0.0,
                ),
                "targetScale": float(model.y_scale),
                "targetOffset": 0.0,
            },
            "expected": expected,
            "tolerances": {
                "meanAbsolute": 0.12 if explicit_floor else (0.08 if growth == "logistic" else 0.09),
                "trendVarianceAbsolute": 0.04 if explicit_floor else (0.0018 if growth == "logistic" else 0.014),
                "valueVarianceAbsolute": 0.08 if explicit_floor else (0.025 if growth == "logistic" else 0.07),
                "quantileAbsolute": 0.2 if explicit_floor else (0.12 if growth == "logistic" else 0.16),
            },
        })

    return {
        "cases": cases,
        "sourceMethod": "Python Prophet 1.4.0 scalar MAP fixed-state simulation",
    }


def make_stan_linear_optimizer_fixture() -> dict[str, Any]:
    """Record frozen executable value/gradient, curvature and Newton behavior."""

    cases = []

    for identifier, count, points, mixed, budget in (
        ("newton-one-step", 6, 1, False, 1),
        ("newton-converged", 12, 3, False, 10000),
        ("newton-no-candidates", 12, 0, False, 10000),
        ("newton-mixed", 12, 3, True, 10000),
        ("newton-correlated-automatic", 96, 25, False, 10000),
        ("newton-migration-ordered", 96, 25, False, 10000),
        ("newton-migration-unsorted", 96, 25, False, 10000),
        ("lbfgs-one-step", 6, 1, False, 1),
        ("auto-99", 99, 25, False, 10000),
        ("auto-100", 100, 25, False, 10000),
        ("auto-101", 101, 25, False, 10000),
        ("auto-duplicate-100", 100, 25, False, 10000),
        ("override-newton-101", 101, 25, False, 10000),
        ("override-lbfgs-99", 99, 25, False, 10000),
        ("lbfgs-mixed", 102, 25, True, 10000),
        ("lbfgs-no-candidates", 100, 0, False, 10000),
        ("lbfgs-control-overrides", 100, 25, False, 10000),
        ("lbfgs-fallback-enabled", 100, 25, False, 10000),
        ("lbfgs-fallback-disabled", 100, 25, False, 10000),
        ("lbfgs-budget-no-fallback", 100, 25, False, 1),
        ("lbfgs-stop-objective", 6, 1, False, 4),
        ("lbfgs-stop-gradient", 6, 1, False, 4),
        ("lbfgs-stop-parameter", 6, 1, False, 4),
        ("lbfgs-stop-relative-objective", 6, 1, False, 4),
        ("lbfgs-stop-relative-gradient", 6, 1, False, 4),
        ("lbfgs-budget-precedence", 6, 1, False, 1),
    ):
        print(f"Recording Stan optimizer oracle: {identifier}", file=sys.stderr, flush=True)
        dates = pd.date_range("2020-01-01", periods=count, freq="D")
        index = np.arange(count, dtype=np.float64)
        values = 12.0 + 0.15 * index + 0.08 * np.maximum(index - 15.0, 0.0)
        values += 0.06 * np.sin(index * 1.7) + 0.035 * np.cos(index * 0.9)
        frame = pd.DataFrame({"ds": dates, "y": values})
        source_dataset = None

        if identifier.startswith("newton-migration-"):
            variant = identifier.removeprefix("newton-migration-")
            source_dataset = ROOT / "benchmark" / "data" / "generated" / f"training-{variant}.json"
            observations = json.loads(source_dataset.read_text())["observations"]
            frame = pd.DataFrame({
                "ds": pd.to_datetime([row["timestamp"] for row in observations], utc=True).tz_localize(None),
                "y": [row["value"] for row in observations],
            })

        model = Prophet(
            growth="linear", n_changepoints=points, changepoint_range=0.8,
            changepoint_prior_scale=1e-8 if "fallback-" in identifier else 0.05, yearly_seasonality=False,
            weekly_seasonality=False, daily_seasonality=False,
            uncertainty_samples=0,
        )

        if mixed:
            frame["known_additive"] = np.sin(index * 0.7)
            frame["known_multiplicative"] = np.cos(index * 0.4)
            model.add_regressor("known_additive", mode="additive", standardize=False, prior_scale=2.0)
            model.add_regressor("known_multiplicative", mode="multiplicative", standardize=False, prior_scale=3.0)

        if identifier == "auto-duplicate-100":
            unique = frame.iloc[:50].copy()
            repeated = unique.copy()
            repeated["y"] += 0.025 * np.sin(np.arange(50) * 0.3)
            frame = pd.concat([unique, repeated], ignore_index=True)

        inputs = model.preprocess(frame)
        initial = model.calculate_initial_params(inputs.K)
        stan_init, stan_data = model.stan_backend.prepare_data(
            initial.__dict__, inputs.__dict__
        )
        requested_algorithm = "auto" if identifier.startswith("auto-") else (
            "Newton" if identifier.startswith(("newton-", "override-newton-")) else "LBFGS"
        )
        selected_algorithm = ("Newton" if count < 100 else "LBFGS") if requested_algorithm == "auto" else requested_algorithm
        fallback_enabled = not identifier.endswith("fallback-disabled") and identifier != "lbfgs-control-overrides"
        controls = {}

        if identifier == "lbfgs-control-overrides":
            controls = dict(history_size=2, init_alpha=0.003, tol_obj=1e-10,
                            tol_rel_obj=1e3, tol_grad=1e-7, tol_rel_grad=1e6, tol_param=1e-7)
        if identifier.startswith("lbfgs-stop-") or identifier == "lbfgs-budget-precedence":
            controls = dict(tol_obj=1e-100, tol_grad=1e-100, tol_param=1e-100, tol_rel_obj=1e-100, tol_rel_grad=1e-100)
            criterion = {"objective": "tol_obj", "gradient": "tol_grad", "parameter": "tol_param",
                         "relative-objective": "tol_rel_obj", "relative-gradient": "tol_rel_grad"}
            if identifier.startswith("lbfgs-stop-"):
                controls[criterion[identifier.removeprefix("lbfgs-stop-")]] = 1e100
            else:
                controls["tol_rel_obj"] = 1e100

        public_features = inputs.K if mixed else 0
        feature_priors = inputs.sigmas if mixed else []
        feature_modes = ["multiplicative" if mode else "additive" for mode in inputs.s_m] if mixed else []
        times = np.asarray(inputs.t, dtype=np.float64)
        hinges = np.maximum(times[:, None] - model.changepoints_t[None, :], 0.0) if points else np.empty((count, 0))
        features = inputs.X.to_numpy() if mixed else np.empty((count, 0))
        design = np.column_stack([np.ones(count), times, hinges, features])
        sigma_index = 2 + inputs.S

        def density(parameters: Sequence[float]) -> tuple[float, list[float]]:
            """Use the shared pinned-executable protocol without a Jacobian."""
            return stan_unconstrained_probe(model, stan_data, parameters)

        parameters = [initial.k, initial.m, *initial.delta, 0.0, *initial.beta]
        probes = []

        # Small authored problems verify exact/near-zero kink conventions and the
        # literal pinned Hessian stencil. The large case is a fit-quality control.
        if count <= 12 and identifier.startswith("newton-"):
            for delta in (0.0, 0.0005, -0.0005, 0.003):
                probe = list(parameters)
                probe[2] = delta
                value, gradient = density(probe)
                curvature = stan_curvature_probe(model, stan_data, probe)

                probes.append({
                    "parameters": [canonical_fitted_float(v, zero_threshold=0.0) for v in probe],
                    "logDensity": canonical_fitted_float(value, zero_threshold=0.0),
                    "gradient": [canonical_fitted_float(v, zero_threshold=0.0) for v in gradient],
                    "curvature": [canonical_fitted_float(v, zero_threshold=0.0) for v in curvature],
                })

        attempts = []
        returned_algorithm = selected_algorithm
        fit = None

        with tempfile.TemporaryDirectory(prefix="prophet-optimizer-oracle-") as directory:
            try:
                fit = model.stan_backend.model.optimize(
                    data=stan_data, inits=stan_init, algorithm=selected_algorithm, iter=budget,
                    seed=2831, sig_figs=12, save_iterations=True, refresh=1,
                    output_dir=directory, **controls,
                )
            except RuntimeError:
                stdout_files = list(Path(directory).glob("*-stdout.txt"))
                if len(stdout_files) != 1:
                    fail("Failed optimization must retain exactly one stdout oracle")
                failed_stdout = stdout_files[0].read_text()
                if "Line search failed" not in failed_stdout:
                    fail("Oracle failure was not the expected numerical line-search failure")
                lines = [line for line in failed_stdout.splitlines() if re.match(r"^\s*\d+\s+[-\d.]", line)]
                failed_iterations = int(lines[-1].split()[0])
                attempts.append({"algorithm": selected_algorithm, "iterations": failed_iterations,
                                 "termination": "line-search-failure"})
                if fallback_enabled:
                    returned_algorithm = "Newton"
                    # Prophet changes only algorithm: Newton has a fresh full budget
                    # and exactly the same original initialization, not a failed CSV row.
                    fit = model.stan_backend.model.optimize(
                        data=stan_data, inits=stan_init, algorithm="Newton", iter=budget,
                        seed=2831, sig_figs=12, save_iterations=True, refresh=1,
                        output_dir=directory, **controls,
                    )
            if fit is not None:
                stdout = Path(fit.runset.stdout_files[0]).read_text()
                fitted = fit.optimized_params_dict
                trajectory_rows = pd.read_csv(fit.runset.csv_files[0], comment="#").head(2001 if identifier == "auto-100" else 9) if selected_algorithm == "LBFGS" and returned_algorithm == "LBFGS" else None

        trajectory = []
        if fit is not None and trajectory_rows is not None:
            for _, row in trajectory_rows.iterrows():
                snapshot = [row["k"], row["m"], *[row[f"delta.{j + 1}"] for j in range(inputs.S)],
                            np.log(row["sigma_obs"]), *[row[f"beta.{j + 1}"] for j in range(inputs.K)]]
                trajectory.append([canonical_fitted_float(v, zero_threshold=0.0) for v in snapshot])

        gradient_probes = []
        if identifier == "auto-100":
            for iteration in (0, 1, 8, 20, 41, 50, 70, 100):
                snapshot = trajectory[iteration]
                probe_value, probe_gradient = density(snapshot)
                gradient_probes.append({"iteration": iteration, "parameters": snapshot,
                    "logDensity": canonical_fitted_float(probe_value, zero_threshold=0.0),
                    "gradient": [canonical_fitted_float(v, zero_threshold=0.0) for v in probe_gradient]})

        case = {
            "id": identifier, "rowCount": count, "changepointCount": points,
            "changepointTimes": [float(v) for v in model.changepoints_t] if points else [],
            "sourceDatasetSha256": sha256_file(source_dataset) if source_dataset else None,
            "featureCount": public_features,
            # These are inputs, not optimizer output. Retain the executable's exact
            # normalized problem; rounding it before Rust optimization changes
            # nonsmooth trajectories. Fitted values below remain capped at 12 digits.
            "design": [float(v) for v in design.ravel()],
            "target": [float(v) for v in inputs.y], "featurePriors": list(feature_priors),
            "featureModes": feature_modes, "changepointPrior": inputs.tau,
            "initialParameters": [canonical_fitted_float(v, zero_threshold=0.0) for v in parameters],
            "probes": probes, "maxIterations": budget,
            "requestedAlgorithm": requested_algorithm, "selectedAlgorithm": selected_algorithm,
            "returnedAlgorithm": returned_algorithm if fit is not None else None,
            "newtonFallback": fallback_enabled, "lbfgsControls": controls,
            "attempts": attempts, "trajectory": trajectory, "gradientProbes": gradient_probes,
        }
        if fit is None:
            case["expected"] = {"failure": "line-search-failure"}
            cases.append(case)
            continue

        state = [fitted["k"], fitted["m"], *[fitted[f"delta[{j + 1}]"] for j in range(inputs.S)],
                 np.log(fitted["sigma_obs"]), *[fitted[f"beta[{j + 1}]"] for j in range(inputs.K)]]
        completion = stan_optimization_completion(stdout, returned_algorithm, budget)
        iterations, termination = completion["iterations"], completion["termination"]
        attempts.append(completion)
        fitted_density, _ = density(state)
        prediction = np.asarray([fitted[f"trend[{j + 1}]"] for j in range(count)])

        if mixed:
            beta = np.asarray(state[sigma_index + 1:])
            additive = features[:, np.asarray(inputs.s_a, dtype=bool)] @ beta[np.asarray(inputs.s_a, dtype=bool)]
            multiplicative = features[:, np.asarray(inputs.s_m, dtype=bool)] @ beta[np.asarray(inputs.s_m, dtype=bool)]
            prediction = prediction * (1.0 + multiplicative) + additive

        case["expected"] = {
                "iterations": iterations,
                "termination": termination,
                "iterationLimit": termination == "iteration-limit",
                "parameters": [canonical_fitted_float(v) for v in state],
                "logDensity": canonical_fitted_float(fitted_density, zero_threshold=0.0),
                "predictions": [canonical_fitted_float(v, zero_threshold=0.0) for v in prediction],
                "noise": canonical_fitted_float(fitted["sigma_obs"], zero_threshold=0.0),
            }
        cases.append(case)

    executable_info = subprocess.run(
        [str(find_prophet_model()), "info"], check=True, capture_output=True, text=True
    ).stdout

    for expected in ("stan_version_major = 2", "stan_version_minor = 37", "stan_version_patch = 0"):
        if expected not in executable_info.splitlines():
            fail(f"Frozen Prophet executable does not report {expected}")

    return {
        "stanVersion": "2.37.0",
        "stanSourceCommit": "1357c136bf22e3f0d25ed3529fea55fe76842eac",
        "stanMathSourceCommit": "58ad15b0847485d523aadd22cbae7add0a61b0e3",
        "cases": cases,
        "tolerances": {
            "valueAbsolute": 1e-7, "gradientAbsolute": 1e-7, "curvatureAbsolute": 2e-12,
            "fitLogDensityAbsolute": 0.01, "predictionAbsolute": 0.002,
            "noiseAbsolute": 0.0002, "oneStepParameterAbsolute": 1e-7,
        },
    }


def make_stan_logistic_objective_fixture() -> dict[str, Any]:
    """Freeze same-point logistic calculus and actual empty-point public folding."""
    cases = []
    for identifier in (
        "implicit-empty-default", "implicit-empty-loose",
        "implicit-empty-loose-benchmark-absmax", "implicit-empty-loose-benchmark-minmax",
        "explicit-floor",
        "mixed-conditional", "duplicate-endpoints", "endpoint-clipping",
    ):
        empty = identifier.startswith("implicit-empty")
        mixed = identifier == "mixed-conditional"
        explicit_floor = identifier in ("explicit-floor", "mixed-conditional")
        index = np.arange(12, dtype=np.float64)
        dates = pd.date_range("2020-01-01", periods=12, freq="D")
        capacities = 100.0 + 0.2 * index
        floors = 5.0 + 0.05 * index if explicit_floor else np.zeros(12)
        values = floors + (capacities - floors) / (1 + np.exp(-4 * (index / 11 - 0.45)))
        values += 0.08 * np.sin(index * 1.731) + 0.035 * np.cos(index * 0.417)
        frame = pd.DataFrame({"ds": dates, "y": values, "cap": capacities})
        if explicit_floor:
            frame["floor"] = floors
        if mixed:
            frame["active"] = index % 3 != 1
            frame["promotion"] = index % 4 == 2
            frame["y"] += 0.4 * np.sin(2 * np.pi * index / 7) * frame["active"]
        if identifier == "duplicate-endpoints":
            duplicate = frame.iloc[[-1]].copy()
            duplicate["y"] += 2.0
            frame = pd.concat([frame, duplicate], ignore_index=True)
        if identifier == "endpoint-clipping":
            frame.loc[0, "y"] = -3.0
            frame.loc[11, "y"] = capacities[-1] + 4.0
        benchmark_data = None
        if "-benchmark-" in identifier:
            # Consume the frozen red-checkpoint bytes, without regenerating inputs.
            dataset_path = ROOT / "benchmark" / "inputs" / "v2" / "logistic-basic-96.json"
            benchmark_data = json.loads(dataset_path.read_text())
            frame = pd.DataFrame({
                "ds": pd.to_datetime([row["timestamp"] for row in benchmark_data["observations"]]).tz_localize(None),
                "y": [row["value"] for row in benchmark_data["observations"]],
                "cap": [row["capacity"] for row in benchmark_data["observations"]],
            })
        else:
            # Authored analytic observations must not expose CPU-sensitive last bits.
            frame["y"] = frame["y"].map(lambda value: canonical_fitted_float(value, zero_threshold=0.0))
        prior = 10.0 if "loose" in identifier else 0.05
        scaling = "minmax" if explicit_floor or identifier.endswith("-minmax") else "absmax"

        def make_model():
            model = Prophet(
                growth="logistic", scaling=scaling,
                changepoints=[] if empty else [dates[5]], changepoint_prior_scale=prior,
                yearly_seasonality=False, weekly_seasonality=False, daily_seasonality=False,
                uncertainty_samples=0,
                holidays=pd.DataFrame({"holiday": ["campaign"], "ds": [dates[4]]}) if mixed else None,
            )
            if mixed:
                model.add_seasonality("weekly-custom", period=7, fourier_order=1,
                                      condition_name="active", mode="additive", prior_scale=2)
                model.add_regressor("promotion", standardize=False, mode="multiplicative", prior_scale=3)
            return model

        model = make_model()
        inputs = model.preprocess(frame)
        initial = model.calculate_initial_params(inputs.K)
        _, data = model.stan_backend.prepare_data(initial.__dict__, inputs.__dict__)
        # The oracle and Rust both receive these exact, CPU-independent feature bytes.
        data["X"] = np.round(inputs.X.to_numpy(), FOURIER_DECIMAL_PLACES).tolist()
        sigma_index = 2 + inputs.S
        parameters = [initial.k, initial.m, *initial.delta, 0.0, *initial.beta]
        canonical = lambda value: canonical_fitted_float(value, zero_threshold=0.0)
        parameters = [canonical(value) for value in parameters]
        probe_parameters = []
        for delta in (0.0, -0.0005, 0.25):
            probe = list(parameters)
            probe[2] = delta
            probe[sigma_index] = canonical(float(np.log(0.3)))
            for column in range(inputs.K):
                probe[sigma_index + 1 + column] = 0.01 * (column + 1) * (-1 if column % 2 else 1)
            probe_parameters.append([canonical(value) for value in probe])
        if not empty:
            # Nonzero opposite segment rates remain nonsingular in upstream gamma arithmetic.
            probe = list(probe_parameters[-1])
            probe[0], probe[2] = 1.0, -2.0
            probe_parameters.append(probe)

        probes = []
        for probe in probe_parameters:
            value, gradient = stan_unconstrained_probe(model, data, probe)
            probes.append({
                "parameters": probe, "logDensity": canonical(value),
                "gradient": [canonical(value) for value in gradient],
                "curvature": [canonical(value) for value in stan_curvature_probe(model, data, probe)],
            })

        case = {
            "id": identifier, "scaling": scaling, "times": [float(value) for value in inputs.t],
            "target": [float(value) for value in inputs.y],
            "capacities": [float(value) for value in inputs.cap],
            "changepointTimes": [] if empty else [float(value) for value in model.changepoints_t],
            "internalChangepointTimes": [float(value) for value in model.changepoints_t],
            "features": [float(value) for value in np.asarray(data["X"]).ravel()],
            "featurePriors": list(inputs.sigmas),
            "featureModes": ["multiplicative" if value else "additive" for value in inputs.s_m],
            "changepointPrior": prior, "initialParameters": parameters, "probes": probes,
        }
        if benchmark_data is not None:
            case["sourceDataset"] = {"path": "benchmark/inputs/v2/logistic-basic-96.json", "sha256": sha256_file(dataset_path)}
        if empty:
            fitted = make_model().fit(frame, algorithm="Newton", iter=10000, sig_figs=12, seed=2831,
                                      save_iterations=True)
            raw = fitted.stan_fit.optimized_params_dict
            prediction_frame = frame.drop(columns="y") if benchmark_data is None else pd.DataFrame({
                "ds": pd.to_datetime([row["timestamp"] for row in benchmark_data["predictionRows"]]).tz_localize(None),
                "cap": [row["capacity"] for row in benchmark_data["predictionRows"]],
            })
            prediction = fitted.predict(prediction_frame)
            prepared_prediction = fitted.setup_dataframe(prediction_frame.copy())
            trajectory_rows = pd.read_csv(fitted.stan_fit.runset.csv_files[0], comment="#")
            trajectory = []
            if identifier == "implicit-empty-default":
                for _, row in trajectory_rows.iterrows():
                    trajectory.append({
                        "parameters": [canonical(row["k"]), canonical(row["m"]),
                                       canonical(row["delta.1"]), canonical(float(np.log(row["sigma_obs"]))),
                                       canonical(row["beta.1"])],
                        "logDensity": canonical(row["lp__"]),
                    })
            for iteration in (8, 22, len(trajectory) - 2) if trajectory else ():
                probe = trajectory[iteration]["parameters"]
                value, gradient = stan_unconstrained_probe(model, data, probe)
                # Large low-noise derivatives exceed the resolution of a
                # curvature stencil built from 12-digit log_prob output. Keep
                # the existing curvature gate/probes unchanged; add gradients
                # and a real one-step optimize seam at the same authored state.
                sigma = canonical(float(np.exp(probe[sigma_index])))
                step_initial = [*probe[:sigma_index], canonical(float(np.log(sigma))),
                                *probe[sigma_index + 1:]]
                step = model.stan_backend.model.optimize(
                    data=data, inits={"k": probe[0], "m": probe[1], "delta": [probe[2]],
                                      "sigma_obs": sigma, "beta": [probe[-1]]},
                    algorithm="Newton", iter=1, sig_figs=12, seed=2831,
                ).optimized_params_dict
                probes.append({
                    "parameters": probe, "logDensity": canonical(value),
                    "gradient": [canonical(value) for value in gradient],
                    "trajectoryIteration": iteration,
                    "newtonStep": {
                        "initial": step_initial,
                        "parameters": [canonical(step["k"]), canonical(step["m"]),
                                       canonical(step["delta[1]"]),
                                       canonical(float(np.log(step["sigma_obs"]))),
                                       canonical(step["beta[1]"])],
                    },
                })
            case["fitted"] = {
                "trajectory": trajectory,
                "scale": float(fitted.y_scale),
                "implicitFloor": float(fitted.history["floor"].iloc[0]),
                "predictionTimes": [float(value) for value in prepared_prediction["t"]],
                "predictionCapacities": [float(value) for value in prediction_frame["cap"]],
                "observations": [
                    {"timestamp": row.ds.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
                     "value": float(row.y), "capacity": float(row.cap)}
                    for row in frame.itertuples()
                ],
                "internalParameters": [canonical(raw["k"]), canonical(raw["m"]),
                                       canonical(raw["delta[1]"]), canonical(float(np.log(raw["sigma_obs"]))),
                                       canonical(raw["beta[1]"])],
                "rate": canonical(fitted.params["k"][0][0]),
                "offset": canonical(fitted.params["m"][0][0]),
                "objective": canonical(-raw["lp__"]),
                "stationarityResidual": canonical(map_optimizer_evidence(fitted)["stationarityResidual"]),
                "normalizedNoise": canonical(raw["sigma_obs"]),
                "trend": [canonical(value) for value in prediction["trend"]],
                "value": [canonical(value) for value in prediction["yhat"]],
            }
        cases.append(case)

    return {
        "sourceMethod": "Unmodified Prophet 1.4.0 preprocess/init and bundled Stan log_prob without Jacobian",
        "cases": cases,
        "tolerances": {"valueAbsolute": 1e-7, "gradientAbsolute": 1e-7,
                       "curvatureAbsolute": 2e-12, "initialAbsolute": 1e-10,
                       "fitObjectiveAbsolute": 0.01, "forecastAbsolute": 0.01,
                       "normalizedNoiseAbsolute": 0.0002, "stationarityAbsolute": 0.01},
    }


def make_stan_logistic_lbfgs_fixture() -> dict[str, Any]:
    """Freeze defaults-256 public evidence and a separate CPU-independent problem.

    Public fitting uses unmodified preprocessing and backend defaults. The private
    trajectory instead rounds Fourier inputs to 12 decimal places and fits from
    the exact serialized initialization. Do not conflate these two endpoints.
    """
    dataset_path = ROOT / "benchmark" / "inputs" / "v2" / "logistic-weekly-256.json"
    dataset = json.loads(dataset_path.read_text())
    frame = pd.DataFrame({
        "ds": pd.to_datetime([row["timestamp"] for row in dataset["observations"]]).tz_localize(None),
        "y": [row["value"] for row in dataset["observations"]],
        "cap": [row["capacity"] for row in dataset["observations"]],
    })
    canonical = lambda value: canonical_fitted_float(value, zero_threshold=0.0)
    budget = 10000
    model = Prophet(growth="logistic", uncertainty_samples=0)
    inputs = model.preprocess(frame)
    initial = model.calculate_initial_params(inputs.K)
    _, data = model.stan_backend.prepare_data(initial.__dict__, inputs.__dict__)
    data["X"] = np.round(inputs.X.to_numpy(), FOURIER_DECIMAL_PLACES).tolist()
    sigma_index = 2 + inputs.S
    parameters = [canonical(value) for value in
                  [initial.k, initial.m, *initial.delta, 0.0, *initial.beta]]
    inits = {"k": parameters[0], "m": parameters[1], "delta": parameters[2:sigma_index],
             "sigma_obs": 1.0, "beta": parameters[sigma_index + 1:]}

    with tempfile.TemporaryDirectory(prefix="prophet-logistic-lbfgs-") as directory:
        public = Prophet(growth="logistic", uncertainty_samples=0).fit(
            frame, sig_figs=12, save_iterations=True, refresh=1, output_dir=directory,
        )
        public_raw = public.stan_fit.optimized_params_dict
        public_stdout = Path(public.stan_fit.runset.stdout_files[0]).read_text()
        public_algorithm = {"lbfgs": "LBFGS", "newton": "Newton"}[
            public.stan_fit.metadata.cmdstan_config["algorithm"]
        ]
        fixed = model.stan_backend.model.optimize(
            data=data, inits=inits, algorithm="LBFGS", iter=budget,
            sig_figs=12, seed=2831, save_iterations=True, refresh=1, output_dir=directory,
        )
        fixed_stdout = Path(fixed.runset.stdout_files[0]).read_text()
        trajectory_rows = pd.read_csv(fixed.runset.csv_files[0], comment="#")
        fixed_raw = fixed.optimized_params_dict

    # Save every accepted state for locating the first divergence, not an exact
    # late-trajectory compatibility gate on this nonsmooth objective.
    trajectory = []
    for _, row in trajectory_rows.iterrows():
        trajectory.append([canonical(value) for value in
            [row["k"], row["m"], *[row[f"delta.{j + 1}"] for j in range(inputs.S)],
             np.log(row["sigma_obs"]), *[row[f"beta.{j + 1}"] for j in range(inputs.K)]]])

    public_parameters = [canonical(value) for value in
        [public_raw["k"], public_raw["m"],
         *[public_raw[f"delta[{j + 1}]"] for j in range(inputs.S)],
         np.log(public_raw["sigma_obs"]), *[public_raw[f"beta[{j + 1}]"] for j in range(inputs.K)]]]
    probes = []
    authored = list(parameters)
    authored[sigma_index] = canonical(float(np.log(0.3)))
    for column in range(inputs.S):
        authored[2 + column] = canonical(0.25 if column % 2 == 0 else -0.0005)
    for column in range(inputs.K):
        authored[sigma_index + 1 + column] = canonical(0.01 * (column + 1) * (-1 if column % 2 else 1))
    states = [("initial", parameters), ("nonzero-deltas-and-features", authored),
              ("unmodified-public-endpoint-on-rounded-features", public_parameters)]
    for iteration in (1, 8, 20, 38, 39, 50, 100, 300, 600, len(trajectory) - 1):
        if iteration < len(trajectory):
            states.append((f"iteration-{iteration}", trajectory[iteration]))
    for identifier, state in states:
        value, gradient = stan_unconstrained_probe(model, data, state)
        probes.append({"id": identifier, "parameters": state,
                       "logDensity": canonical(value), "gradient": [canonical(v) for v in gradient]})

    # An authored normalized problem exposes column-adjoint cancellation without
    # storing low-bit optimizer output. It is not a public preprocessing case.
    adjoint_case = {
        "id": "additive-adjoint-cancellation", "target": [1e16, 1.0, -1e16, 1.0],
        "times": [0.0, 1.0 / 3.0, 2.0 / 3.0, 1.0], "capacities": [1e-300] * 4,
        "changepointTimes": [0.5], "features": [1.0] * 4,
        "featurePriors": [1.0], "featureModes": ["additive"], "changepointPrior": 0.05,
    }
    adjoint_cases = [adjoint_case, {
        "id": "multiplicative-adjoint-scalar-control", "target": [1e16, 2.0, -1e16, 2.0, 2.0],
        "times": [0.0, 0.0, 0.0, 0.0, 1.0], "capacities": [2.0] * 5,
        "changepointTimes": [0.5], "features": [1.0, 1.0, 1.0, 1.0, 0.0],
        "featurePriors": [1.0], "featureModes": ["multiplicative"], "changepointPrior": 0.05,
    }, {
        "id": "scalar-inv-logit-value-view", "target": [4797286177634870.0, 0.0],
        "times": [0.0, 1.0], "capacities": [1e16, 1e-300],
        "changepointTimes": [0.5], "features": [1.0, 0.0],
        "featurePriors": [1.0], "featureModes": ["additive"], "changepointPrior": 0.05,
        "probeParameters": [1.0, 0.08113, 0.0, 0.0, 0.0],
    }, {
        "id": "column-major-changepoint-cancellation", "target": [0.0, 8807970779778823.0],
        "times": [0.0, 1.0], "capacities": [1e-300, 1e16],
        "changepointTimes": [0.0] * 4, "features": [0.0, 1.0],
        "featurePriors": [1.0], "featureModes": ["additive"], "changepointPrior": 1e16,
        "probeParameters": [1.0, 0.0, -1e16, 1.0, 1e16, 1.0, 0.0, 0.0],
    }, {
        "id": "column-major-changepoint-blocks", "target": [0.0, 0.0],
        "times": [0.0, 1.0], "capacities": [1e-300, 1.0],
        "changepointTimes": [0.0] * 128, "features": [0.0, 1.0],
        "featurePriors": [1.0], "featureModes": ["additive"], "changepointPrior": 1e16,
        "probeParameters": [10.0, 0.0, *([-1e16, 1.0, 1e16, 1.0] * 32), 0.0, 0.0],
    }, {
        "id": "changepoint-adjoint-scalar-cancellation",
        "target": [0.0, 10000000000000002.0, 3.9242343145200196, -9999999999999998.0, 3.9242343145200196],
        "times": [0.0, 1.0, 1.0, 1.0, 1.0], "capacities": [1e-300, 4.0, 4.0, 4.0, 4.0],
        "changepointTimes": [0.0], "features": [0.0] * 5,
        "featurePriors": [1.0], "featureModes": ["additive"], "changepointPrior": 0.05,
    }]
    for adjoint_case in adjoint_cases:
        additive = adjoint_case["featureModes"][0] == "additive"
        adjoint_data = dict(
            T=len(adjoint_case["target"]), S=len(adjoint_case["changepointTimes"]), K=1,
            y=adjoint_case["target"], t=adjoint_case["times"], cap=adjoint_case["capacities"],
            t_change=adjoint_case["changepointTimes"], X=[[v] for v in adjoint_case["features"]],
            sigmas=[1.0], s_a=[int(additive)], s_m=[int(not additive)],
            tau=adjoint_case["changepointPrior"], trend_indicator=1,
        )
        adjoint_parameters = adjoint_case.pop("probeParameters", [1.0, 0.0, 0.0, 0.0, 0.0])
        value, gradient = stan_unconstrained_probe(model, adjoint_data, adjoint_parameters)
        adjoint_case["probes"] = [{
            "id": "unit-noise-zero-beta", "parameters": adjoint_parameters,
            "logDensity": canonical(value), "gradient": [canonical(v) for v in gradient],
        }]

    return {
        "sourceMethod": "Unmodified Prophet 1.4.0 public defaults; separate 12-decimal Fourier Stan LBFGS trajectory",
        "adjointReductionCases": adjoint_cases,
        "cases": [{
            "id": "logistic-reconcile-defaults-256",
            "sourceDataset": {"path": str(dataset_path.relative_to(ROOT)), "sha256": sha256_file(dataset_path)},
            "times": list(inputs.t), "target": list(inputs.y), "capacities": list(inputs.cap),
            "changepointTimes": list(model.changepoints_t),
            "features": np.asarray(data["X"]).ravel().tolist(),
            "featurePriors": list(inputs.sigmas),
            "featureModes": ["multiplicative" if value else "additive" for value in inputs.s_m],
            "changepointPrior": inputs.tau, "initialParameters": parameters,
            "maxIterations": budget, "probes": probes, "trajectory": trajectory,
            "fixedProblemFit": {
                **stan_optimization_completion(fixed_stdout, "LBFGS", budget),
                "logDensity": canonical(fixed_raw["lp__"]), "normalizedNoise": canonical(fixed_raw["sigma_obs"]),
            },
            "unmodifiedPublicFit": {
                "parameters": public_parameters,
                **stan_optimization_completion(public_stdout, public_algorithm, budget),
                **{key: canonical(value) for key, value in map_optimizer_evidence(public).items()},
                "normalizedNoise": canonical(public_raw["sigma_obs"]),
            },
        }],
        "tolerances": {"valueAbsolute": 1e-7, "gradientAbsolute": 1e-7,
                       "initialAbsolute": 1e-10, "earlyTrajectoryParameterAbsolute": 1e-7,
                       "fitObjectiveAbsolute": 0.01, "normalizedNoiseAbsolute": 0.0002},
    }


def make_logistic_prediction_state_fixture() -> dict[str, Any]:
    """Freeze public gamma arithmetic, including nonfinite singular predictions.

    Nonfinite oracle results are tagged, never written as invalid JSON or replaced
    with a continuous extension. Empty public points retain Prophet's zero dummy.
    """
    training = pd.DataFrame({
        "ds": pd.to_datetime(["2020-01-01", "2020-01-05"]),
        "y": [20.0, 80.0], "cap": [100.0, 100.0], "floor": [-5.0, -5.0],
    })
    prediction_times = [-0.25, 0.0, 0.25, 0.5, 0.75, 1.0, 1.5]
    prediction_frame = pd.DataFrame({
        "ds": [training["ds"].iloc[0] + pd.Timedelta(days=4 * t) for t in prediction_times],
        "cap": [100.0 + i for i in range(len(prediction_times))],
        "floor": [-5.0 + 0.5 * i for i in range(len(prediction_times))],
    })
    cases = []
    states = (
        ("empty-nonzero", 2.0, 0.4, [], []),
        ("empty-zero", 0.0, 0.4, [], []),
        ("zero-base-nonzero-segment", 0.0, 0.4, [0.5], [2.0]),
        ("zero-segment", 2.0, 0.4, [0.5], [-2.0]),
        ("zero-segment-at-offset", 2.0, 0.5, [0.5], [-2.0]),
        ("zero-segment-then-recovery", 2.0, 0.4, [0.25, 0.75], [-2.0, 3.0]),
        ("nonzero-sign-crossing", 2.0, 0.4, [0.5], [-4.0]),
        ("zero-segment-at-origin", 2.0, 0.4, [0.0], [-2.0]),
        ("zero-segment-at-endpoint", 2.0, 0.4, [1.0], [-2.0]),
    )
    for scaling in ("absmax", "minmax"):
        model = Prophet(growth="logistic", scaling=scaling, changepoints=[],
                        yearly_seasonality=False, weekly_seasonality=False,
                        daily_seasonality=False, uncertainty_samples=0)
        history = model.setup_dataframe(training.copy(), initialize_scales=True)
        prepared = model.setup_dataframe(prediction_frame.copy())
        for identifier, rate, offset, points, deltas in states:
            model.changepoints_t = np.asarray(points if points else [0.0])
            model.params = {"k": np.asarray([[rate]]), "m": np.asarray([[offset]]),
                            "delta": np.asarray([deltas if deltas else [0.0]])}
            with np.errstate(divide="ignore", invalid="ignore", over="ignore"):
                trend = model.predict_trend(prepared)
            cases.append({
                "id": f"{identifier}-{scaling}", "scaling": scaling,
                "scale": float(model.y_scale), "times": prediction_times,
                "capacities": prediction_frame["cap"].tolist(),
                "floors": prediction_frame["floor"].tolist(),
                "parameters": {"rate": rate, "offset": offset,
                               "changepoints": points, "deltas": deltas},
                "expected": [
                    {"kind": "finite", "trend": canonical_fitted_float(value, zero_threshold=0.0)}
                    if np.isfinite(value) else {"kind": "non-finite"}
                    for value in trend
                ],
            })
    return {
        "sourceMethod": "Unmodified Prophet 1.4.0 setup_dataframe and predict_trend with authored public parameters",
        "cases": cases, "toleranceAbsolute": 1e-9,
    }


def find_prophet_model() -> Path:
    """Locate the model binary bundled in the installed Prophet distribution."""

    model_path = Path(prophet.__file__).resolve().parent / "stan_model" / "prophet_model.bin"

    if not model_path.is_file():
        fail(f"Installed Prophet distribution is missing {model_path}")

    return model_path


def numerical_environment() -> list[dict[str, str]]:
    """Describe locked packages involved in preprocessing and trend evaluation."""

    names = ("cmdstanpy", "numpy", "pandas", "prophet")

    return [{"name": name, "version": importlib.metadata.version(name)} for name in names]


def write_outputs(output: Path, execution: dict[str, str], reference: dict[str, str]) -> None:
    """Write the fixture artifact and its provenance manifest."""

    output.mkdir(parents=True, exist_ok=True)

    linear_trend_path = output / LINEAR_TREND_FILENAME
    linear_trend_path.write_bytes(
        stable_json({"cases": [make_case(spec) for spec in LINEAR_TREND_CASES]})
    )
    fourier_path = output / FOURIER_FILENAME
    fourier_path.write_bytes(
        stable_json({"cases": [make_fourier_case(spec) for spec in FOURIER_CASES]})
    )
    piecewise_linear_path = output / PIECEWISE_LINEAR_FILENAME
    piecewise_linear_path.write_bytes(
        stable_json({"cases": [make_piecewise_linear_case(spec) for spec in PIECEWISE_LINEAR_CASES]})
    )
    changepoint_resolution_path = output / CHANGEPOINT_RESOLUTION_FILENAME
    changepoint_resolution_path.write_bytes(
        stable_json(
            {
                "cases": [
                    make_changepoint_resolution_case(spec)
                    for spec in CHANGEPOINT_RESOLUTION_CASES
                ]
            }
        )
    )
    evaluation_cutoffs_path = output / EVALUATION_CUTOFFS_FILENAME
    evaluation_cutoffs_path.write_bytes(stable_json({"cases": [make_evaluation_cutoff_case(spec) for spec in EVALUATION_CUTOFF_CASES]}))
    evaluation_metrics_path = output / EVALUATION_METRICS_FILENAME
    evaluation_metrics_path.write_bytes(stable_json(make_evaluation_metrics_fixture()))
    linear_map_fit_path = output / LINEAR_MAP_FIT_FILENAME
    linear_map_fit_path.write_bytes(stable_json({"cases": [
        make_linear_map_fit_fixture(variant) for variant in ("ordered", "unsorted", "duplicates")
    ]}))
    seasonality_resolution_path = output / SEASONALITY_RESOLUTION_FILENAME
    seasonality_resolution_path.write_bytes(
        stable_json(
            {
                "cases": [
                    make_seasonality_resolution_case(spec)
                    for spec in SEASONALITY_RESOLUTION_CASES
                ]
            }
        )
    )
    conditional_seasonality_path = output / CONDITIONAL_SEASONALITY_FILENAME
    conditional_seasonality_path.write_bytes(
        stable_json(
            {
                "cases": [
                    make_conditional_feature_case(spec)
                    for spec in CONDITIONAL_FEATURE_CASES
                ]
            }
        )
    )
    conditional_map_fit_path = output / CONDITIONAL_MAP_FIT_FILENAME
    conditional_map_fit_path.write_bytes(stable_json(make_conditional_map_fit_fixture()))
    target_scaling_path = output / TARGET_SCALING_FILENAME
    target_scaling_path.write_bytes(stable_json(make_target_scaling_fixture()))
    mixed_map_path = output / MIXED_MAP_FILENAME
    mixed_map_path.write_bytes(stable_json(make_mixed_map_fixture()))
    logistic_map_path = output / LOGISTIC_MAP_FILENAME
    logistic_map_path.write_bytes(stable_json(make_logistic_map_fixture()))
    map_uncertainty_path = output / MAP_UNCERTAINTY_FILENAME
    map_uncertainty_path.write_bytes(stable_json(make_map_uncertainty_fixture()))
    stan_optimizer_path = output / STAN_LINEAR_OPTIMIZER_FILENAME
    stan_optimizer_path.write_bytes(stable_json(make_stan_linear_optimizer_fixture()))
    stan_logistic_path = output / STAN_LOGISTIC_OBJECTIVE_FILENAME
    stan_logistic_path.write_bytes(stable_json(make_stan_logistic_objective_fixture()))
    logistic_prediction_path = output / LOGISTIC_PREDICTION_STATE_FILENAME
    logistic_prediction_path.write_bytes(stable_json(make_logistic_prediction_state_fixture()))
    stan_logistic_lbfgs_path = output / STAN_LOGISTIC_LBFGS_FILENAME
    stan_logistic_lbfgs_path.write_bytes(stable_json(make_stan_logistic_lbfgs_fixture()))

    model_path = find_prophet_model()
    manifest = {
        "artifacts": [
            {
                "path": LINEAR_TREND_FILENAME,
                "sha256": sha256_file(linear_trend_path),
            },
            {
                "path": FOURIER_FILENAME,
                "sha256": sha256_file(fourier_path),
            },
            {
                "path": PIECEWISE_LINEAR_FILENAME,
                "sha256": sha256_file(piecewise_linear_path),
            },
            {
                "path": CHANGEPOINT_RESOLUTION_FILENAME,
                "sha256": sha256_file(changepoint_resolution_path),
            },
            {
                "path": EVALUATION_CUTOFFS_FILENAME,
                "sha256": sha256_file(evaluation_cutoffs_path),
            },
            {
                "path": EVALUATION_METRICS_FILENAME,
                "sha256": sha256_file(evaluation_metrics_path),
            },
            {
                "path": LINEAR_MAP_FIT_FILENAME,
                "sha256": sha256_file(linear_map_fit_path),
            },
            {
                "path": SEASONALITY_RESOLUTION_FILENAME,
                "sha256": sha256_file(seasonality_resolution_path),
            },
            {
                "path": CONDITIONAL_SEASONALITY_FILENAME,
                "sha256": sha256_file(conditional_seasonality_path),
            },
            {
                "path": CONDITIONAL_MAP_FIT_FILENAME,
                "sha256": sha256_file(conditional_map_fit_path),
            },
            {
                "path": TARGET_SCALING_FILENAME,
                "sha256": sha256_file(target_scaling_path),
            },
            {
                "path": MIXED_MAP_FILENAME,
                "sha256": sha256_file(mixed_map_path),
            },
            {
                "path": LOGISTIC_MAP_FILENAME,
                "sha256": sha256_file(logistic_map_path),
            },
            {
                "path": MAP_UNCERTAINTY_FILENAME,
                "sha256": sha256_file(map_uncertainty_path),
            },
            {
                "path": STAN_LINEAR_OPTIMIZER_FILENAME,
                "sha256": sha256_file(stan_optimizer_path),
            },
            {
                "path": STAN_LOGISTIC_OBJECTIVE_FILENAME,
                "sha256": sha256_file(stan_logistic_path),
            },
            {
                "path": LOGISTIC_PREDICTION_STATE_FILENAME,
                "sha256": sha256_file(logistic_prediction_path),
            },
            {
                "path": STAN_LOGISTIC_LBFGS_FILENAME,
                "sha256": sha256_file(stan_logistic_lbfgs_path),
            },
        ],
        "backendArtifacts": [
            {
                "name": "prophet/stan_model/prophet_model.bin",
                "sha256": sha256_file(model_path),
                "version": EXPECTED_PROPHET_VERSION,
            }
        ],
        "dependencyLockSha256": sha256_file(LOCK_PATH),
        "executionEnvironment": execution,
        "generatorRevision": hashlib.sha256(
            GENERATOR_PATH.read_bytes() + b"\0"
            + GENERATOR_PATH.with_name("linear_optimizer_evidence.py").read_bytes()
        ).hexdigest(),
        "numericalEnvironment": numerical_environment(),
        "prophetSourceCommit": reference["sourceCommit"],
        "prophetVersion": EXPECTED_PROPHET_VERSION,
        "pythonVersion": platform.python_version(),
    }

    (output / MANIFEST_FILENAME).write_bytes(stable_json(manifest))


def compare_outputs(generated: Path, committed: Path) -> None:
    """Report byte-level fixture drift without modifying committed files."""

    differences: list[str] = []

    for filename in (
        LINEAR_TREND_FILENAME,
        FOURIER_FILENAME,
        PIECEWISE_LINEAR_FILENAME,
        CHANGEPOINT_RESOLUTION_FILENAME,
        EVALUATION_CUTOFFS_FILENAME,
        LINEAR_MAP_FIT_FILENAME,
        SEASONALITY_RESOLUTION_FILENAME,
        CONDITIONAL_SEASONALITY_FILENAME,
        CONDITIONAL_MAP_FIT_FILENAME,
        TARGET_SCALING_FILENAME,
        MIXED_MAP_FILENAME,
        LOGISTIC_MAP_FILENAME,
        MAP_UNCERTAINTY_FILENAME,
        STAN_LINEAR_OPTIMIZER_FILENAME,
        STAN_LOGISTIC_OBJECTIVE_FILENAME,
        LOGISTIC_PREDICTION_STATE_FILENAME,
        STAN_LOGISTIC_LBFGS_FILENAME,
        MANIFEST_FILENAME,
    ):
        generated_path = generated / filename
        committed_path = committed / filename

        try:
            generated_text = generated_path.read_text(encoding="utf-8").splitlines(keepends=True)
            committed_text = committed_path.read_text(encoding="utf-8").splitlines(keepends=True)
        except OSError as error:
            fail(f"Unable to compare {filename}: {error}")

        if generated_text == committed_text:
            continue

        differences.extend(
            difflib.unified_diff(
                committed_text,
                generated_text,
                fromfile=str(committed_path),
                tofile=f"generated/{filename}",
            )
        )

    if differences:
        sys.stderr.writelines(differences)
        fail("Prophet reference fixtures have drifted; run npm run fixtures:generate and review")

    print("Prophet reference fixtures match the canonical generated output")


def parse_args(argv: Sequence[str]) -> argparse.Namespace:
    """Parse the intentionally small fixture generator command line."""

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=("generate", "check"))
    parser.add_argument("--output", required=True, type=Path)

    return parser.parse_args(argv)


def main(argv: Sequence[str] = sys.argv[1:]) -> None:
    """Generate fixtures or compare canonical output with committed artifacts."""

    args = parse_args(argv)
    reference = read_reference()
    execution = require_environment(reference)

    if args.mode == "generate":
        write_outputs(args.output, execution, reference)
        print(f"Wrote Prophet reference fixtures to {args.output}")
        return

    with tempfile.TemporaryDirectory(prefix="effect-prophet-fixtures-") as temporary:
        generated = Path(temporary)
        write_outputs(generated, execution, reference)
        compare_outputs(generated, args.output)


if __name__ == "__main__":
    main()
