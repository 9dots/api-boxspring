/**
 * Imports
 */
const {join} = require('path')
const prosh = require('prosh')
const co = require('co')
const {mkdirs, createFile, openSync, write, writeFile} = require('fs-extra')
const hash = require('farmhash')
// const LOADING_SOURCE_TEMP_DEST = "TEMP_LOAD_DEST.txt"


const uploadSource = async function (dir, name, fileName, fileContent) {
	//work in directory {current directory}/projects/{name}
	let projectDir = join(dir, name)
	let srcFolder = join(projectDir, 'src')
	let fileLoc = join(srcFolder, fileName)

	let checkEnding = fileName.split(".")
	if(checkEnding.length <= 1 || (checkEnding[checkEnding.length -1] != "js" && checkEnding[checkEnding.length -1] != "png" && checkEnding[checkEnding.length -1] != "jpg" && checkEnding[checkEnding.length -1] != "jpeg" && checkEnding[checkEnding.length -1] != "gif")){
  		console.log("File name invalid or non JS file")
      	return {error: true, output: "Invalid file name"}
	}
  	else if(fileContent == undefined){
  		console.log("File content not given")
  	  	return {error:true, output: "File content not given"}
  	}

	await mkdirs(`${projectDir}/src`)

    try {
      await createFile(fileLoc)
      let fd = await openSync(fileLoc, 'w')
      if(checkEnding[checkEnding.length-1] != 'js'){
        fileContent = fileContent.split(';base64,')[1]
        await writeFile(fileLoc, fileContent, {encoding:"base64"})
      }
      else{
        await write(fd, fileContent)
      }
    } catch(err){
      console.log(err)
      return {error: true, output: "Couldn't create and write file with content"}
    }

    console.log(`${fileName} succesfully uploaded`)
    return {error: false, output: `${fileName} succesfully uploaded`}
}

module.exports = uploadSource
