use super::{MetricAdaptation, NutsChain, NutsError, NutsSettings, sample_nuts};
use crate::map_objective::{MapObjectiveError, StanLinearObjective};
use crate::mixed_map::ComponentMode;
use crate::stan::linear_optimizer::{LinearOptimizerOptions, StanMapObjective};
use crate::stan::mcmc_diagnostics::convergence_diagnostics;
use crate::stan::optimizer::LogDensityEvaluation;

type Density = Result<LogDensityEvaluation, MapObjectiveError>;

/// Independent normals with the given scales.
fn normals(scales: &[f64]) -> impl Fn(&[f64]) -> Density + '_ {
  move |q| {
    Ok(LogDensityEvaluation {
      value: q
        .iter()
        .zip(scales)
        .map(|(x, scale)| -0.5 * (x / scale).powi(2))
        .sum(),
      gradient: q
        .iter()
        .zip(scales)
        .map(|(x, scale)| -x / scale.powi(2))
        .collect(),
    })
  }
}

fn column(chains: &[NutsChain], dimension: usize, index: usize) -> Vec<Vec<f64>> {
  chains
    .iter()
    .map(|chain| {
      chain
        .draws
        .chunks_exact(dimension)
        .map(|draw| draw[index])
        .collect()
    })
    .collect()
}

fn moments(chains: &[Vec<f64>]) -> (f64, f64) {
  let pooled: Vec<f64> = chains.iter().flatten().copied().collect();
  let mean = pooled.iter().sum::<f64>() / pooled.len() as f64;
  let variance =
    pooled.iter().map(|x| (x - mean).powi(2)).sum::<f64>() / (pooled.len() as f64 - 1.0);
  (mean, variance)
}

fn rhat_bulk(chains: &[Vec<f64>]) -> f64 {
  let slices: Vec<&[f64]> = chains.iter().map(Vec::as_slice).collect();
  convergence_diagnostics(&slices).rhat_bulk
}

/// Windows that close, as `(counter, window size)`, over a whole warmup.
fn metric_updates(warmup: usize) -> Vec<u32> {
  let mut adaptation = MetricAdaptation::new(1, &NutsSettings::cmdstan(warmup, 1));
  let mut metric = vec![1.0];

  (0..warmup)
    .filter_map(|iteration| {
      adaptation
        .learn(&mut metric, &[iteration as f64])
        .unwrap()
        .then_some(iteration as u32)
    })
    .collect()
}

#[test]
fn metric_windows_follow_cmdstan_schedule() {
  // 75 / 25, 50, 100, 200, 500 / 50: each window ends at its last iteration.
  assert_eq!(metric_updates(1_000), [99, 149, 249, 449, 949]);
  // Exactly enough warmup for the configured buffers gives a single window.
  assert_eq!(metric_updates(150), [99]);
  assert_eq!(metric_updates(400), [99, 149, 349]);
}

#[test]
fn short_warmups_never_adapt_the_metric_like_cmdstan() {
  // CmdStan shrinks the buffers without restarting the schedule, so no window closes.
  for warmup in [0, 19, 20, 50, 149] {
    assert_eq!(metric_updates(warmup), Vec::<u32>::new(), "warmup {warmup}");
  }

  let chains = sample_nuts(
    &[0.0, 0.0],
    1,
    1,
    NutsSettings::cmdstan(100, 10),
    normals(&[0.1, 10.0]),
  )
  .unwrap();
  assert_eq!(chains[0].inverse_metric, [1.0, 1.0]);
}

#[test]
fn recovers_standard_normal_moments() {
  let dimension = 5;
  let scales = vec![1.0; dimension];
  let chains = sample_nuts(
    &vec![0.5; dimension],
    4,
    11,
    NutsSettings::cmdstan(500, 1_000),
    normals(&scales),
  )
  .unwrap();

  for index in 0..dimension {
    let draws = column(&chains, dimension, index);
    let (mean, variance) = moments(&draws);

    assert!(mean.abs() < 0.1, "mean {mean}");
    assert!((variance - 1.0).abs() < 0.15, "variance {variance}");
    assert!(rhat_bulk(&draws) < 1.02);
  }

  for chain in &chains {
    assert_eq!(chain.draws.len(), 1_000 * dimension);
    assert!(chain.divergent.iter().all(|divergent| !divergent));
    let mean_accept = chain.accept_stat.iter().sum::<f64>() / 1_000.0;
    assert!((0.65..=0.97).contains(&mean_accept), "accept {mean_accept}");
  }
}

#[test]
fn adapts_the_metric_to_very_different_scales() {
  let scales = [0.01, 1.0, 100.0];
  let chains = sample_nuts(
    &[0.0, 0.0, 0.0],
    4,
    5,
    NutsSettings::cmdstan(1_000, 500),
    normals(&scales),
  )
  .unwrap();

  for chain in &chains {
    for (inverse, scale) in chain.inverse_metric.iter().zip(scales) {
      let ratio = inverse / scale.powi(2);
      assert!(
        (0.5..2.0).contains(&ratio),
        "metric {inverse} for scale {scale}"
      );
    }
  }

  for (index, scale) in scales.iter().enumerate() {
    let draws = column(&chains, 3, index);
    let (mean, variance) = moments(&draws);

    assert!(mean.abs() < 0.1 * scale, "mean {mean}");
    assert!(
      (variance / scale.powi(2) - 1.0).abs() < 0.15,
      "variance {variance}"
    );
  }
}

#[test]
fn recovers_a_strong_correlation() {
  // Precision matrix of unit variances with correlation 0.9.
  let rho = 0.9_f64;
  let scale = 1.0 / (1.0 - rho * rho);
  let density = |q: &[f64]| {
    Ok(LogDensityEvaluation {
      value: -0.5 * scale * (q[0] * q[0] - 2.0 * rho * q[0] * q[1] + q[1] * q[1]),
      gradient: vec![-scale * (q[0] - rho * q[1]), -scale * (q[1] - rho * q[0])],
    })
  };
  let chains = sample_nuts(
    &[1.0, -1.0],
    4,
    2,
    NutsSettings::cmdstan(500, 1_000),
    density,
  )
  .unwrap();

  let x = column(&chains, 2, 0);
  let y = column(&chains, 2, 1);
  let (x_mean, x_variance) = moments(&x);
  let (y_mean, y_variance) = moments(&y);
  let pairs = x.iter().flatten().zip(y.iter().flatten());
  let covariance = pairs.map(|(a, b)| (a - x_mean) * (b - y_mean)).sum::<f64>() / 3_999.0;
  let correlation = covariance / (x_variance * y_variance).sqrt();

  assert!(
    (correlation - rho).abs() < 0.05,
    "correlation {correlation}"
  );
  assert!(rhat_bulk(&x) < 1.02 && rhat_bulk(&y) < 1.02);
}

#[test]
fn samples_a_laplace_kink() {
  // Prophet's changepoint prior: zero derivative at the kink, as Stan's.
  let b = 0.05;
  let density = |q: &[f64]| {
    Ok(LogDensityEvaluation {
      value: -q[0].abs() / b,
      gradient: vec![-q[0].signum() * f64::from(q[0] != 0.0) / b],
    })
  };
  // Eight long chains: one run's variance ratio has a standard deviation of about 0.045.
  let chains = sample_nuts(&[0.0], 8, 8, NutsSettings::cmdstan(500, 2_000), density).unwrap();
  let draws = column(&chains, 1, 0);
  let (mean, variance) = moments(&draws);

  assert!(mean.abs() < 0.01, "mean {mean}");
  assert!(
    (variance / (2.0 * b * b) - 1.0).abs() < 0.2,
    "variance {variance}"
  );
}

#[test]
fn rejected_states_never_appear_in_draws() {
  // A half-normal written as a density that rejects negative values.
  let density = |q: &[f64]| {
    if q[0] < 0.0 {
      Err(MapObjectiveError::NonFiniteResult)
    } else {
      Ok(LogDensityEvaluation {
        value: -0.5 * q[0] * q[0],
        gradient: vec![-q[0]],
      })
    }
  };
  // Rejections at the boundary cut the ESS, so use eight long chains.
  let chains = sample_nuts(&[1.0], 8, 4, NutsSettings::cmdstan(500, 2_000), density).unwrap();
  let draws = column(&chains, 1, 0);
  let (mean, _) = moments(&draws);

  assert!(draws.iter().flatten().all(|x| *x >= 0.0));
  assert!(
    (mean - (2.0 / std::f64::consts::PI).sqrt()).abs() < 0.06,
    "mean {mean}"
  );
  // Every rejection is reported as a divergence.
  assert!(
    chains
      .iter()
      .any(|chain| chain.divergent.iter().any(|d| *d))
  );
}

#[test]
fn reports_divergences_at_an_energy_cliff() {
  // The potential jumps by 5,000 at 1.5, far past Stan's 1,000 threshold.
  let density = |q: &[f64]| {
    Ok(LogDensityEvaluation {
      value: -0.5 * q[0] * q[0] - if q[0] > 1.5 { 5_000.0 } else { 0.0 },
      gradient: vec![-q[0]],
    })
  };
  let chains = sample_nuts(&[0.0], 2, 3, NutsSettings::cmdstan(200, 500), density).unwrap();

  let divergences: usize = chains
    .iter()
    .map(|chain| chain.divergent.iter().filter(|d| **d).count())
    .sum();
  assert!(divergences > 0);
  assert!(
    chains
      .iter()
      .all(|chain| chain.draws.iter().all(|x| *x <= 1.5))
  );
}

#[test]
fn caps_tree_depth() {
  let settings = NutsSettings {
    max_depth: 2,
    ..NutsSettings::cmdstan(100, 200)
  };
  // A very small step size forces long trajectories.
  let chains = sample_nuts(&[0.0], 1, 1, settings, normals(&[1.0])).unwrap();

  assert!(chains[0].tree_depth.iter().all(|depth| *depth <= 2));
  assert!(chains[0].leapfrog_steps.iter().all(|steps| *steps <= 3));
}

#[test]
fn chains_are_reproducible_and_independent() {
  let settings = NutsSettings::cmdstan(100, 100);
  let run = |chains, seed| sample_nuts(&[0.3, -0.2], chains, seed, settings, normals(&[1.0, 2.0]));

  let first = run(3, 42).unwrap();
  assert_eq!(first, run(3, 42).unwrap());
  // Each chain only depends on the seed and its position.
  assert_eq!(first[0], run(1, 42).unwrap()[0]);
  assert_ne!(first[0].draws, first[1].draws);
  assert_ne!(first[0].draws, run(1, 43).unwrap()[0].draws);
}

#[test]
fn rejects_invalid_settings_and_initial_states() {
  let density = normals(&[1.0]);
  let valid = NutsSettings::cmdstan(10, 10);
  let invalid = [
    NutsSettings { draws: 0, ..valid },
    NutsSettings {
      max_depth: 0,
      ..valid
    },
    NutsSettings {
      max_depth: 21,
      ..valid
    },
    NutsSettings {
      adapt_delta: 1.0,
      ..valid
    },
    NutsSettings {
      step_size: 0.0,
      ..valid
    },
    NutsSettings {
      adapt_t0: f64::NAN,
      ..valid
    },
  ];

  for settings in invalid {
    assert_eq!(
      sample_nuts(&[0.0], 1, 0, settings, &density),
      Err(NutsError::InvalidConfiguration)
    );
  }
  assert_eq!(
    sample_nuts(&[0.0], 0, 0, valid, &density),
    Err(NutsError::InvalidConfiguration)
  );
  assert_eq!(
    sample_nuts(&[], 1, 0, valid, &density),
    Err(NutsError::InvalidConfiguration)
  );
  assert_eq!(
    sample_nuts(&[f64::NAN], 1, 0, valid, &density),
    Err(NutsError::InvalidConfiguration)
  );

  let rejecting = |_: &[f64]| -> Density { Err(MapObjectiveError::NonFiniteResult) };
  assert_eq!(
    sample_nuts(&[0.0], 1, 0, valid, rejecting),
    Err(NutsError::InitialDensity)
  );
}

#[test]
fn propagates_density_failures_and_stan_step_size_errors() {
  let valid = NutsSettings::cmdstan(10, 10);

  let malformed = |_: &[f64]| -> Density { Err(MapObjectiveError::InvalidDimensions) };
  assert_eq!(
    sample_nuts(&[0.0], 1, 0, valid, malformed),
    Err(NutsError::Objective(MapObjectiveError::InvalidDimensions))
  );

  let short_gradient = |_: &[f64]| -> Density {
    Ok(LogDensityEvaluation {
      value: 0.0,
      gradient: vec![],
    })
  };
  assert_eq!(
    sample_nuts(&[0.0], 1, 0, valid, short_gradient),
    Err(NutsError::InvalidConfiguration)
  );

  // A flat density accepts every step size: Stan's "Posterior is improper".
  let flat = |_: &[f64]| -> Density {
    Ok(LogDensityEvaluation {
      value: 0.0,
      gradient: vec![0.0],
    })
  };
  assert_eq!(
    sample_nuts(&[0.0], 1, 0, valid, flat),
    Err(NutsError::ImproperPosterior)
  );

  // Once the step underflows, a deterministic density accepts the unmoved state, so only a
  // density that rejects every later evaluation drives Stan's search to zero.
  let evaluations = std::cell::Cell::new(0);
  let rejects_after_start = |q: &[f64]| -> Density {
    evaluations.set(evaluations.get() + 1);
    if evaluations.get() == 1 {
      Ok(LogDensityEvaluation {
        value: -0.5 * q[0] * q[0],
        gradient: vec![-q[0]],
      })
    } else {
      Err(MapObjectiveError::NonFiniteResult)
    }
  };
  assert_eq!(
    sample_nuts(&[0.0], 1, 0, valid, rejects_after_start),
    Err(NutsError::StepSizeCollapse)
  );
}

#[test]
fn samples_prophet_linear_posterior_around_its_map() {
  // Forty rows of a linear trend with one changepoint and one additive feature, scaled as
  // Prophet scales them. Design rows are `[1, t, changepoint indicator, feature]`.
  let rows = 40;
  let mut design = Vec::with_capacity(rows * 4);
  let mut target = Vec::with_capacity(rows);
  let mut rng = crate::simulation_rng::SimulationRng::new(17);
  for row in 0..rows {
    let t = row as f64 / (rows - 1) as f64;
    let feature = (std::f64::consts::TAU * 3.0 * t).sin();
    design.extend_from_slice(&[1.0, t, f64::from(t >= 0.5), feature]);
    target.push(0.2 + 0.5 * t + 0.1 * feature + 0.02 * rng.normal());
  }
  let modes = [ComponentMode::Additive];
  let objective =
    StanLinearObjective::new(&design, &target, &[0.5], &[10.0], &modes, 0.05).unwrap();

  let map = objective
    .fit_stan(LinearOptimizerOptions::default())
    .unwrap()
    .parameters;
  let dimension = objective.parameter_count();
  let chains = sample_nuts(
    &objective.initial_parameters(),
    4,
    3,
    // Python's default warmup for `mcmc_samples=300`, with longer chains for a stable R-hat.
    NutsSettings::cmdstan(150, 400),
    |q| objective.evaluate_posterior(q),
  )
  .unwrap();

  // `[k, m, delta, log(sigma), beta]`
  for index in [0, 1, 4] {
    let draws = column(&chains, dimension, index);
    let (mean, variance) = moments(&draws);

    assert!(rhat_bulk(&draws) < 1.05, "rhat for {index}");
    assert!(
      (mean - map[index]).abs() < 3.0 * variance.sqrt(),
      "mean for {index}"
    );
  }

  let log_sigma = column(&chains, dimension, 3);
  let sigma: Vec<f64> = log_sigma.iter().flatten().map(|u| u.exp()).collect();
  let sigma_mean = sigma.iter().sum::<f64>() / sigma.len() as f64;
  assert!((0.015..0.03).contains(&sigma_mean), "sigma {sigma_mean}");
}

#[test]
fn posterior_density_adds_the_sigma_jacobian() {
  let rows = 4;
  let design = [1.0, 0.0, 1.0, 1.0, 0.3, -1.0, 1.0, 0.6, 0.5, 1.0, 1.0, 0.0];
  let target = [0.5, 0.75, 0.25, 1.0];
  let modes = [ComponentMode::Additive];
  let objective = StanLinearObjective::new(&design, &target, &[], &[10.0], &modes, 0.05).unwrap();
  assert_eq!(objective.observation_count(), rows);

  let point = [0.1, 0.6, 0.0, -1.2, 0.3];
  let map = objective.evaluate(&point).unwrap();
  let posterior = objective.evaluate_posterior(&point).unwrap();

  assert_eq!(posterior.value, map.value + point[3]);
  assert_eq!(posterior.gradient[3], map.gradient[3] + 1.0);
  for index in [0, 1, 2, 4] {
    assert_eq!(posterior.gradient[index], map.gradient[index]);
  }
  assert_eq!(
    objective.evaluate_posterior(&point[..4]),
    Err(MapObjectiveError::InvalidDimensions)
  );
}
