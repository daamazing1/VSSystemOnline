'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardSchema = new _mongoose2.default.Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  cardNumber: {
    type: String
  },
  cost: {
    type: Number
  },
  atk: {
    type: Number
  },
  def: {
    type: Number
  },
  flight: {
    type: Boolean
  },
  range: {
    type: Boolean
  },
  team: {
    type: String
  },
  health: {
    type: Number
  }
});

cardSchema.statics = {
  query: function query(_query) {
    for (var prop in _query) {
      // remove any properties of the query which are empty.
      if (typeof _query[prop] === 'string' && _query[prop].trim() === '' || _query[prop].length === 0) {
        delete _query[prop];
        continue;
      }
      // use in clause for some query fields
      switch (prop) {
        case 'name':
        case 'rules':
          _query[prop] = new RegExp(_query[prop], 'i');
          break;
        case 'type':
        case 'team':
        case 'powers':
          // allow for multiple card types and do an or filter on them.
          // allow for multiple team selection
          // for now only covers flight and range, this will change
          _query[prop] = { $in: _query[prop] };
      }
    }
    //check and make sure that query has something to query, if query object is
    //empty then just return an empty recordset.
    for (var key in _query) {
      if (_query.hasOwnProperty(key)) {
        return this.find(_query).execAsync();
      }
    }
    var deferred = _bluebird2.default.defer();
    deferred.resolve([]);
    return deferred.promise;
  },
  list: function list() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$skip = _ref.skip;
    var skip = _ref$skip === undefined ? 0 : _ref$skip;
    var _ref$limit = _ref.limit;
    var limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().skip(skip).limit(limit).execAsync();
  }
};

exports.default = _mongoose2.default.model('Card', cardSchema);
module.exports = exports['default'];