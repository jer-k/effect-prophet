import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

import type { BenchmarkDataset } from "./case.ts";

const dayMilliseconds = 86_400_000;

const origin = Date.UTC(2020, 0, 1);

const timestampAt = (index: number, irregular: boolean): string => {
  const skippedIntervals = irregular ? Math.floor(index / 7) + Math.floor(index / 19) : 0;

  return new Date(origin + (index + skippedIntervals) * dayMilliseconds).toISOString();
};

const deterministicNoise = (index: number): number =>
  0.08 * Math.sin(index * 1.731) + 0.035 * Math.cos(index * 0.417);

const makeDataset = (
  id: string,
  observationCount: number,
  predictionCount: number,
  irregular: boolean,
): BenchmarkDataset => {
  const firstBreak = Math.floor(observationCount * 0.38);
  const secondBreak = Math.floor(observationCount * 0.7);

  const observations = Array.from({ length: observationCount }, (_, index) => {
    const firstAdjustment = Math.max(0, index - firstBreak) * -0.22;
    const secondAdjustment = Math.max(0, index - secondBreak) * 0.31;
    const weekly = 1.4 * Math.sin((2 * Math.PI * index) / 7);

    const value =
      12 + index * 0.42 + firstAdjustment + secondAdjustment + weekly + deterministicNoise(index);

    return {
      timestamp: timestampAt(index, irregular),
      value,
    };
  });

  const predictionTimestamps = Array.from({ length: predictionCount }, (_, offset) =>
    timestampAt(observationCount + offset, irregular),
  );

  return {
    id,
    recipe: `deterministic-piecewise-weekly-v1:n=${observationCount}:h=${predictionCount}:irregular=${irregular}`,
    observations,
    predictionTimestamps,
  };
};

const datasets: ReadonlyArray<BenchmarkDataset> = [
  makeDataset("linear-small", 32, 16, false),
  makeDataset("linear-medium", 256, 64, false),
  makeDataset("linear-large", 1_024, 128, false),
  makeDataset("map-irregular-medium", 192, 48, true),
];

/**
 * Generate every deterministic shared benchmark dataset.
 *
 * @param outputRoot - Directory that will receive generated JSON files.
 */
export const generateBenchmarkData = async (
  outputRoot = new URL("data/generated/", import.meta.url),
) => {
  await mkdir(outputRoot, { recursive: true });

  for (const dataset of datasets) {
    const target = new URL(`${dataset.id}.json`, outputRoot);
    const contents = `${JSON.stringify(dataset, null, 2)}\n`;

    await writeFile(target, contents);
  }
};

const entrypoint = process.argv[1];

if (
  entrypoint !== undefined &&
  pathToFileURL(fileURLToPath(import.meta.url)).href === pathToFileURL(entrypoint).href
) {
  await generateBenchmarkData();
}
