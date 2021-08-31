const path = require('path')
const safeWriteFileToPath = require('./safeWriteFileToPath')
const safeDirectory = require('./safeDirectory')
const { DateTime } = require('luxon')
const logger = require('../../logging/logger')

async function writeInstanceOfData (dataDirectory, events, options) {
  try {
    const now = DateTime.now().toISODate()
    const usableOptions = {}
    const directory = safeDirectory(dataDirectory)

    logger(__filename, `now: ${now}`)
    logger(__filename, `resolvedPath: ${directory}`)

    if (options === undefined) {
      usableOptions.filename = `${now}.json`
      logger(__filename, `no custom options being used, setting filename to ${now}.json`)
    } else {
      usableOptions.filename = options.filename
      logger(__filename, `custom options being used, setting filename to ${options.filename}`)
    }
    const pathAndFileName = path.join(`${directory}/${usableOptions.filename}`)

    // write the actual file
    safeWriteFileToPath(pathAndFileName, JSON.stringify(events, null, 2))
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = writeInstanceOfData
