const fs = require('fs').promises
const path = require('path')
const logger = require('../../logging/logger')

async function safeWriteFileToPath (pathAndFileName, data) {
  try {
    logger(__filename, `pathAndFileName: ${pathAndFileName}`)

    const directoryOfPassedPath = path.dirname(pathAndFileName)
    logger(__filename, `passedPath: ${directoryOfPassedPath}`)

    fs.mkdir(directoryOfPassedPath, { recursive: true })

    const resolvedPath = path.resolve(pathAndFileName)
    logger(__filename, `resolvedPath: ${resolvedPath}`)

    fs.writeFile(resolvedPath, data, { encoding: 'utf-8' })
    logger(__filename, `theoretically wrote file to resolved path ${resolvedPath}`)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = safeWriteFileToPath
