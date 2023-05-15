import imagick from "lume/plugins/imagick.ts";
import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import netlify_cms from "lume/plugins/netlify_cms.ts";
import pagefind from "lume/plugins/pagefind.ts";
import postcss from "lume/plugins/postcss.ts";
import sitemap from "lume/plugins/sitemap.ts";
import svgo from "lume/plugins/svgo.ts";

import footnote from "npm:markdown-it-footnote";

// PostCSS Plugins
import cssnano from "npm:cssnano@^5";
import { Page, SiteEvent } from "https://deno.land/x/lume@v1.15.0/core.ts";

const markdown = {
  plugins: [footnote],
};
const search = { returnPageData: true };

const site = lume({
  src: "./src",
  location: new URL("https://weeknotes.open-innovations.org"),
}, { markdown, search });

site.use(base_path());
site.use(metas());
site.use(date());
if (Deno.env.get("ENABLE_NETLIFY") !== undefined) site.use(netlify_cms());
site.use(pagefind());
site.use(postcss({
  plugins: [
    cssnano({ preset: "default" }),
  ],
  keepDefaultPlugins: true,
}));
site.use(sitemap());
site.use(imagick());
site.use(svgo());

["CNAME", ".nojekyll"].forEach((f) => site.copy(f));

/**
 * Before the render happens, work out the most recent weeknote,
 * then store the description in latest description for all pages
 */
site.preprocessAll([".html"], (pages) => {
  const latestPage = pages.filter((page) =>
    page.data.tags?.includes("weeknote") &&
    page.data.draft !== true
  )
    .sort((a, b) => a.data.week_ending > b.data.week_ending ? 1 : -1)
    .pop();
  if (!latestPage) return;
  pages.forEach((page) =>
    page.data.latestDescription = latestPage.data.description
  );
});

export default site;
