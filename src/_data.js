import site from '../_config.ts';

export const latestBlurb = site.pages
  .map(x => ({
    tags: x.data.tags,
    date: x.data.week_ending,
    description: x.data.description
  }))
  .filter(x => x.tags?.includes('weeknote'))
  .sort((a, b) => a.date > b.date ? 1 : -1)
  .pop()
  .description;
