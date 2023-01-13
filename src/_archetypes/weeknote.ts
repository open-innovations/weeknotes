export default function (week_ending: string) {
  const index = Array.from(Deno.readDirSync('src/weeknotes'))
    .filter(x => x.isFile && x.name.endsWith('.md'))
    .length + 1;
  const date = new Date(Date.parse(week_ending)).toISOString().split('T')[0];

  return {
    path: `/weeknotes/${ date }.md`,
    content: {
      week_ending: date,
      draft: true,
      title: `Weeknotes #${ index }`,
    },
  };
}