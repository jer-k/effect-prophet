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


if __name__ == "__main__":
    unittest.main()
