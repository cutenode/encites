const getMarkdownFromEvents = require('./getMarkdownFromEvents')
const safeWriteFileToPath = require('../files/safeWriteFileToPath')

async function writeMarkdownFile (markdownPath, markdownFileName, events, title) {
  try {
    // build out our pretty markdown
    const markdown = await getMarkdownFromEvents(events, title)
    // write the actual file
    await safeWriteFileToPath(`${markdownPath}${markdownFileName}`, markdown)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = writeMarkdownFile
