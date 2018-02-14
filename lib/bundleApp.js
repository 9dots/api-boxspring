/**
 * Imports
 */

const co = require('co')
const prosh = require('prosh')
const {pathExists, createFile, openSync, write} = require('fs-extra')
const hash = require('farmhash')

const EMPTY_DEPENDENCIES_BUNDLE = "default-app-bundle.js"

/**
 * Bundle
 */

const bundle = async function (projectDir, appBundle, content) {
  // console.log("Reading files")
  // const files = await Promise.all([
  //   readFile(`${projectDir}/package.json`),
  //   readFile(`${projectDir}/yarn.lock`)
  // ])
  let bundleExists = await pathExists(`${projectDir}/${appBundle}`)      //returns true or false

  if(bundleExists){ 
    console.log(`Bundle "${appBundle}" found in cache`)
    return {code: 0, output: "Bundle found in cache", appBundle}
  } else {
    try {
      await createFile(`${projectDir}/${appBundle}`)
      let fd = await openSync(`${projectDir}/${appBundle}`, 'w')
      await write(fd, content)
    } catch(err){
      console.log(err)
      return {code: 1, output: "couldnt create and write file"}
    }
    const str = `browserify -t reactify ${appBundle} -o ${appBundle}`
    console.log("Running: " + str)

    const res = await prosh(str, { cwd: projectDir})
    if(res.code !== 0){
      console.log("browserify ended with non zero code:")
      console.log(res.output)
      return {code: res.code, output: res.output, appBundle}
    }

    console.log(`Bundle "${appBundle}" created`)
    return {code: res.code, output: res.output, appBundle}
  }
 

}

module.exports = bundle
