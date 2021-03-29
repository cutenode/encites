
require('dotenv').config()
const logger = require('pino')()
const log = process.env.ENCITES_LOGGER

if (log) logger.info(`file: ${__filename}`)

async function getMarkdownFromEvents (events) {
  try {
    const headings = {
      page: '# Open Source Engineering GitHub Activity',
      count: '## Total Counts',
      contributors: '## Contributors',
      issues: '## Issues Created',
      prs: '## Pull Requests Created'
    }

    // variables we popualte with logic

    const data = {
      usersWhoCreatedIssues: [],
      usersWhoCreatedPrs: [],
      issueBullets: [],
      prBullets: []
    }

    // counts of the things we care about

    const counts = {
      issuesCreated: 0,
      prsCreated: 0
    }

    if (log) logger.info('beinning loop over events')
    for (const event of events) {
      if (log) logger.info(`loop over events number ${events[events]}`)
      // set up pretty markdown shorthand
      if (log) logger.info('setting up pretty markdown shorthand')
      const prettyMarkdownAuthor = `[@${event.author}](https://github.com/${event.author})`
      const prettyMarkdownLink = `_**${event.title} ([#${event.number}](${event.link}))**_`
      const prettyMarkdownRepo = `[${event.repo}](https://github.com/${event.repo})`
      if (log) logger.info('set up pretty markdown shorthand')

      if (event.type === 'IssuesEvent') {
        if (log) logger.info('event type is IssuesEvent')

        // increase the counts to report
        if (log) logger.info(`incrementing counts.issuesCreated (current value: ${counts.issuesCreated}) counter`)
        counts.issuesCreated = counts.issuesCreated + 1
        if (log) logger.info(`incremented counts.issuesCreated (current value: ${counts.issuesCreated}) counter`)

        const bullet = `* ${prettyMarkdownAuthor} created ${prettyMarkdownLink} in ${prettyMarkdownRepo}`
        data.issueBullets.push(bullet)

        if (!data.usersWhoCreatedIssues.includes(prettyMarkdownAuthor)) {
          if(log) logger.info('user was not in array of those who created issues')
          data.usersWhoCreatedIssues.push(prettyMarkdownAuthor)
        }
      }

      if (event.type === 'PullRequestEvent') {
        if (log) logger.info('event type is PullRequestEvent')

        if (log) logger.info(`incrementing counts.prsCreated (current value: ${counts.prsCreated}) counter`)
        counts.prsCreated = counts.prsCreated + 1
        if (log) logger.info(`incremented counts.prsCreated (current value: ${counts.prsCreated}) counter`)

        const bullet = `* ${prettyMarkdownAuthor} created ${prettyMarkdownLink} in ${prettyMarkdownRepo}`
        data.prBullets.push(bullet)

        if (!data.usersWhoCreatedPrs.includes(prettyMarkdownAuthor)) {
          if(log) logger.info('user was not in array of those who created prs')
          data.usersWhoCreatedPrs.push(prettyMarkdownAuthor)
        }
      }
    }

    // create the sections of the markdown document
    // these are broken up into sections to make it easier to implement limited scope calls of the method later if we want that
    if (log) logger.info('setting up markdown elements')
    const heading = `${headings.page}`
    const countSection = `\n\n${headings.count}\n\n* Issues Created: ${counts.issuesCreated}\n* Pull Requests Created: ${counts.prsCreated}`
    const contributorsSection = `\n\n${headings.contributors}\n\n* Contributors who created Issues: ${data.usersWhoCreatedIssues.join(', ')}\n\n* Contributors who created Pull Requests: ${data.usersWhoCreatedPrs.join(', ')}`
    const issueSection = `\n\n${headings.issues}\n\n${data.issueBullets.join('\n')}`
    const prSection = `\n\n${headings.prs}\n\n${data.prBullets.join('\n')}`
    if (log) logger.info('set up markdown elements')

    if (log) logger.info('setting up markdown document')
    const document = `${heading}${countSection}${contributorsSection}${issueSection}${prSection}`
    if (log) logger.info('set up markdown document')

    return document
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = getMarkdownFromEvents
