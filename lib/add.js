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

const add = async function(dir, name, pkg) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  await mkdirs(projectDir)                                    //FIX: Is this necessary? If we're adding do we need to make a directory? Or is this a temporary directory?
  await download(projectDir, name)

  //call yarn add pkg in projectDir
  //console.log(`yarn add ${pkg}`)
  //console.log(projectDir)
  console.log("Adding " + pkg)
  var {code, output} = await prosh(`yarn add ${pkg}`, {cwd: projectDir})
  /*var code = 0
  var output = "TEST"*/
  if (code !== 0) {
    return {error: true, output}
  }
  let message = output
  console.log("Finished: " + message)

  console.log("Bundling project")
  var {code, output, bundleName} = await bundle(projectDir)
  console.log("Bundled: bundleName: " + bundleName)
  if (code !== 0) {
    return {error: true, output: message + output}
  }
  
  //saving build   {name}/builds/{buildName}; updating {name}/package.json and {name}/yarn.lock
  await upload(projectDir, name, bundleName)
  
  return {error: false, output: message + output, bundleName}
}

module.exports = add
