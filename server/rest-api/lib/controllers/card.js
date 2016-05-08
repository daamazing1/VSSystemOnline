'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require('../models/card.js');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//load card and append to req
function query(req, res, next) {
  _card2.default.query(req.body).then(function (cards) {
    res.json(cards);
  }).error(function (e) {
    return next(e);
  });
}

//list out all the cards from the database
function list(req, res, next) {
  var _req$query = req.query;
  var _req$query$limit = _req$query.limit;
  var limit = _req$query$limit === undefined ? 50 : _req$query$limit;
  var _req$query$skip = _req$query.skip;
  var skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _card2.default.list({ limit: limit, skip: skip }).then(function (cards) {
    return res.json(cards);
  }).error(function (e) {
    return next(e);
  });
}

exports.default = { query: query, list: list };
module.exports = exports['default'];