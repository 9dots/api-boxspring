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

const init = async function (dir, name) {
  //uuid grabs a unique ID to be passed back to the requester after initialization

  //initialize project at __dirname/projects/{new unique id}
  let projectDir = join(dir, name)
  if(!name || name == ""){
    return {error: true, output:"Name field empty"}
  }
  await mkdirs(projectDir)
  let {code, output} = await prosh('yarn init -y', {cwd: projectDir})
  if (code !== 0) {
    return {error: true, output}
  }

  //creating bucket at {name} with files package.json and yarn.lock
  const res = await upload(projectDir, name)
  
  return {error: false, output, name}
}

module.exports = init
