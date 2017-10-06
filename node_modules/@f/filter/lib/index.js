/**
 * Modules
 */

var isArray = require('@f/is-array')
var isObject = require('@f/is-object')
var filterObj = require('@f/filter-obj')
var filterArr = require('@f/filter-array')

/**
 * Expose filter
 */

module.exports = filter['default'] = filter

/**
 * filter
 */

function filter (fn, val) {
  if (isObject(val)) return filterObj(fn, val)
  if (isArray(val)) return filterArr(fn, val)
  // More things here?
}
