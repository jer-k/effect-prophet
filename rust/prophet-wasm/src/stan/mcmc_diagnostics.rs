//! Stan 2.37.0's split rank-normalized R-hat and effective sample size.
//! Ported from analyze/mcmc/{split_rank_normalized_rhat,split_rank_normalized_ess,
//! rank_normalization,rhat,ess,autocovariance,split_chains,check_chains}.hpp at
//! 1357c136bf22e3f0d25ed3529fea55fe76842eac; see third-party/stan-license.txt.
//! Autocovariances are summed directly instead of through Eigen's FFT.

use crate::quantile::sorted_quantile;

/// Convergence diagnostics for one scalar quantity across chains. `NaN` when undefined,
/// as in Stan: a chain doesn't vary, a value isn't finite, or the chains are too short.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct ConvergenceDiagnostics {
  pub rhat_bulk: f64,
  pub rhat_tail: f64,
  pub ess_bulk: f64,
  pub ess_tail: f64,
}

/// Diagnose one quantity from equal-length chains, each in draw order.
pub fn convergence_diagnostics(chains: &[&[f64]]) -> ConvergenceDiagnostics {
  let split = split_chains(chains);
  let undefined = ConvergenceDiagnostics {
    rhat_bulk: f64::NAN,
    rhat_tail: f64::NAN,
    ess_bulk: f64::NAN,
    ess_tail: f64::NAN,
  };

  if split.is_empty() || split[0].is_empty() || !is_finite_and_varies(&split) {
    return undefined;
  }

  let mut pooled: Vec<f64> = split.iter().flatten().copied().collect();
  pooled.sort_unstable_by(f64::total_cmp);
  let median = sorted_quantile(&pooled, 0.5);
  let folded = map(&split, |value| (value - median).abs());

  let rhat_bulk = rhat(&rank_transform(&split));
  let rhat_tail = rhat(&rank_transform(&folded));

  if split[0].len() < 4 {
    return ConvergenceDiagnostics {
      rhat_bulk,
      rhat_tail,
      ..undefined
    };
  }

  let lower = sorted_quantile(&pooled, 0.05);
  let upper = sorted_quantile(&pooled, 0.95);
  let indicator = |condition: bool| if condition { 1.0 } else { 0.0 };
  let ess_tail_05 = ess(&map(&split, |value| indicator(value <= lower)));
  let ess_tail_95 = ess(&map(&split, |value| indicator(value >= upper)));

  let ess_tail = if ess_tail_05.is_nan() {
    ess_tail_95
  } else if ess_tail_95.is_nan() {
    ess_tail_05
  } else {
    ess_tail_05.min(ess_tail_95)
  };

  ConvergenceDiagnostics {
    rhat_bulk,
    rhat_tail,
    ess_bulk: ess(&rank_transform(&split)),
    ess_tail,
  }
}

fn map(chains: &[Vec<f64>], transform: impl Fn(f64) -> f64) -> Vec<Vec<f64>> {
  chains
    .iter()
    .map(|chain| chain.iter().map(|value| transform(*value)).collect())
    .collect()
}

/// Halve each chain, dropping the middle draw of an odd-length chain.
fn split_chains(chains: &[&[f64]]) -> Vec<Vec<f64>> {
  let draws = chains.iter().map(|chain| chain.len()).min().unwrap_or(0);
  let half = draws / 2;
  let tail_start = draws.div_ceil(2);

  chains
    .iter()
    .flat_map(|chain| {
      [
        chain[..half].to_vec(),
        chain[tail_start..tail_start + half].to_vec(),
      ]
    })
    .collect()
}

/// Eigen's `isApprox` for scalars, at its default double precision.
fn is_approx(a: f64, b: f64) -> bool {
  (a - b).abs() <= a.abs().min(b.abs()) * 1e-12
}

fn is_finite_and_varies(chains: &[Vec<f64>]) -> bool {
  for chain in chains {
    if chain.iter().any(|value| !value.is_finite()) {
      return false;
    }
    if chain.iter().all(|value| is_approx(*value, chain[0])) {
      return false;
    }
  }

  !(chains.len() > 1 && chains.iter().all(|chain| is_approx(chain[0], chains[0][0])))
}

/// Replace each draw by the normal quantile of its pooled fractional rank, averaging ties.
fn rank_transform(chains: &[Vec<f64>]) -> Vec<Vec<f64>> {
  let draws = chains[0].len();
  let size = draws * chains.len();

  let mut order: Vec<(f64, usize)> = chains.iter().flatten().copied().zip(0..).collect();
  order.sort_unstable_by(|a, b| a.0.total_cmp(&b.0).then(a.1.cmp(&b.1)));

  let mut ranks = vec![vec![0.0; draws]; chains.len()];
  let mut start = 0;

  while start < size {
    let mut end = start + 1;
    while end < size && order[end].0 == order[start].0 {
      end += 1;
    }

    // Ranks start at one: the tied run `start..end` shares the mean of `start + 1..=end`.
    let average_rank = (start + 1 + end) as f64 / 2.0;
    let normal = inverse_normal_cdf((average_rank - 0.375) / (size as f64 + 0.25));
    for (_, index) in &order[start..end] {
      ranks[index / draws][index % draws] = normal;
    }

    start = end;
  }

  ranks
}

fn mean(values: &[f64]) -> f64 {
  values.iter().sum::<f64>() / values.len() as f64
}

/// Stan Math's `variance`, with the `n - 1` denominator.
fn sample_variance(values: &[f64]) -> f64 {
  let center = mean(values);
  values
    .iter()
    .map(|value| (value - center).powi(2))
    .sum::<f64>()
    / (values.len() as f64 - 1.0)
}

fn rhat(chains: &[Vec<f64>]) -> f64 {
  let chain_count = chains.len() as f64;
  let draws = chains[0].len() as f64;

  let means: Vec<f64> = chains.iter().map(|chain| mean(chain)).collect();
  let across = mean(&means);
  let between = draws
    * means
      .iter()
      .map(|value| (value - across).powi(2))
      .sum::<f64>()
    / (chain_count - 1.0);
  let within = chains
    .iter()
    .zip(&means)
    .map(|(chain, center)| {
      chain
        .iter()
        .map(|value| (value - center).powi(2))
        .sum::<f64>()
        / (draws - 1.0)
    })
    .sum::<f64>()
    / chain_count;

  ((between / within + draws - 1.0) / draws).sqrt()
}

/// Lag-`t` autocovariances with the population (`n`) denominator, as Stan's FFT gives them.
fn autocovariance(chain: &[f64]) -> Vec<f64> {
  let n = chain.len();
  let center = mean(chain);
  let centered: Vec<f64> = chain.iter().map(|value| value - center).collect();

  (0..n)
    .map(|lag| {
      centered[..n - lag]
        .iter()
        .zip(&centered[lag..])
        .map(|(a, b)| a * b)
        .sum::<f64>()
        / n as f64
    })
    .collect()
}

/// Geyer's initial monotone sequence estimate over chains of at least four draws.
fn ess(chains: &[Vec<f64>]) -> f64 {
  let chain_count = chains.len();
  let draws = chains[0].len();

  let acov: Vec<Vec<f64>> = chains.iter().map(|chain| autocovariance(chain)).collect();
  let chain_means: Vec<f64> = chains.iter().map(|chain| mean(chain)).collect();
  let chain_variances: Vec<f64> = acov
    .iter()
    .map(|lags| lags[0] * draws as f64 / (draws as f64 - 1.0))
    .collect();

  let within = mean(&chain_variances);
  let mut var_plus = within * (draws as f64 - 1.0) / draws as f64;
  if chain_count > 1 {
    var_plus += sample_variance(&chain_means);
  }

  let lag_mean = |lag: usize| acov.iter().map(|lags| lags[lag]).sum::<f64>() / chain_count as f64;
  let correlation = |lag: usize| 1.0 - (within - lag_mean(lag)) / var_plus;

  let mut rho_hat = vec![0.0; draws];
  let mut rho_hat_even = 1.0;
  rho_hat[0] = rho_hat_even;
  let mut rho_hat_odd = correlation(1);
  rho_hat[1] = rho_hat_odd;

  let mut t = 1;
  while t < draws - 4 && rho_hat_even + rho_hat_odd > 0.0 && !(rho_hat_even + rho_hat_odd).is_nan()
  {
    rho_hat_even = correlation(t + 1);
    rho_hat_odd = correlation(t + 2);

    if rho_hat_even + rho_hat_odd >= 0.0 {
      rho_hat[t + 1] = rho_hat_even;
      rho_hat[t + 2] = rho_hat_odd;
    }

    // Keep the paired sums monotone.
    if rho_hat[t + 1] + rho_hat[t + 2] > rho_hat[t - 1] + rho_hat[t] {
      rho_hat[t + 1] = (rho_hat[t - 1] + rho_hat[t]) / 2.0;
      rho_hat[t + 2] = rho_hat[t + 1];
    }

    t += 2;
  }

  let max_t = t;
  if rho_hat_even > 0.0 {
    rho_hat[max_t + 1] = rho_hat_even;
  }

  let total = (chain_count * draws) as f64;
  let tau_hat = (-1.0 + 2.0 * rho_hat[..max_t].iter().sum::<f64>() + rho_hat[max_t + 1])
    .max(1.0 / total.log10());

  total / tau_hat
}

/// The standard normal quantile by Wichura's AS241 (1988), accurate to about 1e-16.
// The coefficients keep the published digits so they can be checked against the paper.
#[allow(clippy::excessive_precision)]
pub(crate) fn inverse_normal_cdf(p: f64) -> f64 {
  let q = p - 0.5;

  if q.abs() <= 0.425 {
    let r = 0.180625 - q * q;
    let numerator = polynomial(
      r,
      &[
        3.387_132_872_796_366_608,
        1.331_416_678_917_843_774_5e2,
        1.971_590_950_306_551_442_7e3,
        1.373_169_376_550_946_112_5e4,
        4.592_195_393_154_987_145_7e4,
        6.726_577_092_700_870_085_3e4,
        3.343_057_558_358_812_810_5e4,
        2.509_080_928_730_122_672_7e3,
      ],
    );
    let denominator = polynomial(
      r,
      &[
        1.0,
        4.231_333_070_160_091_125_2e1,
        6.871_870_074_920_579_083e2,
        5.394_196_021_424_751_107_7e3,
        2.121_379_430_158_659_586_7e4,
        3.930_789_580_009_271_061e4,
        2.872_908_573_572_194_267_4e4,
        5.226_495_278_852_854_561e3,
      ],
    );
    return q * numerator / denominator;
  }

  let tail = if q <= 0.0 { p } else { 1.0 - p };
  let r = (-tail.ln()).sqrt();

  let value = if r <= 5.0 {
    let r = r - 1.6;
    polynomial(
      r,
      &[
        1.423_437_110_749_683_577_34,
        4.630_337_846_156_545_295_9,
        5.769_497_221_460_691_405_5,
        3.647_848_324_763_204_605_04,
        1.270_458_252_452_368_382_58,
        2.417_807_251_774_506_117_7e-1,
        2.272_384_498_926_918_458_33e-2,
        7.745_450_142_783_414_076_4e-4,
      ],
    ) / polynomial(
      r,
      &[
        1.0,
        2.053_191_626_637_758_821_87,
        1.676_384_830_183_803_849_4,
        6.897_673_349_851_000_045_5e-1,
        1.481_039_764_274_800_745_9e-1,
        1.519_866_656_361_645_719_66e-2,
        5.475_938_084_995_344_946e-4,
        1.050_750_071_644_416_843_24e-9,
      ],
    )
  } else {
    let r = r - 5.0;
    polynomial(
      r,
      &[
        6.657_904_643_501_103_777_2,
        5.463_784_911_164_114_369_9,
        1.784_826_539_917_291_335_8,
        2.965_605_718_285_048_912_3e-1,
        2.653_218_952_657_612_309_3e-2,
        1.242_660_947_388_078_438_6e-3,
        2.711_555_568_743_487_578_15e-5,
        2.010_334_399_292_288_132_65e-7,
      ],
    ) / polynomial(
      r,
      &[
        1.0,
        5.998_322_065_558_879_376_9e-1,
        1.369_298_809_227_358_053_1e-1,
        1.487_536_129_085_061_485_25e-2,
        7.868_691_311_456_132_591e-4,
        1.846_318_317_510_054_681_8e-5,
        1.421_511_758_316_445_888_7e-7,
        2.044_263_103_389_939_785_64e-15,
      ],
    )
  };

  if q < 0.0 { -value } else { value }
}

/// Horner evaluation of `coefficients[0] + coefficients[1] x + ...`.
fn polynomial(x: f64, coefficients: &[f64]) -> f64 {
  coefficients
    .iter()
    .rev()
    .fold(0.0, |total, coefficient| total * x + coefficient)
}

#[cfg(test)]
mod tests {
  use super::{ConvergenceDiagnostics, convergence_diagnostics, inverse_normal_cdf};
  use crate::simulation_rng::SimulationRng;

  #[test]
  fn inverse_normal_cdf_matches_python_normal_dist() {
    // Python 3.14: statistics.NormalDist().inv_cdf(p), which also implements AS241.
    let expected = [
      (1e-300, -37.0470962993612),
      (1e-10, -6.361340902404057),
      (0.001, -3.090232306167813),
      (0.025, -1.9599639845400538),
      (0.075, -1.439531470938456),
      (0.5, 0.0),
      (0.9, 1.2815515655446006),
      (0.975, 1.9599639845400534),
      (0.999999, 4.753424308817086),
    ];

    for (p, quantile) in expected {
      let actual = inverse_normal_cdf(p);
      assert!(
        (actual - quantile).abs() <= 1e-15 * quantile.abs().max(1.0),
        "{p}: {actual} vs {quantile}"
      );
    }
  }

  fn normal_chains(seed: u32, chains: usize, draws: usize, shift: f64) -> Vec<Vec<f64>> {
    let mut rng = SimulationRng::new(seed);
    (0..chains)
      .map(|chain| {
        (0..draws)
          .map(|_| rng.normal() + if chain == 0 { shift } else { 0.0 })
          .collect()
      })
      .collect()
  }

  fn diagnose(chains: &[Vec<f64>]) -> ConvergenceDiagnostics {
    let slices: Vec<&[f64]> = chains.iter().map(Vec::as_slice).collect();
    convergence_diagnostics(&slices)
  }

  #[test]
  fn independent_draws_mix_and_count_about_once_each() {
    let diagnostics = diagnose(&normal_chains(3, 4, 500, 0.0));

    assert!(
      (diagnostics.rhat_bulk - 1.0).abs() < 0.01,
      "{diagnostics:?}"
    );
    assert!(
      (diagnostics.rhat_tail - 1.0).abs() < 0.01,
      "{diagnostics:?}"
    );
    assert!(diagnostics.ess_bulk > 1_500.0 && diagnostics.ess_bulk < 2_600.0);
    assert!(diagnostics.ess_tail > 1_200.0 && diagnostics.ess_tail < 2_600.0);
  }

  #[test]
  fn a_shifted_chain_raises_rhat() {
    let diagnostics = diagnose(&normal_chains(3, 4, 500, 3.0));

    assert!(diagnostics.rhat_bulk > 1.2, "{diagnostics:?}");
  }

  #[test]
  fn autocorrelated_draws_lower_ess() {
    let mut rng = SimulationRng::new(9);
    let chains: Vec<Vec<f64>> = (0..4)
      .map(|_| {
        let mut state = 0.0;
        (0..1_000)
          .map(|_| {
            state = 0.9 * state + rng.normal();
            state
          })
          .collect()
      })
      .collect();

    // An AR(1) chain with coefficient 0.9 has ESS about n (1 - 0.9) / (1 + 0.9).
    let diagnostics = diagnose(&chains);
    assert!(
      diagnostics.ess_bulk > 120.0 && diagnostics.ess_bulk < 320.0,
      "{diagnostics:?}"
    );
  }

  #[test]
  fn constant_non_finite_or_short_chains_are_undefined() {
    let constant = vec![vec![1.0; 10]; 4];
    assert!(diagnose(&constant).rhat_bulk.is_nan());

    let mut non_finite = normal_chains(1, 4, 10, 0.0);
    non_finite[2][3] = f64::INFINITY;
    assert!(diagnose(&non_finite).ess_bulk.is_nan());

    // Six draws split into halves of three: R-hat is defined, ESS needs four.
    let short = diagnose(&normal_chains(1, 4, 6, 0.0));
    assert!(short.rhat_bulk.is_finite() && short.ess_bulk.is_nan());
  }

  #[test]
  fn odd_length_chains_drop_their_middle_draw() {
    let mut odd = normal_chains(5, 2, 9, 0.0);
    let even: Vec<Vec<f64>> = odd
      .iter()
      .map(|chain| [&chain[..4], &chain[5..]].concat())
      .collect();
    // Changing the dropped middle draw changes nothing.
    for chain in &mut odd {
      chain[4] = 1e6;
    }

    assert_eq!(diagnose(&odd), diagnose(&even));
  }
}
