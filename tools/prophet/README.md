# Prophet reference tooling

[`reference.json`](reference.json) is the machine-readable identity for compatibility fixtures.
The human-facing capability contract is
[`docs/compatibility/prophet-1.4.0.md`](../../docs/compatibility/prophet-1.4.0.md).

## Verify the source reference

In an independent Prophet clone or the read-only `@prophet` reference checkout, resolve the tag
without checking it out or reading files from the current working tree:

```sh
git rev-parse 'refs/tags/v1.4.0^{commit}'
```

The command must print:

```text
abf69a215604afcaa7ecb4359f592d13bf6dea9f
```

Inspect baseline files explicitly at the tag, for example:

```sh
git show 'v1.4.0:python/prophet/forecaster.py'
git show 'v1.4.0:python/stan/prophet.stan'
```

Do not use checkout `HEAD` as the fixture source. The configured reference currently reports
`v1.4.0-patched-1-g79ef5ec`; its post-release patches are outside this baseline. Do not switch or
modify the read-only reference checkout.

Fixture execution and the Python/backend dependency lock belong to EP-014. That tooling must read
`reference.json`, require the installed distribution version to equal `1.4.0`, and record this
source commit with generated fixtures. This ticket intentionally adds no Python runtime dependency
or fixture-generation command to the TypeScript package.
