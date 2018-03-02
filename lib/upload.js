const co = require('co')
const {exists, mkdirs} = require('fs-extra')
const {join} = require('path')
const bucket = require('./bucket')

const upload = async function (projectDir, name, files) {
  console.log("Uploading files to GCS...")
  const uploads = []
  

  for(var key in files){
    var file = files[key]
    let fileLoc = join(projectDir, file.title)
    console.log("FILE: " + file.title)
    if (await exists(fileLoc)) {
      uploads.push(bucket.upload(fileLoc, {
        destination: `projects/${name}/${file.title}`
      }),
      (err) => {
          console.log("Failed to upload", file.title, ":", error)
        }
      )
    }
  }

  await uploads
  console.log("Finished uploads...")
}

module.exports = upload
