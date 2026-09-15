import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);

const {
  AdditiveFitStatus,
  AdditivePredictionStatus,
  fit_additive_ridge: fitAdditiveRidge,
  predict_additive_ridge: predictAdditiveRidge,
} = require("../pkg/prophet_wasm.js");

const DAY = 86_400_000;

const closeTo = (actual, expected, tolerance = 1e-10) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

const unpackFit = (packed, coefficientCount) => {
  assert.equal(packed[0], AdditiveFitStatus.Success);
  assert.equal(packed.length, 9 + coefficientCount);

  return {
    intercept: packed[1],
    slope: packed[2],
    timeOrigin: packed[3],
    timeScale: packed[4],
    valueScale: packed[5],
    numericalRank: packed[6],
    normalizedResidualSumSquares: packed[7],
    penalizedObjective: packed[8],
    coefficients: packed.slice(9),
  };
};

const fourierRow = (timestamp, periods, orders) => {
  const epochDays = timestamp / DAY;
  const angularDays = 2 * Math.PI * epochDays;
  const row = [];

  for (let component = 0; component < periods.length; component += 1) {
    for (let harmonic = 1; harmonic <= orders[component]; harmonic += 1) {
      const angle = (harmonic / periods[component]) * angularDays;

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

  const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));

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
        const actual = packed[1 + row * rowWidth + 3 + component];

        const expected =
          referenceCase.expected.componentsRowMajor[row * componentCount + component];

        const tolerance =
          referenceCase.tolerance.absolute + referenceCase.tolerance.relative * Math.abs(expected);

        closeTo(actual, expected, tolerance);
      }
    }

    let ownerComponent = 0;
    let ownerUpperBound = referenceCase.seasonalities[0].fourierOrder * 2;

    for (let column = 0; column < referenceCase.expected.columnCount; column += 1) {
      while (column >= ownerUpperBound) {
        ownerComponent += 1;
        ownerUpperBound += referenceCase.seasonalities[ownerComponent].fourierOrder * 2;
      }

      const basis = new Float64Array(referenceCase.expected.columnCount);
      basis[column] = 1;
      const featurePacked = predictAdditiveRidge(timestamps, 0, 0, 0, 1, periods, orders, basis);

      assert.equal(featurePacked[0], AdditivePredictionStatus.Success, referenceCase.id);

      for (let row = 0; row < timestamps.length; row += 1) {
        const actual = featurePacked[1 + row * rowWidth + 3 + ownerComponent];

        const expected =
          referenceCase.expected.featuresRowMajor[
            row * referenceCase.expected.columnCount + column
          ];

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
    const design = [
      1,
      (timestamps[row] - fit.timeOrigin) / fit.timeScale,
      ...fourierRow(timestamps[row], periods, orders),
    ];

    const target = values[row] / fit.valueScale;

    const prediction = design.reduce(
      (sum, feature, column) => sum + feature * normalizedCoefficients[column],
      0,
    );

    const residual = prediction - target;

    residualSumSquares += residual * residual;

    for (let column = 0; column < gradient.length; column += 1) {
      gradient[column] += design[column] * residual;
    }
  }

  let penaltySumSquares = 0;

  for (let column = 2; column < normalizedCoefficients.length; column += 1) {
    const penalized = normalizedCoefficients[column] / priors[0];

    gradient[column] += penalized / priors[0];
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

  closeTo(quarterRow[0], 1.5);
  closeTo(quarterRow[3], expectedFirstComponent);
  closeTo(quarterRow[4], expectedSecondComponent);
  closeTo(quarterRow[1], expectedFirstComponent + expectedSecondComponent);
  closeTo(quarterRow[2], quarterRow[0] + quarterRow[1]);
});

test("returns documented fit failures", () => {
  const cases = [
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
    const packed = fitAdditiveRidge(...args.map((values) => new Float64Array(values)));

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
