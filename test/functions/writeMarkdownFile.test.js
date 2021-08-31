const { getEventsFrom, writeMarkdownFile } = require('../../')
const dates = require('../util/dates')
const createPaths = require('../util/paths')
const createHeadings = require('../util/headings')

const paths = createPaths(dates)
const headings = createHeadings(dates)

async function test () {
  // gets all data locally from the megafile, filtering out events *before* the date passed
  // note: this requires a megafile to actually exist.
  const dateFilteredEvents = await getEventsFrom.period(`${paths.data}${paths.megafile}`, paths.dateToCheck.from, paths.dateToCheck.until)

  // write the markdown to the correct location
  writeMarkdownFile(paths.reports.weekly, paths.filenames.weekly, dateFilteredEvents, headings.weekly)
}

test()
