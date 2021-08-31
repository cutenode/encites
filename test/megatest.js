const { getPublicGitHubEvents, filterPublicGitHubEvents, getEventsFrom, writeEventsFile, writeMarkdownFile, writeMegafile } = require('../')
const users = require('./util/people')
const dates = require('./util/dates')
const createPaths = require('./util/paths')
const createHeadings = require('./util/headings')

const paths = createPaths(dates)
const headings = createHeadings(dates)

async function teamData () {
  // fetch data from GitHub
  const rawData = await getPublicGitHubEvents(users)
  // fetches public data from  the GitHub API
  const data = await filterPublicGitHubEvents(rawData)

  // save our publicData for future use
  writeEventsFile(`${paths.raw}`, rawData)
  // attempt to save our data as a Megafile?
  writeMegafile(`${paths.raw}`, paths.megafile)

  // write single instance of data
  writeEventsFile(`${paths.data}`, data)
  // write the megafile
  writeMegafile(`${paths.data}`, paths.megafile)

  // // gets all data locally from the megafile, filtering out events *before* the date passed
  const dateFilteredEvents = await getEventsFrom.period(`${paths.data}${paths.megafile}`, paths.dateToCheck.from, paths.dateToCheck.until)

  // // write the markdown to the correct location
  writeMarkdownFile(paths.reports.weekly, paths.filenames.weekly, dateFilteredEvents, headings.weekly)
}

teamData()
