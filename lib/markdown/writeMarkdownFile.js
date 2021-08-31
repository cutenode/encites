const getMarkdownFromEvents = require('./getMarkdownFromEvents')
const safeWriteFileToPath = require('../files/safeWriteFileToPath')
const logger = require('../../logging/logger')

async function writeMarkdownFile (markdownPath, markdownFileName, events, title) {
  try {
    logger(__filename, 'building out markdown from data')
    const markdown = await getMarkdownFromEvents(events, title)
    logger(__filename, 'writing markdown to the file')
    await safeWriteFileToPath(`${markdownPath}${markdownFileName}`, markdown)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = writeMarkdownFile
