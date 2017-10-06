/**
 * Imports
 */

var filterArray = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.deepEqual(filterArray(isEven, [1,2,3,4,5]), [2, 4])
  t.end()
})

function isEven (n) {
  return n % 2 === 0
}
