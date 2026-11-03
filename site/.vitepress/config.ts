import { defineConfig, type DefaultTheme } from "vitepress";
import llmstxt from "vitepress-plugin-llms";

import { benchmarkFeatures, benchmarkSuites, featurePath, suitePath } from "./benchmarks/suite.ts";

const repository = "https://github.com/jer-k/effect-prophet";

const base = "/effect-prophet/";

const sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "Guide",
    items: [
      { text: "What is Effect Prophet?", link: "/guide/introduction" },
      { text: "Getting started", link: "/guide/getting-started" },
      { text: "Browsers and bundlers", link: "/guide/browsers" },
      { text: "Effect in five minutes", link: "/guide/effect-basics" },
      { text: "Preparing your data", link: "/guide/your-data" },
      { text: "Country holiday calendars", link: "/guide/holiday-calendars" },
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
      { text: "Finding anomalies", link: "/examples/anomalies" },
      { text: "Checking the fit", link: "/examples/residuals" },
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
];

// vitepress-plugin-llms drops the site base from links in nested sidebar groups, so give it each
// top-level group with its nested links lifted into one list.
const flatSidebar = sidebar.map((group) => ({
  ...group,
  items: (group.items ?? []).flatMap((item) => item.items ?? [item]),
}));

// Per-case benchmark pages still get a Markdown copy, but would swamp the llms.txt index and
// llms-full.txt, so those two list only the suite and feature pages.
const benchmarkCases = ["benchmarks/flat/*", "benchmarks/linear/*", "benchmarks/logistic/*"];

/**
 * The Markdown copy the llms plugin writes for a page: `guide/x.md`, `benchmarks.md` for a section
 * index, and `llms.txt` in place of the home page.
 */
const markdownPath = (page: string) => {
  if (page === "index.md") {
    return "llms.txt";
  }

  return page.endsWith("/index.md") ? `${page.slice(0, -"/index.md".length)}.md` : page;
};

export default defineConfig({
  title: "Effect Prophet",
  description: "Time-series forecasting for TypeScript, built on Effect and modeled on Prophet.",
  base,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["snippets/**", "scripts/**"],

  sitemap: { hostname: `https://jer-k.github.io${base}` },

  vite: {
    plugins: [
      llmstxt({
        domain: "https://jer-k.github.io",
        sidebar: flatSidebar,
        ignoreFilesPerOutput: { llmsTxt: benchmarkCases, llmsFullTxt: benchmarkCases },
      }),
    ],
  },

  // Benchmark pages are generated, so they get their description here rather than in frontmatter.
  transformPageData: (pageData) => {
    if (!pageData.relativePath.startsWith("benchmarks/")) {
      return;
    }

    const match = /^benchmarks\/(flat|linear|logistic)\//.exec(pageData.relativePath);

    pageData.description =
      match === null
        ? `${pageData.title}: Effect Prophet compared with Python Prophet 1.4.0.`
        : `${pageData.title}, ${match[1]} growth: a benchmark case comparing Effect Prophet with Python Prophet 1.4.0.`;
  },

  // Point tools at each page's Markdown copy. The plugin means to add this link, but doesn't.
  transformHead: ({ page }) =>
    page === "404.md"
      ? []
      : [
          [
            "link",
            { rel: "alternate", type: "text/markdown", href: `${base}${markdownPath(page)}` },
          ],
        ],

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Examples", link: "/examples/trend" },
      { text: "Python Prophet", link: "/python/coming-from-python" },
      { text: "Benchmarks", link: "/benchmarks/" },
    ],

    sidebar,

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
