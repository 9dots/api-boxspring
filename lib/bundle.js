/**
 * Imports
 */

const co = require('co')
const prosh = require('prosh')
const {readFile} = require('fs-extra')
const hash = require('farmhash')

/**
 * Bundle
 */

const bundle = co.wrap(function * (projectDir) {
  const files = yield [
    readFile(`${projectDir}/package.json`),
    readFile(`${projectDir}/yarn.lock`)
  ]

  const bundleName = `${hash.fingerprint64(files.join('\n'))}.js`
  const opts = JSON.parse(files[0])\
  
  const str = `browserify -o ${bundleName} -r ${Object.keys(opts.dependencies).join('-r ')}`
  const res = yield prosh(str, { cwd: projectDir})

  return {code: res.code, output: res.output, bundleName}
})

module.exports = bundle
