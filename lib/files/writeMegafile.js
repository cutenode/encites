const writeEventsFile = require('./writeEventsFile')
const safeDirectory = require('./safeDirectory')
const dedupeLocalEventsFilesInDirectory = require('../events/dedupeLocalEventsFilesInDirectory')
const logger = require('../../logging/logger')

async function writeMegafile (dataDirectory, megafileFileName) {
  try {
    logger(__filename, `dataDirectory: ${dataDirectory}`)
    logger(__filename, `megafileFileName: ${megafileFileName}`)
    const directory = await safeDirectory(dataDirectory)

    logger(__filename, 'awaiting deuped data')
    const dedupedData = await dedupeLocalEventsFilesInDirectory(directory, megafileFileName)
    logger(__filename, 'collected deduped data')

    logger(__filename, 'beginning to write megafile')
    const writeFile = await writeEventsFile(`${directory}`, dedupedData, { filename: megafileFileName })
    logger(__filename, 'wrote megafile')

    return writeFile
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = writeMegafile
