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

const getAppBundle = async function (dir, name, bundle) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(dir, name)
  await fetch()
  await mkdirs(projectDir)                                    
  await download(projectDir, name)
  
  const file = await readFile(`${projectDir}/${bundle}`, 'utf8')

  return {error: false, output: file}
}

module.exports = getAppBundle
