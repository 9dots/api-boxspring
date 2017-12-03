const path = require('path')

const gcs = require('@google-cloud/storage')()

module.exports = gcs.bucket('build-js-sh')
