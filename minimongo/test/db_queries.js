(function() {
  var assert, chai, error, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

  chai = require('chai');

  assert = chai.assert;

  error = function(err) {
    console.log(err);
    return assert.fail(JSON.stringify(err));
  };

  module.exports = function() {
    var geopoint;
    before(function() {
      return this.testFilter = function(filter, ids, done) {
        return this.col.find(filter, {
          sort: ["_id"]
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ids);
          return done();
        });
      };
    });
    context('With sample rows', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.reset(function() {
          return _this.col.upsert({
            _id: "1",
            a: "Alice",
            b: 1,
            c: {
              d: 1,
              e: 2
            }
          }, function() {
            return _this.col.upsert({
              _id: "2",
              a: "Charlie",
              b: 2,
              c: {
                d: 2,
                e: 3
              }
            }, function() {
              return _this.col.upsert({
                _id: "3",
                a: "Bob",
                b: 3
              }, function() {
                return done();
              });
            });
          });
        });
      });
      it('finds all rows', function(done) {
        return this.col.find({}).fetch(function(results) {
          assert.equal(results.length, 3);
          return done();
        });
      });
      it('finds all rows with options', function(done) {
        return this.col.find({}, {}).fetch(function(results) {
          assert.equal(3, results.length);
          return done();
        });
      });
      it('filters by id', function(done) {
        return this.testFilter({
          _id: "1"
        }, ["1"], done);
      });
      it('filters by string', function(done) {
        return this.testFilter({
          a: "Alice"
        }, ["1"], done);
      });
      it('filters by $in string', function(done) {
        return this.testFilter({
          a: {
            $in: ["Alice", "Charlie"]
          }
        }, ["1", "2"], done);
      });
      it('filters by number', function(done) {
        return this.testFilter({
          b: 2
        }, ["2"], done);
      });
      it('filters by $in number', function(done) {
        return this.testFilter({
          b: {
            $in: [2, 3]
          }
        }, ["2", "3"], done);
      });
      it('filters by $regex', function(done) {
        return this.testFilter({
          a: {
            $regex: "li"
          }
        }, ["1", "2"], done);
      });
      it('filters by $regex case-sensitive', function(done) {
        return this.testFilter({
          a: {
            $regex: "A"
          }
        }, ["1"], done);
      });
      it('filters by $regex case-insensitive', function(done) {
        return this.testFilter({
          a: {
            $regex: "A",
            $options: 'i'
          }
        }, ["1", "2"], done);
      });
      it('filters by $or', function(done) {
        return this.testFilter({
          "$or": [
            {
              b: 1
            }, {
              b: 2
            }
          ]
        }, ["1", "2"], done);
      });
      it('filters by path', function(done) {
        return this.testFilter({
          "c.d": 2
        }, ["2"], done);
      });
      it('filters by $ne', function(done) {
        return this.testFilter({
          "b": {
            $ne: 2
          }
        }, ["1", "3"], done);
      });
      it('filters by $gt', function(done) {
        return this.testFilter({
          "b": {
            $gt: 1
          }
        }, ["2", "3"], done);
      });
      it('filters by $lt', function(done) {
        return this.testFilter({
          "b": {
            $lt: 3
          }
        }, ["1", "2"], done);
      });
      it('filters by $gte', function(done) {
        return this.testFilter({
          "b": {
            $gte: 2
          }
        }, ["2", "3"], done);
      });
      it('filters by $lte', function(done) {
        return this.testFilter({
          "b": {
            $lte: 2
          }
        }, ["1", "2"], done);
      });
      it('filters by $not', function(done) {
        return this.testFilter({
          "b": {
            $not: {
              $lt: 3
            }
          }
        }, ["3"], done);
      });
      it('filters by $or', function(done) {
        return this.testFilter({
          $or: [
            {
              b: 3
            }, {
              b: 1
            }
          ]
        }, ["1", "3"], done);
      });
      it('filters by $exists: true', function(done) {
        return this.testFilter({
          c: {
            $exists: true
          }
        }, ["1", "2"], done);
      });
      it('filters by $exists: false', function(done) {
        return this.testFilter({
          c: {
            $exists: false
          }
        }, ["3"], done);
      });
      it('includes fields', function(done) {
        return this.col.find({
          _id: "1"
        }, {
          fields: {
            a: 1
          }
        }).fetch(function(results) {
          assert.deepEqual(results[0], {
            _id: "1",
            a: "Alice"
          });
          return done();
        });
      });
      it('includes subfields', function(done) {
        return this.col.find({
          _id: "1"
        }, {
          fields: {
            "c.d": 1
          }
        }).fetch(function(results) {
          assert.deepEqual(results[0], {
            _id: "1",
            c: {
              d: 1
            }
          });
          return done();
        });
      });
      it('ignores non-existent subfields', function(done) {
        return this.col.find({
          _id: "1"
        }, {
          fields: {
            "x.y": 1
          }
        }).fetch(function(results) {
          assert.deepEqual(results[0], {
            _id: "1"
          });
          return done();
        });
      });
      it('excludes fields', function(done) {
        return this.col.find({
          _id: "1"
        }, {
          fields: {
            a: 0
          }
        }).fetch(function(results) {
          assert.isUndefined(results[0].a);
          assert.equal(results[0].b, 1);
          return done();
        });
      });
      it('excludes subfields', function(done) {
        return this.col.find({
          _id: "1"
        }, {
          fields: {
            "c.d": 0
          }
        }).fetch(function(results) {
          assert.deepEqual(results[0].c, {
            e: 2
          });
          return done();
        });
      });
      it('finds one row', function(done) {
        return this.col.findOne({
          _id: "2"
        }, function(result) {
          assert.equal('Charlie', result.a);
          return done();
        });
      });
      it('removes item', function(done) {
        var _this = this;
        return this.col.remove("2", function() {
          return _this.col.find({}).fetch(function(results) {
            var result;
            assert.equal(2, results.length);
            assert(__indexOf.call((function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = results.length; _i < _len; _i++) {
                result = results[_i];
                _results.push(result._id);
              }
              return _results;
            })(), "1") >= 0);
            assert(__indexOf.call((function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = results.length; _i < _len; _i++) {
                result = results[_i];
                _results.push(result._id);
              }
              return _results;
            })(), "2") < 0);
            return done();
          }, error);
        }, error);
      });
      it('removes non-existent item', function(done) {
        var _this = this;
        return this.col.remove("999", function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(3, results.length);
            return done();
          });
        });
      });
      it('sorts ascending', function(done) {
        return this.col.find({}, {
          sort: ['a']
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["1", "3", "2"]);
          return done();
        });
      });
      it('sorts descending', function(done) {
        return this.col.find({}, {
          sort: [['a', 'desc']]
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["2", "3", "1"]);
          return done();
        });
      });
      it('limits', function(done) {
        return this.col.find({}, {
          sort: ['a'],
          limit: 2
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["1", "3"]);
          return done();
        });
      });
      it('skips', function(done) {
        return this.col.find({}, {
          sort: ['a'],
          skip: 2
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["2"]);
          return done();
        });
      });
      it('fetches independent copies', function(done) {
        var _this = this;
        return this.col.findOne({
          _id: "2"
        }, function(result1) {
          return _this.col.findOne({
            _id: "2"
          }, function(result2) {
            assert(result1 !== result2);
            return done();
          });
        });
      });
      it('upsert keeps independent copies', function(done) {
        var doc,
          _this = this;
        doc = {
          _id: "2"
        };
        return this.col.upsert(doc, function(item) {
          doc.a = "xyz";
          item.a = "xyz";
          return _this.col.findOne({
            _id: "2"
          }, function(doc2) {
            assert(doc !== doc2);
            assert(doc2.a !== "xyz");
            return done();
          });
        });
      });
      it('adds _id to rows', function(done) {
        return this.col.upsert({
          a: "1"
        }, function(item) {
          assert.property(item, '_id');
          assert.lengthOf(item._id, 32);
          return done();
        });
      });
      it('returns array if called with array', function(done) {
        return this.col.upsert([
          {
            a: "1"
          }
        ], function(items) {
          assert.equal(items[0].a, "1");
          return done();
        });
      });
      it('updates by id', function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "1",
          a: "1"
        }, function(item) {
          return _this.col.upsert({
            _id: "1",
            a: "2",
            b: 1
          }, function(item) {
            assert.equal(item.a, "2");
            return _this.col.find({
              _id: "1"
            }).fetch(function(results) {
              assert.equal(1, results.length, "Should be only one document");
              return done();
            });
          });
        });
      });
      return it('call upsert with upserted row', function(done) {
        return this.col.upsert({
          _id: "1",
          a: "1"
        }, function(item) {
          assert.equal(item._id, "1");
          assert.equal(item.a, "1");
          return done();
        });
      });
    });
    it('upserts multiple rows', function(done) {
      var _this = this;
      this.timeout(10000);
      return this.reset(function() {
        var docs, i, _i;
        docs = [];
        for (i = _i = 0; _i < 100; i = ++_i) {
          docs.push({
            b: i
          });
        }
        return _this.col.upsert(docs, function() {
          return _this.col.find({}).fetch(function(results) {
            assert.equal(results.length, 100);
            return done();
          }, error);
        }, error);
      });
    });
    context('With sample with capitalization', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.reset(function() {
          return _this.col.upsert({
            _id: "1",
            a: "Alice",
            b: 1,
            c: {
              d: 1,
              e: 2
            }
          }, function() {
            return _this.col.upsert({
              _id: "2",
              a: "AZ",
              b: 2,
              c: {
                d: 2,
                e: 3
              }
            }, function() {
              return done();
            });
          });
        });
      });
      return it('finds sorts in Javascript order', function(done) {
        return this.col.find({}, {
          sort: ['a']
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["2", "1"]);
          return done();
        });
      });
    });
    context('With integer array in json rows', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.reset(function() {
          return _this.col.upsert({
            _id: "1",
            c: {
              arrint: [1, 2]
            }
          }, function() {
            return _this.col.upsert({
              _id: "2",
              c: {
                arrint: [2, 3]
              }
            }, function() {
              return _this.col.upsert({
                _id: "3",
                c: {
                  arrint: [1, 3]
                }
              }, function() {
                return done();
              });
            });
          });
        });
      });
      it('filters by $in', function(done) {
        return this.testFilter({
          "c.arrint": {
            $in: [3]
          }
        }, ["2", "3"], done);
      });
      return it('filters by list $in with multiple', function(done) {
        return this.testFilter({
          "c.arrint": {
            $in: [1, 3]
          }
        }, ["1", "2", "3"], done);
      });
    });
    context('With object array rows', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.reset(function() {
          return _this.col.upsert({
            _id: "1",
            c: [
              {
                x: 1,
                y: 1
              }, {
                x: 1,
                y: 2
              }
            ]
          }, function() {
            return _this.col.upsert({
              _id: "2",
              c: [
                {
                  x: 2,
                  y: 1
                }
              ]
            }, function() {
              return _this.col.upsert({
                _id: "3",
                c: [
                  {
                    x: 2,
                    y: 2
                  }
                ]
              }, function() {
                return done();
              });
            });
          });
        });
      });
      return it('filters by $elemMatch', function(done) {
        var _this = this;
        return this.testFilter({
          "c": {
            $elemMatch: {
              y: 1
            }
          }
        }, ["1", "2"], function() {
          return _this.testFilter({
            "c": {
              $elemMatch: {
                x: 1
              }
            }
          }, ["1"], done);
        });
      });
    });
    context('With array rows with inner string arrays', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.reset(function() {
          return _this.col.upsert({
            _id: "1",
            c: [
              {
                arrstr: ["a", "b"]
              }, {
                arrstr: ["b", "c"]
              }
            ]
          }, function() {
            return _this.col.upsert({
              _id: "2",
              c: [
                {
                  arrstr: ["b"]
                }
              ]
            }, function() {
              return _this.col.upsert({
                _id: "3",
                c: [
                  {
                    arrstr: ["c", "d"]
                  }, {
                    arrstr: ["e", "f"]
                  }
                ]
              }, function() {
                return done();
              });
            });
          });
        });
      });
      return it('filters by $elemMatch', function(done) {
        var _this = this;
        return this.testFilter({
          "c": {
            $elemMatch: {
              "arrstr": {
                $in: ["b"]
              }
            }
          }
        }, ["1", "2"], function() {
          return _this.testFilter({
            "c": {
              $elemMatch: {
                "arrstr": {
                  $in: ["d", "e"]
                }
              }
            }
          }, ["3"], done);
        });
      });
    });
    context('With text array rows', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.reset(function() {
          return _this.col.upsert({
            _id: "1",
            textarr: ["a", "b"]
          }, function() {
            return _this.col.upsert({
              _id: "2",
              textarr: ["b", "c"]
            }, function() {
              return _this.col.upsert({
                _id: "3",
                textarr: ["c", "d"]
              }, function() {
                return done();
              }, error);
            }, error);
          }, error);
        });
      });
      it('filters by $in', function(done) {
        return this.testFilter({
          "textarr": {
            $in: ["b"]
          }
        }, ["1", "2"], done);
      });
      it('filters by direct reference', function(done) {
        return this.testFilter({
          "textarr": "b"
        }, ["1", "2"], done);
      });
      return it('filters by both item and complete array', function(done) {
        return this.testFilter({
          "textarr": {
            $in: ["a", ["b", "c"]]
          }
        }, ["1", "2"], done);
      });
    });
    geopoint = function(lng, lat) {
      return {
        type: 'Point',
        coordinates: [lng, lat]
      };
    };
    return context('With geolocated rows', function() {
      beforeEach(function(done) {
        var _this = this;
        return this.col.upsert({
          _id: "1",
          geo: geopoint(90, 45)
        }, function() {
          return _this.col.upsert({
            _id: "2",
            geo: geopoint(90, 46)
          }, function() {
            return _this.col.upsert({
              _id: "3",
              geo: geopoint(91, 45)
            }, function() {
              return _this.col.upsert({
                _id: "4",
                geo: geopoint(91, 46)
              }, function() {
                return done();
              });
            });
          });
        });
      });
      it('finds points near', function(done) {
        var selector;
        selector = {
          geo: {
            $near: {
              $geometry: geopoint(90, 45)
            }
          }
        };
        return this.col.find(selector).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["1", "3", "2", "4"]);
          return done();
        });
      });
      it('finds points near maxDistance', function(done) {
        var selector;
        selector = {
          geo: {
            $near: {
              $geometry: geopoint(90, 45),
              $maxDistance: 111180
            }
          }
        };
        return this.col.find(selector).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["1", "3"]);
          return done();
        });
      });
      it('finds points near maxDistance just above', function(done) {
        var selector;
        selector = {
          geo: {
            $near: {
              $geometry: geopoint(90, 45),
              $maxDistance: 111410
            }
          }
        };
        return this.col.find(selector).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["1", "3", "2"]);
          return done();
        });
      });
      it('finds points within simple box', function(done) {
        var selector;
        selector = {
          geo: {
            $geoIntersects: {
              $geometry: {
                type: 'Polygon',
                coordinates: [[[89.5, 45.5], [89.5, 46.5], [90.5, 46.5], [90.5, 45.5], [89.5, 45.5]]]
              }
            }
          }
        };
        return this.col.find(selector).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["2"]);
          return done();
        });
      });
      it('finds points within big box', function(done) {
        var selector;
        selector = {
          geo: {
            $geoIntersects: {
              $geometry: {
                type: 'Polygon',
                coordinates: [[[0, -89], [0, 89], [179, 89], [179, -89], [0, -89]]]
              }
            }
          }
        };
        return this.col.find(selector, {
          sort: ['_id']
        }).fetch(function(results) {
          assert.deepEqual(_.pluck(results, '_id'), ["1", "2", "3", "4"]);
          return done();
        });
      });
      return it('handles undefined', function(done) {
        var selector,
          _this = this;
        selector = {
          geo: {
            $geoIntersects: {
              $geometry: {
                type: 'Polygon',
                coordinates: [[[89.5, 45.5], [89.5, 46.5], [90.5, 46.5], [90.5, 45.5], [89.5, 45.5]]]
              }
            }
          }
        };
        return this.col.upsert({
          _id: 5
        }, function() {
          return _this.col.find(selector).fetch(function(results) {
            assert.deepEqual(_.pluck(results, '_id'), ["2"]);
            return done();
          });
        });
      });
    });
  };

}).call(this);
