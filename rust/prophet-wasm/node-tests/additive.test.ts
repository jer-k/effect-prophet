import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { Effect } from "effect";

import { decodeFourierReference } from "../../../integration/helpers/prophet-fixture.ts";
import { loadProphetWasmNodeBindings } from "./wasm-bindings.ts";

const {
  AdditiveFitStatus,
  AdditivePredictionStatus,
  fit_additive_ridge: fitAdditiveRidge,
  predict_additive_ridge: predictAdditiveRidge,
} = loadProphetWasmNodeBindings();

const DAY = 86_400_000;

const itemAt = <T>(values: ReadonlyArray<T>, index: number): T => {
  const value = values[index];

  if (value === undefined) {
    assert.fail(`expected an item at index ${index}`);
  }

  return value;
};

const numberAt = (values: ArrayLike<number>, index: number): number => {
  const value = values[index];

  if (value === undefined) {
    assert.fail(`expected a number at index ${index}`);
  }

  return value;
};

const closeTo = (actual: number, expected: number, tolerance = 1e-10): void => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

const unpackFit = (packed: Float64Array, coefficientCount: number) => {
  assert.equal(numberAt(packed, 0), AdditiveFitStatus.Success);
  assert.equal(packed.length, 9 + coefficientCount);

  return {
    intercept: numberAt(packed, 1),
    slope: numberAt(packed, 2),
    timeOrigin: numberAt(packed, 3),
    timeScale: numberAt(packed, 4),
    valueScale: numberAt(packed, 5),
    numericalRank: numberAt(packed, 6),
    normalizedResidualSumSquares: numberAt(packed, 7),
    penalizedObjective: numberAt(packed, 8),
    coefficients: packed.slice(9),
  };
};

const fourierRow = (
  timestamp: number,
  periods: Float64Array,
  orders: Float64Array,
): ReadonlyArray<number> => {
  const epochDays = timestamp / DAY;
  const angularDays = 2 * Math.PI * epochDays;
  const row: Array<number> = [];

  for (let component = 0; component < periods.length; component += 1) {
    for (let harmonic = 1; harmonic <= numberAt(orders, component); harmonic += 1) {
      const angle = (harmonic / numberAt(periods, component)) * angularDays;

      row.push(Math.sin(angle), Math.cos(angle));
    }
  }

  return row;
};

test("matches Prophet 1.4.0 Fourier features and fixed components", () => {
  const fixturePath = new URL(
    "../../../integration/fixtures/prophet-1.4.0/fourier.json",
    import.meta.url,
  );

  const fixtureInput: unknown = JSON.parse(readFileSync(fixturePath, "utf8"));
  const fixture = Effect.runSync(decodeFourierReference(fixtureInput, fixturePath.pathname));

  for (const referenceCase of fixture.cases) {
    const timestamps = new Float64Array(referenceCase.timestamps.map(Date.parse));

    const periods = new Float64Array(
      referenceCase.seasonalities.map((seasonality) => seasonality.periodDays),
    );

    const orders = new Float64Array(
      referenceCase.seasonalities.map((seasonality) => seasonality.fourierOrder),
    );

    const componentCount = referenceCase.seasonalities.length;
    const rowWidth = componentCount + 3;

    const packed = predictAdditiveRidge(
      timestamps,
      0,
      0,
      0,
      1,
      periods,
      orders,
      new Float64Array(referenceCase.coefficients),
    );

    assert.equal(packed[0], AdditivePredictionStatus.Success, referenceCase.id);

    for (let row = 0; row < timestamps.length; row += 1) {
      for (let component = 0; component < componentCount; component += 1) {
        const actual = numberAt(packed, 1 + row * rowWidth + 3 + component);

        const expected = numberAt(
          referenceCase.expected.componentsRowMajor,
          row * componentCount + component,
        );

        const tolerance =
          referenceCase.tolerance.absolute + referenceCase.tolerance.relative * Math.abs(expected);

        closeTo(actual, expected, tolerance);
      }
    }

    let ownerComponent = 0;
    let ownerUpperBound = itemAt(referenceCase.seasonalities, 0).fourierOrder * 2;

    for (let column = 0; column < referenceCase.expected.columnCount; column += 1) {
      while (column >= ownerUpperBound) {
        ownerComponent += 1;
        ownerUpperBound += itemAt(referenceCase.seasonalities, ownerComponent).fourierOrder * 2;
      }

      const basis = new Float64Array(referenceCase.expected.columnCount);
      basis[column] = 1;
      const featurePacked = predictAdditiveRidge(timestamps, 0, 0, 0, 1, periods, orders, basis);

      assert.equal(featurePacked[0], AdditivePredictionStatus.Success, referenceCase.id);

      for (let row = 0; row < timestamps.length; row += 1) {
        const actual = numberAt(featurePacked, 1 + row * rowWidth + 3 + ownerComponent);

        const expected = numberAt(
          referenceCase.expected.featuresRowMajor,
          row * referenceCase.expected.columnCount + column,
        );

        const tolerance =
          referenceCase.tolerance.absolute + referenceCase.tolerance.relative * Math.abs(expected);

        closeTo(actual, expected, tolerance);
      }
    }
  }
});

test("fits the documented objective and satisfies its stationarity equations", () => {
  const timestamps = new Float64Array([0, DAY * 0.25, DAY * 0.5, DAY * 0.75, DAY]);
  const values = new Float64Array([1, 3, 1, -1, 1]);
  const periods = new Float64Array([1]);
  const orders = new Float64Array([1]);
  const priors = new Float64Array([10]);
  const fit = unpackFit(fitAdditiveRidge(timestamps, values, periods, orders, priors), 2);

  const normalizedCoefficients = [
    fit.intercept / fit.valueScale,
    fit.slope / fit.valueScale,
    ...Array.from(fit.coefficients, (coefficient) => coefficient / fit.valueScale),
  ];

  const gradient = Array.from({ length: 4 }, () => 0);
  let residualSumSquares = 0;

  for (let row = 0; row < timestamps.length; row += 1) {
    const timestamp = numberAt(timestamps, row);

    const design = [
      1,
      (timestamp - fit.timeOrigin) / fit.timeScale,
      ...fourierRow(timestamp, periods, orders),
    ];

    const target = numberAt(values, row) / fit.valueScale;

    const prediction = design.reduce(
      (sum, feature, column) => sum + feature * numberAt(normalizedCoefficients, column),
      0,
    );

    const residual = prediction - target;

    residualSumSquares += residual * residual;

    for (let column = 0; column < gradient.length; column += 1) {
      gradient[column] = numberAt(gradient, column) + numberAt(design, column) * residual;
    }
  }

  let penaltySumSquares = 0;
  const priorScale = numberAt(priors, 0);

  for (let column = 2; column < normalizedCoefficients.length; column += 1) {
    const penalized = numberAt(normalizedCoefficients, column) / priorScale;

    gradient[column] = numberAt(gradient, column) + penalized / priorScale;
    penaltySumSquares += penalized * penalized;
  }

  for (const value of gradient) {
    closeTo(value, 0, 1e-12);
  }

  closeTo(fit.normalizedResidualSumSquares, residualSumSquares, 1e-14);
  closeTo(fit.penalizedObjective, 0.5 * (residualSumSquares + penaltySumSquares), 1e-14);
  assert.equal(fit.numericalRank, 4);
});

test("fits more coefficients than observations through ridge augmentation", () => {
  const packed = fitAdditiveRidge(
    new Float64Array([0, DAY]),
    new Float64Array([2, 5]),
    new Float64Array([7]),
    new Float64Array([3]),
    new Float64Array([1]),
  );

  const fit = unpackFit(packed, 6);

  assert.equal(fit.numericalRank, 8);

  for (const coefficient of fit.coefficients) {
    closeTo(coefficient, 0, 1e-10);
  }
});

test("returns trend, additive total, value, and ordered components", () => {
  const timestamp = DAY * 0.25;

  const packed = predictAdditiveRidge(
    new Float64Array([0, timestamp, 0]),
    1,
    2,
    0,
    DAY,
    new Float64Array([1, 7]),
    new Float64Array([1, 1]),
    new Float64Array([2, 3, 5, 7]),
  );

  assert.equal(packed[0], AdditivePredictionStatus.Success);
  assert.equal(packed.length, 1 + 3 * 5);

  const epochRow = Array.from(packed.slice(1, 6));

  assert.deepEqual(epochRow, [1, 10, 11, 3, 7]);
  assert.deepEqual(Array.from(packed.slice(11, 16)), epochRow);

  const angle = Math.PI / 14;
  const expectedFirstComponent = 2;
  const expectedSecondComponent = 5 * Math.sin(angle) + 7 * Math.cos(angle);
  const quarterRow = packed.slice(6, 11);

  closeTo(numberAt(quarterRow, 0), 1.5);
  closeTo(numberAt(quarterRow, 3), expectedFirstComponent);
  closeTo(numberAt(quarterRow, 4), expectedSecondComponent);
  closeTo(numberAt(quarterRow, 1), expectedFirstComponent + expectedSecondComponent);
  closeTo(numberAt(quarterRow, 2), numberAt(quarterRow, 0) + numberAt(quarterRow, 1));
});

test("returns documented fit failures", () => {
  const cases: ReadonlyArray<{
    readonly args: readonly [
      ReadonlyArray<number>,
      ReadonlyArray<number>,
      ReadonlyArray<number>,
      ReadonlyArray<number>,
      ReadonlyArray<number>,
    ];
    readonly status: number;
  }> = [
    {
      args: [[], [], [], [], []],
      status: AdditiveFitStatus.InsufficientObservations,
    },
    {
      args: [[0, 1], [1, 2, 3], [], [], []],
      status: AdditiveFitStatus.LengthMismatch,
    },
    {
      args: [[0, Number.NaN], [1, 2], [], [], []],
      status: AdditiveFitStatus.InvalidObservation,
    },
    {
      args: [[0, 1], [1, 2], [7], [1.5], [10]],
      status: AdditiveFitStatus.InvalidConfiguration,
    },
    {
      args: [[0, 1], [1, 2], [7], [1], []],
      status: AdditiveFitStatus.LengthMismatch,
    },
    {
      args: [[1, 1], [1, 2], [], [], []],
      status: AdditiveFitStatus.ZeroTimeRange,
    },
  ];

  for (const { args, status } of cases) {
    const [timestamps, values, periods, orders, priors] = args;

    const packed = fitAdditiveRidge(
      new Float64Array(timestamps),
      new Float64Array(values),
      new Float64Array(periods),
      new Float64Array(orders),
      new Float64Array(priors),
    );

    assert.deepEqual(packed, new Float64Array([status]));
  }
});

test("distinguishes prediction metadata failures from indexed evaluation failures", () => {
  assert.deepEqual(
    predictAdditiveRidge(
      new Float64Array([]),
      0,
      1,
      0,
      1,
      new Float64Array([7]),
      new Float64Array([]),
      new Float64Array([]),
    ),
    new Float64Array([AdditivePredictionStatus.LengthMismatch]),
  );

  assert.deepEqual(
    predictAdditiveRidge(
      new Float64Array([0, Number.NaN]),
      0,
      1,
      0,
      1,
      new Float64Array([]),
      new Float64Array([]),
      new Float64Array([]),
    ),
    new Float64Array([AdditivePredictionStatus.InvalidTimestamp, 1]),
  );

  assert.deepEqual(
    predictAdditiveRidge(
      new Float64Array([0, DAY / 8]),
      0,
      0,
      0,
      1,
      new Float64Array([1]),
      new Float64Array([1]),
      new Float64Array([Number.MAX_VALUE, Number.MAX_VALUE]),
    ),
    new Float64Array([AdditivePredictionStatus.NonFiniteResult, 1]),
  );

  assert.deepEqual(
    predictAdditiveRidge(
      new Float64Array([]),
      0,
      1,
      0,
      1,
      new Float64Array([]),
      new Float64Array([]),
      new Float64Array([]),
    ),
    new Float64Array([AdditivePredictionStatus.Success]),
  );
});
