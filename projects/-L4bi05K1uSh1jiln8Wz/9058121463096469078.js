require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
/**
 * Modules
 */

/**
 * Expose arrayToPromise
 */

module.exports = arrayToPromise['default'] = arrayToPromise

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj);
}

},{}],3:[function(require,module,exports){
/**
 * Modules
 */

var slice = require('@f/slice')

/**
 * Expose curry
 */

module.exports = curry

/**
 * Simple curry function, essentially a curried partial.
 * @param  {Function} fn
 * @return {Function}
 */

function curry (fn) {
  var self = this
  return function () {
    var preArgs = new Array(arguments.length)
    for (var i = 0; i < preArgs.length; i++) {
      preArgs[i] = arguments[i]
    }
    return function () {
      var args = slice(preArgs)
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i])
      }
      return fn.apply(self, args)
    }
  }
}

},{"@f/slice":43}],4:[function(require,module,exports){
/**
 * Modules
 */

var extend = require('@f/extend')

/**
 * Expose curryTransparently
 */

module.exports = curryTransparently

/**
 * curryTransparently
 */

function curryTransparently (fn, arity, args) {
  if (arity === undefined) arity = fn.length

  curried.$$args = args || []
  curried.$$fn = fn.$$fn || fn

  return curried

  function curried () {
    var newArgs = curried.$$args.slice()
    for (var i = 0; i < arguments.length; i++) {
      newArgs.push(arguments[i])
    }

    return newArgs.length >= arity
      ? fn.apply(null, newArgs)
      : curryTransparently(curried, arity, newArgs)
  }
}

},{"@f/extend":8}],5:[function(require,module,exports){
/**
 * domEvents
 */

var domEvents = [
  'abort',
  'animationend',
  'animationiteration',
  'animationstart',
  'blur',
  'canplay',
  'canplaythrough',
  'change',
  'click',
  'contextmenu',
  'copy',
  'cut',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragexit',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'durationchange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'focus',
  'focusin',
  'focusout',
  'hashchange',
  'input',
  'invalid',
  'keydown',
  'keypress',
  'keyup',
  'load',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'paste',
  'pause',
  'play',
  'playing',
  'popstate',
  'progress',
  'ratechange',
  'reset',
  'resize',
  'scroll',
  'seeked',
  'seeking',
  'select',
  'stalled',
  'submit',
  'suspend',
  'timeupdate',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'transitionend',
  'unload',
  'volumechange',
  'waiting',
  'wheel'
]

/**
 * Expose domEvents
 */

module.exports = domEvents

},{}],6:[function(require,module,exports){
/**
 * Expse equal
 */

module.exports = equal['default'] = equal

/**
 * Check if two arrays are equal.
 * @param  {Array} a array 1
 * @param  {Array} b array 2
 * @return {Boolean}
 */

function equal (a, b) {
  var aLen = a.length
  var bLen = b.length

  if (aLen === bLen) {
    for (var i = 0; i < aLen; ++i) {
      if (a[i] !== b[i]) {
        return false
      }
    }

    return true
  }

  return false
}

},{}],7:[function(require,module,exports){
/**
 * Modules
 */

var isFunction = require('@f/is-function')
var isObject = require('@f/is-object')
var getValue = require('@f/get-value')
var keychord = require('@f/keychord')
var identity = require('@f/identity')
var isArray = require('@f/is-array')
var over = require('@f/maybe-over')
var map = require('@f/map')
var has = require('@f/has')

/**
 * Expose eventHandler
 */

module.exports = eventHandler

/**
 * eventHandler
 */

function eventHandler (fn) {
  if (isFunction(fn)) return defaultDecode(fn)
  if (isArray(fn)) return combine(map(eventHandler, fn))
  if (isObject(fn)) {
    if (isCustomDecoder(fn)) {
      return customDecode(fn)
    } else {
      return match(map(eventHandler, fn))
    }
  }
}

function isCustomDecoder (fn) {
  return has('decoder', fn) || has('handler', fn) || has('stopPropagation', fn) || has('preventDefault', fn) || has('selectTarget', fn)
}

function defaultDecode (fn) {
  return function (e) {
    var arg

    switch (e.type) {
      case 'input':
      case 'change':
        arg = getValue(e.target)
        break
      case 'invalid':
        arg = e.target.validationMessage
        break
      case 'submit':
        e.preventDefault()
        break
    }

    return arg !== undefined
      ? fn(arg)
      : fn()
  }
}

function customDecode (fn) {
  var decoder = fn.decoder || identity
  var stopPropagation = fn.stopPropagation
  var preventDefault = fn.preventDefault
  var selectTarget = fn.selectTarget

  fn = fn.handler

  return function (e) {
    var arg = decoder(e)

    if (preventDefault) e.preventDefault()
    if (stopPropagation) e.stopPropagation()
    if (selectTarget) e.target.select()

    if (!fn) return

    return arg !== undefined
      ? fn(arg)
      : fn()
  }
}

/**
 * Match an event handler to conditions generated
 * from the event
 */

function match (obj) {
  return function (e) {
    var chord = eventKey(e)
    var fn = obj[chord]

    if (isFunction(fn)) {
      return fn(e)
    }
  }
}

/**
 * Map a list of handlers over the event
 */

function combine (fns) {
  return function (e) {
    return over(e, fns)
  }
}

/**
 * Generate a string key for an event. Right now this is just equivalent
 * to keychord, but later we could add special keys for other conditions.
 */

function eventKey (e) {
  return keychord(e)
}

},{"@f/get-value":14,"@f/has":15,"@f/identity":17,"@f/is-array":18,"@f/is-function":20,"@f/is-object":24,"@f/keychord":29,"@f/map":35,"@f/maybe-over":36}],8:[function(require,module,exports){
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

},{"@f/foreach-obj":10}],9:[function(require,module,exports){
/**
 * Expose forEach
 */

module.exports = forEach['default'] = forEach

/**
 * forEach
 */

function forEach (fn, arr) {
  if (!arr) return

  for (var i = 0, len = arr.length; i < len; ++i) {
    fn.call(this, arr[i], i)
  }
}

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
/**
 * Modules
 */

var isObject = require('@f/is-object')
var isArray = require('@f/is-array')
var forEachObj = require('@f/foreach-obj')
var forEachArr = require('@f/foreach-array')

/**
 * Expose foreach
 */

module.exports = forEach['default'] = forEach

/**
 * For each
 * @param  {Function} fn  iterator
 * @param  {Object}   obj object to iterate over
 */

function forEach (fn, a) {
  if (isArray(a)) return forEachArr.call(this, fn, a)
  if (isObject(a)) return forEachObj.call(this, fn, a)
}

},{"@f/foreach-array":9,"@f/foreach-obj":10,"@f/is-array":18,"@f/is-object":24}],12:[function(require,module,exports){
/**
 * Modules
 */

var isDefer = require('@f/is-defer')
var isFunction = require('@f/is-function')
var isPromise = require('@f/is-promise')
var isIterator = require('@f/is-iterator')
var slice = require('@f/slice')

/**
 * Expose genToPromise
 */

module.exports = toPromise

/**
 * Generator to promise.
 * @param  {Generator} gen Generator.
 * @return {Promise}
 */

function toPromise (gen) {
  var self = this
  var args = slice(arguments, 1)
  return new Promise(function (resolve, reject) {
    if (isFunction(gen)) {
      gen = gen.apply(self, args)
    }

    if (!isIterator(gen)) {
      return resolve(gen)
    }

    var onFulfilled = iter('next')
    var onRejected = iter('throw')

    onFulfilled()

    function next (ret) {
      var val = ret.value
      if (ret.done) return resolve(val)
      if (isPromise(val)) {
        return val.then(onFulfilled, onRejected)
      } else if (isDefer(val)) {
        val = val.promise
      }
      return onFulfilled(val)
    }

    function iter (attr) {
      return function (res) {
        var ret
        try {
          ret = gen[attr](res)
        } catch (e) {
          return reject(e)
        }
        next(ret)
      }
    }
  })
}

},{"@f/is-defer":19,"@f/is-function":20,"@f/is-iterator":23,"@f/is-promise":25,"@f/slice":43}],13:[function(require,module,exports){
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

},{"@f/iterator-symbol":28}],14:[function(require,module,exports){
/**
 * Expose getValue
 */

module.exports = getValue

/**
 * getValue
 */

function getValue (el) {
  switch (type(el)) {
    case 'checkbox':
    case 'radio':
      return el.checked
        ? checkValue(el.getAttribute('value'))
        : false
    case 'select':
      for (var i = 0, len = el.options.length; i < len; i++) {
        var opt = el.options[i]
        if (opt.selected) return opt.value
      }
    default:
      return el.value
  }
}

/**
 * Helpers
 */

function checkValue (value) {
  return null === value || '' === value
    ? true
    : value
}

function type (el) {
  return el.nodeName === 'INPUT'
    ? el.type
    : el.nodeName.toLowerCase()
}

},{}],15:[function(require,module,exports){
/**
 * Expose has
 */

module.exports = has

/**
 * Vars
 */

var hasOwn = Object.prototype.hasOwnProperty

/**
 * has
 */

function has (prop, obj) {
  return hasOwn.call(obj, prop)
}

},{}],16:[function(require,module,exports){
/**
 * Expose hashStr
 */

module.exports = hashStr

/**
 * hashStr
 */

function hashStr (str) {
  var hash = 0

  for (var i = 0, len = str.length; i < len; ++i) {
      var c = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + c
      hash |= 0
  }

  return hash
}

},{}],17:[function(require,module,exports){
/**
 * Modules
 */

/**
 * Expose identity
 */

module.exports = identity['default'] = identity

/**
 * A function that returns its first arg.
 * @param  {Any} val
 * @return {Any} val
 */
function identity (val) {
  return val
}

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
/**
 * Modules
 */

var isPromise = require('@f/is-promise')

/**
 * Expose isDefer
 */

module.exports = isDefer

/**
 * isDefer
 */

function isDefer (val, strict) {
  return !!val && isPromise(val.promise) && (!strict || val.resolve && val.reject)
}

},{"@f/is-promise":25}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"@f/is-function":20}],22:[function(require,module,exports){
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

},{"@f/is-function":20}],23:[function(require,module,exports){
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

},{"@f/is-function":20}],24:[function(require,module,exports){
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

},{"@f/is-function":20}],25:[function(require,module,exports){
/**
 * Expose isPromise
 */

module.exports = isPromise['default'] = isPromise

/**
 * Check if `val` is a promise.
 *
 * @param {Any} val
 * @return {Boolean}
 * @api private
 */

function isPromise (val) {
  return !!val && typeof val.then === 'function'
}

},{}],26:[function(require,module,exports){
/**
 * Expose isString
 */

module.exports = isString['default'] = isString

/**
 * Check if string
 * @param  {Mixed}  value
 * @return {Boolean}
 */
function isString (value) {
  return typeof value === 'string'
}

},{}],27:[function(require,module,exports){
/**
 * Expose isUndefined
 */

module.exports = isUndefined['default'] = isUndefined

/**
 * Check if undefined.
 * @param  {Mixed}  value
 * @return {Boolean}
 */

function isUndefined (value) {
  return typeof value === 'undefined'
}

},{}],28:[function(require,module,exports){
/**
 * Expose iteratorSymbol
 */

module.exports = typeof Symbol === "function"
 && Symbol.iterator
 || "@@iterator"

},{}],29:[function(require,module,exports){
/**
 * Modules
 */

var keycodes = require('@f/keycodes')

/**
 * Expose keychord
 */

module.exports = keychord['default'] = keychord

/**
 * keychord
 */

function keychord (e) {
  var chord = []

  if (e.ctrlKey) chord.push('ctrl')
  if (e.altKey) chord.push('alt')
  if (e.metaKey) chord.push('command')
  if (e.shiftKey) chord.push('shift')

  var name = keycodes[e.which]
  if (chord.indexOf(name) === -1) {
    chord.push(name)
  }

  return chord.join('+')
}

},{"@f/keycodes":30}],30:[function(require,module,exports){
/**
 * Expose keycodes
 */

var keycodes = module.exports = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause',
  20: 'caps_lock',
  27: 'esc',
  32: 'space',
  33: 'page_up',
  34: 'page_down',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'insert',
  46: 'delete',
  91: 'command',
  93: 'right_click',
  106: 'numpad_*',
  107: 'numpad_+',
  109: 'numpad_-',
  110: 'numpad_.',
  111: 'numpad_/',
  144: 'num_lock',
  145: 'scroll_lock',
  182: 'my_computer',
  183: 'my_calculator',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: "'"
}

// lower case chars
for (var i = 97; i < 123; i++) {
  keycodes[i - 32] = String.fromCharCode(i)
}

// numbers
for (var j = 48; j < 58; j++) {
  keycodes[j] = j - 48
}

// function keys
for (var k = 1; k < 13; k++) {
  keycodes[k + 111] = 'f' + k
}

// numpad keys
for (var l = 0; l < 10; l++) {
  keycodes[l + 96] = 'numpad_' + l
}

},{}],31:[function(require,module,exports){
/**
 * Expose logError
 */

module.exports = logError

/**
 * logError
 */

function logError (err) {
  var msg = err.stack || err.toString()

  console.error()
  console.error(msg.replace(/^/gm, '  '))
  console.error()
}

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"@f/is-function":20,"@f/is-iterator":23,"@f/slice":43,"@f/to-generator":45}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"@f/is-array":18,"@f/is-functor":21,"@f/is-generator":22,"@f/is-iterator":23,"@f/is-object":24,"@f/map-array":32,"@f/map-gen":33,"@f/map-obj":34}],36:[function(require,module,exports){
/**
 * Modules
 */

var isFunction = require('@f/is-function')
var map = require('@f/map-array')

/**
 * Expose maybeOver
 */

module.exports = maybeOver

/**
 * maybeOver
 */

function maybeOver (value, fns) {
  return map(function (maybeFn) {
    return isFunction(maybeFn)
      ? maybeFn(value)
      : maybeFn
  }, fns)
}

},{"@f/is-function":20,"@f/map-array":32}],37:[function(require,module,exports){
/**
 * Modules
 */

var zip = require('@f/zip-obj')
var values = require('@f/values')
var curry = require('@f/curry-once')

/**
 * Expose objectToPromise
 */

module.exports = objectToPromise

/**
 * Convert an object to a promise resolving vals with `toPromise`.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise (obj) {
  var keys = Object.keys(obj)
  var promises = values(obj, keys)
  return Promise.all(promises).then(curry(zip)(keys))
}

},{"@f/curry-once":3,"@f/values":47,"@f/zip-obj":48}],38:[function(require,module,exports){
/**
 * Expose popcount
 */

module.exports = popcount

/**
 * popcount
 */

function popcount (x, n) {
  if (n !== undefined) {
    x &= (1 << n) - 1
  }

  x -= x >> 1 & 0x55555555
  x = (x & 0x33333333) + (x >> 2 & 0x33333333)
  x = x + (x >> 4) & 0x0f0f0f0f
  x += x >> 8
  x += x >> 16

  return x & 0x7f
}

},{}],39:[function(require,module,exports){
/**
 * Modules
 */

/**
 * Expose reduceArray
 */

module.exports = reduceArray['default'] = reduceArray

/**
 * reduceArray
 */

function reduceArray (cb, init, arr) {
  var len = arr.length
  var acc = init
  if (!arr.length) return init

  for (var i = 0; i < len; i++) {
    acc = cb(acc, arr[i], i, arr)
  }

  return acc
}

},{}],40:[function(require,module,exports){
/**
 * Expose reduceObj
 */

module.exports = reduceObj

/**
 * reduceObj
 */

function reduceObj (fn, acc, obj) {
  if (!obj) return acc

  var keys = Object.keys(obj)

  for (var i = 0, len = keys.length; i < len; ++i) {
    var key = keys[i]
    acc = fn(acc, obj[key], key, obj)
  }

  return acc
}

},{}],41:[function(require,module,exports){
/**
 * Modules
 */

var reduceArray = require('@f/reduce-array')
var reduceObj = require('@f/reduce-obj')
var isObject = require('@f/is-object')
var isArray = require('@f/is-array')

/**
 * Expose reduce
 */

module.exports = reduce

/**
 * reduce
 */

function reduce (fn, acc, container) {
  if (isArray(container)) return reduceArray(fn, acc, container)
  if (isObject(container)) return reduceObj(fn, acc, container)

  return acc
}

},{"@f/is-array":18,"@f/is-object":24,"@f/reduce-array":39,"@f/reduce-obj":40}],42:[function(require,module,exports){
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

},{"@f/extend":8}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
/**
 * Modules
 */

var slice = require('@f/slice')

/**
 * Expose thunkToPromise
 */

module.exports = thunkToPromise['default'] = thunkToPromise

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise (fn) {
  var ctx = this
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err)
      if (arguments.length > 2) res = slice(arguments, 1)
      resolve(res)
    })
  })
}

},{"@f/slice":43}],45:[function(require,module,exports){
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

},{"@f/generator":13,"@f/is-function":20,"@f/is-generator":22,"@f/set-proto":42,"@f/slice":43}],46:[function(require,module,exports){
/**
 * Modules
 */

var isArray = require('@f/is-array')
var isObject = require('@f/is-object')
var isFunction = require('@f/is-function')
var isPromise = require('@f/is-promise')
var arrayToPromise = require('@f/array-to-promise')
var objToPromise = require('@f/obj-to-promise')
var thunkToPromise = require('@f/thunk-to-promise')
var isGenerator = require('@f/is-generator')
var isIterator = require('@f/is-iterator')
var genToPromise = require('@f/gen-to-promise')


/**
 * Expose toPromise
 */

module.exports = toPromise

/**
 * Convert to promise
 * @param  {Mixed} val
 * @param  {Boolean} dontForce whether to resolve unrecognized types
 * @return {Promise}
 */

function toPromise (val, dontForce) {
  if (isPromise(val)) return val
  if (isArray(val)) return arrayToPromise(val)
  if (isObject(val)) return objToPromise(val)
  if (isGenerator(val) || isIterator(val)) return genToPromise(val)
  if (isFunction(val)) return thunkToPromise(val)
  if (!dontForce) return Promise.resolve(val)
  return val
}

},{"@f/array-to-promise":2,"@f/gen-to-promise":12,"@f/is-array":18,"@f/is-function":20,"@f/is-generator":22,"@f/is-iterator":23,"@f/is-object":24,"@f/is-promise":25,"@f/obj-to-promise":37,"@f/thunk-to-promise":44}],47:[function(require,module,exports){
/**
 * Modules
 */

var forEach = require('@f/foreach-array')

/**
 * Expose values
 */

module.exports = values

/**
 * Return an array of the values in `obj`, maintaining the same order as
 * Object.keys.
 *
 * @param  {Object} obj
 * @return {Array} The array of values
 */

function values (obj, keys) {
  keys = keys || Object.keys(obj)
  var arr = []
  forEach(push, keys)
  return arr

  function push (key) {
    arr.push(obj[key])
  }
}

},{"@f/foreach-array":9}],48:[function(require,module,exports){
/**
 * Modules
 */

/**
 * Expose zipObj
 */

module.exports = zipObj['default'] = zipObj

/**
 * zipObj
 */

function zipObj (keys, values) {
  var obj = {}
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i]
  }
  return obj
}

},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Use typed arrays if we can
 */

var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;

/**
 * Bit vector
 */

function createBv(sizeInBits) {
  return new FastArray(Math.ceil(sizeInBits / 32));
}

function setBit(v, idx) {
  var r = idx % 32;
  var pos = (idx - r) / 32;

  v[pos] |= 1 << r;
}

function clearBit(v, idx) {
  var r = idx % 32;
  var pos = (idx - r) / 32;

  v[pos] &= ~(1 << r);
}

function getBit(v, idx) {
  var r = idx % 32;
  var pos = (idx - r) / 32;

  return !!(v[pos] & 1 << r);
}

/**
 * Exports
 */

exports.createBv = createBv;
exports.setBit = setBit;
exports.clearBit = clearBit;
exports.getBit = getBit;
},{}],50:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

var _bitVector = require('bit-vector');

/**
 * Actions
 */

var CREATE = 0; /**
                 * Imports
                 */

var UPDATE = 1;
var MOVE = 2;
var REMOVE = 3;

/**
 * dift
 */

function dift(prev, next, effect, key) {
  var pStartIdx = 0;
  var nStartIdx = 0;
  var pEndIdx = prev.length - 1;
  var nEndIdx = next.length - 1;
  var pStartItem = prev[pStartIdx];
  var nStartItem = next[nStartIdx];

  // List head is the same
  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
    pStartItem = prev[++pStartIdx];
    nStartItem = next[++nStartIdx];
  }

  // The above case is orders of magnitude more common than the others, so fast-path it
  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
    return;
  }

  var pEndItem = prev[pEndIdx];
  var nEndItem = next[nEndIdx];
  var movedFromFront = 0;

  // Reversed
  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
    pStartItem = prev[++pStartIdx];
    nEndItem = next[--nEndIdx];
    ++movedFromFront;
  }

  // Reversed the other way (in case of e.g. reverse and append)
  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
    effect(MOVE, pEndItem, nStartItem, nStartIdx);
    pEndItem = prev[--pEndIdx];
    nStartItem = next[++nStartIdx];
    --movedFromFront;
  }

  // List tail is the same
  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
    pEndItem = prev[--pEndIdx];
    nEndItem = next[--nEndIdx];
  }

  if (pStartIdx > pEndIdx) {
    while (nStartIdx <= nEndIdx) {
      effect(CREATE, null, nStartItem, nStartIdx);
      nStartItem = next[++nStartIdx];
    }

    return;
  }

  if (nStartIdx > nEndIdx) {
    while (pStartIdx <= pEndIdx) {
      effect(REMOVE, pStartItem);
      pStartItem = prev[++pStartIdx];
    }

    return;
  }

  var created = 0;
  var pivotDest = null;
  var pivotIdx = pStartIdx - movedFromFront;
  var keepBase = pStartIdx;
  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);

  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);

  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
    var oldIdx = prevMap[key(nStartItem)];

    if (isUndefined(oldIdx)) {
      effect(CREATE, null, nStartItem, pivotIdx++);
      ++created;
    } else if (pStartIdx !== oldIdx) {
      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
    } else {
      pivotDest = nStartIdx;
    }
  }

  if (pivotDest !== null) {
    (0, _bitVector.setBit)(keep, 0);
    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
  }

  // If there are no creations, then you have to
  // remove exactly max(prevLen - nextLen, 0) elements in this
  // diff. You have to remove one more for each element
  // that was created. This means once we have
  // removed that many, we can stop.
  var necessaryRemovals = prev.length - next.length + created;
  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
      effect(REMOVE, pStartItem);
      ++removals;
    }
  }

  function equal(a, b) {
    return key(a) === key(b);
  }
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

function keyMap(items, start, end, key) {
  var map = {};

  for (var i = start; i < end; ++i) {
    map[key(items[i])] = i;
  }

  return map;
}

/**
 * Exports
 */

exports.default = dift;
exports.CREATE = CREATE;
exports.UPDATE = UPDATE;
exports.MOVE = MOVE;
exports.REMOVE = REMOVE;
},{"bit-vector":49}],52:[function(require,module,exports){
'use strict';

var OneVersionConstraint = require('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

},{"individual/one-version":58}],53:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],54:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
}).call(this,require('_process'))
},{"_process":1}],55:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":1}],56:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))
},{"./emptyFunction":53,"_process":1}],57:[function(require,module,exports){
(function (global){
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],58:[function(require,module,exports){
'use strict';

var Individual = require('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

},{"./index.js":57}],59:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":66}],60:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":59,"./_getRawTag":63,"./_objectToString":64}],61:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],62:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":65}],63:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":59}],64:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],65:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],66:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":61}],67:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],68:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":60,"./_getPrototype":62,"./isObjectLike":67}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = exports.del = exports.get = exports.set = undefined;

var _popcount = require('@f/popcount');

var _popcount2 = _interopRequireDefault(_popcount);

var _hashStr = require('@f/hash-str');

var _hashStr2 = _interopRequireDefault(_hashStr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constants
 */

/**
 * Imports
 */

var bits = 5;
var size = Math.pow(2, bits);
var mask = size - 1;

/**
 * Types
 */

var LEAF = 'LEAF';
var BRANCH = 'BRANCH';
var COLLISION = 'COLLISION';

/**
 * Mini HAMT
 */

var empty = createBranch();

function set(hamt, key, value) {
  validate(hamt);

  var code = (0, _hashStr2.default)(key);
  return insert(hamt, code, key, value);
}

function insert(node, code, key, value) {
  var depth = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

  var frag = getFrag(code, depth);
  var mask = 1 << frag;

  switch (node.type) {
    case LEAF:
      {
        if (node.code === code) {
          if (node.key === key) {
            return createLeaf(code, key, value);
          }

          return createCollision(code, [node, createLeaf(code, key, value)]);
        } else {
          var prevFrag = getFrag(node.code, depth);

          if (prevFrag === frag) {
            // XXX Optimize this
            return createBranch(mask, [insert(insert(empty, code, key, value, depth + 1), node.code, node.key, node.value, depth + 1)]);
          }

          var prevMask = 1 << prevFrag;
          var children = prevFrag < frag ? [node, createLeaf(code, key, value)] : [createLeaf(code, key, value), node];

          return createBranch(mask | prevMask, children);
        }
      }
    case BRANCH:
      {
        var idx = (0, _popcount2.default)(node.mask, frag);
        var children = node.children;

        // If there is already a node for this bit, recurse
        if (node.mask & mask) {
          var child = children[idx];
          return createBranch(node.mask, arrayReplace(children, idx, insert(child, code, key, value, depth + 1)));
        } else {
          return createBranch(node.mask | mask, arrayInsert(children, idx, createLeaf(code, key, value)));
        }
      }
    case COLLISION:
      {
        for (var i = 0, len = node.children.length; i < len; ++i) {
          if (node.children[i].key === key) {
            return createCollision(node.code, arrayReplace(node.children, i, createLeaf(code, key, value)));
          }
        }

        return createCollision(node.code, node.children.concat(createLeaf(code, key, value)));
      }
  }
}

function get(hamt, key) {
  validate(hamt);

  var code = (0, _hashStr2.default)(key);
  var node = hamt;
  var depth = -1;

  while (true) {
    ++depth;

    switch (node.type) {
      case BRANCH:
        {
          var frag = getFrag(code, depth);
          var _mask = 1 << frag;
          if (node.mask & _mask) {
            var idx = (0, _popcount2.default)(node.mask, frag);
            node = node.children[idx];
            continue;
          } else {
            return;
          }
        }
      case COLLISION:
        {
          for (var i = 0, len = node.children.length; i < len; ++i) {
            var child = node.children[i];
            if (child.key === key) {
              return child.value;
            }
          }

          return undefined;
        }
      case LEAF:
        {
          return node.key === key ? node.value : undefined;
        }
    }
  }
}

function del(hamt, key) {
  validate(hamt);

  var code = (0, _hashStr2.default)(key);
  var res = remove(hamt, code, key, 0);
  if (res === undefined) return hamt;
  if (res === null) return empty;
  return res;
}

function remove(node, code, key, depth) {
  var frag = getFrag(code, depth);
  var mask = 1 << frag;

  switch (node.type) {
    case LEAF:
      {
        // null means remove, undefined
        // means do nothing
        return node.key === key ? null : undefined;
      }
    case BRANCH:
      {
        if (node.mask & mask) {
          var idx = (0, _popcount2.default)(node.mask, frag);
          var res = remove(node.children[idx], code, key, depth + 1);
          if (res === null) {
            var newMask = node.mask & ~mask;

            if (newMask === 0) {
              return null;
            } else {
              return createBranch(newMask, arrayRemove(node.children, idx));
            }
          } else if (res === undefined) {
            return undefined;
          } else {
            return createBranch(node.mask, arrayReplace(node.children, idx, res));
          }
        } else {
          return undefined;
        }
      }
    case COLLISION:
      {
        if (node.code === code) {
          for (var i = 0, len = node.children.length; i < len; ++i) {
            var child = node.children[i];

            if (child.key === key) {
              return createCollision(node.code, arrayRemove(node.children, i));
            }
          }
        }

        return undefined;
      }
  }
}

/**
 * Node creators
 */

function createBranch() {
  var mask = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var children = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return {
    type: BRANCH,
    mask: mask,
    children: children
  };
}

function createCollision(code, children) {
  return {
    type: COLLISION,
    code: code,
    children: children
  };
}

function createLeaf(code, key, value) {
  return {
    type: LEAF,
    code: code,
    key: key,
    value: value
  };
}

/**
 * Helpers
 */

function arrayInsert(arr, idx, item) {
  arr = arr.slice();
  arr.splice(idx, 0, item);
  return arr;
}

function arrayRemove(arr, idx) {
  arr = arr.slice();
  arr.splice(idx, 1);
  return arr;
}

function arrayReplace(arr, idx, item) {
  arr = arr.slice();
  arr[idx] = item;
  return arr;
}

function getFrag(code, depth) {
  return code >>> 4 * depth & mask;
}

function validate(branch) {
  if (branch.type !== BRANCH) {
    throw new Error('mini-hamt: invalid HAMT passed to mini-hamt');
  }
}

/**
 * Exports
 */

exports.set = set;
exports.get = get;
exports.del = del;
exports.empty = empty;
},{"@f/hash-str":16,"@f/popcount":38}],70:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],71:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":72,"_process":1,"fbjs/lib/invariant":55,"fbjs/lib/warning":56}],72:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],73:[function(require,module,exports){
(function (process){
/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = require('object-assign');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');
var emptyFunction = require('fbjs/lib/emptyFunction');
var checkPropTypes = require('prop-types/checkPropTypes');

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}

}).call(this,require('_process'))
},{"_process":1,"fbjs/lib/emptyFunction":53,"fbjs/lib/emptyObject":54,"fbjs/lib/invariant":55,"fbjs/lib/warning":56,"object-assign":70,"prop-types/checkPropTypes":71}],74:[function(require,module,exports){
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var m=require("object-assign"),n=require("fbjs/lib/emptyObject"),p=require("fbjs/lib/emptyFunction"),q="function"===typeof Symbol&&Symbol["for"],r=q?Symbol["for"]("react.element"):60103,t=q?Symbol["for"]("react.call"):60104,u=q?Symbol["for"]("react.return"):60105,v=q?Symbol["for"]("react.portal"):60106,w=q?Symbol["for"]("react.fragment"):60107,x="function"===typeof Symbol&&Symbol.iterator;
function y(a){for(var b=arguments.length-1,e="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);b=Error(e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function A(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}A.prototype.isReactComponent={};A.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?y("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};A.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function B(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}function C(){}C.prototype=A.prototype;var D=B.prototype=new C;D.constructor=B;m(D,A.prototype);D.isPureReactComponent=!0;function E(a,b,e){this.props=a;this.context=b;this.refs=n;this.updater=e||z}var F=E.prototype=new C;F.constructor=E;m(F,A.prototype);F.unstable_isAsyncReactComponent=!0;F.render=function(){return this.props.children};var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,e){var c,d={},g=null,k=null;if(null!=b)for(c in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)H.call(b,c)&&!I.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var h=Array(f),l=0;l<f;l++)h[l]=arguments[l+2];d.children=h}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:r,type:a,key:g,ref:k,props:d,_owner:G.current}}function K(a){return"object"===typeof a&&null!==a&&a.$$typeof===r}
function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var L=/\/+/g,M=[];function N(a,b,e,c){if(M.length){var d=M.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function O(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>M.length&&M.push(a)}
function P(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case r:case t:case u:case v:g=!0}}if(g)return e(c,a,""===b?"."+Q(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+Q(d,k);g+=P(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=x&&a[x]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=
f.call(a),k=0;!(d=a.next()).done;)d=d.value,f=b+Q(d,k++),g+=P(d,f,e,c);else"object"===d&&(e=""+a,y("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function R(a,b){a.func.call(a.context,b,a.count++)}
function S(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?T(a,c,e,p.thatReturnsArgument):null!=a&&(K(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(L,"$\x26/")+"/")+e,a={$$typeof:r,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function T(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(L,"$\x26/")+"/");b=N(b,g,c,d);null==a||P(a,"",S,b);O(b)}
var U={Children:{map:function(a,b,e){if(null==a)return a;var c=[];T(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=N(null,null,b,e);null==a||P(a,"",R,b);O(b)},count:function(a){return null==a?0:P(a,"",p.thatReturnsNull,null)},toArray:function(a){var b=[];T(a,b,null,p.thatReturnsArgument);return b},only:function(a){K(a)?void 0:y("143");return a}},Component:A,PureComponent:B,unstable_AsyncComponent:E,Fragment:w,createElement:J,cloneElement:function(a,b,e){var c=m({},a.props),
d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)H.call(b,h)&&!I.hasOwnProperty(h)&&(c[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)c.children=e;else if(1<h){f=Array(h);for(var l=0;l<h;l++)f[l]=arguments[l+2];c.children=f}return{$$typeof:r,type:a.type,key:d,ref:g,props:c,_owner:k}},createFactory:function(a){var b=J.bind(null,a);b.type=a;return b},
isValidElement:K,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:G,assign:m}},V=Object.freeze({default:U}),W=V&&U||V;module.exports=W["default"]?W["default"]:W;

},{"fbjs/lib/emptyFunction":53,"fbjs/lib/emptyObject":54,"object-assign":70}],75:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Imports
                                                                                                                                                                                                                                                                   */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookup = exports.ephemeralReducer = exports.destroyEphemeral = exports.createEphemeral = exports.isEphemeral = exports.toEphemeral = undefined;

var _miniHamt = require('mini-hamt');

var hamt = _interopRequireWildcard(_miniHamt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Action types
 */

var CREATE = 'CREATE_EPHEMERAL';
var DESTROY = 'DESTROY_EPHEMERAL';

/**
 * Ephemeral state reducer
 */

function ephemeralReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? hamt.empty : arguments[0];
  var action = arguments[1];

  if (!isEphemeral(action)) return state;

  var _action$meta$ephemera = action.meta.ephemeral;
  var reducer = _action$meta$ephemera.reducer;
  var key = _action$meta$ephemera.key;


  switch (action.type) {
    case CREATE:
      return hamt.set(state, key, action.payload);
    case DESTROY:
      return hamt.del(state, key);
    default:
      var prev = hamt.get(state, key);
      var next = reducer(prev, action);

      return prev !== next ? hamt.set(state, key, next) : state;
  }

  return state;
}

/**
 * Action creators
 */

function toEphemeral(key, reducer, action) {
  return _extends({}, action, {
    meta: _extends({}, action.meta || {}, {
      ephemeral: {
        key: key,
        reducer: reducer
      }
    })
  });
}

function createEphemeral(key, initialState) {
  return {
    type: CREATE,
    payload: initialState,
    meta: {
      ephemeral: { key: key },
      logLevel: 'trace'
    }
  };
}

function destroyEphemeral(key) {
  return {
    type: DESTROY,
    meta: {
      ephemeral: { key: key },
      logLevel: 'trace'
    }
  };
}

function lookup(state, key) {
  return hamt.get(state || hamt.empty, key);
}

/**
 * Mount reducer
 */

function mount(prop, reducer) {
  return function (state, action) {
    return isEphemeral(action) ? _extends({}, state, _defineProperty({}, prop, ephemeralReducer(state[prop], action))) : reducer(state, action);
  };
}

function isEphemeral(action) {
  return action.meta && action.meta.hasOwnProperty('ephemeral');
}

/**
 * Exports
 */

exports.default = mount;
exports.toEphemeral = toEphemeral;
exports.isEphemeral = isEphemeral;
exports.createEphemeral = createEphemeral;
exports.destroyEphemeral = destroyEphemeral;
exports.ephemeralReducer = ephemeralReducer;
exports.lookup = lookup;
},{"mini-hamt":69}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * redux-falsy
 */

function falsy() {
  return function (next) {
    return function (action) {
      return action && next(action);
    };
  };
}

/**
 * Exports
 */

exports.default = falsy;
},{}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toPromise = require('@f/to-promise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _map = require('@f/map');

var _map2 = _interopRequireDefault(_map);

var _identity = require('@f/identity');

var _identity2 = _interopRequireDefault(_identity);

var _isIterator = require('@f/is-iterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

var _isGenerator = require('@f/is-generator');

var _isGenerator2 = _interopRequireDefault(_isGenerator);

var _isPromise = require('@f/is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _isFunctor = require('@f/is-functor');

var _isFunctor2 = _interopRequireDefault(_isFunctor);

var _logError = require('@f/log-error');

var _logError2 = _interopRequireDefault(_logError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Flo middleWare
 * @param  {Function} errorHandler=defaultErrorHandler
 * @param  {Function} successHandler=identity
 * @return {Function} Redux middleware
 */

/**
 * Imports
 */

function flow() {
  var errorHandler = arguments.length <= 0 || arguments[0] === undefined ? defaultErrorHandler : arguments[0];
  var successHandler = arguments.length <= 1 || arguments[1] === undefined ? _identity2.default : arguments[1];

  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        var promise = void 0;
        if ((0, _isFunctor2.default)(action) || (0, _isGenerator2.default)(action) || (0, _isIterator2.default)(action)) {
          promise = (0, _toPromise2.default)((0, _map2.default)(function (action) {
            return action && dispatch(action);
          }, action));
        } else if ((0, _isPromise2.default)(action)) {
          promise = (0, _toPromise2.default)(action);
        } else {
          return next(action);
        }
        return promise.then(successHandler, errorHandler);
      };
    };
  };
}

/**
 * Default error handler
 *
 * Logs the error and then throws it again to pass it back
 * to the calling code
 */

function defaultErrorHandler(err) {
  (0, _logError2.default)(err);
  throw err;
}

/**
 * Exports
 */

exports.default = flow;
},{"@f/identity":17,"@f/is-functor":21,"@f/is-generator":22,"@f/is-iterator":23,"@f/is-promise":25,"@f/log-error":31,"@f/map":35,"@f/to-promise":46}],78:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":81}],79:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],80:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
}).call(this,require('_process'))
},{"./createStore":82,"./utils/warning":83,"_process":1,"lodash/isPlainObject":68}],81:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
},{}],82:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":68,"symbol-observable":84}],83:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],84:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill.js":85}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],86:[function(require,module,exports){
'use strict';

var t = require('tcomb');
var stringify = t.stringify;

var noobj = {};

var ValidationError = t.struct({
  message: t.Any,
  actual: t.Any,
  expected: t.Any,
  path: t.list(t.union([t.String, t.Number]))
}, 'ValidationError');

function getDefaultValidationErrorMessage(actual, expected, path) {
  var expectedName = t.getTypeName(expected);
  var to = path.length ? '/' + path.join('/') + ': ' + expectedName : expectedName;
  return 'Invalid value ' + stringify(actual) + ' supplied to ' + to;
}

function getValidationErrorMessage(actual, expected, path, context) {
  if (t.Function.is(expected.getValidationErrorMessage)) {
    return expected.getValidationErrorMessage(actual, path, context);
  }
  else {
    return getDefaultValidationErrorMessage(actual, expected, path);
  }
}

ValidationError.of = function (actual, expected, path, context) {
  return new ValidationError({
    message: getValidationErrorMessage(actual, expected, path, context),
    actual: actual,
    expected: expected,
    path: path
  });
};

var ValidationResult = t.struct({
  errors: t.list(ValidationError),
  value: t.Any
}, 'ValidationResult');

ValidationResult.prototype.isValid = function () {
  return !(this.errors.length);
};

ValidationResult.prototype.firstError = function () {
  return this.isValid() ? null : this.errors[0];
};

ValidationResult.prototype.toString = function () {
  if (this.isValid()) {
    return '[ValidationResult, true, ' + stringify(this.value) + ']';
  }
  else {
    return '[ValidationResult, false, (' + this.errors.map(function (err) {
      return stringify(err.message);
    }).join(', ') + ')]';
  }
};

function validate(x, type, options) {
  options = options || {};
  var path = t.Array.is(options) ? options : options.path || [];
  return new ValidationResult(recurse(x, type, path, options));
}

function recurse(x, type, path, options) {
  if (t.isType(type)) {
    return validators[type.meta.kind](x, type, path, options);
  }
  else {
    return validators.es6classes(x, type, path, options);
  }
}

var validators = validate.validators = {};

validators.es6classes = function validateES6Classes(x, type, path, options) {
  return {
    value: x,
    errors: x instanceof type ? [] : [ValidationError.of(x, type, path, options.context)]
  };
};

// irreducibles and enums
validators.irreducible =
validators.enums = function validateIrreducible(x, type, path, options) {
  return {
    value: x,
    errors: type.is(x) ? [] : [ValidationError.of(x, type, path, options.context)]
  };
};

validators.list = function validateList(x, type, path, options) {

  // x should be an array
  if (!t.Array.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: [], errors: []};
  // every item should be of type `type.meta.type`
  for (var i = 0, len = x.length; i < len; i++ ) {
    var item = recurse(x[i], type.meta.type, path.concat(i), options);
    ret.value[i] = item.value;
    ret.errors = ret.errors.concat(item.errors);
  }
  return ret;
};

validators.subtype = function validateSubtype(x, type, path, options) {

  // x should be a valid inner type
  var ret = recurse(x, type.meta.type, path, options);
  if (ret.errors.length) {
    return ret;
  }

  // x should satisfy the predicate
  if (!type.meta.predicate(ret.value)) {
    ret.errors = [ValidationError.of(x, type, path, options.context)];
  }

  return ret;

};

validators.maybe = function validateMaybe(x, type, path, options) {
  return t.Nil.is(x) ?
    {value: x, errors: []} :
    recurse(x, type.meta.type, path, options);
};

validators.struct = function validateStruct(x, type, path, options) {

  // x should be an object
  if (!t.Object.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  // [optimization]
  if (type.is(x)) {
    return {value: x, errors: []};
  }

  var ret = {value: {}, errors: []};
  var props = type.meta.props;
  var defaultProps = type.meta.defaultProps || noobj;
  // every item should be of type `props[name]`
  for (var name in props) {
    if (props.hasOwnProperty(name)) {
      var actual = x[name];
      // apply defaults
      if (actual === undefined) {
        actual = defaultProps[name];
      }
      var prop = recurse(actual, props[name], path.concat(name), options);
      ret.value[name] = prop.value;
      ret.errors = ret.errors.concat(prop.errors);
    }
  }
  var strict = options.hasOwnProperty('strict') ? options.strict : type.meta.strict;
  if (strict) {
    for (var field in x) {
      if (x.hasOwnProperty(field) && !props.hasOwnProperty(field)) {
        ret.errors.push(ValidationError.of(x[field], t.Nil, path.concat(field), options.context));
      }
    }
  }
  if (!ret.errors.length) {
    ret.value = new type(ret.value);
  }
  return ret;
};

validators.tuple = function validateTuple(x, type, path, options) {

  var types = type.meta.types;
  var len = types.length;

  // x should be an array of at most `len` items
  if (!t.Array.is(x) || x.length > len) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: [], errors: []};
  // every item should be of type `types[i]`
  for (var i = 0; i < len; i++) {
    var item = recurse(x[i], types[i], path.concat(i), options);
    ret.value[i] = item.value;
    ret.errors = ret.errors.concat(item.errors);
  }
  return ret;
};

validators.dict = function validateDict(x, type, path, options) {

  // x should be an object
  if (!t.Object.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: {}, errors: []};
  // every key should be of type `domain`
  // every value should be of type `codomain`
  for (var k in x) {
    if (x.hasOwnProperty(k)) {
      var subpath = path.concat(k);
      var key = recurse(k, type.meta.domain, subpath, options);
      var item = recurse(x[k], type.meta.codomain, subpath, options);
      ret.value[k] = item.value;
      ret.errors = ret.errors.concat(key.errors, item.errors);
    }
  }
  return ret;
};

validators.union = function validateUnion(x, type, path, options) {
  var ctor = type.dispatch(x);
  return t.Function.is(ctor) ?
    recurse(x, ctor, path.concat(type.meta.types.indexOf(ctor)), options) :
    {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
};

validators.intersection = function validateIntersection(x, type, path, options) {

  var types = type.meta.types;
  var len = types.length;

  var ret = {value: x, errors: []};
  var nrOfStructs = 0;
  // x should be of type `types[i]` for all i
  for (var i = 0; i < len; i++) {
    if (types[i].meta.kind === 'struct') {
      nrOfStructs++;
    }
    var item = recurse(x, types[i], path, options);
    ret.errors = ret.errors.concat(item.errors);
  }
  if (nrOfStructs > 1) {
    ret.errors.push(ValidationError.of(x, type, path, options.context));
  }
  return ret;
};

validators['interface'] = function validateInterface(x, type, path, options) { // eslint-disable-line dot-notation

  // x should be an object
  if (!t.Object.is(x)) {
    return {value: x, errors: [ValidationError.of(x, type, path, options.context)]};
  }

  var ret = {value: {}, errors: []};
  var props = type.meta.props;
  // every item should be of type `props[name]`
  for (var name in props) {
    var prop = recurse(x[name], props[name], path.concat(name), options);
    ret.value[name] = prop.value;
    ret.errors = ret.errors.concat(prop.errors);
  }
  var strict = options.hasOwnProperty('strict') ? options.strict : type.meta.strict;
  if (strict) {
    for (var field in x) {
      if (!props.hasOwnProperty(field) && !t.Nil.is(x[field])) {
        ret.errors.push(ValidationError.of(x[field], t.Nil, path.concat(field), options.context));
      }
    }
  }
  return ret;
};

t.mixin(t, {
  ValidationError: ValidationError,
  ValidationResult: ValidationResult,
  validate: validate
});

module.exports = t;

},{"tcomb":87}],87:[function(require,module,exports){
/*! @preserve
 *
 * tcomb.js - Type checking and DDD for JavaScript
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Giulio Canti
 *
 */

// core
var t = require('./lib/assert');

// types
t.Any = require('./lib/Any');
t.Array = require('./lib/Array');
t.Boolean = require('./lib/Boolean');
t.Date = require('./lib/Date');
t.Error = require('./lib/Error');
t.Function = require('./lib/Function');
t.Nil = require('./lib/Nil');
t.Number = require('./lib/Number');
t.Integer = require('./lib/Integer');
t.IntegerT = t.Integer;
t.Object = require('./lib/Object');
t.RegExp = require('./lib/RegExp');
t.String = require('./lib/String');
t.Type = require('./lib/Type');
t.TypeT = t.Type;

// short alias are deprecated
t.Arr = t.Array;
t.Bool = t.Boolean;
t.Dat = t.Date;
t.Err = t.Error;
t.Func = t.Function;
t.Num = t.Number;
t.Obj = t.Object;
t.Re = t.RegExp;
t.Str = t.String;

// combinators
t.dict = require('./lib/dict');
t.declare = require('./lib/declare');
t.enums = require('./lib/enums');
t.irreducible = require('./lib/irreducible');
t.list = require('./lib/list');
t.maybe = require('./lib/maybe');
t.refinement = require('./lib/refinement');
t.struct = require('./lib/struct');
t.tuple = require('./lib/tuple');
t.union = require('./lib/union');
t.func = require('./lib/func');
t.intersection = require('./lib/intersection');
t.subtype = t.refinement;
t.inter = require('./lib/interface'); // IE8 alias
t['interface'] = t.inter;

// functions
t.assert = t;
t.update = require('./lib/update');
t.mixin = require('./lib/mixin');
t.isType = require('./lib/isType');
t.is = require('./lib/is');
t.getTypeName = require('./lib/getTypeName');
t.match = require('./lib/match');

module.exports = t;

},{"./lib/Any":88,"./lib/Array":89,"./lib/Boolean":90,"./lib/Date":91,"./lib/Error":92,"./lib/Function":93,"./lib/Integer":94,"./lib/Nil":95,"./lib/Number":96,"./lib/Object":97,"./lib/RegExp":98,"./lib/String":99,"./lib/Type":100,"./lib/assert":101,"./lib/declare":104,"./lib/dict":106,"./lib/enums":107,"./lib/func":111,"./lib/getTypeName":114,"./lib/interface":115,"./lib/intersection":116,"./lib/irreducible":117,"./lib/is":118,"./lib/isType":130,"./lib/list":133,"./lib/match":134,"./lib/maybe":135,"./lib/mixin":136,"./lib/refinement":137,"./lib/struct":139,"./lib/tuple":140,"./lib/union":141,"./lib/update":142}],88:[function(require,module,exports){
var irreducible = require('./irreducible');

module.exports = irreducible('Any', function () { return true; });

},{"./irreducible":117}],89:[function(require,module,exports){
var irreducible = require('./irreducible');
var isArray = require('./isArray');

module.exports = irreducible('Array', isArray);

},{"./irreducible":117,"./isArray":119}],90:[function(require,module,exports){
var irreducible = require('./irreducible');
var isBoolean = require('./isBoolean');

module.exports = irreducible('Boolean', isBoolean);

},{"./irreducible":117,"./isBoolean":120}],91:[function(require,module,exports){
var irreducible = require('./irreducible');

module.exports = irreducible('Date', function (x) { return x instanceof Date; });

},{"./irreducible":117}],92:[function(require,module,exports){
var irreducible = require('./irreducible');

module.exports = irreducible('Error', function (x) { return x instanceof Error; });

},{"./irreducible":117}],93:[function(require,module,exports){
var irreducible = require('./irreducible');
var isFunction = require('./isFunction');

module.exports = irreducible('Function', isFunction);

},{"./irreducible":117,"./isFunction":121}],94:[function(require,module,exports){
var refinement = require('./refinement');
var Number = require('./Number');

module.exports = refinement(Number, function (x) { return x % 1 === 0; }, 'Integer');

},{"./Number":96,"./refinement":137}],95:[function(require,module,exports){
var irreducible = require('./irreducible');
var isNil = require('./isNil');

module.exports = irreducible('Nil', isNil);

},{"./irreducible":117,"./isNil":125}],96:[function(require,module,exports){
var irreducible = require('./irreducible');
var isNumber = require('./isNumber');

module.exports = irreducible('Number', isNumber);

},{"./irreducible":117,"./isNumber":126}],97:[function(require,module,exports){
var irreducible = require('./irreducible');
var isObject = require('./isObject');

module.exports = irreducible('Object', isObject);

},{"./irreducible":117,"./isObject":127}],98:[function(require,module,exports){
var irreducible = require('./irreducible');

module.exports = irreducible('RegExp', function (x) { return x instanceof RegExp; });

},{"./irreducible":117}],99:[function(require,module,exports){
var irreducible = require('./irreducible');
var isString = require('./isString');

module.exports = irreducible('String', isString);

},{"./irreducible":117,"./isString":128}],100:[function(require,module,exports){
var irreducible = require('./irreducible');
var isType = require('./isType');

module.exports = irreducible('Type', isType);
},{"./irreducible":117,"./isType":130}],101:[function(require,module,exports){
var isFunction = require('./isFunction');
var isNil = require('./isNil');
var fail = require('./fail');
var stringify = require('./stringify');

function assert(guard, message) {
  if (guard !== true) {
    if (isFunction(message)) { // handle lazy messages
      message = message();
    }
    else if (isNil(message)) { // use a default message
      message = 'Assert failed (turn on "Pause on exceptions" in your Source panel)';
    }
    assert.fail(message);
  }
}

assert.fail = fail;
assert.stringify = stringify;

module.exports = assert;
},{"./fail":109,"./isFunction":121,"./isNil":125,"./stringify":138}],102:[function(require,module,exports){
function assign(x, y) {
  for (var k in y) {
    if (y.hasOwnProperty(k)) {
      x[k] = y[k];
    }
  }
  return x;
}

module.exports = assign;

},{}],103:[function(require,module,exports){
(function (process){
var isType = require('./isType');
var getFunctionName = require('./getFunctionName');
var assert = require('./assert');
var stringify = require('./stringify');

// creates an instance of a type, handling the optional new operator
module.exports = function create(type, value, path) {
  if (isType(type)) {
    return !type.meta.identity && typeof value === 'object' && value !== null ? new type(value, path): type(value, path);
  }

  if (process.env.NODE_ENV !== 'production') {
    // here type should be a class constructor and value some instance, just check membership and return the value
    path = path || [getFunctionName(type)];
    assert(value instanceof type, function () { return 'Invalid value ' + stringify(value) + ' supplied to ' + path.join('/'); });
  }

  return value;
};
}).call(this,require('_process'))
},{"./assert":101,"./getFunctionName":113,"./isType":130,"./stringify":138,"_process":1}],104:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isType = require('./isType');
var isNil = require('./isNil');
var mixin = require('./mixin');
var getTypeName = require('./getTypeName');
var isUnion = require('./isUnion');

// All the .declare-d types should be clearly different from each other thus they should have
// different names when a name was not explicitly provided.
var nextDeclareUniqueId = 1;

module.exports = function declare(name) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isTypeName(name), function () { return 'Invalid argument name ' + name + ' supplied to declare([name]) (expected a string)'; });
  }

  var type;

  function Declare(value, path) {
    if (process.env.NODE_ENV !== 'production') {
      assert(!isNil(type), function () { return 'Type declared but not defined, don\'t forget to call .define on every declared type'; });
      if (isUnion(type)) {
        assert(type.dispatch === Declare.dispatch, function () { return 'Please define the custom ' + name + '.dispatch function before calling ' + name + '.define()'; });
      }
    }
    return type(value, path);
  }

  Declare.define = function (spec) {
    if (process.env.NODE_ENV !== 'production') {
      assert(isType(spec), function () { return 'Invalid argument type ' + assert.stringify(spec) +  ' supplied to define(type) (expected a type)'; });
      assert(isNil(type), function () { return 'Declare.define(type) can only be invoked once'; });
      // assert(isNil(spec.meta.name) && Object.keys(spec.prototype).length === 0, function () { return 'Invalid argument type ' + assert.stringify(spec) + ' supplied to define(type) (expected a fresh, unnamed type)'; });
    }

    if (isUnion(spec) && Declare.hasOwnProperty('dispatch')) {
      spec.dispatch = Declare.dispatch;
    }
    type = spec;
    mixin(Declare, type, true); // true because it overwrites Declare.displayName
    if (name) {
      type.displayName = Declare.displayName = name;
      Declare.meta.name = name;
    }
    Declare.meta.identity = type.meta.identity;
    Declare.prototype = type.prototype;
    return Declare;
  };

  Declare.displayName = name || ( getTypeName(Declare) + "$" + nextDeclareUniqueId++ );
  // in general I can't say if this type will be an identity, for safety setting to false
  Declare.meta = { identity: false };
  Declare.prototype = null;
  return Declare;
};

}).call(this,require('_process'))
},{"./assert":101,"./getTypeName":114,"./isNil":125,"./isType":130,"./isTypeName":131,"./isUnion":132,"./mixin":136,"_process":1}],105:[function(require,module,exports){
var isType = require('./isType');

function isRefinement(type) {
  return isType(type) && type.meta.kind === 'subtype';
}

function getPredicates(type) {
  return isRefinement(type) ?
    [type.meta.predicate].concat(getPredicates(type.meta.type)) :
    [];
}

function getUnrefinedType(type) {
  return isRefinement(type) ?
    getUnrefinedType(type.meta.type) :
    type;
}

function decompose(type) {
  return {
    predicates: getPredicates(type),
    unrefinedType: getUnrefinedType(type)
  };
}

module.exports = decompose;
},{"./isType":130}],106:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var getTypeName = require('./getTypeName');
var isIdentity = require('./isIdentity');
var isObject = require('./isObject');
var create = require('./create');
var is = require('./is');

function getDefaultName(domain, codomain) {
  return '{[key: ' + getTypeName(domain) + ']: ' + getTypeName(codomain) + '}';
}

function dict(domain, codomain, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(domain), function () { return 'Invalid argument domain ' + assert.stringify(domain) + ' supplied to dict(domain, codomain, [name]) combinator (expected a type)'; });
    assert(isFunction(codomain), function () { return 'Invalid argument codomain ' + assert.stringify(codomain) + ' supplied to dict(domain, codomain, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to dict(domain, codomain, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(domain, codomain);
  var domainNameCache = getTypeName(domain);
  var codomainNameCache = getTypeName(codomain);
  var identity = isIdentity(domain) && isIdentity(codomain);

  function Dict(value, path) {

    if (process.env.NODE_ENV === 'production') {
      if (identity) {
        return value; // just trust the input if elements must not be hydrated
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      path = path || [displayName];
      assert(isObject(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    var idempotent = true; // will remain true if I can reutilise the input
    var ret = {}; // make a temporary copy, will be discarded if idempotent remains true
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        k = create(domain, k, ( process.env.NODE_ENV !== 'production' ? path.concat(domainNameCache) : null ));
        var actual = value[k];
        var instance = create(codomain, actual, ( process.env.NODE_ENV !== 'production' ? path.concat(k + ': ' + codomainNameCache) : null ));
        idempotent = idempotent && ( actual === instance );
        ret[k] = instance;
      }
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(ret);
    }

    return ret;
  }

  Dict.meta = {
    kind: 'dict',
    domain: domain,
    codomain: codomain,
    name: name,
    identity: identity
  };

  Dict.displayName = displayName;

  Dict.is = function (x) {
    if (!isObject(x)) {
      return false;
    }
    for (var k in x) {
      if (x.hasOwnProperty(k)) {
        if (!is(k, domain) || !is(x[k], codomain)) {
          return false;
        }
      }
    }
    return true;
  };

  Dict.update = function (instance, patch) {
    return Dict(assert.update(instance, patch));
  };

  return Dict;
}

dict.getDefaultName = getDefaultName;
module.exports = dict;

}).call(this,require('_process'))
},{"./assert":101,"./create":103,"./getTypeName":114,"./is":118,"./isFunction":121,"./isIdentity":122,"./isObject":127,"./isTypeName":131,"_process":1}],107:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var forbidNewOperator = require('./forbidNewOperator');
var isString = require('./isString');
var isObject = require('./isObject');

function getDefaultName(map) {
  return Object.keys(map).map(function (k) { return assert.stringify(k); }).join(' | ');
}

function enums(map, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isObject(map), function () { return 'Invalid argument map ' + assert.stringify(map) + ' supplied to enums(map, [name]) combinator (expected a dictionary of String -> String | Number)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to enums(map, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(map);

  function Enums(value, path) {

    if (process.env.NODE_ENV !== 'production') {
      forbidNewOperator(this, Enums);
      path = path || [displayName];
      assert(Enums.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected one of ' + assert.stringify(Object.keys(map)) + ')'; });
    }

    return value;
  }

  Enums.meta = {
    kind: 'enums',
    map: map,
    name: name,
    identity: true
  };

  Enums.displayName = displayName;

  Enums.is = function (x) {
    return map.hasOwnProperty(x);
  };

  return Enums;
}

enums.of = function (keys, name) {
  keys = isString(keys) ? keys.split(' ') : keys;
  var value = {};
  keys.forEach(function (k) {
    value[k] = k;
  });
  return enums(value, name);
};

enums.getDefaultName = getDefaultName;
module.exports = enums;


}).call(this,require('_process'))
},{"./assert":101,"./forbidNewOperator":110,"./isObject":127,"./isString":128,"./isTypeName":131,"_process":1}],108:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isFunction = require('./isFunction');
var isArray = require('./isArray');
var mixin = require('./mixin');
var isStruct = require('./isStruct');
var isInterface = require('./isInterface');
var isObject = require('./isObject');
var refinement = require('./refinement');
var decompose = require('./decompose');

function compose(predicates, unrefinedType, name) {
  var result = predicates.reduce(function (type, predicate) {
    return refinement(type, predicate);
  }, unrefinedType);
  if (name) {
    result.displayName = name;
    result.meta.name = name;
  }
  return result;
}

function getProps(type) {
  return isObject(type) ? type : type.meta.props;
}

function getDefaultProps(type) {
  return isObject(type) ? null : type.meta.defaultProps;
}

function pushAll(arr, elements) {
  Array.prototype.push.apply(arr, elements);
}

function extend(combinator, mixins, options) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(combinator), function () { return 'Invalid argument combinator supplied to extend(combinator, mixins, options), expected a function'; });
    assert(isArray(mixins), function () { return 'Invalid argument mixins supplied to extend(combinator, mixins, options), expected an array'; });
  }
  var props = {};
  var prototype = {};
  var predicates = [];
  var defaultProps = {};
  mixins.forEach(function (x, i) {
    var decomposition = decompose(x);
    var unrefinedType = decomposition.unrefinedType;
    if (process.env.NODE_ENV !== 'production') {
      assert(isObject(unrefinedType) || isStruct(unrefinedType) || isInterface(unrefinedType), function () { return 'Invalid argument mixins[' + i + '] supplied to extend(combinator, mixins, options), expected an object, struct, interface or a refinement (of struct or interface)'; });
    }
    pushAll(predicates, decomposition.predicates);
    mixin(props, getProps(unrefinedType));
    mixin(prototype, unrefinedType.prototype);
    mixin(defaultProps, getDefaultProps(unrefinedType), true);
  });
  options = combinator.getOptions(options);
  options.defaultProps = mixin(defaultProps, options.defaultProps, true);
  var result = compose(predicates, combinator(props, {
    strict: options.strict,
    defaultProps: options.defaultProps
  }), options.name);
  mixin(result.prototype, prototype);
  return result;
}

module.exports = extend;

}).call(this,require('_process'))
},{"./assert":101,"./decompose":105,"./isArray":119,"./isFunction":121,"./isInterface":123,"./isObject":127,"./isStruct":129,"./mixin":136,"./refinement":137,"_process":1}],109:[function(require,module,exports){
module.exports = function fail(message) {
  throw new TypeError('[tcomb] ' + message);
};
},{}],110:[function(require,module,exports){
var assert = require('./assert');
var getTypeName = require('./getTypeName');

module.exports = function forbidNewOperator(x, type) {
  assert(!(x instanceof type), function () { return 'Cannot use the new operator to instantiate the type ' + getTypeName(type); });
};
},{"./assert":101,"./getTypeName":114}],111:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var FunctionType = require('./Function');
var isArray = require('./isArray');
var list = require('./list');
var isObject = require('./isObject');
var create = require('./create');
var isNil = require('./isNil');
var isBoolean = require('./isBoolean');
var tuple = require('./tuple');
var getFunctionName = require('./getFunctionName');
var getTypeName = require('./getTypeName');
var isType = require('./isType');

function getDefaultName(domain, codomain) {
  return '(' + domain.map(getTypeName).join(', ') + ') => ' + getTypeName(codomain);
}

function isInstrumented(f) {
  return FunctionType.is(f) && isObject(f.instrumentation);
}

function getOptionalArgumentsIndex(types) {
  var end = types.length;
  var areAllMaybes = false;
  for (var i = end - 1; i >= 0; i--) {
    var type = types[i];
    if (!isType(type) || type.meta.kind !== 'maybe') {
      return (i + 1);
    } else {
      areAllMaybes = true;
    }
  }
  return areAllMaybes ? 0 : end;
}

function func(domain, codomain, name) {

  domain = isArray(domain) ? domain : [domain]; // handle handy syntax for unary functions

  if (process.env.NODE_ENV !== 'production') {
    assert(list(FunctionType).is(domain), function () { return 'Invalid argument domain ' + assert.stringify(domain) + ' supplied to func(domain, codomain, [name]) combinator (expected an array of types)'; });
    assert(FunctionType.is(codomain), function () { return 'Invalid argument codomain ' + assert.stringify(codomain) + ' supplied to func(domain, codomain, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to func(domain, codomain, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(domain, codomain);
  var domainLength = domain.length;
  var optionalArgumentsIndex = getOptionalArgumentsIndex(domain);

  function FuncType(value, path) {

    if (!isInstrumented(value)) { // automatically instrument the function
      return FuncType.of(value);
    }

    if (process.env.NODE_ENV !== 'production') {
      path = path || [displayName];
      assert(FuncType.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return value;
  }

  FuncType.meta = {
    kind: 'func',
    domain: domain,
    codomain: codomain,
    name: name,
    identity: true
  };

  FuncType.displayName = displayName;

  FuncType.is = function (x) {
    return isInstrumented(x) &&
      x.instrumentation.domain.length === domainLength &&
      x.instrumentation.domain.every(function (type, i) {
        return type === domain[i];
      }) &&
      x.instrumentation.codomain === codomain;
  };

  FuncType.of = function (f, curried) {

    if (process.env.NODE_ENV !== 'production') {
      assert(FunctionType.is(f), function () { return 'Invalid argument f supplied to func.of ' + displayName + ' (expected a function)'; });
      assert(isNil(curried) || isBoolean(curried), function () { return 'Invalid argument curried ' + assert.stringify(curried) + ' supplied to func.of ' + displayName + ' (expected a boolean)'; });
    }

    if (FuncType.is(f)) { // makes FuncType.of idempotent
      return f;
    }

    function fn() {
      var args = Array.prototype.slice.call(arguments);
      var argsLength = args.length;

      if (process.env.NODE_ENV !== 'production') {
        // type-check arguments
        var tupleLength = curried ? argsLength : Math.max(argsLength, optionalArgumentsIndex);
        tuple(domain.slice(0, tupleLength), 'arguments of function ' + displayName)(args);
      }

      if (curried && argsLength < domainLength) {
        if (process.env.NODE_ENV !== 'production') {
          assert(argsLength > 0, 'Invalid arguments.length = 0 for curried function ' + displayName);
        }
        var g = Function.prototype.bind.apply(f, [this].concat(args));
        var newDomain = func(domain.slice(argsLength), codomain);
        return newDomain.of(g, true);
      }
      else {
        return create(codomain, f.apply(this, args));
      }
    }

    fn.instrumentation = {
      domain: domain,
      codomain: codomain,
      f: f
    };

    fn.displayName = getFunctionName(f);

    return fn;

  };

  return FuncType;

}

func.getDefaultName = getDefaultName;
func.getOptionalArgumentsIndex = getOptionalArgumentsIndex;
module.exports = func;

}).call(this,require('_process'))
},{"./Function":93,"./assert":101,"./create":103,"./getFunctionName":113,"./getTypeName":114,"./isArray":119,"./isBoolean":120,"./isNil":125,"./isObject":127,"./isType":130,"./isTypeName":131,"./list":133,"./tuple":140,"_process":1}],112:[function(require,module,exports){
var getTypeName = require('./getTypeName');

function getDefaultInterfaceName(props) {
  return '{' + Object.keys(props).map(function (prop) {
    return prop + ': ' + getTypeName(props[prop]);
  }).join(', ') + '}';
}

module.exports = getDefaultInterfaceName;

},{"./getTypeName":114}],113:[function(require,module,exports){
module.exports = function getFunctionName(f) {
  return f.displayName || f.name || '<function' + f.length + '>';
};
},{}],114:[function(require,module,exports){
var isType = require('./isType');
var getFunctionName = require('./getFunctionName');

module.exports = function getTypeName(ctor) {
  if (isType(ctor)) {
    return ctor.displayName;
  }
  return getFunctionName(ctor);
};
},{"./getFunctionName":113,"./isType":130}],115:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var String = require('./String');
var Function = require('./Function');
var isBoolean = require('./isBoolean');
var isObject = require('./isObject');
var isNil = require('./isNil');
var create = require('./create');
var getTypeName = require('./getTypeName');
var dict = require('./dict');
var getDefaultInterfaceName = require('./getDefaultInterfaceName');
var isIdentity = require('./isIdentity');
var is = require('./is');
var extend = require('./extend');
var assign = require('./assign');

function extendInterface(mixins, name) {
  return extend(inter, mixins, name);
}

function getOptions(options) {
  if (!isObject(options)) {
    options = isNil(options) ? {} : { name: options };
  }
  if (!options.hasOwnProperty('strict')) {
    options.strict = inter.strict;
  }
  return options;
}

function inter(props, options) {

  options = getOptions(options);
  var name = options.name;
  var strict = options.strict;

  if (process.env.NODE_ENV !== 'production') {
    assert(dict(String, Function).is(props), function () { return 'Invalid argument props ' + assert.stringify(props) + ' supplied to interface(props, [options]) combinator (expected a dictionary String -> Type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to interface(props, [options]) combinator (expected a string)'; });
    assert(isBoolean(strict), function () { return 'Invalid argument strict ' + assert.stringify(strict) + ' supplied to struct(props, [options]) combinator (expected a boolean)'; });
  }

  var displayName = name || getDefaultInterfaceName(props);
  var identity = Object.keys(props).map(function (prop) { return props[prop]; }).every(isIdentity);

  function Interface(value, path) {

    if (process.env.NODE_ENV === 'production') {
      if (identity) {
        return value; // just trust the input if elements must not be hydrated
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      path = path || [displayName];
      assert(!isNil(value), function () { return 'Invalid value ' + value + ' supplied to ' + path.join('/'); });
      // strictness
      if (strict) {
        for (var k in value) {
          assert(props.hasOwnProperty(k), function () { return 'Invalid additional prop "' + k + '" supplied to ' + path.join('/'); });
        }
      }
    }

    var idempotent = true;
    var ret = identity ? {} : assign({}, value);
    for (var prop in props) {
      var expected = props[prop];
      var actual = value[prop];
      var instance = create(expected, actual, ( process.env.NODE_ENV !== 'production' ? path.concat(prop + ': ' + getTypeName(expected)) : null ));
      idempotent = idempotent && ( actual === instance );
      ret[prop] = instance;
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(ret);
    }

    return ret;

  }

  Interface.meta = {
    kind: 'interface',
    props: props,
    name: name,
    identity: identity,
    strict: strict
  };

  Interface.displayName = displayName;

  Interface.is = function (x) {
    if (isNil(x)) {
      return false;
    }
    if (strict) {
      for (var k in x) {
        if (!props.hasOwnProperty(k)) {
          return false;
        }
      }
    }
    for (var prop in props) {
      if (!is(x[prop], props[prop])) {
        return false;
      }
    }
    return true;
  };

  Interface.update = function (instance, patch) {
    return Interface(assert.update(instance, patch));
  };

  Interface.extend = function (xs, name) {
    return extendInterface([Interface].concat(xs), name);
  };

  return Interface;
}

inter.strict = false;
inter.getOptions = getOptions;
inter.getDefaultName = getDefaultInterfaceName;
inter.extend = extendInterface;
module.exports = inter;

}).call(this,require('_process'))
},{"./Function":93,"./String":99,"./assert":101,"./assign":102,"./create":103,"./dict":106,"./extend":108,"./getDefaultInterfaceName":112,"./getTypeName":114,"./is":118,"./isBoolean":120,"./isIdentity":122,"./isNil":125,"./isObject":127,"./isTypeName":131,"_process":1}],116:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var isArray = require('./isArray');
var forbidNewOperator = require('./isIdentity');
var is = require('./is');
var getTypeName = require('./getTypeName');
var isIdentity = require('./isIdentity');

function getDefaultName(types) {
  return types.map(getTypeName).join(' & ');
}

function intersection(types, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(types) && types.every(isFunction) && types.length >= 2, function () { return 'Invalid argument types ' + assert.stringify(types) + ' supplied to intersection(types, [name]) combinator (expected an array of at least 2 types)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to intersection(types, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(types);
  var identity = types.every(isIdentity);

  function Intersection(value, path) {

    if (process.env.NODE_ENV !== 'production') {
      if (identity) {
        forbidNewOperator(this, Intersection);
      }
      path = path || [displayName];
      assert(Intersection.is(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return value;
  }

  Intersection.meta = {
    kind: 'intersection',
    types: types,
    name: name,
    identity: identity
  };

  Intersection.displayName = displayName;

  Intersection.is = function (x) {
    return types.every(function (type) {
      return is(x, type);
    });
  };

  Intersection.update = function (instance, patch) {
    return Intersection(assert.update(instance, patch));
  };

  return Intersection;
}

intersection.getDefaultName = getDefaultName;
module.exports = intersection;


}).call(this,require('_process'))
},{"./assert":101,"./getTypeName":114,"./is":118,"./isArray":119,"./isFunction":121,"./isIdentity":122,"./isTypeName":131,"_process":1}],117:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isString = require('./isString');
var isFunction = require('./isFunction');
var forbidNewOperator = require('./forbidNewOperator');

module.exports = function irreducible(name, predicate) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isString(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to irreducible(name, predicate) (expected a string)'; });
    assert(isFunction(predicate), 'Invalid argument predicate ' + assert.stringify(predicate) + ' supplied to irreducible(name, predicate) (expected a function)');
  }

  function Irreducible(value, path) {

    if (process.env.NODE_ENV !== 'production') {
      forbidNewOperator(this, Irreducible);
      path = path || [name];
      assert(predicate(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return value;
  }

  Irreducible.meta = {
    kind: 'irreducible',
    name: name,
    predicate: predicate,
    identity: true
  };

  Irreducible.displayName = name;

  Irreducible.is = predicate;

  return Irreducible;
};

}).call(this,require('_process'))
},{"./assert":101,"./forbidNewOperator":110,"./isFunction":121,"./isString":128,"_process":1}],118:[function(require,module,exports){
var isType = require('./isType');

// returns true if x is an instance of type
module.exports = function is(x, type) {
  if (isType(type)) {
    return type.is(x);
  }
  return x instanceof type; // type should be a class constructor
};

},{"./isType":130}],119:[function(require,module,exports){
module.exports = function isArray(x) {
  return Array.isArray ? Array.isArray(x) : x instanceof Array;
};
},{}],120:[function(require,module,exports){
module.exports = function isBoolean(x) {
  return x === true || x === false;
};
},{}],121:[function(require,module,exports){
module.exports = function isFunction(x) {
  return typeof x === 'function';
};
},{}],122:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var Boolean = require('./Boolean');
var isType = require('./isType');
var getTypeName = require('./getTypeName');

// return true if the type constructor behaves like the identity function
module.exports = function isIdentity(type) {
  if (isType(type)) {
    if (process.env.NODE_ENV !== 'production') {
      assert(Boolean.is(type.meta.identity), function () { return 'Invalid meta identity ' + assert.stringify(type.meta.identity) + ' supplied to type ' + getTypeName(type); });
    }
    return type.meta.identity;
  }
  // for tcomb the other constructors, like ES6 classes, are identity-like
  return true;
};
}).call(this,require('_process'))
},{"./Boolean":90,"./assert":101,"./getTypeName":114,"./isType":130,"_process":1}],123:[function(require,module,exports){
var isType = require('./isType');

module.exports = function isInterface(x) {
  return isType(x) && ( x.meta.kind === 'interface' );
};
},{"./isType":130}],124:[function(require,module,exports){
var isType = require('./isType');

module.exports = function isMaybe(x) {
  return isType(x) && ( x.meta.kind === 'maybe' );
};
},{"./isType":130}],125:[function(require,module,exports){
module.exports = function isNil(x) {
  return x === null || x === void 0;
};
},{}],126:[function(require,module,exports){
module.exports = function isNumber(x) {
  return typeof x === 'number' && isFinite(x) && !isNaN(x);
};
},{}],127:[function(require,module,exports){
var isNil = require('./isNil');
var isArray = require('./isArray');

module.exports = function isObject(x) {
  return !isNil(x) && typeof x === 'object' && !isArray(x);
};
},{"./isArray":119,"./isNil":125}],128:[function(require,module,exports){
module.exports = function isString(x) {
  return typeof x === 'string';
};
},{}],129:[function(require,module,exports){
var isType = require('./isType');

module.exports = function isStruct(x) {
  return isType(x) && ( x.meta.kind === 'struct' );
};
},{"./isType":130}],130:[function(require,module,exports){
var isFunction = require('./isFunction');
var isObject = require('./isObject');

module.exports = function isType(x) {
  return isFunction(x) && isObject(x.meta);
};
},{"./isFunction":121,"./isObject":127}],131:[function(require,module,exports){
var isNil = require('./isNil');
var isString = require('./isString');

module.exports = function isTypeName(name) {
  return isNil(name) || isString(name);
};
},{"./isNil":125,"./isString":128}],132:[function(require,module,exports){
var isType = require('./isType');

module.exports = function isUnion(x) {
  return isType(x) && ( x.meta.kind === 'union' );
};
},{"./isType":130}],133:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var getTypeName = require('./getTypeName');
var isIdentity = require('./isIdentity');
var create = require('./create');
var is = require('./is');
var isArray = require('./isArray');

function getDefaultName(type) {
  return 'Array<' + getTypeName(type) + '>';
}

function list(type, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(type), function () { return 'Invalid argument type ' + assert.stringify(type) + ' supplied to list(type, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to list(type, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(type);
  var typeNameCache = getTypeName(type);
  var identity = isIdentity(type); // the list is identity iif type is identity

  function List(value, path) {

    if (process.env.NODE_ENV === 'production') {
      if (identity) {
        return value; // just trust the input if elements must not be hydrated
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      path = path || [displayName];
      assert(isArray(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected an array of ' + typeNameCache + ')'; });
    }

    var idempotent = true; // will remain true if I can reutilise the input
    var ret = []; // make a temporary copy, will be discarded if idempotent remains true
    for (var i = 0, len = value.length; i < len; i++ ) {
      var actual = value[i];
      var instance = create(type, actual, ( process.env.NODE_ENV !== 'production' ? path.concat(i + ': ' + typeNameCache) : null ));
      idempotent = idempotent && ( actual === instance );
      ret.push(instance);
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(ret);
    }

    return ret;
  }

  List.meta = {
    kind: 'list',
    type: type,
    name: name,
    identity: identity
  };

  List.displayName = displayName;

  List.is = function (x) {
    return isArray(x) && x.every(function (e) {
      return is(e, type);
    });
  };

  List.update = function (instance, patch) {
    return List(assert.update(instance, patch));
  };

  return List;
}

list.getDefaultName = getDefaultName;
module.exports = list;

}).call(this,require('_process'))
},{"./assert":101,"./create":103,"./getTypeName":114,"./is":118,"./isArray":119,"./isFunction":121,"./isIdentity":122,"./isTypeName":131,"_process":1}],134:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isFunction = require('./isFunction');
var isType = require('./isType');
var Any = require('./Any');

module.exports = function match(x) {
  var type, guard, f, count;
  for (var i = 1, len = arguments.length; i < len; ) {
    type = arguments[i];
    guard = arguments[i + 1];
    f = arguments[i + 2];

    if (isFunction(f) && !isType(f)) {
      i = i + 3;
    }
    else {
      f = guard;
      guard = Any.is;
      i = i + 2;
    }

    if (process.env.NODE_ENV !== 'production') {
      count = (count || 0) + 1;
      assert(isType(type), function () { return 'Invalid type in clause #' + count; });
      assert(isFunction(guard), function () { return 'Invalid guard in clause #' + count; });
      assert(isFunction(f), function () { return 'Invalid block in clause #' + count; });
    }

    if (type.is(x) && guard(x)) {
      return f(x);
    }
  }
  assert.fail('Match error');
};

}).call(this,require('_process'))
},{"./Any":88,"./assert":101,"./isFunction":121,"./isType":130,"_process":1}],135:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var isMaybe = require('./isMaybe');
var isIdentity = require('./isIdentity');
var Any = require('./Any');
var create = require('./create');
var Nil = require('./Nil');
var forbidNewOperator = require('./forbidNewOperator');
var is = require('./is');
var getTypeName = require('./getTypeName');

function getDefaultName(type) {
  return '?' + getTypeName(type);
}

function maybe(type, name) {

  if (isMaybe(type) || type === Any || type === Nil) { // makes the combinator idempotent and handle Any, Nil
    return type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(type), function () { return 'Invalid argument type ' + assert.stringify(type) + ' supplied to maybe(type, [name]) combinator (expected a type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to maybe(type, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(type);
  var identity = isIdentity(type);

  function Maybe(value, path) {
    if (process.env.NODE_ENV !== 'production') {
      if (identity) {
        forbidNewOperator(this, Maybe);
      }
    }
    return Nil.is(value) ? value : create(type, value, path);
  }

  Maybe.meta = {
    kind: 'maybe',
    type: type,
    name: name,
    identity: identity
  };

  Maybe.displayName = displayName;

  Maybe.is = function (x) {
    return Nil.is(x) || is(x, type);
  };

  return Maybe;
}

maybe.getDefaultName = getDefaultName;
module.exports = maybe;

}).call(this,require('_process'))
},{"./Any":88,"./Nil":95,"./assert":101,"./create":103,"./forbidNewOperator":110,"./getTypeName":114,"./is":118,"./isFunction":121,"./isIdentity":122,"./isMaybe":124,"./isTypeName":131,"_process":1}],136:[function(require,module,exports){
(function (process){
var isNil = require('./isNil');
var assert = require('./assert');

// safe mixin, cannot override props unless specified
module.exports = function mixin(target, source, overwrite) {
  if (isNil(source)) { return target; }
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      if (overwrite !== true) {
        if (process.env.NODE_ENV !== 'production') {
          assert(!target.hasOwnProperty(k) || target[k] === source[k], function () { return 'Invalid call to mixin(target, source, [overwrite]): cannot overwrite property "' + k + '" of target object'; });
        }
      }
      target[k] = source[k];
    }
  }
  return target;
};
}).call(this,require('_process'))
},{"./assert":101,"./isNil":125,"_process":1}],137:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var forbidNewOperator = require('./forbidNewOperator');
var isIdentity = require('./isIdentity');
var create = require('./create');
var is = require('./is');
var getTypeName = require('./getTypeName');
var getFunctionName = require('./getFunctionName');

function getDefaultName(type, predicate) {
  return '{' + getTypeName(type) + ' | ' + getFunctionName(predicate) + '}';
}

function refinement(type, predicate, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(type), function () { return 'Invalid argument type ' + assert.stringify(type) + ' supplied to refinement(type, predicate, [name]) combinator (expected a type)'; });
    assert(isFunction(predicate), function () { return 'Invalid argument predicate supplied to refinement(type, predicate, [name]) combinator (expected a function)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to refinement(type, predicate, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(type, predicate);
  var identity = isIdentity(type);

  function Refinement(value, path) {

    if (process.env.NODE_ENV !== 'production') {
      if (identity) {
        forbidNewOperator(this, Refinement);
      }
      path = path || [displayName];
    }

    var x = create(type, value, path);

    if (process.env.NODE_ENV !== 'production') {
      assert(predicate(x), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/'); });
    }

    return x;
  }

  Refinement.meta = {
    kind: 'subtype',
    type: type,
    predicate: predicate,
    name: name,
    identity: identity
  };

  Refinement.displayName = displayName;

  Refinement.is = function (x) {
    return is(x, type) && predicate(x);
  };

  Refinement.update = function (instance, patch) {
    return Refinement(assert.update(instance, patch));
  };

  return Refinement;
}

refinement.getDefaultName = getDefaultName;
module.exports = refinement;

}).call(this,require('_process'))
},{"./assert":101,"./create":103,"./forbidNewOperator":110,"./getFunctionName":113,"./getTypeName":114,"./is":118,"./isFunction":121,"./isIdentity":122,"./isTypeName":131,"_process":1}],138:[function(require,module,exports){
var getFunctionName = require('./getFunctionName');

function replacer(key, value) {
  if (typeof value === 'function') {
    return getFunctionName(value);
  }
  return value;
}

module.exports = function stringify(x) {
  try { // handle "Converting circular structure to JSON" error
    return JSON.stringify(x, replacer, 2);
  }
  catch (e) {
    return String(x);
  }
};
},{"./getFunctionName":113}],139:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var String = require('./String');
var Function = require('./Function');
var isBoolean = require('./isBoolean');
var isObject = require('./isObject');
var isNil = require('./isNil');
var create = require('./create');
var getTypeName = require('./getTypeName');
var dict = require('./dict');
var getDefaultInterfaceName = require('./getDefaultInterfaceName');
var extend = require('./extend');

function getDefaultName(props) {
  return 'Struct' + getDefaultInterfaceName(props);
}

function extendStruct(mixins, name) {
  return extend(struct, mixins, name);
}

function getOptions(options) {
  if (!isObject(options)) {
    options = isNil(options) ? {} : { name: options };
  }
  if (!options.hasOwnProperty('strict')) {
    options.strict = struct.strict;
  }
  if (!options.hasOwnProperty('defaultProps')) {
    options.defaultProps = {};
  }
  return options;
}

function struct(props, options) {

  options = getOptions(options);
  var name = options.name;
  var strict = options.strict;
  var defaultProps = options.defaultProps;

  if (process.env.NODE_ENV !== 'production') {
    assert(dict(String, Function).is(props), function () { return 'Invalid argument props ' + assert.stringify(props) + ' supplied to struct(props, [options]) combinator (expected a dictionary String -> Type)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to struct(props, [options]) combinator (expected a string)'; });
    assert(isBoolean(strict), function () { return 'Invalid argument strict ' + assert.stringify(strict) + ' supplied to struct(props, [options]) combinator (expected a boolean)'; });
    assert(isObject(defaultProps), function () { return 'Invalid argument defaultProps ' + assert.stringify(defaultProps) + ' supplied to struct(props, [options]) combinator (expected an object)'; });
  }

  var displayName = name || getDefaultName(props);

  function Struct(value, path) {

    if (Struct.is(value)) { // implements idempotency
      return value;
    }

    if (process.env.NODE_ENV !== 'production') {
      path = path || [displayName];
      assert(isObject(value), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected an object)'; });
      // strictness
      if (strict) {
        for (k in value) {
          if (value.hasOwnProperty(k)) {
            assert(props.hasOwnProperty(k), function () { return 'Invalid additional prop "' + k + '" supplied to ' + path.join('/'); });
          }
        }
      }
    }

    if (!(this instanceof Struct)) { // `new` is optional
      return new Struct(value, path);
    }

    for (var k in props) {
      if (props.hasOwnProperty(k)) {
        var expected = props[k];
        var actual = value[k];
        // apply defaults
        if (actual === undefined) {
          actual = defaultProps[k];
        }
        this[k] = create(expected, actual, ( process.env.NODE_ENV !== 'production' ? path.concat(k + ': ' + getTypeName(expected)) : null ));
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(this);
    }

  }

  Struct.meta = {
    kind: 'struct',
    props: props,
    name: name,
    identity: false,
    strict: strict,
    defaultProps: defaultProps
  };

  Struct.displayName = displayName;

  Struct.is = function (x) {
    return x instanceof Struct;
  };

  Struct.update = function (instance, patch) {
    return new Struct(assert.update(instance, patch));
  };

  Struct.extend = function (xs, name) {
    return extendStruct([Struct].concat(xs), name);
  };

  return Struct;
}

struct.strict = false;
struct.getOptions = getOptions;
struct.getDefaultName = getDefaultName;
struct.extend = extendStruct;
module.exports = struct;

}).call(this,require('_process'))
},{"./Function":93,"./String":99,"./assert":101,"./create":103,"./dict":106,"./extend":108,"./getDefaultInterfaceName":112,"./getTypeName":114,"./isBoolean":120,"./isNil":125,"./isObject":127,"./isTypeName":131,"_process":1}],140:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var getTypeName = require('./getTypeName');
var isIdentity = require('./isIdentity');
var isArray = require('./isArray');
var create = require('./create');
var is = require('./is');

function getDefaultName(types) {
  return '[' + types.map(getTypeName).join(', ') + ']';
}

function tuple(types, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(types) && types.every(isFunction), function () { return 'Invalid argument types ' + assert.stringify(types) + ' supplied to tuple(types, [name]) combinator (expected an array of types)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to tuple(types, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(types);
  var identity = types.every(isIdentity);

  function Tuple(value, path) {

    if (process.env.NODE_ENV === 'production') {
      if (identity) {
        return value;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      path = path || [displayName];
      assert(isArray(value) && value.length === types.length, function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (expected an array of length ' + types.length + ')'; });
    }

    var idempotent = true;
    var ret = [];
    for (var i = 0, len = types.length; i < len; i++) {
      var expected = types[i];
      var actual = value[i];
      var instance = create(expected, actual, ( process.env.NODE_ENV !== 'production' ? path.concat(i + ': ' + getTypeName(expected)) : null ));
      idempotent = idempotent && ( actual === instance );
      ret.push(instance);
    }

    if (idempotent) { // implements idempotency
      ret = value;
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(ret);
    }

    return ret;
  }

  Tuple.meta = {
    kind: 'tuple',
    types: types,
    name: name,
    identity: identity
  };

  Tuple.displayName = displayName;

  Tuple.is = function (x) {
    return isArray(x) &&
      x.length === types.length &&
      types.every(function (type, i) {
        return is(x[i], type);
      });
  };

  Tuple.update = function (instance, patch) {
    return Tuple(assert.update(instance, patch));
  };

  return Tuple;
}

tuple.getDefaultName = getDefaultName;
module.exports = tuple;
}).call(this,require('_process'))
},{"./assert":101,"./create":103,"./getTypeName":114,"./is":118,"./isArray":119,"./isFunction":121,"./isIdentity":122,"./isTypeName":131,"_process":1}],141:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isTypeName = require('./isTypeName');
var isFunction = require('./isFunction');
var getTypeName = require('./getTypeName');
var isIdentity = require('./isIdentity');
var isArray = require('./isArray');
var create = require('./create');
var is = require('./is');
var forbidNewOperator = require('./forbidNewOperator');
var isUnion = require('./isUnion');
var isNil = require('./isNil');

function getDefaultName(types) {
  return types.map(getTypeName).join(' | ');
}

function union(types, name) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(types) && types.every(isFunction) && types.length >= 2, function () { return 'Invalid argument types ' + assert.stringify(types) + ' supplied to union(types, [name]) combinator (expected an array of at least 2 types)'; });
    assert(isTypeName(name), function () { return 'Invalid argument name ' + assert.stringify(name) + ' supplied to union(types, [name]) combinator (expected a string)'; });
  }

  var displayName = name || getDefaultName(types);
  var identity = types.every(isIdentity);

  function Union(value, path) {

    if (process.env.NODE_ENV === 'production') {
      if (identity) {
        return value;
      }
    }

    var type = Union.dispatch(value);
    if (!type && Union.is(value)) {
      return value;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (identity) {
        forbidNewOperator(this, Union);
      }
      path = path || [displayName];
      assert(isFunction(type), function () { return 'Invalid value ' + assert.stringify(value) + ' supplied to ' + path.join('/') + ' (no constructor returned by dispatch)'; });
      path[path.length - 1] += '(' + getTypeName(type) + ')';
    }

    return create(type, value, path);
  }

  Union.meta = {
    kind: 'union',
    types: types,
    name: name,
    identity: identity
  };

  Union.displayName = displayName;

  Union.is = function (x) {
    return types.some(function (type) {
      return is(x, type);
    });
  };

  Union.dispatch = function (x) { // default dispatch implementation
    for (var i = 0, len = types.length; i < len; i++ ) {
      var type = types[i];
      if (isUnion(type)) { // handle union of unions
        var t = type.dispatch(x);
        if (!isNil(t)) {
          return t;
        }
      }
      else if (is(x, type)) {
        return type;
      }
    }
  };

  Union.update = function (instance, patch) {
    return Union(assert.update(instance, patch));
  };

  return Union;
}

union.getDefaultName = getDefaultName;
module.exports = union;


}).call(this,require('_process'))
},{"./assert":101,"./create":103,"./forbidNewOperator":110,"./getTypeName":114,"./is":118,"./isArray":119,"./isFunction":121,"./isIdentity":122,"./isNil":125,"./isTypeName":131,"./isUnion":132,"_process":1}],142:[function(require,module,exports){
(function (process){
var assert = require('./assert');
var isObject = require('./isObject');
var isFunction = require('./isFunction');
var isArray = require('./isArray');
var isNumber = require('./isNumber');
var assign = require('./assign');

function getShallowCopy(x) {
  if (isObject(x)) {
    if (x instanceof Date || x instanceof RegExp) {
      return x;
    }
    return assign({}, x);
  }
  if (isArray(x)) {
    return x.concat();
  }
  return x;
}

function isCommand(k) {
  return update.commands.hasOwnProperty(k);
}

function getCommand(k) {
  return update.commands[k];
}

function update(instance, patch) {

  if (process.env.NODE_ENV !== 'production') {
    assert(isObject(patch), function () { return 'Invalid argument patch ' + assert.stringify(patch) + ' supplied to function update(instance, patch): expected an object containing commands'; });
  }

  var value = instance;
  var isChanged = false;
  var newValue;
  for (var k in patch) {
    if (patch.hasOwnProperty(k)) {
      if (isCommand(k)) {
        newValue = getCommand(k)(patch[k], value);
        if (newValue !== instance) {
          isChanged = true;
          value = newValue;
        } else {
          value = instance;
        }
      }
      else {
        if (value === instance) {
          value = getShallowCopy(instance);
        }
        newValue = update(value[k], patch[k]);
        isChanged = isChanged || ( newValue !== value[k] );
        value[k] = newValue;
      }
    }
  }
  return isChanged ? value : instance;
}

// built-in commands

function $apply(f, value) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isFunction(f), 'Invalid argument f supplied to immutability helper { $apply: f } (expected a function)');
  }
  return f(value);
}

function $push(elements, arr) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(elements), 'Invalid argument elements supplied to immutability helper { $push: elements } (expected an array)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $push (expected an array)');
  }
  if (elements.length > 0) {
    return arr.concat(elements);
  }
  return arr;
}

function $remove(keys, obj) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(keys), 'Invalid argument keys supplied to immutability helper { $remove: keys } (expected an array)');
    assert(isObject(obj), 'Invalid value supplied to immutability helper $remove (expected an object)');
  }
  if (keys.length > 0) {
    obj = getShallowCopy(obj);
    for (var i = 0, len = keys.length; i < len; i++ ) {
      delete obj[keys[i]];
    }
  }
  return obj;
}

function $set(value) {
  return value;
}

function $splice(splices, arr) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(splices) && splices.every(isArray), 'Invalid argument splices supplied to immutability helper { $splice: splices } (expected an array of arrays)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $splice (expected an array)');
  }
  if (splices.length > 0) {
    arr = getShallowCopy(arr);
    return splices.reduce(function (acc, splice) {
      acc.splice.apply(acc, splice);
      return acc;
    }, arr);
  }
  return arr;
}

function $swap(config, arr) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isObject(config), 'Invalid argument config supplied to immutability helper { $swap: config } (expected an object)');
    assert(isNumber(config.from), 'Invalid argument config.from supplied to immutability helper { $swap: config } (expected a number)');
    assert(isNumber(config.to), 'Invalid argument config.to supplied to immutability helper { $swap: config } (expected a number)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $swap (expected an array)');
  }
  if (config.from !== config.to) {
    arr = getShallowCopy(arr);
    var element = arr[config.to];
    arr[config.to] = arr[config.from];
    arr[config.from] = element;
  }
  return arr;
}

function $unshift(elements, arr) {
  if (process.env.NODE_ENV !== 'production') {
    assert(isArray(elements), 'Invalid argument elements supplied to immutability helper {$unshift: elements} (expected an array)');
    assert(isArray(arr), 'Invalid value supplied to immutability helper $unshift (expected an array)');
  }
  if (elements.length > 0) {
    return elements.concat(arr);
  }
  return arr;
}

function $merge(whatToMerge, value) {
  var isChanged = false;
  var result = getShallowCopy(value);
  for (var k in whatToMerge) {
    if (whatToMerge.hasOwnProperty(k)) {
      result[k] = whatToMerge[k];
      isChanged = isChanged || ( result[k] !== value[k] );
    }
  }
  return isChanged ? result : value;
}

update.commands = {
  $apply: $apply,
  $push: $push,
  $remove: $remove,
  $set: $set,
  $splice: $splice,
  $swap: $swap,
  $unshift: $unshift,
  $merge: $merge
};

module.exports = update;

}).call(this,require('_process'))
},{"./assert":101,"./assign":102,"./isArray":119,"./isFunction":121,"./isNumber":126,"./isObject":127,"_process":1}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var APP_READY = 'VDUX_APP_READY';

function appReady(data) {
  return {
    type: APP_READY,
    payload: data
  };
}

function middleware(cb) {
  return function (ctx) {
    return function (next) {
      return function (action) {
        return action.type === APP_READY ? cb(action.payload) : next(action);
      };
    };
  };
}

exports.default = middleware;
exports.appReady = appReady;
},{}],144:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _applyMiddleware = require('redux/lib/applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _virtexComponent = require('virtex-component');

var _has = require('@f/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function component(data) {
  if (typeof data === 'function') data = { name: data.name, render: data };

  var _data = data,
      controller = _data.controller,
      reducer = _data.reducer,
      actions = _data.actions,
      middleware = _data.middleware,
      _data$initialState = _data.initialState,
      initialState = _data$initialState === undefined ? {} : _data$initialState;


  return _extends({}, data, {
    propTypes: _typeof(data.propTypes) === 'object' ? _virtexComponent.t.struct(data.propTypes) : data.propTypes,
    stateTypes: data.stateTypes && _virtexComponent.t.struct(data.stateTypes),
    middleware: createMiddleware(middleware),
    initialState: typeof initialState === 'function' ? initialState : function () {
      return initialState;
    },
    actions: createActions(actions, controller, reducer),
    controller: createController(controller),
    reducer: createReducer(reducer)
  });
}

function createMiddleware(mw) {
  if (Array.isArray(mw)) return mw;else if ((typeof mw === 'undefined' ? 'undefined' : _typeof(mw)) === 'object') {
    if (typeof window !== 'undefined') return [].concat(mw.browser, mw.shared).filter(Boolean);else return [].concat(mw.node, mw.shared).filter(Boolean);
  }

  return mw;
}

function createController(fx) {
  if (!fx || typeof fx === 'function') return fx;

  return function (ctx) {
    return function (next) {
      return function (action) {
        return fx[action.type] ? ctx.dispatch(fx[action.type].apply(fx, [ctx.getThunk()].concat(_toConsumableArray(action.payload)))) : next(action);
      };
    };
  };
}

function createActions(actions, controller, reducer) {
  var list = [];

  if (actions) list.push.apply(list, actions);
  if (controller) list.push.apply(list, Object.keys(controller));
  if (reducer) list.push.apply(list, Object.keys(reducer));

  if (!list.length) return;

  return list;
}

function createReducer(reducer) {
  if (!reducer || typeof reducer === 'function') return reducer;

  return function (state, action) {
    if (state && (0, _has2.default)(action.type, reducer)) {
      var result = reducer[action.type].apply(reducer, [state].concat(_toConsumableArray(action.payload)));

      if (result) {
        return _extends({}, state, result);
      }
    }

    return state;
  };
}

exports.default = component;
},{"@f/has":15,"redux/lib/applyMiddleware":78,"virtex-component":152}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventHandler = require('@f/event-handler');

var _eventHandler2 = _interopRequireDefault(_eventHandler);

var _virtexElement = require('virtex-element');

var _virtexElement2 = _interopRequireDefault(_virtexElement);

var _foreach = require('@f/foreach');

var _foreach2 = _interopRequireDefault(_foreach);

var _evStore = require('ev-store');

var _evStore2 = _interopRequireDefault(_evStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function globalListener() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var store = void 0;

  function onCreate(_ref) {
    var path = _ref.path,
        props = _ref.props;

    store = store || (0, _evStore2.default)('function' === typeof node ? node() : node);
    listen(path, props);
  }

  function render(_ref2) {
    var props = _ref2.props,
        children = _ref2.children,
        path = _ref2.path;

    if (children.length > 1) {
      throw new Error('Window component may have only 1 child');
    }

    return children[0] || (0, _virtexElement2.default)('span', { 'class': 'global-listener' });
  }

  function onUpdate(prev, next) {
    clear(prev.path);
    listen(next.path, next.props);
  }

  function onRemove(_ref3) {
    var path = _ref3.path;

    clear(path);
  }

  function clear(path) {
    (0, _foreach2.default)(function (name) {
      delete store[name][path];
    }, store[path]);
    delete store[path];
  }

  function listen(path, props) {
    store[path] = [];
    (0, _foreach2.default)(function (fn, key) {
      var name = key.slice(2).toLowerCase();
      store[path].push(name);
      store[name] = store[name] || {};
      store[name][path] = (0, _eventHandler2.default)(fn);
    }, props);
  }

  return {
    onCreate: onCreate,
    render: render,
    onUpdate: onUpdate,
    onRemove: onRemove
  };
}

exports.default = globalListener;
},{"@f/event-handler":7,"@f/foreach":11,"ev-store":52,"virtex-element":154}],146:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var types = {
  CREATE_NODE: 'CREATE_NODE',
  UPDATE_NODE: 'UPDATE_NODE',
  REPLACE_NODE: 'REPLACE_NODE',
  REMOVE_NODE: 'REMOVE_NODE',
  INSERT_NODE: 'INSERT_NODE',
  CREATE_THUNK: 'CREATE_THUNK',
  UPDATE_THUNK: 'UPDATE_THUNK',
  DESTROY_THUNK: 'DESTROY_THUNK'
};

function vnodeAction(type) {
  return function (vnode, prev, parent) {
    return {
      type: type,
      vnode: vnode,
      prev: prev,
      parent: parent
    };
  };
}

var createThunk = vnodeAction(types.CREATE_THUNK);
var updateThunk = vnodeAction(types.UPDATE_THUNK);
var destroyThunk = vnodeAction(types.DESTROY_THUNK);
var replaceNode = vnodeAction(types.REPLACE_NODE);
var removeNode = vnodeAction(types.REMOVE_NODE);

function createNode(vnode, children, element) {
  return {
    type: types.CREATE_NODE,
    vnode: vnode,
    children: children,
    element: element
  };
}

function updateNode(vnode, prev, children) {
  return {
    type: types.UPDATE_NODE,
    vnode: vnode,
    prev: prev,
    children: children
  };
}

function insertNode(vnode, newVnode, pos) {
  return {
    type: types.INSERT_NODE,
    vnode: vnode,
    newVnode: newVnode,
    pos: pos
  };
}

exports.createNode = createNode;
exports.insertNode = insertNode;
exports.updateNode = updateNode;
exports.replaceNode = replaceNode;
exports.removeNode = removeNode;
exports.createThunk = createThunk;
exports.updateThunk = updateThunk;
exports.destroyThunk = destroyThunk;
exports.types = types;
},{}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapArray = require('@f/map-array');

var _mapArray2 = _interopRequireDefault(_mapArray);

var _util = require('./util');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(effect) {
  return function (vnode) {
    var path = arguments.length <= 1 || arguments[1] === undefined ? 'a' : arguments[1];
    var element = arguments[2];
    return createRecursive(vnode, path, element);
  };

  function createRecursive(vnode, path, element) {
    vnode.path = path;

    if ((0, _util.isThunk)(vnode)) {
      var next = effect((0, _actions.createThunk)(vnode));

      if (!next) {
        throw new Error('Component returned null/undefined. Components must return valid virtual nodes.');
      }

      return createRecursive(next, (0, _util.createPath)(next, path, 0), element);
    }

    return effect((0, _actions.createNode)(vnode, (0, _mapArray2.default)(createChild(path, element), vnode.children), element));
  }

  function createChild(path, element) {
    return element ? function (child, i) {
      return createRecursive(child, (0, _util.createPath)(child, path, i), element.childNodes[i]);
    } : function (child, i) {
      return createRecursive(child, (0, _util.createPath)(child, path, i));
    };
  }
}

exports.default = create;
},{"./actions":146,"./util":151,"@f/map-array":32}],148:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined = require('@f/is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function element(type, props) {
  if (!type) throw new Error('Virtex error: Invalid component. Did you import a component that doesn\'t exist?');

  var len = arguments.length;
  var children = [];

  for (var i = 2, j = 0; i < len; ++i) {
    j += filterFlatten(arguments[i], children, j);
  }

  var key = void 0;
  if (props && !(0, _isUndefined2.default)(props.key)) {
    key = props.key;
    if (Object.keys(props).length === 1) {
      props = undefined;
    } else {
      props.key = undefined;
    }
  }

  return {
    key: key,
    type: type,
    props: props,
    children: children
  };
}

function filterFlatten(item, arr, arrStart) {
  var added = 0;

  switch (type(item)) {
    case 'array':
      var len = item.length;
      for (var i = 0; i < len; ++i) {
        added += filterFlatten(item[i], arr, arrStart + added);
      }
      return added;
    case 'boolean':
    case 'null':
    case 'undefined':
      return 0;
    case 'string':
    case 'number':
      arr[arrStart] = element('#text', { nodeValue: item });
      break;
    default:
      arr[arrStart] = item;
      break;
  }

  return 1;
}

function type(val) {
  if (Array.isArray(val)) return 'array';
  if (val === null) return 'null';
  return typeof val === 'undefined' ? 'undefined' : _typeof(val);
}

exports.default = element;
},{"@f/is-undefined":27}],149:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDOMNode = exports.actions = exports.element = undefined;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _util = require('./util');

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function virtex(effect) {
  return {
    create: (0, _create2.default)(effect),
    update: (0, _update2.default)(effect)
  };
}

exports.default = virtex;
exports.element = _element2.default;
exports.actions = actions;
exports.findDOMNode = _util.findDOMNode;
},{"./actions":146,"./create":147,"./element":148,"./update":150,"./util":151}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _util = require('./util');

var _dift = require('dift');

var _dift2 = _interopRequireDefault(_dift);

var _foreach = require('@f/foreach');

var _foreach2 = _interopRequireDefault(_foreach);

var _create2 = require('./create');

var _create3 = _interopRequireDefault(_create2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function update(effect) {
  var create = (0, _create3.default)(effect);
  return function (prev, next) {
    var path = arguments.length <= 2 || arguments[2] === undefined ? 'a' : arguments[2];
    return updateRecursive(prev, next, path);
  };

  function updateRecursive(prev, next, path) {
    next.path = path;

    if (!(0, _util.isSameNode)(prev, next)) {
      unrenderThunks(prev);

      while ((0, _util.isThunk)(prev)) {
        prev = effect((0, _actions.updateThunk)(prev));
      }

      next = create(next, path);
      effect((0, _actions.replaceNode)(next, prev));
    } else if ((0, _util.isThunk)(next)) {
      next = effect((0, _actions.updateThunk)(next, prev));
      prev = effect((0, _actions.updateThunk)(prev));

      if (!next) {
        throw new Error('Component returned null/undefined. Components must return valid virtual nodes.');
      }

      return updateRecursive(prev, next, (0, _util.createPath)(next, path, 0));
    } else if (prev !== next) {
      (function () {

        var children = new Array(next.children.length);
        (0, _dift2.default)(prev.children, next.children, function (type, pItem, nItem, pos) {
          switch (type) {
            case _dift.UPDATE:
              children[pos] = updateRecursive(pItem, nItem, (0, _util.createPath)(nItem, path, pos));
              return;
            case _dift.CREATE:
              children[pos] = create(nItem, (0, _util.createPath)(nItem, path, pos));
              return effect((0, _actions.insertNode)(prev, children[pos], pos));
            case _dift.MOVE:
              children[pos] = updateRecursive(pItem, nItem, (0, _util.createPath)(nItem, path, pos));
              return effect((0, _actions.insertNode)(prev, children[pos], pos));
            case _dift.REMOVE:
              return effect((0, _actions.removeNode)(unrenderThunks(pItem)));
          }
        }, _util.getKey);

        effect((0, _actions.updateNode)(next, prev, children));
      })();
    }

    return next;
  }

  function unrenderThunks(vnode) {
    if ((0, _util.isThunk)(vnode)) {
      var child = unrenderThunks(effect((0, _actions.updateThunk)(vnode)));
      effect((0, _actions.destroyThunk)(vnode));
      return child;
    } else {
      (0, _foreach2.default)(unrenderThunks, vnode.children);
      return vnode;
    }
  }
}

exports.default = update;
},{"./actions":146,"./create":147,"./util":151,"@f/foreach":11,"dift":51}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = exports.findDOMNode = exports.createPath = exports.isSameNode = exports.isThunk = undefined;

var _isString = require('@f/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isUndefined = require('@f/is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isThunk(a) {
  return !(0, _isString2.default)(a.type);
}

function isSameNode(a, b) {
  return a.type === b.type && a.key === b.key;
}

function getKey(a) {
  return a.key;
}

function createPath(vnode, path, pos) {
  var key = getKey(vnode);
  var part = (0, _isUndefined2.default)(key) ? pos : key;

  return path + '.' + part;
}

function findDOMNode(vnode) {
  var p = vnode;
  while (isThunk(p)) {
    p = p.vnode;
  }return p.element;
}

exports.isThunk = isThunk;
exports.isSameNode = isSameNode;
exports.createPath = createPath;
exports.findDOMNode = findDOMNode;
exports.getKey = getKey;
},{"@f/is-string":26,"@f/is-undefined":27}],152:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.t = exports.forceUpdate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Imports
                                                                                                                                                                                                                                                                               */

var _reduxEphemeral = require('redux-ephemeral');

var _virtex = require('virtex');

var _curryTransparently = require('@f/curry-transparently');

var _curryTransparently2 = _interopRequireDefault(_curryTransparently);

var _compose = require('redux/lib/compose');

var _compose2 = _interopRequireDefault(_compose);

var _equalArray = require('@f/equal-array');

var _equalArray2 = _interopRequireDefault(_equalArray);

var _identity = require('@f/identity');

var _identity2 = _interopRequireDefault(_identity);

var _tcombValidation = require('tcomb-validation');

var _tcombValidation2 = _interopRequireDefault(_tcombValidation);

var _reduxMulti = require('redux-multi');

var _reduxMulti2 = _interopRequireDefault(_reduxMulti);

var _reduxFalsy = require('redux-falsy');

var _reduxFalsy2 = _interopRequireDefault(_reduxFalsy);

var _reduce = require('@f/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _reduxFlo = require('redux-flo');

var _reduxFlo2 = _interopRequireDefault(_reduxFlo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Constants
 */

var _actions$types = _virtex.actions.types,
    CREATE_THUNK = _actions$types.CREATE_THUNK,
    UPDATE_THUNK = _actions$types.UPDATE_THUNK,
    DESTROY_THUNK = _actions$types.DESTROY_THUNK;

var FORCE_UPDATE = 'VIRTEX_COMPONENT/FORCE_UPDATE';

/**
 * virtex-component
 */

function middleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$components = config.components,
      components = _config$components === undefined ? {} : _config$components,
      _config$dirty = config.dirty,
      dirty = _config$dirty === undefined ? {} : _config$dirty,
      _config$postRender = config.postRender,
      postRender = _config$postRender === undefined ? function () {} : _config$postRender,
      forceRerender = config.forceRerender;

  var currentContext = {};
  var forceUpdate = false;

  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        switch (action.type) {
          case CREATE_THUNK:
            {
              var _ret = function () {
                var thunk = action.vnode;
                components[thunk.path] = thunk;
                delete dirty[thunk.path];

                var component = thunk.type;
                var _component$initialSta = component.initialState,
                    initialState = _component$initialSta === undefined ? returnObject : _component$initialSta,
                    onCreate = component.onCreate,
                    afterRender = component.afterRender,
                    _component$getProps = component.getProps,
                    getProps = _component$getProps === undefined ? _identity2.default : _component$getProps;


                thunk.actions = createActions(thunk.type.actions, thunk);
                thunk.middleware = createMiddleware(thunk, function () {
                  return (0, _reduxEphemeral.lookup)(getState(), thunk.path);
                }, function () {
                  return currentContext;
                }, thunkGetter(thunk.path), forceRerender, dispatch);

                var priorState = (0, _reduxEphemeral.lookup)(getState(), thunk.path);

                thunk.context = currentContext;
                thunk.props = thunk.props || {};
                thunk.state = priorState || decorateErrors(thunk, 'initialState', function () {
                  return initialState(thunk);
                });

                validate(thunk);

                if (thunk.type.getContext && isRoot(thunk)) {
                  updateContext(thunk);
                  thunk.context = currentContext;
                }

                // If a component does not have a reducer, it does not
                // get any local state
                if ((component.initialState || component.reducer) && !priorState) {
                  dispatch((0, _reduxEphemeral.createEphemeral)(thunk.path, thunk.state));
                }

                // Call the onCreate hook
                if (onCreate) thunk.middleware(decorateErrors(thunk, 'onCreate', function () {
                  return onCreate(thunk);
                }));
                if (afterRender) postRender(function () {
                  return thunk.middleware(decorateErrors(thunk, 'afterRender', function () {
                    return afterRender(thunk, (0, _virtex.findDOMNode)(thunk));
                  }));
                });

                thunk.vnode = decorateErrors(thunk, 'render', function () {
                  return render(component, thunk);
                });
                return {
                  v: thunk.vnode
                };
              }();

              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
          case UPDATE_THUNK:
            {
              var _ret2 = function () {
                var thunk = action.vnode;
                var prev = action.prev;

                if (prev) components[thunk.path] = thunk;
                if (thunk.vnode) return {
                    v: thunk.vnode
                  };

                var component = thunk.type;
                var onUpdate = component.onUpdate,
                    afterRender = component.afterRender,
                    _component$getProps2 = component.getProps,
                    getProps = _component$getProps2 === undefined ? _identity2.default : _component$getProps2;


                thunk.props = thunk.props || {};
                delete dirty[thunk.path];
                thunk.actions = prev.actions;
                thunk.middleware = prev.middleware;
                thunk.state = (0, _reduxEphemeral.lookup)(getState(), thunk.path);

                validate(thunk);

                if (thunk.type.getContext && isRoot(thunk)) {
                  updateContext(thunk);
                }

                thunk.context = currentContext;

                if (prev.context !== thunk.context || shouldUpdate(prev, thunk)) {
                  if (onUpdate) thunk.middleware(decorateErrors(thunk, 'onUpdate', function () {
                    return onUpdate(prev, thunk);
                  }));
                  if (afterRender) postRender(function () {
                    return thunk.middleware(decorateErrors(thunk, 'afterRender', function () {
                      return afterRender(thunk, (0, _virtex.findDOMNode)(thunk));
                    }));
                  });

                  thunk.vnode = decorateErrors(thunk, 'render', function () {
                    return render(component, thunk);
                  });
                } else {
                  thunk.vnode = prev.vnode;
                }

                return {
                  v: thunk.vnode
                };
              }();

              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
          case DESTROY_THUNK:
            {
              var _ret3 = function () {
                var thunk = action.vnode;

                delete dirty[action.vnode.path];
                delete components[thunk.path];

                var _thunk$type = thunk.type,
                    onRemove = _thunk$type.onRemove,
                    reducer = _thunk$type.reducer,
                    initialState = _thunk$type.initialState,
                    _thunk$type$getProps = _thunk$type.getProps,
                    getProps = _thunk$type$getProps === undefined ? _identity2.default : _thunk$type$getProps;


                thunk.props = thunk.props || {};

                validate(thunk);

                if (onRemove) thunk.middleware(decorateErrors(thunk, 'onRemove', function () {
                  return onRemove(thunk);
                }));
                if (reducer || initialState) dispatch((0, _reduxEphemeral.destroyEphemeral)(thunk.path));

                return {
                  v: void 0
                };
              }();

              if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
            }
          case FORCE_UPDATE:
            {
              forceUpdate = true;
              return;
            }
          default:
            {
              if (isLocalAction(action)) {
                return action.$$fn.model.middleware(action);
              } else if ((0, _reduxEphemeral.isEphemeral)(action)) {
                var prevState = getState();
                var result = next(action);
                var nextState = getState();

                if (prevState !== nextState) {
                  dirty[action.meta.ephemeral.key] = true;
                }

                return result;
              }

              return next(action);
            }
        }
      };
    };
  };

  function updateContext(thunk) {
    var _thunk$type$getContex = thunk.type.getContext,
        getContext = _thunk$type$getContex === undefined ? function () {
      return {};
    } : _thunk$type$getContex;

    var nextContext = thunk.type.getContext(thunk) || {};

    if (!propsEqual(currentContext, nextContext)) {
      currentContext = nextContext;
    }

    if (forceUpdate) {
      currentContext = _extends({}, currentContext);
      forceUpdate = false;
    }
  }

  function thunkGetter(path) {
    var lastThunk = void 0;
    return function () {
      return lastThunk = components[path] || lastThunk;
    };
  }
}

function render(component, thunk) {
  return typeof component === 'function' ? component(thunk) : component.render(thunk);
}

function shouldUpdate(prev, next) {
  return (next.type.shouldUpdate || defaultShouldUpdate)(prev, next);
}

function isRoot(thunk) {
  return (/^[^\.]+$/.test(thunk.path)
  );
}

function forceUpdate() {
  return {
    type: FORCE_UPDATE
  };
}

function returnObject() {
  return {};
}

function defaultShouldUpdate(prev, next) {
  return prev.state !== next.state || !(0, _equalArray2.default)(prev.children, next.children) || !propsEqual(prev.props, next.props);
}

function createMiddleware(_ref2, getState, getContext, _getThunk, forceRerender, globalDispatch) {
  var path = _ref2.path,
      context = _ref2.context,
      actions = _ref2.actions,
      type = _ref2.type;
  var reducer = type.reducer,
      _type$middleware = type.middleware,
      middleware = _type$middleware === undefined ? [] : _type$middleware,
      controller = type.controller;

  if (!middleware.length && !controller && !reducer) return globalDispatch;

  var ctx = {
    path: path,
    actions: actions,
    getState: getState,
    getContext: getContext,
    getThunk: function getThunk() {
      return _extends({}, _getThunk(), { state: getState() });
    },
    forceRerender: forceRerender,
    dispatch: function dispatch(action) {
      return composed(action);
    }
  };

  var chain = setupDefaultMiddleware(middleware, controller).map(function (fn) {
    return fn(ctx);
  });
  var composed = _compose2.default.apply(undefined, _toConsumableArray(chain))(function (action) {
    return action.meta && action.meta.localAction ? globalDispatch((0, _reduxEphemeral.toEphemeral)(path, reducer, action)) : globalDispatch(action);
  });

  return composed;
}

function setupDefaultMiddleware(middleware, controller) {
  var mw = [transformLocal, _reduxFalsy2.default, (0, _reduxFlo2.default)(), promisifyArray, _reduxMulti2.default].concat(_toConsumableArray(middleware));
  if (controller) mw.push(controller);
  return mw;
}

function promisifyArray() {
  return function (next) {
    return function (action) {
      var result = next(action);
      return Array.isArray(result) ? Promise.all(result) : result;
    };
  };
}

var NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : 'development';

function validate(thunk) {
  if (NODE_ENV !== 'development') return;

  if (thunk.type.propTypes) {
    var res = _tcombValidation2.default.validate(thunk.props, thunk.type.propTypes);
    if (!res.isValid()) {

      res.errors.forEach(function (_ref3) {
        var message = _ref3.message;
        return console.error('<' + thunk.type.name + '/> propTypes: ' + message);
      });
    }
  }

  if (thunk.type.stateTypes) {
    var _res = _tcombValidation2.default.validate(thunk.state, thunk.type.stateTypes);
    if (!_res.isValid()) {
      _res.errors.forEach(function (_ref4) {
        var message = _ref4.message;
        return console.error('<' + thunk.type.name + '/> stateTypes: ' + message);
      });
    }
  }
}

/**
 * Local action creation/handling
 */

function propsEqual(a, b) {
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  var aLen = aKeys.length;
  var bLen = bKeys.length;

  if (aLen === bLen) {
    for (var i = 0; i < aLen; ++i) {
      var key = aKeys[i];
      var aVal = a[key];
      var bVal = b[key];

      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key) || aVal !== bVal) {
        if (!equalActions(aVal, bVal)) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}

function equalActions(a, b) {
  if (isDecoder(a) && isDecoder(b)) {
    return equalActions(a.handler, b.handler) && a.decoder === b.decoder;
  }

  if (isLocalAction(a) && isLocalAction(b)) {
    return a.$$fn.type === b.$$fn.type && a.$$fn.path === b.$$fn.path && (0, _equalArray2.default)(a.$$args, b.$$args);
  }

  return false;
}

function equalArgs(a, b) {
  var aLen = a.length;
  if (aLen !== b.length) return false;

  for (var i = 0; i < aLen; i++) {
    var aVal = a[i];
    var bVal = b[i];

    if (aVal !== bVal && !equalActions(aVal, bVal)) {
      return false;
    }
  }

  return true;
}

function createActions() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var thunk = arguments[1];

  return (0, _reduce2.default)(function (acc, action) {
    acc[action] = (0, _curryTransparently2.default)(new LocalAction(action, thunk), Infinity);
    return acc;
  }, {}, actions);
}

function isLocalAction(a) {
  return a && a.$$fn instanceof LocalAction;
}

function isDecoder(a) {
  return a && isLocalAction(a.handler) && typeof a.decoder === 'function';
}

function LocalAction(type, model) {
  this.type = type;
  this.model = model;
  this.path = model.path;
  this.$$vduxAllowedHandler = true;
}

LocalAction.prototype.isEqual = function (action) {
  return equalActions(this, action);
};

function transformLocal(ctx) {
  return function (next) {
    return function (action) {
      return isLocalAction(action) && action.$$fn.model.path === ctx.path ? next({ type: action.$$fn.type, payload: action.$$args, meta: { localAction: true } }) : next(action);
    };
  };
}

function decorateErrors(thunk, name, fn) {
  try {
    return fn();
  } catch (err) {
    err.message = '<' + (thunk.type.name || 'UnknownComponent') + '/> ' + name + ': ' + err.message;
    throw err;
  }
}

/**
 * Exports
 */

exports.default = middleware;
exports.forceUpdate = forceUpdate;
exports.t = _tcombValidation2.default;
}).call(this,require('_process'))
},{"@f/curry-transparently":4,"@f/equal-array":6,"@f/identity":17,"@f/reduce":41,"_process":1,"redux-ephemeral":75,"redux-falsy":76,"redux-flo":77,"redux-multi":153,"redux/lib/compose":81,"tcomb-validation":86,"virtex":158}],153:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Redux dispatch multiple actions
 */

function multi(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      return Array.isArray(action) ? action.filter(Boolean).map(dispatch) : next(action);
    };
  };
}

/**
 * Exports
 */

exports.default = multi;
},{}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventHandler = require('@f/event-handler');

var _eventHandler2 = _interopRequireDefault(_eventHandler);

var _virtex = require('virtex');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domEvents = require('@f/dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _evStore = require('ev-store');

var _evStore2 = _interopRequireDefault(_evStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constants
 */

var eventRegex = new RegExp('^on(?:' + _domEvents2.default.join('|') + ')$', 'i');

/**
 * virtex-element
 */

/**
 * Imports
 */

function element(tag, attrs) {
  // Only apply sugar to native elements
  if (typeof tag === 'string' && attrs) {
    for (var key in attrs) {
      attrs[key] = sugar(attrs[key], key);
    }
  }

  return _virtex.element.apply(null, arguments);
}

function sugar(value, name) {
  switch (name) {
    case 'class':
      return (0, _classnames2.default)(value);
    default:
      return eventRegex.test(name) ? bindEvent(name.slice(2).toLowerCase(), value) : value;
  }
}

function bindEvent(name, handler) {
  if (!handler) return;
  if (typeof handler === 'function' && !handler.$$fn) {
    throw new Error('vdux: illegal use of function as event handler');
  }

  var fn = (0, _eventHandler2.default)(handler);

  if (fn) {
    fn.$$vduxAllowedHandler = true;

    return function (node, _name, removing) {
      return removing ? (0, _evStore2.default)(node)[name] = null : (0, _evStore2.default)(node)[name] = fn;
    };
  }
}

/**
 * Exports
 */

exports.default = element;
},{"@f/dom-events":5,"@f/event-handler":7,"classnames":50,"ev-store":52,"virtex":158}],155:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Action types
 */

var types = {
  CREATE_NODE: 'CREATE_NODE',
  UPDATE_NODE: 'UPDATE_NODE',
  REPLACE_NODE: 'REPLACE_NODE',
  REMOVE_NODE: 'REMOVE_NODE',
  INSERT_NODE: 'INSERT_NODE',
  CREATE_THUNK: 'CREATE_THUNK',
  UPDATE_THUNK: 'UPDATE_THUNK',
  DESTROY_THUNK: 'DESTROY_THUNK'
};

/**
 * Action creators for effectful things
 */

function vnodeAction(type) {
  return function (vnode, prev) {
    return {
      type: type,
      vnode: vnode,
      prev: prev
    };
  };
}

var createThunk = vnodeAction(types.CREATE_THUNK);
var updateThunk = vnodeAction(types.UPDATE_THUNK);
var destroyThunk = vnodeAction(types.DESTROY_THUNK);
var replaceNode = vnodeAction(types.REPLACE_NODE);
var removeNode = vnodeAction(types.REMOVE_NODE);

function createNode(vnode, children, element) {
  return {
    type: types.CREATE_NODE,
    vnode: vnode,
    children: children,
    element: element
  };
}

function updateNode(vnode, prev, children) {
  return {
    type: types.UPDATE_NODE,
    vnode: vnode,
    prev: prev,
    children: children
  };
}

function insertNode(vnode, newVnode, pos) {
  return {
    type: types.INSERT_NODE,
    vnode: vnode,
    newVnode: newVnode,
    pos: pos
  };
}

/**
 * Exports
 */

exports.createNode = createNode;
exports.insertNode = insertNode;
exports.updateNode = updateNode;
exports.replaceNode = replaceNode;
exports.removeNode = removeNode;
exports.createThunk = createThunk;
exports.updateThunk = updateThunk;
exports.destroyThunk = destroyThunk;
exports.types = types;
},{}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapArray = require('@f/map-array');

var _mapArray2 = _interopRequireDefault(_mapArray);

var _util = require('./util');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create the initial document fragment
 */

function create(effect) {
  return function (vnode) {
    var path = arguments.length <= 1 || arguments[1] === undefined ? 'a' : arguments[1];
    var element = arguments[2];
    return createRecursive(vnode, path, element);
  };

  function createRecursive(vnode, path, element) {
    vnode.path = path;

    if ((0, _util.isThunk)(vnode)) {
      var next = effect((0, _actions.createThunk)(vnode));

      if (!next) {
        throw new Error('Component returned null/undefined. Components must return valid virtual nodes.');
      }

      return createRecursive(next, (0, _util.createPath)(next, path, 0), element);
    }

    return effect((0, _actions.createNode)(vnode, (0, _mapArray2.default)(createChild(path, element), vnode.children), element));
  }

  function createChild(path, element) {
    return element ? function (child, i) {
      return createRecursive(child, (0, _util.createPath)(child, path, i), element.childNodes[i]);
    } : function (child, i) {
      return createRecursive(child, (0, _util.createPath)(child, path, i));
    };
  }
}

/**
 * Exports
 */

/**
 * Imports
 */

exports.default = create;
},{"./actions":155,"./util":160,"@f/map-array":32}],157:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Imports
                                                                                                                                                                                                                                                   */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined = require('@f/is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vnode creator
 */

function element(type, props) {
  if (!type) throw new Error('Virtex error: Invalid component. Did you import a component that doesn\'t exist?');

  var len = arguments.length;
  var children = [];

  for (var i = 2, j = 0; i < len; ++i) {
    j += filterFlatten(arguments[i], children, j);
  }

  var key = void 0;
  if (props && !(0, _isUndefined2.default)(props.key)) {
    key = props.key;
    if (Object.keys(props).length === 1) {
      props = undefined;
    } else {
      props.key = undefined;
    }
  }

  return {
    key: key,
    type: type,
    props: props,
    children: children
  };
}

/**
 * Very fast in-place, single-pass filter/flatten
 * algorithm
 */

function filterFlatten(item, arr, arrStart) {
  var added = 0;

  switch (type(item)) {
    case 'array':
      var len = item.length;
      for (var i = 0; i < len; ++i) {
        added += filterFlatten(item[i], arr, arrStart + added);
      }
      return added;
    case 'boolean':
    case 'null':
    case 'undefined':
      return 0;
    case 'string':
    case 'number':
      arr[arrStart] = element('#text', { nodeValue: item });
      break;
    default:
      arr[arrStart] = item;
      break;
  }

  return 1;
}

function type(val) {
  if (Array.isArray(val)) return 'array';
  if (val === null) return 'null';
  return typeof val === 'undefined' ? 'undefined' : _typeof(val);
}

/**
 * Exports
 */

exports.default = element;
},{"@f/is-undefined":27}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findDOMNode = exports.actions = exports.element = undefined;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _util = require('./util');

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Virtex
 */

function virtex(effect) {
  return {
    create: (0, _create2.default)(effect),
    update: (0, _update2.default)(effect)
  };
}

/**
 * Exports
 */

/**
 * Imports
 */

exports.default = virtex;
exports.element = _element2.default;
exports.actions = actions;
exports.findDOMNode = _util.findDOMNode;
},{"./actions":155,"./create":156,"./element":157,"./update":159,"./util":160}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _util = require('./util');

var _dift = require('dift');

var _dift2 = _interopRequireDefault(_dift);

var _foreach = require('@f/foreach');

var _foreach2 = _interopRequireDefault(_foreach);

var _create2 = require('./create');

var _create3 = _interopRequireDefault(_create2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Diff and render two vnode trees
 */

function update(effect) {
  var create = (0, _create3.default)(effect);
  return function (prev, next) {
    var path = arguments.length <= 2 || arguments[2] === undefined ? 'a' : arguments[2];
    return updateRecursive(prev, next, path);
  };

  function updateRecursive(prev, next, path) {
    next.path = path;

    if (!(0, _util.isSameNode)(prev, next)) {
      unrenderThunks(prev);

      while ((0, _util.isThunk)(prev)) {
        prev = effect((0, _actions.updateThunk)(prev));
      }

      next = create(next, path);
      effect((0, _actions.replaceNode)(next, prev));
    } else if ((0, _util.isThunk)(next)) {
      next = effect((0, _actions.updateThunk)(next, prev));
      prev = effect((0, _actions.updateThunk)(prev));

      if (!next) {
        throw new Error('Component returned null/undefined. Components must return valid virtual nodes.');
      }

      return updateRecursive(prev, next, (0, _util.createPath)(next, path, 0));
    } else if (prev !== next) {
      (function () {
        /**
         * Diff children
         */

        var children = new Array(next.children.length);
        (0, _dift2.default)(prev.children, next.children, function (type, pItem, nItem, pos) {
          switch (type) {
            case _dift.UPDATE:
              children[pos] = updateRecursive(pItem, nItem, (0, _util.createPath)(nItem, path, pos));
              return;
            case _dift.CREATE:
              children[pos] = create(nItem, (0, _util.createPath)(nItem, path, pos));
              return effect((0, _actions.insertNode)(prev, children[pos], pos));
            case _dift.MOVE:
              children[pos] = updateRecursive(pItem, nItem, (0, _util.createPath)(nItem, path, pos));
              return effect((0, _actions.insertNode)(prev, children[pos], pos));
            case _dift.REMOVE:
              return effect((0, _actions.removeNode)(unrenderThunks(pItem)));
          }
        }, _util.getKey);

        effect((0, _actions.updateNode)(next, prev, children));
      })();
    }

    return next;
  }

  function unrenderThunks(vnode) {
    if ((0, _util.isThunk)(vnode)) {
      var child = unrenderThunks(effect((0, _actions.updateThunk)(vnode)));
      effect((0, _actions.destroyThunk)(vnode));
      return child;
    } else {
      (0, _foreach2.default)(unrenderThunks, vnode.children);
      return vnode;
    }
  }
}

/**
 * Exports
 */

/**
 * Imports
 */

exports.default = update;
},{"./actions":155,"./create":156,"./util":160,"@f/foreach":11,"dift":51}],160:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = exports.findDOMNode = exports.createPath = exports.isSameNode = exports.isThunk = undefined;

var _isString = require('@f/is-string');

var _isString2 = _interopRequireDefault(_isString);

var _isUndefined = require('@f/is-undefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utilities
 */

/**
 * Imports
 */

function isThunk(a) {
  return !(0, _isString2.default)(a.type);
}

function isSameNode(a, b) {
  return a.type === b.type && a.key === b.key;
}

function getKey(a) {
  return a.key;
}

function createPath(vnode, path, pos) {
  var key = getKey(vnode);
  var part = (0, _isUndefined2.default)(key) ? pos : key;

  return path + '.' + part;
}

function findDOMNode(vnode) {
  var p = vnode;
  while (isThunk(p)) {
    p = p.vnode;
  }return p.element;
}

/**
 * Exports
 */

exports.isThunk = isThunk;
exports.isSameNode = isSameNode;
exports.createPath = createPath;
exports.findDOMNode = findDOMNode;
exports.getKey = getKey;
},{"@f/is-string":26,"@f/is-undefined":27}],"react":[function(require,module,exports){
(function (process){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}

}).call(this,require('_process'))
},{"./cjs/react.development.js":73,"./cjs/react.production.min.js":74,"_process":1}],"redux":[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
}).call(this,require('_process'))
},{"./applyMiddleware":78,"./bindActionCreators":79,"./combineReducers":80,"./compose":81,"./createStore":82,"./utils/warning":83,"_process":1}],"vdux":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.t = exports.preventDefault = exports.stopPropagation = exports.decodeMouse = exports.decodeFiles = exports.decodeValue = exports.decodeNode = exports.decodeRaw = exports.decoder = exports.findDOMNode = exports.appReady = exports.Body = exports.Window = exports.Document = exports.element = exports.component = undefined;

var _globalListener = require('./global-listener');

var _globalListener2 = _interopRequireDefault(_globalListener);

var _virtexElement = require('virtex-element');

var _virtexElement2 = _interopRequireDefault(_virtexElement);

var _appReady = require('./app-ready');

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _getValue = require('@f/get-value');

var _getValue2 = _interopRequireDefault(_getValue);

var _virtex = require('virtex');

var _virtexComponent = require('virtex-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Window = (0, _globalListener2.default)(typeof window === 'undefined' ? {} : window);
var Body = (0, _globalListener2.default)(function () {
  return document.body;
});
var Document = (0, _globalListener2.default)(typeof document === 'undefined' ? {} : document);

var decoder = function decoder(_decoder) {
  return function (handler) {
    return { handler: handler, decoder: _decoder };
  };
};
var decodeRaw = decoder(function (e) {
  return e;
});
var decodeNode = decoder(function (e) {
  return e.target;
});
var decodeValue = decoder(function (e) {
  return (0, _getValue2.default)(e.target);
});
var decodeFiles = decoder(function (e) {
  return e._rawEvent.target.files;
});
var decodeMouse = decoder(function (_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  return { clientX: clientX, clientY: clientY };
});

var stopPropagation = { stopPropagation: true };
var preventDefault = { preventDefault: true };

exports.component = _component2.default;
exports.element = _virtexElement2.default;
exports.Document = Document;
exports.Window = Window;
exports.Body = Body;
exports.appReady = _appReady.appReady;
exports.findDOMNode = _virtex.findDOMNode;
exports.decoder = decoder;
exports.decodeRaw = decodeRaw;
exports.decodeNode = decodeNode;
exports.decodeValue = decodeValue;
exports.decodeFiles = decodeFiles;
exports.decodeMouse = decodeMouse;
exports.stopPropagation = stopPropagation;
exports.preventDefault = preventDefault;
exports.t = _virtexComponent.t;
},{"./app-ready":143,"./component":144,"./global-listener":145,"@f/get-value":14,"virtex":149,"virtex-component":152,"virtex-element":154}]},{},[]);
