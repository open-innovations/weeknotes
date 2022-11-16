import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";
import netlify_cms from "lume/plugins/netlify_cms.ts";
import terser from "lume/plugins/terser.ts";

const site = lume();

site.use(base_path());
site.use(metas());
site.use(date());
site.use(netlify_cms());
site.use(terser());

export default site;
