(function() {
  var Collection, MemoryDb, compileSort, createUid, processFind, _;

  _ = require('lodash');

  createUid = require('./utils').createUid;

  processFind = require('./utils').processFind;

  compileSort = require('./selector').compileSort;

  module.exports = MemoryDb = (function() {

    function MemoryDb(options, success) {
      this.collections = {};
      if (success) {
        success(this);
      }
    }

    MemoryDb.prototype.addCollection = function(name, success, error) {
      var collection;
      collection = new Collection(name);
      this[name] = collection;
      this.collections[name] = collection;
      if (success != null) {
        return success();
      }
    };

    MemoryDb.prototype.removeCollection = function(name, success, error) {
      delete this[name];
      delete this.collections[name];
      if (success != null) {
        return success();
      }
    };

    return MemoryDb;

  })();

  Collection = (function() {

    function Collection(name) {
      this.name = name;
      this.items = {};
      this.upserts = {};
      this.removes = {};
    }

    Collection.prototype.find = function(selector, options) {
      var _this = this;
      return {
        fetch: function(success, error) {
          return _this._findFetch(selector, options, success, error);
        }
      };
    };

    Collection.prototype.findOne = function(selector, options, success, error) {
      var _ref;
      if (_.isFunction(options)) {
        _ref = [{}, options, success], options = _ref[0], success = _ref[1], error = _ref[2];
      }
      return this.find(selector, options).fetch(function(results) {
        if (success != null) {
          return success(results.length > 0 ? results[0] : null);
        }
      }, error);
    };

    Collection.prototype._findFetch = function(selector, options, success, error) {
      if (success != null) {
        return success(processFind(this.items, selector, options));
      }
    };

    Collection.prototype.upsert = function(doc, success, error) {
      var item, items, _i, _len;
      items = doc;
      if (!_.isArray(items)) {
        items = [items];
      }
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (!item._id) {
          item._id = createUid();
        }
        this.items[item._id] = item;
        this.upserts[item._id] = item;
      }
      if (success) {
        return success(doc);
      }
    };

    Collection.prototype.remove = function(id, success, error) {
      if (_.has(this.items, id)) {
        this.removes[id] = this.items[id];
        delete this.items[id];
        delete this.upserts[id];
      } else {
        this.removes[id] = {
          _id: id
        };
      }
      if (success != null) {
        return success();
      }
    };

    Collection.prototype.cache = function(docs, selector, options, success, error) {
      var doc, docsMap, sort, _i, _len,
        _this = this;
      for (_i = 0, _len = docs.length; _i < _len; _i++) {
        doc = docs[_i];
        this.cacheOne(doc);
      }
      docsMap = _.object(_.pluck(docs, "_id"), docs);
      if (options.sort) {
        sort = compileSort(options.sort);
      }
      return this.find(selector, options).fetch(function(results) {
        var result, _j, _len1;
        for (_j = 0, _len1 = results.length; _j < _len1; _j++) {
          result = results[_j];
          if (!docsMap[result._id] && !_.has(_this.upserts, result._id)) {
            if (options.sort && options.limit && docs.length === options.limit) {
              if (sort(result, _.last(docs)) >= 0) {
                continue;
              }
            }
            delete _this.items[result._id];
          }
        }
        if (success != null) {
          return success();
        }
      }, error);
    };

    Collection.prototype.pendingUpserts = function(success) {
      return success(_.values(this.upserts));
    };

    Collection.prototype.pendingRemoves = function(success) {
      return success(_.pluck(this.removes, "_id"));
    };

    Collection.prototype.resolveUpsert = function(doc, success) {
      var item, items, _i, _len;
      items = doc;
      if (!_.isArray(items)) {
        items = [items];
      }
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (this.upserts[item._id]) {
          if (_.isEqual(item, this.upserts[item._id])) {
            delete this.upserts[item._id];
          }
        }
      }
      if (success != null) {
        return success();
      }
    };

    Collection.prototype.resolveRemove = function(id, success) {
      delete this.removes[id];
      if (success != null) {
        return success();
      }
    };

    Collection.prototype.seed = function(doc, success) {
      if (!_.has(this.items, doc._id) && !_.has(this.removes, doc._id)) {
        this.items[doc._id] = doc;
      }
      if (success != null) {
        return success();
      }
    };

    Collection.prototype.cacheOne = function(doc, success) {
      var existing;
      if (!_.has(this.upserts, doc._id) && !_.has(this.removes, doc._id)) {
        existing = this.items[doc._id];
        if (!existing || !doc._rev || !existing._rev || doc._rev >= existing._rev) {
          this.items[doc._id] = doc;
        }
      }
      if (success != null) {
        return success();
      }
    };

    return Collection;

  })();

}).call(this);
