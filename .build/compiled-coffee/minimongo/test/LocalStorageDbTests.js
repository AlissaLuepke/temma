(function() {
  var LocalStorageDb, assert, chai, db_caching, db_queries, _;

  chai = require('chai');

  assert = chai.assert;

  LocalStorageDb = require("../src/LocalStorageDb");

  db_queries = require("./db_queries");

  db_caching = require("./db_caching");

  _ = require('lodash');

  describe('LocalStorageDb', function() {
    before(function(done) {
      var _this = this;
      this.reset = function(done) {
        _this.db = new LocalStorageDb();
        _this.db.addCollection("scratch");
        _this.col = _this.db.scratch;
        return done();
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

  describe('LocalStorageDb with local storage', function() {
    before(function() {
      return this.db = new LocalStorageDb({
        namespace: "db.scratch"
      });
    });
    beforeEach(function(done) {
      this.db.removeCollection('scratch');
      this.db.addCollection('scratch');
      return done();
    });
    it("retains items", function(done) {
      return this.db.scratch.upsert({
        _id: "1",
        a: "Alice"
      }, function() {
        var db2;
        db2 = new LocalStorageDb({
          namespace: "db.scratch"
        });
        db2.addCollection('scratch');
        return db2.scratch.find({}).fetch(function(results) {
          assert.equal(results[0].a, "Alice");
          return done();
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
          return new LocalStorageDb({
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
    return it("retains removes", function(done) {
      var _this = this;
      return this.db.scratch.seed({
        _id: "1",
        a: "Alice"
      }, function() {
        return _this.db.scratch.remove("1", function() {
          var db2;
          db2 = new LocalStorageDb({
            namespace: "db.scratch"
          });
          db2.addCollection('scratch');
          return db2.scratch.pendingRemoves(function(removes) {
            assert.deepEqual(removes, ["1"]);
            return done();
          });
        });
      });
    });
  });

  describe('LocalStorageDb without local storage', function() {
    before(function() {
      return this.db = new LocalStorageDb();
    });
    beforeEach(function(done) {
      this.db.removeCollection('scratch');
      this.db.addCollection('scratch');
      return done();
    });
    it("does not retain items", function(done) {
      return this.db.scratch.upsert({
        _id: "1",
        a: "Alice"
      }, function() {
        var db2;
        db2 = new LocalStorageDb();
        db2.addCollection('scratch');
        return db2.scratch.find({}).fetch(function(results) {
          assert.equal(results.length, 0);
          return done();
        });
      });
    });
    it("does not retain upserts", function(done) {
      return this.db.scratch.upsert({
        _id: "1",
        a: "Alice"
      }, function() {
        var db2;
        db2 = new LocalStorageDb();
        db2.addCollection('scratch');
        return db2.scratch.find({}).fetch(function(results) {
          return db2.scratch.pendingUpserts(function(upserts) {
            assert.equal(results.length, 0);
            return done();
          });
        });
      });
    });
    return it("does not retain removes", function(done) {
      var _this = this;
      return this.db.scratch.seed({
        _id: "1",
        a: "Alice"
      }, function() {
        return _this.db.scratch.remove("1", function() {
          var db2;
          db2 = new LocalStorageDb();
          db2.addCollection('scratch');
          return db2.scratch.pendingRemoves(function(removes) {
            assert.equal(removes.length, 0);
            return done();
          });
        });
      });
    });
  });

}).call(this);
