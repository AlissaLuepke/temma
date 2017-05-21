(function() {
  var HybridDb, MemoryDb, assert, chai, db_queries, fail, lolex, sinon, _;

  _ = require('lodash');

  chai = require('chai');

  assert = chai.assert;

  sinon = require('sinon');

  lolex = require('lolex');

  MemoryDb = require("../src/MemoryDb");

  HybridDb = require("../src/HybridDb");

  db_queries = require("./db_queries");

  fail = function() {
    throw new Error("failed");
  };

  describe('HybridDb', function() {
    before(function(done) {
      var _this = this;
      this.reset = function(done) {
        _this.local = new MemoryDb();
        _this.remote = new MemoryDb();
        _this.hybrid = new HybridDb(_this.local, _this.remote);
        _this.local.addCollection("scratch");
        _this.lc = _this.local.scratch;
        _this.remote.addCollection("scratch");
        _this.rc = _this.remote.scratch;
        _this.hybrid.addCollection("scratch");
        _this.hc = _this.hybrid.scratch;
        _this.col = _this.hc;
        return done();
      };
      return this.reset(done);
    });
    describe("passes queries", function() {
      beforeEach(function(done) {
        return this.reset(done);
      });
      return db_queries.call(this);
    });
    context("resets each time", function() {
      beforeEach(function(done) {
        return this.reset(done);
      });
      describe("interim:true (default)", function() {
        it("find gives only one result if data unchanged", function(done) {
          var calls;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 1
          });
          this.rc.seed({
            _id: "2",
            a: 2
          });
          calls = 0;
          return this.hc.find({}).fetch(function(data) {
            calls += 1;
            assert.equal(data.length, 2);
            assert.equal(calls, 1);
            return done();
          }, fail);
        });
        it("find gives results twice if remote gives different answer", function(done) {
          var calls;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.find({}).fetch(function(data) {
            assert.equal(data.length, 2);
            calls = calls + 1;
            if (calls >= 2) {
              return done();
            }
          }, fail);
        });
        it("find gives results once if remote gives same answer with sort differences", function(done) {
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.find = function() {
            return {
              fetch: function(success) {
                return success([
                  {
                    _id: "2",
                    a: 2
                  }, {
                    _id: "1",
                    a: 1
                  }
                ]);
              }
            };
          };
          return this.hc.find({}).fetch(function(data) {
            assert.equal(data.length, 2);
            return done();
          }, fail);
        });
        return it("local upserts are respected", function(done) {
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.upsert({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 1
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          return this.hc.findOne({
            _id: "2"
          }, function(doc) {
            assert.deepEqual(doc, {
              _id: "2",
              a: 2
            });
            return done();
          }, fail);
        });
      });
      describe("cacheFind: true (default)", function() {
        it("find performs full field remote queries", function(done) {
          var _this = this;
          this.rc.seed({
            _id: "1",
            a: 1,
            b: 11
          });
          this.rc.seed({
            _id: "2",
            a: 2,
            b: 12
          });
          return this.hc.find({}, {
            fields: {
              b: 0
            }
          }).fetch(function(data) {
            if (data.length === 0) {
              return;
            }
            assert.isUndefined(data[0].b);
            return _this.lc.findOne({
              _id: "1"
            }, function(doc) {
              assert.equal(doc.b, 11);
              return done();
            });
          });
        });
        return it("caches remote data", function(done) {
          var calls,
            _this = this;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 2
          });
          calls = 0;
          return this.hc.find({}).fetch(function(data) {
            assert.equal(data.length, 2);
            calls = calls + 1;
            if (calls === 2) {
              return _this.lc.find({}).fetch(function(data) {
                assert.equal(data.length, 2);
                assert.deepEqual(_.pluck(data, 'a'), [3, 2]);
                return done();
              });
            }
          });
        });
      });
      describe("cacheFindOne: true (default)", function() {
        it("findOne performs full field remote queries", function(done) {
          var _this = this;
          this.rc.seed({
            _id: "1",
            a: 1,
            b: 11
          });
          this.rc.seed({
            _id: "2",
            a: 2,
            b: 12
          });
          return this.hc.findOne({
            _id: "1"
          }, {
            fields: {
              b: 0
            }
          }, function(doc) {
            assert.isUndefined(doc.b);
            return _this.lc.findOne({
              _id: "1"
            }, function(doc) {
              assert.equal(doc.b, 11);
              return done();
            });
          });
        });
        it("findOne gives results twice if remote gives different answer", function(done) {
          var calls;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.findOne({
            _id: "1"
          }, function(data) {
            calls = calls + 1;
            if (calls === 1) {
              assert.deepEqual(data, {
                _id: "1",
                a: 1
              });
            }
            if (calls >= 2) {
              assert.deepEqual(data, {
                _id: "1",
                a: 3
              });
              return done();
            }
          }, fail);
        });
        it("findOne gives local results once if remote fails", function(done) {
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.rc.findOne = function(selector, options, success, error) {
            if (options == null) {
              options = {};
            }
            return error(new Error("fail"));
          };
          this.rc.find = function(selector, options) {
            return {
              fetch: function(success, error) {
                return error();
              }
            };
          };
          return this.hc.findOne({
            _id: "1"
          }, function(data) {
            assert.equal(data.a, 1);
            return done();
          }, fail);
        });
        it("findOne gives local results selected not by _id once if remote fails", function(done) {
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.rc.findOne = function(selector, options, success, error) {
            if (options == null) {
              options = {};
            }
            return error(new Error("fail"));
          };
          this.rc.find = function(selector, options) {
            return {
              fetch: function(success, error) {
                return error();
              }
            };
          };
          return this.hc.findOne({
            a: 1
          }, function(data) {
            assert.equal(data.a, 1);
            return done();
          }, fail);
        });
        it("findOne gives local results once if remote fails", function(done) {
          var called;
          called = 0;
          this.rc.findOne = function(selector, options, success, error) {
            if (options == null) {
              options = {};
            }
            called = called + 1;
            return error(new Error("fail"));
          };
          this.rc.find = function(selector, options) {
            return {
              fetch: function(success, error) {
                called = called + 1;
                return error();
              }
            };
          };
          return this.hc.findOne({
            _id: "xyz"
          }, function(data) {
            assert.equal(data, null);
            assert.equal(called, 1);
            return done();
          }, fail);
        });
        return it("findOne keeps local cache updated on remote change", function(done) {
          var calls,
            _this = this;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.findOne({
            _id: "1"
          }, function(data) {
            calls = calls + 1;
            if (calls === 1) {
              assert.deepEqual(data, {
                _id: "1",
                a: 1
              });
            }
            if (calls >= 2) {
              assert.deepEqual(data, {
                _id: "1",
                a: 3
              });
              _this.lc.find({}, {}).fetch(function(data) {
                return assert.deepEqual(_.pluck(data, 'a'), [3, 2]);
              });
              return done();
            }
          }, fail);
        });
      });
      describe("interim: false", function() {
        return it("find gives final results only", function(done) {
          var calls;
          this.lc.upsert({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.find({}, {
            interim: false
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            assert.equal(data[0].a, 1);
            assert.equal(data[1].a, 4);
            return done();
          }, fail);
        });
      });
      describe("interim: false with timeout", function() {
        beforeEach(function() {
          return this.clock = lolex.install();
        });
        afterEach(function() {
          return this.clock.uninstall();
        });
        it("find gives final results if in time", function(done) {
          var oldFind,
            _this = this;
          this.lc.upsert({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          oldFind = this.rc.find;
          this.rc.find = function(where, params) {
            return {
              fetch: function(success, error) {
                _this.clock.tick(500);
                success([
                  {
                    _id: "1",
                    a: 3
                  }, {
                    _id: "2",
                    a: 4
                  }
                ]);
                return _this.clock.tick(1);
              }
            };
          };
          return this.hc.find({}, {
            interim: false,
            timeout: 1000
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            assert.equal(data[0].a, 1);
            assert.equal(data[1].a, 4);
            return done();
          }, fail);
        });
        it("find gives local results if out of time", function(done) {
          var oldFind,
            _this = this;
          this.lc.upsert({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          oldFind = this.rc.find;
          this.rc.find = function(where, params) {
            return {
              fetch: function(success, error) {
                _this.clock.tick(1500);
                success([
                  {
                    _id: "1",
                    a: 3
                  }, {
                    _id: "2",
                    a: 4
                  }
                ]);
                return _this.clock.tick(1);
              }
            };
          };
          return this.hc.find({}, {
            interim: false,
            timeout: 1000
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            assert.equal(data[0].a, 1);
            assert.equal(data[1].a, 2);
            return done();
          }, fail);
        });
        it("find gives local results but still caches if out of time", function(done) {
          var oldFind,
            _this = this;
          this.lc.upsert({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          oldFind = this.rc.find;
          this.rc.find = function(where, params) {
            return {
              fetch: function(success, error) {
                _this.clock.tick(1500);
                success([
                  {
                    _id: "1",
                    a: 3
                  }, {
                    _id: "2",
                    a: 4
                  }
                ]);
                return _this.clock.tick(2000);
              }
            };
          };
          return this.hc.find({}, {
            interim: false,
            timeout: 1000
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            assert.equal(data[0].a, 1);
            assert.equal(data[1].a, 2);
            return setTimeout(function() {
              return _this.lc.find({}, {}).fetch(function(data) {
                assert.equal(data.length, 2);
                assert.equal(data[0].a, 1, "Should not change since upsert");
                assert.equal(data[1].a, 4);
                return done();
              });
            }, 1000);
          }, fail);
        });
        it("find gives local results once if remote fails then out of time", function(done) {
          var called, oldFind,
            _this = this;
          this.lc.upsert({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          oldFind = this.rc.find;
          this.rc.find = function(where, params) {
            return {
              fetch: function(success, error) {
                error(new Error("Fail"));
                return _this.clock.tick(1);
              }
            };
          };
          called = 0;
          return this.hc.find({}, {
            interim: false,
            timeout: 1000
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            assert.equal(data[0].a, 1);
            assert.equal(data[1].a, 2);
            called += 1;
            _this.clock.tick(1500);
            if (called > 1) {
              console.error("Fail! Called twice");
            }
            assert.equal(called, 1);
            return done();
          }, fail);
        });
        return it("find gives local results once if out of time then remote fails", function(done) {
          var called, oldFind,
            _this = this;
          this.lc.upsert({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          oldFind = this.rc.find;
          this.rc.find = function(where, params) {
            return {
              fetch: function(success, error) {
                _this.clock.tick(1500);
                return error(new Error("Fail"));
              }
            };
          };
          called = 0;
          return this.hc.find({}, {
            interim: false,
            timeout: 1000
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            assert.equal(data[0].a, 1);
            assert.equal(data[1].a, 2);
            called += 1;
            if (called > 1) {
              console.error("Fail! Called twice");
            }
            assert.equal(called, 1);
            return done();
          }, fail);
        });
      });
      describe("cacheFind: false", function() {
        it("find performs partial field remote queries", function(done) {
          var _this = this;
          sinon.spy(this.rc, "find");
          this.rc.seed({
            _id: "1",
            a: 1,
            b: 11
          });
          this.rc.seed({
            _id: "2",
            a: 2,
            b: 12
          });
          return this.hc.find({}, {
            fields: {
              b: 0
            },
            cacheFind: false
          }).fetch(function(data) {
            if (data.length === 0) {
              return;
            }
            assert.isUndefined(data[0].b);
            assert.deepEqual(_this.rc.find.firstCall.args[1].fields, {
              b: 0
            });
            _this.rc.find.restore();
            return done();
          });
        });
        return it("does not cache remote data", function(done) {
          var calls,
            _this = this;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 2
          });
          calls = 0;
          return this.hc.find({}, {
            cacheFind: false
          }).fetch(function(data) {
            assert.equal(data.length, 2);
            calls = calls + 1;
            if (calls === 2) {
              return _this.lc.find({}).fetch(function(data) {
                assert.equal(data.length, 2);
                assert.deepEqual(_.pluck(data, 'a'), [1, 2]);
                return done();
              });
            }
          });
        });
      });
      describe("cacheFindOne: false", function() {
        return it("findOne performs partial field remote queries", function(done) {
          var _this = this;
          sinon.spy(this.rc, "find");
          this.rc.seed({
            _id: "1",
            a: 1,
            b: 11
          });
          this.rc.seed({
            _id: "2",
            a: 2,
            b: 12
          });
          return this.hc.findOne({
            _id: "1"
          }, {
            fields: {
              b: 0
            },
            cacheFindOne: false
          }, function(data) {
            if (data === null) {
              return;
            }
            assert.isUndefined(data.b);
            assert.deepEqual(_this.rc.find.getCall(0).args[1].fields, {
              b: 0
            });
            _this.rc.find.restore();
            return done();
          });
        });
      });
      context("shortcut: false (default)", function() {
        it("findOne calls both local and remote", function(done) {
          var calls;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.findOne({
            _id: "1"
          }, function(data) {
            calls += 1;
            if (calls === 1) {
              return assert.deepEqual(data, {
                _id: "1",
                a: 1
              });
            } else {
              assert.deepEqual(data, {
                _id: "1",
                a: 3
              });
              return done();
            }
          }, fail);
        });
        context("interim: false", function() {
          return it("findOne calls both local and remote", function(done) {
            this.lc.seed({
              _id: "1",
              a: 1
            });
            this.lc.seed({
              _id: "2",
              a: 2
            });
            this.rc.seed({
              _id: "1",
              a: 3
            });
            this.rc.seed({
              _id: "2",
              a: 4
            });
            return this.hc.findOne({
              _id: "1"
            }, {
              interim: false
            }, function(data) {
              assert.deepEqual(data, {
                _id: "1",
                a: 3
              });
              return done();
            }, fail);
          });
        });
        return it("findOne calls remote if not found", function(done) {
          var calls;
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.findOne({
            _id: "1"
          }, {
            shortcut: true
          }, function(data) {
            assert.deepEqual(data, {
              _id: "1",
              a: 3
            });
            return done();
          }, fail);
        });
      });
      context("shortcut: true", function() {
        it("findOne only calls local if found", function(done) {
          var calls;
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.findOne({
            _id: "1"
          }, {
            shortcut: true
          }, function(data) {
            assert.deepEqual(data, {
              _id: "1",
              a: 1
            });
            return done();
          }, fail);
        });
        return it("findOne calls remote if not found", function(done) {
          var calls;
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          this.rc.seed({
            _id: "2",
            a: 4
          });
          calls = 0;
          return this.hc.findOne({
            _id: "1"
          }, {
            shortcut: true
          }, function(data) {
            assert.deepEqual(data, {
              _id: "1",
              a: 3
            });
            return done();
          }, fail);
        });
      });
      context("cacheFind: false, interim: false", function() {
        beforeEach(function() {
          this.lc.seed({
            _id: "1",
            a: 1
          });
          this.lc.seed({
            _id: "2",
            a: 2
          });
          this.rc.seed({
            _id: "1",
            a: 3
          });
          return this.rc.seed({
            _id: "2",
            a: 4
          });
        });
        it("find only calls remote", function(done) {
          return this.hc.find({}, {
            cacheFind: false,
            interim: false
          }).fetch(function(data) {
            assert.deepEqual(_.pluck(data, 'a'), [3, 4]);
            return done();
          });
        });
        it("find does not cache results", function(done) {
          var _this = this;
          return this.hc.find({}, {
            cacheFind: false,
            interim: false
          }).fetch(function(data) {
            return _this.lc.find({}).fetch(function(data) {
              assert.deepEqual(_.pluck(data, 'a'), [1, 2]);
              return done();
            });
          });
        });
        it("find falls back to local if remote fails", function(done) {
          this.rc.find = function(selector, options) {
            return {
              fetch: function(success, error) {
                return error();
              }
            };
          };
          return this.hc.find({}, {
            cacheFind: false,
            interim: false
          }).fetch(function(data) {
            assert.deepEqual(_.pluck(data, 'a'), [1, 2]);
            return done();
          });
        });
        it("find errors if useLocalOnRemoteError:false if remote fails", function(done) {
          var _this = this;
          this.rc.find = function(selector, options) {
            return {
              fetch: function(success, error) {
                return error();
              }
            };
          };
          return this.hc.find({}, {
            cacheFind: false,
            interim: false,
            useLocalOnRemoteError: false
          }).fetch(function(data) {
            return assert.fail();
          }, function(err) {
            return done();
          });
        });
        it("find respects local upserts", function(done) {
          var _this = this;
          this.lc.upsert({
            _id: "1",
            a: 9
          });
          return this.hc.find({}, {
            cacheFind: false,
            interim: false,
            sort: ['_id']
          }).fetch(function(data) {
            assert.deepEqual(_.pluck(data, 'a'), [9, 4]);
            return done();
          });
        });
        return it("find respects local removes", function(done) {
          this.lc.remove("1");
          return this.hc.find({}, {
            cacheFind: false,
            interim: false
          }).fetch(function(data) {
            assert.deepEqual(_.pluck(data, 'a'), [4]);
            return done();
          });
        });
      });
      it("upload applies pending upserts", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        this.lc.upsert({
          _id: "2",
          a: 2
        });
        return this.hybrid.upload(function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0);
            return _this.rc.pendingUpserts(function(data) {
              assert.deepEqual(_.pluck(_.pluck(data, 'doc'), 'a'), [1, 2]);
              return done();
            });
          });
        }, fail);
      });
      it("upload sorts pending upserts", function(done) {
        var hybrid, upserts,
          _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1,
          b: 2
        });
        this.lc.upsert({
          _id: "2",
          a: 2,
          b: 1
        });
        hybrid = new HybridDb(this.local, this.remote);
        hybrid.addCollection("scratch", {
          sortUpserts: function(u1, u2) {
            if (u1.b < u2.b) {
              return -1;
            } else {
              return 1;
            }
          }
        });
        upserts = [];
        this.rc.upsert = function(doc, base, success, error) {
          upserts.push(doc);
          return success();
        };
        return hybrid.upload(function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0);
            assert.deepEqual(_.pluck(upserts, 'a'), [2, 1]);
            return done();
          });
        }, fail);
      });
      it("does not resolve upsert if data changed, but changes base", function(done) {
        var oldPendingUpserts,
          _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        oldPendingUpserts = this.lc.pendingUpserts;
        this.lc.pendingUpserts = function(success) {
          return oldPendingUpserts.call(_this.lc, function(upserts) {
            _this.lc.upsert({
              _id: "1",
              a: 2
            });
            return success(upserts);
          });
        };
        return this.hybrid.upload(function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 1);
            assert.deepEqual(data[0].doc, {
              _id: "1",
              a: 2
            });
            assert.deepEqual(data[0].base, {
              _id: "1",
              a: 1
            });
            return _this.rc.pendingUpserts(function(data) {
              assert.deepEqual(data[0].doc, {
                _id: "1",
                a: 1
              });
              assert.isNull(data[0].base);
              return done();
            });
          });
        }, fail);
      });
      it("caches new upserted value", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        this.rc.upsert = function(docs, bases, success) {
          return success({
            _id: "1",
            a: 2
          });
        };
        return this.hybrid.upload(function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0);
            return _this.lc.findOne({
              _id: "1"
            }, {}, function(data) {
              assert.deepEqual(data, {
                _id: "1",
                a: 2
              });
              return done();
            });
          });
        }, fail);
      });
      it("upload applies pending removes", function(done) {
        var _this = this;
        this.lc.seed({
          _id: "1",
          a: 1
        });
        this.rc.seed({
          _id: "1",
          a: 1
        });
        this.hc.remove("1");
        return this.hybrid.upload(function() {
          return _this.lc.pendingRemoves(function(data) {
            assert.equal(data.length, 0);
            return _this.rc.pendingRemoves(function(data) {
              assert.deepEqual(data, ["1"]);
              return done();
            });
          });
        }, fail);
      });
      it("keeps upserts and deletes if failed to apply", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        this.lc.upsert({
          _id: "2",
          a: 2
        });
        this.lc.seed({
          _id: "3",
          a: 3
        });
        this.rc.seed({
          _id: "3",
          a: 3
        });
        this.hc.remove("3");
        this.rc.upsert = function(docs, bases, success, error) {
          return error(new Error("fail"));
        };
        this.rc.remove = function(id, success, error) {
          return error(new Error("fail"));
        };
        return this.hybrid.upload(function() {
          return assert.fail();
        }, function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 2);
            _this.lc.pendingRemoves(function(data) {
              assert.equal(data.length, 1);
              return assert.equal(data[0], "3");
            });
            return done();
          });
        });
      });
      it("removes upsert if fails with 410 (gone) and continue", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        this.rc.upsert = function(docs, bases, success, error) {
          return error({
            status: 410
          });
        };
        return this.hybrid.upload(function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0);
            return _this.lc.pendingRemoves(function(data) {
              assert.equal(data.length, 0);
              return _this.lc.findOne({
                _id: "1"
              }, function(data) {
                assert.isNull(data);
                return done();
              }, fail);
            }, fail);
          }, fail);
        }, fail);
      });
      it("removes upsert if fails with 403 (permission) and fail", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        this.rc.upsert = function(docs, bases, success, error) {
          return error({
            status: 403
          });
        };
        return this.hybrid.upload(fail, function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0);
            return _this.lc.pendingRemoves(function(data) {
              assert.equal(data.length, 0);
              return _this.lc.findOne({
                _id: "1"
              }, function(data) {
                assert.isNull(data);
                return done();
              }, fail);
            }, fail);
          }, fail);
        });
      });
      it("removes document if remove fails with 403 (permission) and fail", function(done) {
        var _this = this;
        this.lc.seed({
          _id: "1",
          a: 1
        });
        this.hc.remove("3");
        this.rc.remove = function(id, success, error) {
          return error({
            status: 403
          });
        };
        return this.hybrid.upload(function() {
          return assert.fail();
        }, function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0, "Should have zero upserts");
            return _this.lc.pendingRemoves(function(data) {
              assert.equal(data.length, 0, "Should have zero removes");
              return _this.lc.findOne({
                _id: "1"
              }, function(data) {
                assert.equal(data.a, 1);
                return done();
              });
            });
          });
        });
      });
      it("removes upsert if returns null", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 1
        });
        this.rc.upsert = function(docs, bases, success, error) {
          return success(null);
        };
        return this.hybrid.upload(function() {
          return _this.lc.pendingUpserts(function(data) {
            assert.equal(data.length, 0);
            return _this.lc.pendingRemoves(function(data) {
              assert.equal(data.length, 0);
              return _this.lc.findOne({
                _id: "1"
              }, function(data) {
                assert.isNull(data);
                return done();
              }, fail);
            }, fail);
          }, fail);
        }, fail);
      });
      it("upserts to local db", function(done) {
        this.hc.upsert({
          _id: "1",
          a: 1
        });
        return this.lc.pendingUpserts(function(data) {
          assert.equal(data.length, 1);
          return done();
        });
      });
      it("upserts to local db with base version", function(done) {
        this.hc.upsert({
          _id: "1",
          a: 2
        }, {
          _id: "1",
          a: 1
        });
        return this.lc.pendingUpserts(function(data) {
          assert.equal(data.length, 1);
          assert.equal(data[0].doc.a, 2);
          assert.equal(data[0].base.a, 1);
          return done();
        });
      });
      return it("removes to local db", function(done) {
        this.lc.seed({
          _id: "1",
          a: 1
        });
        this.hc.remove("1");
        return this.lc.pendingRemoves(function(data) {
          assert.equal(data.length, 1);
          return done();
        });
      });
    });
    return context("cacheFind: false, interim: false", function() {
      beforeEach(function() {
        this.local = new MemoryDb();
        this.remote = new MemoryDb();
        this.hybrid = new HybridDb(this.local, this.remote);
        this.local.addCollection("scratch");
        this.lc = this.local.scratch;
        this.remote.addCollection("scratch");
        this.rc = this.remote.scratch;
        this.hybrid.addCollection("scratch");
        this.hc = this.hybrid.scratch;
        this.rc.seed({
          _id: "1",
          a: 3
        });
        return this.rc.seed({
          _id: "2",
          a: 4
        });
      });
      it("find uses remote", function(done) {
        var _this = this;
        return this.hc.find({}, {
          cacheFind: false,
          interim: false
        }).fetch(function(data) {
          assert.deepEqual(_.pluck(data, 'a'), [3, 4]);
          return done();
        });
      });
      it("find does not cache results", function(done) {
        var _this = this;
        return this.hc.find({}, {
          cacheFind: false,
          interim: false
        }).fetch(function(data) {
          return _this.lc.find({}).fetch(function(data) {
            assert.equal(data.length, 0);
            return done();
          });
        });
      });
      it("find respects local upserts", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 9
        });
        return this.hc.find({}, {
          cacheFind: false,
          interim: false,
          sort: ['_id']
        }).fetch(function(data) {
          assert.deepEqual(_.pluck(data, 'a'), [9, 4]);
          return done();
        });
      });
      it("find respects local removes", function(done) {
        var _this = this;
        this.lc.remove("1");
        return this.hc.find({}, {
          cacheFind: false,
          interim: false
        }).fetch(function(data) {
          assert.deepEqual(_.pluck(data, 'a'), [4]);
          return done();
        });
      });
      it("findOne without _id selector uses remote", function(done) {
        var _this = this;
        return this.hc.findOne({}, {
          cacheFindOne: false,
          interim: false,
          sort: ['_id']
        }, function(data) {
          assert.deepEqual(data, {
            _id: "1",
            a: 3
          });
          return done();
        });
      });
      it("findOne without _id selector respects local upsert", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 9
        });
        return this.hc.findOne({}, {
          cacheFindOne: false,
          interim: false,
          sort: ['_id']
        }, function(data) {
          assert.deepEqual(data, {
            _id: "1",
            a: 9
          });
          return done();
        });
      });
      it("findOne without _id selector respects local remove", function(done) {
        var _this = this;
        this.lc.remove("1");
        return this.hc.findOne({}, {
          cacheFindOne: false,
          sort: ['_id']
        }, function(data) {
          assert.deepEqual(data, {
            _id: "2",
            a: 4
          });
          return done();
        });
      });
      it("findOne with _id selector uses remote", function(done) {
        var _this = this;
        return this.hc.findOne({
          _id: "1"
        }, {
          cacheFindOne: false,
          sort: ['_id']
        }, function(data) {
          assert.deepEqual(data, {
            _id: "1",
            a: 3
          });
          return done();
        });
      });
      it("findOne with _id selector respects local upsert", function(done) {
        var _this = this;
        this.lc.upsert({
          _id: "1",
          a: 9
        });
        return this.hc.findOne({
          _id: "1"
        }, {
          cacheFindOne: false,
          interim: false,
          sort: ['_id']
        }, function(data) {
          assert.deepEqual(data, {
            _id: "1",
            a: 9
          });
          return done();
        });
      });
      return it("findOne with _id selector respects local remove", function(done) {
        var _this = this;
        this.lc.remove("1");
        return this.hc.findOne({
          _id: "1"
        }, {
          cacheFindOne: false,
          interim: false,
          sort: ['_id']
        }, function(data) {
          assert.isNull(data);
          return done();
        });
      });
    });
  });

}).call(this);
