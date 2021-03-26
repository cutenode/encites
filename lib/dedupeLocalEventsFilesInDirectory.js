const { readdir, readFile } = require('fs').promises
const path = require('path')

async function dedupeLocalEventsFilesInDirectory (dataDirectory, megafileName) {
  try {
    const resolvedDirectory = path.resolve(dataDirectory)

    const filesInDirectory = await readdir(resolvedDirectory)

    let allGitHubEvents = []

    for await (const file of filesInDirectory) {
      if (file !== `${megafileName}.json`) { // TODO: validate that megafileName exists. If megafile isn't passed, it'll currently skip `undefined.json`.
        const rawContents = await readFile(path.resolve(`${resolvedDirectory}/${file}`), { encoding: 'utf-8' })
        const contents = JSON.parse(rawContents)

        if (allGitHubEvents.length === 0) {
        // directly assign contents to entries if there are no events in entries
          allGitHubEvents = contents
        } else {
          const entriesIds = allGitHubEvents.map((githubEvent) => githubEvent.id)
          const result = contents
            .filter((githubEvent) => !entriesIds.includes(githubEvent.id))
            .map((githubEvent) => {
              return {
                id: githubEvent.id,
                type: githubEvent.type,
                author: githubEvent.author,
                repo: githubEvent.repo,
                title: githubEvent.title,
                link: githubEvent.link,
                number: githubEvent.number,
                date: githubEvent.date,
                action: githubEvent.action
              }
            })

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
