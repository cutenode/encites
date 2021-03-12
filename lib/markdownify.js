async function markdownify (githubUserData) {
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
  const issueCount = githubUserData.createdIssues.length
  const prCount = githubUserData.createdPrs.length

  // constructing issue bullets with passed refined GitHub data
  for (const issue of githubUserData.createdIssues) {
    const prettyMarkdownAuthor = `[@${issue.author}](https://github.com/${issue.author})`
    const prettyMarkdownLink = `_**${issue.title} ([#${issue.number}](${issue.link}))**_`
    const prettyMarkdownRepo = `[${issue.repo}](https://github.com/${issue.repo})`

    const bullet = `* ${prettyMarkdownAuthor} created ${prettyMarkdownLink} in ${prettyMarkdownRepo}`
    data.issueBullets.push(bullet)

    if (!data.usersWhoCreatedIssues.includes(prettyMarkdownAuthor)) {
      data.usersWhoCreatedIssues.push(prettyMarkdownAuthor)
    }
  }

  // constructing pr bullets with passed refined GitHub data
  for (const pr of githubUserData.createdPrs) {
    const prettyMarkdownAuthor = `[@${pr.author}](https://github.com/${pr.author})`
    const prettyMarkdownLink = `_**${pr.title} ([#${pr.number}](${pr.link}))**_`
    const prettyMarkdownRepo = `[${pr.repo}](https://github.com/${pr.repo})`

    const bullet = `* ${prettyMarkdownAuthor} created ${prettyMarkdownLink} in ${prettyMarkdownRepo}`
    data.prBullets.push(bullet)

    if (!data.usersWhoCreatedPrs.includes(prettyMarkdownAuthor)) {
      data.usersWhoCreatedPrs.push(prettyMarkdownAuthor)
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

module.exports = markdownify
