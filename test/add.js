/**
 * Imports
 */

const test = require('tape')
const init = require('../lib/init')
const add = require('../lib/add')
const bucket = require('../lib/bucket')
const co = require('co')
const {mkdirs, remove, exists} = require('fs-extra')
const {join} = require('path')

/**
 * Tests
 */

test('should add', co.wrap(function * (t) {
  const dir = join(__dirname, 'build')

  yield mkdirs(dir)
  let {name} = yield init(dir)
  let {error, output, bundleName} = yield add(dir, name, '@f/map')
  if (error) {
    console.log(output)
  }
  t.ok(yield exists(`${dir}/${name}/package.json`))
  t.ok(yield exists(`${dir}/${name}/yarn.lock`))

  t.ok(yield bucket.file(`${name}/package.json`).exists())
  t.ok(yield bucket.file(`${name}/package.json`).exists())
  t.ok(yield bucket.file(`${name}/builds/${bundleName}`).exists())
  yield remove(dir)
  t.end()
}))
