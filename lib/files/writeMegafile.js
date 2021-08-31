const writeEventsFile = require('./writeEventsFile')
const safeDirectory = require('./safeDirectory')
const dedupeLocalEventsFilesInDirectory = require('../events/dedupeLocalEventsFilesInDirectory')
const logger = require('../../logging/logger')

async function writeMegafile (dataDirectory, megafileFileName) {
  try {
    const directory = safeDirectory(dataDirectory)

    logger(__filename, 'awaiting deuped data')
    const dedupedData = await dedupeLocalEventsFilesInDirectory(directory)
    logger(__filename, 'collected deduped data')

    logger(__filename, 'beginning to write megafile')
    await writeEventsFile(`${directory}`, dedupedData, { filename: megafileFileName })
    logger(__filename, 'wrote megafile')
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = writeMegafile
