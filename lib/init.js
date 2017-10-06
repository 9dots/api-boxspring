/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')

const upload = require('./upload')
const bucket = require('./bucket')

const init = co.wrap(function * (dir) {
  let name = uuid()
  let projectDir = join(dir, name)
  yield mkdirs(projectDir)
  let {code, output} = yield prosh('yarn init -y', {cwd: projectDir})
  if (code !== 0) {
    return {error: true, output}
  }
  yield upload(projectDir, name)
  return {error: false, output, name}
})

module.exports = init
