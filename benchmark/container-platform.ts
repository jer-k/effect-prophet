/** Docker platforms supported by the pinned benchmark images and dependencies. */
export type BenchmarkContainerPlatform = "linux/arm64" | "linux/amd64";

const nativePlatform = (hostArchitecture: string): BenchmarkContainerPlatform => {
  switch (hostArchitecture) {
    case "arm64":
      return "linux/arm64";
    case "x64":
      return "linux/amd64";
    default:
      throw new Error(
        `Unsupported host architecture ${hostArchitecture}; set BENCHMARK_CONTAINER_PLATFORM explicitly`,
      );
  }
};

/** A resolved benchmark container platform relative to its host. */
export interface ContainerPlatformResolution {
  readonly platform: BenchmarkContainerPlatform;
  readonly nativePlatform: BenchmarkContainerPlatform;
  readonly emulated: boolean;
}

/** Resolve the requested container platform and whether it differs from the host architecture. */
export const resolveContainerPlatform = (
  hostArchitecture: string,
  override?: string,
): ContainerPlatformResolution => {
  const hostPlatform = nativePlatform(hostArchitecture);
  const selected = override ?? hostPlatform;

  if (selected !== "linux/arm64" && selected !== "linux/amd64") {
    throw new Error(`Unsupported container platform ${selected}`);
  }

  return {
    platform: selected,
    nativePlatform: hostPlatform,
    emulated: selected !== hostPlatform,
  };
};
