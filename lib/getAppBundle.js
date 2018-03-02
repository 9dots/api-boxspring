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
const fileJSON = require('./fileJSON')

const getAppBundle = async function (projectDir, bundle) {
  //work in directory {current directory}/projects/{name}
  console.log("Getting app bundle")
  
  let buildLoc = join(projectDir, "dist")
  let bundleLoc = join(buildLoc, bundle)
  // await fetch()
  await mkdirs(projectDir + "/dist")                  
  
  let file = ""
  try{
  	file = await readFile(`${bundleLoc}`, 'utf8')
  } catch(err){
  	console.log("Failed to read file: " + err)
  	return {error:true, output: "Couldn't read bundle"}
  }
  return {error: false, output: file}
}

module.exports = getAppBundle
