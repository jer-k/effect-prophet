import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  loadProphetWasmModule,
  type ProphetWasmModule,
} from "../../src/internal/prophet-wasm-module";
import { millisecondsPerDay } from "../../src/internal/time";
import { edgeNumber, propertyParameters } from "../helpers/property";

/**
 * Argument kinds for every export, in declaration order: `a` is a `Float64Array` slice and `n` is
 * a scalar. Derived from the `#[wasm_bindgen]` signatures in `rust/prophet-wasm/src/wasm`.
 */
const exportSignatures = [
  ["fit_flat_map", "aaaaa"],
  ["fit_flat_map_with_scaling", "aanaaa"],
  ["predict_flat_map", "annaaa"],
  ["predict_flat_map_with_scaling", "annnnnaaa"],
  ["fit_piecewise_map", "aanannaaana"],
  ["fit_piecewise_map_with_scaling", "aannannaaana"],
  ["predict_piecewise_map", "annnnaanaaa"],
  ["predict_piecewise_map_with_scaling", "annnnnnnaanaaa"],
  ["fit_piecewise_map_with_features", "aanannaaaanaaaana"],
  ["fit_piecewise_map_with_features_and_scaling", "aannannaaaanaaaana"],
  ["predict_piecewise_map_with_features", "annnnaanaaaanaaaa"],
  ["predict_piecewise_map_with_features_and_scaling", "annnnnnnaanaaaanaaaa"],
  ["fit_mixed_linear_map", "aannannaaaanaaaaana"],
  ["fit_mixed_flat_map", "aanaaaanaaaaaa"],
  ["predict_mixed_linear_map", "annnnnnnaanaaaanaaaaa"],
  ["predict_mixed_flat_map", "annnnnaaaanaaaaa"],
  ["fit_logistic_map_with_features", "aaanannannaaaanaaaaana"],
  ["predict_logistic_map_with_features", "aaannnnnnnnaanaaaanaaaaa"],
  ["simulate_map_with_features", "annnnnnnnaanaaaanaaaaannnn"],
  ["simulate_logistic_map_with_features", "aaannnnnnnnaanaaaanaaaaannnn"],
] as const satisfies ReadonlyArray<readonly [keyof ProphetWasmModule, string]>;

type WireArgument = Float64Array | number;

/** Small codes, edge floats, and counts near the 32-bit `usize` limits of wasm32. */
const wireNumber: fc.Arbitrary<number> = fc.oneof(
  fc.integer({ min: 0, max: 8 }),
  edgeNumber,
  fc.constantFrom(2 ** 16, 2 ** 24, 2 ** 31, 2 ** 32 - 1, 2 ** 32, 2 ** 53),
);

/** Owned slices, or offset views into a larger shared buffer. */
const wireArray: fc.Arbitrary<Float64Array> = fc.oneof(
  fc.array(wireNumber, { maxLength: 8 }).map((values) => Float64Array.from(values)),
  fc
    .tuple(fc.array(wireNumber, { minLength: 1, maxLength: 12 }), fc.nat(), fc.nat())
    .map(([values, start, length]) => {
      const buffer = Float64Array.from(values);
      const offset = start % values.length;

      return buffer.subarray(offset, offset + (length % (values.length - offset + 1)));
    }),
);

const wireCall = fc.constantFrom(...exportSignatures).chain(([name, kinds]) =>
  fc
    .tuple(
      fc.tuple(
        ...Array.from(kinds, (kind): fc.Arbitrary<WireArgument> =>
          kind === "a" ? wireArray : wireNumber,
        ),
      ),
      fc.boolean(),
    )
    .map(([generated, aliased]) => {
      const shared = generated.find((argument) => argument instanceof Float64Array);

      // Aliasing passes one array instance for every slice parameter.
      const args: ReadonlyArray<WireArgument> =
        aliased && shared !== undefined
          ? generated.map((argument) => (argument instanceof Float64Array ? shared : argument))
          : generated;

      return { name, args };
    }),
);

const module = loadProphetWasmModule();

/** A WASM export called with generated slices and scalars. */
interface WireExport {
  (...args: ReadonlyArray<WireArgument>): Float64Array;
}

const wireExport = (name: (typeof exportSignatures)[number][0]): WireExport =>
  // SAFETY: every export takes only `Float64Array` slices and numbers, and `wireCall` generates
  // each argument with the kind its signature string records for that position.
  module[name] as WireExport;

const snapshot = (args: ReadonlyArray<WireArgument>) =>
  args.map((argument) => (argument instanceof Float64Array ? Array.from(argument) : argument));

/** A known-good prediction that must keep working after any hostile call. */
const sentinel = () =>
  Array.from(
    module.predict_flat_map(
      new Float64Array([0, millisecondsPerDay]),
      2,
      0.5,
      new Float64Array(),
      new Float64Array(),
      new Float64Array(),
    ),
  );

const expectedSentinel = sentinel();

describe("Prophet WASM module boundary properties", () => {
  it("returns an integral status frame for arbitrary arguments without trapping", () => {
    expect(expectedSentinel[0]).toBe(0);

    fc.assert(
      fc.property(wireCall, ({ name, args }) => {
        const before = snapshot(args);
        const frame = wireExport(name)(...args);

        expect(frame).toBeInstanceOf(Float64Array);

        const status = frame[0];

        expect(Number.isInteger(status)).toBe(true);
        expect(status).toBeGreaterThanOrEqual(0);
        expect(status).toBeLessThan(256);

        // wasm-bindgen copies slices in; the caller's arrays and views must be untouched.
        expect(snapshot(args)).toEqual(before);
        expect(sentinel()).toEqual(expectedSentinel);
      }),
      propertyParameters(1_000),
    );
  });

  // Random frames rarely stay valid around a large count, and wasm32 has a 32-bit usize, so
  // native Rust properties cannot show these sizes are rejected without trapping.
  const timestamps = Float64Array.from([0, 1, 2, 3], (day) => day * millisecondsPerDay);
  const values = new Float64Array([1, 2, 1.5, 3]);
  const empty = new Float64Array();
  const period = new Float64Array([7]);
  const prior = new Float64Array([10]);
  const newton = new Float64Array([2, 1, 50]);

  it.each([2 ** 16, 2 ** 24, 2 ** 31, 2 ** 32 - 1])(
    "rejects Fourier order %d with a status instead of a trap",
    (order) => {
      const orders = new Float64Array([order]);

      const frames = [
        module.fit_flat_map(timestamps, values, period, orders, prior),
        module.predict_flat_map(timestamps, 1, 0.1, period, orders, empty),
        module.fit_piecewise_map(
          timestamps,
          values,
          0,
          empty,
          0,
          0,
          period,
          orders,
          prior,
          0.05,
          newton,
        ),
      ];

      for (const frame of frames) {
        expect(Number.isInteger(frame[0])).toBe(true);
        expect(frame[0]).not.toBe(0);
      }

      expect(sentinel()).toEqual(expectedSentinel);
    },
  );

  it.each([2 ** 16, 2 ** 31, 2 ** 32 - 1])(
    "bounds an automatic changepoint count of %d by the training rows",
    (count) => {
      const frame = module.fit_piecewise_map(
        timestamps,
        values,
        1,
        empty,
        count,
        0.8,
        empty,
        empty,
        empty,
        0.05,
        newton,
      );

      expect(frame[0]).toBe(0);
      expect(sentinel()).toEqual(expectedSentinel);
    },
  );
});
