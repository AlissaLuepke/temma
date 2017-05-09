(function() {
  var assert, chai, _;

  _ = require('lodash');

  chai = require('chai');

  assert = chai.assert;

  module.exports = function() {
    return describe("local database", function() {
      beforeEach(function(done) {
        return this.reset(done);
      });
      it('caches row', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results[0].a, 'apple');
            return done();
          });
        });
      });
      it('caches rows', function(done) {
        var rows,
          _this = this;
        rows = [
          {
            _id: "1",
            a: 'apple'
          }, {
            _id: "2",
            a: 'banana'
          }, {
            _id: "3",
            a: 'orange'
          }, {
            _id: "4",
            a: 'kiwi'
          }
        ];
        return this.col.cache(rows, {}, {}, function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results.length, 4);
            return done();
          });
        });
      });
      it('caches zero rows', function(done) {
        var rows,
          _this = this;
        rows = [];
        return this.col.cache(rows, {}, {}, function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results.length, 0);
            return done();
          });
        });
      });
      it('cache overwrite existing', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'banana'
            }
          ], {}, {}, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      it('cache with same _rev overwrite existing', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple',
            _rev: 2
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'banana',
              _rev: 2
            }
          ], {}, {}, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      it('cache with greater _rev overwrite existing', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple',
            _rev: 1
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'banana',
              _rev: 2
            }
          ], {}, {}, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      it('cache with lesser _rev does not overwrite existing', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple',
            _rev: 2
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'banana',
              _rev: 1
            }
          ], {}, {}, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'apple');
              return done();
            });
          });
        });
      });
      it("cache doesn't overwrite upsert", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "1",
          a: 'apple'
        }, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'banana'
            }
          ], {}, {}, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'apple');
              return done();
            });
          });
        });
      });
      it("cache doesn't overwrite remove", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'delete'
          }
        ], {}, {}, function() {
          return _this.col.remove("1", function() {
            return _this.col.cache([
              {
                _id: "1",
                a: 'banana'
              }
            ], {}, {}, function() {
              return _this.col.find({}).fetch(function(results) {
                assert.equal(results.length, 0);
                return done();
              });
            });
          });
        });
      });
      it("cache removes missing unsorted", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'a'
            }, {
              _id: "3",
              a: 'c'
            }
          ], {}, {}, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results.length, 2);
              return done();
            });
          });
        });
      });
      it("handles implicitly sorted ($near) with limit");
      it("cache removes missing filtered", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'a'
            }
          ], {
            _id: {
              $lt: "3"
            }
          }, {}, function() {
            return _this.col.find({}, {
              sort: ['_id']
            }).fetch(function(results) {
              assert.deepEqual(_.pluck(results, '_id'), ["1", "3"]);
              return done();
            });
          });
        });
      });
      it("cache removes missing sorted limited", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }
        ], {}, {}, function() {
          return _this.col.cache([
            {
              _id: "1",
              a: 'a'
            }
          ], {}, {
            sort: ['_id'],
            limit: 2
          }, function() {
            return _this.col.find({}, {
              sort: ['_id']
            }).fetch(function(results) {
              assert.deepEqual(_.pluck(results, '_id'), ["1", "3"]);
              return done();
            });
          });
        });
      });
      it("cache does not remove missing sorted limited past end", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }, {
            _id: "4",
            a: 'd'
          }
        ], {}, {}, function() {
          return _this.col.remove("2", function() {
            return _this.col.cache([
              {
                _id: "1",
                a: 'a'
              }, {
                _id: "2",
                a: 'b'
              }
            ], {}, {
              sort: ['_id'],
              limit: 2
            }, function() {
              return _this.col.find({}, {
                sort: ['_id']
              }).fetch(function(results) {
                assert.deepEqual(_.pluck(results, '_id'), ["1", "3", "4"]);
                return done();
              });
            });
          });
        });
      });
      it("uncache removes matching", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }
        ], {}, {}, function() {
          return _this.col.uncache({
            a: 'b'
          }, function() {
            return _this.col.find({}, {
              sort: ['_id']
            }).fetch(function(results) {
              assert.deepEqual(_.pluck(results, '_id'), ["1", "3"]);
              return done();
            });
          });
        });
      });
      it("uncache does not remove upserts", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }
        ], {}, {}, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'b'
          }, function() {
            return _this.col.uncache({
              a: 'b'
            }, function() {
              return _this.col.find({}, {
                sort: ['_id']
              }).fetch(function(results) {
                assert.deepEqual(_.pluck(results, '_id'), ["1", "2", "3"]);
                return done();
              });
            });
          });
        });
      });
      it("uncache does not remove removes", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'a'
          }, {
            _id: "2",
            a: 'b'
          }, {
            _id: "3",
            a: 'c'
          }
        ], {}, {}, function() {
          return _this.col.remove("2", function() {
            return _this.col.uncache({
              a: 'b'
            }, function() {
              return _this.col.find({}, {
                sort: ['_id']
              }).fetch(function(results) {
                assert.deepEqual(_.pluck(results, '_id'), ["1", "3"]);
                return _this.col.pendingRemoves(function(results) {
                  assert.deepEqual(results, ["2"]);
                  return done();
                });
              });
            });
          });
        });
      });
      it("returns pending upserts", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'banana'
          }, function() {
            return _this.col.pendingUpserts(function(results) {
              assert.equal(results.length, 1);
              assert.equal(results[0].doc.a, 'banana');
              assert.isNull(results[0].base);
              return done();
            });
          });
        });
      });
      it("resolves pending upserts", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "2",
          a: 'banana'
        }, function() {
          return _this.col.resolveUpserts([
            {
              doc: {
                _id: "2",
                a: 'banana'
              },
              base: null
            }
          ], function() {
            return _this.col.pendingUpserts(function(results) {
              assert.equal(results.length, 0);
              return done();
            });
          });
        });
      });
      it("sets base of upserts", function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "2",
          a: 'apple'
        }, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'banana'
          }, function() {
            return _this.col.pendingUpserts(function(results) {
              assert.equal(results.length, 1);
              assert.equal(results[0].doc.a, 'banana');
              assert.equal(results[0].base.a, 'apple');
              return done();
            });
          });
        });
      });
      it("keeps base on subsequent upserts", function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "2",
          a: 'apple'
        }, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'banana'
          }, function() {
            return _this.col.upsert({
              _id: "2",
              a: 'orange'
            }, function() {
              return _this.col.pendingUpserts(function(results) {
                assert.equal(results.length, 1);
                assert.equal(results[0].doc.a, 'orange');
                assert.equal(results[0].base.a, 'apple');
                return done();
              });
            });
          });
        });
      });
      it("allows setting of upsert base", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "2",
          a: 'banana'
        }, {
          _id: "2",
          a: 'apple'
        }, function() {
          return _this.col.pendingUpserts(function(results) {
            assert.equal(results.length, 1);
            assert.equal(results[0].doc.a, 'banana');
            assert.equal(results[0].base.a, 'apple');
            return done();
          });
        });
      });
      it("allows setting of null upsert base", function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "2",
          a: 'apple'
        }, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'banana'
          }, null, function() {
            return _this.col.pendingUpserts(function(results) {
              assert.equal(results.length, 1);
              assert.equal(results[0].doc.a, 'banana');
              assert.equal(results[0].base, null);
              return done();
            });
          });
        });
      });
      it("allows multiple upserts", function(done) {
        var docs,
          _this = this;
        docs = [
          {
            _id: "1",
            a: 'apple'
          }, {
            _id: "2",
            a: 'banana'
          }, {
            _id: "3",
            a: 'orange'
          }
        ];
        return this.col.upsert(docs, function() {
          return _this.col.pendingUpserts(function(results) {
            assert.deepEqual(_.pluck(results, "doc"), docs);
            assert.deepEqual(_.pluck(results, "base"), [null, null, null]);
            return done();
          });
        });
      });
      it("allows multiple upserts with bases", function(done) {
        var bases, docs,
          _this = this;
        docs = [
          {
            _id: "1",
            a: 'apple'
          }, {
            _id: "2",
            a: 'banana'
          }, {
            _id: "3",
            a: 'orange'
          }
        ];
        bases = [
          {
            _id: "1",
            a: 'apple2'
          }, {
            _id: "2",
            a: 'banana2'
          }, {
            _id: "3",
            a: 'orange2'
          }
        ];
        return this.col.upsert(docs, bases, function() {
          return _this.col.pendingUpserts(function(results) {
            assert.deepEqual(_.pluck(results, "doc"), docs);
            assert.deepEqual(_.pluck(results, "base"), bases);
            return done();
          });
        });
      });
      it("resolves multiple upserts", function(done) {
        var docs,
          _this = this;
        docs = [
          {
            _id: "1",
            a: 'apple'
          }, {
            _id: "2",
            a: 'banana'
          }, {
            _id: "3",
            a: 'orange'
          }
        ];
        return this.col.upsert(docs, function() {
          return _this.col.pendingUpserts(function(upserts) {
            return _this.col.resolveUpserts(upserts, function() {
              return _this.col.pendingUpserts(function(results) {
                assert.equal(results.length, 0);
                return done();
              });
            });
          });
        });
      });
      it("handles removed pending upserts", function(done) {
        var docs,
          _this = this;
        docs = [
          {
            _id: "1",
            a: 'apple'
          }, {
            _id: "2",
            a: 'banana'
          }, {
            _id: "3",
            a: 'orange'
          }
        ];
        return this.col.upsert(docs, function() {
          return _this.col.remove(1, function() {
            return _this.col.resolveRemove(1, function() {
              return _this.col.pendingUpserts(function(upserts) {
                return _this.col.resolveUpserts(upserts, function() {
                  return _this.col.pendingUpserts(function(results) {
                    assert.equal(results.length, 0);
                    return done();
                  });
                });
              });
            });
          });
        });
      });
      it("retains changed pending upserts but updates base", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "2",
          a: 'banana'
        }, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'banana2'
          }, function() {
            return _this.col.resolveUpserts([
              {
                doc: {
                  _id: "2",
                  a: 'banana'
                },
                base: null
              }
            ], function() {
              return _this.col.pendingUpserts(function(results) {
                assert.equal(results.length, 1);
                assert.equal(results[0].doc.a, 'banana2');
                assert.equal(results[0].base.a, 'banana');
                return done();
              });
            });
          });
        });
      });
      it("removes by filter", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "1",
          a: 'apple'
        }, function() {
          return _this.col.upsert({
            _id: "2",
            a: 'banana'
          }, function() {
            return _this.col.upsert({
              _id: "3",
              a: 'banana'
            }, function() {
              return _this.col.remove({
                a: "banana"
              }, function() {
                return _this.col.pendingUpserts(function(results) {
                  assert.equal(results.length, 1);
                  assert.equal(results[0].doc.a, "apple");
                  return done();
                });
              });
            });
          });
        });
      });
      it("removes pending upserts", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "2",
          a: 'banana'
        }, function() {
          return _this.col.remove("2", function() {
            return _this.col.pendingUpserts(function(results) {
              assert.equal(results.length, 0);
              return done();
            });
          });
        });
      });
      it("returns pending removes", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.remove("1", function() {
            return _this.col.pendingRemoves(function(results) {
              assert.equal(results.length, 1);
              assert.equal(results[0], 1);
              return done();
            });
          });
        });
      });
      it("returns pending removes that are not present", function(done) {
        var _this = this;
        return this.col.remove("2", function() {
          return _this.col.pendingRemoves(function(results) {
            assert.equal(results.length, 1);
            assert.equal(results[0], 2);
            return done();
          });
        });
      });
      it("resolves pending removes", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.remove("1", function() {
            return _this.col.resolveRemove("1", function() {
              return _this.col.pendingRemoves(function(results) {
                assert.equal(results.length, 0);
                return done();
              });
            });
          });
        });
      });
      it("seeds", function(done) {
        var _this = this;
        return this.col.seed([
          {
            _id: "1",
            a: 'apple'
          }
        ], function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results[0].a, 'apple');
            return done();
          });
        });
      });
      it("does not overwrite existing", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'banana'
          }
        ], {}, {}, function() {
          return _this.col.seed([
            {
              _id: "1",
              a: 'apple'
            }
          ], function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      it("does not add removed", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.remove("1", function() {
            return _this.col.seed([
              {
                _id: "1",
                a: 'apple'
              }
            ], function() {
              return _this.col.find({}).fetch(function(results) {
                assert.equal(results.length, 0);
                return done();
              });
            });
          });
        });
      });
      it("allows removing uncached rows", function(done) {
        var _this = this;
        return this.col.remove("12345", function() {
          return _this.col.pendingRemoves(function(results) {
            assert.equal(results.length, 1);
            assert.equal(results[0], "12345");
            return done();
          });
        });
      });
      it('seeds rows', function(done) {
        var _this = this;
        return this.col.seed([
          {
            _id: "1",
            a: 'apple'
          }
        ], function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results[0].a, 'apple');
            return done();
          });
        });
      });
      it('seed does not overwrite existing', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.seed({
            _id: "1",
            a: 'banana'
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'apple');
              return done();
            });
          });
        });
      });
      it("seed doesn't overwrite upsert", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "1",
          a: 'apple'
        }, function() {
          return _this.col.seed({
            _id: "1",
            a: 'banana'
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'apple');
              return done();
            });
          });
        });
      });
      it("seed doesn't overwrite remove", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'delete'
          }
        ], {}, {}, function() {
          return _this.col.remove("1", function() {
            return _this.col.seed({
              _id: "1",
              a: 'banana'
            }, function() {
              return _this.col.find({}).fetch(function(results) {
                assert.equal(results.length, 0);
                return done();
              });
            });
          });
        });
      });
      it('cache one single doc', function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "1",
          a: 'apple'
        }, function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results[0].a, 'apple');
            return done();
          });
        });
      });
      it('cache one overwrite existing', function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'apple'
          }
        ], {}, {}, function() {
          return _this.col.cacheOne({
            _id: "1",
            a: 'banana'
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      it("cache one doesn't overwrite upsert", function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "1",
          a: 'apple'
        }, function() {
          return _this.col.cacheOne({
            _id: "1",
            a: 'banana'
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'apple');
              return done();
            });
          });
        });
      });
      it("cache one doesn't overwrite remove", function(done) {
        var _this = this;
        return this.col.cache([
          {
            _id: "1",
            a: 'delete'
          }
        ], {}, {}, function() {
          return _this.col.remove("1", function() {
            return _this.col.cacheOne({
              _id: "1",
              a: 'banana'
            }, function() {
              return _this.col.find({}).fetch(function(results) {
                assert.equal(results.length, 0);
                return done();
              });
            });
          });
        });
      });
      it('cache one with same _rev overwrite existing', function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "1",
          a: 'apple',
          _rev: 2
        }, function() {
          return _this.col.cacheOne({
            _id: "1",
            a: 'banana',
            _rev: 2
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      it('cache one with greater _rev overwrite existing', function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "1",
          a: 'apple',
          _rev: 1
        }, function() {
          return _this.col.cacheOne({
            _id: "1",
            a: 'banana',
            _rev: 2
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'banana');
              return done();
            });
          });
        });
      });
      return it('cache one with lesser _rev does not overwrite existing', function(done) {
        var _this = this;
        return this.col.cacheOne({
          _id: "1",
          a: 'apple',
          _rev: 2
        }, function() {
          return _this.col.cacheOne({
            _id: "1",
            a: 'banana',
            _rev: 1
          }, function() {
            return _this.col.find({}).fetch(function(results) {
              assert.equal(results[0].a, 'apple');
              return done();
            });
          });
        });
      });
    });
  };

}).call(this);
