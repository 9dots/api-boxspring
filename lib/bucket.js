const path = require('path')

const gcs = require('@google-cloud/storage')()

module.exports = gcs.bucket('boxspring-81172.appspot.com')
