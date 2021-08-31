const path = require('path')
const fs = require('fs')

function safeDirectory (dataDirectory) {
  let resolvedPath // use let so we can redefine it conditionally
  if (fs.existsSync(dataDirectory)) { // check if it exists with a blocking operation - sorry
    resolvedPath = path.resolve(dataDirectory) // resolve it without doing anything if it does exist
  } else {
    fs.promises.mkdir(dataDirectory, { recursive: true }) // make the directory, recursively, if it doesn't exist
    resolvedPath = path.resolve(dataDirectory) // resolve it without a problem, since the path should now exist :)
  }

  return resolvedPath
}

module.exports = safeDirectory
