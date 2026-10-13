import { benchmarkBuilderName, ensureBenchmarkBuilder } from "./docker-builder.ts";

if (!ensureBenchmarkBuilder()) {
  process.stderr.write(`Could not create Docker builder ${benchmarkBuilderName}\n`);
  process.exitCode = 1;
}
