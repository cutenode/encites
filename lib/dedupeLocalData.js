const fs = require('fs')
const path = require('path')

async function dedupeLocalData (pathToLocalFiles) {
  const resolvedPath = path.resolve(pathToLocalFiles)
  fs.readdir(resolvedPath)
}

module.exports = dedupeLocalData