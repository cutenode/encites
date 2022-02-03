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
      // set up all the IssuesEvent-specific properties
      eventDataToReturn.title = event.payload.issue.title
      eventDataToReturn.link = event.payload.issue.html_url
      eventDataToReturn.number = event.payload.issue.number
      eventDataToReturn.date = event.payload.issue.created_at
      eventDataToReturn.action = event.payload.action

      // push this instance to final data
      userData.push(eventDataToReturn)

      logger(__filename, `event: pushed ${event.type} with action ${event.payload.action}.`)
    }

    if (event.type === 'PullRequestEvent' && event.payload.action === 'opened') {
      // set up all the PullRequestEvent-specific properties
      eventDataToReturn.title = event.payload.pull_request.title
      eventDataToReturn.link = event.payload.pull_request.html_url
      eventDataToReturn.number = event.payload.pull_request.number
      eventDataToReturn.date = event.payload.pull_request.created_at
      eventDataToReturn.action = event.payload.action

      // push this instance to final data
      userData.push(eventDataToReturn)

      logger(__filename, `event: pushed ${event.type} with action ${event.payload.action}.`)
    }

    if (event.type === 'IssueCommentEvent' && event.payload.action === 'created') {
      // set up all the IssueCommentEvent-specific properties
      eventDataToReturn.title = event.payload.issue.title
      eventDataToReturn.state = event.payload.issue.state
      eventDataToReturn.link = event.payload.issue.html_url
      eventDataToReturn.number = event.payload.issue.number
      eventDataToReturn.date = event.payload.comment.created_at
      eventDataToReturn.authorAssociation = event.payload.comment.author_association
      eventDataToReturn.commentLink = event.payload.comment.html_url
      eventDataToReturn.reactions = {
        total: event.payload.comment.reactions.total_count,
        '+1': event.payload.comment.reactions['+1'],
        '-1': event.payload.comment.reactions['-1'],
        laugh: event.payload.comment.reactions.laugh,
        hooray: event.payload.comment.reactions.hooray,
        confused: event.payload.comment.reactions.confused,
        heart: event.payload.comment.reactions.heart,
        rocket: event.payload.comment.reactions.rocket,
        eyes: event.payload.comment.reactions.eyes
      }

      // push this instance to final data
      userData.push(eventDataToReturn)

      logger(__filename, `event: pushed ${event.type} with action ${event.payload.action}.`)
    }

    if (event.type === 'PullRequestReviewEvent' && event.payload.action === 'created') {
      // set up all the PullRequestReviewEvent-specific properties
      eventDataToReturn.title = event.payload.pull_request.title
      eventDataToReturn.link = event.payload.pull_request.html_url
      eventDataToReturn.number = event.payload.pull_request.number
      eventDataToReturn.date = event.payload.review.submitted_at
      eventDataToReturn.action = event.payload.action
      eventDataToReturn.state = event.payload.review.state
      eventDataToReturn.commitId = event.payload.review.commit_id
      eventDataToReturn.reviewLink = event.payload.review.html_url
      eventDataToReturn.authorAssociation = event.payload.review.author_association

      // push this instance to final data
      userData.push(eventDataToReturn)

      logger(__filename, `event: pushed ${event.type} with action ${event.payload.action}.`)
    }
  }

  return userData
}

module.exports = filterPublicGitHubEvents
