const dedupeLocalEventsFilesInDirectory = require('./lib/dedupeLocalEventsFilesInDirectory')
const getAndFilterPublicGitHubEvents = require('./lib/getAndFilterPublicGitHubEvents')
const getEventsFrom = require('./lib/getEventsFrom')
const getMarkdownFromEvents = require('./lib/getMarkdownFromEvents')
const writeEventsFile = require('./lib/writeEventsFile')
const writeMarkdownFile = require('./lib/writeMarkdownFile')
const writeMegafile = require('./lib/writeMegafile')

module.exports = {
  dedupeLocalEventsFilesInDirectory,
  getAndFilterPublicGitHubEvents,
  getEventsFrom,
  getMarkdownFromEvents,
  writeEventsFile,
  writeMarkdownFile,
  writeMegafile
}
