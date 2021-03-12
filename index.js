const fetchGitHubDataForUsers = require('./lib/fetchGitHubDataForUser')
const markdownify = require('./lib/markdownify')

module.exports.forUser = fetchGitHubDataForUsers
module.exports.asMarkdown = markdownify
