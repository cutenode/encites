const { writeMegafile } = require('../../')
const dates = require('../util/dates')
const createPaths = require('../util/paths')

const paths = createPaths(dates)

async function test () {
  writeMegafile(`${paths.data}`, paths.filenames.megafile)
}

test()
