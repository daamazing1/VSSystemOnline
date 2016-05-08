'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lookup = require('../controllers/lookup');

var _lookup2 = _interopRequireDefault(_lookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/teams').get(_lookup2.default.teams);

router.route('/cardtypes').get(_lookup2.default.cardTypes);

router.route('/powers').get(_lookup2.default.powers);

exports.default = router;
module.exports = exports['default'];