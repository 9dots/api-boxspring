/**
 * Imports
 */

const test = require('tape')
const init = require('../lib/init')
const bucket = require('../lib/bucket')
const co = require('co')
const {mkdirs, remove, exists} = require('fs-extra')
const {join} = require('path')

/**
 * Tests
 */

test('should init', co.wrap(function * (t) {
  const dir = join(__dirname, 'build')

  yield mkdirs(dir)
  let {code, output, name} = yield init(dir)
  t.ok(yield exists(`${dir}/${name}/package.json`))
  t.ok(yield bucket.file(`${name}/package.json`).exists())

  yield remove(dir)
  t.end()
}))
