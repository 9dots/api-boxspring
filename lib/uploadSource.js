/**
 * Imports
 */
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')
const {mkdirs, createFile, openSync, write} = require('fs-extra')
const hash = require('farmhash')
// const LOADING_SOURCE_TEMP_DEST = "TEMP_LOAD_DEST.txt"


const uploadSource = async function (dir, name, fileName, fileContent) {
	//work in directory {current directory}/projects/{name}
	let projectDir = join(dir, name)
	let srcFolder = join(projectDir, 'src')
	let fileLoc = join(srcFolder, fileName)

	let checkEnding = fileName.split(".")
	if(checkEnding.length <= 1 || checkEnding[checkEnding.length -1] != "js"){
  		console.log("File name invalid or non JS file")
      	return {error: true, output: "invalid file name"}
	}
  	else if(fileContent == undefined){
  		console.log("File content not given")
  	  	return {error:true, output: "file content not given"}
  	}

	await mkdirs(`${projectDir}/src`)

    try {
      await createFile(fileLoc)
      let fd = await openSync(fileLoc, 'w')
      await write(fd, fileContent)
    } catch(err){
      console.log(err)
      return {error: true, output: "couldn't create and write file with content"}
    }

    console.log(`${fileName} succesfully uploaded`)
    return {error: false, output: `${fileName} succesfully uploaded`}
}

module.exports = uploadSource
