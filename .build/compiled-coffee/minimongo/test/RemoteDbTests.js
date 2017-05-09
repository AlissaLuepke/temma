(function() {
  var RemoteDb, assert, db_queries, _;

  assert = require('chai').assert;

  RemoteDb = require("../src/RemoteDb");

  db_queries = require("./db_queries");

  _ = require('lodash');

  exports.runTests = function() {
    return describe('RemoteDb', function() {
      this.timeout(10000);
      describe("passes queries", function() {
        return db_queries.call(this);
      });
      return describe("merging", function() {
        beforeEach(function(done) {
          return this.reset(done);
        });
        it("merges changes with base specified", function(done) {
          var base,
            _this = this;
          base = {
            _id: "1",
            a: "1",
            b: 1
          };
          return this.col.upsert(base, function(baseDoc) {
            var change1, change2;
            change1 = _.cloneDeep(baseDoc);
            change1.a = "2";
            change2 = _.cloneDeep(baseDoc);
            change2.b = 2;
            return _this.col.upsert(change1, base, function(doc1) {
              assert.equal(doc1.a, "2");
              return _this.col.upsert(change2, base, function(doc2) {
                assert.equal(doc2.a, "2", "Should merge returned document");
                assert.equal(doc2.b, 2, "Should merge returned document");
                return _this.col.findOne({
                  _id: "1"
                }, function(doc3) {
                  assert.equal(doc2.a, "2", "Should merge documents");
                  assert.equal(doc2.b, 2, "Should merge documents");
                  return done();
                });
              });
            });
          });
        });
        return it("overrides changes with no base specified", function(done) {
          var base,
            _this = this;
          base = {
            _id: "1",
            a: "1",
            b: 1
          };
          return this.col.upsert(base, function(baseDoc) {
            var change1, change2;
            change1 = _.cloneDeep(baseDoc);
            change1.a = "2";
            change2 = _.cloneDeep(baseDoc);
            change2.b = 2;
            return _this.col.upsert(change1, base, function(doc1) {
              assert.equal(doc1.a, "2");
              return _this.col.upsert(change2, null, function(doc2) {
                assert.equal(doc2.a, "1", "Should not merge returned document");
                assert.equal(doc2.b, 2, "Should keep new value");
                return done();
              });
            });
          });
        });
      });
    });
  };

}).call(this);
