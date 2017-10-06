/**
 * Imports
 */

const test = require('tape')
const install = require('../lib/install')
const bundle = require('../lib/bundle')
const co = require('co')
const {mkdirs, remove, exists, readFile} = require('fs-extra')
const {join} = require('path')

/**
 * Tests
 */

test('should install', co.wrap(function * (t) {
  const dir = join(__dirname, 'build')
  const pkgJson = {dependencies: {express: '*'}}
  const projectDir = join(dir, 'test')

  yield mkdirs(dir)
  yield install(projectDir, pkgJson)
  yield bundle(projectDir, pkgJson)


  t.ok((yield readFile(join(projectDir, 'build.js'))).indexOf('require') === 0)
  yield remove(dir)
  t.end()
}))
