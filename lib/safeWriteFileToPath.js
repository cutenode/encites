const fs = require('fs').promises
const path = require('path')

async function safeWriteFileToPath(pathAndFileName, data) {
  const passedPath = path.dirname(path.resolve(pathAndFileName))
  fs.mkdir(passedPath, { recursive: true })
  fs.writeFile(path.resolve(pathAndFileName), data, { encoding: 'utf-8' })
}

module.exports = safeWriteFileToPath
