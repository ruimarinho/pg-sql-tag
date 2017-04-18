'use strict';

/**
 * Export `pg-sql-tag`.
 */

export default function(pg) {
  pg.Client.prototype.query = (fn => {
    return function({ query, values }, ...args) {
      if (query && values) {
        values = Object.keys(values).map(key => values[key]);

        return fn.apply(this, [{ text: query, values }].concat(args));
      }

      return fn.apply(this, arguments);
    };
  })(pg.Client.prototype.query);
}
