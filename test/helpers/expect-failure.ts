import { expect } from "vitest";

/**
 * Assert that an expected failure is an instance of one typed error class and narrow it, for
 * operations whose error channel holds several typed errors.
 */
export const expectFailureOf = <Expected extends object, Failure extends object>(
  errorClass: abstract new (...args: never) => Expected,
  failure: Failure,
): Expected => {
  expect(failure).toBeInstanceOf(errorClass);

  if (!(failure instanceof errorClass)) {
    throw new Error(`Expected ${errorClass.name}, received ${failure.constructor.name}`);
  }

  return failure;
};
