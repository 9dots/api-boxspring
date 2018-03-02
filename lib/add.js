/**
 * Imports
 */

const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')

const download = require('./download')
const upload = require('./upload')
const fileJSON = require('./fileJSON')

const add = async function(dir, name, pkg) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  await mkdirs(projectDir)             
  await download(projectDir, name, fileJSON(['package.json', 'yarn.lock']))

  //call yarn add pkg in projectDir
  //console.log(`yarn add ${pkg}`)
  //console.log(projectDir)
  console.log("Adding " + pkg)
  var {code, output} = await prosh(`yarn add ${pkg}`, {cwd: projectDir})
  /*var code = 0
  var output = "TEST"*/
  console.log(output)
  if (code !== 0) {
    return {error: true, output}
  }

  //NO LONGER NEED TO BUNDLE PACKAGES
  // let message = output
  // console.log("Finished: " + message)

  // console.log("Bundling project")
  // var {code, output, bundleName} = await bundle(projectDir)
  // if (code !== 0) {
  //   console.log(`Failed to add ${pkg} to ${name}`)
  //   return {error: true, output: message + output}
  // }

  //saving build   {name}/builds/{buildName}; updating {name}/package.json and {name}/yarn.lock
  await upload(projectDir, name, fileJSON(['package.json', 'yarn.lock']))
  
  return {error: false}
}

module.exports = add
