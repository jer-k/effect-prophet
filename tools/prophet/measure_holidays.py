#!/usr/bin/env python3
"""Generate and measure an exploratory country-calendar snapshot and coverage census.

Run in the pinned reference container, not as part of compatibility-fixture generation.
Outputs are research artifacts, not a published calendar format or coverage guarantee.
"""

from __future__ import annotations

import argparse
import gzip
import json
import platform
import statistics
from collections import Counter
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

from generate import (
    LOCK_PATH,
    fail,
    sha256_file,
    stable_json,
)

FIRST_YEAR = 1995
LAST_YEAR = 2044
EPOCH = date(1970, 1, 1)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--first-year", type=int, default=FIRST_YEAR)
    parser.add_argument("--last-year", type=int, default=LAST_YEAR)
    parser.add_argument("--future-from", type=int, default=2026)
    arguments = parser.parse_args()
    output = arguments.output
    first_year = arguments.first_year
    last_year = arguments.last_year
    future_from = arguments.future_from

    if not 1 <= first_year <= future_from <= last_year <= 9998:
        fail("Require 1 <= first-year <= future-from <= last-year <= 9998")

    reference, environment = calendar_environment()

    if output.exists() and any(output.iterdir()):
        fail(f"Output directory must be empty: {output}")

    output.mkdir(parents=True, exist_ok=True)
    (output / "countries").mkdir()
    (output / "third-party").mkdir()

    # Match Prophet's R generator's code inventory, including the legacy Turkey alias.
    canonical_codes = country_codes()
    codes = sorted(canonical_codes)
    aliases = {code: canonical for code, canonical in canonical_codes.items() if code != canonical}
    calendars: dict[str, list[dict[str, str]]] = {}
    warning_counts: Counter[tuple[str, str]] = Counter()
    warning_countries: dict[tuple[str, str], set[str]] = {}
    years = list(range(first_year, last_year + 1))

    # Evaluate aliases through the real Prophet helper too; only deduplicate after comparison.
    for code in codes:
        events, diagnostics = collect_calendar(code, years)

        for warning in diagnostics:
            key = (warning["category"], warning["message"])
            warning_counts[key] += 1
            warning_countries.setdefault(key, set()).add(canonical_codes[code])

        canonical = canonical_codes[code]

        if canonical in calendars:
            if calendars[canonical] != events:
                fail(f"Alias {code} differs from canonical calendar {canonical}")
        else:
            calendars[canonical] = events

    # A nonempty year is evidence of generated dates, not of a complete official calendar.
    # Probe warnings one year at a time so bulk-generation warnings have a usable year scope.
    coverage_countries = {}
    missing_recurring_names = []
    future_years = list(range(future_from, last_year + 1))

    for code, events in sorted(calendars.items()):
        counts = Counter(int(event["date"][:4]) for event in events)
        name_years: dict[str, set[int]] = {}
        yearly_warnings = []
        provider_class = get_country_holidays_class(code)

        for event in events:
            name_years.setdefault(event["name"], set()).add(int(event["date"][:4]))

        for year in years:
            _, diagnostics = collect_calendar(code, [year])

            if diagnostics:
                yearly_warnings.append({"year": year, "messages": sorted({warning["message"] for warning in diagnostics})})

        # Investigative flags only: recurring names that disappear at known table horizons.
        # A flag can also reflect a legitimate law/name change; source review is still required.
        for cutoff in (2035, 2050):
            if not first_year <= cutoff < last_year:
                continue

            disappeared = sorted(
                name for name, present in name_years.items()
                if len(present & set(range(max(first_year, cutoff - 9), cutoff + 1))) >= 3
                and not any(year > cutoff for year in present)
            )

            if disappeared:
                missing_recurring_names.append({
                    "country": code,
                    "afterYear": cutoff,
                    "names": [{"name": name, "lastObservedYear": max(name_years[name])} for name in disappeared],
                })

        coverage_countries[code] = {
            "providerStartYear": provider_class.start_year,
            "providerEndYear": provider_class.end_year,
            "occurrencesByYear": {str(year): counts[year] for year in years},
            "emptyYears": [year for year in years if counts[year] == 0],
            "emptyFutureYears": [year for year in future_years if counts[year] == 0],
            "yearlyWarnings": yearly_warnings,
        }

    coverage_summary = {
        "futureFrom": future_from,
        "lastYear": last_year,
        "countriesWithDatesEveryFutureYear": sum(not country["emptyFutureYears"] for country in coverage_countries.values()),
        "countriesWithEmptyFutureYears": [code for code, country in coverage_countries.items() if country["emptyFutureYears"]],
        "countriesWithYearlyWarnings": [code for code, country in coverage_countries.items() if country["yearlyWarnings"]],
        "countriesWithMissingRecurringNameFlags": sorted({flag["country"] for flag in missing_recurring_names}),
        "completeOfficialCoverageVerified": False,
    }
    coverage = {"summary": coverage_summary, "countries": coverage_countries,
                "missingRecurringNameFlags": missing_recurring_names,
                "interpretation": "Nonempty years and absent warnings do not prove complete or officially confirmed coverage. Name-loss flags require source review."}
    (output / "coverage.json").write_bytes(stable_json(coverage))

    compact_calendars = {}
    country_metrics = []
    measurements = {}

    def write_measured(filename: str, data: bytes) -> dict[str, int | str]:
        path = output / filename
        path.write_bytes(data)
        compressed = gzip.compress(data, compresslevel=9, mtime=0)
        path.with_suffix(path.suffix + ".gz").write_bytes(compressed)

        if gzip.decompress(compressed) != data:
            fail(f"Compression round trip failed: {filename}")

        return {"bytes": len(data), "gzipBytes": len(compressed), "sha256": sha256_file(path)}

    for code, events in sorted(calendars.items()):
        names = sorted({event["name"] for event in events})
        indexes = {name: index for index, name in enumerate(names)}
        occurrences = [
            [(date.fromisoformat(event["date"]) - EPOCH).days, indexes[event["name"]]]
            for event in events
        ]
        encoded = {"names": names, "occurrences": occurrences}
        compact_calendars[code] = encoded
        data = compact_json(encoded)
        decoded = json.loads(data)
        restored = [
            {"date": (EPOCH + timedelta(days=day)).isoformat(), "name": decoded["names"][index]}
            for day, index in decoded["occurrences"]
        ]

        if restored != events:
            fail(f"Compact calendar round trip failed: {code}")

        country_metrics.append({
            "country": code,
            "occurrences": len(events),
            "names": len(names),
            **write_measured(f"countries/{code}.json", data),
        })

    metadata = {"aliases": aliases, "firstYear": first_year, "lastYear": last_year}
    measurements["events.json"] = write_measured(
        "events.json", compact_json({**metadata, "countries": calendars}),
    )
    measurements["compact.json"] = write_measured(
        "compact.json", compact_json({**metadata, "epoch": EPOCH.isoformat(),
                                      "occurrenceFields": ["epochDay", "nameIndex"],
                                      "countries": compact_calendars}),
    )
    measurements["all-codes.events.json"] = write_measured(
        "all-codes.events.json", compact_json({
            "firstYear": first_year,
            "lastYear": last_year,
            "countries": {code: calendars[canonical_codes[code]] for code in codes},
        }),
    )

    write_calendar_notices(
        output / "third-party",
        purpose="This is an exploratory generated snapshot, not a guarantee of official future dates.",
    )

    events = [event for calendar in calendars.values() for event in calendar]
    partition_sizes = [country["bytes"] for country in country_metrics]
    partition_gzip_sizes = [country["gzipBytes"] for country in country_metrics]
    manifest = {
        "schemaVersion": 2,
        "purpose": "Exploratory size measurement; not a published calendar schema",
        "reference": reference,
        "environment": {**environment, "pythonVersion": platform.python_version()},
        "dependencyLockSha256": sha256_file(LOCK_PATH),
        "generatorSha256": sha256_file(Path(__file__)),
        "sharedGeneratorSha256": sha256_file(Path(__file__).with_name("generate.py")),
        "collectionSha256": sha256_file(Path(__file__).with_name("calendar_collection.py")),
        "optimizerHelperSha256": sha256_file(Path(__file__).with_name("linear_optimizer_evidence.py")),
        "generation": {"firstYear": first_year, "lastYear": last_year, "language": "en_US",
                       "expand": False, "subdivision": None, "categories": "provider default",
                       "observed": "provider default (True)", "unicode": "preserved",
                       "dateFiltering": "none; preserve cross-year observed dates from Prophet"},
        "counts": {"countryCodes": len(codes), "canonicalCountries": len(calendars),
                   "aliases": len(aliases), "occurrences": len(events),
                   "allCodeOccurrences": sum(len(calendars[canonical_codes[code]]) for code in codes),
                   "uniqueNames": len({event["name"] for event in events}),
                   "countryNamePairs": sum(country["names"] for country in country_metrics)},
        "actualDateRange": {"first": min(event["date"] for event in events),
                            "last": max(event["date"] for event in events)},
        "emptyCountries": [country["country"] for country in country_metrics if country["occurrences"] == 0],
        "measurements": measurements,
        "coverage": {**coverage_summary, "file": "coverage.json", "sha256": sha256_file(output / "coverage.json")},
        "partitionedCompact": {
            "bytes": sum(partition_sizes), "gzipBytes": sum(partition_gzip_sizes),
            "minimumBytes": min(partition_sizes), "medianBytes": statistics.median(partition_sizes),
            "maximumBytes": max(partition_sizes), "medianGzipBytes": statistics.median(partition_gzip_sizes),
            "largestCountries": sorted(country_metrics, key=lambda country: (-country["bytes"], country["country"]))[:10],
        },
        "countries": country_metrics,
        "warnings": [{"category": category, "message": message, "count": count,
                      "countries": sorted(warning_countries[(category, message)])}
                     for (category, message), count in sorted(warning_counts.items())],
        "checks": {"aliasCalendarsEqual": True, "compactRoundTripsEqual": True,
                   "gzipRoundTripsEqual": True},
        "thirdPartyFiles": {path.name: sha256_file(path) for path in sorted((output / "third-party").iterdir())},
    }
    (output / "manifest.json").write_bytes(stable_json(manifest))
    print(stable_json({key: manifest[key] for key in (
        "counts", "actualDateRange", "emptyCountries", "measurements", "partitionedCompact", "warnings", "coverage",
    )}).decode("utf-8"))


if __name__ == "__main__":
    main()
