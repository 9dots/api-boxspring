/**
 * Imports
 */

const co = require('co')
const prosh = require('prosh')
const {mkdirs, readdir, createFile, openSync, write} = require('fs-extra')
const hash = require('farmhash')
const Bundler = require('parcel-bundler')

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
  await mkdirs(`${projectDir}/cache`)
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
      return {code: 1, output: "Couldnt create and write file"}
    }
    return {code: 0, output: "Default bundle created", EMPTY_APP_BUNDLE}
  } else {
    console.log(`Bundling source files...`)
    let sourceFileStr = ""
    sourceFiles.forEach((file) => {
      if(file.split('.').length > 1)
        sourceFileStr += `src/${file} `
    })

    let bundleName = hash.fingerprint64(sourceFiles.join()) + '.js'
    console.time("browser")
    // const str = `browserify -d -t [ babelify --presets [env react] ] ${sourceFileStr} -o build/${bundleName}`
    // const str = `browserifyinc -d -t imgurify -t [ babelify --presets [env react] ] ${sourceFileStr} -o build/${bundleName} --cachefile cache/browserify-cache.json`
    // const str = "echo hello"
    const str = `parcel build src/index.js`
    console.log("Running: " + str)
    const bundler = new Bundler(projectDir + '/src/index.js', {watch:false, outDir:projectDir + '/build', publicUrl:"test.com/test/" + projectDir})
    await bundler.bundle()
    // const res = await prosh(str, { cwd: projectDir})
    // console.log(res.time)
    // if(res.code !== 0){
    //   console.log("browserify ended with non zero code:")
    //   console.log(res.output)
    //   return {code: res.code, output: res.output}
    // }

    console.timeEnd("browser")
    console.log(`Bundle "${bundleName}" created`)
    return {code: 0, output: "done", bundleName:"index.js"}
  }
 

}

module.exports = bundle
