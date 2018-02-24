/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs, createFile, readFile} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')

const download = require('./download')
const bundleApp = require('./bundleApp')

const createAppBundle = async function (dir, name, content) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  // let fileName = hash.fingerprint64(JSON.stringify(content)) + '.js'

  // await fetch()                             
  let {code, output, bundleName} = await bundleApp(projectDir)

  if (code !== 0) {
    console.log(`Failed to create bundle for ${name}`)
    return {error: true, output: output}
  }

  //saving build   {name}/builds/{buildName}; updating {name}/package.json and {name}/yarn.lock
  // await upload(projectDir, name, bundleName)
  
  return {error: false, output: "Succesfully bundled app", bundle: bundleName}
}

module.exports = createAppBundle
