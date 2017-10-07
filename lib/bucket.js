const path = require('path')

const gcs = require('@google-cloud/storage')({
  keyFilename: path.resolve(__dirname + '/../client_secrets.json')
})

module.exports = gcs.bucket('boxspring')
