require('dotenv').config()
const logger = require('pino')()
const log = process.env.ENCITES_LOGGER

if (log) logger.info(`file: ${__filename}`)

const { Octokit } = require('@octokit/rest')

if (log) logger.info('setting up octokit')
const octokit = new Octokit({
  auth: process.env.ENCITES_GITHUB_PAT, // what we use .env for
  userAgent: 'fetch-activity'
})
if (log) logger.info('set up octokit')

async function getPublicGitHubEvents (githubUsernames) {
  // building out the basic structure for what we'd want to surface
  const userData = []

  if (log) logger.info('starting loop over usernames')
  for (const githubUsername of githubUsernames) {
    if (log) logger.info(`starting ${githubUsername}`)

    for await (const response of octokit.paginate.iterator(octokit.activity.listPublicEventsForUser, { username: githubUsername })) {
    // make a variable so we don't have to directly refer to response.data without context
      const githubActivityEvents = response.data

      if (log) logger.info('pushing response data')
      userData.push(...githubActivityEvents)
      if (log) logger.info('pushed response data')
    }
  }
  if (log) logger.info('finished loop over usernames')

  if (log) logger.info('returning userData')
  return userData
}

module.exports = getPublicGitHubEvents
