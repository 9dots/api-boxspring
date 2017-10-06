/*
 * Imports
 */

const {mkdirs, writeJson, writeFile} = require('fs-extra')
const co = require('co')
const {join} = require('path')
const prosh = require('prosh')

const install = co.wrap(function * (dir, opts) {
  yield mkdirs(dir)
  yield writeJson(join(dir, 'package.json'), {
    dependencies: opts.dependencies
  })
  yield writeFile(join(dir, 'build.yml'), `
output: ./docs
pipeline:
  install:
    - yarn --version
    - node --version
    - yarn install
  `)
  //yield prosh('build ', {cwd: dir})
})

module.exports = install
