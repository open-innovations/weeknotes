function getNextFriday(dateString?: string) {
  const nextFriday = dateString ? new Date(dateString) : new Date();
  // Zero out the hours
  nextFriday.setUTCHours(0, 0, 0, 0);
  // Set to the next Friday
  nextFriday.setUTCDate(nextFriday.getUTCDate() + (12 - nextFriday.getUTCDay()) % 7);
  return nextFriday.toISOString().split('T')[0];
}

export default function (week_ending: string) {
  const index = Array.from(Deno.readDirSync('src/weeknotes'))
    .filter(x => x.isFile && x.name.endsWith('.md'))
    .length + 1;
  const date = getNextFriday(week_ending);

  console.log(`Creating weeknote for ${date}...`);

  return {
    path: `/weeknotes/${ date }.md`,
    content: {
      week_ending: new Date(date),
      draft: true,
      title: `Weeknotes #${ index }`,
      description: "TODO Put a broad summary of the contents here. Used in social media links etc. No more than 2 lines. It's for this https://ahrefs.com/blog/seo-meta-tags/#meta-description"
    },
  };
}