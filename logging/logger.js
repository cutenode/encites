require('dotenv').config()
const pino = require('pino')()
const log = process.env.ENCITES_LOGGER
const path = require('path')

async function logger (filename, message) {
  const prettyFileName = filename.slice(filename.lastIndexOf(path.sep))
  if (log) pino.info(`${prettyFileName}: ${message}`)
}

module.exports = logger
