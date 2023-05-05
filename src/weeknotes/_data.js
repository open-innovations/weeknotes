export const url = (page) => '/week/' + page.src.slug + '/';
export const templateEngine = ['njk', 'md'];

export const tags = ['weeknote'];
export const metas = {
  description: "=description",
}