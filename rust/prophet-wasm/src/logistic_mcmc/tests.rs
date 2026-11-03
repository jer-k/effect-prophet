use super::fit_logistic_mcmc;
use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::logistic_map::fit_logistic_map;
use crate::mixed_mcmc::{McmcError, McmcSettings};
use crate::stan::linear_optimizer::LinearOptimizerOptions;
use crate::target_scaling::ScalingMode;

const ROWS: usize = 50;

/// Saturating growth toward a capacity of 100, with mild deterministic noise.
fn history() -> (Vec<f64>, Vec<f64>, Vec<f64>) {
  let timestamps: Vec<f64> = (0..ROWS).map(|row| row as f64 * 1_000.0).collect();
  let values = (0..ROWS)
    .map(|row| {
      let t = row as f64 / (ROWS - 1) as f64;
      let noise = (((row * 37) % 11) as f64 - 5.0) * 0.5;
      100.0 / (1.0 + (-8.0 * (t - 0.4)).exp()) + noise
    })
    .collect();

  (timestamps, values, vec![100.0; ROWS])
}

fn views(rows: usize) -> (SeasonalityMaskView<'static>, FeatureMatrixView<'static>) {
  (
    SeasonalityMaskView {
      row_count: rows,
      component_count: 0,
      values: &[],
    },
    FeatureMatrixView {
      row_count: rows,
      column_count: 0,
      values: &[],
    },
  )
}

const LAYOUT: AdditionalFeatureLayoutView<'static> = AdditionalFeatureLayoutView {
  prior_scales: &[],
  component_offsets: &[],
  component_counts: &[],
};

#[test]
fn logistic_posterior_centers_on_the_map_fit() {
  let (timestamps, values, capacities) = history();
  let changepoints = [timestamps[25]];
  let (masks, features) = views(ROWS);
  let settings = McmcSettings {
    chains: 4,
    warmup: 150,
    draws: 150,
    seed: 3,
  };

  let model = fit_logistic_mcmc(
    &timestamps,
    &values,
    &capacities,
    None,
    &changepoints,
    &[],
    masks,
    features,
    LAYOUT,
    &[],
    0.05,
    ScalingMode::AbsMax,
    settings,
    None,
  )
  .unwrap();
  let map = fit_logistic_map(
    &timestamps,
    &values,
    &capacities,
    None,
    &changepoints,
    &[],
    masks,
    features,
    LAYOUT,
    &[],
    0.05,
    LinearOptimizerOptions::default(),
    ScalingMode::AbsMax,
  )
  .unwrap();

  // [rate, offset, delta, noise]
  let width = 4;
  assert_eq!(model.draw_count, 600);
  assert_eq!(model.draws.len(), 600 * width);

  let column = |index: usize| -> (f64, f64) {
    let values: Vec<f64> = model
      .draws
      .chunks_exact(width)
      .map(|row| row[index])
      .collect();
    let mean = values.iter().sum::<f64>() / values.len() as f64;
    let variance = values
      .iter()
      .map(|value| (value - mean).powi(2))
      .sum::<f64>()
      / (values.len() - 1) as f64;

    (mean, variance.sqrt())
  };

  for (index, map_value) in [
    (0, map.parameters.rate),
    (1, map.parameters.offset),
    (2, map.parameters.deltas[0]),
  ] {
    let (mean, sd) = column(index);
    assert!(
      (mean - map_value).abs() < 3.0 * sd + 1e-9,
      "column {index}: posterior {mean} ± {sd}, MAP {map_value}"
    );
  }

  assert!((model.mean.parameters.rate - column(0).0).abs() < 1e-12);
  assert!(model.mean.noise_scale > map.noise_scale * 0.8);
  assert!(
    model.diagnostics.max_rhat < 1.05,
    "{}",
    model.diagnostics.max_rhat
  );
}

#[test]
fn no_changepoints_fold_the_private_delta_into_the_rate() {
  let (timestamps, values, capacities) = history();
  let (masks, features) = views(ROWS);
  let model = fit_logistic_mcmc(
    &timestamps,
    &values,
    &capacities,
    None,
    &[],
    &[],
    masks,
    features,
    LAYOUT,
    &[],
    0.05,
    ScalingMode::AbsMax,
    McmcSettings {
      chains: 1,
      warmup: 50,
      draws: 10,
      seed: 1,
    },
    None,
  )
  .unwrap();

  assert!(model.mean.parameters.deltas.is_empty());
  assert_eq!(model.draws.len(), 10 * 3);
  assert!(
    model.mean.parameters.rate > 2.0,
    "{}",
    model.mean.parameters.rate
  );
}

#[test]
fn rejects_posteriors_past_the_limits() {
  let (timestamps, values, capacities) = history();
  let (masks, features) = views(ROWS);
  let result = fit_logistic_mcmc(
    &timestamps,
    &values,
    &capacities,
    None,
    &[],
    &[],
    masks,
    features,
    LAYOUT,
    &[],
    0.05,
    ScalingMode::AbsMax,
    McmcSettings {
      chains: 17,
      warmup: 1,
      draws: 1,
      seed: 0,
    },
    None,
  );

  assert_eq!(result, Err(McmcError::SamplingLimit));
}
