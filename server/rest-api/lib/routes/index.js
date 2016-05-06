'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cards = require('./cards');

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/heath-check', function (req, res) {
  return res.send('OK');
});

router.use('/cards', _cards2.default);

exports.default = router;
module.exports = exports['default'];