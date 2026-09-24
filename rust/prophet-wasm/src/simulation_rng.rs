//! Versioned local integer RNG and transforms for MAP predictive simulation.
//! The exact transition, draw order and transforms are part of the simulation identity.

const INV_U32_RANGE: f64 = 1.0 / 4_294_967_296.0;

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub(crate) enum SamplerError {
  Exhausted,
  NonFinite,
}

/// Four-word xoshiro128** state expanded from a caller-supplied u32 seed.
pub(crate) struct SimulationRng {
  state: [u32; 4],
}

impl SimulationRng {
  pub(crate) fn new(seed: u32) -> Self {
    let mut x = seed;
    let state = std::array::from_fn(|_| {
      x = x.wrapping_add(0x9e37_79b9);
      let mut z = x;
      z = (z ^ (z >> 16)).wrapping_mul(0x85eb_ca6b);
      z = (z ^ (z >> 13)).wrapping_mul(0xc2b2_ae35);
      z ^ (z >> 16)
    });

    Self { state }
  }

  fn next_u32(&mut self) -> u32 {
    let [s0, s1, s2, s3] = self.state;
    let result = s1.wrapping_mul(5).rotate_left(7).wrapping_mul(9);
    let shift = s1 << 9;

    self.state = [
      s0 ^ s3 ^ s1,
      s1 ^ s2 ^ s0,
      s2 ^ s0 ^ shift,
      (s3 ^ s1).rotate_left(11),
    ];

    result
  }

  /// One open-interval uniform; endpoint avoidance keeps log transforms finite.
  pub(crate) fn uniform(&mut self) -> f64 {
    (f64::from(self.next_u32()) + 0.5) * INV_U32_RANGE
  }

  pub(crate) fn laplace(&mut self, scale: f64) -> f64 {
    let uniform = self.uniform();
    let centered = uniform - 0.5;

    -scale * centered.signum() * (-2.0 * centered.abs()).ln_1p()
  }

  /// Consume two uniforms per row. The second Box–Muller variate is discarded.
  pub(crate) fn normal(&mut self) -> f64 {
    let radius = (-2.0 * self.uniform().ln()).sqrt();
    let angle = std::f64::consts::TAU * self.uniform();

    radius * angle.cos()
  }

  /// Sum independent Poisson counts in chunks of rate at most 16.
  pub(crate) fn poisson(
    &mut self,
    rate: f64,
    remaining_steps: &mut usize,
  ) -> Result<usize, SamplerError> {
    if !rate.is_finite() || rate < 0.0 {
      return Err(SamplerError::NonFinite);
    }

    let mut left = rate;
    let mut total = 0_usize;

    while left > 0.0 {
      let chunk = left.min(16.0);
      let uniform = self.uniform();
      let mut term = (-chunk).exp();
      let mut cumulative = term;
      let mut count = 0_usize;

      while uniform >= cumulative {
        if *remaining_steps == 0 {
          return Err(SamplerError::Exhausted);
        }

        *remaining_steps -= 1;
        count += 1;
        term *= chunk / count as f64;
        cumulative += term;

        if !cumulative.is_finite() || term == 0.0 {
          return Err(SamplerError::NonFinite);
        }
      }

      total = total.checked_add(count).ok_or(SamplerError::Exhausted)?;
      left -= chunk;
    }

    Ok(total)
  }
}

#[cfg(test)]
mod tests {
  use super::{SamplerError, SimulationRng};

  #[test]
  fn matches_independently_calculated_integer_vectors_for_seed_endpoints() {
    let mut zero = SimulationRng::new(0);
    let mut maximum = SimulationRng::new(u32::MAX);

    assert_eq!(
      (0..5).map(|_| zero.next_u32()).collect::<Vec<_>>(),
      [
        3_809_008_728,
        1_133_695_204,
        53_579_671,
        2_891_528_803,
        139_681_546
      ]
    );
    assert_eq!(
      (0..5).map(|_| maximum.next_u32()).collect::<Vec<_>>(),
      [
        835_879_718,
        1_921_286_648,
        2_356_205_009,
        1_885_780_724,
        980_451_116
      ]
    );
  }

  #[test]
  fn consumes_bounded_finite_transforms_and_replays_without_global_state() {
    let mut first = SimulationRng::new(42);
    let mut unrelated = SimulationRng::new(7);
    let mut replay = SimulationRng::new(42);

    for _ in 0..100 {
      let a = (first.uniform(), first.normal(), first.laplace(0.1));
      unrelated.uniform();
      let b = (replay.uniform(), replay.normal(), replay.laplace(0.1));

      assert_eq!(a, b);
      assert!(a.0 > 0.0 && a.0 < 1.0 && a.1.is_finite() && a.2.is_finite());
    }

    let mut steps = 0;
    assert_eq!(
      first.poisson(16.0, &mut steps),
      Err(SamplerError::Exhausted)
    );
  }
}
