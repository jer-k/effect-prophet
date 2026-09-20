/** Add two safe integers, returning `undefined` when the result is not safe. */
export const checkedAdd = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  const result = left + right;

  return Number.isSafeInteger(result) ? result : undefined;
};

/** Multiply two safe integers, returning `undefined` when the result is not safe. */
export const checkedMultiply = (left: number, right: number): number | undefined => {
  if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
    return undefined;
  }

  const result = left * right;

  return Number.isSafeInteger(result) ? result : undefined;
};

/** Calculate a row-major element count without allowing unsafe dimensions or multiplication. */
export const checkedElementCount = (rows: number, columns: number): number | undefined => {
  if (rows < 0 || columns < 0) {
    return undefined;
  }

  return checkedMultiply(rows, columns);
};
