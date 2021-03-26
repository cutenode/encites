const path = require('path')
const safeWriteFileToPath = require('./safeWriteFileToPath')
const { DateTime } = require('luxon')

async function writeInstanceOfData (dataDirectory, events, options) {
  try {
    const now = DateTime.now().toISODate()
    const resolvedPath = path.resolve(dataDirectory)
    const usableOptions = {}

    if (options === undefined) {
      usableOptions.filename = `${now}.json`
    } else {
      usableOptions.filename = options.filename
    }
    const pathAndFileName = path.join(`${resolvedPath}/${usableOptions.filename}`)

    // write the actual file
    safeWriteFileToPath(pathAndFileName, JSON.stringify(events, null, 2))
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = writeInstanceOfData
