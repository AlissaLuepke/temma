(function() {
  var Collection, ReplicatingDb, utils, _;

  _ = require('lodash');

  utils = require('./utils');

  module.exports = ReplicatingDb = (function() {

    function ReplicatingDb(masterDb, replicaDb) {
      this.collections = {};
      this.masterDb = masterDb;
      this.replicaDb = replicaDb;
    }

    ReplicatingDb.prototype.addCollection = function(name, success, error) {
      var collection;
      collection = new Collection(name, this.masterDb[name], this.replicaDb[name]);
      this[name] = collection;
      this.collections[name] = collection;
      if (success != null) {
        return success();
      }
    };

    ReplicatingDb.prototype.removeCollection = function(name, success, error) {
      delete this[name];
      delete this.collections[name];
      if (success != null) {
        return success();
      }
    };

    return ReplicatingDb;

  })();

  Collection = (function() {

    function Collection(name, masterCol, replicaCol) {
      this.name = name;
      this.masterCol = masterCol;
      this.replicaCol = replicaCol;
    }

    Collection.prototype.find = function(selector, options) {
      return this.masterCol.find(selector, options);
    };

    Collection.prototype.findOne = function(selector, options, success, error) {
      return this.masterCol.findOne(selector, options, success, error);
    };

    Collection.prototype.upsert = function(docs, bases, success, error) {
      var items, _ref,
        _this = this;
      _ref = utils.regularizeUpsert(docs, bases, success, error), items = _ref[0], success = _ref[1], error = _ref[2];
      return this.masterCol.upsert(_.pluck(items, "doc"), _.pluck(items, "base"), function() {
        return _this.replicaCol.upsert(_.pluck(items, "doc"), _.pluck(items, "base"), function(results) {
          return success(docs);
        }, error);
      }, error);
    };

    Collection.prototype.remove = function(id, success, error) {
      var _this = this;
      return this.masterCol.remove(id, function() {
        return _this.replicaCol.remove(id, success, error);
      }, error);
    };

    Collection.prototype.cache = function(docs, selector, options, success, error) {
      var _this = this;
      return this.masterCol.cache(docs, selector, options, function() {
        return _this.replicaCol.cache(docs, selector, options, success, error);
      }, error);
    };

    Collection.prototype.pendingUpserts = function(success, error) {
      return this.masterCol.pendingUpserts(success, error);
    };

    Collection.prototype.pendingRemoves = function(success, error) {
      return this.masterCol.pendingRemoves(success, error);
    };

    Collection.prototype.resolveUpserts = function(upserts, success, error) {
      var _this = this;
      return this.masterCol.resolveUpserts(upserts, function() {
        return _this.replicaCol.resolveUpserts(upserts, success, error);
      }, error);
    };

    Collection.prototype.resolveRemove = function(id, success, error) {
      var _this = this;
      return this.masterCol.resolveRemove(id, function() {
        return _this.replicaCol.resolveRemove(id, success, error);
      }, error);
    };

    Collection.prototype.seed = function(docs, success, error) {
      var _this = this;
      return this.masterCol.seed(docs, function() {
        return _this.replicaCol.seed(docs, success, error);
      }, error);
    };

    Collection.prototype.cacheOne = function(doc, success, error) {
      var _this = this;
      return this.masterCol.cacheOne(doc, function() {
        return _this.replicaCol.cacheOne(doc, success, error);
      }, error);
    };

    Collection.prototype.uncache = function(selector, success, error) {
      var _this = this;
      return this.masterCol.uncache(selector, function() {
        return _this.replicaCol.uncache(selector, success, error);
      }, error);
    };

    return Collection;

  })();

}).call(this);
