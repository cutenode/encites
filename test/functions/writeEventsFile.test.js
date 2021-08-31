const { getPublicGitHubEvents, writeEventsFile } = require('../../')
const dates = require('../util/dates')
const users = require('../util/people')
const createPaths = require('../util/paths')

const paths = createPaths(dates)

async function test () {
  // fetch raw API data from GitHub
  const rawData = await getPublicGitHubEvents(users)

  // save our publicData for future use
  writeEventsFile(`${paths.raw}`, rawData)
}

test()
