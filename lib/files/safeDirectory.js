const path = require('path')
const fs = require('fs-extra')
const logger = require('../../logging/logger')

async function safeDirectory (dataDirectory) {
  try {
    const dirname = path.resolve(dataDirectory)
    logger(__filename, `dirname of dataDirectory: ${dirname}`)

    fs.ensureDir(dirname)
    return dirname
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = safeDirectory
