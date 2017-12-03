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

const bundle = async function (projectDir) {
  console.log("Reading files")
  const files = await Promise.all([
    readFile(`${projectDir}/package.json`),
    readFile(`${projectDir}/yarn.lock`)
  ])
  console.log("Read files")

  const bundleName = `${hash.fingerprint64(files.join('\n'))}.js`
  console.log("bundleName: " + bundleName)
  const opts = JSON.parse(files[0])
  
  const str = `browserify -o ${bundleName} -r ${Object.keys(opts.dependencies).join('-r ')}`
  console.log("Running " + str)
  const res = await prosh(str, { cwd: projectDir})
  console.log("Bundled project: " + res.code)

  return {code: res.code, output: res.output, bundleName}
}

module.exports = bundle
