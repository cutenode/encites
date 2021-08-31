const { readdir, readFile } = require('fs').promises
const path = require('path')
const logger = require('../../logging/logger')

async function dedupeLocalEventsFilesInDirectory (dataDirectory, megafileName) {
  try {
    logger(__filename, `dataDirectory: ${dataDirectory}`)
    logger(__filename, `megafileName: ${megafileName}`)
    const resolvedDirectory = path.resolve(dataDirectory)
    const filesInDirectory = await readdir(resolvedDirectory)

    logger(__filename, `resolvedDirectory: ${resolvedDirectory}`)
    logger(__filename, `filesInDirectory: ${filesInDirectory}`)

    let allGitHubEvents = []

    for await (const file of filesInDirectory) {
      if (file !== `${megafileName}.json`) { // TODO: validate that megafileName exists. If megafile isn't passed, it'll currently skip `undefined.json`.
        const rawContents = await readFile(path.resolve(`${resolvedDirectory}/${file}`), { encoding: 'utf-8' })
        const contents = JSON.parse(rawContents)

        if (allGitHubEvents.length === 0) {
          logger(__filename, 'allGitHubEvents.length is \'0\' and we\'re direclty assigning \'contents\' to it.')
          // directly assign contents to entries if there are no events in entries
          allGitHubEvents = contents
        } else {
          logger(__filename, 'about to start mapping events.')
          const entriesIds = allGitHubEvents.map((event) => event.id)
          const result = contents
            .filter((event) => !entriesIds.includes(event.id))
            .map((event) => {
              return event
            })
          logger(__filename, 'done mapping events.')

          for (const event of result) {
            allGitHubEvents.push(event)
          }
        }
      }
    }
    return allGitHubEvents
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = dedupeLocalEventsFilesInDirectory
