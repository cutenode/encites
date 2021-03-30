const dedupeLocalEventsFilesInDirectory = require('./lib/events/dedupeLocalEventsFilesInDirectory')
const filterPublicGitHubEvents = require('./lib/events/filterPublicGitHubEvents')
const getEventsFrom = require('./lib/events/getEventsFrom')
const getMarkdownFromEvents = require('./lib/markdown/getMarkdownFromEvents')
const getPublicGitHubEvents = require('./lib/events/getPublicGitHubEvents')
const writeEventsFile = require('./lib/files/writeEventsFile')
const writeMarkdownFile = require('./lib/markdown/writeMarkdownFile')
const writeMegafile = require('./lib/files/writeMegafile')

module.exports = {
  dedupeLocalEventsFilesInDirectory,
  filterPublicGitHubEvents,
  getEventsFrom,
  getMarkdownFromEvents,
  getPublicGitHubEvents,
  writeEventsFile,
  writeMarkdownFile,
  writeMegafile
}
