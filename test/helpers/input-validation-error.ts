import { expect } from "vitest";

import { InputValidationError } from "../../src/index";

/**
 * Assert that an expected failure is an `InputValidationError` and narrow it, for operations whose
 * error channel also includes other typed errors such as `CountryHolidayError`.
 */
export const expectInputValidationError = <Failure extends object>(
  failure: Failure,
): InputValidationError => {
  expect(failure).toBeInstanceOf(InputValidationError);

  if (!(failure instanceof InputValidationError)) {
    throw new Error(`Expected InputValidationError, received ${failure.constructor.name}`);
  }

  return failure;
};
