const { getPublicGitHubEvents } = require('../../')
const users = require('../util/people')

async function test () {
  // fetch data from GitHub
  const rawData = await getPublicGitHubEvents(users)

  console.log(rawData)
}

test()
