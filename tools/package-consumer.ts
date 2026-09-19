import { fit, type Forecast } from "effect-prophet";

const operation = fit([{ timestamp: "2024-01-01T00:00:00.000Z", value: 1 }]);

const forecast: Forecast | undefined = undefined;

void operation;

void forecast;
