require('dotenv').config()
const pino = require('pino')()
const log = process.env.ENCITES_LOGGER
const path = require('path')

async function logger (filename, message) {
  const prettyFileName = filename.slice(__filename.lastIndexOf(path.sep) + 3)
  if (log) pino.info(`${prettyFileName}: ${message}`)
}

module.exports = logger
