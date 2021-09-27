const logger = require('../../logging/logger')
const fs = require('fs-extra')

async function safeWriteFileToPath (pathAndFileName, data) {
  logger(__filename, `pathAndFileName: ${pathAndFileName}`)

  await fs.outputFile(pathAndFileName, data, { spaces: 2 })
}

module.exports = safeWriteFileToPath
