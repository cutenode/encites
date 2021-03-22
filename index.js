const dedupeLocalEventsFilesInDirectory = require('./lib/dedupeLocalEventsFilesInDirectory')
const getAndFilterPublicGitHubEvents = require('./lib/getAndFilterPublicGitHubEvents')
const getEventsFrom = require('./lib/getEventsFrom')
const getMarkdownFromEvents = require('./lib/getMarkdownFromEvents')
const writeEventsFile = require('./lib/writeEventsFile')

module.exports = {
  dedupeLocalEventsFilesInDirectory,
  getAndFilterPublicGitHubEvents,
  getEventsFrom,
  getMarkdownFromEvents,
  writeEventsFile
}
