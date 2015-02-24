
/**
 * Test `pg-sql-tag`.
 */

var pg = require('pg');

require('..')(pg);
require('thenify-all')(pg.Client.prototype, pg.Client.prototype, ['connect', 'query']);

describe('pg-sql-tag', function() {
  // psql -d postgres
  // create role postgres with login
  // createdb pg-sql-tag --owner postgres
  var client = new pg.Client('postgres://postgres:@localhost/pg-sql-tag');
  var db = client.connect()
    .then(function() {
      return client.query('DROP TABLE IF EXISTS foo');
    })
    .then(function() {
      return client.query('CREATE TABLE foo ( bar char(1), biz char(1) )');
    })
    .then(function() {
      return client.query('INSERT INTO foo VALUES (\'z\', \'x\')');
    });

  describe('normal sql queries', function() {
    it('should continue supporting a sql `query` string', function() {
      return db.then(function() {
        return client.query('SELECT * FROM foo WHERE bar = \'z\' AND biz = \'x\'');
      }).then(function(result) {
        result.rows[0].bar.should.equal('z');
        result.rows[0].biz.should.equal('x');
      });
    });
  });

  describe('tagged sql queries', function() {
    it('should supported tagged sql queries', function() {
      return db.then(function() {
        return client.query({ query: 'SELECT * FROM foo WHERE bar = ? AND biz = ?', values: ['z', 'x'] });
      }).then(function(result) {
        result.rows[0].bar.should.equal('z');
        result.rows[0].biz.should.equal('x');
      });
    });
  });
});
