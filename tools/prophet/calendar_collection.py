"""Shared pinned Prophet country-calendar collection and attribution.

No rules are reimplemented here: the installed Prophet helper is the oracle.
"""

from __future__ import annotations

import importlib.metadata
import tomllib
import warnings
from pathlib import Path
from typing import Any

from holidays import list_supported_countries
from prophet.make_holidays import get_country_holidays_class, make_holidays_df

from generate import LOCK_PATH, fail, read_reference, require_environment


def calendar_environment() -> tuple[dict[str, str], dict[str, Any]]:
    """Require the canonical image and every lockfile-pinned calendar dependency."""

    reference = read_reference()
    environment = require_environment(reference)
    lock = tomllib.loads(LOCK_PATH.read_text(encoding="utf-8"))
    locked = {package["name"]: package["version"] for package in lock["package"]}
    versions = {
        name: importlib.metadata.version(name)
        for name in ("prophet", "holidays", "numpy", "pandas", "python-dateutil")
    }

    for name, version in versions.items():
        if version != locked[name]:
            fail(f"Expected lockfile-pinned {name}=={locked[name]}; found {version}")

    return reference, {**environment, "packages": versions}


def country_codes() -> dict[str, str]:
    """Resolve only registered provider codes, plus Prophet's legacy TU alias."""

    return {
        code: get_country_holidays_class(code).country
        for code in sorted(set(list_supported_countries()) | {"TU"})
    }


def collect_calendar(
    code: str, years: list[int],
) -> tuple[list[dict[str, str]], list[dict[str, str]]]:
    """Preserve exact names and cross-year dates; retain warnings as diagnostics."""

    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        frame = make_holidays_df(year_list=years, country=code)

    events = sorted(
        ({"date": timestamp.date().isoformat(), "name": name}
         for timestamp, name in frame[["ds", "holiday"]].itertuples(index=False, name=None)),
        key=lambda event: (event["date"], event["name"]),
    )
    diagnostics = sorted(
        (warning.category.__name__, str(warning.message)) for warning in caught
    )
    return events, [{"category": category, "message": message} for category, message in diagnostics]


def compact_json(value: Any) -> bytes:
    """Encode lossless deterministic UTF-8 JSON without formatting overhead."""

    import json

    return (json.dumps(value, allow_nan=False, ensure_ascii=False, sort_keys=True,
                       separators=(",", ":")) + "\n").encode("utf-8")


def write_calendar_notices(output: Path, *, purpose: str) -> None:
    """Copy required license/contributor texts from the exact installed wheel."""

    output.mkdir(parents=True, exist_ok=True)
    distribution = importlib.metadata.distribution("holidays")

    for filename in ("LICENSE", "CONTRIBUTORS"):
        matches = [path for path in distribution.files or []
                   if str(path).endswith(f".dist-info/licenses/{filename}")]

        if len(matches) != 1:
            fail(f"Expected one holidays distribution {filename}; found {len(matches)}")

        (output / filename).write_bytes(distribution.locate_file(matches[0]).read_bytes())

    (output / "NOTICE.txt").write_text(
        f"Country holiday calendars generated from Prophet {importlib.metadata.version('prophet')}'s "
        f"make_holidays_df using holidays {importlib.metadata.version('holidays')}.\n"
        "https://github.com/facebook/prophet\nhttps://github.com/vacanza/holidays\n"
        "The holidays provider is MIT licensed; its LICENSE and CONTRIBUTORS are included.\n"
        "Prophet's MIT license is included as prophet-license.txt.\n"
        f"{purpose}\n",
        encoding="utf-8",
    )
    prophet_license = Path(__file__).resolve().parents[2] / "rust/prophet-wasm/third-party/prophet-license.txt"
    (output / "prophet-license.txt").write_bytes(prophet_license.read_bytes())
