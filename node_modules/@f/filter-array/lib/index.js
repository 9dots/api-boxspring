/**
 * Modules
 */

/**
 * Expose filterArray
 */

module.exports = filterArray['default'] = filterArray

/**
 * filterArray
 */

function filterArray (fn, arr) {
  var newArray = []

  for (var i = 0, len = arr.length; i < len; ++i) {
    var val = arr[i]

    if (fn(val, i)) {
      newArray.push(val)
    }
  }

  return newArray
}
