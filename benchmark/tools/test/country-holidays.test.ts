import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Cause, Effect, Exit, Option, Schema } from "effect";
import { fit, inspectCountryHolidays, predict, prophetFittingBackendLayer } from "effect-prophet";
import { describe, expect, it } from "vitest";

import { countryDescriptionsFor } from "../../../site/.vitepress/benchmarks/country-cases.ts";
import { requireEndedSpan } from "../../../test/internal/tracing-test-helpers.ts";
import { countryHolidayDatasets } from "../generate-data.ts";
import { loadCaseCatalog, suiteForCase } from "../catalog.ts";
import { parseBenchmarkCases, parseBenchmarkDataset } from "../case.ts";
import { projectCountryHolidays } from "../country-holidays.ts";
import { effectOptionsForCase } from "../effect-case.ts";
import { maximumWorkerProtocolBytes, parseImplementationResult } from "../result.ts";
import { makeRecordingTracer } from "./tracing.ts";

const prepare = async (id: string) => {
  const benchmarkCase = (await Effect.runPromise(loadCaseCatalog())).find((item) => item.id === id);

  const input = countryHolidayDatasets.find(
    (item) => `v5/${item.id}.json` === benchmarkCase?.dataset,
  );

  if (benchmarkCase === undefined || input === undefined)
    throw new Error("Missing authored country case/dataset");

  const dataset = await Effect.runPromise(parseBenchmarkDataset(input));
  const options = effectOptionsForCase(benchmarkCase);

  const model = await Effect.runPromise(
    fit(dataset.observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

  const forecasts = await Effect.runPromise(predict(model, dataset.predictionRows));

  return { benchmarkCase, dataset, model, forecasts };
};

describe("country benchmark contract", () => {
  it("pins identities, keeps all trends/modes, and uses exactly equivalent explicit controls", async () => {
    const catalog = await Effect.runPromise(loadCaseCatalog());
    const countries = catalog.filter((item) => item.id.startsWith("country-"));

    expect(countries).toHaveLength(33);

    for (const item of countries) {
      const description = countryDescriptionsFor(suiteForCase(item))[item.id];

      expect(description?.title).toBeTruthy();
      expect(description?.summary).toBeTruthy();
    }

    for (const growth of ["linear", "flat", "logistic"]) {
      for (const mode of ["additive", "multiplicative"]) {
        const country = countries.find((item) => item.id === `country-us-${growth}-${mode}`);

        const explicit = countries.find(
          (item) => item.id === `country-explicit-us-${growth}-${mode}`,
        );

        if (country?.workload.kind !== "map" || explicit?.workload.kind !== "map")
          throw new Error("Missing authored paired case");

        expect(explicit.correctnessTolerances).toEqual(country.correctnessTolerances);
        expect(explicit.dataset).toBe(country.dataset);
        expect(explicit.workload.configuration.holidaysMode).toBe(mode);
        expect(explicit.workload.configuration.countryHolidays).toBeUndefined();
        expect(country.calendarSnapshot).toMatchObject({ prophet: "1.4.0", holidays: "0.104" });
        expect(effectOptionsForCase(country)?.countryHolidays).toEqual({
          country: "US",
          coverage: "reject-known-gaps",
          priorScale: 10,
        });
      }
    }

    for (const [country, suffix] of [
      ["se", "730"],
      ["cn", "730"],
      ["se", "2190"],
      ["cn", "2190"],
      ["se", "2190-batch-32"],
    ] as const) {
      const scaled = countries.find((item) => item.id === `country-${country}-flat-${suffix}`);
      const none = countries.find((item) => item.id === `country-none-flat-${suffix}`);

      const explicit = countries.find(
        (item) => item.id === `country-explicit-${country}-flat-${suffix}`,
      );

      if (
        scaled?.workload.kind !== "map" ||
        none?.workload.kind !== "map" ||
        explicit?.workload.kind !== "map"
      )
        throw new Error("Missing scaling control case");

      for (const control of [none, explicit]) {
        expect(control.dataset).toBe(scaled.dataset);
        expect(control.phases).toEqual(scaled.phases);
      }

      expect(none.workload.configuration.countryHolidays).toBeUndefined();
      expect(none.workload.configuration.events).toEqual([]);
      expect(explicit.workload.configuration.countryHolidays).toBeUndefined();
      expect(explicit.workload.configuration.events.length).toBeGreaterThan(0);
    }

    const boundary = countries.find((item) => item.id === "country-boundary-flat");
    expect(boundary?.dataset).toBe("v5/country-boundary-96.json");
    expect(
      countryHolidayDatasets
        .find((item) => item.id === "country-boundary-96")
        ?.predictionRows.at(-1)?.timestamp,
    ).toBe("2060-01-01T00:00:00.000Z");
  });

  it("parses registered aliases and rejects unpinned or invalid selections before calendar loading", async () => {
    const { benchmarkCase } = await prepare("country-us-flat-additive");

    if (benchmarkCase.workload.kind !== "map") throw new Error("Expected authored MAP case");

    const workload = benchmarkCase.workload;

    const selected = (country: string) => ({
      ...benchmarkCase,
      workload: {
        ...workload,
        configuration: {
          ...workload.configuration,
          countryHolidays: { country, coverage: "reject-known-gaps", priorScale: 10 },
        },
      },
    });

    const alias = await Effect.runPromise(parseBenchmarkCases([selected("USA")]));
    expect(effectOptionsForCase(alias[0]!)?.countryHolidays?.country).toBe("US");

    const { spans, tracer } = makeRecordingTracer();

    const invalid = await Effect.runPromise(
      parseBenchmarkCases([selected("us")]).pipe(Effect.flip, Effect.withTracer(tracer)),
    );

    expect(invalid.message).toContain("registered");
    expect(spans.some((span) => span.name === "effect-prophet.calendar.load-snapshot")).toBe(false);

    const { calendarSnapshot: _snapshot, ...unpinned } = selected("US");
    expect(
      await Effect.runPromise(parseBenchmarkCases([unpinned]).pipe(Effect.flip)),
    ).toMatchObject({ message: expect.stringContaining("pin snapshot") });
  });

  it("checks observed spillovers, future names and actual grouped effects through public fit/predict", async () => {
    const { benchmarkCase, dataset, model, forecasts } = await prepare("country-boundary-flat");

    const projection = await Effect.runPromise(
      projectCountryHolidays(benchmarkCase, dataset, model, forecasts),
    );

    expect(projection?.trainingYears).toEqual([2010]);
    expect(projection?.ignoredPredictionNames).toContain("Juneteenth National Independence Day");
    expect(projection?.ignoredPredictionNames).toContain(
      "Juneteenth National Independence Day (observed)",
    );

    const observed = projection?.columns.findIndex(
      (column) => column.name === "New Year's Day (observed)",
    );

    if (observed === undefined || observed < 0 || projection === undefined)
      throw new Error("Missing trained observed column");

    expect(projection.predictionActivations[2 * projection.columns.length + observed]).toBe(1);
    expect(
      projection.predictionActivations.at(
        -projection.columns.length +
          projection.columns.findIndex((column) => column.name === "New Year's Day"),
      ),
    ).toBe(1);

    const corrupted = forecasts.map((forecast) => ({
      ...forecast,
      events: forecast.events.map((component) =>
        component.mode === "additive" ? { ...component, value: component.value + 1 } : component,
      ),
    }));

    expect(
      await Effect.runPromise(
        projectCountryHolidays(benchmarkCase, dataset, model, corrupted).pipe(Effect.flip),
      ),
    ).toMatchObject({ message: expect.stringContaining("dynamic year activations") });
  });

  it("retains estimated suffix transitions and empty selected calendars", async () => {
    for (const id of ["country-estimated-sg-flat", "country-empty-bv-flat"]) {
      const { benchmarkCase, dataset, model, forecasts } = await prepare(id);

      const projection = await Effect.runPromise(
        projectCountryHolidays(benchmarkCase, dataset, model, forecasts),
      );

      if (id === "country-estimated-sg-flat") {
        expect(projection?.ignoredPredictionNames).toContain("Chinese New Year (estimated)");
        expect(
          projection?.columns.some((column) => column.name === "Chinese New Year (estimated)"),
        ).toBe(false);
      } else {
        expect(projection?.country).toBe("BV");
        expect(projection?.columns).toEqual([]);
        expect(projection?.trainingActivations).toEqual([]);
        expect(projection?.predictionActivations).toEqual([]);
      }
    }
  });

  it("traces complete benchmark evidence success/failure without leaking payloads or emitting preflight load spans", async () => {
    const { benchmarkCase, dataset, model, forecasts } = await prepare("country-us-flat-additive");

    for (const snapshotId of [
      benchmarkCase.calendarSnapshot?.snapshotId,
      `sha256:${"a".repeat(64)}`,
    ]) {
      const { spans, tracer } = makeRecordingTracer();

      const candidate = {
        ...benchmarkCase,
        calendarSnapshot: { snapshotId: snapshotId ?? "", prophet: "1.4.0", holidays: "0.104" },
      } as const;

      const exit = await Effect.runPromiseExit(
        projectCountryHolidays(candidate, dataset, model, forecasts).pipe(
          Effect.withSpan("benchmark.country.job"),
          Effect.withTracer(tracer),
        ),
      );

      const operation = spans.find((span) => span.name === "benchmark.calendar.project");
      const root = spans.find((span) => span.name === "benchmark.country.job");

      if (operation === undefined || root === undefined) throw new Error("Missing operation spans");

      const status = requireEndedSpan(operation);
      const parentStatus = requireEndedSpan(root);
      expect(operation.traceId).toBe(root.traceId);
      expect(Option.getOrUndefined(operation.parent)?.spanId).toBe(root.spanId);
      expect(status.startTime >= parentStatus.startTime).toBe(true);
      expect(status.endTime <= parentStatus.endTime).toBe(true);
      expect(operation.attributes.size).toBe(0);
      expect(Exit.isSuccess(status.exit)).toBe(Exit.isSuccess(exit));

      if (Exit.isFailure(status.exit) && Exit.isFailure(exit)) {
        expect(Option.getOrUndefined(Cause.findErrorOption(status.exit.cause))).toBe(
          Option.getOrUndefined(Cause.findErrorOption(exit.cause)),
        );
        expect(spans.some((span) => span.name === "effect-prophet.calendar.load-snapshot")).toBe(
          false,
        );
      } else {
        expect(
          spans.filter((span) => span.name === "effect-prophet.calendar.load-snapshot"),
        ).toHaveLength(2);
      }
    }
  });

  it("awaits real calendar I/O and collects name-rich records through the actual worker protocol", async () => {
    const root = await mkdtemp(resolve(tmpdir(), "prophet-country-worker-"));

    try {
      const item = (await Effect.runPromise(loadCaseCatalog())).find(
        (candidate) => candidate.id === "country-cn-flat-730",
      );

      if (item === undefined) throw new Error("Missing name-rich workload");

      const casesPath = resolve(root, "cases.json");
      const outputPath = resolve(root, "result.json");

      await writeFile(casesPath, JSON.stringify([{ ...item, independentRuns: 1 }]));

      const worker = spawnSync(
        process.execPath,
        [fileURLToPath(new URL("../adapters/effect-prophet.ts", import.meta.url))],
        {
          encoding: "utf8",
          maxBuffer: maximumWorkerProtocolBytes,
          env: {
            ...process.env,
            BENCHMARK_CASES_PATH: casesPath,
            BENCHMARK_OUTPUT_PATH: outputPath,
            BENCHMARK_STAGE: "correctness",
            BENCHMARK_CASE_IDS: item.id,
          },
        },
      );

      expect(worker.status, worker.stderr).toBe(0);

      const input: unknown = JSON.parse(await readFile(outputPath, "utf8"));
      const result = await Effect.runPromise(parseImplementationResult(input));

      expect(result.failures).toEqual([]);
      expect(result.correctness).toHaveLength(1);
      expect(result.correctness[0]?.countryHolidays?.country).toBe("CN");
      expect(result.correctness[0]?.forecasts).toHaveLength(512);
      expect(Buffer.byteLength(JSON.stringify(result.correctness), "utf8")).toBeGreaterThan(
        1_048_576,
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("declares provider-policy differences separately from comparable timing work", async () => {
    const PolicySchema = Schema.Array(
      Schema.Struct({
        country: Schema.String,
        year: Schema.Int,
        effectReason: Schema.Literals(["known-coverage-restriction", "outside-snapshot-horizon"]),
        pythonBehavior: Schema.Literal("returns-provider-result"),
        comparison: Schema.Literal("intentional-difference"),
        note: Schema.String,
      }),
    );

    const input: unknown = JSON.parse(
      await readFile(new URL("../../cases/holidays/coverage-policy.json", import.meta.url), "utf8"),
    );

    const policies = Schema.decodeUnknownSync(PolicySchema)(input);

    for (const policy of policies) {
      const error = await Effect.runPromise(
        inspectCountryHolidays({ country: policy.country }, [policy.year]).pipe(Effect.flip),
      );

      expect(error.reason).toBe(policy.effectReason);
    }

    const partial = await Effect.runPromise(
      inspectCountryHolidays({ country: "IN", coverage: "allow-known-gaps" }, [2036]),
    );

    expect(partial.issues.some((issue) => issue.disposition === "restriction")).toBe(true);
    expect(partial.occurrences.length).toBeGreaterThan(0);
  });
});
