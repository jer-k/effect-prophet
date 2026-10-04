"""Real pinned-Python tests for the benchmark's numeric input mapping."""

import copy
import json
from pathlib import Path
import runpy
import sys
import unittest

import numpy as np

BENCHMARK_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(BENCHMARK_ROOT / "tools" / "adapters"))
adapter = runpy.run_path(str(BENCHMARK_ROOT / "tools" / "adapters" / "python-prophet.py"))


class PythonProphetInputTest(unittest.TestCase):
    def test_numeric_columns_are_float64_without_changing_values_masks_or_order(self):
        rows = [
            {"timestamp": timestamp, "value": value, "capacity": 60, "floor": -5,
             "regressors": {"promotion": promotion}, "conditions": {"active": active}}
            for timestamp, value, promotion, active in [
                ("2024-01-02T00:00:00.000Z", 35, 0, False),
                ("2024-01-01T00:00:00.000Z", 36.25, 1, True),
                ("2024-01-01T00:00:00.000Z", 35, 0, False),
            ]
        ]
        original = copy.deepcopy(rows)
        frame = adapter["records_frame"](rows, include_value=True)

        for column, values in {
            "y": [35, 36.25, 35], "cap": [60, 60, 60],
            "floor": [-5, -5, -5], "promotion": [0, 1, 0],
        }.items():
            self.assertEqual(frame[column].dtype, np.dtype("float64"))
            self.assertEqual(frame[column].tolist(), values)

        self.assertEqual(frame["active"].dtype, np.dtype("bool"))
        self.assertEqual(frame["active"].tolist(), [False, True, False])
        self.assertEqual(frame["ds"].dt.strftime("%Y-%m-%d").tolist(),
                         ["2024-01-02", "2024-01-01", "2024-01-01"])
        self.assertIsNone(frame["ds"].dt.tz)
        self.assertEqual(rows, original)

        prediction = adapter["records_frame"](rows, include_value=False)
        self.assertNotIn("y", prediction.columns)
        self.assertEqual(prediction["floor"].dtype, np.dtype("float64"))
        self.assertEqual(prediction["active"].dtype, np.dtype("bool"))

    def test_empty_frames_keep_float_targets_only_when_requested(self):
        training = adapter["records_frame"]([], include_value=True)
        prediction = adapter["records_frame"]([], include_value=False)

        self.assertTrue(training.empty)
        self.assertEqual(training["y"].dtype, np.dtype("float64"))
        self.assertTrue(prediction.empty)
        self.assertNotIn("y", prediction.columns)

    def test_integer_constant_fits_predicts_and_roundtrips_in_both_scaling_modes(self):
        path = BENCHMARK_ROOT / "inputs" / "v1" / "flat-constant.json"
        contents = path.read_bytes()
        dataset = json.loads(contents)
        original = copy.deepcopy(dataset)
        self.assertTrue(all(type(row["value"]) is int for row in dataset["observations"]))

        training, future = adapter["prepare_input"](dataset)

        for scaling in ("absmax", "minmax"):
            with self.subTest(scaling=scaling):
                case = {
                    "id": f"flat-constant-{scaling}",
                    "workload": {
                        "kind": "stage-f-map",
                        "configuration": {
                            "growth": "flat", "scaling": scaling,
                            "changepoints": {"mode": "explicit", "timestamps": []},
                            "changepointPriorScale": 0.05,
                            "seasonalities": [], "events": [], "regressors": [],
                        },
                        "pythonOptimizer": {
                            "algorithm": "LBFGS", "maxIterations": 10_000,
                            "newtonFallback": False,
                        },
                    },
                }
                model = adapter["fit_model"](training, case)
                encoded = adapter["model_to_json"](model)
                restored = adapter["model_from_json"](encoded)

                self.assertEqual(model.scaling, scaling)
                self.assertEqual(restored.scaling, scaling)
                self.assertEqual(model.y_min, 35.0 if scaling == "minmax" else 0.0)
                self.assertEqual(model.y_scale, 1.0 if scaling == "minmax" else 35.0)
                np.testing.assert_array_equal(model.predict(future)["yhat"], 35.0)
                np.testing.assert_array_equal(restored.predict(future)["yhat"], 35.0)
                self.assertEqual(adapter["model_to_json"](model), encoded)

        self.assertEqual(dataset, original)
        self.assertEqual(path.read_bytes(), contents)


class PythonLogisticReferenceTest(unittest.TestCase):
    def case(self, count=96, empty=False, defaults=False, prior_scale=0.05):
        return {
            "id": "logistic-reference-test",
            "workload": {
                "kind": "stage-f-map",
                **({"fitRequest": "growth-only"} if defaults else {}),
                "configuration": {
                    "growth": "logistic", "scaling": "absmax",
                    "changepoints": {"mode": "explicit", "timestamps": [] if empty
                                     else ["2020-02-08T00:00:00.000Z"]},
                    "changepointPriorScale": prior_scale,
                    "seasonalities": [], "events": [], "regressors": [],
                },
                "pythonOptimizer": {
                    "algorithm": "Auto", "maxIterations": 10_000,
                    "newtonFallback": True, "sigFigs": 12,
                },
            },
        }

    def dataset(self, count):
        path = BENCHMARK_ROOT / "inputs" / "v2" / f"logistic-basic-{count}.json"
        return adapter["prepare_input"](json.loads(path.read_bytes()))

    def test_growth_only_does_not_disable_builtin_seasonalities(self):
        model = adapter["configure_model"](self.case(defaults=True))
        direct = adapter["Prophet"](growth="logistic", uncertainty_samples=0)
        for field in ("scaling", "n_changepoints", "changepoint_range",
                      "changepoint_prior_scale", "weekly_seasonality",
                      "daily_seasonality", "yearly_seasonality"):
            self.assertEqual(getattr(model, field), getattr(direct, field))
        self.assertEqual(model.weekly_seasonality, "auto")

    def test_auto_fitting_uses_python_newton_below_100_and_lbfgs_at_100(self):
        for count, algorithm in ((99, "newton"), (100, "lbfgs")):
            with self.subTest(count=count):
                training, _ = self.dataset(count)
                model = adapter["fit_model"](training, self.case(count=count))
                self.assertIn(f"algorithm={algorithm}", model.stan_fit.runset.cmd(0))
                evidence = adapter["map_optimizer_evidence"](model)
                self.assertAlmostEqual(evidence["objective"],
                                       -model.stan_fit.optimized_params_dict["lp__"], places=6)
                self.assertTrue(np.isfinite(evidence["stationarityResidual"]))

    def test_empty_point_evidence_uses_private_prefold_executable_state(self):
        training, _ = self.dataset(96)
        for prior_scale in (0.05, 10):
            with self.subTest(prior_scale=prior_scale):
                model = adapter["fit_model"](training, self.case(empty=True, prior_scale=prior_scale))
                self.assertEqual(len(model.changepoints), 0)
                self.assertEqual(model.changepoints_t.tolist(), [0])
                # Public delta is zero after Prophet folds it into k; the executable retains it.
                self.assertEqual(model.params["delta"].tolist(), [[0]])
                if prior_scale == 10:
                    self.assertGreater(abs(model.stan_fit.optimized_params_dict["delta[1]"]), 0.1)
                evidence = adapter["map_optimizer_evidence"](model)
                self.assertAlmostEqual(evidence["objective"],
                                       -model.stan_fit.optimized_params_dict["lp__"], places=6)


if __name__ == "__main__":
    unittest.main()
