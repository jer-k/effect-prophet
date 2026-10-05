//! Fixed IEEE-754 arithmetic for the frozen reference's transcendental path.
//! Adapted from Arm optimized-routines 375f32ed2f7098090f41795ad363822752a25a65.
//! Copyright (c) 2018-2025 Arm Limited. SPDX-License-Identifier: MIT
//! Modified: pure Rust, explicit fused operations, no errno/fenv or ABI aliases.

mod data;

/// `-ln(2) / 128`, high part. Its 36 significant bits make `kd * NEG_LN2_HI_N`
/// exact for every integer `|kd| < 2^17`.
const NEG_LN2_HI_N: u64 = 0xbf762e42fefa0000;

/// Largest exclusive `|kd|` for which `kd * NEG_LN2_HI_N` is exact.
const EXACT_REDUCTION_LIMIT: f64 = 131_072.0;

/// Table-based exponential with explicit round-to-nearest fused evaluation.
pub(crate) fn exp(x: f64) -> f64 {
  if x.is_nan() {
    return x;
  }
  if x == f64::NEG_INFINITY {
    return 0.0;
  }
  if x == f64::INFINITY {
    return x;
  }
  if x.abs() < f64::from_bits(0x3c90000000000000) {
    return 1.0 + x;
  }
  if x >= 1024.0 {
    return f64::INFINITY;
  }
  if x <= -1024.0 {
    return 0.0;
  }

  let shift = f64::from_bits(0x4338000000000000);
  let z = x * (128.0 * f64::from_bits(0x3ff71547652b82fe));
  let rounded = z + shift;
  let ki = rounded.to_bits();
  let kd = rounded - shift;
  // An exact product rounds only once when added, exactly as the fused form
  // does, and avoids WASM's software `fma` for every `|x|` below about 709.
  let r = if kd.abs() < EXACT_REDUCTION_LIMIT {
    kd * f64::from_bits(NEG_LN2_HI_N) + x
  } else {
    kd.mul_add(f64::from_bits(NEG_LN2_HI_N), x)
  };
  let r = kd.mul_add(f64::from_bits(0xbd0cf79abc9e3b3a), r);
  let index = 2 * (ki % 128) as usize;
  let sbits = data::EXP_TABLE[index + 1].wrapping_add(ki.wrapping_shl(45));
  let tail = f64::from_bits(data::EXP_TABLE[index]);
  let r2 = r * r;
  let first = r.mul_add(
    f64::from_bits(0x3fc555555555543c),
    f64::from_bits(0x3fdffffffffffdbd),
  );
  let second = r.mul_add(
    f64::from_bits(0x3f81111167a4d017),
    f64::from_bits(0x3fa55555cf172b91),
  );
  let tmp = (r2 * r2).mul_add(second, r2.mul_add(first, tail + r));

  if x.abs() < 512.0 {
    let scale = f64::from_bits(sbits);
    return scale.mul_add(tmp, scale);
  }

  if ki & 0x80000000 == 0 {
    let scale = f64::from_bits(sbits.wrapping_sub(1009_u64 << 52));
    return f64::from_bits(0x7f00000000000000) * scale.mul_add(tmp, scale);
  }

  let scale = f64::from_bits(sbits.wrapping_add(1022_u64 << 52));
  let mut y = scale.mul_add(tmp, scale);
  if y < 1.0 {
    let lo = scale.mul_add(tmp, scale - y);
    let hi = 1.0 + y;
    let lo = 1.0 - hi + y + lo;
    y = (hi + lo) - 1.0;
    if y == 0.0 {
      y = 0.0;
    }
  }
  f64::from_bits(0x0010000000000000) * y
}

#[cfg(test)]
mod tests {
  use super::{EXACT_REDUCTION_LIMIT, NEG_LN2_HI_N, exp};

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn unfused_high_reduction_matches_fused_for_every_exact_kd() {
    let high = f64::from_bits(NEG_LN2_HI_N);
    let limit = EXACT_REDUCTION_LIMIT as i64;
    let offsets = [0.0, 1e-300, -3.0e-17, 0.4, -177.25, 709.0];

    for kd in -(limit - 1)..limit {
      let kd = kd as f64;
      for offset in offsets {
        // Shape `x` as `exp` sees it: near `kd * ln(2) / 128` plus an offset.
        let x = -kd * high + offset * 1e-3;
        assert_eq!(
          (kd * high + x).to_bits(),
          kd.mul_add(high, x).to_bits(),
          "kd {kd} x {x:e}"
        );
      }
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn matches_reference_libm_including_subnormal_and_overflow_boundaries() {
    // Pinned amd64 fixture image's libm, evaluated independently of fitting.
    let cases = [
      (0xc087500000000000, 0x0000000000000000),
      (0xc087480000000000, 0x0000000000000001),
      (0xc086300000000000, 0x00033802fd28b3c3),
      (0xc086280000000000, 0x0008bfe55de02338),
      (0xc085e00000000000, 0x00d14f2b0fb9307f),
      (0xc080000000000000, 0x11c44109edb20931),
      (0xc024000000000000, 0x3f07cd79b5647c9b),
      (0xbff0000000000000, 0x3fd78b56362cef38),
      (0xbbc79ca10c924223, 0x3ff0000000000000),
      (0x0000000000000000, 0x3ff0000000000000),
      (0x3bc79ca10c924223, 0x3ff0000000000000),
      (0x3ff0000000000000, 0x4005bf0a8b145769),
      (0x4024000000000000, 0x40d5829dcf950560),
      (0x4080000000000000, 0x6e19476504ba852e),
      (0x4085e00000000000, 0x7f0d945df4f8ec8e),
      (0x4086280000000000, 0x7fdd422d2be5dc9b),
      (0x40862e3d70a3d70a, 0x7fefe9ce5c4c52b4),
      (0x40862e6666666666, 0x7ff0000000000000),
    ];
    for (input, expected) in cases {
      assert_eq!(exp(f64::from_bits(input)).to_bits(), expected, "{input:x}");
    }
    assert_eq!(exp(f64::NEG_INFINITY), 0.0);
    assert_eq!(exp(f64::INFINITY), f64::INFINITY);
    assert!(exp(f64::NAN).is_nan());
  }
}
