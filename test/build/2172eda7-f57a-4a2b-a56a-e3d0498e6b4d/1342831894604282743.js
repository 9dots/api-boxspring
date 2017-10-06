require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Modules
 */

var forEach = require('@f/foreach-obj')

/**
 * Expose extend
 */

module.exports = extend

/**
 * Extend
 */

function extend (dst) {
  for (var i = 1; i < arguments.length; i++) {
    extendTwo(dst, arguments[i])
  }

  return dst
}

function extendTwo (dst, src) {
  forEach(function (val, key) {
    dst[key] = val
  }, src)
}

},{"@f/foreach-obj":2}],2:[function(require,module,exports){
/**
 * Expose forEach
 */

module.exports = forEach

/**
 * forEach
 */

function forEach (fn, obj) {
  if (!obj) return

  var keys = Object.keys(obj)

  for (var i = 0, len = keys.length; i < len; ++i) {
    var key = keys[i]
    fn.call(this, obj[key], key, i)
  }
}

},{}],3:[function(require,module,exports){
/**
 * Imports
 */

var iteratorSymbol = require('@f/iterator-symbol')

/**
 * Expose generator
 */

exports.Object = Generator
exports.Function = GeneratorFunction
exports.FunctionPrototype = GeneratorFunctionPrototype

/**
 * Generator
 */

function Generator () {}
function GeneratorFunction () {}
function GeneratorFunctionPrototype () {}

var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype
GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype
GeneratorFunctionPrototype.constructor = GeneratorFunction
GeneratorFunction.displayName = 'GeneratorFunction'

Gp[iteratorSymbol] = function () {
  return this
}

Gp.toString = function () {
  return '[object Generator]'
}

},{"@f/iterator-symbol":10}],4:[function(require,module,exports){
/**
 * Expose isArray
 */

module.exports = isArray['default'] = isArray

/**
 * isArray
 */

function isArray (val) {
  return Array.isArray(val)
}

},{}],5:[function(require,module,exports){
/**
 * Modules
 */

/**
 * Expose isFunction
 */

module.exports = isFunction['default'] = isFunction

/**
 * isFunction
 */

function isFunction (value) {
  return typeof value === 'function'
}

},{}],6:[function(require,module,exports){
/**
 * Modules
 */

var isFunction = require('@f/is-function')

/**
 * Expose isFunctor
 */

module.exports = isFunctor

/**
 * isFunctor
 */

function isFunctor (val) {
  return val && isFunction(val.map)
}

},{"@f/is-function":5}],7:[function(require,module,exports){
/**
 * Imports
 */

var isFunction = require('@f/is-function')

/**
 * Expose isGenerator
 */

module.exports = isGenerator['default'] = isGenerator

/**
 * Check if `fn` is a generator function.
 *
 * @param {Mixed} fn
 * @return {Boolean}
 */

function isGenerator (fn) {
  var ctor = isFunction(fn) && fn.constructor
  if (!ctor) return false
  return ctor.name === 'GeneratorFunction' || ctor.displayName === 'GeneratorFunction'
}

},{"@f/is-function":5}],8:[function(require,module,exports){
/**
 * Modules
 */

var isFunction = require('@f/is-function')

/**
 * Expose isIterator
 */

module.exports = isIterator['default'] = isIterator

/**
 * Check if iterator
 * @param  {Mixed}  obj Object to check interface of.
 * @return {Boolean}
 */

function isIterator (obj, strict) {
  return !!obj &&
    isFunction(obj.next) &&
    (obj.throw ? isFunction(obj.throw) : !strict)
}

},{"@f/is-function":5}],9:[function(require,module,exports){
/**
 * Modules
 */

var isFunction = require('@f/is-function')

/**
 * Expose isObject
 */

module.exports = isObject

/**
 * Constants
 */

var objString = toString(Object)

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject (val) {
  return !!val && (val.constructor === Object || isObjectString(val.constructor))
}

function isObjectString (val) {
  return !!val && isFunction(val) && toString(val) === objString
}

function toString (val) {
  return Function.prototype.toString.call(val)
}

},{"@f/is-function":5}],10:[function(require,module,exports){
/**
 * Expose iteratorSymbol
 */

module.exports = typeof Symbol === "function"
 && Symbol.iterator
 || "@@iterator"

},{}],11:[function(require,module,exports){
/**
 * Expose map
 */

module.exports = map['default'] = map

/**
 * Map array
 * @param  {Function} fn
 * @param  {Array} arr
 * @return {Array}
 */

function map (fn, arr) {
  var len = arr.length
  var result = new Array(len)
  var self = this

  for (var i = 0; i < len; ++i) {
    result[i] = fn.call(self, arr[i], i)
  }

  return result
}

},{}],12:[function(require,module,exports){
/**
 * Modules
 */

var toGenerator = require('@f/to-generator')
var slice = require('@f/slice')
var isFunction = require('@f/is-function')
var isIterator = require('@f/is-iterator')

/**
 * Expose mapGen
 */

module.exports = map['default'] = map

/**
 * Map over generator
 * @param  {Function} fn
 * @param  {Generator} gen
 * @return {Generator}
 */

function map (fn, gen) {
  var ctx = this
  return toGenerator(function () {
    var self = this
    var it = isFunction(gen) ? gen.apply(ctx, slice(arguments)) : gen
    var i = 0

    if (!isIterator(it, true)) {
      throw TypeError('`gen` must return an iterator or be an iterator.')
    }

    self.next = next
    self.throw = error

    function next (arg) {
      return map(it.next(arg))
    }

    function error (err) {
      return map(it.throw(err))
    }

    function map (next) {
      if (next.done) return next
      try {
        next.value = fn.call(ctx, next.value, i++)
      } catch (e) {
        return error(e)
      }
      return next
    }
  })
}

},{"@f/is-function":5,"@f/is-iterator":8,"@f/slice":15,"@f/to-generator":16}],13:[function(require,module,exports){
/**
 * Expose mapObj
 */

module.exports = map

/**
 * Map obj
 * @param  {Function} fn  map
 * @param  {Object}   obj object over which to map
 * @param  {Object}   ctx context used to map call
 * @return {Object}
 */

function map (fn, obj) {
  var result = {}
  var keys = Object.keys(obj)

  for (var i = 0, len = keys.length; i < len; ++i) {
    var key = keys[i]
    result[key] = fn.call(this, obj[key], key)
  }

  return result
}

},{}],14:[function(require,module,exports){
/**
 * Modules
 */

var extend = require('@f/extend')

/**
 * Expose setProto
 */

module.exports = setProto['default'] = setProto

/**
 * Give `obj` a new prototype.
 * @param {Object} proto `obj` new prototype.
 * @param {Object} obj The object which is to have its prototype set.
 */

function setProto (proto, obj) {
  if (!hasProto(obj)) {
    extend(obj, proto)
  } else if (Object.setPrototypeOf) {
    Object.setPrototypeOf(obj, proto)
  } else {
    obj.__proto__ = proto
  }

  return obj
}

function hasProto (obj) {
  return '__proto__' in obj
}

},{"@f/extend":1}],15:[function(require,module,exports){
/**
 * Expose slice
 */

module.exports = slice

/**
 * slice
 */

function slice (array, begin, end) {
  begin = begin || 0
  end = end || array.length

  var arr = new Array(array.length)
  for (var i = begin; i < end; ++i) {
    arr[i - begin] = array[i]
  }
  return arr
}

},{}],16:[function(require,module,exports){
/**
 * Modules
 */

var slice = require('@f/slice')
var setProto = require('@f/set-proto')
var isFunction = require('@f/is-function')
var Generator = require('@f/generator')
var isGenerator = require('@f/is-generator')

/**
 * Vars
 */

var bind = Function.prototype.bind

/**
 * Expose toGenerator
 */

module.exports = toGenerator['default'] = toGenerator

/**
 * Make constructor look like a generator
 * @param  {Function} fn [description]
 * @return {Function}
 */

function toGenerator (fn) {
  if (isGenerator(fn)) return fn
  if (!isFunction(fn)) throw new TypeError('`fn` must be a function, got: ' + String(fn))

  function Gen () {
    var args = slice(arguments)
    if (!(this instanceof Gen)) {
      return new (bind.apply(Gen, [null].concat(args)))
    }
    return fn.apply(this, args)
  }

  setProto(Generator.FunctionPrototype, Gen)
  Gen.prototype = Object.create(Generator.Object.prototype)

  return Gen
}

},{"@f/generator":3,"@f/is-function":5,"@f/is-generator":7,"@f/set-proto":14,"@f/slice":15}],"@f/map":[function(require,module,exports){
/**
 * Modules
 */

var isArray = require('@f/is-array')
var mapArray = require('@f/map-array')
var isObject = require('@f/is-object')
var mapObj = require('@f/map-obj')
var isGenerator = require('@f/is-generator')
var mapGen = require('@f/map-gen')
var isIterator = require('@f/is-iterator')
var isFunctor = require('@f/is-functor')

/**
 * Expose map
 */

module.exports = map['default'] = map

/**
 * Map container
 * @param  {Function} fn
 * @param  {Mixed}   val val to map
 * @return {Mixed}   same type as val
 */

function map (fn, val) {
  if (isFunctor(val)) {
    // use faster map for arrays
    if (isArray(val) && val.map === Array.prototype.map) {
      return mapArray(fn, val)
    } else {
      return val.map(fn)
    }
  }
  if (isGenerator(val) || isIterator(val)) return mapGen(fn, val)
  if (isObject(val)) return mapObj(fn, val)
  throw new TypeError('You may only map an array, an object, a generator, or a functor, but the following `val` was passed: "' + String(val) + '"')
}

},{"@f/is-array":4,"@f/is-functor":6,"@f/is-generator":7,"@f/is-iterator":8,"@f/is-object":9,"@f/map-array":11,"@f/map-gen":12,"@f/map-obj":13}]},{},[]);
