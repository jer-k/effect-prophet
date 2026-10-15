#!/usr/bin/env python3
"""Generate/check production calendars offline in the pinned reference container."""

from __future__ import annotations

import argparse
import hashlib
import importlib.metadata
import json
import platform
import random
import re
import tempfile
from datetime import date, timedelta
from pathlib import Path
from typing import Any

from prophet.make_holidays import get_country_holidays_class

from calendar_collection import (
    calendar_environment,
    collect_calendar,
    compact_json,
    country_codes,
    write_calendar_notices,
)
from generate import LOCK_PATH, ROOT, fail, sha256_file, stable_json

FIRST_YEAR = 1995
LAST_YEAR = 2060
SCHEMA_VERSION = 1
EPOCH = date(1970, 1, 1)
RESTRICTIONS_PATH = Path(__file__).with_name("calendar-restrictions.json")


def read_restrictions(countries: set[str]) -> dict[str, Any]:
    """Parse the authored policy and verify evidence against the installed wheel."""

    inventory = json.loads(RESTRICTIONS_PATH.read_bytes())
    expected_keys = {"schemaVersion", "inventoryVersion", "provider", "reviewScope", "issues"}

    if set(inventory) != expected_keys or inventory["schemaVersion"] != SCHEMA_VERSION:
        fail("Unsupported coverage inventory schema")

    if inventory["provider"] != {"name": "holidays", "version": "0.104"}:
        fail("Coverage inventory requires a reviewed holidays 0.104 provider")

    if inventory["inventoryVersion"] != 1 or not inventory["reviewScope"]:
        fail("Unsupported coverage inventory version or missing review scope")

    distribution = importlib.metadata.distribution("holidays")
    reasons = {"provider-year-bound", "missing-rule-table", "provider-category-policy",
               "deliberately-empty", "estimated-dates", "source-accuracy", "annual-announcements"}
    seen = set()

    for issue in inventory["issues"]:
        if set(issue) != {"country", "firstYear", "lastYear", "reason", "disposition",
                          "rule", "description", "sources"}:
            fail("Malformed coverage issue")

        if (issue["country"] not in countries or issue["reason"] not in reasons
                or issue["disposition"] not in {"restriction", "advisory"}
                or type(issue["firstYear"]) is not int or type(issue["lastYear"]) is not int
                or not FIRST_YEAR <= issue["firstYear"] <= issue["lastYear"] <= LAST_YEAR
                or not issue["rule"] or not issue["description"] or not issue["sources"]):
            fail(f"Invalid coverage issue: {issue}")

        identity = (issue["country"], issue["firstYear"], issue["lastYear"], issue["reason"], issue["rule"])
        if identity in seen:
            fail(f"Duplicate coverage issue: {identity}")
        seen.add(identity)

        for source in issue["sources"]:
            if (set(source) != {"path", "symbol", "sha256", "url"}
                    or not re.fullmatch(r"holidays/(?:countries|calendars)/[a-z_]+\.py|holidays/(?:holiday_base|no_holiday_base)\.py", source["path"])
                    or not source["symbol"]
                    or source["url"] != f"https://github.com/vacanza/holidays/blob/v0.104/{source['path']}"):
                fail(f"Invalid pinned coverage source: {source}")

            if sha256_file(Path(distribution.locate_file(source["path"]))) != source["sha256"]:
                fail(f"Coverage evidence changed; source review required: {source['path']}")

    return inventory


def event_pairs(events: list[dict[str, str]]) -> set[tuple[str, str]]:
    """Represent exact simultaneous name/date identities without Gregorian filtering."""

    pairs = {(event["date"], event["name"]) for event in events}
    if len(pairs) != len(events):
        fail("Prophet returned duplicate date/name identities")
    return pairs


def partition_queries(years: list[int]) -> list[list[int]]:
    """Freeze adjacent, sparse, irregular, original-range and full-horizon oracle queries."""

    queries = [years, years[:50], years[::2], years[1::2], [years[0], years[-1]]]
    queries.extend([year, year + 1] for year in years[:-1])
    # Private deterministic randomness, independent of PYTHONHASHSEED and ambient RNGs.
    random_source = random.Random(69)
    queries.extend(sorted(random_source.sample(years, size)) for size in (3, 7, 16, 33, 65))
    return queries


def collect_snapshot(output: Path) -> None:
    """Produce only country partitions, reviewed coverage, manifest and required notices."""

    reference, environment = calendar_environment()
    code_map = country_codes()
    countries = set(code_map.values())
    inventory = read_restrictions(countries)
    years = list(range(FIRST_YEAR, LAST_YEAR + 1))
    calendar_root = output / "calendars"
    notice_root = output / "third-party" / "calendars"
    (calendar_root / "countries").mkdir(parents=True)
    write_calendar_notices(
        notice_root,
        purpose="Offline versioned rule snapshot; not a guarantee of complete or officially confirmed holiday dates.",
    )
    (calendar_root / "coverage.json").write_bytes(stable_json(inventory))
    country_entries = {}
    partition_occurrences = 0
    unique_occurrences = 0
    queries = partition_queries(years)

    for code in sorted(countries):
        if not re.fullmatch(r"[A-Z]{2}", code):
            fail(f"Noncanonical country identifier: {code}")

        partitions = []
        warnings = []
        for year in years:
            events, diagnostics = collect_calendar(code, [year])
            partitions.append(event_pairs(events))
            if diagnostics:
                warnings.append({"year": year, "warnings": diagnostics})

        all_pairs = set().union(*partitions)
        names = sorted({name for _, name in all_pairs})
        indexes = {name: index for index, name in enumerate(names)}
        encoded_years = [
            [[(date.fromisoformat(day) - EPOCH).days, indexes[name]] for day, name in sorted(partition)]
            for partition in partitions
        ]
        # Check encoding, not just the oracle input: all indexes/dates must round trip.
        restored_partitions = [
            {( (EPOCH + timedelta(days=day)).isoformat(), names[index]) for day, index in partition}
            for partition in encoded_years
        ]
        if restored_partitions != partitions:
            fail(f"Compact partition round trip differs: {code}")

        for selected in queries:
            expected = set().union(*(restored_partitions[year - FIRST_YEAR] for year in selected))
            actual = event_pairs(collect_calendar(code, selected)[0])
            if expected != actual:
                fail(f"Generation-year union differs from Prophet: {code}, years={selected}; "
                     f"extra={sorted(expected - actual)}, missing={sorted(actual - expected)}")

        provider = get_country_holidays_class(code)
        issues = [issue for issue in inventory["issues"] if issue["country"] == code]
        # Bounds are evidence. The authored inventory, never date counts/name-loss, owns policy.
        for first, last in ((FIRST_YEAR, min(LAST_YEAR, provider.start_year - 1)),
                            (max(FIRST_YEAR, provider.end_year + 1), LAST_YEAR)):
            if first <= last and not any(
                issue["reason"] == "provider-year-bound" and issue["disposition"] == "restriction"
                and issue["firstYear"] == first and issue["lastYear"] == last for issue in issues
            ):
                fail(f"Unreviewed provider bound: {code}, {first}–{last}")

        payload = {
            "schemaVersion": SCHEMA_VERSION, "country": code,
            "firstYear": FIRST_YEAR, "lastYear": LAST_YEAR,
            "names": names, "years": encoded_years,
            "coverage": {"providerStartYear": provider.start_year, "providerEndYear": provider.end_year,
                         "issues": issues},
        }
        path = calendar_root / "countries" / f"{code}.json"
        path.write_bytes(compact_json(payload))
        member_count = sum(map(len, partitions))
        country_entries[code] = {"file": f"countries/{code}.json", "sha256": sha256_file(path),
                                 "bytes": path.stat().st_size, "names": len(names),
                                 "uniqueOccurrences": len(all_pairs), "partitionOccurrences": member_count,
                                 "warnings": warnings}
        partition_occurrences += member_count
        unique_occurrences += len(all_pairs)

    # Aliases are evaluated with Prophet, not assumed from class identity alone.
    for code, canonical in code_map.items():
        if code != canonical:
            for selected in (years, [1995, 2001, 2026, 2033, 2036, 2051, 2060]):
                if event_pairs(collect_calendar(code, selected)[0]) != event_pairs(collect_calendar(canonical, selected)[0]):
                    fail(f"Alias {code} differs from {canonical}")

    generator_sources = {
        str(path.relative_to(ROOT)): sha256_file(path)
        for path in [Path(__file__), Path(__file__).with_name("calendar_collection.py"),
                     Path(__file__).with_name("generate.py"),
                     Path(__file__).with_name("linear_optimizer_evidence.py")]
    }
    input_sources = {
        str(path.relative_to(ROOT)): sha256_file(path)
        for path in [LOCK_PATH, RESTRICTIONS_PATH, Path(__file__).with_name("reference.json"),
                     Path(__file__).with_name("pyproject.toml"), Path(__file__).with_name(".python-version"),
                     Path(__file__).with_name("Dockerfile")]
    }
    files = {
        str(path.relative_to(output)): {"sha256": sha256_file(path), "bytes": path.stat().st_size}
        for path in sorted(output.rglob("*")) if path.is_file()
    }
    manifest = {
        "schemaVersion": SCHEMA_VERSION,
        "reference": reference,
        "provider": {"name": "holidays", "version": environment["packages"]["holidays"]},
        "environment": {**environment, "pythonVersion": platform.python_version()},
        "generatorSources": generator_sources, "inputSources": input_sources,
        "generation": {"firstYear": FIRST_YEAR, "lastYear": LAST_YEAR, "language": "en_US",
                       "subdivision": None, "categories": "provider-default", "observed": True,
                       "expand": False, "epoch": EPOCH.isoformat(),
                       "occurrenceFields": ["epochDay", "nameIndex"],
                       "partitionMembership": "requested generation year; union exact date/name pairs"},
        "aliases": {code: canonical for code, canonical in code_map.items() if code != canonical},
        "countries": country_entries,
        "counts": {"countries": len(countries), "aliases": len(code_map) - len(countries),
                   "uniqueOccurrences": unique_occurrences, "partitionOccurrences": partition_occurrences},
        "coverage": {"file": "coverage.json", "inventoryVersion": inventory["inventoryVersion"],
                     "reviewScope": inventory["reviewScope"], "completeOfficialCoverageVerified": False},
        "checks": {"compactRoundTripsEqual": True, "aliasCalendarsEqual": True,
                   "partitionQueries": queries, "partitionUnionsEqual": True},
        "files": files,
    }
    # Domain-separated content identity covers provenance, policy, notices and every data file.
    manifest["snapshotId"] = "sha256:" + hashlib.sha256(
        b"effect-prophet.country-holidays.v1\0" + stable_json(manifest)
    ).hexdigest()
    (calendar_root / "manifest.json").write_bytes(stable_json(manifest))
    # Derived allowlist binds runtime lookup to this exact snapshot without import-time I/O.
    # It is generated after the manifest to avoid a circular snapshot-ID/file-hash dependency.
    catalog = {
        "schemaVersion": SCHEMA_VERSION, "snapshotId": manifest["snapshotId"],
        "firstYear": FIRST_YEAR, "lastYear": LAST_YEAR,
        "provider": {"prophet": reference["version"], "holidays": environment["packages"]["holidays"]},
        "aliases": manifest["aliases"],
        "countries": {code: {"file": entry["file"], "sha256": entry["sha256"], "bytes": entry["bytes"]}
                      for code, entry in country_entries.items()},
    }
    catalog_path = output / "src/internal/country-holiday-catalog.ts"
    catalog_path.parent.mkdir(parents=True)
    catalog_path.write_text(
        '// Generated by tools/prophet/generate_calendars.py; do not edit.\n'
        'import { freezeOwned } from "./owned-input";\n\n'
        '/** Immutable allowlist and integrity identities for the bundled country snapshot. */\n'
        'export const countryHolidayCatalog = freezeOwned(' +
        json.dumps(catalog, ensure_ascii=True, sort_keys=True, indent=2) + ' as const);\n',
        encoding="utf-8",
    )
    print(f"Generated {len(countries)} calendars, {unique_occurrences} unique occurrences, "
          f"{partition_occurrences} generation-year memberships; {manifest['snapshotId']}")


def artifact_files(root: Path) -> dict[str, bytes]:
    """Read the complete owned inventory, including unexpected files in check mode."""

    files = {
        str(path.relative_to(root)): path.read_bytes()
        for folder in (root / "calendars", root / "third-party" / "calendars")
        for path in sorted(folder.rglob("*")) if path.is_file()
    }
    catalog = root / "src/internal/country-holiday-catalog.ts"
    if catalog.is_file():
        files[str(catalog.relative_to(root))] = catalog.read_bytes()
    return files


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=("generate", "check"))
    parser.add_argument("--output", required=True, type=Path)
    arguments = parser.parse_args()

    with tempfile.TemporaryDirectory(prefix="effect-prophet-calendars-") as temporary:
        staged = Path(temporary)
        collect_snapshot(staged)
        expected = artifact_files(staged)
        actual = artifact_files(arguments.output)

        if arguments.mode == "check":
            differences = [name for name in sorted(expected.keys() | actual.keys())
                           if expected.get(name) != actual.get(name)]
            if differences:
                fail("Calendar artifact drift (missing, changed, or unexpected):\n" + "\n".join(differences))
            print("All committed calendar and notice bytes match offline regeneration")
            return

        for name in actual.keys() - expected.keys():
            (arguments.output / name).unlink()
        for name, data in expected.items():
            destination = arguments.output / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)


if __name__ == "__main__":
    main()
