const { Octokit } = require('@octokit/rest')
const logger = require('../../logging/logger')

logger(__filename, 'setting up octokit')
const octokit = new Octokit({
  auth: process.env.ENCITES_GITHUB_PAT, // what we use .env for
  userAgent: 'fetch-activity'
})
logger(__filename, 'set up octokit')

async function getPublicGitHubEvents (githubUsernames) {
  // building out the basic structure for what we'd want to surface
  const userData = []

  logger(__filename, 'starting loop over usernames')
  for (const githubUsername of githubUsernames) {
    logger(__filename, `starting ${githubUsername}`)

    for await (const response of octokit.paginate.iterator(octokit.activity.listPublicEventsForUser, { username: githubUsername, per_page: 100 })) {
      // make a variable so we don't have to directly refer to response.data without context
      const githubActivityEvents = response.data

      logger(__filename, 'pushing response data')
      userData.push(...githubActivityEvents)
      logger(__filename, 'pushed response data')
    }
  }
  logger(__filename, 'finished loop over usernames')

  return userData
}

module.exports = getPublicGitHubEvents
