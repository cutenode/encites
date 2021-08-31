const { getEventsFrom } = require('../../')
const dates = require('../util/dates')
const createPaths = require('../util/paths')

const paths = createPaths(dates)

async function test () {
  // gets all data locally from the megafile, filtering out events *before* the date passed
  // note: this requires a megafile to actually exist.
  const dateFilteredEvents = await getEventsFrom.period(`${paths.data}${paths.megafile}`, paths.dateToCheck.from, paths.dateToCheck.until)

  console.log(dateFilteredEvents)
}

test()
