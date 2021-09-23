const { getPublicGitHubEvents, writeEventsFile, writeMegafile } = require('../../')
const users = require('../util/people')
const dates = require('../util/dates')
const createPaths = require('../util/paths')

const paths = createPaths(dates)

async function test () {
  // fetch data from GitHub
  const rawData = await getPublicGitHubEvents(users)
  const rawPath = `${paths.raw}`

  await writeEventsFile(rawPath, rawData)
  await writeMegafile(rawPath, paths.filenames.megafile)
}

test()
