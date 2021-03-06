/**
 * Imports
 */

const co = require('co')
const bucket = require('./bucket')

/**
 * Download
 */

const download = co.wrap(function * (projectDir, name) {
  let pkgDl = bucket.file(`${name}/package.json`).download(`${projectDir}/package.json`)

  let lockDl = co(function * () {
    try {
      yield bucket.file(`${name}/package.json`).download(`${projectDir}/yarn.lock`)
    } catch(e) {
    }
  })

  yield [pkgDl, lockDl]
})

module.exports = download
