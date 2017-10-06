/**
 * Imports
 */

var filter = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.deepEqual(filter(isEven, [1, 2, 3, 4, 5]), [2, 4])
  t.deepEqual(filter(isEven, {a: 1, b: 2, c: 3, d: 4, e: 5}), {b: 2, d: 4})
  t.end()
})

function isEven (n) {
  return n % 2 === 0
}
