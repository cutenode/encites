const { readFile, stat } = require('fs').promises
const path = require('path')
const { DateTime } = require('luxon')
const logger = require('../../logging/logger')

// this is an internal helper to read our megafile which should
// have all of our events
async function fetchMegafile (pathToReadEventsFileFrom) {
  logger(__filename, `pathToReadEventsFileFrom: ${pathToReadEventsFileFrom}`)

  const normalizedPath = path.resolve(pathToReadEventsFileFrom)
  const megafilePath = await stat(normalizedPath)
  logger(__filename, `normalizedPath: ${normalizedPath}`)
  logger(__filename, `megafilePath: ${megafilePath}`)

  if (megafilePath.isFile()) {
    const megafile = await readFile(normalizedPath, { encoding: 'utf8' })
    logger(__filename, `megafile: ${megafile}`)

    return megafile
  }

  if (megafilePath.isDirectory()) {
    throw new Error('Path passed was a directory, not a file. You need to pass a file.')
  }
}

// the date method here will give you all events FROM the date pased
// UNTIL when the code is run.
async function date (eventsFile, startDate) {
  logger(__filename, `eventsFile: ${eventsFile}`)
  logger(__filename, `startDate: ${startDate}`)

  const parsedDate = DateTime.fromISO(startDate)

  const events = await fetchMegafile(eventsFile)
  const parsedEvents = JSON.parse(events)

  logger(__filename, `parsedDate: ${parsedDate}`)
  logger(__filename, `events: ${events}`)
  logger(__filename, `parsedEvents: ${JSON.stringify(parsedEvents, null, 2)}`)

  const eventsAfterDate = parsedEvents.filter(event => {
    const eventDate = DateTime.fromISO(event.date)
    const comparison = parsedDate < eventDate
    logger(__filename, `eventDate: ${eventDate}`)
    logger(__filename, `comparison: ${comparison}`)
    return comparison
  })

  return eventsAfterDate
}

// the period method here will give you all events from the start date
// passed UNTIL the end date passed. If there are events after the end date,
// they will not be incldued.
async function period (eventsFile, startDate, endDate) {
  logger(__filename, `eventsFile: ${eventsFile}`)
  logger(__filename, `startDate: ${startDate}`)
  logger(__filename, `endDate: ${endDate}`)
  const parsedStartDate = DateTime.fromISO(startDate).toMillis()
  const parsedEndDate = DateTime.fromISO(endDate).toMillis()

  const events = await fetchMegafile(eventsFile)
  const parsedEvents = JSON.parse(events)

  logger(__filename, `parsedStartDate: ${parsedStartDate}`)
  logger(__filename, `parsedEndDate: ${parsedEndDate}`)
  logger(__filename, `events: ${events}`)
  logger(__filename, `parsedEvents: ${JSON.stringify(parsedEvents, null, 2)}`)

  const eventsInPeriod = parsedEvents.filter(event => {
    const eventDate = DateTime.fromISO(event.date).toMillis()
    const comparison = (parsedStartDate < eventDate) && (eventDate < parsedEndDate)

    logger(__filename, `eventDate: ${eventDate}`)
    logger(__filename, `comparison: ${comparison}`)

    return comparison
  })

  return eventsInPeriod
}

module.exports = {
  date,
  period
}
