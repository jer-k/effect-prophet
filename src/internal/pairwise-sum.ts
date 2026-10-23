/** Largest block numpy sums with interleaved accumulators instead of splitting it in half. */
const blockSize = 128;

const sumBlock = (values: ReadonlyArray<number>, start: number, length: number): number => {
  const at = (offset: number) => values[start + offset] ?? Number.NaN;

  if (length < 8) {
    let result = -0;

    for (let offset = 0; offset < length; offset += 1) {
      result += at(offset);
    }

    return result;
  }

  if (length <= blockSize) {
    let [r0, r1, r2, r3, r4, r5, r6, r7] = [at(0), at(1), at(2), at(3), at(4), at(5), at(6), at(7)];
    let offset = 8;

    for (; offset < length - (length % 8); offset += 8) {
      r0 += at(offset);
      r1 += at(offset + 1);
      r2 += at(offset + 2);
      r3 += at(offset + 3);
      r4 += at(offset + 4);
      r5 += at(offset + 5);
      r6 += at(offset + 6);
      r7 += at(offset + 7);
    }

    let result = r0 + r1 + (r2 + r3) + (r4 + r5 + (r6 + r7));

    for (; offset < length; offset += 1) {
      result += at(offset);
    }

    return result;
  }

  let half = Math.floor(length / 2);
  half -= half % 8;

  return sumBlock(values, start, half) + sumBlock(values, start + half, length - half);
};

/**
 * Sum the way numpy's `ndarray.sum` does for float64 data: eight interleaved accumulators per
 * block of at most 128 values, with longer inputs halved recursively. pandas' `mean` and `std`
 * sum this way, so matching its rounding reproduces Prophet's statistics bit for bit.
 */
export const pairwiseSum = (values: ReadonlyArray<number>): number =>
  // numpy's add reduction starts from its identity, which turns a negative zero into zero.
  0 + sumBlock(values, 0, values.length);
