use super::*;
use crate::logistic_map::LogisticParameters;
use crate::map_uncertainty::{SimulationRows, SimulationTrend, simulate_intervals, simulate_map};
use crate::target_scaling::{LogisticScaling, ScalingMode};

const SCALING: TargetScaling = TargetScaling {
  mode: ScalingMode::AbsMax,
  offset: 10.0,
  scale: 2.0,
};

const MODES: [ComponentMode; 2] = [ComponentMode::Additive, ComponentMode::Multiplicative];

const TIMESTAMPS: [f64; 4] = [0.0, 6.0, 12.0, 15.0];

const FEATURES: [f64; 8] = [1.0, 0.5, -1.0, 0.25, 0.5, -0.5, 2.0, 1.0];

/// One linear draw: `[intercept, slope, delta, noise, additive, multiplicative]`.
const LINEAR_DRAW: [f64; 6] = [2.0, 4.0, -1.5, 0.3, 0.7, 0.1];

fn linear_draws(values: &[f64]) -> PosteriorDraws<'_> {
  PosteriorDraws {
    trend: PosteriorTrend::Linear {
      time_origin: 0.0,
      time_scale: 10.0,
      changepoints: &[5.0],
      scaling: SCALING,
    },
    count: values.len() / 6,
    values,
    modes: &MODES,
  }
}

fn rows(features: &[f64]) -> PosteriorRows<'_> {
  PosteriorRows {
    timestamps: &TIMESTAMPS,
    features,
    offsets: None,
  }
}

fn options(samples: usize) -> SimulationOptions {
  SimulationOptions {
    seed: 17,
    samples,
    interval_width: 0.8,
  }
}

#[test]
fn a_single_draw_reproduces_the_map_simulation() {
  let trend = PiecewiseTrend {
    intercept: 2.0,
    slope: 4.0,
    time_origin: 0.0,
    time_scale: 10.0,
    changepoint_timestamps: vec![5.0],
    deltas: vec![-1.5],
  };
  let additive: Vec<f64> = FEATURES
    .as_chunks::<2>()
    .0
    .iter()
    .map(|row| row[0] * 0.7)
    .collect();
  let multiplicative: Vec<f64> = FEATURES
    .as_chunks::<2>()
    .0
    .iter()
    .map(|row| row[1] * 0.1)
    .collect();
  let map_rows = SimulationRows {
    timestamps: &TIMESTAMPS,
    additive: &additive,
    multiplicative: &multiplicative,
    offsets: None,
  };
  let model = SimulationTrend::Linear {
    trend: &trend,
    scaling: SCALING,
  };

  let expected = simulate_map(model, 0.3, map_rows, options(64)).unwrap();
  let PosteriorSimulation::Samples(actual) = simulate_posterior(
    linear_draws(&LINEAR_DRAW),
    rows(&FEATURES),
    options(64),
    true,
  )
  .unwrap() else {
    panic!("expected samples");
  };

  assert_eq!(actual.samples, 64);
  assert_eq!(actual.trend, expected.trend);
  assert_eq!(actual.value, expected.value);

  let expected = simulate_intervals(model, 0.3, map_rows, options(64)).unwrap();
  let PosteriorSimulation::Intervals(actual) = simulate_posterior(
    linear_draws(&LINEAR_DRAW),
    rows(&FEATURES),
    options(64),
    false,
  )
  .unwrap() else {
    panic!("expected intervals");
  };

  assert_eq!(actual.values, expected.values);
}

#[test]
fn rounds_paths_per_draw_up_like_python() {
  assert_eq!(samples_per_draw(1_000, 600), 2);
  assert_eq!(samples_per_draw(1_000, 1_000), 1);
  assert_eq!(samples_per_draw(1_000, 4_000), 1);
  assert_eq!(samples_per_draw(7, 1), 7);
  assert_eq!(posterior_sample_count(10, 1_000, 600, false), Ok(1_200));
  assert_eq!(posterior_sample_count(10, 2, 3, true), Ok(3));
}

#[test]
fn each_draw_runs_its_own_block_of_paths() {
  // Two flat draws far apart, with almost no noise: `[level, noise, additive, multiplicative]`.
  // Levels are relative to the target offset of 10.
  let values = [1.0, 1e-6, 0.0, 0.0, 50.0, 1e-6, 0.0, 0.0];
  let draws = PosteriorDraws {
    trend: PosteriorTrend::Flat { scaling: SCALING },
    count: 2,
    values: &values,
    modes: &MODES,
  };
  let PosteriorSimulation::Samples(samples) =
    simulate_posterior(draws, rows(&FEATURES), options(5), true).unwrap()
  else {
    panic!("expected samples");
  };

  // Five requested over two draws runs three paths each.
  assert_eq!(samples.samples, 6);

  for row in 0..TIMESTAMPS.len() {
    let trend = &samples.trend[row * 6..(row + 1) * 6];
    assert_eq!(trend, &[11.0, 11.0, 11.0, 60.0, 60.0, 60.0]);
  }
}

#[test]
fn future_changes_take_each_draws_own_scale() {
  // A draw with no changepoint adjustments still varies through its tiny 1e-8 scale only.
  let mut values = LINEAR_DRAW.to_vec();
  values[2] = 0.0;
  values.extend_from_slice(&LINEAR_DRAW);
  let PosteriorSimulation::Samples(samples) =
    simulate_posterior(linear_draws(&values), rows(&FEATURES), options(400), true).unwrap()
  else {
    panic!("expected samples");
  };
  let future = 3;
  let spread = |block: &[f64]| {
    let mean = block.iter().sum::<f64>() / block.len() as f64;
    block
      .iter()
      .map(|value| (value - mean).abs())
      .fold(0.0, f64::max)
  };
  let row = &samples.trend[future * 400..(future + 1) * 400];

  assert!(spread(&row[..200]) < 1e-6);
  assert!(spread(&row[200..]) > 0.01);
}

#[test]
fn component_ranges_follow_percentiles_over_draws() {
  let mut values = Vec::new();
  for (additive, multiplicative) in [(1.0, 0.0), (2.0, 0.1), (4.0, 0.3)] {
    values.extend_from_slice(&[2.0, 4.0, -1.5, 0.3, additive, multiplicative]);
  }
  let intervals = posterior_component_intervals(
    DrawCoefficients {
      count: 3,
      values: &values,
      trend_width: 3,
      modes: &MODES,
    },
    &TIMESTAMPS[..1],
    &FEATURES[..2],
    ComponentColumns {
      starts: &[0, 1],
      counts: &[1, 1],
    },
    0.5,
  )
  .unwrap();

  // Row features [1, 0.5]: additive draws 1, 2, 4 and multiplicative 0, 0.05, 0.15. The 25th
  // and 75th percentiles interpolate between neighbours, like `np.percentile`.
  let expected = [1.5, 3.0, 0.025, 0.1, 1.5, 3.0, 0.025, 0.1];

  assert_eq!(intervals.len(), expected.len());
  for (actual, expected) in intervals.iter().zip(expected) {
    assert!((actual - expected).abs() < 1e-12, "{actual} != {expected}");
  }
}

#[test]
fn rejects_malformed_draws_rows_and_budgets() {
  let draws = linear_draws(&LINEAR_DRAW);
  let simulate =
    |draws, rows, samples, output| simulate_posterior(draws, rows, options(samples), output);

  assert!(matches!(
    simulate(linear_draws(&LINEAR_DRAW[..5]), rows(&FEATURES), 8, false),
    Err(SimulationError::InvalidShape)
  ));
  assert!(matches!(
    simulate(draws, rows(&FEATURES[..6]), 8, false),
    Err(SimulationError::InvalidShape)
  ));
  assert!(matches!(
    simulate(draws, rows(&FEATURES), 0, false),
    Err(SimulationError::ResourceLimit)
  ));

  let mut zero_noise = LINEAR_DRAW;
  zero_noise[3] = 0.0;
  assert!(matches!(
    simulate(linear_draws(&zero_noise), rows(&FEATURES), 8, false),
    Err(SimulationError::InvalidModel)
  ));

  let far = [0.0, 1_000.0];
  let features = [0.0; 4];
  assert!(matches!(
    simulate(
      draws,
      PosteriorRows {
        timestamps: &far,
        features: &features,
        offsets: None,
      },
      8,
      false
    ),
    Err(SimulationError::ResourceLimit)
  ));

  assert_eq!(
    posterior_sample_count(1_000, 2_048, 1, true),
    Err(SimulationError::ResourceLimit)
  );
  assert_eq!(
    posterior_sample_count(MAX_ROWS + 1, 8, 1, false),
    Err(SimulationError::ResourceLimit)
  );
}

#[test]
fn offsets_shift_every_sample_of_their_rows() {
  let offset_rows = [3];
  let additive = [5.0; 8];
  let multiplicative = [0.0; 8];
  let shifted = PosteriorRows {
    timestamps: &TIMESTAMPS,
    features: &FEATURES,
    offsets: Some(SampleOffsets {
      rows: &offset_rows,
      additive: &additive,
      multiplicative: &multiplicative,
    }),
  };
  let run = |rows| {
    let PosteriorSimulation::Samples(samples) =
      simulate_posterior(linear_draws(&LINEAR_DRAW), rows, options(8), true).unwrap()
    else {
      panic!("expected samples");
    };
    samples.value
  };
  let plain = run(rows(&FEATURES));
  let moved = run(shifted);

  assert_eq!(plain[..24], moved[..24]);
  for sample in 0..8 {
    assert!((moved[24 + sample] - plain[24 + sample] - 5.0).abs() < 1e-12);
  }
}

#[test]
fn a_single_logistic_draw_reproduces_the_map_simulation() {
  let scaling = LogisticScaling::parse(0.0, 50.0, 0.0, 2.0).unwrap();
  let capacities = [60.0, 60.0, 70.0, 70.0];
  let parameters = LogisticParameters {
    rate: 3.0,
    offset: 0.4,
    deltas: vec![-0.5],
  };
  // `[rate, offset, delta, noise, additive, multiplicative]`
  let draw = [3.0, 0.4, -0.5, 0.3, 0.7, 0.1];
  let additive: Vec<f64> = FEATURES
    .as_chunks::<2>()
    .0
    .iter()
    .map(|row| row[0] * 0.7)
    .collect();
  let multiplicative: Vec<f64> = FEATURES
    .as_chunks::<2>()
    .0
    .iter()
    .map(|row| row[1] * 0.1)
    .collect();
  let changepoints = [5.0];

  let expected = simulate_map(
    SimulationTrend::Logistic {
      parameters: &parameters,
      scaling,
      capacities: &capacities,
      floors: None,
      time_origin: 0.0,
      time_scale: 10.0,
      changepoints: &changepoints,
    },
    0.3,
    SimulationRows {
      timestamps: &TIMESTAMPS,
      additive: &additive,
      multiplicative: &multiplicative,
      offsets: None,
    },
    options(32),
  )
  .unwrap();

  let PosteriorSimulation::Samples(actual) = simulate_posterior(
    PosteriorDraws {
      trend: PosteriorTrend::Logistic {
        time_origin: 0.0,
        time_scale: 10.0,
        changepoints: &changepoints,
        scaling,
        capacities: &capacities,
        floors: None,
      },
      count: 1,
      values: &draw,
      modes: &MODES,
    },
    rows(&FEATURES),
    options(32),
    true,
  )
  .unwrap() else {
    panic!("expected samples");
  };

  assert_eq!(actual.trend, expected.trend);
  assert_eq!(actual.value, expected.value);
  assert!(
    actual
      .trend
      .iter()
      .all(|trend| *trend > 2.0 && *trend < 70.0)
  );
}
