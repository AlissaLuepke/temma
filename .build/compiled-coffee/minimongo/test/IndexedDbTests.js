(function() {
  var IndexedDb, assert, chai, db_caching, db_queries, _;

  chai = require('chai');

  assert = chai.assert;

  IndexedDb = require("../src/IndexedDb");

  db_queries = require("./db_queries");

  db_caching = require("./db_caching");

  _ = require('lodash');

  describe('IndexedDb', function() {
    before(function(done) {
      var _this = this;
      this.reset = function(done) {
        return _this.db = new IndexedDb({
          namespace: "db.scratch"
        }, function() {
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

  describe('IndexedDb storage', function() {
    beforeEach(function(done) {
      var _this = this;
      return this.db = new IndexedDb({
        namespace: "db.scratch"
      }, function() {
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
        var db2;
        return db2 = new IndexedDb({
          namespace: "db.scratch"
        }, function() {
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
          var db2;
          return db2 = new IndexedDb({
            namespace: "db.scratch"
          }, function() {
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
    return it("retains removes", function(done) {
      var _this = this;
      return this.db.scratch.seed({
        _id: "1",
        a: "Alice"
      }, function() {
        return _this.db.scratch.remove("1", function() {
          var db2;
          return db2 = new IndexedDb({
            namespace: "db.scratch"
          }, function() {
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
  });

}).call(this);
