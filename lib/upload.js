const co = require('co')
const {exists} = require('fs-extra')
const {join} = require('path')
const bucket = require('./bucket')

const upload = async function (projectDir, name, buildName) {
  const uploads = [bucket.upload(join(projectDir, 'package.json'), {
    destination: `${name}/package.json`
  })]

  if (await exists(join(projectDir, 'yarn.lock'))) {
    uploads.push(bucket.upload(join(projectDir, 'yarn.lock'), {
      destination: `${name}/yarn.lock`
    }))
  }

  if (buildName) {
    if (await exists(join(projectDir, buildName))) {
      uploads.push(bucket.upload(join(projectDir, buildName), {
        destination: `${name}/builds/${buildName}`
      }))
    }
  }

  await uploads

}

module.exports = upload
