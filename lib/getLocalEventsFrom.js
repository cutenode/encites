const fs = require('fs').promises
const path = require('path')
const { DateTime } = require('luxon')

// this is an internal helper to read our megafile which should
// have all of our events
async function fetchMegafile (pathToReadMegafileFrom) {
  const normalizedPath = path.resolve(pathToReadMegafileFrom)
  const megafilePath = await fs.stat(normalizedPath)

  if (megafilePath.isFile()) {
    const megafile = await fs.readFile(normalizedPath, { encoding: 'utf8' })
    return megafile
  }

  if (megafilePath.isDirectory()) {
    throw new Error('Path passed was a directory, not a file. You need to pass a file.')
  }
}

// the date method here will give you all events FROM the date pased
// UNTIL when the code is run.
async function date (pathToReadEventsFrom, date) {
  const parsedDate = DateTime.fromISO(date)

  const events = await fetchMegafile(pathToReadEventsFrom)
  const parsedEvents = JSON.parse(events)

  const eventsAfterDate = parsedEvents.filter(event => {
    const eventDate = DateTime.fromISO(event.date)
    return parsedDate < eventDate
  })

  return eventsAfterDate
}

// the period method here will give you all events from the start date
// passed UNTIL the end date passed. If there are events after the end date,
// they will not be incldued.
async function period (pathToReadEventsFrom, startDate, endDate) {
  const parsedStartDate = DateTime.fromISO(startDate).toMillis()
  const parsedEndDate = DateTime.fromISO(endDate).toMillis()

  const events = await fetchMegafile(pathToReadEventsFrom)
  const parsedEvents = JSON.parse(events)

  const eventsInPeriod = parsedEvents.filter(event => {
    const eventDate = DateTime.fromISO(event.date).toMillis()
    console.log(`Event Title: ${event.title}`)
    console.log(`Parsed Start Date: ${parsedStartDate}`)
    console.log(`Event Date: ${eventDate}`)
    console.log(`Parsed Stop Date: ${parsedEndDate}`)
    console.log(`Expression Check: ${(parsedStartDate < eventDate) && (eventDate < parsedEndDate)}`)
    console.log()
    return (parsedStartDate < eventDate) && (eventDate < parsedEndDate)
  })

  return eventsInPeriod
}

module.exports = {
  date,
  period
}
