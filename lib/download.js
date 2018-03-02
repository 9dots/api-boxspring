/**
 * Imports
 */

const co = require('co')
const bucket = require('./bucket')

/**
 * Download
 */

const download = async function (projectDir, name, files) {
  console.log("Downloading files from GCS...")

  let downloads = []

  for(var key in files){
    var file = files[key]
    console.log("FILE:", file.title)
    // let srcFile = bucket.file(`projects/${name}/${file.title}`)
    // console.log(srcFile.download(`${projectDir}/${file.title}`))
    // console.log(await srcFile.download(`${projectDir}/${file.title}`))
    // let srcFile = await bucket.file(`projects/${name}/${file.title}`)
    // console.log(srcFile.download(`${projectDir}/${file.title}`))
    // console.log(await srcFile.download(`${projectDir}/${file.title}`))
	downloads.push(bucket.file(`projects/${name}/${file.title}`).download({destination: `${projectDir}/${file.title}`,}))
  }

  await downloads

  console.log("Finished downloading...")
}

module.exports = download
