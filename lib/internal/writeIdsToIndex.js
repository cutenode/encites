const fs = require('fs')
const path = require('path')

async function dedupeLocalData (pathToWriteTo, indexFileName, associatedFilename, idsToWrite) {
  const resolvedPath = path.resolve(pathToWriteTo)
  const pathAndFileName = path.join(pathToWriteTo, `${indexFileName}.json`)

  const dataToWriteToPath = {}

  dataToWriteToPath[associatedFilename] = idsToWrite

  fs.writeFile(pathAndFileName, JSON.stringify(dataToWriteToPath, null, 2), (error) => {
    if (error) throw error

    return true
  })

  returh false
}

module.exports = dedupeLocalData