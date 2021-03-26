const fs = require('fs').promises
const path = require('path')
const { DateTime } = require('luxon')

// this is an internal helper to read our megafile which should
// have all of our events
async function fetchMegafile (pathToReadEventsFileFrom) {
  try {
    const normalizedPath = path.resolve(pathToReadEventsFileFrom)
    const megafilePath = await fs.stat(normalizedPath)

    if (megafilePath.isFile()) {
      const megafile = await fs.readFile(normalizedPath, { encoding: 'utf8' })
      return megafile
    }

    if (megafilePath.isDirectory()) {
      throw new Error('Path passed was a directory, not a file. You need to pass a file.')
    }
  } catch (error) {
    throw new Error(error)
  }
}

// the date method here will give you all events FROM the date pased
// UNTIL when the code is run.
async function date (eventsFile, startDate) {
  try {
    const parsedDate = DateTime.fromISO(startDate)

    const events = await fetchMegafile(eventsFile)
    const parsedEvents = JSON.parse(events)

    const eventsAfterDate = parsedEvents.filter(event => {
      const eventDate = DateTime.fromISO(event.date)
      return parsedDate < eventDate
    })

    return eventsAfterDate
  } catch (error) {
    throw new Error(error)
  }
}

// the period method here will give you all events from the start date
// passed UNTIL the end date passed. If there are events after the end date,
// they will not be incldued.
async function period (eventsFile, startDate, endDate) {
  try {
    const parsedStartDate = DateTime.fromISO(startDate).toMillis()
    const parsedEndDate = DateTime.fromISO(endDate).toMillis()

    const events = await fetchMegafile(eventsFile)
    const parsedEvents = JSON.parse(events)

    const eventsInPeriod = parsedEvents.filter(event => {
      const eventDate = DateTime.fromISO(event.date).toMillis()
      return (parsedStartDate < eventDate) && (eventDate < parsedEndDate)
    })

    return eventsInPeriod
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  date,
  period
}
