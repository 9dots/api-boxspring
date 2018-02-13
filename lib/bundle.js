/**
 * Imports
 */

const co = require('co')
const prosh = require('prosh')
const {mkdirs, readFile, pathExists, copy} = require('fs-extra')
const hash = require('farmhash')

const EMPTY_DEPENDENCIES_BUNDLE = "default-bundle.js"

/**
 * Bundle
 */

const bundle = async function (projectDir) {
  // console.log("Reading files")
  // const files = await Promise.all([
  //   readFile(`${projectDir}/package.json`),
  //   readFile(`${projectDir}/yarn.lock`)
  // ])

  console.log("Reading package.json...")
  const files = await readFile(`${projectDir}/package.json`)
  
  if(!files){
    console.log("Couldn't find package.json for file")
    return {code: 1, output: "Couldn't find package.json for file"}
  }

  console.log("Getting dependencies...")
  const {dependencies} = JSON.parse(files)

  let bundleName = EMPTY_DEPENDENCIES_BUNDLE
  if(dependencies)
    bundleName = `${hash.fingerprint64(JSON.stringify(dependencies))}.js`
  else

  // const {dependencies} = JSON.parse(files[0])
  // const bundleName = `${hash.fingerprint64(files.join('\n'))}.js`

  console.log("Bundle for dependencies: " + bundleName)
  
  const bundlesDir = projectDir.substring(0, projectDir.indexOf('/projects')) + "/bundles"
  await mkdirs(bundlesDir)                       

  let bundleExists = await pathExists(`${projectDir}/${bundleName}`)      //returns true or false

  if(bundleExists){ 
    console.log(`Bundle "${bundleName}" found in cache`)
    return {code: 0, output: "Bundle found in cache", bundleName}
  } else {
    const str = `browserify -o ${bundleName} -r ${Object.keys(dependencies).join(' -r ')}`
    console.log("Running: " + str)

    const res = await prosh(str, { cwd: projectDir})
    if(res.code !== 0){
      console.log("browserify ended with non zero code:")
      console.log(res.output)
      return {code: res.code, output: res.output, bundleName}
    }

    try{
      await copy(`${projectDir}/${bundleName}`, `${bundlesDir}/${bundleName}`)
      console.log(`Copied to bundles directory`)
    }
    catch(err){
      console.log("Failed to copy to /bundles directory:")
      return {code: 1, output: err, bundleName}
    }

    console.log(`Bundle "${bundleName}" created`)
    return {code: res.code, output: res.output, bundleName}
  }
 

}

module.exports = bundle
