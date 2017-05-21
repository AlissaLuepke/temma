(function() {
  var MemoryDb, assert, chai, db_caching, db_queries, utils, _;

  chai = require('chai');

  assert = chai.assert;

  utils = require("../src/utils");

  db_queries = require("./db_queries");

  db_caching = require("./db_caching");

  _ = require('lodash');

  MemoryDb = require('../src/MemoryDb');

  describe('autoselected Local Db', function() {
    before(function(done) {
      var _this = this;
      utils.autoselectLocalDb({
        namespace: "db.scratch"
      }, function(db) {
        _this.db = db;
        return _this.db.addCollection('scratch', function() {
          return done();
        });
      });
      return this.reset = function(done) {
        return _this.db.removeCollection('scratch', function() {
          return _this.db.addCollection('scratch', function() {
            _this.col = _this.db.scratch;
            return done();
          });
        });
      };
    });
    describe("passes queries", function() {
      return db_queries.call(this);
    });
    return describe("passes caching", function() {
      return db_caching.call(this);
    });
  });

  describe('migrated Local Db', function() {
    beforeEach(function(done) {
      this.from = new MemoryDb();
      this.to = new MemoryDb();
      this.from.addCollection("a");
      this.to.addCollection("a");
      return done();
    });
    it('migrates upserts', function(done) {
      var _this = this;
      return this.from.a.upsert({
        _id: "1",
        x: 1
      }, function() {
        return utils.migrateLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingUpserts(function(upserts) {
            assert.deepEqual(upserts, [
              {
                doc: {
                  _id: "1",
                  x: 1
                },
                base: null
              }
            ]);
            _this.from.a.pendingUpserts(function(upserts2) {
              return assert.equal(upserts2.length, 0);
            });
            return done();
          });
        });
      });
    });
    it('migrates removes', function(done) {
      var _this = this;
      return this.from.a.remove("1", function() {
        return utils.migrateLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingRemoves(function(removes) {
            assert.deepEqual(removes, ["1"]);
            return done();
          });
        });
      });
    });
    it('does not migrate cached', function(done) {
      var _this = this;
      return this.from.a.cacheOne({
        _id: "1",
        x: 1
      }, function() {
        return utils.migrateLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingUpserts(function(upserts) {
            assert.equal(upserts.length, 0);
            return done();
          });
        });
      });
    });
    return it('only migrates collections present in both', function(done) {
      var _this = this;
      this.from.addCollection("b");
      return this.from.b.upsert({
        _id: "1",
        x: 1
      }, function() {
        return utils.migrateLocalDb(_this.from, _this.to, function() {
          assert(!_this.to.b);
          return done();
        });
      });
    });
  });

  describe('cloneLocalDb', function() {
    beforeEach(function(done) {
      this.from = new MemoryDb();
      this.to = new MemoryDb();
      this.from.addCollection("a");
      return done();
    });
    it('clones upserts', function(done) {
      var _this = this;
      return this.from.a.upsert({
        _id: "1",
        x: 1
      }, function() {
        return utils.cloneLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingUpserts(function(upserts) {
            assert.deepEqual(upserts, [
              {
                doc: {
                  _id: "1",
                  x: 1
                },
                base: null
              }
            ]);
            _this.from.a.pendingUpserts(function(upserts2) {
              return assert.equal(upserts2.length, 1);
            });
            return done();
          });
        });
      });
    });
    it('clones upserts with bases', function(done) {
      var _this = this;
      return this.from.a.upsert({
        _id: "1",
        x: 1
      }, {
        _id: "1",
        x: -1
      }, function() {
        return utils.cloneLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingUpserts(function(upserts) {
            assert.deepEqual(upserts, [
              {
                doc: {
                  _id: "1",
                  x: 1
                },
                base: {
                  _id: "1",
                  x: -1
                }
              }
            ]);
            _this.from.a.pendingUpserts(function(upserts2) {
              return assert.equal(upserts2.length, 1);
            });
            return done();
          });
        });
      });
    });
    it('clones removes', function(done) {
      var _this = this;
      return this.from.a.remove("1", function() {
        return utils.cloneLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingRemoves(function(removes) {
            assert.deepEqual(removes, ["1"]);
            return _this.from.a.pendingRemoves(function(removes) {
              assert.deepEqual(removes, ["1"]);
              return done();
            });
          });
        });
      });
    });
    return it('clones cached', function(done) {
      var _this = this;
      return this.from.a.cacheOne({
        _id: "1",
        x: 1
      }, function() {
        return utils.cloneLocalDb(_this.from, _this.to, function() {
          return _this.to.a.pendingUpserts(function(upserts) {
            assert.equal(upserts.length, 0);
            return _this.to.a.find({}).fetch(function(items) {
              assert.deepEqual(items[0], {
                _id: "1",
                x: 1
              });
              return done();
            });
          });
        });
      });
    });
  });

}).call(this);
