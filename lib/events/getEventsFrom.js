const fs = require('fs').promises
const path = require('path')
const { DateTime } = require('luxon')
const logger = require('pino')()
const log = process.env.ENCITES_LOGGER
const prefix = `${__filename}:`

// this is an internal helper to read our megafile which should
// have all of our events
async function fetchMegafile (pathToReadEventsFileFrom) {
  if (log) logger.info(`${prefix} pathToReadEventsFileFrom: ${pathToReadEventsFileFrom}`)
  try {
    const normalizedPath = path.resolve(pathToReadEventsFileFrom)
    const megafilePath = await fs.stat(normalizedPath)
    if (log) logger.info(`${prefix} normalizedPath: ${normalizedPath}`)
    if (log) logger.info(`${prefix} megafilePath: ${megafilePath}`)

    if (megafilePath.isFile()) {
      const megafile = await fs.readFile(normalizedPath, { encoding: 'utf8' })
      if (log) logger.info(`${prefix} megafile: ${megafile}`)

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
  if (log) logger.info(`${prefix} eventsFile: ${eventsFile}`)
  if (log) logger.info(`${prefix} startDate: ${startDate}`)
  try {
    const parsedDate = DateTime.fromISO(startDate)

    const events = await fetchMegafile(eventsFile)
    const parsedEvents = JSON.parse(events)

    if (log) logger.info(`${prefix} parsedDate: ${parsedDate}`)
    if (log) logger.info(`${prefix} events: ${events}`)
    if (log) logger.info(`${prefix} parsedEvents: ${parsedEvents}`)

    const eventsAfterDate = parsedEvents.filter(event => {
      const eventDate = DateTime.fromISO(event.date)
      const comparison = parsedDate < eventDate
      if (log) logger.info(`${prefix} eventDate: ${eventDate}`)
      if (log) logger.info(`${prefix} comparison: ${comparison}`)
      return comparison
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
  if (log) logger.info(`${prefix} eventsFile: ${eventsFile}`)
  if (log) logger.info(`${prefix} startDate: ${startDate}`)
  if (log) logger.info(`${prefix} endDate: ${endDate}`)

  try {
    const parsedStartDate = DateTime.fromISO(startDate).toMillis()
    const parsedEndDate = DateTime.fromISO(endDate).toMillis()

    const events = await fetchMegafile(eventsFile)
    const parsedEvents = JSON.parse(events)

    if (log) logger.info(`${prefix} parsedStartDate: ${parsedStartDate}`)
    if (log) logger.info(`${prefix} parsedEndDate: ${parsedEndDate}`)
    if (log) logger.info(`${prefix} events: ${events}`)
    if (log) logger.info(`${prefix} parsedEvents: ${parsedEvents}`)

    const eventsInPeriod = parsedEvents.filter(event => {
      const eventDate = DateTime.fromISO(event.date).toMillis()
      const comparison = (parsedStartDate < eventDate) && (eventDate < parsedEndDate)

      if (log) logger.info(`${prefix} eventDate: ${eventDate}`)
      if (log) logger.info(`${prefix} comparison: ${comparison}`)

      return comparison
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
