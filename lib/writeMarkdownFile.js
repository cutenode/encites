const getMarkdownFromEvents = require('./getMarkdownFromEvents')
const safeWriteFileToPath = require('./safeWriteFileToPath')

async function writeMarkdownFile (markdownPath, markdownFileName, events) {
  try {
    // build out our pretty markdown
    const markdown = await getMarkdownFromEvents(events)
    // write the actual file
    await safeWriteFileToPath(`${markdownPath}${markdownFileName}`, markdown)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = writeMarkdownFile
