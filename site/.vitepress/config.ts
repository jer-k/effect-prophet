import { defineConfig } from "vitepress";

import { benchmarkFeatures, benchmarkSuites, featurePath, suitePath } from "./benchmarks/suite.ts";

const repository = "https://github.com/jer-k/effect-prophet";

export default defineConfig({
  title: "Effect Prophet",
  description: "Time-series forecasting for TypeScript, built on Effect and modeled on Prophet.",
  base: "/effect-prophet/",
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["snippets/**", "scripts/**"],

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Examples", link: "/examples/trend" },
      { text: "Python Prophet", link: "/python/coming-from-python" },
      { text: "Benchmarks", link: "/benchmarks/" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "What is Effect Prophet?", link: "/guide/introduction" },
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "Effect in five minutes", link: "/guide/effect-basics" },
          { text: "Preparing your data", link: "/guide/your-data" },
          { text: "Reading a forecast", link: "/guide/reading-forecasts" },
          { text: "Tracing", link: "/guide/tracing" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Trends and changepoints", link: "/examples/trend" },
          { text: "Seasonality", link: "/examples/seasonality" },
          { text: "Holidays and events", link: "/examples/events" },
          { text: "Extra factors (regressors)", link: "/examples/regressors" },
          { text: "Growth with a ceiling", link: "/examples/saturating-growth" },
          { text: "Flat trends", link: "/examples/flat-trend" },
          { text: "Uncertainty ranges", link: "/examples/uncertainty" },
          { text: "Saving and loading models", link: "/examples/saving-models" },
          { text: "Testing forecast accuracy", link: "/examples/cross-validation" },
          { text: "Choosing settings", link: "/examples/tuning" },
          { text: "Handling errors", link: "/examples/errors" },
        ],
      },
      {
        text: "Python Prophet",
        items: [
          { text: "Coming from Python", link: "/python/coming-from-python" },
          { text: "How close are the results?", link: "/python/accuracy" },
          { text: "What's different", link: "/python/differences" },
        ],
      },
      {
        text: "Benchmarks",
        items: [
          { text: "Overview", link: "/benchmarks/" },
          {
            text: "By trend",
            items: benchmarkSuites.map((suite) => ({
              text: suite.title,
              link: suitePath(suite),
            })),
          },
          {
            text: "By feature",
            items: benchmarkFeatures.map((feature) => ({
              text: feature.title,
              link: featurePath(feature),
            })),
          },
        ],
      },
    ],

    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: repository }],

    editLink: {
      pattern: `${repository}/edit/main/site/:path`,
      text: "Suggest a change to this page",
    },

    footer: {
      message: "Inspired by Prophet from Meta. Not affiliated with Meta.",
    },
  },
});
