(function() {
  var MemoryDb, ReplicatingDb, assert, async, chai, db_caching, db_queries, error, _;

  chai = require('chai');

  assert = chai.assert;

  ReplicatingDb = require("../src/ReplicatingDb");

  MemoryDb = require("../src/MemoryDb");

  db_queries = require("./db_queries");

  db_caching = require("./db_caching");

  _ = require('lodash');

  async = require('async');

  error = function(err) {
    console.log(err);
    return assert.fail(JSON.stringify(err));
  };

  describe('ReplicatingDb', function() {
    before(function(done) {
      var _this = this;
      this.reset = function(done) {
        _this.masterDb = new MemoryDb();
        _this.replicaDb = new MemoryDb();
        _this.masterDb.addCollection("scratch");
        _this.replicaDb.addCollection("scratch");
        _this.db = new ReplicatingDb(_this.masterDb, _this.replicaDb);
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

}).call(this);
