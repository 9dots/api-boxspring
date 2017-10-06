/**
 * Imports
 */

const test = require('tape')
const install = require('../lib/install')
const co = require('co')
const {mkdirs, remove, exists} = require('fs-extra')
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
  t.ok(yield exists(join(projectDir, 'yarn.lock')))
  t.ok(yield exists(join(projectDir, 'node_modules/express')))

  yield remove(dir)
  t.end()
}))
