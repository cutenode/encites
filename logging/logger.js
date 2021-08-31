require('dotenv').config()
const pino = require('pino')()
const log = process.env.ENCITES_LOGGER

async function logger (filename, message) {
  if (log) pino.info(`${filename}: ${message}`)
}

module.exports = logger
