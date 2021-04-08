const { readdir, readFile } = require('fs').promises
const path = require('path')
const logger = require('pino')()
const log = process.env.ENCITES_LOGGER
const prefix = `${__filename}:`

async function dedupeLocalEventsFilesInDirectory (dataDirectory, megafileName) {
  if (log) logger.info(`${prefix} dataDirectory: ${dataDirectory}`)
  if (log) logger.info(`${prefix} megafileName: ${megafileName}`)
  try {
    const resolvedDirectory = path.resolve(dataDirectory)
    const filesInDirectory = await readdir(resolvedDirectory)

    if (log) logger.info(`${prefix} resolvedDirectory: ${resolvedDirectory}`)
    if (log) logger.info(`${prefix} filesInDirectory: ${filesInDirectory}`)

    let allGitHubEvents = []

    for await (const file of filesInDirectory) {
      if (file !== `${megafileName}.json`) { // TODO: validate that megafileName exists. If megafile isn't passed, it'll currently skip `undefined.json`.
        const rawContents = await readFile(path.resolve(`${resolvedDirectory}/${file}`), { encoding: 'utf-8' })
        const contents = JSON.parse(rawContents)

        if (allGitHubEvents.length === 0) {
          if (log) logger.info(`${prefix} allGitHubEvents.length is '0' and we're direclty assigning 'contents' to it.`)
          // directly assign contents to entries if there are no events in entries
          allGitHubEvents = contents
        } else {
          if (log) logger.info(`${prefix} about to start mapping events.`)
          const entriesIds = allGitHubEvents.map((event) => event.id)
          const result = contents
            .filter((event) => !entriesIds.includes(event.id))
            .map((event) => {
              return event
            })
          if (log) logger.info(`${prefix} done mapping events.`)

          for (const event of result) {
            allGitHubEvents.push(event)
          }
        }
      }
    }
    return allGitHubEvents
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = dedupeLocalEventsFilesInDirectory
