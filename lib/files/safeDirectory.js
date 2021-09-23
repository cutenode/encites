const path = require('path')
const fs = require('fs-extra')
const logger = require('../../logging/logger')

async function safeDirectory (dataDirectory) {
  const dirname = path.resolve(dataDirectory)
  logger(__filename, `dirname of dataDirectory: ${dirname}`)

  fs.ensureDir(dirname)
  return dirname
}

module.exports = safeDirectory
