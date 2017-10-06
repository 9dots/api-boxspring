
# filter-array

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Functional, data-last array filter. Should also be faster than the native Array.prototype.filter

## Installation

    $ npm install @f/filter-array

## Usage

```js
var filterArray = require('@f/filter-array')

filterArray(isEven, [1,2,3,4,5]) // -> [2, 4]

function isEven (n) {
  return n % 2 === 0
}
```

## API

### filterArray(fn, arr)

- `fn` - The predicate function that decides whether the value is kept. Receives `(value, index)` for each value in the array.
- `arr` - The array to filter

**Returns:** A new array containing only the values for which `fn(value, index)` returned truthy.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/filter-array.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/filter-array
[git-image]: https://img.shields.io/github/tag/micro-js/filter-array.svg
[git-url]: https://github.com/micro-js/filter-array
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/filter-array.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/filter-array
