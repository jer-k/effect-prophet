//! Eigen 3.4.0 double-packet arithmetic, executed in software on every CPU.
//!
//! Adapted from Eigen/src/Core/arch/Default/GenericPacketMathFunctions.h,
//! vendored by Stan Math 58ad15b0847485d523aadd22cbae7add0a61b0e3.
//! Copyright (C) 2007 Julien Pommier; (C) 2014 Pedro Gonnet;
//! (C) 2009-2019 Gael Guennebaud.
//! SPDX-License-Identifier: MPL-2.0
//! This Source Code Form is subject to the terms of the Mozilla Public License,
//! v. 2.0. See third-party/eigen-license.txt or https://mozilla.org/MPL/2.0/.
//! Modified: scalar Rust software lanes, unfused SSE2 arithmetic, no Eigen ABI.

/// One lane of pexp_double, retained as a test-only counterexample. Fitting's
/// matrix-of-var value view disables this packet path; it uses scalar exp.
pub(crate) fn packet_exp(input: f64) -> f64 {
  if input.is_nan() {
    return input;
  }
  let x = input.clamp(-709.784, 709.784);
  let exponent = (std::f64::consts::LOG2_E * x + 0.5).floor();
  let x = (x - exponent * 0.693145751953125) - exponent * 1.4286068203094172e-6;
  let square = x * x;
  let numerator = ((1.2617719307481059e-4 * square + 3.0299440770744196e-2) * square + 1.0) * x;
  let denominator = ((3.0019850513866445e-6 * square + 2.524483403496841e-3) * square
    + 2.2726554820815503e-1)
    * square
    + 2.0;
  let reduced = 2.0 * (numerator / (denominator - numerator)) + 1.0;

  // pldexp_generic splits the exponent into four normal factors to avoid
  // premature underflow/overflow, including the subnormal output interval.
  let exponent = exponent as i64;
  let quarter = exponent >> 2;
  let factor = f64::from_bits(((quarter + 1023) as u64) << 52);
  let tail = f64::from_bits(((exponent - 3 * quarter + 1023) as u64) << 52);
  (((reduced * factor) * factor) * factor * tail).max(input)
}
