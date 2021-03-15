const { readdir, readFile } = require('fs').promises
const path = require('path')

async function dedupeLocalData (pathToLocalFiles, megafileName) {
  const resolvedPath = path.resolve(pathToLocalFiles)

  const files = await readdir(resolvedPath)

  let allGitHubEvents = []

  for await (const file of files) {
    if (file !== `${megafileName}.json`) {
      const rawContents = await readFile(path.resolve(`${resolvedPath}/${file}`), { encoding: 'utf-8' })
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
}

module.exports = dedupeLocalData
