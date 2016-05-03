'use strict';

/**
 * Test `pg-sql-tag`.
 */

import Promise from 'bluebird';
import pg from 'pg';
import sql from 'sql-tag';
import tag from '../src';

// Promisify the pg client.
Promise.promisifyAll(pg.Client.prototype);

// Install our monkey patch.
tag(pg);

describe('pg-sql-tag', () => {
  const client = new pg.Client(`postgres://postgres:@postgres/pg-sql-tag`);
  const db = client.connectAsync()
    .then(() => client.queryAsync('DROP TABLE IF EXISTS foo'))
    .then(() => client.queryAsync('CREATE TABLE foo ( bar char(1), biz char(1) )'))
    .then(() => client.queryAsync(`INSERT INTO foo VALUES ('z', 'x')`));

  describe('normal sql queries', () => {
    it('should continue supporting a sql `query` string', () => {
      return db.then(() => client.queryAsync(`SELECT * FROM foo WHERE bar = 'z' AND biz = 'x'`))
        .then(result => {
          result.rows[0].bar.should.equal('z');
          result.rows[0].biz.should.equal('x');
        });
    });
  });

  describe('tagged sql queries', () => {
    it('should supported tagged sql queries', () => {
      return db.then(() => client.queryAsync(sql`SELECT * FROM foo WHERE bar = ${'z'} AND biz = ${'x'}`))
        .then(result => {
          result.rows[0].bar.should.equal('z');
          result.rows[0].biz.should.equal('x');
        });
    });
  });
});
