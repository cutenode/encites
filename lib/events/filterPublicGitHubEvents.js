const logger = require('../../logging/logger')

async function filterPublicGitHubEvents (events) {
  logger(__filename, `length of 'events': ${events.length}`)

  // building out the basic structure for what we'd want to surface
  const userData = []

  // loop over our data from GitHub and push it into userData
  for (const singleEvent in events) {
    const event = events[singleEvent]

    logger(__filename, `event: event.type is ${event.type}`)
    logger(__filename, `event: event.payload.action is ${event.payload.action}`)

    const eventDataToReturn = { // got all of the properties in here by just logging event and cherrypicking
      id: event.id,
      type: event.type,
      author: event.actor.display_login,
      repo: event.repo.name
    }

    if (event.type === 'IssuesEvent' && event.payload.action === 'opened') {
      // add the issue title
      eventDataToReturn.title = event.payload.issue.title

      // add the issue link
      eventDataToReturn.link = `https://github.com/${event.repo.name}/pull/${event.payload.issue.number}`

      // add the issue number
      eventDataToReturn.number = event.payload.issue.number

      // include the date that the issue was created on
      eventDataToReturn.date = event.payload.issue.created_at

      // include the action just in case
      eventDataToReturn.action = event.payload.action

      // push this instance to final data
      userData.push(eventDataToReturn)

      logger(__filename, `event: theoretically pushed ${event.type} with action ${event.payload.action}.`)
    }

    if (event.type === 'PullRequestEvent' && event.payload.action === 'opened') {
      // add the issue title
      eventDataToReturn.title = event.payload.pull_request.title

      // add the PR link
      eventDataToReturn.link = `https://github.com/${event.repo.name}/pull/${event.payload.pull_request.number}`

      // add the pr number
      eventDataToReturn.number = event.payload.pull_request.number

      // include the date that the PR was created on
      eventDataToReturn.date = event.payload.pull_request.created_at

      // include the action just in case
      eventDataToReturn.action = event.payload.action

      // push this instance to final data
      userData.push(eventDataToReturn)
      logger(__filename, `event: theoretically pushed ${event.type} with action ${event.payload.action}.`)
    }
  }

  return userData
}

module.exports = filterPublicGitHubEvents
