(function() {
  var MemoryDb, assert, chai, db_caching, db_queries, _;

  chai = require('chai');

  assert = chai.assert;

  MemoryDb = require("../src/MemoryDb");

  db_queries = require("./db_queries");

  db_caching = require("./db_caching");

  _ = require('lodash');

  describe('MemoryDb', function() {
    before(function(done) {
      var _this = this;
      this.reset = function(done) {
        _this.db = new MemoryDb();
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
