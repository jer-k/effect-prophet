/// Neumaier compensated summation for finite floating-point accumulations.
#[derive(Default)]
pub(crate) struct CompensatedSum {
  sum: f64,
  correction: f64,
}

impl CompensatedSum {
  pub(crate) fn add(&mut self, value: f64) {
    let next = self.sum + value;

    if self.sum.abs() >= value.abs() {
      self.correction += (self.sum - next) + value;
    } else {
      self.correction += (value - next) + self.sum;
    }

    self.sum = next;
  }

  pub(crate) fn total(self) -> f64 {
    self.sum + self.correction
  }
}
