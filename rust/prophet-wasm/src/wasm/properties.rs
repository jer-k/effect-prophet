//! Property tests for the packed wire protocol: arbitrary frames must return a status, never panic.

use proptest::prelude::*;
use proptest::test_runner::{Config, FileFailurePersistence, RngAlgorithm, RngSeed};

use super::additive_features::{
  fit_piecewise_map_with_features, fit_piecewise_map_with_features_and_scaling,
  predict_piecewise_map_with_features, predict_piecewise_map_with_features_and_scaling,
};
use super::flat_map::{
  fit_flat_map, fit_flat_map_with_scaling, predict_flat_map, predict_flat_map_with_scaling,
};
use super::logistic_map::{fit_logistic_map_with_features, predict_logistic_map_with_features};
use super::map::{
  fit_piecewise_map, fit_piecewise_map_with_scaling, predict_piecewise_map,
  predict_piecewise_map_with_scaling,
};
use super::map_uncertainty::{simulate_logistic_map_with_features, simulate_map_with_features};
use super::mixed_map::{
  fit_mixed_flat_map, fit_mixed_linear_map, predict_mixed_flat_map, predict_mixed_linear_map,
};

const DAY_MS: f64 = 86_400_000.0;

/// Values that probe parsing and arithmetic edges once a coherent frame has been built.
const SPECIAL_VALUES: [f64; 14] = [
  f64::NAN,
  f64::INFINITY,
  f64::NEG_INFINITY,
  0.0,
  -0.0,
  -1.0,
  0.5,
  f64::MAX,
  f64::MIN,
  f64::MIN_POSITIVE,
  f64::EPSILON,
  1e300,
  -1e300,
  4_294_967_296.0,
];

/// One coherent set of slices shared by every entry point, before mutations are applied.
#[derive(Clone, Debug)]
struct WireCase {
  timestamps: Vec<f64>,
  values: Vec<f64>,
  capacities: Vec<f64>,
  floors: Vec<f64>,
  changepoints: Vec<f64>,
  deltas: Vec<f64>,
  periods: Vec<f64>,
  orders: Vec<f64>,
  prior_scales: Vec<f64>,
  coefficients: Vec<f64>,
  masks: Vec<f64>,
  additional_values: Vec<f64>,
  additional_scales: Vec<f64>,
  additional_coefficients: Vec<f64>,
  offsets: Vec<f64>,
  counts: Vec<f64>,
  modes: Vec<f64>,
  optimizer: Vec<f64>,

  /// Scalars in the order of `Scalar`; mutations may replace any of them.
  scalars: Vec<f64>,
}

#[derive(Clone, Copy)]
enum Scalar {
  ScalingMode,
  ChangepointMode,
  AutomaticCount,
  AutomaticRange,
  ColumnCount,
  ChangepointPriorScale,
  Intercept,
  Slope,
  TimeOrigin,
  TimeScale,
  NoiseScale,
  TargetOffset,
  TargetScale,
  FloorPolicy,
  ImplicitFloor,
  GrowthCode,
  Seed,
  SampleCount,
  IntervalWidth,
  OutputCode,
}

const SCALAR_COUNT: usize = Scalar::OutputCode as usize + 1;

const SLOT_COUNT: usize = 19;

/// `scalars` is the last mutable slot.
const SCALAR_SLOT: usize = SLOT_COUNT - 1;

impl WireCase {
  fn scalar(&self, scalar: Scalar) -> f64 {
    self.scalars[scalar as usize]
  }

  fn slices_mut(&mut self) -> [&mut Vec<f64>; SLOT_COUNT] {
    [
      &mut self.timestamps,
      &mut self.values,
      &mut self.capacities,
      &mut self.floors,
      &mut self.changepoints,
      &mut self.deltas,
      &mut self.periods,
      &mut self.orders,
      &mut self.prior_scales,
      &mut self.coefficients,
      &mut self.masks,
      &mut self.additional_values,
      &mut self.additional_scales,
      &mut self.additional_coefficients,
      &mut self.offsets,
      &mut self.counts,
      &mut self.modes,
      &mut self.optimizer,
      &mut self.scalars,
    ]
  }
}

/// A targeted corruption of one slot: replace an element, truncate, or extend.
#[derive(Clone, Debug)]
enum Mutation {
  Replace {
    slot: usize,
    index: usize,
    value: f64,
  },
  Truncate {
    slot: usize,
    length: usize,
  },
  Extend {
    slot: usize,
    value: f64,
  },
}

impl Mutation {
  fn apply(&self, case: &mut WireCase) {
    let mut slots = case.slices_mut();

    match *self {
      Mutation::Replace { slot, index, value } => {
        let target = &mut slots[slot % SLOT_COUNT];

        if !target.is_empty() {
          let position = index % target.len();
          target[position] = value;
        }
      }

      // Scalars keep their arity so every entry point can still be called.
      Mutation::Truncate { slot, length } if slot % SLOT_COUNT != SCALAR_SLOT => {
        let target = &mut slots[slot % SLOT_COUNT];
        let length = length % (target.len() + 1);

        target.truncate(length);
      }
      Mutation::Extend { slot, value } if slot % SLOT_COUNT != SCALAR_SLOT => {
        slots[slot % SLOT_COUNT].push(value);
      }
      Mutation::Truncate { .. } | Mutation::Extend { .. } => {}
    }
  }
}

fn wire_value() -> impl Strategy<Value = f64> {
  prop_oneof![
    3 => proptest::sample::select(SPECIAL_VALUES.to_vec()),
    2 => -1_000.0..1_000.0f64,
    1 => (0u32..8).prop_map(f64::from),
    1 => any::<f64>(),
  ]
}

fn mutation() -> impl Strategy<Value = Mutation> {
  prop_oneof![
    4 => (0usize..SLOT_COUNT, any::<usize>(), wire_value())
      .prop_map(|(slot, index, value)| Mutation::Replace { slot, index, value }),
    1 => (0usize..SLOT_COUNT, any::<usize>())
      .prop_map(|(slot, length)| Mutation::Truncate { slot, length }),
    1 => (0usize..SLOT_COUNT, wire_value())
      .prop_map(|(slot, value)| Mutation::Extend { slot, value }),
  ]
}

/// Build a structurally valid frame so mutations reach code past the first validation guard.
fn coherent_case() -> impl Strategy<Value = WireCase> {
  (
    0usize..10,
    0usize..3,
    0usize..3,
    0usize..3,
    any::<bool>(),
    any::<bool>(),
    any::<bool>(),
    1u32..6,
  )
    .prop_flat_map(
      |(
        rows,
        seasonal_count,
        column_count,
        changepoint_count,
        linear,
        scaled,
        intervals,
        samples,
      )| {
        let values = proptest::collection::vec(-50.0..50.0f64, rows);
        let orders = proptest::collection::vec(1u32..4, seasonal_count);
        let periods = proptest::collection::vec(
          proptest::sample::select(vec![7.0, 30.5, 365.25]),
          seasonal_count,
        );
        let additional = proptest::collection::vec(-2.0..2.0f64, rows * column_count);

        // One mode per seasonality and per additional column component.
        let multiplicative =
          proptest::collection::vec(any::<bool>(), seasonal_count + column_count);

        (
          values,
          orders,
          periods,
          additional,
          multiplicative,
          Just((
            rows,
            column_count,
            changepoint_count,
            linear,
            scaled,
            intervals,
            samples,
          )),
        )
      },
    )
    .prop_map(
      |(values, orders, periods, additional_values, multiplicative, shape)| {
        let (rows, column_count, changepoint_count, linear, scaled, intervals, samples) = shape;
        let component_count = orders.len();
        let coefficient_count: u32 = orders.iter().map(|order| order * 2).sum();
        let timestamps: Vec<f64> = (0..rows).map(|row| row as f64 * DAY_MS).collect();
        let span = (rows.max(2) - 1) as f64 * DAY_MS;

        let changepoints: Vec<f64> = (1..=changepoint_count)
          .map(|index| (span * index as f64 / (changepoint_count + 1) as f64).round())
          .collect();

        let mut scalars = vec![0.0; SCALAR_COUNT];
        scalars[Scalar::ScalingMode as usize] = if scaled { 1.0 } else { 0.0 };
        scalars[Scalar::ColumnCount as usize] = column_count as f64;
        scalars[Scalar::ChangepointPriorScale as usize] = 0.05;
        scalars[Scalar::Intercept as usize] = 0.2;
        scalars[Scalar::Slope as usize] = 0.1;
        scalars[Scalar::TimeScale as usize] = span;
        scalars[Scalar::NoiseScale as usize] = 0.1;
        scalars[Scalar::TargetScale as usize] = 50.0;
        scalars[Scalar::ImplicitFloor as usize] = 0.0;
        scalars[Scalar::GrowthCode as usize] = if linear { 0.0 } else { 1.0 };
        scalars[Scalar::Seed as usize] = 7.0;
        scalars[Scalar::SampleCount as usize] = f64::from(samples);
        scalars[Scalar::IntervalWidth as usize] = 0.8;
        scalars[Scalar::OutputCode as usize] = if intervals { 1.0 } else { 0.0 };

        WireCase {
          capacities: vec![100.0; rows],
          floors: Vec::new(),
          deltas: vec![0.01; changepoint_count],
          changepoints,
          periods,
          orders: orders.iter().map(|order| f64::from(*order)).collect(),
          prior_scales: vec![10.0; component_count],
          coefficients: vec![0.05; coefficient_count as usize],
          masks: vec![1.0; rows * component_count],
          additional_scales: vec![10.0; column_count],
          additional_coefficients: vec![0.1; column_count],
          offsets: (0..column_count).map(|column| column as f64).collect(),
          counts: vec![1.0; column_count],
          modes: orders
            .iter()
            .map(|order| order * 2)
            .chain(std::iter::repeat_n(1, column_count))
            .zip(&multiplicative)
            .flat_map(|(width, &multiplicative)| {
              std::iter::repeat_n(if multiplicative { 1.0 } else { 0.0 }, width as usize)
            })
            .collect(),
          // A small Newton budget keeps badly scaled mutations bounded; exhaustion is a status.
          optimizer: vec![2.0, 1.0, 50.0],
          additional_values,
          timestamps,
          values,
          scalars,
        }
      },
    )
}

fn wire_case() -> impl Strategy<Value = WireCase> {
  (coherent_case(), proptest::collection::vec(mutation(), 0..4)).prop_map(
    |(mut case, mutations)| {
      for mutation in &mutations {
        mutation.apply(&mut case);
      }

      case
    },
  )
}

/// Invoke every exported entry point with the same slices and collect the packed frames.
fn call_every_entry(case: &WireCase) -> Vec<(&'static str, Vec<f64>)> {
  use Scalar as S;

  let s = |scalar| case.scalar(scalar);

  vec![
    (
      "fit_flat_map",
      fit_flat_map(
        &case.timestamps,
        &case.values,
        &case.periods,
        &case.orders,
        &case.prior_scales,
      ),
    ),
    (
      "fit_flat_map_with_scaling",
      fit_flat_map_with_scaling(
        &case.timestamps,
        &case.values,
        s(S::ScalingMode),
        &case.periods,
        &case.orders,
        &case.prior_scales,
      ),
    ),
    (
      "predict_flat_map",
      predict_flat_map(
        &case.timestamps,
        s(S::Intercept),
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
      ),
    ),
    (
      "predict_flat_map_with_scaling",
      predict_flat_map_with_scaling(
        &case.timestamps,
        s(S::ScalingMode),
        s(S::TargetOffset),
        s(S::TargetScale),
        s(S::Intercept),
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
      ),
    ),
    (
      "fit_piecewise_map",
      fit_piecewise_map(
        &case.timestamps,
        &case.values,
        s(S::ChangepointMode),
        &case.changepoints,
        s(S::AutomaticCount),
        s(S::AutomaticRange),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        s(S::ChangepointPriorScale),
        &case.optimizer,
      ),
    ),
    (
      "fit_piecewise_map_with_scaling",
      fit_piecewise_map_with_scaling(
        &case.timestamps,
        &case.values,
        s(S::ScalingMode),
        s(S::ChangepointMode),
        &case.changepoints,
        s(S::AutomaticCount),
        s(S::AutomaticRange),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        s(S::ChangepointPriorScale),
        &case.optimizer,
      ),
    ),
    (
      "predict_piecewise_map",
      predict_piecewise_map(
        &case.timestamps,
        s(S::Intercept),
        s(S::Slope),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
      ),
    ),
    (
      "predict_piecewise_map_with_scaling",
      predict_piecewise_map_with_scaling(
        &case.timestamps,
        s(S::ScalingMode),
        s(S::TargetOffset),
        s(S::TargetScale),
        s(S::Intercept),
        s(S::Slope),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
      ),
    ),
    (
      "fit_piecewise_map_with_features",
      fit_piecewise_map_with_features(
        &case.timestamps,
        &case.values,
        s(S::ChangepointMode),
        &case.changepoints,
        s(S::AutomaticCount),
        s(S::AutomaticRange),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_scales,
        &case.offsets,
        &case.counts,
        s(S::ChangepointPriorScale),
        &case.optimizer,
      ),
    ),
    (
      "fit_piecewise_map_with_features_and_scaling",
      fit_piecewise_map_with_features_and_scaling(
        &case.timestamps,
        &case.values,
        s(S::ScalingMode),
        s(S::ChangepointMode),
        &case.changepoints,
        s(S::AutomaticCount),
        s(S::AutomaticRange),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_scales,
        &case.offsets,
        &case.counts,
        s(S::ChangepointPriorScale),
        &case.optimizer,
      ),
    ),
    (
      "predict_piecewise_map_with_features",
      predict_piecewise_map_with_features(
        &case.timestamps,
        s(S::Intercept),
        s(S::Slope),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
      ),
    ),
    (
      "predict_piecewise_map_with_features_and_scaling",
      predict_piecewise_map_with_features_and_scaling(
        &case.timestamps,
        s(S::ScalingMode),
        s(S::TargetOffset),
        s(S::TargetScale),
        s(S::Intercept),
        s(S::Slope),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
      ),
    ),
    (
      "fit_mixed_linear_map",
      fit_mixed_linear_map(
        &case.timestamps,
        &case.values,
        s(S::ScalingMode),
        s(S::ChangepointMode),
        &case.changepoints,
        s(S::AutomaticCount),
        s(S::AutomaticRange),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_scales,
        &case.offsets,
        &case.counts,
        &case.modes,
        s(S::ChangepointPriorScale),
        &case.optimizer,
      ),
    ),
    (
      "fit_mixed_flat_map",
      fit_mixed_flat_map(
        &case.timestamps,
        &case.values,
        s(S::ScalingMode),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_scales,
        &case.offsets,
        &case.counts,
        &case.modes,
        &case.optimizer,
      ),
    ),
    (
      "predict_mixed_linear_map",
      predict_mixed_linear_map(
        &case.timestamps,
        s(S::ScalingMode),
        s(S::TargetOffset),
        s(S::TargetScale),
        s(S::Intercept),
        s(S::Slope),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
        &case.modes,
      ),
    ),
    (
      "predict_mixed_flat_map",
      predict_mixed_flat_map(
        &case.timestamps,
        s(S::ScalingMode),
        s(S::TargetOffset),
        s(S::TargetScale),
        s(S::Intercept),
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
        &case.modes,
      ),
    ),
    (
      "fit_logistic_map_with_features",
      fit_logistic_map_with_features(
        &case.timestamps,
        &case.values,
        &case.capacities,
        s(S::FloorPolicy),
        &case.floors,
        s(S::ScalingMode),
        s(S::ChangepointMode),
        &case.changepoints,
        s(S::AutomaticCount),
        s(S::AutomaticRange),
        &case.periods,
        &case.orders,
        &case.prior_scales,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_scales,
        &case.offsets,
        &case.counts,
        &case.modes,
        s(S::ChangepointPriorScale),
        &case.optimizer,
      ),
    ),
    (
      "predict_logistic_map_with_features",
      predict_logistic_map_with_features(
        &case.timestamps,
        &case.capacities,
        &case.floors,
        s(S::ScalingMode),
        s(S::TargetScale),
        s(S::FloorPolicy),
        s(S::ImplicitFloor),
        s(S::Slope),
        s(S::Intercept),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
        &case.modes,
      ),
    ),
    (
      "simulate_map_with_features",
      simulate_map_with_features(
        &case.timestamps,
        s(S::GrowthCode),
        s(S::ScalingMode),
        s(S::TargetOffset),
        s(S::TargetScale),
        s(S::Intercept),
        s(S::Slope),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
        &case.modes,
        s(S::Seed),
        s(S::SampleCount),
        s(S::IntervalWidth),
        s(S::OutputCode),
      ),
    ),
    (
      "simulate_logistic_map_with_features",
      simulate_logistic_map_with_features(
        &case.timestamps,
        &case.capacities,
        &case.floors,
        s(S::ScalingMode),
        s(S::TargetScale),
        s(S::FloorPolicy),
        s(S::ImplicitFloor),
        s(S::Slope),
        s(S::Intercept),
        s(S::TimeOrigin),
        s(S::TimeScale),
        &case.changepoints,
        &case.deltas,
        s(S::NoiseScale),
        &case.periods,
        &case.orders,
        &case.coefficients,
        &case.masks,
        s(S::ColumnCount),
        &case.additional_values,
        &case.additional_coefficients,
        &case.offsets,
        &case.counts,
        &case.modes,
        s(S::Seed),
        s(S::SampleCount),
        s(S::IntervalWidth),
        s(S::OutputCode),
      ),
    ),
  ]
}

/// A fixed seed and no failure files keep CI runs reproducible and the worktree clean.
fn config(cases: u32) -> Config {
  Config {
    cases,
    rng_algorithm: RngAlgorithm::ChaCha,
    rng_seed: RngSeed::Fixed(59),
    failure_persistence: Some(Box::new(FileFailurePersistence::Off)),
    ..Config::default()
  }
}

proptest! {
  #![proptest_config(config(128))]

  #[test]
  fn every_entry_point_returns_a_deterministic_status_frame(case in wire_case()) {
    let first = call_every_entry(&case);
    let second = call_every_entry(&case);

    for ((name, frame), (_, repeated)) in first.iter().zip(&second) {
      let status = frame.first().copied();

      prop_assert!(status.is_some(), "{name} returned an empty frame");

      let status = status.unwrap_or(f64::NAN);

      prop_assert!(
        status.is_finite() && status.fract() == 0.0 && (0.0..256.0).contains(&status),
        "{name} returned status {status}",
      );
      prop_assert!(
        frame.len() == repeated.len()
          && frame.iter().zip(repeated).all(|(left, right)| left.to_bits() == right.to_bits()),
        "{name} differs between identical calls",
      );
    }
  }

  #[test]
  fn successful_frames_contain_only_finite_values(case in coherent_case()) {
    for (name, frame) in call_every_entry(&case) {
      if frame.first() == Some(&0.0) {
        prop_assert!(
          frame.iter().all(|value| value.is_finite()),
          "{name} returned a non-finite value in a successful frame",
        );
      }
    }
  }
}
