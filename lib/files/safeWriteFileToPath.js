const logger = require('../../logging/logger')
const fs = require('fs-extra')

async function safeWriteFileToPath (pathAndFileName, data) {
  try {
    logger(__filename, `pathAndFileName: ${pathAndFileName}`)

    fs.outputFile(pathAndFileName, data)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = safeWriteFileToPath
