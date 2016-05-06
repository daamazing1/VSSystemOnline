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
      if (prop === "name" || prop === "rules") {
        _query[prop] = new RegExp(_query[prop], 'i');
      }
    }
    return this.find(_query).execAsync();
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