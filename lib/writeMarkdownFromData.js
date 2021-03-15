const getEntriesOfType = require('./internal/getEntriesOfType')

async function writeMarkdownFromFilteredUserData (githubUserData) {
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

  const getEntriesOfType11 = {
    issues: await getEntriesOfType('IssuesEvent', githubUserData),
    prs: await getEntriesOfType('PullRequestEvent', githubUserData)
  }
  const issueCount = e
  const prCount =

  for (const event of githubUserData) {
    if (event.type === 'IssuesEvent') {
      const prettyMarkdownAuthor = `[@${event.author}](https://github.com/${event.author})`
      const prettyMarkdownLink = `_**${event.title} ([#${event.number}](${event.link}))**_`
      const prettyMarkdownRepo = `[${event.repo}](https://github.com/${event.repo})`

      const bullet = `* ${prettyMarkdownAuthor} created ${prettyMarkdownLink} in ${prettyMarkdownRepo}`
      data.issueBullets.push(bullet)

      if (!data.usersWhoCreatedIssues.includes(prettyMarkdownAuthor)) {
        data.usersWhoCreatedIssues.push(prettyMarkdownAuthor)
      }
    }

    if (event.type === 'PullRequestEvent') {
      const prettyMarkdownAuthor = `[@${event.author}](https://github.com/${event.author})`
      const prettyMarkdownLink = `_**${event.title} ([#${event.number}](${event.link}))**_`
      const prettyMarkdownRepo = `[${event.repo}](https://github.com/${event.repo})`

      const bullet = `* ${prettyMarkdownAuthor} created ${prettyMarkdownLink} in ${prettyMarkdownRepo}`
      data.prBullets.push(bullet)

      if (!data.usersWhoCreatedPrs.includes(prettyMarkdownAuthor)) {
        data.usersWhoCreatedPrs.push(prettyMarkdownAuthor)
      }
    }
  }

  // create the sections of the markdown document
  // these are broken up into sections to make it easier to implement limited scope calls of the method later if we want that
  const heading = `${headings.page}`
  const countSection = `\n\n${headings.count}\n\n* Issues Created: ${issueCount}\n* Pull Requests Created: ${prCount}`
  const contributorsSection = `\n\n${headings.contributors}\n\n* Contributors who created Issues: ${data.usersWhoCreatedIssues.join(', ')}\n\n* Contributors who created Pull Requests: ${data.usersWhoCreatedPrs.join(', ')}`
  const issueSection = `\n\n${headings.issues}\n\n${data.issueBullets.join('\n')}`
  const prSection = `\n\n${headings.prs}\n\n${data.prBullets.join('\n')}`

  const document = `${heading}${countSection}${contributorsSection}${issueSection}${prSection}`

  return document
}

module.exports = writeMarkdownFromFilteredUserData
