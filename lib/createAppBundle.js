/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs, createFile, readdir} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')

const download = require('./download')
const bundleApp = require('./bundleApp')
const getAppBundle = require('./getAppBundle')
const fileJSON = require('./fileJSON')
const upload = require('./upload')

const TARGET_FILE = 'index.js'

const createAppBundle = async function (dir, name, files) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  // let fileName = hash.fingerprint64(JSON.stringify(content)) + '.js'
  files = JSON.parse(files)

  await download(projectDir, name, fileJSON(files))

  // await fetch()                             
  let {code, output, bundleName} = await bundleApp(projectDir, name, TARGET_FILE)

  if (code !== 0) {
    console.log(`Failed to create app bundle for ${name}`)
    return {error: true, output: output}
  }

  let buildFiles = await readdir(`${projectDir}/dist`)

  buildFiles = buildFiles.map((file) => (`dist/${file}`))
  // console.log(buildFiles)

  await upload(projectDir, name, fileJSON(buildFiles))

  return await getAppBundle(projectDir, bundleName)
  //saving build   {name}/builds/{buildName}; updating {name}/package.json and {name}/yarn.lock
  // await upload(projectDir, name, bundleName)
  
  // return {error: false, output: "Succesfully bundled app", bundle: bundleName}
}

module.exports = createAppBundle
