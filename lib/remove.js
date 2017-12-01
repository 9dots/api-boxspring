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

const remove = co.wrap(function * (dir, name, pkg) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  yield mkdirs(projectDir)                                    //FIX: Is this necessary? If we're adding do we need to make a directory? Or is this a temporary directory?
  yield download(projectDir, name)

  //call yarn remove pkg in projectDir
  var {code, output} = yield prosh(`yarn remove ${pkg}`, {cwd: projectDir})

  if (code !== 0) {
    return {error: true, output}
  }

  let message = output

  //bundle the new contents of projectDir
  //code: 0 if browserify successful, != 0 if unsuccesful
  //output: output of browserify command
  //bundleName: {hash of file contents}.js
  var {code, output, bundleName} = yield bundle(projectDir)
  if (code !== 0) {
    return {error: true, output: message + output}
  }

  //saving build under {name}/builds/{buildName}; updating {name}/package.json and {name}/yarn.lock
  yield upload(projectDir, name, bundleName)

  return {error: false, output: message + output, bundleName}
})

module.exports = remove
