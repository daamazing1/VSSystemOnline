'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _card = require('./models/card.js');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//should pickup index.js


var app = (0, _express2.default)();

//Connect to mongo db
_bluebird2.default.promisifyAll(_mongoose2.default);
_mongoose2.default.connect('mongodb://172.17.0.2:27017/vs_system_2pcg', { server: { socketOptions: { keepAlive: 1 } } });
_mongoose2.default.connection.on('error', function () {
  throw new Error('unable to connect to database');
});
_mongoose2.default.connection.on('open', function () {
  console.log("Connected to vs_system_2pcg");
});

//express configuration
var app = (0, _express2.default)();
//Add CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(_bodyParser2.default.json());
app.use('/api', _routes2.default);

app.listen(8080, function () {
  console.log('Listening to port 8080');
});

exports.default = app;
module.exports = exports['default'];