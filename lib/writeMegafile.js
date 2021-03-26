const dedupeLocalEventsFilesInDirectory = require('./dedupeLocalEventsFilesInDirectory')
const writeEventsFile = require('./writeEventsFile')

async function writeMegafile (dataPath, megafileFileName) {
  try {
    const dedupedData = await dedupeLocalEventsFilesInDirectory(dataPath)

    await writeEventsFile(`${dataPath}`, dedupedData, { filename: megafileFileName })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = writeMegafile
