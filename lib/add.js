/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')

const download = require('./download')
const bundle = require('./bundle')
const upload = require('./upload')

const add = co.wrap(function * (dir, name, pkg) {
  let projectDir = join(dir, name)
  yield mkdirs(projectDir)
  yield download(projectDir, name)

  var {code, output} = yield prosh(`yarn add ${pkg}`, {cwd: projectDir})
  if (code !== 0) {
    return {error: true, output}
  }

  let message = output
  var {code, output, bundleName} = yield bundle(projectDir)
  if (code !== 0) {
    return {error: true, output: message + output}
  }

  yield upload(projectDir, name, bundleName)

  return {error: false, output: message + output, bundleName}
})

module.exports = add
