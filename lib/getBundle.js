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

const getBundle = async function (bundlesDir, projectsDir, name, bundle) {
  //work in directory {current directory}/projects/{name}
  let projectDir = join(projectsDir, name)
  await mkdirs(bundlesDir)                      
  await mkdirs(projectsDir)             

  await download(projectDir, name)

  try{
  	const file = await readFile(`${bundlesDir}/${bundle}`, 'utf8')
  	return {error: false, output: file}
  } catch (err) {
  	console.log(`Failed to find bundle "${bundle}"`)
  	return {error: true, output: err}
  }

  return {error: true, output: "Shouldn't be able to reach here"}
}

module.exports = getBundle
