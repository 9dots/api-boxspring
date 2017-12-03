/**
 * Imports
 */

const co = require('co')
const bucket = require('./bucket')

/**
 * Download
 */

const download = async function (projectDir, name) {
  let pkgDl = bucket.file(`${name}/package.json`).download(`${projectDir}/package.json`)		//FIX: is it downloading projectDir/package.json from name/package.json? or is it putting name/package.json into projectDir/package.json? Or vice versa?

  
  let lockDl = async function () {
    try {
      await bucket.file(`${name}/package.json`).download(`${projectDir}/yarn.lock`)
    } catch(e) {
    }
  }

  await [pkgDl, lockDl]
}

module.exports = download
