(function() {
  var OldWebSQLDb, WebSQLDb, assert, async, chai, db_caching, db_queries, error, _;

  chai = require('chai');

  assert = chai.assert;

  WebSQLDb = require("../src/WebSQLDb");

  db_queries = require("./db_queries");

  db_caching = require("./db_caching");

  _ = require('lodash');

  async = require('async');

  OldWebSQLDb = require('./v2/WebSQLDb');

  error = function(err) {
    console.log(err);
    return assert.fail(JSON.stringify(err));
  };

  describe('WebSQLDb', function() {
    this.timeout(5000);
    before(function(done) {
      var _this = this;
      this.reset = function(done) {
        return new WebSQLDb({
          namespace: "db.scratch"
        }, function(db) {
          _this.db = db;
          return _this.db.removeCollection('scratch', function() {
            return _this.db.addCollection('scratch', function() {
              _this.col = _this.db.scratch;
              return done();
            });
          });
        });
      };
      return this.reset(done);
    });
    describe("passes queries", function() {
      return db_queries.call(this);
    });
    return describe("passes caching", function() {
      return db_caching.call(this);
    });
  });

  describe('WebSQLDb storage', function() {
    beforeEach(function(done) {
      var _this = this;
      return new WebSQLDb({
        namespace: "db.scratch"
      }, function(db) {
        _this.db = db;
        return _this.db.removeCollection('scratch', function() {
          return _this.db.addCollection('scratch', function() {
            return done();
          });
        });
      });
    });
    it("retains items", function(done) {
      return this.db.scratch.upsert({
        _id: "1",
        a: "Alice"
      }, function() {
        return new WebSQLDb({
          namespace: "db.scratch"
        }, function(db2) {
          return db2.addCollection('scratch', function() {
            return db2.scratch.find({}).fetch(function(results) {
              assert.equal(results[0].a, "Alice");
              return done();
            });
          });
        });
      });
    });
    it("retains upserts", function(done) {
      var _this = this;
      return this.db.scratch.cacheOne({
        _id: "1",
        a: "Alice"
      }, function() {
        return _this.db.scratch.upsert({
          _id: "1",
          a: "Bob"
        }, function() {
          return new WebSQLDb({
            namespace: "db.scratch"
          }, function(db2) {
            return db2.addCollection('scratch', function() {
              return db2.scratch.find({}).fetch(function(results) {
                assert.deepEqual(results, [
                  {
                    _id: "1",
                    a: "Bob"
                  }
                ]);
                return db2.scratch.pendingUpserts(function(upserts) {
                  assert.equal(upserts.length, 1);
                  assert.deepEqual(upserts[0].doc, {
                    _id: "1",
                    a: "Bob"
                  });
                  assert.deepEqual(upserts[0].base, {
                    _id: "1",
                    a: "Alice"
                  });
                  return done();
                });
              });
            });
          });
        });
      });
    });
    it("retains removes", function(done) {
      var _this = this;
      return this.db.scratch.seed({
        _id: "1",
        a: "Alice"
      }, function() {
        return _this.db.scratch.remove("1", function() {
          return new WebSQLDb({
            namespace: "db.scratch"
          }, function(db2) {
            return db2.addCollection('scratch', function() {
              return db2.scratch.pendingRemoves(function(removes) {
                assert.deepEqual(removes, ["1"]);
                return done();
              });
            });
          });
        });
      });
    });
    return it("inserts 1000 documents at once", function(done) {
      var docs, i, _i,
        _this = this;
      this.timeout(30000);
      docs = [];
      for (i = _i = 0; _i < 1000; i = ++_i) {
        docs.push({
          lat: i,
          lng: i + 1,
          timestamp: new Date().toISOString()
        });
      }
      return this.db.scratch.upsert(docs, function() {
        return _this.db.scratch.find({}).fetch(function(results) {
          assert.equal(results.length, 1000);
          return done();
        }, error);
      }, error);
    });
  });

}).call(this);
