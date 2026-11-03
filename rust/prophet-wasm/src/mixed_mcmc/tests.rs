use super::{McmcError, McmcSettings, MixedMcmcModel, fit_mixed_mcmc};
use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::mixed_map::{ComponentMode, MixedTrendInput, MixedTrendModel};
use crate::stan::linear_optimizer::{LinearOptimizerOptions, WarmStart};
use crate::target_scaling::ScalingMode;

const ROWS: usize = 40;

/// A noisy line with one changepoint and an additive feature, in observation units.
fn history() -> (Vec<f64>, Vec<f64>, Vec<f64>) {
  let timestamps: Vec<f64> = (0..ROWS).map(|row| row as f64 * 1_000.0).collect();
  let feature: Vec<f64> = (0..ROWS).map(|row| ((row * 7) % 5) as f64 - 2.0).collect();
  let values = (0..ROWS)
    .map(|row| {
      let t = row as f64 / (ROWS - 1) as f64;
      let noise = (((row * 37) % 11) as f64 - 5.0) * 0.4;
      100.0 + 30.0 * t - 20.0 * (t - 0.5).max(0.0) + 3.0 * feature[row] + noise
    })
    .collect();

  (timestamps, values, feature)
}

fn settings(seed: u32) -> McmcSettings {
  McmcSettings {
    chains: 4,
    warmup: 150,
    draws: 150,
    seed,
  }
}

#[allow(clippy::too_many_arguments)]
fn fit(
  timestamps: &[f64],
  values: &[f64],
  feature: &[f64],
  trend: MixedTrendInput<'_>,
  mode: ComponentMode,
  settings: McmcSettings,
  warm_start: Option<&WarmStart>,
) -> Result<MixedMcmcModel, McmcError> {
  fit_mixed_mcmc(
    timestamps,
    values,
    trend,
    &[],
    SeasonalityMaskView {
      row_count: timestamps.len(),
      component_count: 0,
      values: &[],
    },
    FeatureMatrixView {
      row_count: timestamps.len(),
      column_count: 1,
      values: feature,
    },
    AdditionalFeatureLayoutView {
      prior_scales: &[10.0],
      component_offsets: &[0],
      component_counts: &[1],
    },
    &[mode],
    0.05,
    ScalingMode::AbsMax,
    settings,
    warm_start,
  )
}

fn changepoint(timestamps: &[f64]) -> [f64; 1] {
  [timestamps[ROWS / 2]]
}

/// The draw column's mean and standard deviation.
fn moments(model: &MixedMcmcModel, width: usize, column: usize) -> (f64, f64) {
  let values: Vec<f64> = model
    .draws
    .chunks_exact(width)
    .map(|row| row[column])
    .collect();
  let mean = values.iter().sum::<f64>() / values.len() as f64;
  let variance = values
    .iter()
    .map(|value| (value - mean).powi(2))
    .sum::<f64>()
    / (values.len() - 1) as f64;

  (mean, variance.sqrt())
}

#[test]
fn linear_posterior_centers_on_the_map_fit() {
  let (timestamps, values, feature) = history();
  let changepoints = changepoint(&timestamps);
  let trend = MixedTrendInput::Linear {
    changepoints: &changepoints,
  };
  let model = fit(
    &timestamps,
    &values,
    &feature,
    trend,
    ComponentMode::Additive,
    settings(11),
    None,
  )
  .unwrap();
  let map = crate::mixed_map::fit_mixed_map(
    &timestamps,
    &values,
    trend,
    &[],
    SeasonalityMaskView {
      row_count: ROWS,
      component_count: 0,
      values: &[],
    },
    FeatureMatrixView {
      row_count: ROWS,
      column_count: 1,
      values: &feature,
    },
    AdditionalFeatureLayoutView {
      prior_scales: &[10.0],
      component_offsets: &[0],
      component_counts: &[1],
    },
    &[ComponentMode::Additive],
    0.05,
    LinearOptimizerOptions::default(),
    ScalingMode::AbsMax,
  )
  .unwrap();

  // [intercept, slope, delta, noise, feature]
  let width = 5;
  assert_eq!(model.draw_count, 600);
  assert_eq!(model.draws.len(), 600 * width);

  let MixedTrendModel::Linear(map_trend) = &map.trend else {
    panic!("expected a linear MAP trend");
  };
  let checks = [
    (0, map_trend.intercept),
    (1, map_trend.slope),
    (2, map_trend.deltas[0]),
    (4, map.additional_coefficients[0]),
  ];

  for (column, map_value) in checks {
    let (mean, sd) = moments(&model, width, column);
    assert!(
      (mean - map_value).abs() < 3.0 * sd + 1e-9,
      "column {column}: posterior {mean} ± {sd}, MAP {map_value}"
    );
  }

  let (noise, _) = moments(&model, width, 3);
  assert!(noise > map.noise_scale * 0.8 && noise < map.noise_scale * 1.6);

  // The mean model is the column means.
  let MixedTrendModel::Linear(mean_trend) = &model.mean.trend else {
    panic!("expected a linear mean trend");
  };
  assert!((mean_trend.slope - moments(&model, width, 1).0).abs() < 1e-9);
  assert_eq!(mean_trend.changepoint_timestamps, changepoints);
  assert!((model.mean.noise_scale - noise).abs() < 1e-9);

  let diagnostics = model.diagnostics.unwrap();
  assert_eq!(diagnostics.step_sizes.len(), 4);
  assert!(diagnostics.max_rhat < 1.05, "{}", diagnostics.max_rhat);
  assert!(diagnostics.min_ess_bulk > 100.0);
  assert!(diagnostics.mean_accept_stat > 0.6);
}

#[test]
fn draws_interleave_chains_like_python() {
  let (timestamps, values, feature) = history();
  let trend = MixedTrendInput::Linear { changepoints: &[] };
  let run = |chains| {
    fit(
      &timestamps,
      &values,
      &feature,
      trend,
      ComponentMode::Additive,
      McmcSettings {
        chains,
        warmup: 20,
        draws: 5,
        seed: 3,
      },
      None,
    )
    .unwrap()
  };
  let pooled = run(3);
  let first = run(1);

  // [intercept, slope, noise, feature]; no changepoints keeps no deltas.
  assert_eq!(pooled.draws.len(), 15 * 4);
  assert_eq!(first.draws.len(), 5 * 4);

  // Chain zero of the pooled fit is every third draw, starting with the first.
  for draw in 0..5 {
    assert_eq!(
      pooled.draws[draw * 3 * 4..(draw * 3 + 1) * 4],
      first.draws[draw * 4..(draw + 1) * 4]
    );
  }

  // Later chains draw from their own streams.
  assert_ne!(pooled.draws[0..4], pooled.draws[4..8]);
}

#[test]
fn no_changepoints_fold_the_private_delta_into_the_slope() {
  let (timestamps, values, feature) = history();
  let model = fit(
    &timestamps,
    &values,
    &feature,
    MixedTrendInput::Linear { changepoints: &[] },
    ComponentMode::Additive,
    McmcSettings {
      chains: 1,
      warmup: 30,
      draws: 4,
      seed: 5,
    },
    None,
  )
  .unwrap();

  let MixedTrendModel::Linear(trend) = &model.mean.trend else {
    panic!("expected a linear trend");
  };
  assert!(trend.deltas.is_empty());
  // The folded slope still describes the history's rise of roughly 20 over the span.
  assert!(trend.slope > 5.0 && trend.slope < 40.0, "{}", trend.slope);
}

#[test]
fn flat_posterior_keeps_level_noise_and_coefficients() {
  let (timestamps, _, feature) = history();
  let values: Vec<f64> = feature
    .iter()
    .enumerate()
    .map(|(row, value)| 50.0 + 2.0 * value + ((row % 3) as f64 - 1.0) * 0.3)
    .collect();
  let changepoints = changepoint(&timestamps);
  let model = fit(
    &timestamps,
    &values,
    &feature,
    MixedTrendInput::Flat {
      changepoints: &changepoints,
    },
    ComponentMode::Additive,
    settings(9),
    None,
  )
  .unwrap();

  // [level, noise, feature]
  let (level, _) = moments(&model, 3, 0);
  let (coefficient, coefficient_sd) = moments(&model, 3, 2);

  assert!((level - 50.0).abs() < 1.0, "{level}");
  assert!((coefficient - 2.0).abs() < 4.0 * coefficient_sd + 0.05);
  assert!(matches!(model.mean.trend, MixedTrendModel::Flat { .. }));
  assert!(model.diagnostics.unwrap().max_rhat < 1.05);
}

#[test]
fn multiplicative_coefficients_stay_dimensionless() {
  let (timestamps, _, feature) = history();
  let values: Vec<f64> = feature
    .iter()
    .enumerate()
    .map(|(row, value)| (200.0 + row as f64) * (1.0 + 0.05 * value))
    .collect();
  let model = fit(
    &timestamps,
    &values,
    &feature,
    MixedTrendInput::Linear { changepoints: &[] },
    ComponentMode::Multiplicative,
    settings(4),
    None,
  )
  .unwrap();
  let (factor, _) = moments(&model, 4, 3);

  assert!((factor - 0.05).abs() < 0.01, "{factor}");
}

#[test]
fn constant_targets_keep_the_single_shortcut_draw() {
  let timestamps: Vec<f64> = (0..10).map(|row| row as f64).collect();
  let values = vec![7.0; 10];
  let feature = vec![1.0; 10];
  let model = fit(
    &timestamps,
    &values,
    &feature,
    MixedTrendInput::Linear { changepoints: &[] },
    ComponentMode::Additive,
    settings(1),
    None,
  )
  .unwrap();

  assert_eq!(model.draw_count, 1);
  assert!(model.diagnostics.is_none());
  assert_eq!(model.draws, vec![7.0, 0.0, 7.0 * 1e-9, 0.0]);
}

#[test]
fn seeds_reproduce_and_change_draws() {
  let (timestamps, values, feature) = history();
  let trend = MixedTrendInput::Linear { changepoints: &[] };
  let run = |seed| {
    fit(
      &timestamps,
      &values,
      &feature,
      trend,
      ComponentMode::Additive,
      McmcSettings {
        chains: 2,
        warmup: 20,
        draws: 10,
        seed,
      },
      None,
    )
    .unwrap()
    .draws
  };

  assert_eq!(run(8), run(8));
  assert_ne!(run(8), run(9));
}

#[test]
fn warm_starts_set_the_initial_state() {
  let (timestamps, values, feature) = history();
  let trend = MixedTrendInput::Linear { changepoints: &[] };
  let start = WarmStart::parse(0.1, 0.5, 0.2, vec![0.0], vec![0.0]).unwrap();
  let cold = fit(
    &timestamps,
    &values,
    &feature,
    trend,
    ComponentMode::Additive,
    McmcSettings {
      chains: 1,
      warmup: 0,
      draws: 1,
      seed: 2,
    },
    None,
  )
  .unwrap();
  let warm = fit(
    &timestamps,
    &values,
    &feature,
    trend,
    ComponentMode::Additive,
    McmcSettings {
      chains: 1,
      warmup: 0,
      draws: 1,
      seed: 2,
    },
    Some(&start),
  )
  .unwrap();

  assert_ne!(cold.draws, warm.draws);
}

#[test]
fn rejects_settings_past_the_limits_before_sampling() {
  let (timestamps, values, feature) = history();
  let trend = MixedTrendInput::Linear { changepoints: &[] };
  let attempt = |settings| {
    fit(
      &timestamps,
      &values,
      &feature,
      trend,
      ComponentMode::Additive,
      settings,
      None,
    )
  };

  for settings in [
    McmcSettings {
      chains: 0,
      warmup: 10,
      draws: 10,
      seed: 0,
    },
    McmcSettings {
      chains: super::MAX_CHAINS + 1,
      warmup: 10,
      draws: 10,
      seed: 0,
    },
    McmcSettings {
      chains: 1,
      warmup: 10,
      draws: 0,
      seed: 0,
    },
    McmcSettings {
      chains: 2,
      warmup: 10,
      draws: super::MAX_DRAWS,
      seed: 0,
    },
    McmcSettings {
      chains: 1,
      warmup: super::MAX_WARMUP + 1,
      draws: 1,
      seed: 0,
    },
  ] {
    assert_eq!(attempt(settings), Err(McmcError::SamplingLimit));
  }
}

#[test]
fn rejects_posteriors_too_large_to_keep() {
  let timestamps: Vec<f64> = (0..20).map(|row| row as f64).collect();
  let values: Vec<f64> = (0..20).map(|row| (row % 4) as f64).collect();
  let columns = 200;
  let features: Vec<f64> = (0..20 * columns).map(|cell| (cell % 3) as f64).collect();
  let priors = vec![1.0; columns];
  let offsets: Vec<usize> = (0..columns).collect();
  let counts = vec![1; columns];
  let modes = vec![ComponentMode::Additive; columns];

  let result = fit_mixed_mcmc(
    &timestamps,
    &values,
    MixedTrendInput::Linear { changepoints: &[] },
    &[],
    SeasonalityMaskView {
      row_count: 20,
      component_count: 0,
      values: &[],
    },
    FeatureMatrixView {
      row_count: 20,
      column_count: columns,
      values: &features,
    },
    AdditionalFeatureLayoutView {
      prior_scales: &priors,
      component_offsets: &offsets,
      component_counts: &counts,
    },
    &modes,
    0.05,
    ScalingMode::AbsMax,
    McmcSettings {
      chains: 4,
      warmup: 10,
      draws: 5_000,
      seed: 0,
    },
    None,
  );

  assert_eq!(result, Err(McmcError::SamplingLimit));
}
