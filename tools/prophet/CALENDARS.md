# Production country-calendar artifacts

This implements offline country calendars and the model lifecycle for #69. `parseCountryHolidays` and
`inspectCountryHolidays` are public; the latter loads an allowlisted packaged file, verifies its
hash, decodes its complete snapshot, checks requested-year coverage, and returns exact occurrences
plus retained issues. Data/notices are included in the npm publication allowlist, and a real packed
artifact is exercised in a fresh process by `tools/test-package.ts`.

`countryHolidays` is parsed without I/O and resolved from represented training years during fitting.
The existing event machinery handles merges, modes and numerical features for all three trends.
Models retain custom-event provenance plus the complete selected-country snapshot. Point prediction,
uncertainty and JSON restoration use embedded partitions with frozen training columns; folds resolve
their own years and search/holdout preserve selection/policy. New pinned Prophet fixtures cover
feature identity, observed days, estimated names and representative fitted forecasts.

Correctness-gated native benchmark harness integration and retained release evidence remain delivery
gates; passing unit/compatibility tests does not establish performance or complete future coverage.

## Generate and check

```sh
npm run calendars:generate
npm run calendars:check
npm run calendars:verify
```

Generation/checking uses the same image, pinned `linux/amd64` platform, Prophet **1.4.0**, and
lockfile-pinned `holidays` **0.104** as compatibility fixtures. The container is read-only, has
no network, and stages artifacts in its temporary filesystem. Only generation mounts
`calendars/`, `third-party/calendars/`, and the derived
`src/internal/country-holiday-catalog.ts` allowlist read-write. Image builds may download pinned dependencies.
Do not use an emulated reference run as native performance evidence.

Check mode regenerates everything into a temporary directory and compares every committed artifact
and notice byte, reporting missing, changed, and unexpected files. Generation uses Python hash
seed 0; checking uses seed 1. `calendars:verify` requires neither Docker nor Python: it verifies
hashes, provenance, aliases, indexes, the complete file inventory, and every generated occurrence
through the existing TypeScript event/date/name parser. Both generation and checking finish with
this verification. Ordinary `npm test` includes those artifact tests too.

`calendar_collection.py` owns shared calendar lookup, exact name/date collection, pinned environment
checks, compact JSON encoding, and license copying. The exploratory `measure_holidays.py` reuses
that implementation but retains its separate diagnostic/measurement outputs under `.generated/`.
The shared calendar helper consumes `generate.py`'s environment, stable JSON and hash helpers.
The compatibility generator additionally calls `country_holiday_fixtures.py` and
`global_prior_scale_fixtures.py` and hashes both helpers in fixture provenance. Calendar regeneration incorporates shared-generator changes into snapshot
identity, even when occurrence bytes are unchanged.

## Schema version 1

The outer **request-year** horizon is **1995–2060 inclusive**, not a completeness certificate.

- `calendars/manifest.json`: canonical inventory, registered aliases (including `UK` and `TU`),
  source/provider/environment identity, executable generator and input hashes, counts, file hashes,
  warnings, coverage review scope, and the oracle query sets.
- `calendars/countries/XX.json`: one canonical country, schema/horizon, exact Unicode name
  dictionary, 66 generation-year partitions, provider-declared bounds, and that country's reviewed
  coverage issues. Empty countries still have 66 empty partitions.
- `calendars/coverage.json`: the complete versioned, authored coverage inventory.
- `src/internal/country-holiday-catalog.ts`: a generated immutable allowlist of canonical files,
  aliases, file hashes/byte counts and snapshot identity. It provides syntax parsing and safe
  filesystem lookup without reading a manifest at import time.
- `third-party/calendars/`: the pinned provider's MIT `LICENSE` and full `CONTRIBUTORS` record,
  Prophet's MIT license, and a generated notice. No alternative encodings, gzip copies, research
  logs, or raw source dumps are production artifacts.

A country partition is `years[requestedYear - firstYear]`. Each entry is `[epochDay, nameIndex]`;
`epochDay` is an integer UTC day since 1970-01-01 and `nameIndex` indexes that country's dictionary.
Names and entries follow Python's code-point ordering. Resolve a multi-year query by unioning exact
`(epochDay, nameIndex)` pairs from its partitions, not by filtering a flattened snapshot using the
Gregorian year of the date. Do not strip observed/estimated suffixes or merge simultaneous names.

The generator verifies every single-year partition's encoding round trip, then checks its union
against **the installed Prophet helper** for every adjacent-year pair, the original 1995–2044
range, all 66 years, odd/even-year sparse selections, the two endpoints, and five deterministic
irregular selections. Aliases are also checked through the real helper for the full horizon and
a sparse selection spanning important coverage cutoffs. The query inventory is retained in the
manifest. This is extensive parity evidence, not an exhaustive test of all `2^66` year subsets.

In the pinned country-level defaults, the collected partitions contain **220,692 distinct
occurrences and 220,692 memberships**; none has a different Gregorian year from its requested
partition. This observation does not define the encoding. In particular, the US provider places
2022 New Year's observed date (2021-12-31) in the **2021 request**, not the 2022 request. The
regression test retains that actual helper behavior instead of inferring membership from the
holiday's base date. Future provider updates must repeat partition-union verification; if union
semantics no longer hold, change the encoding/schema rather than silently accepting divergence.

### Snapshot identity

`snapshotId` is `sha256:` followed by SHA-256 of the UTF-8 bytes
`effect-prophet.country-holidays.v1`, a NUL byte, and `generate.stable_json(manifest)` **before**
adding `snapshotId`. The file inventory excludes the manifest itself to avoid a circular hash,
but covers every country, coverage inventory, and notice. The snapshot identity additionally
covers provider/reference identities, environment, generator sources, generator inputs, query
sets, aliases and diagnostics. Generator identities cover all imported executable project helpers,
including `linear_optimizer_evidence.py`, imported transitively by `generate.py`.

The derived TypeScript catalog is emitted after the manifest, so its hash is not part of the
snapshot-ID calculation (which would otherwise be circular). Regeneration/checking compares its
complete bytes too; TypeScript verification additionally checks its contents against the manifest.
The generated source is exempt from reformatting, like the generated JSON.

Runtime snapshot decoding rejects unsupported versions, malformed names/days/indexes, duplicate
or unordered dictionary/partition entries, missing partitions and inconsistent coverage metadata.
The loader checks byte count and SHA-256 against the compiled allowlist, reads once per operation,
and has no mutable cache. It never constructs filesystem paths from raw user strings.

Public inspection/resolution operations have named Effect spans, and the filesystem boundary
includes reading, integrity checks, decoding/copying and expected-failure translation. Attributes
are bounded source/policy enums and counts, not country/holiday names, dates, payloads or errors.
Tests use real files and native in-memory spans to assert parentage, completion, safe attributes
and interval containment, plus validation paths without misleading loader spans.

Optional version-one `countryHolidays` state is supported in every fitted/portable model kind.
Its schema checks embedded country/provider/version identity, training coverage evidence and exact
custom/generated training event alignment. Legacy models without that state are unchanged.
Serialization performs no dataset lookup. The packed-artifact test saves a fitted calendar model,
deletes its bundled country file and restores matching point/seeded uncertainty forecasts in a
second fresh process.

## Coverage review and policy contract

`tools/prophet/calendar-restrictions.json` is **authored source-reviewed policy**, not an output of
the exploratory occurrence-count/name-loss census. Every issue retains:

- canonical country and inclusive applicable request-year interval;
- bounded reason and `restriction`/`advisory` disposition;
- affected rule/name description (not a replacement feature identity);
- a pinned `v0.104` source URL, source symbol and exact installed-wheel source SHA-256.

Generation verifies every evidence hash against the installed distribution. It also requires an
explicit inventory restriction for every declared provider bound intersecting the snapshot.
A provider update or new bound fails generation until the inventory is reviewed.

The inventory covers all **41** provider start dates after 1995, Sri Lanka's 2026 end date,
India's pre-2001 and post-2035 Hindu gaps, the other known Hindu consumers, Nepal's 2032/2033/2035
limits, Indonesia's Nyepi cutoff after 2050, and Ukraine's default-category martial-law policy
(partial in 2022, empty from 2023). Historical Hindu gaps in Guyana, Mauritius and Suriname are
also retained. Provider bounds describe implementation/source coverage, not when a country or
its legal holidays began to exist.

`provider-year-bound`, `missing-rule-table`, and `provider-category-policy` issues are restrictions.
Future `reject-known-gaps` selection must reject requested years intersecting a restriction;
`allow-known-gaps` must retain and expose the issues while returning only actual provider data.
Neither policy may extend the outer snapshot range.

Deliberately empty `BV`, `HM`, and `IO` calendars are advisory, not inferred missing-table gaps.
Estimated Turkey/Singapore dates, Singapore's historical accuracy note, and China/Thailand annual
announcement requirements are separate advisory examples. An estimated-name transition is not a
missing date. Estimated names remain exact, distinct feature identities.

**This is a targeted source review, not an exhaustive legal, subdivision, date-table, or official
accuracy audit.** No issues, no warnings, and nonempty years do not establish completeness. The
manifest explicitly records `completeOfficialCoverageVerified: false`. Other providers also use
estimates and rule projections; these examples are not a universal estimate census.

## Provider updates

1. Update the pinned reference environment deliberately; do not change only data or strip names.
2. Review source bounds, finite rule tables, categories, observed behavior and estimate transitions.
   Update inventory intervals, descriptions, source identities and inventory version as necessary.
3. Regenerate and inspect changed date/name pairs and partition semantics, including historical
   changes and empty calendars. Change the schema if its semantics no longer reproduce Prophet.
4. Run regeneration, TypeScript artifact verification and (once implemented) fixtures, tracing,
   persistence, package/notice checks and native correctness-gated benchmark suites.
5. Publish a new snapshot identity. Restored models must continue using their embedded selected
   country snapshot; snapshot updates require explicit refitting, never silent replacement.
