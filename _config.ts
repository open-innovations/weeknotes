import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";
import netlify_cms from "lume/plugins/netlify_cms.ts";
import postcss from "lume/plugins/postcss.ts";

const search = { returnPageData: true };

const site = lume({
  location: new URL("https://weeknotes.open-innovations.org"),
}, { search });

site.use(base_path());
site.use(metas({
  defaultPageData: {
    title: 'title', // Use the `date` value as fallback.
  },
}));
site.use(date());
if (Deno.env.get('ENABLE_NETLIFY') !== undefined) site.use(netlify_cms());
site.use(postcss());

site.ignore('README.md');
['CNAME', '.nojekyll'].forEach(f => site.copy(f));

export default site;
