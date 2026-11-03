//! Versioned local integer RNG and transforms for predictive simulation and posterior sampling.
//! The exact transition, draw order and transforms are part of the simulation identity.

const INV_U32_RANGE: f64 = 1.0 / 4_294_967_296.0;

/// xoshiro128**'s jump polynomial, equivalent to 2^64 calls to `next_u32`.
const JUMP: [u32; 4] = [0x8764_000b, 0xf542_d2d3, 0x6fa0_35c3, 0x77f2_db5b];

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub(crate) enum SamplerError {
  Exhausted,
  NonFinite,
}

/// Four-word xoshiro128** state expanded from a caller-supplied u32 seed.
#[derive(Clone)]
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

  /// Advance by 2^64 outputs, giving a stream that cannot overlap the next 2^64 draws.
  pub(crate) fn jump(&mut self) {
    let mut jumped = [0_u32; 4];

    for word in JUMP {
      for bit in 0..32 {
        if word & (1 << bit) != 0 {
          for (target, source) in jumped.iter_mut().zip(self.state) {
            *target ^= source;
          }
        }
        self.next_u32();
      }
    }

    self.state = jumped;
  }

  /// Advance past `draws` integer outputs, as if each had been consumed by a transform.
  pub(crate) fn discard(&mut self, draws: usize) {
    for _ in 0..draws {
      self.next_u32();
    }
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

  /// One transition as a 128×128 matrix over GF(2): column `bit` is the image of that state bit.
  fn transition_columns() -> Vec<u128> {
    (0..128)
      .map(|bit| {
        let basis = 1_u128 << bit;
        let mut rng = SimulationRng {
          state: std::array::from_fn(|word| (basis >> (32 * word)) as u32),
        };
        rng.next_u32();
        pack(rng.state)
      })
      .collect()
  }

  fn pack(state: [u32; 4]) -> u128 {
    state.iter().enumerate().fold(0, |packed, (word, value)| {
      packed | u128::from(*value) << (32 * word)
    })
  }

  fn apply(columns: &[u128], vector: u128) -> u128 {
    (0..128)
      .filter(|bit| vector >> bit & 1 == 1)
      .fold(0, |image, bit| image ^ columns[bit])
  }

  #[test]
  fn jump_matches_the_transition_raised_to_two_to_the_sixty_four() {
    // Squaring the transition 64 times gives an independent derivation of the jump.
    let mut power = transition_columns();
    for _ in 0..64 {
      power = power.iter().map(|column| apply(&power, *column)).collect();
    }

    for seed in [0, 1, 42, u32::MAX] {
      let mut rng = SimulationRng::new(seed);
      let expected = apply(&power, pack(rng.state));
      rng.jump();

      assert_eq!(pack(rng.state), expected);
    }
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

    let mut skipped = SimulationRng::new(42);
    let mut consumed = SimulationRng::new(42);
    skipped.discard(6);
    for _ in 0..3 {
      consumed.normal();
    }
    assert_eq!(skipped.uniform(), consumed.uniform());

    let mut steps = 0;
    assert_eq!(
      first.poisson(16.0, &mut steps),
      Err(SamplerError::Exhausted)
    );
  }
}
