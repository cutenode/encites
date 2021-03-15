const fs = require('fs')
const path = require('path')
const { DateTime } = require('luxon')

async function writeInstanceOfData (pathToWriteTo, eventDataToWriteToPath) {
  const now = DateTime.now().toISODate()
  const resolvedPath = path.resolve(pathToWriteTo)
  const pathAndFileName = path.join(resolvedPath, `${now}.json`)

  const idsToWriteToIndexFile = []

  // write the actual file
  fs.writeFile(pathAndFileName, JSON.stringify(eventDataToWriteToPath, null, 2), (error) => {
    if (error) throw error

    return true
  })

  return false
}

module.exports = writeInstanceOfData
