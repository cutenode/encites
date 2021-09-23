const logger = require('../../logging/logger')
const fs = require('fs-extra')

async function safeWriteFileToPath (pathAndFileName, data) {
  logger(__filename, `pathAndFileName: ${pathAndFileName}`)

  fs.outputFile(pathAndFileName, data)
}

module.exports = safeWriteFileToPath
