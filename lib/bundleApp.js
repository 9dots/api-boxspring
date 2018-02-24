/**
 * Imports
 */

const co = require('co')
const prosh = require('prosh')
const {mkdirs, readdir, createFile, openSync, write} = require('fs-extra')
const hash = require('farmhash')

const EMPTY_APP_BUNDLE = "default-app-bundle.js"

/**
 * Bundle
 */

const bundle = async function (projectDir) {
  // console.log("Reading files")
  // const files = await Promise.all([
  //   readFile(`${projectDir}/package.json`),
  //   readFile(`${projectDir}/yarn.lock`)
  // ])

  await mkdirs(`${projectDir}/src`)
  await mkdirs(`${projectDir}/build`)
  // let bundleExists = await pathExists(`${projectDir}`)      //returns true or false

  let sourceFiles = await readdir(projectDir + '/src')

  if(sourceFiles.length == 0){ 
    console.log(`No source files found. Returning empty string`)
    try {
      await createFile(`${projectDir}/build/${EMPTY_APP_BUNDLE}`)
      let fd = await openSync(`${projectDir}/build/${EMPTY_APP_BUNDLE}`, 'w')
      await write(fd, "")
    } catch(err){
      console.log(err)
      return {code: 1, output: "couldnt create and write file"}
    }
    return {code: 0, output: "Default bundle created", EMPTY_APP_BUNDLE}
  } else {
    console.log(`Bundling source files...`)
    let sourceFileStr = ""
    sourceFiles.forEach((file) => {
      sourceFileStr += `src/${file} `
    })

    let bundleName = hash.fingerprint64(sourceFiles.join()) + '.js'

    const str = `browserify -t reactify ${sourceFileStr} -o build/${bundleName}`
    console.log("Running: " + str)

    const res = await prosh(str, { cwd: projectDir})
    if(res.code !== 0){
      console.log("browserify ended with non zero code:")
      console.log(res.output)
      return {code: res.code, output: res.output}
    }

    console.log(`Bundle "${bundleName}" created`)
    return {code: res.code, output: res.output, bundleName}
  }
 

}

module.exports = bundle
