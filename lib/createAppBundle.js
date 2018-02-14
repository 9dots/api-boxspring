/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs, createFile, readFile} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')
const hash = require('farmhash')

const download = require('./download')
const bundleApp = require('./bundleApp')

const createAppBundle = async function (dir, name, content) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  let fileName = hash.fingerprint64(JSON.stringify(content)) + '.js'
  let fileLoc = join(projectDir, fileName)

  // await fetch()                             
  let {code, output, appBundle} = await bundleApp(projectDir, fileName, content)

  if (code !== 0) {
    console.log(`Failed to reactify ${fileName}`)
    return {error: true, output: output}
  }

  //saving build   {name}/builds/{buildName}; updating {name}/package.json and {name}/yarn.lock
  // await upload(projectDir, name, bundleName)
  
  return {error: false, output: "Succesfully bundled app", bundle: appBundle}
}

module.exports = createAppBundle
