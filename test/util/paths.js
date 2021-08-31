function createPaths (dates) {
  const paths = {
    data: './test/data/', // path to write all our files to.
    raw: './test/raw/', // path to write raw GitHub data to - this allows us to consume it later as we add more events to output
    reports: {
      monthly: './test/reports/monthly/', // path to write monthly reports to
      weekly: './test/reports/weekly/' // path to write weekly reports to
    },
    filenames: {
      monthly: `${dates.lastDayOfPreviousMonth}.md`, // name of the monthly report
      weekly: `${dates.now}.md`, // name of the weekly report
      megafile: 'megafile.json' // name of the megafile. can be whatever, I've just chosen megafile. Needs to be .json.
    },
    dateToCheck: {
      from: dates.checkFrom, // date to start checking for events
      until: dates.checkUntil // date to stop checking for events
    }
  }

  return paths
}

module.exports = createPaths
