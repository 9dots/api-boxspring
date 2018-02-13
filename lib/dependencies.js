/**
 * Imports
 */

const uuid = require('uuid')
const {mkdirs} = require('fs-extra')
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')
const {readFile} = require('fs-extra')

const download = require('./download')

const dependencies = async function (dir, name) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  await mkdirs(projectDir)                                    //FIX: Is this necessary? If we're adding do we need to make a directory? Or is this a temporary directory?
  await download(projectDir, name)
  
  const file = await readFile(`${projectDir}/package.json`)

  const opts = JSON.parse(file)

  return {error: false, output: Object.keys(opts.dependencies)}
}

module.exports = dependencies
