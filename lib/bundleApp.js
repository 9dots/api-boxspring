/**
 * Imports
 */

const co = require('co')
const prosh = require('prosh')
const {mkdirs, readdir, createFile, openSync, write} = require('fs-extra')
const hash = require('farmhash')
const Bundler = require('parcel-bundler')
const {execSync} = require('child_process')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const EMPTY_APP_BUNDLE = "index.js"

/**
 * Bundle
 */

const bundleApp = async function (projectDir, name, bundleFile) {
  // console.log("Reading files")
  // const files = await Promise.all([
  //   readFile(`${projectDir}/package.json`),
  //   readFile(`${projectDir}/yarn.lock`)
  // ])

  await mkdirs(`${projectDir}/src`)
  await mkdirs(`${projectDir}/dist`)
  // let bundleExists = await pathExists(`${projectDir}`)      //returns true or false

  let sourceFiles = await readdir(`${projectDir}/src`)

  if(sourceFiles.length == 0){ 
    console.log(`No source files found. Returning empty string`)
    try {
      await createFile(`${projectDir}/dist/${EMPTY_APP_BUNDLE}`)
      let fd = await openSync(`${projectDir}/dist/${EMPTY_APP_BUNDLE}`, 'w')
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

    // let bundleName = hash.fingerprint64(sourceFiles.join()) + '.js'

    console.time("Parcel")

    const str = `time node_modules/.bin/parcel build -d dist --detailed-report --public-url=https://storage.googleapis.com/boxspring-81172.appspot.com/projects/${name} src/${bundleFile}`
    
    console.log("Running: " + str)

    /*var {code, output} = await prosh(str, {cwd: projectDir})
    console.log(output)
    if(code !== 0){
      return {code, output}
    }
*/
    var stdout, stderr
    try{
      var {stdout, stderr} = await exec(str, {cwd: projectDir},)
    }catch(err){
      console.log(err.stderr)
      return {code: 1, output:err.stderr}
    }
    console.log(stdout)
    console.log(stderr)
    
    /*console.time("start")

    const bundler = new Bundler(`${projectDir}/src/${bundleFile}`, {watch:false, outDir:`${projectDir}/dist`, publicUrl:`https://storage.googleapis.com/boxspring-81172.appspot.com/projects/${name}`, detailedReport:true})
    
      bundler.on('bundled', (bundle) => {
      console.log("DONE")
      console.timeEnd("start")
      });
    let bundle
    try{
      bundle = await bundler.bundle()
    }catch(err){
      console.log(err)
      console.log(err.stderr)
      return {code:1, output:err.stderr}
    }*/


    console.timeEnd("Parcel")

    console.log(`Bundle "${bundleFile}" created`)
    return {code: 0, output: "done", bundleName:"index.js"}
  }
 

}

module.exports = bundleApp
