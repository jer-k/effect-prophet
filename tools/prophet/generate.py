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


EXPECTED_PROPHET_VERSION = "1.4.0"
EXPECTED_CONTAINER_PLATFORM = "linux/amd64"
FOURIER_DECIMAL_PLACES = 12
LINEAR_TREND_FILENAME = "linear-trend.json"
FOURIER_FILENAME = "fourier.json"
SEASONALITY_RESOLUTION_FILENAME = "seasonality-resolution.json"
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
                "path": SEASONALITY_RESOLUTION_FILENAME,
                "sha256": sha256_file(seasonality_resolution_path),
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
        "generatorRevision": sha256_file(GENERATOR_PATH),
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
        SEASONALITY_RESOLUTION_FILENAME,
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
