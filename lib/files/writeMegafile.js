const writeEventsFile = require('./writeEventsFile')
const dedupeLocalEventsFilesInDirectory = require('../events/dedupeLocalEventsFilesInDirectory')

async function writeMegafile (dataPath, megafileFileName) {
  try {
    const dedupedData = await dedupeLocalEventsFilesInDirectory(dataPath)

    await writeEventsFile(`${dataPath}`, dedupedData, { filename: megafileFileName })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = writeMegafile
