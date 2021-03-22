const fs = require('fs')
const path = require('path')
const { DateTime } = require('luxon')

async function writeInstanceOfData (pathToWriteTo, eventDataToWriteToPath, options) {
  const now = DateTime.now().toISODate()
  const resolvedPath = path.resolve(pathToWriteTo)
  const usableOptions = {}

  if (options === undefined) {
    usableOptions.filename = `${now}.json`
  } else {
    usableOptions.filename = options.filename
  }
  const pathAndFileName = path.join(`${resolvedPath}/${usableOptions.filename}`)

  // write the actual file
  fs.writeFile(pathAndFileName, JSON.stringify(eventDataToWriteToPath, null, 2), (error) => {
    if (error) throw error

    return true
  })

  return false
}

module.exports = writeInstanceOfData
