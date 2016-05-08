'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function teams(req, res, next) {
  var db = _mongoose2.default.connection;
  db.collections.cards.distinct('team').then(function (teams) {
    return res.json(teams);
  });
}

function cardTypes(req, res, next) {
  var db = _mongoose2.default.connection;
  db.collections.cards.distinct('type').then(function (types) {
    return res.json(types);
  });
}

function powers(req, res, next) {
  res.json(['flight', 'range']);
}

exports.default = { teams: teams, cardTypes: cardTypes, powers: powers };
module.exports = exports['default'];