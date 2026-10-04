import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

import { Effect } from "effect";

import { BenchmarkArtifactError, parseArtifactId } from "./artifacts.ts";
import type { BenchmarkDataset } from "./case.ts";

const dayMilliseconds = 86_400_000;

const origin = Date.UTC(2020, 0, 1);

const timestampAt = (index: number, irregular = false): string => {
  const skippedIntervals = irregular ? Math.floor(index / 7) + Math.floor(index / 19) : 0;

  return new Date(origin + (index + skippedIntervals) * dayMilliseconds).toISOString();
};

const canonical = (value: number): number => Number(value.toPrecision(12));

const deterministicNoise = (index: number): number =>
  0.08 * Math.sin(index * 1.731) + 0.035 * Math.cos(index * 0.417);

const piecewiseTrend = (index: number, observationCount: number): number => {
  const firstBreak = Math.floor(observationCount * 0.38);
  const secondBreak = Math.floor(observationCount * 0.7);

  return (
    12 +
    index * 0.42 +
    Math.max(0, index - firstBreak) * -0.22 +
    Math.max(0, index - secondBreak) * 0.31
  );
};

type Covariates = {
  readonly capacity?: number;
  readonly floor?: number;
  readonly regressors?: Readonly<Record<string, number>>;
  readonly conditions?: Readonly<Record<string, boolean>>;
};

type DatasetRecipe = {
  readonly id: string;
  readonly observationCount: number;
  readonly predictionCount: number;
  readonly recipe: string;
  readonly irregular?: boolean;
  readonly noiseMultiplier?: number;
  readonly trend?: (index: number, observationCount: number) => number;
  readonly trainingTimestamp?: (index: number) => string;
  readonly covariates: (index: number) => Covariates;
  readonly additive: (index: number, covariates: Covariates) => number;
};

const makeDataset = (recipe: DatasetRecipe): BenchmarkDataset => {
  const observations = Array.from({ length: recipe.observationCount }, (_, index) => {
    const covariates = recipe.covariates(index);

    const value = canonical(
      (recipe.trend ?? piecewiseTrend)(index, recipe.observationCount) +
        recipe.additive(index, covariates) +
        (recipe.noiseMultiplier ?? 1) * deterministicNoise(index),
    );

    return {
      timestamp: recipe.trainingTimestamp?.(index) ?? timestampAt(index, recipe.irregular),
      value,
      ...covariates,
    };
  });

  const predictionRows = Array.from({ length: recipe.predictionCount }, (_, offset) => {
    const index = recipe.observationCount + offset;

    return {
      timestamp: timestampAt(index, recipe.irregular),
      ...recipe.covariates(index),
    };
  });

  return {
    id: recipe.id,
    recipe: recipe.recipe,
    observations,
    predictionRows,
  };
};

const noCovariates = (): Covariates => ({});

const weekly = (index: number): number => 1.4 * Math.sin((2 * Math.PI * index) / 7);

const eventActive = (
  index: number,
  occurrenceIndexes: ReadonlyArray<number>,
  lowerWindowDays: number,
  upperWindowDays: number,
): boolean =>
  occurrenceIndexes.some(
    (occurrence) => index >= occurrence + lowerWindowDays && index <= occurrence + upperWindowDays,
  );

interface GeneratedRegressorValues {
  readonly [name: string]: number;
  readonly "binary-auto": number;
  readonly "numeric-auto": number;
  readonly "numeric-always": number;
  readonly "numeric-never": number;
}

const regressorValues = (index: number): GeneratedRegressorValues => ({
  "binary-auto": index % 9 < 3 ? 1 : 0,
  "numeric-auto": canonical(Math.sin(index / 5) + 0.3 * Math.cos(index / 17)),
  "numeric-always": canonical(2 + Math.cos(index / 11) + (index % 4) * 0.1),
  "numeric-never": canonical((index % 13) / 6 - 1),
});

const regressorContribution = (regressors: Readonly<Record<string, number>>): number =>
  1.8 * (regressors["binary-auto"] ?? 0) +
  0.12 * (regressors["numeric-auto"] ?? 0) -
  0.9 * (regressors["numeric-always"] ?? 0) +
  0.65 * (regressors["numeric-never"] ?? 0);

const eventWorkloadIndexes = {
  release: [20, 50, 106],
  campaign: [21, 63, 113],
} as const;

const automaticMixedEventIndexes = {
  release: [100, 300, 800],
  campaign: [101, 500, 820],
} as const;

const datasets: ReadonlyArray<BenchmarkDataset> = [
  ...(["ordered", "unsorted", "duplicates", "duplicate-features"] as const).map((variant) => {
    const duplicates = variant === "duplicates" || variant === "duplicate-features";
    const timeIndex = (index: number) => (duplicates ? Math.floor(index / 4) : index);

    const dataset = makeDataset({
      id: `training-${variant}`,
      observationCount: 96,
      predictionCount: 8,
      recipe: `training-${variant}-v1:n=96:h=8:${variant === "ordered" ? "stable-ascending-source" : "stable-reverse-source"}:quadruplicate=${duplicates}:bounded-row-noise`,
      trainingTimestamp: (index) => timestampAt(timeIndex(index)),
      trend: (index) => 12 + timeIndex(index) * 0.15 + Math.max(0, timeIndex(index) - 16) * 0.08,
      covariates: (index) =>
        variant === "duplicate-features"
          ? {
              regressors: { promotion: index % 4 === 0 ? 1 : 0 },
              conditions: { active: index % 4 !== 1 },
            }
          : {},
      additive: (index, covariates) =>
        variant === "duplicate-features"
          ? (covariates.conditions?.active === true
              ? 0.7 * Math.sin((2 * Math.PI * timeIndex(index)) / 7)
              : 0) +
            0.5 * (covariates.regressors?.promotion ?? 0)
          : 0,
    });

    const lastDay = duplicates ? 23 : 95;

    return {
      ...dataset,
      observations:
        variant === "ordered" ? dataset.observations : [...dataset.observations].reverse(),
      predictionRows: dataset.predictionRows.map((row, index) => ({
        ...row,
        timestamp: timestampAt(lastDay + index + 1),
      })),
    };
  }),
  ...(["varied", "constant"] as const).map((variant) => ({
    id: `training-zero-span-${variant}`,
    recipe: `training-zero-span-${variant}-v1:n=3:h=2`,
    observations: (variant === "constant" ? [2, 2, 2] : [2, 4, 7]).map((value) => ({
      timestamp: timestampAt(0),
      value,
    })),
    predictionRows: [{ timestamp: timestampAt(0) }, { timestamp: timestampAt(1) }],
  })),
  makeDataset({
    id: "linear-small",
    observationCount: 32,
    predictionCount: 16,
    recipe: "deterministic-piecewise-weekly-v2:n=32:h=16",
    covariates: noCovariates,
    additive: weekly,
  }),
  makeDataset({
    id: "linear-medium",
    observationCount: 256,
    predictionCount: 64,
    recipe: "deterministic-piecewise-weekly-v2:n=256:h=64",
    covariates: noCovariates,
    additive: weekly,
  }),
  makeDataset({
    id: "map-irregular-medium",
    observationCount: 192,
    predictionCount: 48,
    recipe: "deterministic-piecewise-weekly-v2:n=192:h=48:irregular=true",
    irregular: true,
    covariates: noCovariates,
    additive: weekly,
  }),
  makeDataset({
    id: "map-events-small",
    observationCount: 96,
    predictionCount: 28,
    recipe: "map-events-v1:piecewise+release[-1,2]+campaign[-1,0]+bounded-noise:n=96:h=28",
    covariates: noCovariates,
    additive: (index) =>
      (eventActive(index, eventWorkloadIndexes.release, -1, 2) ? 2.4 : 0) +
      (eventActive(index, eventWorkloadIndexes.campaign, -1, 0) ? -1.3 : 0),
  }),
  makeDataset({
    id: "map-regressors-medium",
    observationCount: 256,
    predictionCount: 64,
    recipe:
      "map-regressors-v1:piecewise+binary-auto+numeric-auto+numeric-always+numeric-never+bounded-noise:n=256:h=64",
    covariates: (index) => ({ regressors: regressorValues(index) }),
    additive: (_index, covariates) => regressorContribution(covariates.regressors ?? {}),
  }),
  makeDataset({
    id: "map-conditional-seasonalities-medium",
    observationCount: 256,
    predictionCount: 64,
    recipe:
      "map-conditional-seasonalities-v1:piecewise+weekly-dense-order3+weekly-sparse-order3+bounded-noise:n=256:h=64",
    covariates: (index) => ({
      conditions: {
        dense: index % 8 !== 0,
        sparse: index % 19 === 0 || index % 23 === 0,
      },
    }),
    additive: (index, covariates) => {
      const conditions = covariates.conditions ?? {};
      const angle = (2 * Math.PI * index) / 7;

      return (
        (conditions.dense === true ? 1.2 * Math.sin(angle) + 0.35 * Math.cos(2 * angle) : 0) +
        (conditions.sparse === true ? -0.8 * Math.cos(angle) + 0.25 * Math.sin(3 * angle) : 0)
      );
    },
  }),
  makeDataset({
    id: "map-mixed-features-explicit-small",
    observationCount: 24,
    predictionCount: 3,
    recipe:
      "conditional-map-fit-control-v1:piecewise+weekly-on+three-day+launch+promotion+bounded-noise:n=24:h=3",
    covariates: (index) => ({
      conditions: { onSeason: index % 3 !== 1 },
      regressors: { promotion: index % 6 === 1 || index % 6 === 2 ? 1 : 0 },
    }),
    additive: (index, covariates) =>
      (covariates.conditions?.onSeason === true ? 1.1 * Math.sin((2 * Math.PI * index) / 7) : 0) +
      0.55 * Math.cos((2 * Math.PI * index) / 3) +
      (eventActive(index, [7], 0, 0) ? 2.2 : 0) +
      1.4 * (covariates.regressors?.promotion ?? 0),
  }),
  makeDataset({
    id: "map-mixed-features-automatic-large",
    predictionCount: 128,
    recipe:
      "map-mixed-features-automatic-v1:piecewise-small-breaks+weekly-order2+monthly-dense-order3+events6+regressors4+bounded-noise-x30:n=768:h=128",
    observationCount: 768,
    noiseMultiplier: 30,
    trend: (index, observationCount) =>
      12 +
      0.05 * index -
      0.002 * Math.max(0, index - Math.floor(observationCount * 0.38)) +
      0.003 * Math.max(0, index - Math.floor(observationCount * 0.7)),
    covariates: (index) => ({
      conditions: { active: index % 10 !== 0 && index % 10 !== 1 },
      regressors: regressorValues(index),
    }),
    additive: (index, covariates) => {
      const weeklyAngle = (2 * Math.PI * index) / 7;
      const monthlyAngle = (2 * Math.PI * index) / 30.5;

      return (
        0.9 * Math.sin(weeklyAngle) +
        0.3 * Math.cos(2 * weeklyAngle) +
        (covariates.conditions?.active === true
          ? 0.7 * Math.sin(monthlyAngle) - 0.2 * Math.cos(3 * monthlyAngle)
          : 0) +
        (eventActive(index, automaticMixedEventIndexes.release, -1, 2) ? 2.1 : 0) +
        (eventActive(index, automaticMixedEventIndexes.campaign, -1, 0) ? -1.1 : 0) +
        regressorContribution(covariates.regressors ?? {})
      );
    },
  }),
  makeDataset({
    id: "linear-offset-scaling",
    observationCount: 96,
    predictionCount: 24,
    recipe: "linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise",
    trend: (index) => 100 + index * 0.09 + 0.03 * Math.max(0, index - 40),
    covariates: noCovariates,
    additive: (index) => 0.25 * Math.sin((2 * Math.PI * index) / 7),
  }),
  ...(["level", "constant", "negative", "seasonal"] as const).map((variant) =>
    makeDataset({
      id: `flat-${variant}`,
      observationCount: 96,
      predictionCount: 24,
      recipe: `flat-${variant}-v1:n=96:h=24:level=${variant === "negative" ? -35 : 35}:bounded-noise=${variant !== "constant"}`,
      trend: () => (variant === "negative" ? -35 : 35),
      noiseMultiplier: variant === "constant" ? 0 : 1,
      covariates: noCovariates,
      additive: (index) => (variant === "seasonal" ? weekly(index) : 0),
    }),
  ),
  ...(["flat", "linear", "flat-large"] as const).map((variant) => {
    const growth = variant === "flat-large" ? "flat" : variant;
    const observationCount = variant === "flat-large" ? 256 : 96;
    const predictionCount = variant === "flat-large" ? 64 : 24;

    const id =
      variant === "flat-large" ? "flat-mixed-components-large" : `${variant}-mixed-components`;

    return makeDataset({
      id,
      observationCount,
      predictionCount,
      recipe: `${id}-v1:n=${observationCount}:h=${predictionCount}:conditional-weekly+event+regressor`,
      trend: (index) => 35 + (growth === "linear" ? index * 0.08 : 0),
      covariates: (index) => ({
        conditions: { active: index % 5 !== 0 },
        regressors: { promotion: index % 6 === 2 ? 1 : 0 },
      }),
      additive: (index, covariates) =>
        (covariates.conditions?.active === true
          ? 0.4 *
            (35 + (growth === "linear" ? index * 0.08 : 0)) *
            Math.sin((2 * Math.PI * index) / 7)
          : 0) +
        (eventActive(index, [21], 0, 0) ? 1.5 : 0) +
        1.2 * (covariates.regressors?.promotion ?? 0),
    });
  }),
  makeDataset({
    id: "logistic-uncertainty-mixed",
    observationCount: 96,
    predictionCount: 24,
    recipe:
      "logistic-uncertainty-mixed-v1:n=96:h=24:changing-capacity-floor+conditional-weekly+campaign+promotion",
    trend: (index) => {
      const floor = 12 + 0.01 * index;
      const capacity = 60 + index * 0.12;

      return floor + (capacity - floor) / (1 + Math.exp(-(-2 + index * 0.045)));
    },
    covariates: (index) => ({
      capacity: canonical(60 + index * 0.12),
      floor: canonical(12 + index * 0.01),
      conditions: { active: index % 5 !== 0 },
      regressors: { promotion: index % 6 === 2 ? 1 : 0 },
    }),
    additive: (index, covariates) =>
      (covariates.conditions?.active === true ? 0.45 * Math.sin((2 * Math.PI * index) / 7) : 0) +
      (eventActive(index, [21, 106], 0, 0) ? 1.5 : 0) +
      0.2 * (covariates.regressors?.promotion ?? 0),
  }),
  ...(["implicit", "explicit", "large"] as const).map((floorPolicy) => {
    const observationCount = floorPolicy === "large" ? 256 : 96;
    const predictionCount = floorPolicy === "large" ? 64 : 24;

    const id =
      floorPolicy === "large" ? "logistic-implicit-floor-large" : `logistic-${floorPolicy}-floor`;

    return makeDataset({
      id,
      observationCount,
      predictionCount,
      recipe: `${id}-v1:n=${observationCount}:h=${predictionCount}:changing-capacity:weekly`,
      trend: (index) => {
        const floor = floorPolicy === "explicit" ? 12 + 0.01 * index : 0;
        const capacity = 60 + index * 0.12;

        return floor + (capacity - floor) / (1 + Math.exp(-(-2 + index * 0.045)));
      },
      covariates: (index) => {
        const capacity = canonical(60 + index * 0.12);

        return floorPolicy === "explicit"
          ? {
              capacity,
              floor: canonical(12 + index * 0.01),
              regressors: { promotion: index % 6 === 2 ? 1 : 0 },
            }
          : { capacity };
      },
      additive: (index, covariates) =>
        0.45 * Math.sin((2 * Math.PI * index) / 7) +
        (floorPolicy === "explicit" ? 0.2 * (covariates.regressors?.promotion ?? 0) : 0),
    });
  }),
];

const flatPrefixDatasets: ReadonlyArray<BenchmarkDataset> = datasets
  .filter((dataset) =>
    ["flat-mixed-components", "flat-mixed-components-large"].includes(dataset.id),
  )
  .flatMap((dataset) => {
    const counts = dataset.id.endsWith("large") ? [225, 232] : [63, 70, 77];

    return counts.map((count) => ({
      id: `${dataset.id}-prefix-${count}`,
      recipe: `${dataset.recipe}:prefix=${count}:assessment=7:targets-excluded`,
      observations: dataset.observations.slice(0, count),
      predictionRows: dataset.observations.slice(count, count + 7).map((row) => {
        if (row.conditions === undefined || row.regressors === undefined) {
          throw new Error("Flat mixed prefix requires complete source covariates");
        }

        return {
          timestamp: row.timestamp,
          conditions: row.conditions,
          regressors: row.regressors,
        };
      }),
    }));
  });

/** Deterministic logistic reconciliation inputs; v1 recipes and bytes stay unchanged. */
export const logisticReconciliationDatasets: ReadonlyArray<BenchmarkDataset> = [
  ...([96, 99, 100, 256] as const).map((count) => ({ variant: "basic", count })),
  ...([96, 256] as const).map((count) => ({ variant: "weekly", count })),
  ...(
    [
      "floor",
      "regressor-additive",
      "regressor-multiplicative",
      "conditional",
      "event",
      "mixed",
      "unsorted",
      "duplicates",
      "declining",
      "saturated",
      "constant",
      "out-of-bounds",
    ] as const
  ).map((variant) => ({ variant, count: 96 })),
].map(({ variant, count }) => {
  const timeIndex = (index: number): number =>
    variant === "duplicates" ? Math.floor(index / 2) : index;

  const endTime = timeIndex(count - 1);
  const hasFloor = variant === "floor" || variant === "mixed";
  const hasRegressor = variant.startsWith("regressor-") || variant === "mixed";
  const hasCondition = variant === "conditional" || variant === "mixed";

  const bounds = (index: number) => {
    const capacity = canonical(100 + 0.08 * timeIndex(index));

    return hasFloor ? { capacity, floor: canonical(12 + 0.02 * timeIndex(index)) } : { capacity };
  };

  const trend = (index: number): number => {
    if (variant === "constant") return 50;

    const { capacity, floor = 0 } = bounds(index);
    const direction = variant === "declining" ? -1 : 1;
    const rate = variant === "saturated" ? 24 : 4;
    const eta = direction * rate * (timeIndex(index) / endTime - 0.45);

    return floor + (capacity - floor) / (1 + Math.exp(-eta));
  };

  const dataset = makeDataset({
    id: `logistic-${variant}-${count}`,
    observationCount: count,
    predictionCount: 24,
    recipe: `logistic-reconciliation-v1:${variant}:n=${count}:h=24:bounded-deterministic-noise:changing-capacity`,
    trainingTimestamp: (index) => timestampAt(timeIndex(index)),
    trend,
    noiseMultiplier: variant === "constant" ? 0 : 1,
    covariates: (index) => {
      let covariates: Covariates = bounds(index);

      if (hasRegressor) {
        covariates = { ...covariates, regressors: { promotion: index % 6 === 2 ? 1 : 0 } };
      }

      if (hasCondition) {
        covariates = { ...covariates, conditions: { active: index % 5 !== 0 } };
      }

      return covariates;
    },
    additive: (index, covariates) => {
      const seasonal =
        variant === "weekly" || (hasCondition && covariates.conditions?.active === true)
          ? 0.8 * Math.sin((2 * Math.PI * timeIndex(index)) / 7)
          : 0;

      const event =
        (variant === "event" || variant === "mixed") && eventActive(index, [21, 106], -1, 1)
          ? 2
          : 0;

      const promotion = covariates.regressors?.promotion ?? 0;

      const regressor =
        variant === "regressor-multiplicative" || variant === "mixed"
          ? 0.03 * trend(index) * promotion
          : 1.2 * promotion;

      const outside =
        variant === "out-of-bounds" ? (index === 0 ? -50 : index === count - 1 ? 50 : 0) : 0;

      return seasonal + event + regressor + outside;
    },
  });

  const future = dataset.predictionRows.map((row, index) => ({
    ...row,
    timestamp: timestampAt(endTime + index + 1),
  }));

  const historical = dataset.observations.map(({ value: _value, ...row }) => row);

  return {
    ...dataset,
    observations:
      variant === "unsorted" ? [...dataset.observations].reverse() : dataset.observations,
    predictionRows: [...historical, ...future],
  };
});

/** Generate an immutable input version; existing identical bytes are reused, never overwritten. */
export const generateBenchmarkData = Effect.fn("benchmark.inputs.generate")(function* (
  outputRoot = new URL("../inputs/v1/", import.meta.url),
  inputDatasets: ReadonlyArray<BenchmarkDataset> = [...datasets, ...flatPrefixDatasets],
) {
  const files = inputDatasets.map((dataset) => {
    const contents = `${JSON.stringify(dataset, null, 2)}\n`;

    return {
      file: `${dataset.id}.json`,
      recipe: dataset.recipe,
      contents,
      sha256: createHash("sha256").update(contents).digest("hex"),
    };
  });

  const manifest = files.map(({ contents: _contents, ...entry }) => entry);

  const writes = [
    ...files,
    {
      file: "manifest.json",
      contents: `${JSON.stringify({ schemaVersion: 1, files: manifest }, null, 2)}\n`,
    },
  ];

  yield* Effect.tryPromise({
    try: async () => {
      // Check the complete version before creating any missing files in an existing version.
      for (const { file, contents } of writes) {
        try {
          const existing = await readFile(new URL(file, outputRoot), "utf8");

          if (existing !== contents)
            throw new Error(`Input version is immutable: ${file} differs; generate a new version`);
        } catch (cause) {
          if (!(cause instanceof Error) || !("code" in cause) || cause.code !== "ENOENT")
            throw cause;
        }
      }

      await mkdir(outputRoot, { recursive: true });

      for (const { file, contents } of writes) {
        const target = new URL(file, outputRoot);

        try {
          await writeFile(target, contents, { flag: "wx" });
        } catch (cause) {
          if (!(cause instanceof Error) || !("code" in cause) || cause.code !== "EEXIST")
            throw cause;

          if ((await readFile(target, "utf8")) !== contents) {
            throw new Error(`Input version is immutable: ${file} differs; generate a new version`);
          }
        }
      }
    },
    catch: (cause) =>
      new BenchmarkArtifactError({ message: `Cannot generate input version: ${String(cause)}` }),
  }).pipe(Effect.withSpan("benchmark.inputs.generate-filesystem"));
});

const entrypoint = process.argv[1];

if (
  entrypoint !== undefined &&
  pathToFileURL(fileURLToPath(import.meta.url)).href === pathToFileURL(entrypoint).href
) {
  await Effect.runPromise(
    Effect.gen(function* () {
      const version = yield* parseArtifactId(process.argv[2] ?? "v1");
      yield* generateBenchmarkData(
        new URL(`../inputs/${version}/`, import.meta.url),
        version === "v2" ? logisticReconciliationDatasets : undefined,
      );
    }),
  );
}
