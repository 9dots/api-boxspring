
# filter

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Filter for various data types.

## Installation

    $ npm install @f/filter

## Usage

```js
var filter = require('@f/filter')

filter(isEven, [1, 2, 3, 4, 5]) // -> [2, 4]
filter(isEven, {a: 1, b: 2, c: 3, d: 4, e: 5}) // -> {b: 2, d: 4}

function isEven (n) {
  return n % 2 === 0
}
```

## API

### filter(fn, val)

- `fn` - Predicate function. Called like `fn(val, key)` returns a boolean indicating whether to keep that key/value pair.
- `val` - A container of some kind (object or array at the moment)

**Returns:** A new container of the same type as `val` containing only the key/value pairs that `fn(val, key)` returned truthy for.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/filter.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/filter
[git-image]: https://img.shields.io/github/tag/micro-js/filter.svg
[git-url]: https://github.com/micro-js/filter
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/filter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/filter
