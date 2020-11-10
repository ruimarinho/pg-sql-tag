
---

⚠️ This module has been deprecated in favour of [sql-tag@^1.0.0](https://github.com/seegno/sql-tag), which is now able to handle `pg` queries without requiring any modification to `pg.query`.

---

# pg-sql-tag

A [pg](https://github.com/brianc/node-postgres) plugin for [sql-tag](https://www.npmjs.com/package/sql-tag), combinining the elegance of tagged sql query strings with the convenience and safety of `pg.query`.

## Status

[![maintenance status][maintenance-image]]()
[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

## Installation

Install the package via `npm`:

```bash
$ npm install pg-sql-tag
```

## Usage

```js
var pg = require('pg');
var sql = require('sql-tag');

// Wrap `pg` in order to support queries
// generated by the `sql` tag.
require('pg-sql-tag')(pg);

// Use expressions inside placeholders to build elegant
// and readable queries.
pg.query(sql`SELECT * FROM "Foo" WHERE id = ${ 1 * 2 }`, function(err, result) {
  if (err) {
    throw err;
  }

  console.log(result);
});

// You can even use function calls inside expressions.
var obj = { foo: 'bar' }

pg.query(sql`UPDATE "Foo" SET biz = ${ JSON.stringify(obj) }`, function(err, result) {
  if (err) {
    throw err;
  }

  console.log(result);
});
```

## Tests

```
$ npm test
```

## License

MIT

[maintenance-image]: https://img.shields.io/maintenance/no/2016.svg?style=flat-square
[npm-image]: https://img.shields.io/npm/v/pg-sql-tag.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/pg-sql-tag
[travis-image]: https://img.shields.io/travis/seegno/pg-sql-tag/v0.0.2.svg?style=flat-square
[travis-url]: https://travis-ci.org/seegno/pg-sql-tag
