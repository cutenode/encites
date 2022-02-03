
require('dotenv').config()
const logger = require('../../logging/logger')

async function getMarkdownFromEvents (events, title) {
  const headings = {
    page: `# ${title}`,
    count: '## Total Counts',
    contributors: '## Contributors',
    issues: '## Issues Created',
    prs: '## Pull Requests Created',
    comments: '## Comments Created',
    reviews: '## Reviews Submitted'

  }

  // variables we popualte with logic

  const data = {
    usersWhoCreatedIssues: [],
    usersWhoCreatedPrs: [],
    usersWhoCreatedComments: [],
    usersWhoReviewedPrs: [],
    issueBullets: [],
    prBullets: [],
    commentBullets: [],
    reviewsBullets: []
  }

  // counts of the things we care about

  const counts = {
    issuesCreated: 0,
    prsCreated: 0,
    reviewsSubmitted: 0,
    commentsCreated: 0
  }

  logger(__filename, 'beinning loop over events')
  for (const event of events) {
    logger(__filename, `loop over events number ${events[events]}`)
    logger(__filename, `event.type is ${event.type}`)

    // set up pretty markdown shorthand
    logger(__filename, 'setting up pretty markdown shorthand')
    const author = `[@${event.author}](https://github.com/${event.author})`
    const link = `_**${event.title} ([#${event.number}](${event.link}))**_`
    const repo = `[${event.repo}](https://github.com/${event.repo})`
    logger(__filename, 'set up pretty markdown shorthand')

    if (event.type === 'IssuesEvent') {
      logger(__filename, 'event type is IssuesEvent')

      counts.issuesCreated = counts.issuesCreated + 1
      const bullet = `* ${author} created ${link} in ${repo}`
      data.issueBullets.push(bullet)

      if (!data.usersWhoCreatedIssues.includes(author)) {
        logger(__filename, 'user was not in array of those who created issues')
        data.usersWhoCreatedIssues.push(author)
      }
    }

    if (event.type === 'PullRequestEvent') {
      logger(__filename, 'event type is PullRequestEvent')

      counts.prsCreated = counts.prsCreated + 1
      const bullet = `* ${author} created ${link} in ${repo}`
      data.prBullets.push(bullet)

      if (!data.usersWhoCreatedPrs.includes(author)) {
        logger(__filename, 'user was not in array of those who created prs')
        data.usersWhoCreatedPrs.push(author)
      }
    }

    if (event.type === 'IssueCommentEvent') {
      logger(__filename, 'event type is IssueCommentEvent')

      counts.commentsCreated = counts.commentsCreated + 1
      const bullet = `* **[#${event.number} (comment)](${event.commentLink})**: ${author} wrote a comment on ${link} in ${repo}`
      data.commentBullets.push(bullet)

      if (!data.usersWhoCreatedComments.includes(author)) {
        data.usersWhoCreatedComments.push(author)
      }
    }

    if (event.type === 'PullRequestReviewEvent') {
      logger(__filename, 'event type is PullRequestReviewEvent')

      counts.reviewsSubmitted = counts.reviewsSubmitted + 1
      const bullet = `* **[#${event.number} (review)](${event.reviewLink})**: ${author} reviewed ${link} in ${repo}: `
      data.reviewsBullets.push(bullet)

      if (!data.usersWhoReviewedPrs.includes(author)) {
        logger(__filename, 'user was not in array of those who created prs')
        data.usersWhoReviewedPrs.push(author)
      }
    }
  }

  // create the sections of the markdown document
  // these are broken up into sections to make it easier to implement limited scope calls of the method later if we want that
  logger(__filename, 'setting up markdown elements')
  const heading = `${headings.page}`
  const countSection = `\n\n${headings.count}\n\n* Issues Created: ${counts.issuesCreated}\n* Pull Requests Created: ${counts.prsCreated}\n* Comments Created: ${counts.commentsCreated}\n* Reviews Submitted: ${counts.reviewsSubmitted}`
  const contributorsSection = `\n\n${headings.contributors}\n\n* Contributors who created Issues: ${data.usersWhoCreatedIssues.join(', ')}\n\n* Contributors who created Pull Requests: ${data.usersWhoCreatedPrs.join(', ')}\n\n* Contributors who created comments: ${data.usersWhoCreatedComments.join(', ')}`
  const issueSection = `\n\n${headings.issues}\n\n${data.issueBullets.join('\n')}`
  const prSection = `\n\n${headings.prs}\n\n${data.prBullets.join('\n')}`
  const commentSection = `\n\n${headings.comments}\n\n${data.commentBullets.join('\n')}`
  const reviewSection = `\n\n${headings.reviews}\n\n${data.reviewsBullets.join('\n')}`
  logger(__filename, 'set up markdown elements')

  logger(__filename, 'setting up markdown document')
  const document = `${heading}${countSection}${contributorsSection}${issueSection}${prSection}${commentSection}${reviewSection}`
  logger(__filename, 'set up markdown document')

  return document
}

module.exports = getMarkdownFromEvents
